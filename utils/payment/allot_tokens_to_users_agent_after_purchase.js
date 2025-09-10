/**
 * @file utils/payment/allot_tokens_to_users_agent_after_purchase.js
 * @description
 * Atomically allots purchased AI-model-specific tokens to a CustomerServiceAgents record.
 *
 * SUMMARY
 *  - Validates inputs (username, agentId, modelName, tokens).
 *  - Verifies the AI model exists and is currently available.
 *  - Uses a Prisma transaction to atomically:
 *      • read the agent record,
 *      • verify ownership (username === agent.username),
 *      • increment the matching TokenBalance.availableTokens (create if missing),
 *      • if the agent.usingModel matches the modelName, increment its availableTokens as well,
 *      • update lastModified and timestamps,
 *      • write the updated embedded arrays/objects back in one atomic update.
 *
 * IMPORTANT BEHAVIORAL DETAILS
 *  - The function WILL NOT modify agent.usingModel if the incoming modelName differs from usingModel.modelName.
 *    (Spec requirement: only update usingModel when the same model is being topped up.)
 *  - If tokenBalances contains an entry whose modelName matches (case-insensitive) the provided modelName,
 *    that entry's availableTokens will be incremented (not replaced).
 *  - If no tokenBalances entry exists, a new TokenBalance record is appended (status defaults to "inactive" via schema).
 *  - All comparisons of model names are done case-insensitively for matching, but stored values retain original casing
 *    where possible.
 *
 * CONCURRENCY / ATOMICITY
 *  - The read-modify-write is wrapped inside prisma.$transaction callback to ensure atomic behavior.
 *
 * SECURITY & VALIDATIONS
 *  - username must be a non-empty string and must match agent.username exactly.
 *  - agentId must be a non-empty string.
 *  - tokens must be a positive safe integer (and the function enforces an upper bound to avoid overflow).
 *  - modelName must be a non-empty string and must exist in AIModel and be available (availableTill in the future).
 *
 * NOTE about DB shape (relevant fields):
 *  model CustomerServiceAgents {
 *    ...
 *    tokenBalances    TokenBalance[]
 *    usingModel       UsingModel?
 *    lastModified     DateTime
 *  }
 *
 *  type TokenBalance {
 *    modelName       String
 *    availableTokens Int
 *    status          String  @default("inactive")
 *    createdAt       DateTime
 *    updatedAt       DateTime
 *  }
 *
 *  type UsingModel {
 *    modelName       String
 *    availableTokens Int
 *    status          String @default("inactive")
 *  }
 *
 * INPUT (AllotParams)
 * @typedef {Object} AllotParams
 * @property {string} username    - Username of the purchaser (must match agent owner)
 * @property {string} agentId     - Agent ID to which tokens should be added
 * @property {string} modelName   - AI model name the tokens are for (e.g., "gpt-4")
 * @property {number} tokens      - Number of tokens to add (positive integer)
 * @property {Object} [metadata]  - Optional metadata (e.g., { receipt, source })
 *
 * OUTPUT (AllotResult)
 * @typedef {Object} AllotResult
 * @property {boolean} success
 * @property {Object} [data] - When success=true:
 *   @property {string} data.agentId
 *   @property {string} data.username
 *   @property {string} data.modelName
 *   @property {number} data.addedTokens
 *   @property {number} data.newModelAvailableTokens - New availableTokens for the specific model after update
 *   @property {Object} data.tokenBalanceEntry - The updated (or created) TokenBalance object for the model (sanitized)
 *   @property {Object} data.usingModel - If usingModel was present and updated, returns the updated usingModel (sanitized)
 *   @property {Object} data.metadata - Minimal echo of metadata (only allowed small fields)
 * @property {string} [error] - When success=false, a client-safe message
 *
 * EXAMPLE
 * const result = await allotTokensToUsersAgentAfterPurchase({
 *   username: "arjun_agent01",
 *   agentId: "AGT-50345a8fdb40c313",
 *   modelName: "gpt-4",
 *   tokens: 1500,
 *   metadata: { receipt: "rcpt_001", source: "razorpay" }
 * });
 *
 * if (result.success) {
 *   // result.data contains the updated token entries
 * } else {
 *   // inspect result.error
 * }
 *
 * IMPLEMENTATION NOTES
 *  - The function intentionally keeps the returned `tokenBalanceEntry` and `usingModel` small and sanitized.
 *  - It prevents numeric overflow by guarding against values exceeding Number.MAX_SAFE_INTEGER.
 *  - Errors thrown inside the transaction are mapped to client-safe messages.
 */

const { PrismaClient } = require("../../generated/customer-service");
const prisma = new PrismaClient();

const MAX_ALLOWED_TOKENS_ADD = 1e12; // defensive upper bound for a single allot request

/**
 * @async
 * @function allotTokensToUsersAgentAfterPurchase
 * @param {AllotParams} params
 * @returns {Promise<AllotResult>}
 */
async function allotTokensToUsersAgentAfterPurchase({
  username,
  agentId,
  modelName,
  tokens,
  metadata = {},
}) {
  try {
    // ---- Basic validation ----
    if (typeof username !== "string" || !username.trim()) {
      return { success: false, error: "Invalid username." };
    }
    if (typeof agentId !== "string" || !agentId.trim()) {
      return { success: false, error: "Invalid agentId." };
    }
    if (typeof modelName !== "string" || !modelName.trim()) {
      return { success: false, error: "Invalid modelName." };
    }

    // tokens must be integer > 0 and within safe range
    const parsedTokens = Number(tokens);
    if (
      !Number.isFinite(parsedTokens) ||
      !Number.isInteger(parsedTokens) ||
      parsedTokens <= 0 ||
      parsedTokens > MAX_ALLOWED_TOKENS_ADD ||
      Math.abs(parsedTokens) > Number.MAX_SAFE_INTEGER
    ) {
      return {
        success: false,
        error:
          "Invalid tokens value. Must be a positive integer within safe allowed limits.",
      };
    }

    // Normalize & prepare
    const normalizedUsername = username.trim();
    const normalizedAgentId = agentId.trim();
    const normalizedModelName = modelName.trim();
    const normalizedModelNameLower = normalizedModelName.toLowerCase();
    const addedTokens = parsedTokens;
    const now = new Date();

    // ---- Verify AI model exists and is available ----
    const aiModel = await prisma.AIModel.findUnique({
      where: { modelName: normalizedModelName },
    });
    if (!aiModel) {
      return { success: false, error: `AI model '${normalizedModelName}' not found.` };
    }
    if (new Date(aiModel.availableTill).getTime() < now.getTime()) {
      return { success: false, error: `AI model '${normalizedModelName}' is no longer available.` };
    }

    // ---- Transaction: read-modify-write atomically ----
    const txResult = await prisma.$transaction(async (tx) => {
      // Read agent
      const agent = await tx.CustomerServiceAgents.findUnique({
        where: { agentId: normalizedAgentId },
      });

      if (!agent) {
        throw new Error("AGENT_NOT_FOUND");
      }

      // Ownership check
      if (!agent.username || String(agent.username) !== normalizedUsername) {
        throw new Error("NOT_AGENT_OWNER");
      }

      const rawBalances = Array.isArray(agent.tokenBalances) ? agent.tokenBalances : [];
      const balances = rawBalances.map((b) => ({
        modelName: String(b.modelName),
        availableTokens: Number(b.availableTokens || 0),
        status: b.status ? String(b.status) : "inactive", // keep as-is or default to inactive
        createdAt: b.createdAt ? new Date(b.createdAt) : now,
        updatedAt: b.updatedAt ? new Date(b.updatedAt) : now,
      }));

      // Find index by case-insensitive model name
      const idx = balances.findIndex(
        (b) => String(b.modelName).toLowerCase() === normalizedModelNameLower
      );

      let updatedBalances;
      let updatedTokenBalanceEntry;

      if (idx >= 0) {
        // increment existing entry
        updatedBalances = balances.slice();
        const prev = Number(updatedBalances[idx].availableTokens || 0);
        const newTotal = prev + addedTokens;

        if (!Number.isFinite(newTotal) || Math.abs(newTotal) > Number.MAX_SAFE_INTEGER) {
          throw new Error("TOKEN_AMOUNT_OVERFLOW");
        }

        updatedBalances[idx] = {
          ...updatedBalances[idx],
          availableTokens: newTotal,
          updatedAt: now,
        };
        updatedTokenBalanceEntry = { ...updatedBalances[idx] };
      } else {
        // create new entry (status left to schema default: inactive)
        updatedTokenBalanceEntry = {
          modelName: normalizedModelName,
          availableTokens: addedTokens,
          createdAt: now,
          updatedAt: now,
        };
        updatedBalances = balances.concat(updatedTokenBalanceEntry);
      }

      // Update usingModel if it matches the same model
      let usingModelUpdated = null;
      if (agent.usingModel && agent.usingModel.modelName) {
        const usingModelName = String(agent.usingModel.modelName);
        if (usingModelName.toLowerCase() === normalizedModelNameLower) {
          const prevUsingTokens = Number(agent.usingModel.availableTokens || 0);
          const newUsingTotal = prevUsingTokens + addedTokens;
          if (!Number.isFinite(newUsingTotal) || Math.abs(newUsingTotal) > Number.MAX_SAFE_INTEGER) {
            throw new Error("TOKEN_AMOUNT_OVERFLOW");
          }
          usingModelUpdated = {
            modelName: usingModelName,
            availableTokens: newUsingTotal,
            status: agent.usingModel.status ? String(agent.usingModel.status) : "inactive",
          };
        }
      }

      const updatePayload = {
        tokenBalances: updatedBalances,
        lastModified: now,
      };
      if (usingModelUpdated) {
        updatePayload.usingModel = usingModelUpdated;
      }

      const updatedAgent = await tx.CustomerServiceAgents.update({
        where: { agentId: normalizedAgentId },
        data: updatePayload,
      });

      const finalBalances = Array.isArray(updatedAgent.tokenBalances) ? updatedAgent.tokenBalances : [];
      const finalEntry = finalBalances.find(
        (b) => String(b.modelName).toLowerCase() === normalizedModelNameLower
      );

      const finalUsingModel = updatedAgent.usingModel || null;

      return {
        tokenBalanceEntry: {
          modelName: finalEntry ? finalEntry.modelName : updatedTokenBalanceEntry.modelName,
          availableTokens: finalEntry ? Number(finalEntry.availableTokens || 0) : Number(updatedTokenBalanceEntry.availableTokens || 0),
          status: finalEntry ? finalEntry.status : (updatedTokenBalanceEntry.status || "inactive"),
          createdAt: finalEntry ? finalEntry.createdAt : updatedTokenBalanceEntry.createdAt,
          updatedAt: finalEntry ? finalEntry.updatedAt : updatedTokenBalanceEntry.updatedAt,
        },
        usingModel: finalUsingModel
          ? {
              modelName: finalUsingModel.modelName,
              availableTokens: Number(finalUsingModel.availableTokens || 0),
              status: finalUsingModel.status || "inactive",
            }
          : null,
      };
    });

    if (!txResult || !txResult.tokenBalanceEntry) {
      return { success: false, error: "Failed to allot tokens due to unexpected state." };
    }

    // Sanitize metadata echo
    const safeMetadata = {};
    if (metadata && typeof metadata === "object") {
      if (typeof metadata.receipt === "string") safeMetadata.receipt = metadata.receipt;
      if (typeof metadata.source === "string") safeMetadata.source = metadata.source;
    }

    return {
      success: true,
      data: {
        agentId: normalizedAgentId,
        username: normalizedUsername,
        modelName: normalizedModelName,
        addedTokens: Number(addedTokens),
        newModelAvailableTokens: Number(txResult.tokenBalanceEntry.availableTokens || 0),
        tokenBalanceEntry: txResult.tokenBalanceEntry,
        usingModel: txResult.usingModel,
        metadata: safeMetadata,
      },
    };
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === "AGENT_NOT_FOUND") {
        return { success: false, error: "Agent not found." };
      }
      if (err.message === "NOT_AGENT_OWNER") {
        return {
          success: false,
          error: "You are not authorized to modify tokens for this agent.",
        };
      }
      if (err.message === "TOKEN_AMOUNT_OVERFLOW") {
        return {
          success: false,
          error: "Token quantity would exceed allowed numeric limits. Please contact support.",
        };
      }
    }

    console.error("❌ Error in allotTokensToUsersAgentAfterPurchase:", err);

    return {
      success: false,
      error: "Internal server error while allotting tokens. Please try again later.",
    };
  }
}

module.exports = allotTokensToUsersAgentAfterPurchase;


// (async () => {
//   try {
//     console.log("🔹 Test 1: Adding GPT-4 tokens...");
//     const result1 = await allotTokensToUsersAgentAfterPurchase({
//       username: "arjun_agent01",
//       agentId: "AGT-50345a8fdb40c313",
//       modelName: "gpt-4",
//       tokens: 500,
//       metadata: { receipt: "rcpt_gpt4_001", source: "razorpay" },
//     });
//     console.log("✅ Result 1:", result1);

//     console.log("\n🔹 Test 2: Adding Claude-3 tokens...");
//     const result2 = await allotTokensToUsersAgentAfterPurchase({
//       username: "arjun_agent01",
//       agentId: "AGT-50345a8fdb40c313",
//       modelName: "gpt-5",
//       tokens: 100000,
//       metadata: { receipt: "rcpt_claude3_001", source: "razorpay" },
//     });
//     console.log("✅ Result 2:", result2);

//     process.exit(0);
//   } catch (err) {
//     console.error("❌ Test script error:", err);
//     process.exit(1);
//   }
// })();
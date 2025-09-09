/**
 * @file utils/payment/allot_tokens_to_users_agent_after_purchase.js
 * @description
 * Atomically allots purchased AI-model-specific tokens to a CustomerServiceAgents record.

* Purpose:
 *  - Validate inputs and ownership.
 *  - Verify `modelName` exists in `AIModel` (safety).
 *  - Atomically read the current agent record and write back:
 *      • increment `availableTokens` by the purchased amount
 *      • update or create the token balance entry for `modelName` with status "active"
 *      • update `lastModified`
 *
 * Atomicity / Concurrency:
 *  - Uses Prisma transaction callback to ensure the read/modify/write is atomic on the DB side.
 *
 * Security & Validations:
 *  - username must match the agent.username
 *  - tokens must be a positive safe integer
 *  - modelName must exist in AIModel and be active (availableTill in the future)
 *
 * @module allotTokensToAgentAfterPurchase
 */

const { PrismaClient } = require("../generated/customer-service");
const prisma = new PrismaClient();

/**
 * @typedef {Object} AllotParams
 * @property {string} username        - Username of the purchaser (must match agent owner)
 * @property {string} agentId         - Agent ID to which tokens should be added
 * @property {string} modelName       - AI model name the tokens are for (e.g., "gpt-4")
 * @property {number} tokens          - Number of tokens to add (positive integer)
 * @property {Object} [metadata]      - Optional metadata (e.g., order receipt, source, notes)
 *
 * @typedef {Object} AllotResult
 * @property {boolean} success
 * @property {Object} [data]          - Present on success: { agentId, username, modelName, addedTokens, newAvailableTokens, tokenBalanceEntry }
 * @property {string} [error]         - Present on failure (client-safe)
 *
 * @async
 * @function allotTokensToUsersAgentAfterPurchase
 * @param {AllotParams} params
 * @returns {Promise<AllotResult>}
 *
 * @example
 * const result = await allotTokensToUsersAgentAfterPurchase({
 *   username: "arjun_agent01",
 *   agentId: "AGT-50345a8fdb40c313",
 *   modelName: "gpt-4",
 *   tokens: 1500,
 *   metadata: { receipt: "rcpt12345", source: "razorpay" }
 * });
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

    // tokens must be integer > 0 and safe
    const parsedTokens = Number(tokens);
    if (
      !Number.isFinite(parsedTokens) ||
      !Number.isInteger(parsedTokens) ||
      parsedTokens <= 0 ||
      Math.abs(parsedTokens) > Number.MAX_SAFE_INTEGER
    ) {
      return {
        success: false,
        error: "Invalid tokens value. Must be a positive integer within safe limits.",
      };
    }

    // Normalize strings
    const normalizedUsername = username.trim();
    const normalizedAgentId = agentId.trim();
    const normalizedModelName = modelName.trim();

    const now = new Date();

    // ---- Optional: verify the AI model exists and is available ----
    const aiModel = await prisma.AIModel.findUnique({
      where: { modelName: normalizedModelName },
    });
    if (!aiModel) {
      return {
        success: false,
        error: `AI model '${normalizedModelName}' not found.`,
      };
    }
    if (new Date(aiModel.availableTill).getTime() < now.getTime()) {
      return {
        success: false,
        error: `AI model '${normalizedModelName}' is no longer available.`,
      };
    }

    // ---- Transaction: read agent, validate ownership, modify tokenBalances, update availableTokens ----
    const addedTokens = parsedTokens;

    const updatedAgent = await prisma.$transaction(async (tx) => {
      // Read current agent
      const agent = await tx.CustomerServiceAgents.findUnique({
        where: { agentId: normalizedAgentId },
      });

      if (!agent) {
        // Throwing an error will cause the transaction to rollback.
        throw new Error("AGENT_NOT_FOUND");
      }

      // Ownership check
      if (!agent.username || String(agent.username) !== normalizedUsername) {
        throw new Error("NOT_AGENT_OWNER");
      }

      // Read existing tokenBalances (if schema updated); handle missing gracefully
      const existingBalances = Array.isArray(agent.tokenBalances)
        ? agent.tokenBalances.map((b) => ({
            // normalize to plain JS objects to avoid surprises
            modelName: String(b.modelName),
            tokens: Number(b.tokens) || 0,
            status: b.status ? String(b.status) : "active",
            createdAt: b.createdAt ? new Date(b.createdAt) : new Date(),
            updatedAt: b.updatedAt ? new Date(b.updatedAt) : new Date(),
          }))
        : [];

      // Find existing entry for the model with status "active"
      const idx = existingBalances.findIndex(
        (b) => String(b.modelName) === normalizedModelName && String(b.status) === "active"
      );

      let newBalances;
      let tokenBalanceEntry;

      if (idx >= 0) {
        // Update the existing entry (immutably)
        newBalances = existingBalances.slice();
        const old = newBalances[idx];
        const newCount = Number(old.tokens || 0) + addedTokens;
        newBalances[idx] = {
          ...old,
          tokens: Number(newCount),
          updatedAt: now,
        };
        tokenBalanceEntry = { ...newBalances[idx] };
      } else {
        // Create new entry and append
        tokenBalanceEntry = {
          modelName: normalizedModelName,
          tokens: Number(addedTokens),
          status: "active",
          createdAt: now,
          updatedAt: now,
        };
        newBalances = existingBalances.concat(tokenBalanceEntry);
      }

      // Compute new overall availableTokens (ensure integer)
      const prevAvailable = Number(agent.availableTokens || 0);
      const newAvailableTokens = prevAvailable + Number(addedTokens);

      // Build update payload
      const updateData = {
        tokenBalances: newBalances,
        availableTokens: newAvailableTokens,
        lastModified: now,
      };

      // We also optionally store a short audit entry in modificationHistory or elsewhere.
      // To keep data minimal we won't push a huge history entry here by default.
      // If you want an audit trail of token allotments, consider creating a separate collection
      // or push a small object to modificationHistory (not implemented automatically here).

      // Perform the update
      const updated = await tx.CustomerServiceAgents.update({
        where: { agentId: normalizedAgentId },
        data: updateData,
      });

      return { updated, tokenBalanceEntry };
    }); // end transaction

    // If transaction returns an object or throws, handle accordingly
    if (!updatedAgent || !updatedAgent.updated) {
      // This is an unexpected condition — something went wrong in the transaction
      return {
        success: false,
        error: "Failed to allot tokens due to an unexpected state.",
      };
    }

    // Return success with sanitized info
    return {
      success: true,
      data: {
        agentId: normalizedAgentId,
        username: normalizedUsername,
        modelName: normalizedModelName,
        addedTokens: Number(addedTokens),
        newAvailableTokens: Number(updatedAgent.updated.availableTokens || 0),
        tokenBalanceEntry: updatedAgent.tokenBalanceEntry,
        // minimal metadata echo (do not include large objects)
        metadata: typeof metadata === "object" && metadata !== null ? { ...(metadata.receipt ? { receipt: metadata.receipt } : {}), ...(metadata.source ? { source: metadata.source } : {}) } : {},
      },
    };
  } catch (err) {
    // Transaction error mapping for client-safe messages
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
    }

    // Log internal error and return generic message
    console.error("❌ Error in allotTokensToUsersAgentAfterPurchase:", err);
    return {
      success: false,
      error: "Internal server error while allotting tokens. Please try again later.",
    };
  }
}

module.exports = allotTokensToUsersAgentAfterPurchase;
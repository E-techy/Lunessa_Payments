// utils/admin/allot_tokens_to_customer_service_agents.js
const { PrismaClient } = require("../../generated/customer-service");
const prisma = new PrismaClient();

/**
 * Allot (add or deduct) tokens for a Customer Service Agent on a specific model.
 *
 * 🔹 Access Control:
 *   - Only admins with role `superAdmin` or `payments` can allot/deduct tokens.
 *
 * 🔹 Input:
 * @param {Object} params - Input parameters.
 * @param {string} params.adminRole - Admin role ("superAdmin" | "payments").
 * @param {string} params.agentId - Unique ID of the agent.
 * @param {string} params.modelName - Name of the model to which tokens will be added/deducted.
 * @param {number} params.tokensToAdd - Number of tokens to add (can be positive or negative).
 *
 * 🔹 Behavior:
 * 1. Validates `adminRole`.
 * 2. Validates `tokensToAdd` (must be integer, not zero).
 * 3. Ensures the `modelName` exists in `AIModel` and is not expired (`availableTill >= now`).
 * 4. Finds the agent using `agentId`.
 * 5. Updates balances:
 *    - Always check and update `usingModel` first.
 *      • If `usingModel.modelName` matches, update tokens.
 *      • If balance < 0 → reject.
 *      • Status is `active` only if using model and tokens > 0.
 *    - Then update `tokenBalances`:
 *      • If entry exists, update tokens.
 *      • If not, create a new entry (status = `active` only if matches `usingModel`, else `inactive`).
 *      • Cannot deduct from non-existing entry.
 * 6. Updates `lastModified`.
 *
 * 🔹 Output:
 * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
 *   - success: true → Returns updated agent details.
 *   - success: false → Returns error reason.
 *
 * 🔹 Example:
 * ```js
 * const result = await allotTokensToAgent({
 *   adminRole: "payments",
 *   agentId: "AGT-50345a8fdb40c313",
 *   modelName: "gpt-4",
 *   tokensToAdd: 50
 * });
 * console.log(result);
 * ```
 */
async function allotTokensToAgent({ adminRole, agentId, modelName, tokensToAdd }) {
  try {
    // 1. Authorization check
    if (!["superAdmin", "payments"].includes(adminRole)) {
      return {
        success: false,
        error: "Unauthorized: Admin role not permitted to allot tokens.",
      };
    }

    // 2. Validate tokensToAdd
    if (!Number.isInteger(tokensToAdd) || tokensToAdd === 0) {
      return {
        success: false,
        error: "Invalid tokensToAdd: must be a non-zero integer.",
      };
    }

    // 3. Validate modelName against AIModel
    const aiModel = await prisma.AIModel.findUnique({
      where: { modelName },
    });

    if (!aiModel) {
      return { success: false, error: `Invalid modelName: ${modelName} does not exist.` };
    }

    if (new Date(aiModel.availableTill) < new Date()) {
      return { success: false, error: `Model ${modelName} is expired and cannot receive tokens.` };
    }

    // 4. Find agent
    const agent = await prisma.CustomerServiceAgents.findUnique({
      where: { agentId },
    });

    if (!agent) {
      return { success: false, error: `No agent found with agentId: ${agentId}` };
    }

    let tokenBalances = agent.tokenBalances || [];
    let usingModel = agent.usingModel || null;

    // 5. Update usingModel first if it matches
    if (usingModel && usingModel.modelName === modelName) {
      const newTokenCount = usingModel.availableTokens + tokensToAdd;
      if (newTokenCount < 0) {
        return {
          success: false,
          error: "Insufficient tokens in usingModel: cannot deduct more tokens than available.",
        };
      }
      usingModel = {
        ...usingModel,
        availableTokens: newTokenCount,
        status: newTokenCount > 0 ? "active" : "inactive",
      };
    }

    // 6. Update tokenBalances
    let updated = false;
    tokenBalances = tokenBalances.map((tb) => {
      if (tb.modelName === modelName) {
        const newTokenCount = tb.availableTokens + tokensToAdd;
        if (newTokenCount < 0) {
          throw new Error("Insufficient tokens: cannot deduct more tokens than available.");
        }
        updated = true;
        return {
          ...tb,
          availableTokens: newTokenCount,
          updatedAt: new Date(),
          status:
            usingModel && usingModel.modelName === modelName
              ? newTokenCount > 0
                ? "active"
                : "inactive"
              : "inactive",
        };
      }
      return tb;
    });

    if (!updated) {
      if (tokensToAdd < 0) {
        return {
          success: false,
          error: "Cannot deduct tokens: model entry not found.",
        };
      }
      tokenBalances.push({
        modelName,
        availableTokens: tokensToAdd,
        status:
          usingModel && usingModel.modelName === modelName
            ? tokensToAdd > 0
              ? "active"
              : "inactive"
            : "inactive",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // 7. Persist updates
    const updatedAgent = await prisma.CustomerServiceAgents.update({
      where: { agentId },
      data: {
        tokenBalances,
        usingModel,
        lastModified: new Date(),
      },
    });

    return { success: true, data: updatedAgent };
  } catch (error) {
    console.error("❌ Error allotting tokens:", error);
    return { success: false, error: error.message || "Failed to allot tokens." };
  }
}

module.exports = allotTokensToAgent;

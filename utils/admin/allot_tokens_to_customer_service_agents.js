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
 * - Validates `adminRole`.
 * - Validates `tokensToAdd` (must be integer, not zero).
 * - Finds the agent using `agentId`.
 * - Updates `tokenBalances[modelName]`:
 *    • If entry exists → update tokens.  
 *    • If not → add a new entry.  
 * - Updates `usingModel` tokens if the active model matches `modelName`.
 * - Ensures token counts never go below zero.
 * - Updates `lastModified` timestamp.
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

    // 3. Find agent
    const agent = await prisma.customerServiceAgents.findUnique({
      where: { agentId },
    });

    if (!agent) {
      return { success: false, error: `No agent found with agentId: ${agentId}` };
    }

    let tokenBalances = agent.tokenBalances || [];
    let usingModel = agent.usingModel || null;

    // 4. Update tokenBalances entry for modelName
    let updated = false;
    tokenBalances = tokenBalances.map((tb) => {
      if (tb.modelName === modelName) {
        const newTokenCount = tb.availableTokens + tokensToAdd;
        if (newTokenCount < 0) {
          throw new Error(
            "Insufficient tokens: cannot deduct more tokens than available."
          );
        }
        updated = true;
        return {
          ...tb,
          availableTokens: newTokenCount,
          updatedAt: new Date(),
          status: newTokenCount > 0 ? "active" : "inactive",
        };
      }
      return tb;
    });

    if (!updated) {
      // If entry not found, create a new one
      if (tokensToAdd < 0) {
        return {
          success: false,
          error: "Cannot deduct tokens: model entry not found.",
        };
      }
      tokenBalances.push({
        modelName,
        availableTokens: tokensToAdd,
        status: tokensToAdd > 0 ? "active" : "inactive",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // 5. Update usingModel if same model
    if (usingModel && usingModel.modelName === modelName) {
      const newTokenCount = usingModel.availableTokens + tokensToAdd;
      if (newTokenCount < 0) {
        return {
          success: false,
          error:
            "Insufficient tokens in usingModel: cannot deduct more tokens than available.",
        };
      }
      usingModel = {
        ...usingModel,
        availableTokens: newTokenCount,
        status: newTokenCount > 0 ? "active" : "inactive",
      };
    }

    // 6. Persist updates
    const updatedAgent = await prisma.customerServiceAgents.update({
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

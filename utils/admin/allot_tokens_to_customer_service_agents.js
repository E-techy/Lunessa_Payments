const { PrismaClient } = require('../../generated/customer-service');
const prisma = new PrismaClient();

/**
 * Allot (add or deduct) tokens for a Customer Service Agent.
 *
 * 🔹 Access Control:
 *   - Only admins with role `superAdmin` or `payments` can allot/deduct tokens.
 *
 * 🔹 Input:
 * @param {Object} params - Input parameters.
 * @param {string} params.adminRole - Admin role ("superAdmin" | "payments").
 * @param {string} params.agentId - Unique ID of the agent.
 * @param {number} params.tokensToAdd - Number of tokens to add (can be positive or negative).
 *
 * 🔹 Behavior:
 * - Validates `adminRole`.
 * - Validates `tokensToAdd` (must be integer, not zero).
 * - Finds the agent using `agentId`.
 * - Updates `availableTokens` (ensures it never goes below zero).
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
 *   agentId: "agent_12345",
 *   tokensToAdd: -20
 * });
 * console.log(result);
 * // { success: true, data: { agentId: "agent_12345", availableTokens: 80, ... } }
 * ```
 */
async function allotTokensToAgent({ adminRole, agentId, tokensToAdd }) {
  try {
    // 1. Authorization check
    if (!["superAdmin", "payments"].includes(adminRole)) {
      return { success: false, error: "Unauthorized: Admin role not permitted to allot tokens." };
    }

    // 2. Validate tokensToAdd
    if (!Number.isInteger(tokensToAdd) || tokensToAdd === 0) {
      return { success: false, error: "Invalid tokensToAdd: must be a non-zero integer." };
    }

    // 3. Find agent
    const agent = await prisma.CustomerServiceAgents.findUnique({
      where: { agentId },
    });

    if (!agent) {
      return { success: false, error: `No agent found with agentId: ${agentId}` };
    }

    // 4. Compute new token balance
    const newTokenCount = agent.availableTokens + tokensToAdd;
    if (newTokenCount < 0) {
      return { success: false, error: "Insufficient tokens: cannot deduct more tokens than available." };
    }

    // 5. Update tokens & lastModified
    const updatedAgent = await prisma.CustomerServiceAgents.update({
      where: { agentId },
      data: {
        availableTokens: newTokenCount,
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

// utils/show_agents_token_detail.js
const { PrismaClient } = require('../generated/customer-service');
const prisma = new PrismaClient();

/**
 * Fetch agent token details by username.
 *
 * This function queries the CustomerServiceAgents model to retrieve
 * details of all agents associated with the given username.
 *
 * Returned fields include:
 *  - agentId
 *  - agentName
 *  - tokenBalances   → array of all model balances
 *  - usingModel      → currently active model
 *  - defaultModel    → fallback model
 *  - lastModified
 *  - createdAt
 * If agentId is provided → return only that agent (if owned by username).
 * @async
 * @function showAgentsTokenDetail
 * @param {string} username - The username of the agent's owner.
 * @param {string} [agentId] - Optional agentId filter.
 * @returns {Promise<Object>} - Structured response object.
 *
 * Success response format:
 * {
 *   success: true,
 *   agents: [
 *     {
 *       agentId: string,
 *       agentName: string,
 *       tokenBalances: Array<{ modelName, availableTokens, status, createdAt, updatedAt }>,
 *       usingModel: { modelName, availableTokens, status } | null,
 *       defaultModel: { modelName, availableTokens } | null,
 *       lastModified: Date,
 *       createdAt: Date
 *     }
 *   ]
 * }
 *
 * Failure response format:
 * {
 *   success: false,
 *   error: string
 * }
 */

async function showAgentsTokenDetail(username, agentId = null) {
  try {
    if (!username || typeof username !== "string") {
      return {
        success: false,
        error: "Invalid or missing username",
      };
    }

    let agents;

    if (agentId) {
      // ✅ Fetch specific agent by username + agentId
      agents = await prisma.CustomerServiceAgents.findMany({
        where: { username, agentId },
        select: {
          agentId: true,
          agentName: true,
          tokenBalances: true,
          usingModel: true,
          defaultModel: true,
          lastModified: true,
          createdAt: true,
        },
      });

      if (!agents || agents.length === 0) {
        return {
          success: false,
          error: `No agent found for username '${username}' with agentId '${agentId}'`,
        };
      }
    } else {
      // ✅ Fetch all agents owned by username
      agents = await prisma.CustomerServiceAgents.findMany({
        where: { username },
        select: {
          agentId: true,
          agentName: true,
          tokenBalances: true,
          usingModel: true,
          defaultModel: true,
          lastModified: true,
          createdAt: true,
        },
      });

      if (!agents || agents.length === 0) {
        return {
          success: false,
          error: `No agents found for username: ${username}`,
        };
      }
    }

    return {
      success: true,
      agents,
    };
  } catch (error) {
    console.error("❌ Error in showAgentsTokenDetail:", error);
    return {
      success: false,
      error: "An unexpected error occurred while fetching agent details",
    };
  }
}

module.exports = showAgentsTokenDetail;


// (async () => {
//   const all = await showAgentsTokenDetail("arjun_agent01");
//   console.log(JSON.stringify(all, null, 2));
// })();

module.exports = showAgentsTokenDetail;

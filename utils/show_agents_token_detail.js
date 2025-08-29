// utils/show_agents_token_detail.js
const { PrismaClient } = require("@prisma/client");
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
 *  - availableTokens
 *  - lastModified
 *  - createdAt
 *
 * @async
 * @function showAgentsTokenDetail
 * @param {string} username - The username of the agent to search for.
 * @returns {Promise<Object>} - Returns a structured response object.
 *
 * Success response format:
 * {
 *   success: true,
 *   agents: [
 *     {
 *       agentId: string,
 *       agentName: string,
 *       availableTokens: number,
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
async function showAgentsTokenDetail(username) {
  try {
    // Input validation
    if (!username || typeof username !== "string") {
      return {
        success: false,
        error: "Invalid or missing username",
      };
    }

    // Fetch agents by username
    const agents = await prisma.CustomerServiceAgents.findMany({
      where: { username },
      select: {
        agentId: true,
        agentName: true,
        availableTokens: true,
        lastModified: true,
        createdAt: true,
      },
    });

    // If no agents found
    if (!agents || agents.length === 0) {
      return {
        success: false,
        error: `No agents found for username: ${username}`,
      };
    }

    // Success response
    return {
      success: true,
      agents,
    };
  } catch (error) {
    console.error("Error in showAgentsTokenDetail:", error);
    return {
      success: false,
      error: "An unexpected error occurred while fetching agent details",
    };
  }
}

module.exports = showAgentsTokenDetail;

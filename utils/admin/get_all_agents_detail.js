// utils/admin/get_all_agents_detail.js
const { PrismaClient } = require("../../generated/customer-service");
const prisma = new PrismaClient();

/**
 * Fetch detailed agent records for admin usage.
 *
 * Permissions:
 * - Only admins with role: "superAdmin", "edit", "delete", or "payment" can access.
 *
 * Inputs:
 * - adminRole   (string) → Role of the admin user
 * - agentId     (string | optional) → Specific agentId to fetch
 * - agentName   (string | optional) → Specific agentName to fetch
 *
 * Behavior:
 * - If no agentId or agentName → returns all agents
 * - If agentId is provided → returns only that agent (if exists)
 * - If agentName is provided → returns only that agent (if exists)
 *
 * Output format (success case):
 * {
 *   success: true,
 *   agents: [
 *     {
 *       agentId: string,
 *       agentName: string,
 *       username: string,
 *       companyName: string,
 *       companyEmail: string,
 *       companyDescription: string,
 *       tokenBalances: [...],
 *       usingModel: {...} | null,
 *       defaultModel: {...} | null,
 *       lastModified: Date,
 *       createdAt: Date
 *     }
 *   ]
 * }
 *
 * Output format (failure case):
 * {
 *   success: false,
 *   error: "reason of failure"
 * }
 *
 * @async
 * @function getAllAgentsDetail
 * @param {string} adminRole - Role of the admin making the request
 * @param {string} [agentId] - Optional agentId to fetch
 * @param {string} [agentName] - Optional agentName to fetch
 * @returns {Promise<Object>} - Success/failure response object
 */
async function getAllAgentsDetail(adminRole, agentId = null, agentName = null) {
  try {
    // ✅ Role verification
    const allowedRoles = ["superAdmin", "edit", "delete", "payment"];
    if (!adminRole || !allowedRoles.includes(adminRole)) {
      return {
        success: false,
        error: "Unauthorized access. Insufficient admin privileges.",
      };
    }

    let agents = [];

    // ✅ Case 1: Fetch by agentId
    if (agentId) {
      const agent = await prisma.CustomerServiceAgents.findUnique({
        where: { agentId: agentId.trim() },
      });

      if (!agent) {
        return {
          success: false,
          error: `No agent found with agentId: ${agentId}`,
        };
      }

      agents = [agent];
    }
    // ✅ Case 2: Fetch by agentName
    else if (agentName) {
      const agent = await prisma.CustomerServiceAgents.findFirst({
        where: { agentName: { equals: agentName.trim(), mode: "insensitive" } },
      });

      if (!agent) {
        return {
          success: false,
          error: `No agent found with agentName: ${agentName}`,
        };
      }

      agents = [agent];
    }
    // ✅ Case 3: Fetch all agents
    else {
      agents = await prisma.CustomerServiceAgents.findMany();

      if (!agents || agents.length === 0) {
        return {
          success: false,
          error: "No agents found in the database.",
        };
      }
    }

    return {
      success: true,
      agents,
    };
  } catch (err) {
    console.error("❌ Error in getAllAgentsDetail:", err.message);

    return {
      success: false,
      error: "Unexpected server error while fetching agent details.",
    };
  }
}

module.exports = getAllAgentsDetail;

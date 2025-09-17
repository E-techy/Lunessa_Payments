// utils/routes_handler/admin_allot_tokens_to_agents.js
const allotTokensToAgent = require("../admin/allot_tokens_to_customer_service_agents");
const { PrismaClient } = require("../../generated/customer-service");
const prisma = new PrismaClient();

/**
 * Handle admin requests to allot tokens to customer service agents.
 *
 * Modes:
 * 1️⃣ Bulk Mode → req.body.usernames = [
 *      { username: "user1", agentId: "agent123", modelName: "gpt-4", tokensToAdd: 50 },
 *      { username: "user2", agentId: "agent456", modelName: "gpt-3.5", tokensToAdd: -10 }
 *    ]
 * 2️⃣ Single Mode → req.body = {
 *      agentId: "agent789",
 *      modelName: "gpt-4",
 *      tokensToAdd: 30
 *    }
 *
 * Permissions:
 * - Only `superAdmin` or `payments` admins can allot/deduct tokens.
 *
 * @async
 * @function handleAdminAllotTokens
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {string} req.adminRole - Role of the authenticated admin (from middleware)
 */
async function handleAdminAllotTokens(req, res) {
  const { adminRole } = req;
  try {
    const { usernames, username, agentId, modelName, tokensToAdd } = req.body;

    // 1️⃣ Bulk Mode
    if (Array.isArray(usernames) && usernames.length > 0) {
      const results = [];
      for (const entry of usernames) {
        const { username, agentId, modelName, tokensToAdd } = entry;

        if (!username || !agentId || !modelName || !Number.isInteger(tokensToAdd)) {
          results.push({
            success: false,
            error: "Invalid entry: username, agentId, modelName, and integer tokensToAdd are required.",
            entry,
          });
          continue;
        }

        // Verify ownership: username must own this agentId
        const agent = await prisma.CustomerServiceAgents.findUnique({
          where: { agentId },
        });

        if (!agent || agent.username !== username) {
          results.push({
            success: false,
            error: `Agent ownership mismatch for agentId ${agentId}.`,
            entry,
          });
          continue;
        }

        // Allot tokens using helper function
        const result = await allotTokensToAgent({ adminRole, agentId, modelName, tokensToAdd });
        results.push({ ...result, agentId, username, modelName });
      }

      return res.status(200).json({ success: true, results });
    }

    // 2️⃣ Single Mode
    if (agentId && modelName && Number.isInteger(tokensToAdd)) {
      let result;
      const agent = await prisma.CustomerServiceAgents.findUnique({ where: { agentId} });

      if (!agent) {
        return res.status(404).json({ success: false, error: `No agent found with agentId: ${agentId}` });
      }
      console.log(username);
      console.log(agent.username);

      
      if (!agent || agent.username !== username) {
          result= {
            success: false,
            error: `Agent ownership mismatch for agentId ${agentId}.`
          };
        }
        else {
         result = await allotTokensToAgent({ adminRole, agentId, modelName, tokensToAdd });

        }

      return res.status(result.success ? 200 : 400).json(result);
    }

    // Invalid request
    return res.status(400).json({
      success: false,
      error: "Invalid request. Provide either `usernames` array (bulk) or `{ agentId, modelName, tokensToAdd }` (single).",
    });
  } catch (error) {
    console.error("❌ Error in handleAdminAllotTokens:", error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
}

module.exports = handleAdminAllotTokens;

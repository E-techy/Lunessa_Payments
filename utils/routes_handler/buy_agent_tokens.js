// utils/routes_handler/buy_agent_tokens.js
const path = require("path");
const { PrismaClient } = require("../../generated/customer-service"); // ✅ generated client for CompanyAgentsRegistered
const prisma = new PrismaClient();

/**
 * Route handler for secure agent token buyer page
 *
 * - Ensures user is authenticated
 * - Verifies ownership of the requested agentId
 * - Renders the EJS page with selectedAgent variable
 */
async function buyAgentTokensHandler(req, res) {
  try {
    const { agentId } = req.query;
    const username = req.user?.username;

    if (!agentId || !username) {
      return res.status(400).json({
        success: false,
        error: "Missing agentId or user authentication.",
      });
    }

    // ✅ Find user's registered agents
    const userRecord = await prisma.CompanyAgentsRegistered.findUnique({
      where: { username },
    });

    if (!userRecord) {
      return res.status(403).json({
        success: false,
        error: "User not found or not authorized.",
      });
    }

    // ✅ Check ownership of agentId
    const ownsAgent = userRecord.agents.some(
      (agent) => agent.agentId === agentId.trim()
    );

    if (!ownsAgent) {
      return res.status(403).json({
        success: false,
        error: "You do not own this agent.",
      });
    }

    // ✅ Render HTML with EJS injecting selectedAgent
    return res.render(
      path.join(__dirname, "../../Lunessa_Buy_Tokens_Page/Agent_tokens_buyer.ejs"),
      { selectedAgent: agentId.trim() }
    );
  } catch (err) {
    console.error("❌ Error in buyAgentTokensHandler:", err.message);
    return res.status(500).json({
      success: false,
      error: "Unexpected error while loading token buyer page.",
    });
  }
}

module.exports = buyAgentTokensHandler;

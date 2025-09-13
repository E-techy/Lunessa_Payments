const showAgentsTokenDetail = require("../show_agents_token_detail");

/**
 * Route handler for viewing agent token details
 *
 * - Requires authenticated user
 * - Accepts optional `agentId` in request body/query
 * - Returns token balances and usage info
 */
async function viewAgentTokensHandler(req, res) {
  try {
    const { username } = req.user; // ✅ from authenticateUser middleware
    const { agentId } = req.body || req.query; // ✅ flexible: support both

    const result = await showAgentsTokenDetail(username, agentId);

    if (!result.success) {
      return res.status(404).json(result);
    }

    return res.json(result);
  } catch (error) {
    console.error("❌ Error in viewAgentTokensHandler:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

module.exports = viewAgentTokensHandler;

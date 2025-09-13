// utils/routes_handler/admin_view_agents.js
const getAllAgentsDetail = require("../admin/get_all_agents_detail");

/**
 * Route handler for admin viewing agent details.
 *
 * - Requires admin authentication (handled by authenticateAdmin middleware).
 * - Supports optional filtering by `agentId` or `agentName`.
 * - Returns all agents if no filters provided.
 *
 * Input:
 *   req.adminRole (string) → injected by authenticateAdmin middleware
 *   req.body.agentId (string | optional)
 *   req.body.agentName (string | optional)
 *
 * Output (Success):
 * {
 *   success: true,
 *   agents: [ ...agents data... ]
 * }
 *
 * Output (Failure):
 * {
 *   success: false,
 *   error: "reason for failure"
 * }
 */
async function adminViewAgentsHandler(req, res) {
  try {
    const { adminRole } = req;
    const { agentId, agentName } = req.body || {};

    const result = await getAllAgentsDetail(adminRole, agentId, agentName);

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.json(result);
  } catch (err) {
    console.error("❌ Error in adminViewAgentsHandler:", err.message);
    return res.status(500).json({
      success: false,
      error: "Internal server error while fetching agent details",
    });
  }
}

module.exports = adminViewAgentsHandler;

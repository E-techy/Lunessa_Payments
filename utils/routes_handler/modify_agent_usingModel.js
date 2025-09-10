// utils/routes_handler/modify_agent_usingModel.js
const modifyAgentUsingModelValue = require("../modify_agent_usingModel_value");

/**
 * Route handler for modifying the active/inactive status
 * of an agent's currently active model.
 *
 * @async
 * @function modifyAgentUsingModelHandler
 * @param {import("express").Request} req - Express request object
 * @param {import("express").Response} res - Express response object
 *
 * @returns {Promise<void>} Sends JSON response:
 *   {
 *     success: boolean,
 *     data?: object,
 *     error?: string
 *   }
 */
async function modifyAgentUsingModelHandler(req, res) {
  try {
    const { agentId, modelName, status } = req.body;
    const username = req.user?.username; // from authenticateUser middleware

    if (!username || !agentId || !modelName || !status) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields (username, agentId, modelName, status).",
      });
    }

    const result = await modifyAgentUsingModelValue({
      username,
      agentId,
      modelName,
      status,
    });

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error("❌ Error in modifyAgentUsingModelHandler:", err.message);
    return res.status(500).json({
      success: false,
      error: "Unexpected error while modifying agent's model status.",
    });
  }
}

module.exports = modifyAgentUsingModelHandler;

// utils/routes_handler/admin_modify_disputes.js

const modifyDispute = require("../admin/modify_disputes");

/**
 * Middleware / Route handler to allow admins to modify or delete user disputes.
 *
 * 🔹 Usage: POST /admin/modify_disputes
 * - Requires `authenticateAdmin` middleware before this handler.
 *
 * 🔹 Expected body parameters:
 * @param {string} action - "modify" or "delete"
 * @param {string} username - Target username
 * @param {string|null} [disputeId=null] - Dispute ID (required if all=false)
 * @param {boolean|null} [resolved=false] - Resolution status (only for modify)
 * @param {string|null} [resolvedComment=""] - Admin resolution comment (only for modify)
 * @param {boolean} [all=false] - If true, action applies to all disputes of the username
 *
 * 🔹 Behavior:
 * 1. Validates input types.
 * 2. Ensures only admins with role "superAdmin" or "payments" can perform the action.
 * 3. Calls `modifyDispute` function to perform the modification or deletion.
 * 4. Returns JSON response with success/error.
 *
 * 🔹 Response format:
 * - success: true → Returns updated disputes or confirmation of deletion
 * - success: false → Returns error message
 */
async function adminModifyDisputesHandler(req, res) {
  try {
    const { adminRole } = req;

    // ✅ Role check
    if (!["superAdmin", "payments"].includes(adminRole)) {
      return res.status(403).json({
        success: false,
        error: "Unauthorized: only superAdmin or payments role can modify/delete disputes.",
      });
    }

    // ✅ Extract inputs from body
    const {
      action,
      username,
      disputeId = null,
      resolved = false,
      resolvedComment = "",
      all = false,
    } = req.body || {};

    // 1️⃣ Input validation
    if (!action || !["modify", "delete"].includes(action)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid input: action must be "modify" or "delete".',
      });
    }
    if (!username || typeof username !== "string") {
      return res.status(400).json({
        success: false,
        error: "Invalid input: username must be a non-empty string.",
      });
    }
    if (disputeId !== null && typeof disputeId !== "string") {
      return res.status(400).json({
        success: false,
        error: "Invalid input: disputeId must be a string if provided.",
      });
    }
    if (typeof resolved !== "boolean") {
      return res.status(400).json({
        success: false,
        error: "Invalid input: resolved must be a boolean.",
      });
    }
    if (typeof resolvedComment !== "string") {
      return res.status(400).json({
        success: false,
        error: "Invalid input: resolvedComment must be a string.",
      });
    }
    if (typeof all !== "boolean") {
      return res.status(400).json({
        success: false,
        error: "Invalid input: all must be a boolean.",
      });
    }

    // ✅ Call the admin utility
    const result = await modifyDispute({
      action,
      username,
      disputeId,
      resolved,
      resolvedComment,
      all,
    });

    // ✅ Return result
    if (result.success) {
      return res.status(200).json({ success: true, data: result.data });
    } else {
      return res.status(400).json({ success: false, error: result.error });
    }
  } catch (err) {
    console.error("❌ Error in adminModifyDisputesHandler:", err);
    return res.status(500).json({
      success: false,
      error: err.message || "Internal server error while modifying/deleting disputes.",
    });
  }
}

module.exports = adminModifyDisputesHandler;

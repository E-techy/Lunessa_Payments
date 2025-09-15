// utils/routes_handler/get_your_disputes.js

const getDisputesByUsername = require("../get_disputes_by_username");

/**
 * Route handler: Get all disputes raised by the authenticated user.
 *
 * 🔹 Endpoint:
 * - POST /get_your_disputes
 *
 * 🔹 Middleware:
 * - Requires `authenticateUser` middleware before this handler.
 * - `authenticateUser` attaches `req.user` (with username, id, role).
 *
 * 🔹 Behavior:
 * 1. Extracts the `username` from `req.user` (already verified by JWT).
 * 2. Calls `getDisputesByUsername(username)` to fetch disputes from DB.
 * 3. Returns disputes if found, or an appropriate error message.
 *
 * 🔹 Request (example):
 * ```http
 * POST /get_your_disputes
 * Authorization: Bearer <JWT_TOKEN>
 * ```
 *
 * 🔹 Response (success example):
 * ```json
 * {
 *   "success": true,
 *   "data": {
 *     "username": "john_doe",
 *     "disputes": [
 *       {
 *         "disputeId": "123e4567-e89b-12d3-a456-426614174000",
 *         "orderId": "ORD123",
 *         "disputeComment": "Payment deducted but not confirmed",
 *         "resolved": false,
 *         "createdAt": "2025-09-15T12:00:00.000Z",
 *         "updatedAt": "2025-09-15T12:00:00.000Z"
 *       }
 *     ],
 *     "createdAt": "2025-09-15T12:00:00.000Z",
 *     "updatedAt": "2025-09-15T12:00:00.000Z"
 *   }
 * }
 * ```
 *
 * 🔹 Response (error example):
 * ```json
 * {
 *   "success": false,
 *   "error": "No disputes found for username: john_doe"
 * }
 * ```
 */
async function getYourDisputesHandler(req, res) {
  try {
    // 1. Extract username from authenticated user
    const { username } = req.user;

    if (!username) {
      return res.status(400).json({
        success: false,
        error: "Username not available in request context.",
      });
    }

    // 2. Fetch disputes by username
    const result = await getDisputesByUsername(username);

    // 3. Return result
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json(result);
    }
  } catch (error) {
    console.error("❌ Error in getYourDisputesHandler:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Internal server error while fetching disputes.",
    });
  }
}

module.exports = getYourDisputesHandler;

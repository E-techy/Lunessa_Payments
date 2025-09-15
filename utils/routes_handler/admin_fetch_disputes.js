// utils/routes_handler/admin_fetch_disputes.js

const fetchDisputes = require("../admin/fetch_disputes");

/**
 * Route handler middleware for admins to fetch disputes.
 *
 * 🔹 Endpoint Example:
 * POST /admin/fetch_disputes
 *
 * 🔹 Requirements:
 * - `authenticateAdmin` middleware must run before this handler.
 * - Only admins with role "superAdmin" or "payments" can fetch disputes.
 *
 * 🔹 Input (from req.body):
 * @param {string|null} [username=null] - Optional username to fetch disputes for a specific user.
 * @param {boolean|null} [resolved=null] - Optional resolved filter (true/false). Only applies if username is provided.
 *
 * 🔹 Behavior:
 * 1. Reads `req.adminRole` from `authenticateAdmin`.
 * 2. Reads `username` and `resolved` from `req.body`.
 * 3. Validates input types:
 *    - `username` must be string or null.
 *    - `resolved` must be boolean or null.
 * 4. Calls `fetchDisputes` with the admin role and filters.
 * 5. Returns structured JSON response with disputes or error.
 *
 * 🔹 Output (JSON):
 * - success: true → Returns disputes (all or filtered).
 * - success: false → Returns error reason.
 *
 * 🔹 Example Request Body:
 * ```json
 * {
 *   "username": "john_doe",
 *   "resolved": false
 * }
 * ```
 *
 * 🔹 Example Response:
 * ```json
 * {
 *   "success": true,
 *   "data": {
 *     "username": "john_doe",
 *     "disputes": [
 *       {
 *         "disputeId": "uuid-123",
 *         "orderId": "ORD123",
 *         "disputeComment": "Payment not confirmed",
 *         "resolved": false,
 *         "createdAt": "...",
 *         "updatedAt": "..."
 *       }
 *     ],
 *     "createdAt": "...",
 *     "updatedAt": "..."
 *   }
 * }
 * ```
 */
async function adminFetchDisputesHandler(req, res) {
  try {
    // 1️⃣ Extract admin role from authenticateAdmin
    const { adminRole } = req;

    // 2️⃣ Extract optional filters from request body
    let { username = null, resolved = null } = req.body;

    // 3️⃣ Validate username type
    if (username !== null && typeof username !== "string") {
      return res.status(400).json({
        success: false,
        error: "Invalid input: username must be a string or null.",
      });
    }

    // 4️⃣ Validate resolved type
    if (resolved !== null && typeof resolved !== "boolean") {
      return res.status(400).json({
        success: false,
        error: "Invalid input: resolved must be true, false, or null.",
      });
    }

    // 5️⃣ Call the fetchDisputes utility
    const result = await fetchDisputes({ adminRole, username, resolved });

    // 6️⃣ Send response based on result
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    console.error("❌ Error in adminFetchDisputesHandler:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Internal server error while fetching disputes.",
    });
  }
}

module.exports = adminFetchDisputesHandler;

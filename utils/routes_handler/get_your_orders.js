// utils/routes_handler/get_your_orders.js
const getUserOrders = require("../get_user_orders");

/**
 * Express route handler to fetch all past orders of an authenticated user.
 *
 * 🔹 Route: POST /get_your_orders
 * 🔹 Middleware: authenticateUser (ensures JWT authentication)
 *
 * Workflow:
 * 1. Extracts the `username` from `req.user` (set by `authenticateUser` middleware).
 * 2. Calls the `getUserOrders` utility function to fetch the user's order history.
 * 3. Returns the result in JSON format with proper status codes.
 *
 * Access Control:
 * - Relies on `authenticateUser` middleware for authentication.
 * - Only authenticated users with a valid token can access their orders.
 *
 * Responses:
 * - 200 → { success: true, data: { username, orders: [...] } }
 * - 400 → { success: false, error: "Invalid input" }
 * - 401/403 → { success: false, error: "Authentication required or invalid" }
 * - 500 → { success: false, error: "Internal server error" }
 *
 * Example usage:
 * ```js
 * // client side fetch
 * const response = await fetch("/get_your_orders", {
 *   method: "POST",
 *   headers: {
 *     "Content-Type": "application/json",
 *     "Authorization": "Bearer <JWT_TOKEN>"
 *   }
 * });
 * const data = await response.json();
 * console.log("User Orders:", data);
 * ```
 *
 * @async
 * @function handleGetYourOrders
 * @param {import("express").Request} req - Express request object
 * @param {import("express").Response} res - Express response object
 * @returns {Promise<void>}
 */
async function handleGetYourOrders(req, res) {
  try {
    const { username } = req.user; // injected by authenticateUser middleware

    const result = await getUserOrders(username);

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("❌ Error in handleGetYourOrders:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

module.exports = handleGetYourOrders;

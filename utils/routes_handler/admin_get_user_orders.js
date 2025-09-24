// utils/routes_handler/admin_get_user_orders.js

const getUserOrders = require("../admin/get_user_orders");

/**
 * Admin Route Handler → Fetch user orders
 *
 * 🔹 Usage: POST /admin/get_user_orders
 * - Requires `authenticateAdmin` middleware before this handler.
 *
 * 🔹 Expected body parameters:
 * @param {string} [username] - Username of the user (optional).
 * @param {string} [orderId] - Razorpay orderId to fetch a specific order (optional).
 *
 * 🔹 Behavior:
 * - If no username & no orderId → Fetch all users with their orders.
 * - If only username → Fetch all orders for that user.
 * - If only orderId → Search across all users and return that order.
 * - If both username & orderId → Fetch specific order for that user.
 *
 * 🔹 Access Control:
 * - Only admins with role `superAdmin` or `payments` can use this route.
 *
 * 🔹 Response:
 * - success: true → Returns data (orders or specific order).
 * - success: false → Returns error message.
 */
async function adminGetUserOrdersHandler(req, res) {
  try {
    const { adminRole } = req;

    // ✅ Role check
    if (!["superAdmin", "payments"].includes(adminRole)) {
      return res.status(403).json({
        success: false,
        error: "Unauthorized: only superAdmin or payments role can fetch user orders.",
      });
    }

    // ✅ Extract body parameters
    const { username = null, orderId = null } = req.body || {};

    // ✅ Call utility function
    const result = await getUserOrders({ adminRole, username, orderId });

    if (result.success) {
      return res.status(200).json({ success: true, data: result.data });
    } else {
      return res.status(400).json({ success: false, error: result.error });
    }
  } catch (err) {
    console.error("❌ Error in adminGetUserOrdersHandler:", err);
    return res.status(500).json({
      success: false,
      error: err.message || "Internal server error while fetching user orders.",
    });
  }
}

module.exports = adminGetUserOrdersHandler;

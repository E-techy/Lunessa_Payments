// utils/routes_handler/admin_fetch_razorpay_orders.js
const fetchRazorpayOrders = require("../admin/fetch_razorpay_orders");

/**
 * Route handler for fetching Razorpay orders with flexible criteria.
 *
 * ---
 * 🛡️ Access Control:
 * - Allowed roles: `superAdmin`, `payments`
 *
 * ---
 * 📥 Expected Request Body:
 * {
 *   "orderId": "order_xxxxxxx",   // optional, string → fetch specific order
 *   "allOrders": true,            // optional, boolean (default: false)
 *   "username": "arjun_agent01",  // optional, string → requires allOrders=true
 *   "paymentMethod": "card",      // optional, string → requires allOrders=true
 *   "from": 1694000000,           // optional, number (timestamp in seconds)
 *   "to": 1695000000,             // optional, number (timestamp in seconds)
 *   "count": 10,                  // optional, number (1–100, default 10)
 *   "skip": 0                     // optional, number (pagination, default 0)
 * }
 *
 * ---
 * 📤 Response Format:
 * {
 *   "success": true,
 *   "data": [ ...orders ]   // or single order object if orderId provided
 * }
 *
 * On error:
 * {
 *   "success": false,
 *   "error": "Reason for failure"
 * }
 *
 * ---
 * @param {import("express").Request} req - Express request object
 * @param {import("express").Response} res - Express response object
 */
async function adminFetchRazorpayOrdersHandler(req, res) {
  try {
    // 🛡 Role validation
    if (!["superAdmin", "payments"].includes(req.adminRole)) {
      return res.status(403).json({
        success: false,
        error: "Unauthorized: Only superAdmin or payments role can fetch Razorpay orders",
      });
    }

    // 🔑 Load credentials from env
    const RAZORPAY_KEY_ID = process.env.KEY_ID;
    const RAZORPAY_KEY_SECRET = process.env.KEY_SECRET;

    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
      return res.status(500).json({
        success: false,
        error: "Razorpay credentials are missing in server configuration",
      });
    }

    // 📨 Extract params from body safely
    const {
      orderId,
      allOrders = false,
      username,
      paymentMethod,
      from,
      to,
      count = 10,
      skip = 0,
    } = req.body || {};

    // 🔍 Call fetchRazorpayOrders utility
    const result = await fetchRazorpayOrders({
      RAZORPAY_KEY_ID,
      RAZORPAY_KEY_SECRET,
      orderId,
      allOrders,
      username,
      paymentMethod,
      from,
      to,
      count,
      skip,
    });

    if (!result.success) {
      return res.status(400).json({ success: false, error: result.error });
    }

    return res.status(200).json({ success: true, data: result.data });
  } catch (err) {
    console.error("❌ Error in adminFetchRazorpayOrdersHandler:", err);
    return res.status(500).json({
      success: false,
      error: "Internal server error while fetching Razorpay orders",
    });
  }
}

module.exports = adminFetchRazorpayOrdersHandler;

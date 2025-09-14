// utils/routes_handler/admin_delete_coupons.js
const deleteCoupons = require("../admin/delete_coupons");

/**
 * Express route handler for deleting coupons from users.
 *
 * Permissions:
 * - Allowed admin roles: "superAdmin", "delete", "payments"
 *
 * Expects:
 * - req.body.couponCode {string} → Coupon code to delete
 * - req.body.usernames {string|string[]|optional} → Username(s) to target
 * - req.adminRole → injected from authenticateAdmin middleware
 *
 * Responses:
 * - 200 { success: true, modifiedCount, message }
 * - 400 { success: false, error }
 * - 401 { success: false, error } (unauthorized)
 * - 500 { success: false, error }
 */
async function adminDeleteCouponsHandler(req, res) {
  try {
    const { adminRole } = req;
    const { couponCode, usernames } = req.body;

    const allowedRoles = ["superAdmin", "delete", "payments"];
    if (!allowedRoles.includes(adminRole)) {
      return res
        .status(401)
        .json({ success: false, error: "Unauthorized: insufficient permissions" });
    }

    const result = await deleteCoupons({ couponCode, usernames });

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("❌ Error in adminDeleteCouponsHandler:", error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
}

module.exports = adminDeleteCouponsHandler;

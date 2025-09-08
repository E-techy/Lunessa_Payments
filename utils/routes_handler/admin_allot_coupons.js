/**
 * @file utils/routes_handler/admin_allot_coupons.js
 * @description Handler function for allotting coupons to multiple users.
 */

const addCouponsToUser = require("../admin/add_coupons_to_user");

/**
 * Allot coupons to multiple users.
 *
 * @async
 * @function allotCouponsHandler
 * @param {Object} params
 * @param {string} params.adminRole - Role of the admin ("payments" | "edit" | "superAdmin").
 * @param {string[]} params.users - Array of usernames.
 * @param {Array<Object>} params.couponData - Array of coupon objects.
 *
 * @returns {Promise<{success: boolean, data?: Array, error?: string}>}
 */
async function allotCouponsHandler({ adminRole, users, couponData }) {
  try {
    // 🛡 Role-based access
    if (!["payments", "edit", "superAdmin"].includes(adminRole)) {
      return { success: false, error: "Unauthorized: Admin role not permitted to allot coupons" };
    }

    // 🔍 Validate users array
    if (!Array.isArray(users) || users.length === 0) {
      return { success: false, error: "`users` must be a non-empty array of usernames" };
    }

    const invalidUser = users.find((u) => typeof u !== "string" || !u.trim());
    if (invalidUser) {
      return { success: false, error: "All usernames in `users` must be non-empty strings" };
    }

    // 🔍 Validate couponData array
    if (!Array.isArray(couponData) || couponData.length === 0) {
      return { success: false, error: "`couponData` must be a non-empty array" };
    }

    const requiredCouponFields = ["couponCode", "minOrderValue", "discountType", "discountValue"];
    for (const coupon of couponData) {
      if (typeof coupon !== "object" || coupon === null) {
        return { success: false, error: "Each coupon must be an object" };
      }
      for (const field of requiredCouponFields) {
        if (!(field in coupon)) {
          return { success: false, error: `Coupon validation failed: missing field '${field}'` };
        }
      }
    }

    // ✅ Process each user
    const results = [];
    for (const username of users) {
      const result = await addCouponsToUser({ username, couponsData: couponData });
      results.push({ username, ...result });
    }

    return { success: true, data: results };
  } catch (err) {
    console.error("❌ Error in allotCouponsHandler:", err);
    return { success: false, error: "Internal server error while allotting coupons" };
  }
}

module.exports = allotCouponsHandler;

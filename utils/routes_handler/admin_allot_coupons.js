/**
 * @file utils/routes_handler/admin_allot_coupons.js
 * @description Middleware-like handler for allotting coupons to users (specific or all).
 */

const { PrismaClient } = require("../../generated/customer-service");
const prisma = new PrismaClient();
const addCouponsToUser = require("../admin/add_coupons_to_user");

/**
 * Express-style route handler for allotting coupons.
 *
 * Behavior:
 * - If `allUsers` = true → fetch all usernames from `CompanyAgentsRegistered` collection.
 * - If `allUsers` = false (default) → use `users` array from request body.
 * - Validates adminRole before proceeding.
 * - Validates `couponData` for required fields.
 *
 * @async
 * @function allotCouponsHandler
 * @param {import("express").Request} req - Express request object
 * @param {import("express").Response} res - Express response object
 *
 * @returns {Promise<void>} Sends JSON response
 */
async function allotCouponsHandler(req, res) {
  try {
    const { users, couponData, allUsers = false } = req.body;
    const adminRole = req.adminRole;

    // 🛡 Role-based access
    if (!["payments", "edit", "superAdmin"].includes(adminRole)) {
      return res.status(403).json({ success: false, error: "Unauthorized: Admin role not permitted to allot coupons" });
    }

    // 🔍 Validate couponData array
    if (!Array.isArray(couponData) || couponData.length === 0) {
      return res.status(400).json({ success: false, error: "`couponData` must be a non-empty array" });
    }

    const requiredCouponFields = ["couponCode", "minOrderValue", "discountType", "discountValue"];
    for (const coupon of couponData) {
      if (typeof coupon !== "object" || coupon === null) {
        return res.status(400).json({ success: false, error: "Each coupon must be an object" });
      }
      for (const field of requiredCouponFields) {
        if (!(field in coupon)) {
          return res.status(400).json({ success: false, error: `Coupon validation failed: missing field '${field}'` });
        }
      }
    }

    let targetUsers = [];

    if (allUsers) {
      // 📦 Fetch all usernames from CompanyAgentsRegistered
      const records = await prisma.CompanyAgentsRegistered.findMany({
        select: { username: true },
      });

      targetUsers = records.map((r) => r.username);

      if (targetUsers.length === 0) {
        return res.status(404).json({ success: false, error: "No users found in the database" });
      }
    } else {
      // ✅ Fallback to given users list
      if (!Array.isArray(users) || users.length === 0) {
        return res.status(400).json({ success: false, error: "`users` must be a non-empty array when allUsers is false" });
      }

      const invalidUser = users.find((u) => typeof u !== "string" || !u.trim());
      if (invalidUser) {
        return res.status(400).json({ success: false, error: "All usernames in `users` must be non-empty strings" });
      }

      targetUsers = users;
    }

    // ✅ Process each user
    const results = [];
    for (const username of targetUsers) {
      const result = await addCouponsToUser({ username, couponsData: couponData });
      results.push({ username, ...result });
    }

    return res.status(200).json({ success: true, data: results });
  } catch (err) {
    console.error("❌ Error in allotCouponsHandler:", err);
    return res.status(500).json({ success: false, error: "Internal server error while allotting coupons" });
  }
}

module.exports = allotCouponsHandler;

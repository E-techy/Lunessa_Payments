/**
 * @file utils/routes_handler/admin_allot_coupons.js
 * @description Middleware-like handler for allotting coupons to users (specific or all).
 */

const { PrismaClient } = require("../../generated/customer-service");
const prisma = new PrismaClient();
const addCouponsToUser = require("../admin/add_coupons_to_user");

/**
 * Express-style route handler for allotting coupons to users.
 *
 * This handler acts as middleware for the `/admin/allot_coupons` route and manages
 * coupon distribution either to a specific list of users or to **all registered users**.
 *
 * ---
 * 🔐 Authorization:
 * - Only admins with role `"payments"`, `"edit"`, or `"superAdmin"` can allot coupons.
 *
 * ---
 * 📥 Request Body Parameters (req.body):
 *
 * @param {string[]} [req.body.users] - Array of usernames to allot coupons to.
 *   - Required if `allUsers` is `false` (default).
 *   - Each username must be a **non-empty string**.
 *
 * @param {Object[]} req.body.couponData - Array of coupon objects to allot.
 *   - Must be a non-empty array.
 *   - Each coupon object must include:
 *     @param {string} req.body.couponData[].couponCode - Unique identifier for the coupon.
 *     @param {number} req.body.couponData[].minOrderValue - Minimum order value required to use the coupon.
 *     @param {string} req.body.couponData[].discountType - Type of discount ("percentage" | "flat").
 *     @param {number} req.body.couponData[].discountValue - Value of the discount (percentage or fixed amount).
 *
 * @param {boolean} [req.body.allUsers=false] - Flag indicating whether to allot coupons
 *   to **all users**.
 *   - If `true` → ignores `users` field and fetches all usernames from `CompanyAgentsRegistered`.
 *   - If `false` (default) → requires `users` array to be provided explicitly.
 *
 * ---
 * 🔑 Internal Params (set by middleware):
 *
 * @param {string} req.adminRole - Role of the authenticated admin,
 *   injected by the `authenticateAdmin` middleware.
 *   - Must be `"payments"`, `"edit"`, or `"superAdmin"`.
 *
 * ---
 * 📤 Response (JSON):
 *
 * Success (200):
 * ```json
 * {
 *   "success": true,
 *   "data": [
 *     {
 *       "username": "john_doe",
 *       "success": true,
 *       "message": "Coupons added successfully"
 *     },
 *     {
 *       "username": "jane_doe",
 *       "success": false,
 *       "error": "User not found"
 *     }
 *   ]
 * }
 * ```
 *
 * Error (4xx / 5xx):
 * ```json
 * {
 *   "success": false,
 *   "error": "Detailed error message"
 * }
 * ```
 *
 * ---
 * ⚙️ Behavior:
 * 1. Validates admin role.
 * 2. Validates `couponData` structure.
 * 3. Determines target users:
 *    - From `CompanyAgentsRegistered` if `allUsers=true`.
 *    - From `users` array otherwise.
 * 4. Iterates over each target user and calls `addCouponsToUser`.
 * 5. Aggregates results and sends a final JSON response.
 *
 * ---
 * @async
 * @function allotCouponsHandler
 * @param {import("express").Request} req - Express request object
 * @param {import("express").Response} res - Express response object
 * @returns {Promise<void>} Sends JSON response directly to the client.
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

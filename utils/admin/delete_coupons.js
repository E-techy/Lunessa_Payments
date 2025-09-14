// utils/admin/delete_coupons.js
const { PrismaClient } = require("../../generated/customer-service");
const prisma = new PrismaClient();

/**
 * Delete coupons from users' availableCoupons array.
 *
 * Behavior:
 * - If `usernames` is provided (array or string), delete coupons only from those users.
 * - If `usernames` is not provided, delete coupons from ALL users.
 *
 * Permissions: handled at route level.
 *
 * @async
 * @function deleteCoupons
 * @param {Object} params
 * @param {string} params.couponCode - Coupon code to delete
 * @param {string|string[]} [params.usernames] - Username(s) to delete from (optional)
 *
 * @returns {Promise<Object>} Response object
 * @returns {boolean} returns.success - Whether the operation succeeded.
 * @returns {string} [returns.error] - Error message if operation failed.
 * @returns {number} [returns.modifiedCount] - Number of users updated.
 */
async function deleteCoupons({ couponCode, usernames }) {
  try {
    if (!couponCode || typeof couponCode !== "string") {
      return { success: false, error: "Invalid or missing couponCode" };
    }

    // Normalize usernames input
    let targets = null;
    if (usernames) {
      if (Array.isArray(usernames)) {
        targets = usernames.map((u) => u.trim());
      } else if (typeof usernames === "string") {
        targets = [usernames.trim()];
      } else {
        return { success: false, error: "Invalid usernames format" };
      }
    }

    // Build where condition (only users who actually have this coupon)
    const whereClause = targets
      ? { username: { in: targets }, availableCoupons: { some: { couponCode } } }
      : { availableCoupons: { some: { couponCode } } };

    // Fetch only matching users
    const users = await prisma.OfferUsage.findMany({ where: whereClause });

    if (!users || users.length === 0) {
      return {
        success: false,
        error: targets
          ? `No matching users found with coupon ${couponCode}`
          : `No users currently have coupon ${couponCode}`,
      };
    }

    let modifiedCount = 0;

    for (const user of users) {
      const filteredCoupons = user.availableCoupons.filter(
        (c) => c.couponCode !== couponCode
      );

      await prisma.OfferUsage.update({
        where: { id: user.id },
        data: { availableCoupons: filteredCoupons },
      });

      modifiedCount++;
    }

    return {
      success: true,
      modifiedCount,
      message: `Coupon ${couponCode} deleted from ${modifiedCount} user(s).`,
    };
  } catch (err) {
    console.error("❌ Error in deleteCoupons:", err.message);
    return { success: false, error: "Internal server error" };
  }
}

module.exports = deleteCoupons;

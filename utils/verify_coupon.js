// utils/verify_coupon.js
const { PrismaClient } = require("../generated/customer-service");
const prisma = new PrismaClient();

/**
 * Verify if a coupon is valid for the authenticated user
 *
 * @param {Object} params
 * @param {string} params.username - Username from the authenticated user
 * @param {string} params.couponCode - Coupon code to verify
 * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
 */
async function verifyCoupon({ username, couponCode }) {
  try {
    // 1. Find OfferUsage record for this user
    const userUsage = await prisma.OfferUsage.findUnique({
      where: { username },
    });

    if (!userUsage) {
      return { success: false, error: "Only registered users can apply for coupon" };
    }

    // 2. Find the coupon inside availableCoupons
    const coupon = userUsage.availableCoupons.find(
      (c) => c.couponCode.toLowerCase() === couponCode.toLowerCase()
    );

    if (!coupon) {
      return { success: false, error: "Coupon not found for this user" };
    }

    // 3. Check if already used
    if (coupon.used) {
      return { success: false, error: "Coupon has already been used" };
    }

    // 4. Prepare safe return data (strip createdAt, updatedAt)
    const { createdAt, updatedAt, ...cleanCoupon } = coupon;

    return { success: true, data: cleanCoupon };
  } catch (error) {
    console.error("❌ Error verifying coupon:", error);
    return { success: false, error: error.message || "Internal server error" };
  }
}

module.exports = verifyCoupon;

/**
 * @file utils/admin/add_coupons_to_user.js
 * @description Utility to add or update coupons for a given user in the OfferUsage model.
 */

const { PrismaClient } = require("../../generated/customer-service");
const prisma = new PrismaClient();

/**
 * Add or update coupons for a user in the OfferUsage model.
 *
 * 🔹 Input:
 * @param {Object} params
 * @param {string} params.username - The username of the user.
 * @param {Array<Object>} params.couponsData - Array of coupon objects to assign.
 * Each coupon object must include:
 *   - couponCode {string} → Unique identifier
 *   - used {boolean} → Whether coupon has been redeemed (default: false)
 *   - minOrderValue {number} → Minimum order value for coupon to apply
 *   - discountType {"percentage"|"flat"} → Discount type
 *   - discountValue {number} → Percentage (<=50) or flat discount (<=50% of minOrderValue)
 *   - maxDiscountAmount {number|null} → Optional maximum discount cap
 *
 * 🔹 Business Rules:
 * - If discountType = "percentage", discountValue must be ≤ 50.
 * - If discountType = "flat", discountValue ≤ 50% of minOrderValue.
 * - Coupons must have correct structure (all required fields).
 *
 * 🔹 Behavior:
 * - If OfferUsage exists for the username → append/update availableCoupons.
 * - If not → create new OfferUsage with coupons.
 *
 * 🔹 Returns:
 * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
 * - success: true → updated/created OfferUsage document
 * - success: false → error reason
 */

async function addCouponsToUser({ username, couponsData }) {
  try {
    if (!username) {
      return { success: false, error: "Username is required" };
    }

    if (!Array.isArray(couponsData) || couponsData.length === 0) {
      return { success: false, error: "Coupons data must be a non-empty array" };
    }

    // Validate each coupon
    for (const coupon of couponsData) {
      const requiredFields = ["couponCode", "minOrderValue", "discountType", "discountValue"];
      for (const field of requiredFields) {
        if (!(field in coupon)) {
          return { success: false, error: `Coupon validation failed: missing field '${field}'` };
        }
      }

      if (coupon.discountType === "percentage") {
        if (coupon.discountValue > 50) {
          return { success: false, error: `Percentage discount cannot exceed 50%. Coupon: ${coupon.couponCode}` };
        }
      } else if (coupon.discountType === "flat") {
        if (coupon.discountValue > coupon.minOrderValue * 0.5) {
          return { success: false, error: `Flat discount cannot exceed 50% of minOrderValue. Coupon: ${coupon.couponCode}` };
        }
      } else {
        return { success: false, error: `Invalid discountType for coupon: ${coupon.couponCode}` };
      }
    }

    // Normalize coupons
    const normalizedCoupons = couponsData.map((coupon) => ({
      couponCode: coupon.couponCode,
      used: coupon.used ?? false,
      minOrderValue: coupon.minOrderValue,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      maxDiscountAmount: coupon.maxDiscountAmount ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Check if user already exists
    const existingUser = await prisma.OfferUsage.findUnique({
      where: { username },
    });

    let updatedUser;

    if (existingUser) {
      // ✅ Handle case: old records may not have availableCoupons
      const existingCoupons = Array.isArray(existingUser.availableCoupons)
        ? existingUser.availableCoupons
        : [];

      const couponMap = new Map();

      // Add existing coupons
      for (const c of existingCoupons) {
        couponMap.set(c.couponCode, c);
      }

      // Overwrite/add new coupons
      for (const c of normalizedCoupons) {
        couponMap.set(c.couponCode, c);
      }

      const mergedCoupons = Array.from(couponMap.values());

      updatedUser = await prisma.OfferUsage.update({
        where: { username },
        data: {
          availableCoupons: mergedCoupons,
          updatedAt: new Date(),
        },
      });
    } else {
      // Create new user record with coupons
      updatedUser = await prisma.OfferUsage.create({
        data: {
          username,
          offersUsed: [], // default empty
          availableCoupons: normalizedCoupons,
        },
      });
    }

    return { success: true, data: updatedUser };
  } catch (error) {
    console.error("❌ Error adding coupons to user:", error);
    return { success: false, error: error.message || "Failed to add coupons" };
  }
}

module.exports = addCouponsToUser;



// (async () => {
//   try {
//     const username = "aman123"; // change this to your test username

//     const couponsData = [
//       {
//         couponCode: "WELCOME100",
//         used: false,
//         minOrderValue: 500,
//         discountType: "percentage",
//         discountValue: 10,
//         maxDiscountAmount: 200, // cap discount at 200
//       },
//       {
//         couponCode: "FLAT200",
//         used: true,
//         minOrderValue: 1000,
//         discountType: "flat",
//         discountValue: 200, // flat ₹200 off
//         maxDiscountAmount: null,
//       },
//       {
//         couponCode: "FESTIVAL50",
//         used: false,
//         minOrderValue: 2000,
//         discountType: "percentage",
//         discountValue: 20, // 20% off
//         maxDiscountAmount: 500, // max 500 off
//       },
//     ];

//     const result = await addCouponsToUser({ username, couponsData });

//     console.log("✅ Coupons added/updated:", result);
//   } catch (err) {
//     console.error("❌ Error adding sample coupons:", err);
//   }
// })();

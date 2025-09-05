// utils/admin/add_base_discount_slab.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * Add or update the global Base Discount Slab
 *
 * Validations:
 * - Only allowed for adminRole: "superAdmin" or "payments"
 * - Each discount level must have valid fields:
 *   - discountType must be "percentage" or "flat"
 *   - If discountType = "percentage" → discountValue <= 90
 *   - If discountType = "flat":
 *       - minOrderValue cannot be 0
 *       - discountValue must be <= minOrderValue * 0.9
 *   - If minOrderValue = 0:
 *       - Only percentage allowed
 *       - discountValue <= 90
 *
 * @param {Object} params
 * @param {string} params.adminRole - Role of the admin
 * @param {Object} params.data - JSON object containing BaseDiscountSlab data
 * @returns {Promise<{success: boolean, data?: object, error?: string}>}
 */
async function addBaseDiscountSlab({ adminRole, data }) {
  try {
    // ✅ Step 1: Role authorization
    if (!["superAdmin", "payments"].includes(adminRole)) {
      return { success: false, error: "Unauthorized: insufficient privileges" };
    }

    if (!data || !Array.isArray(data.levels)) {
      return { success: false, error: "Invalid input: levels array required" };
    }

    // ✅ Step 2: Validate discount levels
    for (const level of data.levels) {
      const { minOrderValue, discountType, discountValue, maxOrderValue } = level;

      if (typeof minOrderValue !== "number" || minOrderValue < 0) {
        return { success: false, error: "Invalid minOrderValue: must be >= 0" };
      }

      if (!["percentage", "flat"].includes(discountType)) {
        return { success: false, error: `Invalid discountType: ${discountType}` };
      }

      if (typeof discountValue !== "number" || discountValue <= 0) {
        return { success: false, error: "Invalid discountValue: must be > 0" };
      }

      // ✅ If percentage type
      if (discountType === "percentage" && discountValue > 90) {
        return { success: false, error: "Percentage discount cannot exceed 90%" };
      }

      // ✅ If flat type
      if (discountType === "flat") {
        if (minOrderValue === 0) {
          return { success: false, error: "Flat discount not allowed when minOrderValue = 0" };
        }
        if (discountValue > minOrderValue * 0.9) {
          return {
            success: false,
            error: `Flat discount at minOrderValue ${minOrderValue} must be <= 90% of minOrderValue`,
          };
        }
      }

      // ✅ If minOrderValue = 0, must be percentage type
      if (minOrderValue === 0 && discountType !== "percentage") {
        return { success: false, error: "At minOrderValue 0, only percentage discount is allowed" };
      }

      // ✅ Check min < max
      if (maxOrderValue && maxOrderValue <= minOrderValue) {
        return { success: false, error: `maxOrderValue must be greater than minOrderValue (${minOrderValue})` };
      }
    }

    // ✅ Step 3: Ensure only one BaseDiscountSlab
    const existing = await prisma.baseDiscountSlab.findFirst();

    let slab;
    if (existing) {
      slab = await prisma.baseDiscountSlab.update({
        where: { id: existing.id },
        data: {
          levels: data.levels,
          status: data.status || "active",
          updatedAt: new Date(),
        },
      });
    } else {
      slab = await prisma.baseDiscountSlab.create({
        data: {
          levels: data.levels,
          status: data.status || "active",
        },
      });
    }

    return { success: true, data: slab };
  } catch (error) {
    console.error("❌ Error in addBaseDiscountSlab:", error);
    return { success: false, error: error.message || "Failed to add base discount slab" };
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = { addBaseDiscountSlab };

// Test runner
// (async () => {
//   const result = await addBaseDiscountSlab({
//     adminRole: "superAdmin",
//     data: {
//       levels: [
//         { minOrderValue: 50, maxOrderValue: 1000, discountType: "flat", discountValue: 100 },
//         { minOrderValue: 1000, maxOrderValue: 5000, discountType: "flat", discountValue: 400 },
//       ],
//     },
//   });

//   console.log(result);
// })();

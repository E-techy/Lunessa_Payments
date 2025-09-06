// utils/admin/update_base_discount_slab.js
const { PrismaClient } = require('../../node_modules/.prisma-customer-service');
const prisma = new PrismaClient();

/**
 * Update the global Base Discount Slab
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
 * @param {Object} params.data - JSON object containing BaseDiscountSlab update data
 * @param {("active"|"inactive")=} params.status - Optional status to update (defaults to "active")
 * @returns {Promise<{success: boolean, data?: object, error?: string}>}
 */
async function updateBaseDiscountSlab({ adminRole, data, status = "active" }) {
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

    // ✅ Step 3: Validate status input
    if (!["active", "inactive"].includes(status)) {
      return { success: false, error: "Invalid status: must be 'active' or 'inactive'" };
    }

    // ✅ Step 4: Fetch existing BaseDiscountSlab
    const existing = await prisma.baseDiscountSlab.findFirst();
    if (!existing) {
      return { success: false, error: "No BaseDiscountSlab exists to update" };
    }

    // ✅ Step 5: Update BaseDiscountSlab
    const updated = await prisma.baseDiscountSlab.update({
      where: { id: existing.id },
      data: {
        levels: data.levels,
        status,
        updatedAt: new Date(),
      },
    });

    return { success: true, data: updated };
  } catch (error) {
    console.error("❌ Error in updateBaseDiscountSlab:", error);
    return { success: false, error: error.message || "Failed to update base discount slab" };
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = updateBaseDiscountSlab ;

// Test runner
// if (require.main === module) {
//   (async () => {
//     const result = await updateBaseDiscountSlab({
//       adminRole: "superAdmin",
//       status: "inactive",
//       data: {
//         levels: [
//           { minOrderValue: 0, maxOrderValue: 2000, discountType: "percentage", discountValue: 15 },
//           { minOrderValue: 2000, maxOrderValue: 6000, discountType: "flat", discountValue: 500 },
//         ],
//       },
//     });
//     console.log(result);
//   })();
// }

// utils/admin/delete_base_discount_slab.js
const { PrismaClient } = require("../../generated/customer-service");
const prisma = new PrismaClient();

/**
 * Delete a discount level (slab) from the global BaseDiscountSlab document.
 *
 * Permissions:
 * - Allowed admin roles: "superAdmin", "edit", "delete", "payments"
 *
 * @async
 * @function deleteBaseDiscountSlab
 * @param {Object} params
 * @param {string} params.adminRole - Role of the admin performing the action.
 * @param {number} params.index - Index of the discount level in the array to remove.
 * 
 * @returns {Promise<Object>} Response object
 * @returns {boolean} returns.success - Whether the operation succeeded.
 * @returns {string} [returns.error] - Error message if operation failed.
 * @returns {Object} [returns.data] - Updated BaseDiscountSlab document after deletion.
 *
 * @example
 * const result = await deleteBaseDiscountSlab({ adminRole: "superAdmin", index: 1 });
 * if (result.success) {
 *   console.log("Updated Slab:", result.data);
 * } else {
 *   console.error("Error:", result.error);
 * }
 */
async function deleteBaseDiscountSlab({ adminRole, index }) {
  try {
    const allowedRoles = ["superAdmin", "edit", "delete", "payments"];
    if (!allowedRoles.includes(adminRole)) {
      return { success: false, error: "Unauthorized: insufficient permissions" };
    }

    // Fetch global BaseDiscountSlab document (assuming one exists)
    const slabDoc = await prisma.baseDiscountSlab.findFirst({
      where: { status: "active" },
    });

    if (!slabDoc) {
      return { success: false, error: "No active BaseDiscountSlab found." };
    }

    // Validate index
    if (
      typeof index !== "number" ||
      index < 0 ||
      index >= slabDoc.levels.length
    ) {
      return { success: false, error: "Invalid index provided." };
    }

    // Remove the slab at given index
    const updatedLevels = [...slabDoc.levels];
    updatedLevels.splice(index, 1);

    // Update in DB
    const updatedDoc = await prisma.baseDiscountSlab.update({
      where: { id: slabDoc.id },
      data: {
        levels: updatedLevels,
      },
    });

    return { success: true, data: updatedDoc };
  } catch (err) {
    console.error("❌ Error in deleteBaseDiscountSlab:", err.message);
    return { success: false, error: "Internal server error" };
  }
}

module.exports = deleteBaseDiscountSlab;

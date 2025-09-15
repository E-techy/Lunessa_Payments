// utils/admin/get_base_discount_data.js
const { PrismaClient } = require("../../generated/customer-service");
const prisma = new PrismaClient();

/**
 * Fetch all Base Discount Slabs from the database.
 *
 * ---
 * 🔐 Auth:
 * - Only accessible by admins with roles: "superAdmin", "payments", "edit", "delete"
 *
 * ---
 * 📥 Input:
 * @param {string} adminRole - Role of the admin requesting the data
 *
 * ---
 * 📤 Output:
 * @returns {Promise<{ success: boolean, data?: Object[], error?: string }>}
 * - success: true → Returns an array of BaseDiscountSlab documents
 * - success: false → Returns error reason
 *
 * ---
 * ✅ Example:
 * const result = await getBaseDiscountData("superAdmin");
 * console.log(result);
 */
async function getBaseDiscountData(adminRole) {
  try {
    // ✅ 1. Check Role Authorization
    const allowedRoles = ["superAdmin", "payments", "edit", "delete"];
    if (!allowedRoles.includes(adminRole)) {
      return { success: false, error: "Unauthorized: Insufficient admin role" };
    }

    // ✅ 2. Fetch data from DB
    const slabs = await prisma.baseDiscountSlab.findMany({
      orderBy: { createdAt: "desc" },
    });

    return { success: true, data: slabs };
  } catch (err) {
    console.error("❌ Error in getBaseDiscountData:", err);
    return { success: false, error: "Failed to fetch Base Discount Slab data" };
  }
}

module.exports = getBaseDiscountData;

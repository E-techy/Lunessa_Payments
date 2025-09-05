// utils/get_base_discount_data.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * Fetch the latest BaseDiscountSlab data (for client usage)
 *
 * - Does not require any role validation.
 * - Returns the active BaseDiscountSlab if available.
 *
 * @returns {Promise<{success: boolean, data?: object, error?: string}>}
 */
async function getBaseDiscountData() {
  try {
    // ✅ Fetch the active/latest discount slab
    const slab = await prisma.baseDiscountSlab.findFirst({
      where: { status: "active" },
      orderBy: { updatedAt: "desc" },
    });

    if (!slab) {
      return { success: false, error: "No active BaseDiscountSlab found" };
    }

    return { success: true, data: slab };
  } catch (error) {
    console.error("❌ Error in getBaseDiscountData:", error);
    return { success: false, error: error.message || "Failed to fetch discount data" };
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = { getBaseDiscountData };

// Test runner
if (require.main === module) {
  (async () => {
    const result = await getBaseDiscountData();
    console.log(result);
  })();
}

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * Fetch all offers from the Offer collection.
 *
 * 🔹 Access Control:
 *   - Only admins with role `superAdmin` or `delete` are allowed to fetch all offers.
 *
 * 🔹 Input:
 * @param {Object} params - Input parameters.
 * @param {string} params.adminRole - Role of the admin ("superAdmin" | "delete" | others).
 *
 * 🔹 Output:
 * @returns {Promise<{success: boolean, data?: Object[], error?: string}>}
 *   - success: true → Returns an array of all offers.
 *   - success: false → Operation failed, returns error reason.
 *
 * 🔹 Example:
 * ```js
 * const result = await getAllOffers({ adminRole: "superAdmin" });
 * console.log(result);
 * // { success: true, data: [ { offerId: "abc123", title: "New Year Sale", ... }, ... ] }
 * ```
 */
async function getAllOffers({ adminRole }) {
  try {
    // 1. Validate role
    if (!["superAdmin", "delete"].includes(adminRole)) {
      return { success: false, error: "Unauthorized: Admin role not permitted to fetch offers." };
    }

    // 2. Fetch all offers
    const offers = await prisma.Offer.findMany();

    return { success: true, data: offers };
  } catch (error) {
    console.error("❌ Error fetching offers:", error);
    return { success: false, error: error.message || "Failed to fetch offers." };
  }
}

module.exports = getAllOffers;

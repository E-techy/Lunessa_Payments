const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * Delete an offer from the Offer model.
 *
 * 🔹 Access Control:
 *   - Only users with `superAdmin` or `delete` roles can delete an offer.
 *   - If the role is not authorized, deletion will be denied.
 *
 * 🔹 Input:
 * @param {Object} params - Input parameters.
 * @param {string} params.adminRole - Role of the admin trying to delete ("superAdmin" | "delete" | others).
 * @param {string} params.offerId - Unique offerId (UUID string) of the offer to delete.
 *
 * 🔹 Output:
 * @returns {Promise<{success: boolean, message?: string, error?: string}>}
 *   - success: true → Offer deleted successfully.
 *   - success: false → Deletion failed, with error message.
 *
 * 🔹 Example:
 * ```js
 * const result = await deleteOffer({ adminRole: "superAdmin", offerId: "abc123" });
 * console.log(result);
 * // { success: true, message: "Offer deleted successfully." }
 * ```
 */
async function deleteOffer({ adminRole, offerId }) {
  try {
    // 1. Validate admin role
    if (!["superAdmin", "delete"].includes(adminRole)) {
      return { success: false, error: "Unauthorized: Admin role not permitted to delete offers." };
    }

    // 2. Check if the offer exists
    const existingOffer = await prisma.Offer.findUnique({
      where: { offerId },
    });

    if (!existingOffer) {
      return { success: false, error: `Offer with ID ${offerId} not found.` };
    }

    // 3. Delete the offer
    await prisma.Offer.delete({
      where: { offerId },
    });

    return { success: true, message: "Offer deleted successfully." };
  } catch (error) {
    console.error("❌ Error deleting offer:", error);
    return { success: false, error: error.message || "Failed to delete offer." };
  }
}

module.exports = deleteOffer;

// (async () => {
//     let result = await deleteOffer({adminRole:"superAdmin", offerId:"7194d0a1-70b4-4c63-95f0-45779004768c"});
//     console.log(result);
    
// })();

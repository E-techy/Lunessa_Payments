const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * Modify an existing offer in the Offer collection.
 *
 * 🔹 Access Control:
 *   - Only admins with role `superAdmin` or `edit` can modify offers.
 *
 * 🔹 Input:
 * @param {Object} params - Input parameters.
 * @param {string} params.adminRole - Role of the admin ("superAdmin" | "edit" | others).
 * @param {string} params.offerId - Unique identifier of the offer to modify.
 * @param {Object} params.modificationData - JSON object containing fields to update.
 *
 * 🔹 Validation:
 * - Ensures that only valid fields from the Offer model are updated.
 * - Skips invalid or unrecognized fields.
 * - Ensures type safety for updates.
 *
 * 🔹 Output:
 * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
 *   - success: true → Returns updated offer.
 *   - success: false → Operation failed, returns error reason.
 *
 * 🔹 Example:
 * ```js
 * const result = await modifyOffer({
 *   adminRole: "superAdmin",
 *   offerId: "uuid-123",
 *   modificationData: { title: "Mega Sale", discountValue: 30 }
 * });
 * console.log(result);
 * // { success: true, data: { ...updatedOffer } }
 * ```
 */
async function modifyOffer({ adminRole, offerId, modificationData }) {
  try {
    // 1. Validate role
    if (!["superAdmin", "edit"].includes(adminRole)) {
      return { success: false, error: "Unauthorized: Admin role not permitted to modify offers." };
    }

    // 2. Define valid fields with expected types
    const validFields = {
      title: "string",
      description: "string",
      offerCode: "string",
      discountType: "string", // "percentage" | "flat"
      discountValue: "number",
      maxDiscountAmount: "number",
      offerType: "string", // "festival" | "referral" | "welcome"
      applicableTo: "object", // Array of strings
      minPurchaseAmount: "number",
      applicableProducts: "object", // Array of strings
      usageLimit: "number",
      usageLimitPerUser: "number",
      globalUsedCount: "number",
      startDate: "object", // Date
      endDate: "object", // Date
      status: "string", // "active" | "expired" | "upcoming" | "paused"
    };

    // 3. Filter and validate modificationData
    const updateData = {};
    for (const key in modificationData) {
      if (validFields[key]) {
        const expectedType = validFields[key];
        const value = modificationData[key];

        // Handle arrays
        if (expectedType === "object" && Array.isArray(value)) {
          updateData[key] = value;
        }
        // Handle Date fields
        else if (expectedType === "object" && (value instanceof Date || !isNaN(Date.parse(value)))) {
          updateData[key] = new Date(value);
        }
        // Handle primitive types
        else if (typeof value === expectedType) {
          updateData[key] = value;
        }
        // Invalid type
        else {
          return { success: false, error: `Invalid type for field '${key}'. Expected ${expectedType}.` };
        }
      } else {
        return { success: false, error: `Invalid field '${key}' in modification data.` };
      }
    }

    if (Object.keys(updateData).length === 0) {
      return { success: false, error: "No valid fields provided for update." };
    }

    // 4. Perform update
    const updatedOffer = await prisma.Offer.update({
      where: { offerId },
      data: updateData,
    });

    return { success: true, data: updatedOffer };
  } catch (error) {
    console.error("❌ Error modifying offer:", error);
    return { success: false, error: error.message || "Failed to modify offer." };
  }
}

module.exports = modifyOffer;

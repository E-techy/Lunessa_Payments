/**
 * @file utils/admin/modify_offers.js
 * @description Utility function to modify an existing offer in the Offer model.
 */

const { PrismaClient } = require("../../generated/customer-service");
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
      return {
        success: false,
        error: "Unauthorized: Admin role not permitted to modify offers.",
      };
    }

    // 2. Define valid fields & expected types (aligned with createNewOffer)
    const validFields = {
      title: "string",
      description: "string",
      offerCode: "string",
      discountType: "string", // "percentage" | "flat"
      discountValue: "number",
      maxDiscountAmount: "number",
      offerType: "string", // "festival" | "referral" | "welcome", etc.
      applicableTo: "array", // Array of strings
      minPurchaseAmount: "number",
      applicableProducts: "array", // Array of strings
      usageLimit: "number",
      usageLimitPerUser: "number",
      startDate: "date",
      endDate: "date",
      status: "string", // "active" | "expired" | "upcoming" | "paused"
      globalUsedCount: "number", // can also be updated manually if needed
    };

    // 3. Validate and prepare update data
    const updateData = {};
    for (const key in modificationData) {
      if (!validFields[key]) {
        return {
          success: false,
          error: `Invalid field '${key}' in modification data.`,
        };
      }

      const expectedType = validFields[key];
      const value = modificationData[key];

      switch (expectedType) {
        case "array":
          if (Array.isArray(value)) {
            updateData[key] = value;
          } else {
            return {
              success: false,
              error: `Invalid type for '${key}'. Expected array.`,
            };
          }
          break;

        case "date":
          if (value instanceof Date || !isNaN(Date.parse(value))) {
            updateData[key] = new Date(value);
          } else {
            return {
              success: false,
              error: `Invalid type for '${key}'. Expected Date.`,
            };
          }
          break;

        default:
          if (typeof value === expectedType) {
            updateData[key] = value;
          } else {
            return {
              success: false,
              error: `Invalid type for '${key}'. Expected ${expectedType}.`,
            };
          }
      }
    }

    if (Object.keys(updateData).length === 0) {
      return {
        success: false,
        error: "No valid fields provided for update.",
      };
    }

    // 4. Perform update
    const updatedOffer = await prisma.Offer.update({
      where: { offerId },
      data: updateData,
    });

    return { success: true, data: updatedOffer };
  } catch (error) {
    console.error("❌ Error modifying offer:", error);
    return {
      success: false,
      error: error.message || "Failed to modify offer.",
    };
  }
}

module.exports = modifyOffer;

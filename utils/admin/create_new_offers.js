/**
 * @file utils/admin/create_new_offers.js
 * @description Utility function to create new offers in the Offer model.
 */

const { PrismaClient } = require('../../generated/customer-service');
const prisma = new PrismaClient();
const { v4: uuidv4 } = require("uuid");

/**
 * Create a new promotional offer and save it to the database.
 *
 * @async
 * @function createNewOffer
 * @param {Object} offerData - The offer details.
 * @param {string} offerData.title - Short title of the offer (e.g., "New Year Sale").
 * @param {string} [offerData.description] - Detailed description of the offer.
 * @param {string} [offerData.offerCode] - Optional unique coupon code (for coupon offers).
 * @param {string} offerData.discountType - Discount type ("percentage" | "flat").
 * @param {number} offerData.discountValue - Discount value (e.g., 20 for 20% or 500 for ₹500 flat).
 * @param {number} [offerData.maxDiscountAmount] - Cap for percentage-based discounts.
 * @param {string} offerData.offerType - Offer category ("festival", "referral", "welcome", etc.).
 * @param {string[]} offerData.applicableTo - Eligible users ("all", "new-users", etc.).
 * @param {number} [offerData.minPurchaseAmount] - Minimum purchase amount required.
 * @param {string[]} offerData.applicableProducts - Product IDs or categories applicable.
 * @param {number} [offerData.usageLimit] - Global cap on how many times the offer can be used.
 * @param {number} [offerData.usageLimitPerUser] - Per-user cap on usage.
 * @param {Date|string} offerData.startDate - Start date of the offer.
 * @param {Date|string} offerData.endDate - End date of the offer.
 * @param {string} [offerData.status="active"] - Offer status ("active", "expired", etc.).
 *
 * @returns {Promise<{success: boolean, error?: string, data?: Object}>}
 * Returns success with created offer data if saved successfully, or error message if failed.
 */
async function createNewOffer(offerData) {
  try {
    const newOffer = await prisma.Offer.create({
      data: {
        offerId: uuidv4(),
        title: offerData.title,
        description: offerData.description || null,
        offerCode: offerData.offerCode || null,
        discountType: offerData.discountType,
        discountValue: offerData.discountValue,
        maxDiscountAmount: offerData.maxDiscountAmount || null,
        offerType: offerData.offerType,
        applicableTo: offerData.applicableTo,
        minPurchaseAmount: offerData.minPurchaseAmount || null,
        applicableProducts: offerData.applicableProducts || [],
        usageLimit: offerData.usageLimit || null,
        usageLimitPerUser: offerData.usageLimitPerUser || null,
        startDate: new Date(offerData.startDate),
        endDate: new Date(offerData.endDate),
        status: offerData.status || "active",
        globalUsedCount: 0, // default on creation
      },
    });

    return { success: true, data: newOffer };
  } catch (error) {
    console.error("❌ Error creating new offer:", error);
    return { success: false, error: error.message };
  }
}

module.exports = createNewOffer;


// (async () => {
//   let result = await createNewOffer({
//     title: "Inde holla",
//     description: "Flat ₹500 off on orders above ₹2000",
//     offerCode: "200THV", // coupon code type
//     discountType: "flat", // can be "percentage" or "flat"
//     discountValue: 5000,
//     maxDiscountAmount: null, // not needed for flat discount
//     offerType: "festival", // e.g. festival, referral, welcome
//     applicableTo: ["all"], // all users can apply
//     minPurchaseAmount: 20000,
//     applicableProducts: ["all"], // applicable for all products
//     usageLimit: 100, // total 100 times globally
//     usageLimitPerUser: 10, // each user can use 2 times
//     globalUsedCount: 100,
//     startDate: new Date(),
//     endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days validity
//     status: "active",
//   });

//   console.log(result);
// })();

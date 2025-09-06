// utils/get_available_offers.js
const { PrismaClient } = require('../generated/customer-service');
const prisma = new PrismaClient();
const verifyOfferAvailabilityForUser  = require("./verify_offer_availability_for_the_user");

/**
 * Fetch available offers globally or for a specific user.
 *
 * Rules:
 * - Offer must have status = "active"
 * - Offer must be within startDate and endDate
 * - globalUsedCount < usageLimit (if usageLimit is set)
 * - If username provided → also check user's usage count (via OfferUsage)
 *
 * @param {string=} username - Optional username to filter user-eligible offers
 * @returns {Promise<{success: boolean, data?: Array, error?: string}>}
 */
async function getAvailableOffers(username = null) {
  try {
    const now = new Date();

    // ✅ Step 1: Fetch global valid offers
    const offers = await prisma.Offer.findMany({
      where: {
        status: "active",
        startDate: { lte: now },
        endDate: { gte: now },
        OR: [
          { usageLimit: null }, // unlimited
          { globalUsedCount: { lt: prisma.Offer.fields.usageLimit } }, // still under usageLimit
        ],
      },
      orderBy: { createdAt: "desc" },
    });

    if (!username) {
      return { success: true, data: offers };
    }

    // ✅ Step 2: User-specific filtering
    const filteredOffers = await verifyOfferAvailabilityForUser(username, offers);

    return { success: true, data: filteredOffers };
  } catch (error) {
    console.error("❌ Error in getAvailableOffers:", error);
    return { success: false, error: "Failed to fetch available offers"};
  } finally {
    await prisma.$disconnect();
  }
}

module.exports =  getAvailableOffers ;

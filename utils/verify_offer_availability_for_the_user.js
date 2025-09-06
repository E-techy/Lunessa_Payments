// utils/verify_offer_availability_for_the_user.js
const { PrismaClient } = require('../generated/customer-service');
const prisma = new PrismaClient();

/**
 * Verify which offers are still available for a given user.
 *
 * Rules:
 * - Check OfferUsage for this username
 * - Compare usedCount with usageLimitPerUser
 * - If usedCount >= usageLimitPerUser → remove that offer for this user
 *
 * @param {string} username - Current logged-in user's username
 * @param {Array} offers - List of global valid offers
 * @returns {Promise<Array>} Filtered offers list for the user
 */
async function verifyOfferAvailabilityForUser(username, offers) {
  try {
    if (!username) return offers;

    // ✅ Fetch user's usage record
    const usageRecord = await prisma.OfferUsage.findUnique({
      where: { username },
    });

    if (!usageRecord) {
      // user never used any offer → return all
      return offers;
    }

    const userUsageMap = new Map();
    usageRecord.offersUsed.forEach((u) => {
      userUsageMap.set(u.offerId, u);
    });

    // ✅ Filter based on per-user usage
    const filtered = offers.filter((offer) => {
      if (!offer.usageLimitPerUser) return true; // no per-user limit

      const usage = userUsageMap.get(offer.offerId);
      if (!usage) return true; // user never used → still valid

      return usage.usedCount < offer.usageLimitPerUser; // still under limit
    });

    return filtered;
  } catch (error) {
    console.error("❌ Error in verifyOfferAvailabilityForUser:", error);
    return [];
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = verifyOfferAvailabilityForUser;

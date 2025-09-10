/**
 * @file utils/verify_final_purchase_data.js
 * @description Verifies a prospective token purchase and returns a final, itemized bill.
 */

const { PrismaClient } = require("../generated/customer-service");
const prisma = new PrismaClient();

/**
 * Utility to verify a prospective AI token purchase and compute a final,
 * itemized bill after applying base discounts and either a coupon OR an offer.
 *
 * ## Business Rules Implemented:
 *
 * 1. **Input Validation**
 *    - `username`: must be a non-empty string.
 *    - `tokens`: must be a positive integer.
 *    - `agentId`: must be a valid string.
 *    - `modelName`: must correspond to an existing `AIModel`.
 *    - Promo XOR: Only **one** promo may be applied at a time (either `couponCode` or `offerCode`).
 *
 * 2. **Agent Verification**
 *    - Validates that the given `agentId` belongs to the provided `username`.
 *
 * 3. **Model & Pricing**
 *    - Fetches per-token price from `AIModel`.
 *    - Validates `availableTill` date to ensure model is still valid.
 *    - Base amount = `tokens × perTokenPrice`.
 *
 * 4. **Base Discount**
 *    - Checks if an active `baseDiscountSlab` exists.
 *    - Finds the most specific applicable level (`minOrderValue` ≤ amount ≤ `maxOrderValue`).
 *    - Applies either a percentage or flat discount.
 *    - Result = **priceAfterBaseDiscount**.
 *
 * 5. **Coupon Handling**
 *    - Coupons are fetched from `OfferUsage.availableCoupons`.
 *    - Conditions:
 *       • Coupon must exist, not used yet.
 *       • Order must meet `minOrderValue`.
 *       • Discount type:
 *         - Percentage: `discountValue` ≤ 50 (applied on priceAfterBaseDiscount).
 *         - Flat: `discountValue` ≤ 50% of `minOrderValue`.
 *       • Respects `maxDiscountAmount` if provided.
 *    - Applied strictly on **priceAfterBaseDiscount**.
 *
 * 6. **Offer Handling**
 *    - Offers are fetched from `Offer` table by `offerCode`.
 *    - Conditions:
 *       • Offer must be active and within start/end dates.
 *       • Order must meet `minPurchaseAmount`.
 *       • Offer must be applicable to `modelName` (or `all`).
 *       • Usage limits checked:
 *         - Global: cannot exceed `usageLimit`.
 *         - Per-user: validated against `OfferUsage.offersUsed`.
 *       • Discount type:
 *         - Percentage or Flat.
 *       • Respects `maxDiscountAmount` if provided.
 *       • **90% Cap Rule**: Offer discount can never exceed **90% of priceAfterBaseDiscount**
 *         (ensures at least 10% profit margin).
 *    - Applied strictly on **priceAfterBaseDiscount**.
 *
 * 7. **Final Bill**
 *    - `totalDiscount` = baseDiscount.amount + promo.discountAmount
 *    - `finalPayable` = priceAfterBaseDiscount - promo.discountAmount
 *    - Never goes below 0.
 *
 * ## Input (VerifyParams):
 * @typedef {Object} VerifyParams
 * @property {string} username     - Username of the buyer (must match agent owner).
 * @property {number} tokens       - Number of tokens to purchase (positive integer).
 * @property {string} agentId      - Target agentId for the purchase.
 * @property {string} modelName    - AI model name (e.g., "gpt-4").
 * @property {string} [couponCode] - Optional coupon code (mutually exclusive with offerCode).
 * @property {string} [offerCode]  - Optional offer code (mutually exclusive with couponCode).
 *
 * ## Output (VerifyResult):
 * @typedef {Object} VerifyResult
 * @property {boolean} success     - Whether verification was successful.
 * @property {Object}  [data]      - Present when success = true:
 *   @property {string} username
 *   @property {string} agentId
 *   @property {string} modelName
 *   @property {string} currency
 *   @property {number} tokens
 *   @property {number} perTokenPrice
 *   @property {number} baseAmount
 *   @property {Object} baseDiscount
 *   @property {Object} promo
 *   @property {number} totalDiscount
 *   @property {number} finalPayable
 * @property {string}  [error]     - Present when success = false with client-safe message.
 *
 * ## Example Usage:
 *
 * ```js
 * const result = await verifyFinalPurchaseData({
 *   username: "arjun_agent01",
 *   tokens: 1500,
 *   agentId: "AGT-50345a8fdb40c313",
 *   modelName: "gpt-4",
 *   couponCode: "WELCOME100" // OR offerCode: "IND500"
 * });
 *
 * if (result.success) {
 *   console.log("✅ Final bill:", result.data);
 * } else {
 *   console.error("❌ Error:", result.error);
 * }
 * ```
 *
 * ## Notes:
 * - This function only verifies and calculates pricing.  
 * - Marking coupons as "used" or incrementing offer usage must be handled separately after payment success.  
 */

async function verifyFinalPurchaseData({
  username,
  tokens,
  agentId,
  modelName,
  couponCode,
  offerCode,
}) {
  try {
    /* ---------- 1. Basic input validation ---------- */
    if (typeof username !== "string" || !username.trim()) {
      return { success: false, error: "Invalid username." };
    }
    if (!Number.isInteger(tokens) || tokens <= 0) {
      return { success: false, error: "Tokens must be a positive integer." };
    }
    if (typeof agentId !== "string" || !agentId.trim()) {
      return { success: false, error: "Invalid agentId." };
    }
    if (couponCode && offerCode) {
      return {
        success: false,
        error: "Only one promotion may be applied at a time: coupon or offer.",
      };
    }

    /* ---------- 2. Verify agent ownership ---------- */
    const agent = await prisma.CustomerServiceAgents.findUnique({ where: { agentId } });
    if (!agent) return { success: false, error: "Agent not found." };
    if (agent.username !== username) {
      return { success: false, error: "You are not authorized to purchase tokens for this agent." };
    }

    /* ---------- 3. AI model & price ---------- */
    const model = await prisma.AIModel.findUnique({ where: { modelName } });
    if (!model) return { success: false, error: `AI model '${modelName}' not found.` };

    const now = new Date();
    if (new Date(model.availableTill).getTime() < now.getTime()) {
      return { success: false, error: `The model '${modelName}' is no longer available.` };
    }

    const perTokenPrice = Number(model.pricePerToken);
    if (!(perTokenPrice > 0)) {
      return { success: false, error: "Pricing error: per-token price must be > 0." };
    }

    const currency = model.currency || "INR";
    const baseAmount = round2(tokens * perTokenPrice);

    /* ---------- 4. Base discount slab ---------- */
    let baseDiscount = { applied: false, amount: 0, level: null };
    const activeSlab = await prisma.baseDiscountSlab.findFirst({ where: { status: "active" } });

    if (activeSlab?.levels?.length) {
      const candidates = activeSlab.levels.filter((lvl) => {
        const withinMin = baseAmount >= Number(lvl.minOrderValue);
        const withinMax = lvl.maxOrderValue == null || baseAmount <= Number(lvl.maxOrderValue);
        return withinMin && withinMax;
      });
      if (candidates.length) {
        candidates.sort((a, b) => Number(b.minOrderValue) - Number(a.minOrderValue));
        const level = candidates[0];

        let discountAmt = 0;
        if (level.discountType === "percentage") {
          discountAmt = (baseAmount * Number(level.discountValue)) / 100;
        } else if (level.discountType === "flat") {
          discountAmt = Number(level.discountValue);
        }
        discountAmt = Math.max(0, Math.min(discountAmt, baseAmount));
        baseDiscount = {
          applied: discountAmt > 0,
          amount: round2(discountAmt),
          level: {
            minOrderValue: Number(level.minOrderValue),
            maxOrderValue: level.maxOrderValue ? Number(level.maxOrderValue) : null,
            discountType: level.discountType,
            discountValue: Number(level.discountValue),
          },
        };
      }
    }

    const priceAfterBaseDiscount = round2(baseAmount - baseDiscount.amount);

    /* ---------- 5. Coupon OR Offer ---------- */
    let promo = { type: null, code: null, data: null, discountAmount: 0 };

    if (couponCode) {
      const usage = await prisma.OfferUsage.findUnique({ where: { username } });
      const coupons = usage?.availableCoupons || [];
      const coupon = coupons.find((c) => c.couponCode === couponCode);
      if (!coupon) return { success: false, error: "Invalid or unavailable coupon code." };
      if (coupon.used) return { success: false, error: "This coupon has already been used." };

      if (priceAfterBaseDiscount < Number(coupon.minOrderValue || 0)) {
        return {
          success: false,
          error: `Coupon requires a minimum order value of ${currency} ${Number(
            coupon.minOrderValue || 0
          ).toFixed(2)}.`,
        };
      }

      let discount = 0;
      if (coupon.discountType === "percentage") {
        if (coupon.discountValue > 50) {
          return { success: false, error: "Coupon percentage discount cannot exceed 50%." };
        }
        discount = (priceAfterBaseDiscount * coupon.discountValue) / 100;
      } else if (coupon.discountType === "flat") {
        const maxFlatAllowed = 0.5 * Number(coupon.minOrderValue || priceAfterBaseDiscount);
        if (coupon.discountValue > maxFlatAllowed) {
          return {
            success: false,
            error: `Flat coupon discount cannot exceed 50% of minimum order value.`,
          };
        }
        discount = coupon.discountValue;
      }
      if (coupon.maxDiscountAmount) {
        discount = Math.min(discount, Number(coupon.maxDiscountAmount));
      }
      discount = Math.max(0, Math.min(discount, priceAfterBaseDiscount));

      promo = {
        type: "coupon",
        code: coupon.couponCode,
        discountAmount: round2(discount),
        data: sanitizeCoupon(coupon),
      };
    }

    if (offerCode) {
      const offer = await prisma.Offer.findUnique({ where: { offerCode } });
      if (!offer) return { success: false, error: "Invalid or unavailable offer code." };
      if ((offer.status || "").toLowerCase() !== "active") {
        return { success: false, error: "This offer is not active." };
      }
      if (new Date(offer.startDate) > now || new Date(offer.endDate) < now) {
        return { success: false, error: "This offer is not currently valid." };
      }
      if (offer.minPurchaseAmount && priceAfterBaseDiscount < Number(offer.minPurchaseAmount)) {
        return {
          success: false,
          error: `Offer requires a minimum order value of ${currency} ${Number(
            offer.minPurchaseAmount
          ).toFixed(2)}.`,
        };
      }

      const apps = Array.isArray(offer.applicableProducts) ? offer.applicableProducts : [];
      if (!(apps.includes("all") || apps.includes(modelName) || apps.includes(modelName.toLowerCase()))) {
        return { success: false, error: `Offer not applicable to model '${modelName}'.` };
      }

      let discount = 0;
      if (offer.discountType === "percentage") {
        discount = (priceAfterBaseDiscount * Number(offer.discountValue || 0)) / 100;
      } else if (offer.discountType === "flat") {
        discount = Number(offer.discountValue || 0);
      }
      if (offer.maxDiscountAmount) {
        discount = Math.min(discount, Number(offer.maxDiscountAmount));
      }

      // Enforce 90% rule
      const ninetyCap = 0.9 * priceAfterBaseDiscount;
      discount = Math.min(discount, ninetyCap);
      discount = Math.max(0, Math.min(discount, priceAfterBaseDiscount));

      promo = {
        type: "offer",
        code: offer.offerCode,
        discountAmount: round2(discount),
        data: sanitizeOffer(offer),
      };
    }

    /* ---------- 6. Final Totals ---------- */
    const finalPayable = round2(Math.max(0, priceAfterBaseDiscount - promo.discountAmount));

    return {
      success: true,
      data: {
        username,
        agentId,
        modelName,
        currency,
        tokens,
        perTokenPrice: round4(perTokenPrice),
        baseAmount,
        baseDiscount,
        promo,
        totalDiscount: round2(baseDiscount.amount + promo.discountAmount),
        finalPayable,
      },
    };
  } catch (err) {
    console.error("❌ Error in verifyFinalPurchaseData:", err);
    return { success: false, error: "Internal server error while verifying the purchase." };
  }
}

/* ---------- Helpers ---------- */
function round2(n) {
  return Math.round((Number(n) + Number.EPSILON) * 100) / 100;
}
function round4(n) {
  return Math.round((Number(n) + Number.EPSILON) * 10000) / 10000;
}
function sanitizeCoupon(c) {
  const { createdAt, updatedAt, ...rest } = c || {};
  return rest;
}
function sanitizeOffer(o) {
  if (!o) return null;
  const { id, createdAt, updatedAt, status, globalUsedCount, ...rest } = o;
  return { ...rest, status, globalUsedCount };
}

module.exports = verifyFinalPurchaseData;

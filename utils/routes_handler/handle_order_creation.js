/**
 * utils/routes_handler/handle_order_creation.js
 *
 * Route handler for: POST /create_order
 * (attach to your Express app as: app.post("/create_order", authenticateUser, handleOrderCreation))
 *
 * ===========================================================================================
 * FULL JAVASCRIPT DOCBLOCK (behaviour, inputs, outputs, security and error handling)
 * ===========================================================================================
 *
 * @file handle_order_creation.js
 *
 * @description
 * Secure route handler that accepts a request to purchase AI tokens for an agent,
 * computes the final itemized billing (via business rules), records a draft order in the
 * database, creates a payment order with Razorpay, and then updates the saved draft
 * with the Razorpay order id. This route only records the payment intent and returns
 * the Razorpay order object to the client so the client can complete the payment flow.
 *
 * Key responsibilities:
 *  - Validate the caller and the input.
 *  - Use server-supplied `req.user.username` (do NOT trust client-supplied username).
 *  - Compute final billing using `verifyFinalPurchaseData` (enforces business rules).
 *  - Record an initial draft Order (orderId: "", status: "draft") into `UserOrders` before
 *    making any network call to the payment gateway. This preserves audit trail if payment
 *    creation fails.
 *  - Create a Razorpay order using `generatePaymentOrder` and pass the currency returned
 *    by the verification function.
 *  - Update the stored Order record to include the Razorpay `orderId` and set `status: "pending"`.
 *  - Return a minimal sanitized billing object and the Razorpay order to the client.
 *
 * Security & design notes:
 *  - All sensitive business logic (coupon/offer validation, discount caps) must reside in
 *    `verifyFinalPurchaseData`. This route only calls it and enforces its output.
 *  - The route logs internal errors server-side. Responses to the client contain sanitized,
 *    user-friendly error messages — never raw stack traces or DB errors.
 *  - The route never marks fulfillment as complete. Fulfillment/consumption of tokens must
 *    occur on successful payment confirmation (webhook or separate capture flow).
 *  - Currency management: currency is derived from the AI model pricing returned by
 *    `verifyFinalPurchaseData` and passed to the Razorpay generator. No conversion is
 *    performed here.
 *
 * Input (HTTP POST JSON body):
 *  {
 *    tokens: number,          // positive integer, required
 *    agentId: string,         // non-empty string ID of the agent, required
 *    modelName: string,       // non-empty model name (e.g., "gpt-4"), required
 *    couponCode?: string,     // optional, mutually exclusive with offerCode
 *    offerCode?: string       // optional, mutually exclusive with couponCode
 *  }
 *
 * The currently authenticated user must be available as req.user (authenticateUser middleware).
 * This handler expects req.user.username to exist and will use it to identify the purchaser.
 *
 * Output (HTTP JSON):
 *
 * Success (payment required):
 *  HTTP 200
 *  {
 *    success: true,
 *    message: "Order created. Use the provided razorpayOrder to complete payment.",
 *    razorpayOrder: { id, amount, currency, ... }, // object returned by Razorpay SDK
 *    receipt: string,                              // locally generated receipt id
 *    billing: { ... }                              // sanitized billing object (small)
 *  }
 *
 * Success (no payment required; final payable is 0):
 *  HTTP 200
 *  {
 *    success: true,
 *    message: "Order recorded. Final payable is 0 — no payment required. Complete fulfillment via the usual flow.",
 *    receipt: string,
 *    billing: { ... } // sanitized billing object
 *  }
 *
 * Failure:
 *  HTTP 4xx / 5xx
 *  { success: false, error: "client-safe error message" }
 *
 * Side-effects:
 *  - Creates/updates an entry in UserOrders (stores the FULL billing snapshot in paymentInfo)
 *  - Calls out to Razorpay to create an order (passing a small `notes` object)
 *
 * Database shape expectations (relevant parts):
 *  - UserOrders: { username: string, orders: Order[] }
 *  - Order: {
 *      orderId: string,
 *      amount: float,
 *      paymentInfo: json,
 *      receipt: string,
 *      fulfillment: boolean,
 *      status: "draft" | "pending" | "failed" | "paid",
 *      createdAt: DateTime,
 *      updatedAt: DateTime|null
 *    }
 *
 * Error mapping:
 *  - Validation errors return 400.
 *  - Authorization/authentication errors return 401.
 *  - Business verification errors (coupon invalid, offer invalid, etc.) return 400 with
 *    the `verification.error` message (verifyFinalPurchaseData provides client-safe messages).
 *  - Internal errors (DB/3rd-party) return 500 with a generic message and server-side logs.
 *
 * ===========================================================================================
 */

"use strict";

const { PrismaClient } = require("../../generated/customer-service");
const prisma = new PrismaClient();

const verifyFinalPurchaseData = require("../verify_final_purchase_data");
const generateReceipt = require("../payment/receiptId_generator");
const generatePaymentOrder = require("../payment/razorpay_payment_order_generator");

/**
 * Express route handler.
 *
 * @async
 * @param {import('express').Request} req - Express request. Expects `req.user.username`.
 * @param {import('express').Response} res - Express response.
 */
async function handleOrderCreation(req, res) {
  try {
    // -------------------- Auth check --------------------
    const actor = req.user;
    if (!actor || !actor.username) {
      return res.status(401).json({ success: false, error: "Authentication required." });
    }
    // ALWAYS use server-populated username; never trust client-supplied username
    const username = String(actor.username);

    // -------------------- Input validation --------------------
    const body = req.body || {};
    const tokens = body.tokens;
    const agentId = body.agentId;
    const modelName = body.modelName;
    const couponCode = body.couponCode;
    const offerCode = body.offerCode;

    if (!Number.isInteger(tokens) || tokens <= 0) {
      return res.status(400).json({ success: false, error: "Invalid 'tokens'. Must be a positive integer." });
    }
    if (typeof agentId !== "string" || !agentId.trim()) {
      return res.status(400).json({ success: false, error: "Invalid 'agentId'." });
    }
    if (typeof modelName !== "string" || !modelName.trim()) {
      return res.status(400).json({ success: false, error: "Invalid 'modelName'." });
    }
    if (couponCode && offerCode) {
      return res.status(400).json({ success: false, error: "Only one promotion may be applied at a time: coupon or offer." });
    }

    // -------------------- Verify business & compute billing --------------------
    const verification = await verifyFinalPurchaseData({
      username,
      tokens,
      agentId,
      modelName,
      couponCode,
      offerCode,
    });

    if (!verification) {
      console.error("verifyFinalPurchaseData returned falsy value for", { username, tokens, agentId, modelName });
      return res.status(500).json({ success: false, error: "Failed to verify purchase." });
    }
    if (!verification.success) {
      // verifyFinalPurchaseData returns client-safe messages; if it signals an "internal" issue,
      // map to 500, else 400.
      const isServerErr = String(verification.error || "").toLowerCase().includes("internal");
      return res.status(isServerErr ? 500 : 400).json({ success: false, error: verification.error || "Verification failed." });
    }

    const billing = verification.data;
    if (!billing || typeof billing.finalPayable !== "number") {
      console.error("Unexpected billing shape from verifyFinalPurchaseData:", billing);
      return res.status(500).json({ success: false, error: "Invalid billing data." });
    }

    // Defensive: finalPayable must not be negative
    if (billing.finalPayable < 0) {
      console.error("Billing finalPayable negative — rejecting:", billing);
      return res.status(500).json({ success: false, error: "Computed payable amount is invalid." });
    }

    // -------------------- Generate a receipt --------------------
    // Keep final receipt short but unique. Max length chosen to be 28 (timestamp included).
    const receiptPrefix = `order_${username}_`;
    const receiptResult = generateReceipt(receiptPrefix, 28);
    if (!receiptResult || !receiptResult.success) {
      console.error("Receipt generation failed:", receiptResult);
      return res.status(500).json({ success: false, error: "Failed to generate receipt." });
    }
    const receipt = receiptResult.receipt;

    // -------------------- Build payment info (DB copy) --------------------
    // Save FULL billing snapshot in DB (for audit). This can be large but DB stores it.
    // In Razorpay notes (below) we will include a minimal, compact summary (short keys).
    const paymentInfoForDB = {
      billingSnapshot: billing, // stores all details: baseDiscount, promo (with sanitized content), totals
      createdAt: new Date(),
    };

    // -------------------- Persist ORDER (before creating Razorpay order) --------------------
    // Use upsert: if a user has no UserOrders document, create it; otherwise push into orders array.
    // Keep orderId empty for now; will update once Razorpay returns order id.
    try {
      await prisma.UserOrders.upsert({
        where: { username },
        update: {
          orders: {
            push: {
              orderId: "", // placeholder
              amount: billing.finalPayable,
              paymentInfo: paymentInfoForDB,
              receipt,
              fulfillment: false, // do NOT set to true here (webhooks/routes will update after payment)
              status: "draft", // initial draft state
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          },
        },
        create: {
          username,
          orders: [
            {
              orderId: "",
              amount: billing.finalPayable,
              paymentInfo: paymentInfoForDB,
              receipt,
              fulfillment: false,
              status: "draft",
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
        },
      });
    } catch (dbErr) {
      console.error("DB upsert failed (pre-Razorpay).", { username, receipt, err: dbErr });
      return res.status(500).json({ success: false, error: "Failed to record order. Please try again." });
    }

    // -------------------- If payable is zero -> don't create Razorpay order ----------------    //
    // The client can be informed that payable is zero and that further handling will be done externally.
    if (Number(billing.finalPayable) === 0) {
      return res.status(200).json({
        success: true,
        message: "Order recorded. Final payable is 0 — no payment required. Complete fulfillment via the usual flow.",
        receipt,
        billing: sanitizeBillingForClient(billing),
      });
    }

    // -------------------- Prepare minimal notes for Razorpay (must be small) --------------------
    // Keep keys abbreviated to reduce total size. Avoid serializing large nested objects.
    function buildRazorpayNotes(minimalBilling) {
      // minimalBilling: billing object from verifyFinalPurchaseData
      const p = minimalBilling;
      const promo = p.promo || {};
      const baseDiscAmt = p.baseDiscount ? Number(p.baseDiscount.amount || 0) : 0;
      const promoDiscAmt = Number(promo.discountAmount || 0);

      // Short keys: u (username), a (agentId), t (tokens), amt (finalPayable),
      // bp (base price), pp (per token price), bd (base discount), pd (promo discount),
      // pt (promo type), pc (promo code)
      return {
        u: String(username).slice(0, 25),
        a: String(p.agentId || "").slice(0, 25),
        t: Number(p.tokens || 0),
        amt: Number(Number(p.finalPayable).toFixed(2)),
        bp: Number(Number(p.baseAmount || 0).toFixed(2)),
        pp: Number(Number(p.perTokenPrice || 0).toFixed(4)),
        bd: Number(Number(baseDiscAmt).toFixed(2)),
        pd: Number(Number(promoDiscAmt).toFixed(2)),
        pt: promo.type ? String(promo.type).slice(0, 10) : null,
        pc: promo.code ? String(promo.code).slice(0, 20) : null,
      };
    }

    const razorpayNotes = buildRazorpayNotes(billing);

    // -------------------- Create Razorpay order --------------------
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error("Missing Razorpay env keys.");
      return res.status(500).json({ success: false, error: "Payment gateway not configured." });
    }

    let razorpayResult;
    try {
      // Use billing.currency (derived from AIModel) to instruct the payment gateway
      razorpayResult = await generatePaymentOrder(
        RAZORPAY_KEY_ID,
        RAZORPAY_KEY_SECRET,
        { username },                     // userDetails (kept minimal)
        razorpayNotes,                    // tiny paymentInfo used in notes
        Number(billing.finalPayable),     // amount in main currency unit (generator multiplies by 100)
        receipt,
        "normal",
        billing.currency || "INR"         // use currency from billing (fall back to INR)
      );
    } catch (err) {
      console.error("Razorpay generator threw:", err);
      razorpayResult = { success: false, error: "Failed to create payment order." };
    }

    if (!razorpayResult || !razorpayResult.success) {
      console.error("Razorpay order creation failed:", razorpayResult && razorpayResult.error);
      // The DB already has a recorded order (without orderId). Return a meaningful message.
      return res.status(500).json({
        success: false,
        error: "Failed to create payment order. Your order has been recorded; please retry the payment.",
      });
    }

    const razorpayOrder = razorpayResult.order;
    if (!razorpayOrder || !razorpayOrder.id) {
      console.error("Razorpay returned invalid order:", razorpayOrder);
      return res.status(500).json({
        success: false,
        error: "Payment provider returned invalid order data. Contact support with receipt: " + receipt,
      });
    }

    // -------------------- Update DB record with razorpay orderId and status --------------------
    try {
      // Update the specific order (matched by receipt). Set orderId and mark status = "pending"
      await prisma.UserOrders.update({
        where: { username },
        data: {
          orders: {
            updateMany: {
              where: { receipt },
              data: {
                orderId: String(razorpayOrder.id),
                status: "pending",
                updatedAt: new Date(),
              },
            },
          },
        },
      });
    } catch (dbUpdateErr) {
      // Payment created but DB failed to attach orderId; that's a critical inconsistency to reconcile.
      console.error("Failed to attach razorpay orderId to DB order:", { err: dbUpdateErr, username, receipt, razorpayOrderId: razorpayOrder.id });
      return res.status(500).json({
        success: false,
        error:
          "Payment created but failed to attach payment ID to your order in our records. Contact support and provide receipt: " +
          receipt,
      });
    }

    // -------------------- Return success (client uses razorpayOrder to complete payment) --------------------
    return res.status(200).json({
      success: true,
      message: "Order created. Use the provided razorpayOrder to complete payment.",
      razorpayOrder, // includes id, amount, currency, etc. — client needs this to open checkout
      receipt,
      billing: sanitizeBillingForClient(billing),
    });
  } catch (uncaught) {
    console.error("Uncaught error in handleOrderCreation:", uncaught);
    return res.status(500).json({ success: false, error: "Internal server error while creating order." });
  }
}

/* -------------------- Helper: sanitize billing returned to client --------------------
   We intentionally keep the client view small: numeric totals and short descriptors.
   The full billing snapshot is already persisted in DB under paymentInfo for audits.
*/
function sanitizeBillingForClient(b) {
  if (!b) return null;
  const baseLevel = b.baseDiscount?.level || null;
  return {
    username: b.username,
    agentId: b.agentId,
    modelName: b.modelName,
    currency: b.currency,
    tokens: Number(b.tokens || 0),
    perTokenPrice: Number(b.perTokenPrice || 0),
    baseAmount: Number(b.baseAmount || 0),
    baseDiscount: {
      applied: Boolean(b.baseDiscount?.applied),
      amount: Number(b.baseDiscount?.amount || 0),
      level: baseLevel
        ? {
            minOrderValue: Number(baseLevel.minOrderValue || 0),
            maxOrderValue: baseLevel.maxOrderValue == null ? null : Number(baseLevel.maxOrderValue),
            discountType: baseLevel.discountType,
            discountValue: Number(baseLevel.discountValue || 0),
          }
        : null,
    },
    promo: b.promo
      ? {
          type: b.promo.type || null,
          code: b.promo.code || null,
          discountAmount: Number(b.promo.discountAmount || 0),
        }
      : null,
    totalDiscount: Number(b.totalDiscount || 0),
    finalPayable: Number(b.finalPayable || 0),
  };
}

module.exports = handleOrderCreation;

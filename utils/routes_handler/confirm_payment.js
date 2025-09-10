// utils/routes_handler/confirm_payment.js

const fetchPaymentStatus = require("../payment/razorpay_fetch_payment_status");
const allotTokensToUsersAgentAfterPurchase = require("../payment/allot_tokens_to_users_agent_after_purchase");
const { PrismaClient } = require("../../generated/customer-service");
const prisma = new PrismaClient();

/**
 * Confirm Razorpay payment and allot tokens to agent.
 *
 * Flow:
 * 1. Authenticated user hits this endpoint with razorpay_order_id or razorpay_payment_id.
 * 2. Verify payment status with Razorpay.
 * 3. If successful:
 *    - Locate user's order in UserOrders.orders[] by orderId.
 *    - Ensure fulfillment=false (avoid double allotment).
 *    - Mark order.status="paid" and fulfillment=true.
 *    - Allot tokens to the agent using paymentInfo (modelName, agentId, tokens).
 * 4. If already fulfilled, skip allotment and return success.
 *
 * SECURITY:
 * - Ensures username from JWT matches UserOrders.username.
 * - Ensures orderId exists and belongs to the user.
 * - Prevents double fulfillment.
 *
 * @async
 * @function confirmPaymentHandler
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Promise<void>}
 */
async function confirmPaymentHandler(req, res,RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET ) {
  try {
    const { razorpay_payment_id, razorpay_order_id } = req.body;
    const username = req.user?.username;

    if (!username) {
      return res.status(403).json({ success: false, error: "Unauthorized request." });
    }

    if (!razorpay_order_id && !razorpay_payment_id) {
      return res.status(400).json({ success: false, error: "Missing payment identifiers." });
    }

    // 1. Fetch payment status from Razorpay
    const paymentResult = await fetchPaymentStatus(
      RAZORPAY_KEY_ID,
      RAZORPAY_KEY_SECRET,
      { orderId: razorpay_order_id, paymentId: razorpay_payment_id }
    );

    if (!paymentResult.success) {
      return res.status(400).json({ success: false, error: paymentResult.error || "Payment fetch failed." });
    }

    const paymentStatus = paymentResult.status;
    if (paymentStatus !== "captured") {
      return res.status(400).json({
        success: false,
        error: `Payment not successful. Current status: ${paymentStatus}`,
      });
    }

    // 2. Locate order in DB
    const userOrders = await prisma.UserOrders.findUnique({
      where: { username },
    });

    if (!userOrders) {
      return res.status(404).json({ success: false, error: "User orders not found." });
    }

    const orders = Array.isArray(userOrders.orders) ? userOrders.orders : [];
    const orderIndex = orders.findIndex((o) => o.orderId === razorpay_order_id);

    if (orderIndex < 0) {
      return res.status(404).json({ success: false, error: "Order not found for this user." });
    }

    const order = orders[orderIndex];

    // 3. Check if already fulfilled
    if (order.fulfillment === true) {
      return res.status(200).json({
        success: true,
        message: "Order already fulfilled. No duplicate allotment.",
      });
    }

    // 4. Extract payment info
    const paymentInfo = order.paymentInfo || {};
    
    const { agentId, modelName, tokens } = paymentInfo.billingSnapshot;

    if (!agentId || !modelName || !tokens) {
      return res.status(400).json({
        success: false,
        error: "Invalid payment info. Cannot process allotment.",
      });
    }

    // 5. Allot tokens
    const allotResult = await allotTokensToUsersAgentAfterPurchase({
      username,
      agentId,
      modelName,
      tokens,
      metadata: { receipt: order.receipt, source: "razorpay" },
    });

    if (!allotResult.success) {
      return res.status(500).json({
        success: false,
        error: "Failed to allot tokens.",
        details: allotResult.error,
      });
    }

    // 6. Update order status -> paid + fulfilled
    orders[orderIndex] = {
      ...order,
      status: "paid",
      fulfillment: true,
      updatedAt: new Date(),
    };

    await prisma.UserOrders.update({
      where: { username },
      data: {
        orders,
        updatedAt: new Date(),
      },
    });

    return res.status(200).json({
      success: true,
      message: "Payment confirmed and tokens allotted successfully.",
      orderId: razorpay_order_id,
      allotment: allotResult.data,
    });
  } catch (err) {
    console.error("❌ Error in confirmPaymentHandler:", err);
    return res.status(500).json({
      success: false,
      error: "Internal server error while confirming payment.",
    });
  }
}

module.exports = confirmPaymentHandler;

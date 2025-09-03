const Razorpay = require("razorpay");
const crypto = require("crypto");

/**
 * Verify Razorpay payment for an order.
 *
 * Two possible flows:
 * 
 * 🔹 Flow A (orderId + paymentId + signature): 
 *   - Verify signature cryptographically
 *   - Fetch order + payment
 *   - Check username consistency
 *
 * 🔹 Flow B (orderId + username only):
 *   - Fetch order
 *   - Check username consistency
 *   - Fetch all payments for order
 *   - Find captured (successful) payment
 *
 * @async
 * @function verifyPayment
 * @param {string} keyId - Razorpay Key ID.
 * @param {string} keySecret - Razorpay Key Secret.
 * @param {Object} params - Input parameters.
 * @param {string} params.username - Username provided by client.
 * @param {string} params.orderId - Razorpay order_id.
 * @param {string} [params.paymentId] - Razorpay payment_id (optional).
 * @param {string} [params.signature] - Razorpay signature (optional).
 * @returns {Promise<{success: boolean, message?: string, data?: Object, error?: string}>}
 */
async function verifyPayment(keyId, keySecret, { username, orderId, paymentId, signature }) {
  const razorpay = new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });

  try {
    let order, successfulPayment;

    // -----------------------------
    // Flow A: Signature Verification
    // -----------------------------
    if (paymentId && signature && orderId) {
      const body = `${orderId}|${paymentId}`;
      const expectedSignature = crypto
        .createHmac("sha256", keySecret)
        .update(body.toString())
        .digest("hex");

      if (expectedSignature !== signature) {
        return { success: false, error: "Invalid signature, payment cannot be verified." };
      }

      // Fetch order & payment directly
      order = await razorpay.orders.fetch(orderId);
      successfulPayment = await razorpay.payments.fetch(paymentId);

      // ✅ Check username consistency
      let userDetails = {};
      if (order.notes?.userDetails) {
        try {
          userDetails = JSON.parse(order.notes.userDetails);
        } catch {
          return { success: false, error: "Failed to parse user details from order notes." };
        }
      }

      if (!userDetails?.username || userDetails.username !== username) {
        return { success: false, error: "Username mismatch. Payment not authorized for this user." };
      }

      // 🔍 Order status check
      if (order.status === "created") {
        return { success: false, error: "Order created but no payment attempt made yet." };
      }
      if (order.status === "attempted") {
        return { success: false, error: "Payment attempted but not successful. Awaiting capture." };
      }
      if (order.status !== "paid") {
        return { success: false, error: `Unexpected order status: ${order.status}` };
      }

      // 🔍 Payment status check
      if (successfulPayment.status === "created") {
        return { success: false, error: "Payment created but not processed yet." };
      }
      if (successfulPayment.status === "authorized") {
        return { success: false, error: "Payment authorized but not captured yet." };
      }
      if (successfulPayment.status === "failed") {
        return { success: false, error: "Payment failed during processing." };
      }
      if (successfulPayment.status === "refunded") {
        return { success: false, error: "Payment was refunded, transaction no longer valid." };
      }
      if (successfulPayment.status !== "captured") {
        return { success: false, error: `Unknown payment status: ${successfulPayment.status}` };
      }

      // ✅ Success
      return {
        success: true,
        message: "Payment verified successfully.",
        data: {
          userDetails,
          paymentInfo: order.notes?.paymentInfo ? JSON.parse(order.notes.paymentInfo) : {},
          amount: successfulPayment.amount / 100,
          paymentId: successfulPayment.id,
          orderId: order.id,
          method: successfulPayment.method,
          status: successfulPayment.status,
        },
      };
    }

    // -----------------------------
    // Flow B: Order-only Verification
    // -----------------------------
    if (orderId && username) {
      // Fetch order
      order = await razorpay.orders.fetch(orderId);

      let userDetails = {};
      if (order.notes?.userDetails) {
        try {
          userDetails = JSON.parse(order.notes.userDetails);
        } catch {
          return { success: false, error: "Failed to parse user details from order notes." };
        }
      }

      if (!userDetails?.username || userDetails.username !== username) {
        return { success: false, error: "Username mismatch. Payment not authorized for this user." };
      }

      // 🔍 Order status check
      if (order.status === "created") {
        return { success: false, error: "Order created but no payment attempt made yet." };
      }
      if (order.status === "attempted") {
        return { success: false, error: "Payment attempted but not successful. Awaiting capture." };
      }
      if (order.status !== "paid") {
        return { success: false, error: `Unexpected order status: ${order.status}` };
      }

      // Fetch all payments linked to this order
      const paymentsResponse = await razorpay.orders.fetchPayments(orderId);
      const payments = paymentsResponse.items || [];

      if (!payments.length) {
        return { success: false, error: "No payments found for this order." };
      }

      successfulPayment = payments.find(p => p.status === "captured");

      // If no captured payment, check for other statuses
      if (!successfulPayment) {
        const latestPayment = payments[0];
        if (latestPayment.status === "created") {
          return { success: false, error: "Payment created but not processed yet." };
        }
        if (latestPayment.status === "authorized") {
          return { success: false, error: "Payment authorized but not captured yet." };
        }
        if (latestPayment.status === "failed") {
          return { success: false, error: "Payment failed during processing." };
        }
        if (latestPayment.status === "refunded") {
          return { success: false, error: "Payment was refunded, transaction no longer valid." };
        }
        return { success: false, error: `No successful payment found. Latest status: ${latestPayment.status}` };
      }

      // ✅ Success
      return {
        success: true,
        message: "Payment verified successfully.",
        data: {
          userDetails,
          paymentInfo: order.notes?.paymentInfo ? JSON.parse(order.notes.paymentInfo) : {},
          amount: successfulPayment.amount / 100,
          paymentId: successfulPayment.id,
          orderId: order.id,
          method: successfulPayment.method,
          status: successfulPayment.status,
        },
      };
    }

    // -----------------------------
    // Invalid input case
    // -----------------------------
    return { success: false, error: "Insufficient parameters for payment verification." };
  } catch (error) {
    console.error("❌ Error verifying payment:", error);
    return { success: false, error: error?.message || "Payment verification failed." };
  }
}

module.exports = verifyPayment;

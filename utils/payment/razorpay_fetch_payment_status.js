const Razorpay = require("razorpay");

/**
 * Fetch Razorpay order or payment status.
 *
 * @async
 * @function fetchPaymentStatus
 * @param {string} keyId - Razorpay Key ID (test/live).
 * @param {string} keySecret - Razorpay Key Secret (test/live).
 * @param {Object} params - Input params.
 * @param {string} [params.orderId] - Razorpay Order ID (preferred).
 * @param {string} [params.paymentId] - Razorpay Payment ID (fallback if orderId not provided).
 * @returns {Promise<{success: boolean, status?: string, method?: string, data?: Object, error?: string}>}
 *
 * @example
 * const result = await fetchPaymentStatus(process.env.KEY_ID, process.env.KEY_SECRET, {
 *   orderId: "order_RCpdal1InoQ0P9"
 * });
 *
 * if (result.success) {
 *   console.log("✅ Status:", result.status, "Method:", result.method);
 * } else {
 *   console.error("❌ Error:", result.error);
 * }
 */
async function fetchPaymentStatus(keyId, keySecret, { orderId, paymentId }) {
  const razorpay = new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });

  try {
    if (orderId) {
      // Fetch order
      const order = await razorpay.orders.fetch(orderId);

      // Fetch payments for this order
      const payments = await razorpay.orders.fetchPayments(orderId);

      let paymentStatus = "created";
      let paymentMethod = null;

      if (payments && payments.items.length > 0) {
        const payment = payments.items[0]; // usually only 1 payment per order
        paymentStatus = payment.status;
        paymentMethod = payment.method || null;
      }

      return {
        success: true,
        status: paymentStatus,
        method: paymentMethod,
        data: { order, payments },
      };
    }

    if (paymentId) {
      // Fetch payment directly
      const payment = await razorpay.payments.fetch(paymentId);

      return {
        success: true,
        status: payment.status,
        method: payment.method || null,
        data: payment,
      };
    }

    return {
      success: false,
      error: "Either orderId or paymentId must be provided",
    };
  } catch (error) {
    console.error("❌ Error fetching payment status:", error);

    return {
      success: false,
      error: error?.message || "Failed to fetch payment status",
    };
  }
}

module.exports = fetchPaymentStatus;

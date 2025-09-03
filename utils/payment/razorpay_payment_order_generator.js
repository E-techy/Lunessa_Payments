const Razorpay = require("razorpay");

/**
 * Generate a Razorpay order with custom metadata and order type.
 *
 * @async
 * @function generatePaymentOrder
 * @param {string} keyId - Razorpay Key ID (test or live).
 * @param {string} keySecret - Razorpay Key Secret (test or live).
 * @param {Object} userDetails - JSON object containing user details (e.g., { userId, name, email }).
 * @param {Object} paymentInfo - JSON object with payment-related info (e.g., { plan, tokens }).
 * @param {number} amount - Amount in INR (in rupees, not paise).
 * @param {string} receiptNumber - Unique receipt number for tracking.
 * @param {"normal"|"manual_capture"} [orderType="normal"] - Type of order:
 *   - "normal": Default flow (auto-captures after payment success)
 *   - "manual_capture": Payment is authorized only, must be captured later
 * @returns {Promise<{success: boolean, order?: Object, error?: string}>}
 *
 * @example
 * const result = await generatePaymentOrder(
 *   "rzp_test_xxxxx",
 *   "secret_xxxxx",
 *   { userId: "123", name: "Ashutosh", email: "ashu@example.com" },
 *   { plan: "gold", tokens: 50 },
 *   500,
 *   "receipt#101",
 *   "manual_capture"
 * );
 *
 * if (result.success) {
 *   console.log("Order Created:", result.order);
 * } else {
 *   console.error("Error:", result.error);
 * }
 */
async function generatePaymentOrder(
  keyId,
  keySecret,
  userDetails,
  paymentInfo,
  amount,
  receiptNumber,
  orderType = "normal"
) {
  const razorpay = new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // Razorpay expects paise
      currency: "INR",
      receipt: receiptNumber,
      payment_capture: orderType === "normal" ? 1 : 0, // auto-capture or manual
      notes: {
        userDetails: JSON.stringify(userDetails),
        paymentInfo: JSON.stringify(paymentInfo),
        orderType,
      },
    });

    return { success: true, order };
  } catch (error) {
    console.error("❌ Error creating Razorpay order:", error);

    return {
      success: false,
      error: error?.message || "Failed to create Razorpay order",
    };
  }
}

module.exports = generatePaymentOrder;

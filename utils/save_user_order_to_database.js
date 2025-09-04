const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * Save a new order for a user in the database.
 *
 * This function ensures user orders are tracked inside the `UserOrders` collection.
 * 
 * - If the user already exists, the new order is appended to their `orders` array.
 * - If the user does not exist, a new document is created with the provided order.
 * - The `fulfillment` field defaults to `false` if not provided.
 * - `amount` should be passed in INR (not paise).
 *
 * @async
 * @function saveUserOrderToDatabase
 * @param {Object} params - Input parameters
 * @param {string} params.username - Unique username of the user
 * @param {string} params.orderId - Razorpay order ID
 * @param {number} params.amount - Amount in INR (converted from paise before saving)
 * @param {Object} params.paymentInfo - Arbitrary JSON object with payment details (status, method, etc.)
 * @param {string} params.receipt - Receipt number linked to the order
 * @param {boolean} [params.fulfillment=false] - Whether the order is fulfilled (defaults to false)
 *
 * @returns {Promise<{ success: boolean, error?: string }>}
 *
 * @example
 * const result = await saveUserOrderToDatabase({
 *   username: "ashutosh",
 *   orderId: "order_RCpdal1InoQ0P9",
 *   amount: 500,
 *   paymentInfo: { method: "upi", status: "captured" },
 *   receipt: "receipt#101"
 * });
 *
 * if (result.success) {
 *   console.log("✅ Order saved successfully");
 * } else {
 *   console.error("❌ Error:", result.error);
 * }
 */
async function saveUserOrderToDatabase({ username, orderId, amount, paymentInfo, receipt, fulfillment = false }) {
  try {
    // Ensure paymentInfo is a valid JSON object
    if (typeof paymentInfo !== "object" || paymentInfo === null) {
      return { success: false, error: "Invalid paymentInfo: must be a JSON object" };
    }

    // Prepare the new order object
    const newOrder = {
      orderId,
      amount,
      paymentInfo,
      receipt,
      fulfillment,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Try updating existing user
    const updatedUser = await prisma.userOrders.update({
      where: { username },
      data: {
        orders: {
          push: newOrder, // append new order
        },
      },
    }).catch(async (err) => {
      // If user does not exist, create a new one
      if (err.code === "P2025") {
        return await prisma.userOrders.create({
          data: {
            username,
            orders: [newOrder],
          },
        });
      }
      throw err;
    });

    return { success: true };
  } catch (error) {
    console.error("❌ Error saving user order:", error);
    return { success: false, error: error?.message || "Failed to save order" };
  }
}

module.exports = saveUserOrderToDatabase;

// (async (params) => {
//     let result = await saveUserOrderToDatabase({username:"aman123", orderId:"sajvoa42q35143",amount: 25000, paymentInfo:{offer: "new user", discount: 10}, receipt: "jofnvau4315" });
//     console.log(result);
// })();
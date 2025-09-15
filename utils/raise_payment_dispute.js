// utils/raise_payment_dispute.js
const { PrismaClient } = require("../generated/customer-service");
const prisma = new PrismaClient();
const { v4: uuidv4 } = require("uuid");

/**
 * Raise a new payment dispute for a given user and order.
 *
 * 🔹 Models Used:
 * - UserOrders → Verify that the username and orderId exist.
 * - Disputes   → Store the dispute raised by the user.
 *
 * 🔹 Input:
 * @param {Object} params - Parameters for raising a dispute.
 * @param {string} params.username - Username of the user raising the dispute.
 * @param {string} params.orderId - Order ID against which the dispute is raised.
 * @param {string} params.disputeComment - The complaint/comment provided by the user.
 *
 * 🔹 Behavior:
 * 1. Validates input types to ensure proper data.
 * 2. Checks in `UserOrders` if the username exists.
 *    - If not found → returns error.
 *    - If found but orderId not present → returns error.
 * 3. Creates a new dispute entry in `Disputes` model:
 *    - If the user already has a `Disputes` document → append to existing disputes array.
 *    - If no document exists for the user → create a new one with this dispute.
 * 4. Each dispute has:
 *    - disputeId (UUID),
 *    - orderId,
 *    - disputeComment,
 *    - resolved (false by default),
 *    - createdAt, updatedAt.
 *
 * 🔹 Output:
 * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
 *   - success: true → Returns updated/created Disputes document.
 *   - success: false → Returns error reason.
 *
 * 🔹 Example:
 * ```js
 * const result = await raisePaymentDispute({
 *   username: "john_doe",
 *   orderId: "ORD123",
 *   disputeComment: "Payment deducted but order not confirmed"
 * });
 * console.log(result);
 * ```
 */
async function raisePaymentDispute({ username, orderId, disputeComment }) {
  try {
    // 1. Input validation
    if (!username || typeof username !== "string") {
      return { success: false, error: "Invalid input: username must be a non-empty string." };
    }
    if (!orderId || typeof orderId !== "string") {
      return { success: false, error: "Invalid input: orderId must be a non-empty string." };
    }
    if (!disputeComment || typeof disputeComment !== "string") {
      return { success: false, error: "Invalid input: disputeComment must be a non-empty string." };
    }

    // 2. Verify username and orderId from UserOrders
    const userOrders = await prisma.UserOrders.findUnique({
      where: { username },
    });

    if (!userOrders) {
      return { success: false, error: `No orders found: username ${username} does not exist in UserOrders.` };
    }

    const orderExists = userOrders.orders.some(order => order.orderId === orderId);
    if (!orderExists) {
      return { success: false, error: `No order found with orderId ${orderId} for username ${username}.` };
    }

    // 3. Create new dispute object
    const newDispute = {
      disputeId: uuidv4(),
      orderId,
      disputeComment,
      resolved: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // 4. Insert dispute into Disputes model
    const existingDisputes = await prisma.Disputes.findUnique({
      where: { username },
    });

    let updatedDisputes;
    if (existingDisputes) {
      // Append new dispute
      updatedDisputes = await prisma.Disputes.update({
        where: { username },
        data: {
          disputes: {
            push: newDispute,
          },
          updatedAt: new Date(),
        },
      });
    } else {
      // Create new Disputes entry
      updatedDisputes = await prisma.Disputes.create({
        data: {
          username,
          disputes: [newDispute],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    }

    return { success: true, data: updatedDisputes };
  } catch (error) {
    console.error("❌ Error raising payment dispute:", error);
    return { success: false, error: error.message || "Failed to raise dispute." };
  }
}

module.exports = raisePaymentDispute;

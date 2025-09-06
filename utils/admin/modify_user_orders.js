const { PrismaClient } = require('../node_modules/.prisma-customer-service');
const prisma = new PrismaClient();

/**
 * Modify a specific order of a user in the UserOrders model.
 *
 * 🔹 Access Control:
 *   - Only admins with role `superAdmin` or `payments` can use this function.
 *
 * 🔹 Input:
 * @param {Object} params - Input parameters.
 * @param {string} params.adminRole - Role of the admin ("superAdmin" | "payments").
 * @param {string} params.username - Username whose order needs modification.
 * @param {string} params.orderId - Order ID to identify the order.
 * @param {Object} params.orderModificationData - Key-value pairs of fields to be updated in the order.
 *
 * 🔹 Behavior:
 * - Validates `adminRole` before modifying.
 * - Locates the user by `username`.
 * - Locates the order by `orderId`.
 * - Validates `orderModificationData` keys against allowed fields.
 * - Applies modifications and updates `updatedAt` timestamp.
 *
 * 🔹 Restrictions:
 * - The following fields CANNOT be modified: `orderId`, `amount`, `receipt`, `createdAt`.
 *
 * 🔹 Output:
 * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
 *   - success: true → Returns updated order details.
 *   - success: false → Operation failed with error reason.
 *
 * 🔹 Example:
 * ```js
 * const result = await modifyUserOrder({
 *   adminRole: "superAdmin",
 *   username: "aman123",
 *   orderId: "order_ABC123",
 *   orderModificationData: { fulfillment: true, paymentInfo: { method: "UPI" } }
 * });
 * console.log(result);
 * // { success: true, data: { username: "aman123", updatedOrder: {...} } }
 * ```
 */
async function modifyUserOrder({ adminRole, username, orderId, orderModificationData }) {
  try {
    // 1. Authorization
    if (!["superAdmin", "payments"].includes(adminRole)) {
      return { success: false, error: "Unauthorized: Admin role not permitted to modify orders." };
    }

    // 2. Define allowed fields (excluding immutable fields)
    const allowedFields = ["paymentInfo", "fulfillment"];
    const invalidFields = Object.keys(orderModificationData).filter(
      key => !allowedFields.includes(key)
    );

    if (invalidFields.length > 0) {
      return { success: false, error: `Modification not allowed for fields: ${invalidFields.join(", ")}` };
    }

    // 3. Fetch the user orders
    const userOrders = await prisma.UserOrders.findUnique({
      where: { username },
    });

    if (!userOrders) {
      return { success: false, error: `No user found with username: ${username}` };
    }

    // 4. Find the order
    const orders = [...userOrders.orders];
    const orderIndex = orders.findIndex(o => o.orderId === orderId);

    if (orderIndex === -1) {
      return { success: false, error: `No order found with orderId: ${orderId} for username: ${username}` };
    }

    // 5. Apply modifications
    const existingOrder = orders[orderIndex];
    const updatedOrder = {
      ...existingOrder,
      ...orderModificationData,
      updatedAt: new Date(), // always update updatedAt
    };

    orders[orderIndex] = updatedOrder;

    // 6. Save back to DB
    await prisma.UserOrders.update({
      where: { username },
      data: { orders },
    });

    return {
      success: true,
      data: {
        username,
        updatedOrder,
      },
    };
  } catch (error) {
    console.error("❌ Error modifying user order:", error);
    return { success: false, error: error.message || "Failed to modify user order." };
  }
}

module.exports = modifyUserOrder;

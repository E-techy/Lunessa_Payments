const { PrismaClient } = require('../../generated/customer-service');
const prisma = new PrismaClient();

/**
 * Fetch user orders from the UserOrders model.
 *
 * 🔹 Access Control:
 *   - Only admins with role `superAdmin` or `payments` can use this function.
 *
 * 🔹 Input:
 * @param {Object} params - Input parameters.
 * @param {string} params.adminRole - Role of the admin ("superAdmin" | "payments" | others).
 * @param {string} [params.username] - Username to fetch orders for (optional).
 * @param {string} [params.orderId] - Razorpay orderId to fetch a specific order (optional).
 *
 * 🔹 Behavior:
 * - If no `username` and no `orderId`: Fetches all users with their orders.
 * - If only `username`: Fetches all orders for that user.
 * - If only `orderId`: Searches all users and finds the matching order.
 * - If both `username` and `orderId`: Fetches the specific order for that user.
 *
 * 🔹 Output:
 * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
 *   - success: true → Returns orders based on query mode.
 *   - success: false → Operation failed, with error reason.
 *
 * 🔹 Example:
 * ```js
 * const result = await getUserOrders({
 *   adminRole: "superAdmin",
 *   username: "aman123",
 *   orderId: "order_ABC123"
 * });
 * console.log(result);
 * // { success: true, data: { orderId: "order_ABC123", ... } }
 * ```
 */
async function getUserOrders({ adminRole, username, orderId }) {
  try {
    // 1. Validate role
    if (!["superAdmin", "payments"].includes(adminRole)) {
      return { success: false, error: "Unauthorized: Admin role not permitted to view orders." };
    }

    // -----------------------------
    // Case 1: No username & no orderId → Fetch all users with their orders
    // -----------------------------
    if (!username && !orderId) {
      const allUsers = await prisma.UserOrders.findMany();
      return { success: true, data: allUsers };
    }

    // -----------------------------
    // Case 2: Username only → Fetch all orders for that user
    // -----------------------------
    if (username && !orderId) {
      const userOrders = await prisma.UserOrders.findUnique({
        where: { username },
      });

      if (!userOrders) {
        return { success: false, error: `No orders found for username: ${username}` };
      }

      return { success: true, data: userOrders };
    }

    // -----------------------------
    // Case 3: OrderId only → Search all users and find matching order
    // -----------------------------
    if (!username && orderId) {
      const allUsers = await prisma.UserOrders.findMany();

      for (const user of allUsers) {
        const order = user.orders.find(o => o.orderId === orderId);
        if (order) {
          return { success: true, data: { username: user.username, order } };
        }
      }

      return { success: false, error: `No order found with orderId: ${orderId}` };
    }

    // -----------------------------
    // Case 4: Username + OrderId → Fetch specific order of that user
    // -----------------------------
    if (username && orderId) {
      const userOrders = await prisma.UserOrders.findUnique({
        where: { username },
      });

      if (!userOrders) {
        return { success: false, error: `No user found with username: ${username}` };
      }

      const order = userOrders.orders.find(o => o.orderId === orderId);

      if (!order) {
        return { success: false, error: `No order found with orderId: ${orderId} for username: ${username}` };
      }

      return { success: true, data: { username, order } };
    }

    // Fallback (shouldn't reach here)
    return { success: false, error: "Invalid input parameters." };
  } catch (error) {
    console.error("❌ Error fetching user orders:", error);
    return { success: false, error: error.message || "Failed to fetch user orders." };
  }
}

module.exports = getUserOrders;

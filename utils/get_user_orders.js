// utils/get_user_orders.js
const { PrismaClient } = require("../generated/customer-service");
const prisma = new PrismaClient();

/**
 * Fetch all orders belonging to a specific user by username.
 *
 * 🔹 Model: UserOrders
 *   - Each user has a unique `username` and an array of `orders`.
 *   - Orders contain details such as `orderId`, `amount`, `paymentInfo`, `receipt`,
 *     `fulfillment` status, and lifecycle timestamps.
 *
 * 🔹 Access Control:
 *   - This function assumes that authentication is already handled upstream (middleware).
 *   - It only fetches orders for the provided `username`.
 *
 * 🔹 Input:
 * @param {string} username - The username of the user whose orders need to be fetched.
 *
 * 🔹 Behavior:
 * 1. Validates that `username` is provided.
 * 2. Queries the `UserOrders` collection for a record matching the username.
 * 3. Returns all associated orders if found.
 * 4. If no orders are found, returns success with an empty array.
 *
 * 🔹 Output:
 * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
 *   - success: true → Returns user order document, including orders array.
 *   - success: false → Returns error reason.
 *
 * 🔹 Example:
 * ```js
 * const result = await getUserOrders("john_doe");
 * if (result.success) {
 *   console.log("✅ Orders:", result.data.orders);
 * } else {
 *   console.error("❌ Error:", result.error);
 * }
 * ```
 */
async function getUserOrders(username) {
  try {
    // 1. Validate input
    if (!username || typeof username !== "string") {
      return { success: false, error: "Invalid input: username must be a non-empty string." };
    }

    // 2. Fetch user orders
    const userOrders = await prisma.UserOrders.findUnique({
      where: { username },
    });

    // 3. If no orders found
    if (!userOrders) {
      return {
        success: true,
        data: { username, orders: [] },
      };
    }

    // 4. Return fetched orders
    return {
      success: true,
      data: userOrders,
    };
  } catch (error) {
    console.error("❌ Error fetching user orders:", error);
    return {
      success: false,
      error: error.message || "Failed to fetch user orders.",
    };
  }
}

module.exports = getUserOrders;

// utils/admin/fetch_razorpay_orders.js
const Razorpay = require("razorpay");

/**
 * Fetch Razorpay Orders with flexible query support.
 *
 * ---
 * 🔐 Auth:
 * Requires valid Razorpay credentials (`RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`).
 *
 * ---
 * 📥 Input Parameters:
 * @param {Object} params - Input parameters.
 * @param {string} params.RAZORPAY_KEY_ID - Razorpay API Key ID.
 * @param {string} params.RAZORPAY_KEY_SECRET - Razorpay API Key Secret.
 *
 * @param {string} [params.orderId] - Fetch a specific order by Razorpay Order ID.
 *
 * @param {boolean} [params.allOrders=false] - If true, fetches all orders (with optional filters).
 *
 * @param {string} [params.username] - Filter orders by username inside `notes.userDetails`.
 *
 * @param {string} [params.paymentMethod] - Filter by payment method (e.g., "card", "upi", "netbanking").
 *
 * @param {number} [params.from] - Timestamp (in seconds) for filtering orders created **after** this time.
 *
 * @param {number} [params.to] - Timestamp (in seconds) for filtering orders created **before** this time.
 *
 * @param {number} [params.count=10] - Number of results to fetch (default: 10, max: 100).
 *
 * @param {number} [params.skip=0] - Number of results to skip for pagination.
 *
 * ---
 * 📤 Output:
 * @returns {Promise<{success: boolean, data?: Object|Array, error?: string}>}
 * - `success: true` → Returns either a single order object or an array of orders.
 * - `success: false` → Returns error reason.
 *
 */
async function fetchRazorpayOrders({
  RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET,
  orderId,
  allOrders = false,
  username,
  paymentMethod,
  from,
  to,
  count = 10,
  skip = 0,
}) {
  try {
    // ✅ 1. Validate credentials
    if (
      !RAZORPAY_KEY_ID ||
      typeof RAZORPAY_KEY_ID !== "string" ||
      !RAZORPAY_KEY_SECRET ||
      typeof RAZORPAY_KEY_SECRET !== "string"
    ) {
      return { success: false, error: "Missing or invalid Razorpay credentials" };
    }

    // ✅ 2. Validate input types
    if (orderId && typeof orderId !== "string") {
      return { success: false, error: "`orderId` must be a string" };
    }

    if (typeof allOrders !== "boolean") {
      allOrders = false; // fallback
    }

    if (username && typeof username !== "string") {
      return { success: false, error: "`username` must be a string" };
    }

    if (paymentMethod && typeof paymentMethod !== "string") {
      return { success: false, error: "`paymentMethod` must be a string" };
    }

    if (from && isNaN(Number(from))) {
      return { success: false, error: "`from` must be a valid timestamp (seconds)" };
    }

    if (to && isNaN(Number(to))) {
      return { success: false, error: "`to` must be a valid timestamp (seconds)" };
    }

    if (isNaN(Number(count)) || count < 1 || count > 100) {
      count = 10; // default safe value
    }

    if (isNaN(Number(skip)) || skip < 0) {
      skip = 0;
    }

    // ✅ 3. Enforce correct usage
    if (!orderId && !allOrders) {
      return { success: false, error: "Must provide either `orderId` or set `allOrders=true`" };
    }

    if (username && !allOrders) {
      return { success: false, error: "To filter by `username`, you must set `allOrders=true`" };
    }

    if (paymentMethod && !allOrders) {
      return { success: false, error: "To filter by `paymentMethod`, you must set `allOrders=true`" };
    }

    // ✅ 4. Init Razorpay client
    const razorpay = new Razorpay({
      key_id: RAZORPAY_KEY_ID,
      key_secret: RAZORPAY_KEY_SECRET,
    });

    // ✅ 5. Fetch single order
    if (orderId) {
      try {
        const order = await razorpay.orders.fetch(orderId);
        return { success: true, data: order };
      } catch (err) {
        return { success: false, error: `Order not found: ${orderId}` };
      }
    }

    // ✅ 6. Fetch multiple orders
    const options = { count, skip };
    if (from) options.from = Number(from);
    if (to) options.to = Number(to);

    let ordersResponse;
    try {
      ordersResponse = await razorpay.orders.all(options);
    } catch (err) {
      return { success: false, error: "Failed to fetch orders from Razorpay" };
    }

    let orders = ordersResponse.items || [];

    // 🔍 Username filter
    if (username) {
      orders = orders.filter((o) => {
        try {
          const userDetails = JSON.parse(o.notes?.userDetails || "{}");
          return userDetails.username === username;
        } catch {
          return false;
        }
      });
    }

    // 🔍 Payment method filter
    if (paymentMethod) {
      const filteredOrders = [];
      for (const order of orders) {
        try {
          const payments = await razorpay.orders.fetchPayments(order.id);
          if (payments.items.some((p) => p.method === paymentMethod)) {
            filteredOrders.push(order);
          }
        } catch (err) {
          console.warn(`⚠️ Could not fetch payments for order ${order.id}:`, err.message);
        }
      }
      orders = filteredOrders;
    }

    return { success: true, data: orders };
  } catch (err) {
    console.error("❌ Unexpected error in fetchRazorpayOrders:", err);
    return { success: false, error: "Unexpected server error" };
  }
}

module.exports = fetchRazorpayOrders;

/* -------------------------
   🔍 Simple Test Function
-------------------------- */
// async function testFetchOrders() {
//   const params = {
//     RAZORPAY_KEY_ID: "rzp_test_xxxxxxxx",
//     RAZORPAY_KEY_SECRET: "xxxxxxxxxxxxx",
//     // orderId: "order_xxxxxxx", // case: fetch single order
//     allOrders: true,             // case: fetch multiple
//     username: "arjun_agent01",   // case: filter by username
//     // paymentMethod: "card",    // case: filter by method
//     // from: Math.floor(Date.now()/1000) - 7*24*60*60, // last 7 days
//     count: 5,
//   };

//   const result = await fetchRazorpayOrders(params);
//   console.log("✅ Test Fetch Orders Result:", JSON.stringify(result, null, 2));
// }

// // Run only if executed directly
// if (require.main === module) {
//   testFetchOrders();
// }

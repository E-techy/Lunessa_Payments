// utils/admin/fetch_disputes.js

const { PrismaClient } = require("../../generated/customer-service");
const prisma = new PrismaClient();

/**
 * Fetch disputes for admin users.
 *
 * 🔹 Models Used:
 * - Disputes → Stores all disputes raised by users.
 *
 * 🔹 Input:
 * @param {Object} params - Parameters for fetching disputes.
 * @param {string} params.adminRole - Role of the admin ("superAdmin" or "payments" allowed).
 * @param {string|null} [params.username=null] - Username to filter disputes (optional).
 * @param {boolean|null} [params.resolved=null] - Resolution filter (true/false). 
 *                                               Only applies if `username` is provided.
 *
 * 🔹 Behavior:
 * 1. Validates input parameters.
 * 2. Ensures only "superAdmin" or "payments" roles can fetch disputes.
 * 3. If `username` is not provided → Fetches all users' disputes (ignores `resolved` filter).
 * 4. If `username` is provided:
 *    - Fetch disputes only for that username.
 *    - If `resolved` filter is provided → Returns disputes filtered by resolution status.
 *
 * 🔹 Output:
 * @returns {Promise<{success: boolean, data?: Object|Array, error?: string}>}
 *   - success: true → Returns disputes (all or filtered).
 *   - success: false → Returns error reason.
 *
 * 🔹 Example:
 * ```js
 * // Fetch all disputes (admin = superAdmin)
 * const all = await fetchDisputes({ adminRole: "superAdmin" });
 *
 * // Fetch disputes for a specific user
 * const userDisputes = await fetchDisputes({ adminRole: "payments", username: "john_doe" });
 *
 * // Fetch only unresolved disputes for a user
 * const unresolved = await fetchDisputes({
 *   adminRole: "superAdmin",
 *   username: "john_doe",
 *   resolved: false
 * });
 * ```
 */
async function fetchDisputes({ adminRole, username = null, resolved = null }) {
  try {
    // 1. Validate admin role
    if (!adminRole || typeof adminRole !== "string") {
      return { success: false, error: "Invalid input: adminRole must be a non-empty string." };
    }
    if (!["superAdmin", "payments"].includes(adminRole)) {
      return { success: false, error: "Unauthorized: only superAdmin or payments can fetch disputes." };
    }

    // 2. Validate username if provided
    if (username !== null && typeof username !== "string") {
      return { success: false, error: "Invalid input: username must be a string if provided." };
    }

    // 3. Validate resolved if provided
    if (resolved !== null && typeof resolved !== "boolean") {
      return { success: false, error: "Invalid input: resolved must be true, false, or null." };
    }

    // Case A: No username provided → fetch all users' disputes
    if (!username) {
      const allDisputes = await prisma.Disputes.findMany();
      return { success: true, data: allDisputes };
    }

    // Case B: Username provided → fetch disputes for that user
    const userDisputes = await prisma.Disputes.findUnique({
      where: { username },
    });

    if (!userDisputes) {
      return {
        success: false,
        error: `No disputes found for username: ${username}`,
      };
    }

    // Apply resolved filter if provided
    let filteredDisputes = userDisputes.disputes;
    if (resolved !== null) {
      filteredDisputes = filteredDisputes.filter(d => d.resolved === resolved);
    }

    return {
      success: true,
      data: {
        username: userDisputes.username,
        disputes: filteredDisputes,
        createdAt: userDisputes.createdAt,
        updatedAt: userDisputes.updatedAt,
      },
    };
  } catch (error) {
    console.error("❌ Error fetching disputes:", error);
    return { success: false, error: error.message || "Failed to fetch disputes." };
  }
}

module.exports = fetchDisputes;

// utils/get_disputes_by_username.js

const { PrismaClient } = require("../generated/customer-service");
const prisma = new PrismaClient();

/**
 * Fetch all disputes raised by a given user.
 *
 * 🔹 Models Used:
 * - Disputes → Stores all disputes raised by each user.
 *
 * 🔹 Input:
 * @param {string} username - The username whose disputes are to be fetched.
 *
 * 🔹 Behavior:
 * 1. Validates that `username` is a non-empty string.
 * 2. Queries the `Disputes` model for the given username.
 *    - If the user exists → return the entire Disputes document (with disputes array).
 *    - If the user does not exist → return error message.
 *
 * 🔹 Output:
 * @returns {Promise<{ success: boolean, data?: Object, error?: string }>}
 *   - success: true  → Returns the Disputes document with all disputes for the user.
 *   - success: false → Returns error with reason (invalid input, user not found, etc).
 *
 * 🔹 Example:
 * ```js
 * const result = await getDisputesByUsername("john_doe");
 * if (result.success) {
 *   console.log("User disputes:", result.data);
 * } else {
 *   console.error("Error:", result.error);
 * }
 * ```
 */
async function getDisputesByUsername(username) {
  try {
    // 1. Validate input type
    if (!username || typeof username !== "string") {
      return {
        success: false,
        error: "Invalid input: username must be a non-empty string.",
      };
    }

    // 2. Query the Disputes model for the given username
    const userDisputes = await prisma.Disputes.findUnique({
      where: { username },
    });

    if (!userDisputes) {
      return {
        success: false,
        error: `No disputes found for username: ${username}`,
      };
    }

    // 3. Return disputes document
    return {
      success: true,
      data: userDisputes,
    };
  } catch (error) {
    console.error("❌ Error fetching disputes by username:", error);
    return {
      success: false,
      error: error.message || "Failed to fetch disputes.",
    };
  }
}

module.exports = getDisputesByUsername;

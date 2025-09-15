// utils/admin/modify_disputes.js

const { PrismaClient } = require("../../generated/customer-service");
const prisma = new PrismaClient();

/**
 * Admin utility to modify or delete disputes.
 *
 * 🔹 Models Used:
 * - Disputes → Stores all disputes raised by users.
 *
 * 🔹 Inputs:
 * @param {Object} params - Input parameters for modifying disputes.
 * @param {string} params.action - Action to perform: `"modify"` or `"delete"`.
 * @param {string} params.username - Username of the user whose dispute(s) will be modified/deleted.
 * @param {string|null} [params.disputeId=null] - Specific disputeId to modify/delete (ignored if `all`=true).
 * @param {boolean|null} [params.resolved=false] - Resolution status to set (required if action="modify").
 * @param {string|null} [params.resolvedComment=""] - Admin comment for resolution (action="modify").
 * @param {boolean} [params.all=false] - If true, applies the action to all disputes of the username.
 *
 * 🔹 Behavior:
 * 1. Validates all input parameters.
 * 2. Fetches the user's `Disputes` document by `username`.
 * 3. Action = "modify":
 *    - If `all`=true → sets `resolved` and `resolvedComment` for all disputes.
 *    - Else → modifies the specified `disputeId` only.
 * 4. Action = "delete":
 *    - If `all`=true → deletes all disputes of the user.
 *    - Else → deletes the dispute with the given `disputeId`.
 * 5. Updates `updatedAt` timestamp accordingly.
 *
 * 🔹 Output:
 * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
 *   - success: true → Returns updated Disputes document or confirmation of deletion.
 *   - success: false → Returns reason for failure.
 *
 * 🔹 Example Usage:
 * ```js
 * // Modify a single dispute
 * await modifyDispute({
 *   action: "modify",
 *   username: "john_doe",
 *   disputeId: "uuid-123",
 *   resolved: true,
 *   resolvedComment: "Issue resolved"
 * });
 *
 * // Resolve all disputes for a user
 * await modifyDispute({
 *   action: "modify",
 *   username: "john_doe",
 *   resolved: true,
 *   resolvedComment: "All issues resolved",
 *   all: true
 * });
 *
 * // Delete a single dispute
 * await modifyDispute({
 *   action: "delete",
 *   username: "john_doe",
 *   disputeId: "uuid-123"
 * });
 *
 * // Delete all disputes for a user
 * await modifyDispute({
 *   action: "delete",
 *   username: "john_doe",
 *   all: true
 * });
 * ```
 */
async function modifyDispute({
  action,
  username,
  disputeId = null,
  resolved = false,
  resolvedComment = "",
  all = false,
}) {
  try {
    // 1️⃣ Validate input types
    if (!action || !["modify", "delete"].includes(action)) {
      return { success: false, error: 'Invalid input: action must be "modify" or "delete".' };
    }
    if (!username || typeof username !== "string") {
      return { success: false, error: "Invalid input: username must be a non-empty string." };
    }
    if (disputeId !== null && typeof disputeId !== "string") {
      return { success: false, error: "Invalid input: disputeId must be a string if provided." };
    }
    if (typeof resolved !== "boolean") {
      return { success: false, error: "Invalid input: resolved must be a boolean." };
    }
    if (typeof resolvedComment !== "string") {
      return { success: false, error: "Invalid input: resolvedComment must be a string." };
    }
    if (typeof all !== "boolean") {
      return { success: false, error: "Invalid input: all must be a boolean." };
    }

    // 2️⃣ Fetch user's disputes
    const userDisputes = await prisma.Disputes.findUnique({ where: { username } });

    if (!userDisputes) {
      return { success: false, error: `No disputes found for username: ${username}` };
    }

    let updatedDisputes = [...userDisputes.disputes];

    if (action === "modify") {
      if (all) {
        // Modify all disputes
        updatedDisputes = updatedDisputes.map(d => ({
          ...d,
          resolved: resolved,
          resolvedComment: resolvedComment,
          updatedAt: new Date(),
        }));
      } else {
        if (!disputeId) {
          return { success: false, error: "disputeId is required when all=false for modify action." };
        }
        const index = updatedDisputes.findIndex(d => d.disputeId === disputeId);
        if (index === -1) {
          return { success: false, error: `DisputeId ${disputeId} not found for username ${username}.` };
        }
        updatedDisputes[index] = {
          ...updatedDisputes[index],
          resolved,
          resolvedComment,
          updatedAt: new Date(),
        };
      }

      // Update DB
      const result = await prisma.Disputes.update({
        where: { username },
        data: { disputes: updatedDisputes, updatedAt: new Date() },
      });

      return { success: true, data: result };
    }

    if (action === "delete") {
      if (all) {
        // Delete all disputes
        const result = await prisma.Disputes.update({
          where: { username },
          data: { disputes: [], updatedAt: new Date() },
        });
        return { success: true, data: result };
      } else {
        if (!disputeId) {
          return { success: false, error: "disputeId is required when all=false for delete action." };
        }
        const exists = updatedDisputes.some(d => d.disputeId === disputeId);
        if (!exists) {
          return { success: false, error: `DisputeId ${disputeId} not found for username ${username}.` };
        }
        updatedDisputes = updatedDisputes.filter(d => d.disputeId !== disputeId);
        const result = await prisma.Disputes.update({
          where: { username },
          data: { disputes: updatedDisputes, updatedAt: new Date() },
        });
        return { success: true, data: result };
      }
    }

    return { success: false, error: "Unexpected action provided." };
  } catch (error) {
    console.error("❌ Error modifying/deleting disputes:", error);
    return { success: false, error: error.message || "Failed to modify/delete disputes." };
  }
}

module.exports = modifyDispute;

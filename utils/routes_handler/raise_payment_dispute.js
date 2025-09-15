// utils/routes_handler/raise_payment_dispute.js

const express = require("express");
const raisePaymentDispute = require("../raise_payment_dispute");

/**
 * Route handler for raising payment disputes.
 *
 * 🔹 Purpose:
 * - Allows authenticated users to raise disputes against their orders.
 * - Uses the `raisePaymentDispute` utility which:
 *   1. Validates input data types.
 *   2. Confirms username and orderId exist in `UserOrders`.
 *   3. Creates or updates the `Disputes` model with the new dispute.
 *
 * 🔹 Middleware:
 * - Must be protected with `authenticateUser`.
 * - The authenticated username (`req.user.username`) will be used to verify ownership.
 *
 * 🔹 Request Body:
 * @property {string} orderId - The order ID against which dispute is raised.
 * @property {string} disputeComment - The complaint/comment provided by the user.
 *
 * 🔹 Response:
 * - 200 { success: true, data: <DisputesDocument> } → dispute successfully raised
 * - 400 { success: false, error: <reason> } → validation or user/order not found
 * - 500 { success: false, error: "Failed to raise dispute." } → internal server error
 *
 * Example cURL:
 * ```bash
 * curl -X POST http://localhost:3000/raise_payment_dispute \
 *   -H "Authorization: Bearer <JWT_TOKEN>" \
 *   -H "Content-Type: application/json" \
 *   -d '{"orderId":"ORD123","disputeComment":"Payment deducted but order not confirmed"}'
 * ```
 */
async function raisePaymentDisputeHandler(req, res) {
  try {
    const username = req.user.username; // from authenticateUser middleware
    const { orderId, disputeComment } = req.body;

    const result = await raisePaymentDispute({
      username,
      orderId,
      disputeComment,
    });

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("❌ Error in raisePaymentDisputeHandler:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error while raising dispute.",
    });
  }
}

module.exports = raisePaymentDisputeHandler;

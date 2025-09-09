/**
 * @file utils/routes_handler/admin_handle_AI_pricing_data.js
 * @description Express route handler for managing AI model pricing data.
 * Uses the addModifyAIModelPricingData utility to add, modify, or delete models.
 * Ensures only superAdmin role is authorized. Returns clear client-safe responses.
 */

const addModifyAIModelPricingData = require("../admin/add_modify_AI_model_pricing_data");

/**
 * Handle admin requests for AI pricing data management.
 *
 * @async
 * @function adminHandleAIModelPricingData
 * @param {import("express").Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<void>}
 *
 * @example
 * // Inside Express route:
 * app.post("/admin/AI_pricing_data", authenticateAdmin, adminHandleAIModelPricingData);
 */
async function adminHandleAIModelPricingData(req, res) {
  try {
    const { action, modelsData } = req.body;

    if (!action || !modelsData) {
      return res.status(400).json({
        success: false,
        message: "`action` and `modelsData` are required in the request body.",
      });
    }

    const result = await addModifyAIModelPricingData({
      adminRole: req.adminRole,
      action,
      modelsData,
    });

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error || "Failed to process AI model pricing data.",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        action === "add"
          ? "AI models added successfully."
          : action === "modify"
          ? "AI models modified successfully."
          : "AI models deleted successfully.",
      data: result.data,
    });
  } catch (err) {
    console.error("❌ Route error in /admin/AI_pricing_data:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error while managing AI pricing data.",
    });
  }
}

module.exports = adminHandleAIModelPricingData;

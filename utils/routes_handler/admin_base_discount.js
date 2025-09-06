// utils/routes_handler/admin_base_discount.js
const  addBaseDiscountSlab  = require("../admin/add_base_discount_slab");
const  updateBaseDiscountSlab  = require("../admin/update_base_discount_slab");

/**
 * Handle admin Base Discount Slab operations
 *
 * Expects:
 * - req.query.action = "add" | "update"
 * - req.body = { data: { levels: [...], status? } }
 * - adminRole passed from authenticateAdmin middleware
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {string} adminRole - Role of the authenticated admin
 */
async function handleAdminBaseDiscount(req, res, adminRole) {
  try {
    const action = req.query.action;
    const { data, status } = req.body;

    if (!action) {
      return res.status(400).json({ success: false, error: "Missing query parameter: action" });
    }

    let result;

    if (action === "add") {
      result = await addBaseDiscountSlab({ adminRole, data });
    } else if (action === "update") {
      result = await updateBaseDiscountSlab({ adminRole, data, status });
    } else {
      return res.status(400).json({ success: false, error: `Invalid action: ${action}` });
    }

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("❌ Error in handleAdminBaseDiscount:", error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
}

module.exports =  handleAdminBaseDiscount ;

// utils/routes_handler/admin_view_base_discount.js
const getBaseDiscountData = require("../admin/get_base_discount_data");

/**
 * Route Handler → View Base Discount Data
 *
 * ---
 * 🔐 Auth:
 * - Requires `authenticateAdmin` middleware before this handler.
 * - Only roles: superAdmin, payments, edit, delete are allowed.
 *
 * ---
 * 📥 Input:
 * - Uses req.adminRole (set by authenticateAdmin middleware).
 *
 * ---
 * 📤 Output:
 * JSON response:
 *  - { success: true, data: [...] }
 *  - { success: false, error: "reason" }
 */
async function adminViewBaseDiscount(req, res) {
  try {
    const adminRole = req.adminRole;

    if (!adminRole) {
      return res.status(401).json({
        success: false,
        error: "Missing admin role. Authentication required.",
      });
    }

    const result = await getBaseDiscountData(adminRole);

    if (!result.success) {
      return res.status(403).json(result);
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error("❌ Error in adminViewBaseDiscount:", err);
    return res.status(500).json({
      success: false,
      error: "Internal server error while fetching base discount data",
    });
  }
}

module.exports = adminViewBaseDiscount;

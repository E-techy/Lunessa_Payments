/**
 * @file utils/routes_handler/admin_offers.js
 * @description Route handler for admin offer management (create, modify, delete, fetch).
 */

const createNewOffer = require("../admin/create_new_offers");
const modifyOffer = require("../admin/modify_offers");
const deleteOffer = require("../admin/delete_offers");
const getAllOffers = require("../admin/get_all_offers");

/**
 * Handle admin offer operations.
 *
 * 🔹 Uses query param `action` to decide operation:
 *   - `create` → create new offer
 *   - `modify` → modify existing offer
 *   - `delete` → delete offer
 *   - `get`    → fetch all offers
 *
 * 🔹 Requires:
 *   - Authenticated admin (`req.adminRole` set by authenticateAdmin middleware).
 *   - Body data depending on the action.
 *
 * @async
 * @function adminOffersHandler
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
async function adminOffersHandler(req, res) {
  try {
    const action = req.query.action;
    const adminRole = req.adminRole;

    if (!action) {
      return res.status(400).json({
        success: false,
        error: "Missing 'action' query parameter. Must be one of: create, modify, delete, get.",
      });
    }

    let result;

    switch (action) {
      case "create":
        result = await createNewOffer(req.body);
        break;

      case "modify":
        if (!req.body.offerId || !req.body.modificationData) {
          return res.status(400).json({
            success: false,
            error: "Missing required fields: offerId, modificationData",
          });
        }
        result = await modifyOffer({
          adminRole,
          offerId: req.body.offerId,
          modificationData: req.body.modificationData,
        });
        break;

      case "delete":
        if (!req.body.offerId) {
          return res.status(400).json({
            success: false,
            error: "Missing required field: offerId",
          });
        }
        result = await deleteOffer({
          adminRole,
          offerId: req.body.offerId,
        });
        break;

      case "get":
        result = await getAllOffers({ adminRole });
        break;

      default:
        return res.status(400).json({
          success: false,
          error: `Invalid action '${action}'. Must be one of: create, modify, delete, get.`,
        });
    }

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error("❌ Admin Offers Handler Error:", err);
    return res.status(500).json({
      success: false,
      error: "Internal server error while processing admin offers",
    });
  }
}

module.exports = adminOffersHandler;

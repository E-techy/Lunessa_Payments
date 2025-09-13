// utils/routes_handler/admin_get_user_coupons.js
const { PrismaClient } = require("../../generated/customer-service");
const prisma = new PrismaClient();

/**
 * Route handler for fetching coupons allotted to a user by username.
 *
 * Permissions:
 * - Allowed admin roles: "superAdmin", "edit", "delete", "payments"
 *
 * Request:
 * - Method: POST
 * - URL: /admin/get_user_coupons?username=<username>
 * - Auth: authenticateAdmin middleware (JWT verified)
 *
 * Query Params:
 * - username (string) → required, user identifier
 *
 * Response (Success):
 * {
 *   success: true,
 *   data: {
 *     username: "john_doe",
 *     availableCoupons: [...],
 *     offersUsed: [...]
 *   }
 * }
 *
 * Response (Failure):
 * {
 *   success: false,
 *   error: "reason for failure"
 * }
 */
async function adminGetUserCouponsHandler(req, res) {
  try {
    const { adminRole } = req;
    const { username } = req.query;

    // 1. Permission check
    const allowedRoles = ["superAdmin", "edit", "delete", "payments"];
    if (!allowedRoles.includes(adminRole)) {
      return res.status(403).json({
        success: false,
        error: "Forbidden: You do not have permission to access user coupons",
      });
    }

    // 2. Input validation
    if (!username) {
      return res.status(400).json({
        success: false,
        error: "Missing required query parameter: username",
      });
    }

    // 3. Fetch user coupons from DB
    const userCoupons = await prisma.OfferUsage.findUnique({
      where: { username },
    });

    if (!userCoupons) {
      return res.status(404).json({
        success: false,
        error: `No coupon data found for username: ${username}`,
      });
    }

    // 4. Return result
    return res.json({
      success: true,
      data: {
        username: userCoupons.username,
        availableCoupons: userCoupons.availableCoupons || [],
        offersUsed: userCoupons.offersUsed || [],
      },
    });
  } catch (err) {
    console.error("❌ Error in adminGetUserCouponsHandler:", err.message);
    return res.status(500).json({
      success: false,
      error: "Internal server error while fetching user coupons",
    });
  }
}

module.exports = adminGetUserCouponsHandler;

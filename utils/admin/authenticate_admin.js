// utils/admin/authenticate_admin.js
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("../node_modules/.prisma-lunessa"); 
const prisma = new PrismaClient();

/**
 * Middleware to authenticate admin via JWT
 * - Token can come from cookies OR Authorization header
 * - Decodes JWT and verifies username + apiKey from DB
 * - Sets req.username and req.adminRole if valid
 */
async function authenticateAdmin(req, res, next) {
    // 🛡 reset before setting
    req.username = null;
    req.adminRole = null;
  try {

    // 1. Token extraction
    let token = null;

    // from cookie
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // from Authorization header (Bearer <token>)
    if (!token && req.headers.authorization) {
      const parts = req.headers.authorization.split(" ");
      if (parts.length === 2 && parts[0] === "Bearer") {
        token = parts[1];
      }
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "No token provided",
      });
    }

    // 2. Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET_KEY);
    } catch (err) {
      return res.status(401).json({
        success: false,
        error: "Invalid or expired token",
      });
    }

    const { username, apiKey } = decoded;

    if (!username || !apiKey) {
      return res.status(400).json({
        success: false,
        error: "Token payload missing username or apiKey",
      });
    }

    // 3. Verify in DB
    const admin = await prisma.Admin.findUnique({
      where: { username },
    });

    if (!admin || admin.apiKey !== apiKey) {
      return res.status(403).json({
        success: false,
        error: "Unauthorized: username/apiKey mismatch",
      });
    }

    // 4. Set values after validation
    req.username = admin.username;
    req.adminRole = admin.role;

    // 5. Pass response for chaining
    return next();
  } catch (err) {
    console.error("Auth Middleware Error:", err);
    return res.status(500).json({
      success: false,
      error: "Internal server error in authentication",
    });
  }
}

module.exports = authenticateAdmin;

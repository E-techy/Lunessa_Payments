// utils/authenticate_user.js
const jwt = require("jsonwebtoken");

/**
 * Middleware to authenticate requests using JWT
 *
 * - Checks for token in Authorization header (Bearer) or cookies
 * - Verifies the token using secret key
 * - Attaches decoded user payload to req.user
 * - Handles common errors gracefully
 */
function authenticateUser(req, res, next) {
  try {
    // Extract token from Authorization header or cookies
    const authHeader = req.headers["authorization"];
    const token =
      (authHeader && authHeader.startsWith("Bearer ") && authHeader.split(" ")[1]) ||
      (req.cookies && req.cookies.authToken);

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Authentication token required",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Ensure essential fields exist
    if (!decoded || !decoded.username) {
      return res.status(403).json({
        success: false,
        error: "Invalid token payload",
      });
    }

    // Attach user details to request
    req.user = {
      username: decoded.username,
      id: decoded.id || null,
      role: decoded.role || "user",
    };

    // Continue
    next();
  } catch (err) {
    return res.status(403).json({
      success: false,
      error: "Invalid or expired token",
      details: err.message,
    });
  }
}

module.exports = authenticateUser;

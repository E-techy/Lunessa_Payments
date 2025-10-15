/**
 * @fileoverview Utility function to securely generate a JSON Web Token (JWT)
 * containing the user's ID as the primary claim.
 *
 * This token is used for session management and authenticating subsequent API requests.
 */
// NOTE: Install the 'jsonwebtoken' package if you haven't already: npm install jsonwebtoken
const jwt = require('jsonwebtoken');

/**
 * Generates a signed JWT for a given user ID with a specified expiration time.
 *
 * @param {string} userId The unique application-wide user ID to be stored in the JWT payload.
 * @param {string | number} expiry The expiration time for the token (e.g., '1h', '7d', or a timestamp in seconds).
 * @param {string} jwtSecretKey The strong, random secret key used to sign the JWT.
 * @returns {Promise<{success: boolean, data?: string, error?: string}>}
 * A Promise resolving to an object with the status and the generated JWT string.
 */
async function generateUserIdToken(userId, expiry, jwtSecretKey) {
    const clientErrorMessage = "Failed to create authentication token. Please contact support.";

    // --- 1. Input Validation and Sanitization ---
    if (!userId || typeof userId !== 'string' || userId.trim().length === 0) {
        console.error("JWT Generation Error: Invalid or missing userId provided.");
        return { success: false, error: "Invalid user identifier." };
    }

    if (!jwtSecretKey || typeof jwtSecretKey !== 'string' || jwtSecretKey.length < 32) {
        // Log sensitive details only to the server console
        console.error("JWT Generation Error: JWT Secret Key is missing or too short (should be >= 32 characters).");
        return { success: false, error: clientErrorMessage };
    }

    if (!expiry) {
        console.error("JWT Generation Error: Missing expiration time.");
        return { success: false, error: "Missing token expiration." };
    }

    // --- 2. Define JWT Payload ---
    const payload = {
        // Standard claim: Subject (the principal user ID)
        sub: userId, 
        // Custom claim: Application-specific identifier (redundancy/clarity)
        userId: userId, 
    };

    // --- 3. JWT Signing ---
    try {
        const token = jwt.sign(
            payload, 
            jwtSecretKey, 
            { 
                expiresIn: expiry, // Takes standard string formats (e.g., '1h', '7d')
                algorithm: 'HS256', // The standard, recommended signing algorithm
            }
        );

        console.log(`Successfully generated JWT for user ${userId}, expiring in ${expiry}.`);

        // --- 4. Success Output ---
        return {
            success: true,
            data: token,
            error: undefined
        };

    } catch (error) {
        // Handle specific JWT signing errors (e.g., invalid expiry format)
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            console.error(`JWT Signing Error for user ${userId}:`, error.message);
            return {
                success: false,
                error: `Token signing failed: ${error.message}`
            };
        }

        // Log all other unexpected system errors internally
        console.error(`System Error during JWT generation for user ${userId}:`, error);

        // Return the safe client error message
        return {
            success: false,
            error: clientErrorMessage
        };
    }
}

module.exports = generateUserIdToken;

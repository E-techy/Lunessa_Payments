// userAuthentication/utils/extract_info_from_GoogleID.js
/**
 * @fileoverview Utility function for server-side verification and information extraction 
 * from a Google ID Token.
 * * IMPORTANT: This function requires the 'google-auth-library' package to be installed.
 * `npm install google-auth-library`
 */

// Import the OAuth2Client from the official Google authentication library.
// This client handles the secure process of verifying the JWT signature, 
// checking expiration, and ensuring the audience (aud) matches the client ID.
const { OAuth2Client } = require('google-auth-library');

/**
 * Validates a Google ID Token against the specified client ID and extracts
 * the user's information from the token's payload.
 *
 * This is an asynchronous function designed for use in a Node.js backend environment.
 * * @param {string} idToken The Google ID token received from the client (frontend).
 * @param {string} clientId The client ID (audience) corresponding to the application
 * that generated the token (e.g., your web application client ID).
 * @returns {Promise<{success: boolean, data?: {userId: string, email: string, name: string, givenName: string, familyName: string, picture: string, emailVerified: boolean}, error?: string}>}
 * A Promise that resolves to an object containing the status and either 
 * the extracted user data or an error message.
 */
async function extractInfoFromGoogleIDToken(idToken, clientId) {
    if (!idToken || !clientId) {
        return {
            success: false,
            error: 'Missing ID token or client ID for verification.'
        };
    }

    try {
        // 1. Initialize the OAuth2 Client.
        // We initialize the client with the expected client ID.
        const client = new OAuth2Client(clientId);

        // 2. Verify the token. This is the critical security step.
        // The library automatically:
        // - Fetches Google's public keys.
        // - Verifies the token's signature.
        // - Checks the token's expiration (exp).
        // - Ensures the 'aud' (audience) claim matches the provided clientId.
        const ticket = await client.verifyIdToken({
            idToken: idToken,
            audience: clientId,
        });

        // 3. Extract the verified payload.
        const payload = ticket.getPayload();

        // Check if the token payload exists and is valid
        if (!payload) {
             return { success: false, error: 'Token verification failed: Payload is missing.' };
        }

        // 4. Construct the structured user data object from the claims.
        const userData = {
            // 'sub' is the unique Google User ID (subject)
            userId: payload.sub, 
            email: payload.email,
            name: payload.name,
            givenName: payload.given_name,
            familyName: payload.family_name,
            picture: payload.picture,
            // 'email_verified' is a boolean in the JWT payload
            emailVerified: payload.email_verified === true 
        };

        // 5. Return success with the extracted data.
        return {
            success: true,
            data: userData
        };

    } catch (error) {
        // Handle all possible errors during verification (e.g., expired token, invalid signature, network error)
        console.error('Google ID Token verification failed:', error.message);
        return {
            success: false,
            error: `ID Token verification failed: ${error.message}`
        };
    }
}

// Export the function for use in other backend modules.
module.exports = extractInfoFromGoogleIDToken;

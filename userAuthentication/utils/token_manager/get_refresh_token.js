// userAuthentication/utils/token_manager/get_refresh_token.js
/**
 * @fileoverview Utility to retrieve refresh token data from ScyllaDB.
 * Used for token validation, displaying active sessions, and managing device sign-outs.
 */
// Import the ScyllaDB client manager
const { getScyllaClient, DEFAULT_CONTACT_POINTS } = require('../../database/scyllaDB/scylla_connection_pool.js');

// --- Configuration ---
const KEYSPACE = 'auth_keyspace';
const TABLE_NAME = 'refresh_tokens';

/**
 * Retrieves refresh token records from ScyllaDB based on the provided criteria.
 *
 * @param {object} criteria Object containing retrieval conditions.
 * @param {string} [criteria.token] The specific refresh token string (primary lookup method).
 * @param {string} [criteria.userId] The ID of the user whose tokens should be fetched.
 * @param {string} [criteria.deviceId] The ID of the specific device (used in conjunction with userId).
 * @param {string | string[]} [contactPoints=DEFAULT_CONTACT_POINTS] ScyllaDB connection points.
 * @returns {Promise<{success: boolean, tokens: Array<object>, error?: string, message?: string}>}
 */
async function getRefreshToken(criteria, contactPoints = DEFAULT_CONTACT_POINTS) {
    const clientErrorMessage = "Failed to retrieve refresh token(s) due to a database error.";
    const { token, userId, deviceId } = criteria;
    
    if (!token && !userId) {
        return { success: false, tokens: [], error: "Must provide a 'token' or a 'userId' for retrieval." };
    }

    try {
        // 1. Get the shared connection client
        const client = getScyllaClient(contactPoints, KEYSPACE);
        
        let query;
        let params = [];

        // --- Retrieval Strategy 1: Lookup by Primary Key (Token) ---
        // This is the fastest, most common operation (used during token validation).
        if (token) {
            query = `SELECT token, user_id, device_id, device_name, created_at FROM ${TABLE_NAME} WHERE token = ?`;
            params = [token];
            
        } 
        
        // --- Retrieval Strategy 2: Lookup by User ID and Device ID (Specific Session) ---
        // Used to find a token associated with a specific device/user pair.
        else if (userId && deviceId) {
            // NOTE: Requires ALLOW FILTERING as 'device_id' is not a primary key or indexed column
            // (Only 'user_id' is indexed, but we filter on device_id too).
            query = `SELECT token, user_id, device_id, device_name, created_at FROM ${TABLE_NAME} WHERE user_id = ? AND device_id = ? ALLOW FILTERING`;
            params = [userId, deviceId];
            
        }

        // --- Retrieval Strategy 3: Lookup by User ID Only (All Active Sessions) ---
        // Used to display the list of active devices for a user.
        else if (userId) {
            // Uses the secondary index on user_id, which is fast.
            query = `SELECT token, user_id, device_id, device_name, created_at FROM ${TABLE_NAME} WHERE user_id = ?`;
            params = [userId];
        }

        // Execute the query
        const results = await client.execute(query, params, { prepare: true });
        
        // Convert the ScyllaDB Row objects to standard JavaScript objects
        const tokens = results.rows.map(row => ({
            token: row.token,
            userId: row.user_id,
            deviceId: row.device_id,
            deviceName: row.device_name,
            createdAt: row.created_at,
        }));
        
        return { success: true, tokens };

    } catch (error) {
        console.error("ScyllaDB Error in getRefreshToken:", error);
        return { success: false, tokens: [], error: clientErrorMessage };
    }
}

module.exports = getRefreshToken;

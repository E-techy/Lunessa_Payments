// userAuthentication/utils/token_manager/remove_refresh_token.js
/**
 * @fileoverview Utility to remove one or all refresh tokens from ScyllaDB 
 * based on either the token string, the user ID, or the device ID.
 */
// Import the ScyllaDB client manager
const { getScyllaClient, DEFAULT_CONTACT_POINTS } = require('../../database/scyllaDB/scylla_connection_pool.js');

// --- Configuration ---
const KEYSPACE = 'auth_keyspace';
const TABLE_NAME = 'refresh_tokens';

/**
 * Removes refresh tokens from ScyllaDB based on the provided criteria (token, userId, and/or deviceId).
 * NOTE: This assumes the 'refresh_tokens' table now includes 'device_id' and 'device_name' text columns.
 *
 * @param {object} criteria Object containing removal conditions.
 * @param {string} [criteria.token] The specific refresh token string to remove.
 * @param {string} [criteria.userId] The ID of the user whose tokens should be removed.
 * @param {string} [criteria.deviceId] The ID of the specific device to remove.
 * @param {string} [criteria.deviceName] The user-friendly name of the device (optional, for logging/display only).
 * @param {string | string[]} [contactPoints=DEFAULT_CONTACT_POINTS] ScyllaDB connection points.
 * @returns {Promise<{success: boolean, removedCount: number, error?: string, message?: string}>}
 */
async function removeRefreshToken(criteria, contactPoints = DEFAULT_CONTACT_POINTS) {
    const clientErrorMessage = "Failed to remove refresh token due to a database error.";
    // UPDATED: Include deviceName in destructuring
    const { token, userId, deviceId, deviceName } = criteria;
    
    if (!token && !userId) {
        return { success: false, removedCount: 0, error: "Must provide a 'token' or a 'userId' for removal." };
    }

    try {
        // 1. Get the shared connection client (which is already configured)
        const client = getScyllaClient(contactPoints, KEYSPACE);
        
        let query;
        let params = [];
        let executionResult;

        // --- Strategy 1: Delete by Primary Key (Token) ---
        // This is the fastest operation, so we prioritize it if the token is known.
        if (token) {
            // Note: We use the single token as the primary key. If a userId/deviceId is 
            // also provided, we still use the token as the primary lookup.
            query = `DELETE FROM ${TABLE_NAME} WHERE token = ?`;
            params = [token];
            
            // Execute the single deletion
            executionResult = await client.execute(query, params, { prepare: true });
            
            // In ScyllaDB/Cassandra, DELETE returns 0 rows, so we assume success if no error is thrown
            return { success: true, removedCount: 1, message: `Token successfully removed: ${token}` };
        } 
        
        // --- Strategy 2: Delete by User ID and Device ID (Logout Specific Device) ---
        // Prioritized over full user removal. userId must be present here due to input validation.
        if (userId && deviceId) {
            // Querying by user_id (indexed) and device_id (non-primary key) to find tokens for this specific session.
            // We use ALLOW FILTERING because we are filtering on two non-primary key columns.
            const selectQuery = `SELECT token FROM ${TABLE_NAME} WHERE user_id = ? AND device_id = ? ALLOW FILTERING`;
            const selectParams = [userId, deviceId];
            
            const results = await client.execute(selectQuery, selectParams, { prepare: true });
            const tokensToDelete = results.rows.map(row => row.token);
            
            if (tokensToDelete.length === 0) {
                const message = deviceName 
                    ? `No tokens found for user ${userId} on device: ${deviceName}.`
                    : `No tokens found for user ${userId} on device ID ${deviceId}.`;
                return { success: true, removedCount: 0, message };
            }

            // Using BATCH for atomic removal of multiple primary keys is the most efficient way here.
            const batchQueries = tokensToDelete.map(t => ({
                query: `DELETE FROM ${TABLE_NAME} WHERE token = ?`,
                params: [t]
            }));

            await client.batch(batchQueries, { prepare: true });
            
            const message = deviceName 
                ? `Successfully removed ${tokensToDelete.length} token(s) for device: ${deviceName} of user ${userId}.`
                : `Successfully removed ${tokensToDelete.length} token(s) for device ID ${deviceId} of user ${userId}.`;
            return { success: true, removedCount: tokensToDelete.length, message };
        }

        // --- Strategy 3: Delete All Tokens by User ID (Logout All Devices) ---
        // This handles the "log out all devices" scenario when only userId is provided.
        if (userId) { // This block runs only if Strategy 1 and 2 (userId && deviceId) were skipped.
            // Querying by user_id (indexed) to get all tokens:
            const selectQuery = `SELECT token FROM ${TABLE_NAME} WHERE user_id = ?`;
            const selectParams = [userId];
            
            const results = await client.execute(selectQuery, selectParams, { prepare: true });
            const tokensToDelete = results.rows.map(row => row.token);
            
            if (tokensToDelete.length === 0) {
                return { success: true, removedCount: 0, message: `No tokens found for user ${userId}.` };
            }

            // Using BATCH for atomic removal of multiple primary keys is the most efficient way here.
            const batchQueries = tokensToDelete.map(t => ({
                query: `DELETE FROM ${TABLE_NAME} WHERE token = ?`,
                params: [t]
            }));

            await client.batch(batchQueries, { prepare: true });

            return { success: true, removedCount: tokensToDelete.length, message: `Successfully removed ${tokensToDelete.length} tokens for user ${userId} (all devices).` };
        }

    } catch (error) {
        console.error("ScyllaDB Error in removeRefreshToken:", error);
        return { success: false, removedCount: 0, error: clientErrorMessage };
    }
}

module.exports = removeRefreshToken;

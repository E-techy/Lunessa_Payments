/**
 * @fileoverview Utility to fetch a single refresh token record from ScyllaDB
 * using the refresh token string (Primary Key lookup).
 */
const cassandra = require('cassandra-driver');

// Default configuration values
const DEFAULT_KEYSPACE = 'auth_keyspace';
const DEFAULT_TABLE_NAME = 'refresh_tokens';

/**
 * Fetches a single refresh token record from ScyllaDB using the token string.
 * This is an optimized query as 'token' is the Primary Key.
 *
 * @param {cassandra.Client} client The initialized ScyllaDB client/connection pool.
 * @param {string} refreshToken The refresh token string to look up.
 * @param {string} [keyspace=DEFAULT_KEYSPACE] The keyspace where the token is stored.
 * @param {string} [tableName=DEFAULT_TABLE_NAME] The table name where the token is stored.
 * @returns {Promise<{success: boolean, data?: object, error?: string}>}
 * Returns { success: true, data: { ...rawRowData } } if found,
 * or { success: true, data: null } if not found (e.g., expired/deleted),
 * or { success: false, error: '...' } on database error.
 */
async function getRefreshTokenData(
    client,
    refreshToken,
    keyspace = DEFAULT_KEYSPACE,
    tableName = DEFAULT_TABLE_NAME
) {
    const clientErrorMessage = "Failed to retrieve refresh token due to a database error.";

    if (!client || !client.connected) {
        console.error("ScyllaDB Error: Client is not connected.");
        return { success: false, error: "ScyllaDB client is not connected." };
    }
    if (!refreshToken) {
        return { success: false, error: "Missing required 'refreshToken' for lookup." };
    }

    try {
        // 1. Define the lookup query using the primary key (fastest lookup)
        const SELECT_QUERY = `
            SELECT token, user_id, device_id, device_name, created_at 
            FROM ${keyspace}.${tableName} 
            WHERE token = ?;
        `;
        const params = [refreshToken];

        // 2. Execute the query
        const results = await client.execute(SELECT_QUERY, params, { prepare: true });
        
        // 3. Handle case where token is not found (e.g., token expired or manually revoked)
        if (results.rows.length === 0) {
            return { success: true, data: null };
        }

        // 4. Token found: Return the raw row object directly for efficiency.
        // The calling function is responsible for processing fields like 'user_id' -> 'userId'.
        const rawRow = results.rows[0];

        return { success: true, data: rawRow };

    } catch (error) {
        console.error("ScyllaDB Error in getRefreshTokenData:", error);
        // Return a generic error message and log the detailed error internally
        return { success: false, error: clientErrorMessage };
    }
}

module.exports = getRefreshTokenData;

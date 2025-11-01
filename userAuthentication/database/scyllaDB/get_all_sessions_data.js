/**
 * @fileoverview Utility to fetch all refresh token records associated with a specific user ID.
 * This function uses the 'user_id' secondary index to retrieve all active sessions
 * (tokens) for display and session management (e.g., 'View Active Logins').
 */
const cassandra = require('cassandra-driver');

// Default configuration values (matches the setup in other token utilities)
const DEFAULT_KEYSPACE = 'auth_keyspace';
const DEFAULT_TABLE_NAME = 'refresh_tokens';

/**
 * Fetches all active refresh token sessions for a given user ID.
 * Since 'user_id' is a secondary index, this operation is slightly slower than 
 * the primary key lookup but necessary for session listings.
 *
 * @param {cassandra.Client} client The initialized ScyllaDB client/connection pool.
 * @param {string} userId The unique ID of the user whose sessions are to be retrieved.
 * @param {string} [keyspace=DEFAULT_KEYSPACE] The keyspace where the token is stored.
 * @param {string} [tableName=DEFAULT_TABLE_NAME] The table name where the token is stored.
 * @returns {Promise<{success: boolean, data?: Array<object>, error?: string}>}
 * Returns an array of raw row objects if sessions are found.
 */
async function getAllSessionsData(
    client,
    userId,
    keyspace = DEFAULT_KEYSPACE,
    tableName = DEFAULT_TABLE_NAME
) {
    const clientErrorMessage = "Failed to retrieve user sessions due to a database error.";

    if (!client || !client.connected) {
        console.error("ScyllaDB Error: Client is not connected.");
        return { success: false, error: "ScyllaDB client is not connected." };
    }
    if (!userId) {
        return { success: false, error: "Missing required 'userId' for session lookup." };
    }

    try {
        // 1. Define the lookup query using the user_id (secondary index)
        const SELECT_QUERY = `
            SELECT token, user_id, device_id, device_name, created_at 
            FROM ${keyspace}.${tableName} 
            WHERE user_id = ?;
        `;
        const params = [userId];

        // 2. Execute the query
        const results = await client.execute(SELECT_QUERY, params, { prepare: true });
        
        // 3. Return the array of raw row objects. If no sessions are found, results.rows will be [].
        // We return the raw objects for performance, as agreed.
        return { success: true, data: results.rows };

    } catch (error) {
        console.error("ScyllaDB Error in getAllSessionsData:", error);
        // Return a generic error message and log the detailed error internally
        return { success: false, error: clientErrorMessage };
    }
}

module.exports = getAllSessionsData;

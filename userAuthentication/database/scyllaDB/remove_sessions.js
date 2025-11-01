/**
 * @fileoverview Utility to remove one or multiple refresh token sessions from ScyllaDB.
 * Supports removal by a specific list of tokens (Primary Key) or removal of all 
 * sessions belonging to a user (via Secondary Index lookup + BATCH DELETE).
 */
const cassandra = require('cassandra-driver');

// Default configuration values (matches the setup in other token utilities)
const DEFAULT_KEYSPACE = 'auth_keyspace';
const DEFAULT_TABLE_NAME = 'refresh_tokens';

/**
 * Removes one or more sessions from the refresh_tokens table.
 * * @param {cassandra.Client} client The initialized ScyllaDB client/connection pool.
 * @param {object} options Options object containing criteria for removal.
 * @param {string} [options.userId] The user ID whose *all* sessions should be removed 
 * (used for "Sign Out All Devices").
 * @param {string[]} [options.tokenList] An array of specific token strings to remove 
 * (used for selective session removal).
 * @param {string} [options.keyspace=DEFAULT_KEYSPACE] The keyspace where the token is stored.
 * @param {string} [options.tableName=DEFAULT_TABLE_NAME] The table name where the token is stored.
 * @returns {Promise<{success: boolean, count?: number, error?: string}>}
 * Returns the count of tokens deleted on success.
 */
async function removeSessions(
    client,
    { userId, tokenList, keyspace = DEFAULT_KEYSPACE, tableName = DEFAULT_TABLE_NAME }
) {
    const clientErrorMessage = "Failed to remove sessions due to a database error.";

    if (!client || !client.connected) {
        console.error("ScyllaDB Error: Client is not connected.");
        return { success: false, error: "ScyllaDB client is not connected." };
    }

    // 1. Determine the list of tokens to delete based on input
    let tokensToDelete = [];
    let removalType = 'Specific Tokens';

    if (tokenList && tokenList.length > 0) {
        // Scenario A: Tokens provided directly (fastest, uses Primary Key lookup)
        tokensToDelete = tokenList;
    } else if (userId) {
        // Scenario B: Log out all devices (required two-step process)
        removalType = 'All User Sessions';
        
        try {
            // Step 1: SELECT all Primary Keys (tokens) associated with the userId
            const SELECT_QUERY = `SELECT token FROM ${keyspace}.${tableName} WHERE user_id = ?;`;
            const selectResults = await client.execute(SELECT_QUERY, [userId], { prepare: true });
            
            tokensToDelete = selectResults.rows.map(row => row.token);

            if (tokensToDelete.length === 0) {
                return { success: true, count: 0, message: "No sessions found to remove." };
            }

        } catch (error) {
            // Log the SELECT error specifically
            console.error("ScyllaDB Error in removeSessions (SELECT phase):", error);
            return { success: false, error: clientErrorMessage };
        }
    } else {
        return { success: false, error: "Must provide either 'tokenList' or 'userId' for removal." };
    }

    // 2. Prepare the BATCH query (DELETE by Primary Key)
    const queries = tokensToDelete.map(token => ({
        query: `DELETE FROM ${keyspace}.${tableName} WHERE token = ?;`,
        params: [token]
    }));

    // 3. Execute BATCH
    try {
        await client.batch(queries, { prepare: true });
        
        console.log(`Successfully executed batch removal (${removalType}). Count: ${tokensToDelete.length}`);
        
        return { success: true, count: tokensToDelete.length };
        
    } catch (error) {
        console.error("ScyllaDB Error in removeSessions (BATCH DELETE phase):", error);
        return { success: false, error: clientErrorMessage };
    }
}

module.exports = removeSessions;

/**
 * @fileoverview Utility for administrator to fetch user refresh token data with search
 * and cursor-based pagination. This is used for auditing and security investigations.
 */
const cassandra = require('cassandra-driver');

// Default configuration values
const DEFAULT_KEYSPACE = 'auth_keyspace';
const DEFAULT_TABLE_NAME = 'refresh_tokens';
const DEFAULT_PAGE_SIZE = 50; // A reasonable default page size for admin UI

/**
 * Fetches refresh token data for administrative review, supporting filtering by 
 * token ID (fastest) or User ID, and implementing cursor-based pagination.
 * * NOTE ON FILTERING: Filtering is limited to indexed columns (token, user_id) 
 * to maintain ScyllaDB performance. Timeframe filtering should be done 
 * client-side after fetching results via user_id.
 *
 * @param {cassandra.Client} client The initialized ScyllaDB client/connection pool.
 * @param {object} options Options object containing search criteria and pagination.
 * @param {string} [options.token] Specific refresh token string (Primary Key) to look up.
 * @param {string} [options.userId] User ID to retrieve all associated sessions (Indexed column).
 * @param {number} [options.pageSize=DEFAULT_PAGE_SIZE] Maximum number of rows to return.
 * @param {string} [options.pagingState] The base64-encoded paging state token from a previous query.
 * @param {string} [options.keyspace=DEFAULT_KEYSPACE] The keyspace where the token is stored.
 * @param {string} [options.tableName=DEFAULT_TABLE_NAME] The table name where the token is stored.
 * @returns {Promise<{success: boolean, data?: Array<object>, pagingState?: string, error?: string}>}
 */
async function getUsersRefreshTokenData(
    client,
    {
        token,
        userId,
        pageSize = DEFAULT_PAGE_SIZE,
        pagingState,
        keyspace = DEFAULT_KEYSPACE,
        tableName = DEFAULT_TABLE_NAME
    }
) {
    const clientErrorMessage = "Admin token lookup failed due to a database error.";

    if (!client || !client.connected) {
        console.error("ScyllaDB Error: Client is not connected.");
        return { success: false, error: "ScyllaDB client is not connected." };
    }

    let SELECT_QUERY;
    let params = [];
    
    // --- Determine Query Strategy (Fastest first) ---
    if (token) {
        // Strategy 1: Primary Key Lookup (Fastest, O(1))
        SELECT_QUERY = `
            SELECT token, user_id, device_id, device_name, created_at 
            FROM ${keyspace}.${tableName} 
            WHERE token = ?;
        `;
        params = [token];
    } else if (userId) {
        // Strategy 2: Secondary Index Lookup by User ID
        SELECT_QUERY = `
            SELECT token, user_id, device_id, device_name, created_at 
            FROM ${keyspace}.${tableName} 
            WHERE user_id = ?;
        `;
        params = [userId];
    } else {
        // Strategy 3: Scan All Tokens (Used for full audit, but relies heavily on pagination)
        SELECT_QUERY = `
            SELECT token, user_id, device_id, device_name, created_at 
            FROM ${keyspace}.${tableName};
        `;
        params = [];
    }

    // --- Execute Query with Pagination ---
    try {
        const options = {
            prepare: true,
            fetchSize: pageSize, // Sets the row limit for the request
        };

        if (pagingState) {
            options.pageState = Buffer.from(pagingState, 'base64');
        }

        const results = await client.execute(SELECT_QUERY, params, options);

        // The driver provides the next page state as a Buffer; we convert it to base64 string
        const nextPagingState = results.pageState ? results.pageState.toString('base64') : null;

        return {
            success: true,
            data: results.rows, // Raw row objects returned for efficiency
            pagingState: nextPagingState 
        };

    } catch (error) {
        console.error("ScyllaDB Error in getUsersRefreshTokenData:", error);
        return { success: false, error: clientErrorMessage };
    }
}

module.exports = getUsersRefreshTokenData;

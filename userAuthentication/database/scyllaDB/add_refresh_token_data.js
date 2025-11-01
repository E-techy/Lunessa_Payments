/**
 * @fileoverview Utility to add a new refresh token session to ScyllaDB.
 * Each refresh token represents a unique device session and is stored as a new row.
 * The token's lifespan is managed by ScyllaDB's native TTL (Time-To-Live).
 */
const cassandra = require('cassandra-driver');

// Default TTL (30 days) if not provided by the calling function.
const DEFAULT_TTL_SECONDS = 30 * 24 * 60 * 60; 

/**
 * Ensures the necessary keyspace and table exist in ScyllaDB.
 * The setup queries are dynamically constructed using the provided keyspace and table name.
 * * @param {cassandra.Client} client The connected ScyllaDB client.
 * @param {string} keyspace The name of the keyspace to use.
 * @param {string} tableName The name of the table to use.
 */
async function ensureSchema(client, keyspace, tableName) {
    // Queries are defined inside the function to use dynamic variables
    const CREATE_KEYSPACE_QUERY = `
        CREATE KEYSPACE IF NOT EXISTS ${keyspace} WITH replication = {
            'class': 'SimpleStrategy', 
            'replication_factor': '1'
        };
    `;
    const CREATE_TABLE_QUERY = `
        CREATE TABLE IF NOT EXISTS ${keyspace}.${tableName} (
            token text PRIMARY KEY,
            user_id text,
            device_id text,
            device_name text,
            created_at timestamp
        );
    `;
    const CREATE_INDEX_QUERY = `
        CREATE INDEX IF NOT EXISTS on ${keyspace}.${tableName} (user_id);
    `;
    
    await client.execute(CREATE_KEYSPACE_QUERY);
    await client.execute(`USE ${keyspace};`); 
    await client.execute(CREATE_TABLE_QUERY);
    await client.execute(CREATE_INDEX_QUERY);
}

/**
 * Inserts a new refresh token row into ScyllaDB with TTL set.
 * NOTE: The action is always INSERT, as a new token means a new session.
 * * @param {cassandra.Client} client The initialized ScyllaDB client/connection pool.
 * @param {string} userId The unique user ID.
 * @param {string} refreshToken The generated refresh token string (Primary Key).
 * @param {string} deviceId The unique identifier for the device (UUID).
 * @param {string} deviceName The user-friendly name for the device (e.g., "Chrome on Windows").
 * @param {number} [ttlSeconds=DEFAULT_TTL_SECONDS] The Time-To-Live for the token.
 * @param {string} [keyspace='auth_keyspace'] The keyspace to store the token in.
 * @param {string} [tableName='refresh_tokens'] The table name to store the token in.
 * @returns {Promise<{success: boolean, error?: string}>}
 */
async function addRefreshTokenData(
    client, 
    userId, 
    refreshToken, 
    deviceId, 
    deviceName, 
    ttlSeconds = DEFAULT_TTL_SECONDS,
    keyspace = 'auth_keyspace',
    tableName = 'refresh_tokens'
) {
    const clientErrorMessage = "Failed to store refresh token due to a database error.";

    if (!client || !client.connected) {
        console.error("ScyllaDB Error: Client is not connected.");
        return { success: false, error: clientErrorMessage };
    }
    if (!userId || !refreshToken || !deviceId) {
        return { success: false, error: "Missing required userId, refreshToken, or deviceId." };
    }
    
    const nameToStore = deviceName || 'Unknown Device';

    try {
        // 1. Ensure the required schema is present
        await ensureSchema(client, keyspace, tableName);
        
        // 2. Define the insert query with TTL
        const INSERT_QUERY = `
            INSERT INTO ${keyspace}.${tableName} (token, user_id, device_id, device_name, created_at) 
            VALUES (?, ?, ?, ?, toTimestamp(now())) 
            USING TTL ?;
        `;
        // TTL is passed as a parameter to the query
        const params = [refreshToken, userId, deviceId, nameToStore, ttlSeconds];
        
        // 3. Execute the query
        await client.execute(INSERT_QUERY, params, { prepare: true });

        console.log(`Successfully inserted new refresh token for user ${userId} on device: ${nameToStore}. TTL: ${ttlSeconds}s. Keyspace: ${keyspace}`);

        return { success: true };

    } catch (error) {
        console.error("ScyllaDB Error in addRefreshTokenData:", error);
        return { success: false, error: clientErrorMessage };
    }
}

module.exports = addRefreshTokenData;

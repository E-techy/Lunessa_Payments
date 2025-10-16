// userAuthentication/utils/token_manager/add_refresh_token.js
/**
 * @fileoverview Utility to add a refresh token to ScyllaDB, which acts as the 
 * persistent store for long-lived session tokens.
 *
 * Uses ScyllaDB's TTL feature for automatic token expiration.
 */
// Import the ScyllaDB client manager
const { getScyllaClient, DEFAULT_CONTACT_POINTS } = require('../../database/scyllaDB/scylla_connection_pool.js');

// --- Configuration ---
const KEYSPACE = 'auth_keyspace';
const TABLE_NAME = 'refresh_tokens';

// The TTL (Time-To-Live) for the token in seconds. 
// Set this to match your desired refresh token lifetime (e.g., 30 days).
const TOKEN_TTL_SECONDS = 30 * 24 * 60 * 60; 

// --- Setup Queries ---
const CREATE_KEYSPACE_QUERY = `
    CREATE KEYSPACE IF NOT EXISTS ${KEYSPACE} WITH replication = {
        'class': 'SimpleStrategy', 
        'replication_factor': '1'
    };
`;
// UPDATED: Added device_name column
const CREATE_TABLE_QUERY = `
    CREATE TABLE IF NOT EXISTS ${KEYSPACE}.${TABLE_NAME} (
        token text PRIMARY KEY,
        user_id text,
        device_id text,
        device_name text,
        created_at timestamp
    );
`;
// Create a secondary index on userId for fast lookups by user (optional, but recommended)
const CREATE_INDEX_QUERY = `
    CREATE INDEX IF NOT EXISTS on ${KEYSPACE}.${TABLE_NAME} (user_id);
`;

/**
 * Ensures the necessary keyspace and table exist in ScyllaDB.
 * @param {cassandra.Client} client The connected ScyllaDB client.
 */
async function ensureSchema(client) {
    await client.execute(CREATE_KEYSPACE_QUERY);
    // Re-initialize client to connect to the new keyspace (or just explicitly use it)
    await client.execute(`USE ${KEYSPACE};`); 
    await client.execute(CREATE_TABLE_QUERY);
    await client.execute(CREATE_INDEX_QUERY);
    console.log(`ScyllaDB schema for '${KEYSPACE}.${TABLE_NAME}' ensured.`);
}

/**
 * Adds a new refresh token to ScyllaDB with a Time-To-Live (TTL).
 *
 * @param {string} userId The unique ID of the user.
 * @param {string} refreshToken The generated refresh token string.
 * @param {string} deviceId The unique identifier for the device (UUID).
 * @param {string} deviceName The user-friendly name for the device (e.g., "Chrome on Windows").
 * @param {string | string[]} [contactPoints=DEFAULT_CONTACT_POINTS] ScyllaDB connection points.
 * @returns {Promise<{success: boolean, error?: string}>}
 */
async function addRefreshToken(userId, refreshToken, deviceId, deviceName, contactPoints = DEFAULT_CONTACT_POINTS) {
    const clientErrorMessage = "Failed to store refresh token due to a database error.";

    if (!userId || !refreshToken || !deviceId) {
        return { success: false, error: "Missing required userId, refreshToken, or deviceId." };
    }
    
    // Ensure deviceName has a value, even if generic
    const nameToStore = deviceName || 'Unknown Device';

    try {
        // 1. Get the shared connection client
        const client = getScyllaClient(contactPoints);

        // 2. Ensure the required schema is present (only runs once after first connect)
        await ensureSchema(client);
        
        // 3. Define the insert query with TTL
        // UPDATED: Included device_id and device_name in the INSERT query
        const INSERT_QUERY = `
            INSERT INTO ${KEYSPACE}.${TABLE_NAME} (token, user_id, device_id, device_name, created_at) 
            VALUES (?, ?, ?, ?, toTimestamp(now())) 
            USING TTL ${TOKEN_TTL_SECONDS};
        `;
        const params = [refreshToken, userId, deviceId, nameToStore];
        
        // 4. Execute the query
        await client.execute(INSERT_QUERY, params, { prepare: true });

        console.log(`Successfully added refresh token for user ${userId} on device: ${nameToStore}. Expires in ${TOKEN_TTL_SECONDS} seconds.`);

        return { success: true };

    } catch (error) {
        console.error("ScyllaDB Error in addRefreshToken:", error);
        return { success: false, error: clientErrorMessage };
    }
}

module.exports = addRefreshToken;

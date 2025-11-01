/**
 * @fileoverview Utility for administrators to remove specific user refresh token sessions.
 * This function uses a highly optimized two-phase (BATCH DELETE + SELECT verification) 
 * approach to achieve high-speed removal while still providing a detailed report 
 * of success and failure for each token. It includes a single retry attempt for 
 * any token verified as remaining after the initial BATCH operation.
 */
const cassandra = require('cassandra-driver');

// Default configuration values
const DEFAULT_KEYSPACE = 'auth_keyspace';
const DEFAULT_TABLE_NAME = 'refresh_tokens';

/**
 * Removes a list of specific refresh token sessions from the database using a 
 * BATCH operation for speed, followed by a SELECT query for verification.
 * * @param {cassandra.Client} client The initialized ScyllaDB client/connection pool.
 * @param {object} options Options object containing criteria for removal.
 * @param {string[]} options.tokenList An array of specific token strings to remove.
 * @param {string} [options.keyspace=DEFAULT_KEYSPACE] The keyspace where the token is stored.
 * @param {string} [options.tableName=DEFAULT_TABLE_NAME] The table name where the token is stored.
 * @returns {Promise<{
 * success: boolean, 
 * successfulTokens: string[], 
 * failedTokens: { token: string, reason: string }[],
 * error?: string
 * }>}
 * Returns lists of tokens that were successfully deleted and those that failed.
 */
async function removeUsersRefreshTokenData(
    client,
    { tokenList, keyspace = DEFAULT_KEYSPACE, tableName = DEFAULT_TABLE_NAME }
) {
    if (!client || !client.connected) {
        console.error("ScyllaDB Error: Client is not connected.");
        return { 
            success: false, 
            successfulTokens: [], 
            failedTokens: [], 
            error: "ScyllaDB client is not connected." 
        };
    }
    
    // 1. Validate Input
    if (!tokenList || !Array.isArray(tokenList) || tokenList.length === 0) {
        return { 
            success: false, 
            successfulTokens: [], 
            failedTokens: [], 
            error: "An array of 'tokenList' containing at least one token is required for removal." 
        };
    }

    const totalCount = tokenList.length;
    const clientErrorMessage = "Failed to remove tokens due to a database error.";
    
    // --- Phase 1: BATCH DELETE (Speed) ---

    // Prepare the BATCH query (DELETE by Primary Key)
    const deleteQueries = tokenList.map(token => ({
        query: `DELETE FROM ${keyspace}.${tableName} WHERE token = ?;`,
        params: [token]
    }));

    try {
        // Execute the BATCH. This is non-atomic but extremely fast for high-volume deletion.
        await client.batch(deleteQueries, { prepare: true });
        
        console.log(`Admin BATCH DELETE executed for ${totalCount} tokens.`);
        
    } catch (error) {
        // A failure here means the BATCH network request failed, and we can't reliably trust 
        // the state of any deletion. We must skip verification and report a high-level error.
        console.error("ScyllaDB Critical Error: BATCH DELETE failed.", error);
        return { 
            success: false, 
            successfulTokens: [], 
            failedTokens: tokenList.map(token => ({ token, reason: "BATCH deletion failed due to network/server error. Status unverified." })), 
            error: clientErrorMessage 
        };
    }

    // --- Phase 2: SELECT Verification & RETRY (Reliability) ---
    
    // Use the array of tokens to check which ones are still present.
    // The driver safely prepares the correct number of placeholders for the IN clause.
    const SELECT_QUERY = `
        SELECT token FROM ${keyspace}.${tableName} 
        WHERE token IN (${tokenList.map(() => '?').join(', ')});
    `;
    const DELETE_QUERY = `DELETE FROM ${keyspace}.${tableName} WHERE token = ?;`;

    try {
        const results = await client.execute(SELECT_QUERY, tokenList, { prepare: true });

        // Identify tokens that were *not* deleted by the initial BATCH
        const tokensStillPresent = results.rows.map(row => row.token);
        
        const retryTokens = [];
        const finalFailedTokens = [];
        const successfulTokens = [];

        // Identify tokens for retry
        for (const token of tokenList) {
            if (tokensStillPresent.includes(token)) {
                retryTokens.push(token);
            } else {
                successfulTokens.push(token); // Successfully deleted in Phase 1
            }
        }

        // --- Phase 2b: Single Retry Attempt ---
        console.log(`Attempting single retry for ${retryTokens.length} failed tokens...`);
        for (const token of retryTokens) {
            try {
                // Execute individual DELETE for the failed token (retry)
                await client.execute(DELETE_QUERY, [token], { prepare: true });
                successfulTokens.push(token);
            } catch (retryError) {
                // Failed after retry. Mark as permanent failure.
                finalFailedTokens.push({ 
                    token: token, 
                    reason: `Failed after BATCH and single retry: ${retryError.message}` 
                });
            }
        }
        
        // --- Phase 3: Generate Report ---
        const isFullySuccessful = finalFailedTokens.length === 0;

        if (isFullySuccessful) {
            console.log(`Admin successfully deleted all ${totalCount} tokens (Verified and Retried).`);
        } else {
            console.warn(`Admin deletion completed with ${successfulTokens.length} successes and ${finalFailedTokens.length} final failures.`);
        }

        return {
            success: isFullySuccessful,
            successfulTokens: successfulTokens,
            failedTokens: finalFailedTokens,
            error: isFullySuccessful ? undefined : `Completed with ${finalFailedTokens.length} verified failures out of ${totalCount} after retry.`
        };

    } catch (error) {
        // If the SELECT query fails, we can't verify the state.
        console.error("ScyllaDB Critical Error: Verification SELECT or Retry failed.", error);
        return { 
            success: false, 
            successfulTokens: [], 
            failedTokens: tokenList.map(token => ({ token, reason: "Verification/Retry phase failed." })), 
            error: clientErrorMessage 
        };
    }
}

module.exports = removeUsersRefreshTokenData;

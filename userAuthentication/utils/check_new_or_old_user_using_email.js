/**
 * @fileoverview Utility function for checking if a user exists in the MongoDB database
 * by their email address. It features a resilient connection strategy:
 * 1. It prefers using a provided, active Mongoose connection client (dbConnectionClient) for performance.
 * 2. If the client is missing or inactive, it establishes a new connection (using databaseURL),
 * performs the check, and closes the connection afterward for reliability.
 */
const mongoose = require('mongoose');

/**
 * Queries the MongoDB database to determine if a user with the given email exists.
 *
 * @param {string} userEmail The email address to search for in the database.
 * @param {string} modelName The name of the Mongoose model (e.g., 'User').
 * @param {mongoose.Schema} userSchemaObject The Mongoose Schema object that defines
 * the collection structure.
 * @param {string} databaseURL The MongoDB connection string, used as a fallback.
 * @param {mongoose.Connection | null} [dbConnectionClient=null] An optional, active Mongoose
 * connection instance. This is preferred if available and connected.
 * @returns {Promise<{success: boolean, data?: object, error?: string, model?: mongoose.Model}>}
 * A Promise that resolves to an object containing the status, the user record (if found),
 * the error message, and the Mongoose model used.
 */
async function checkNewOrOldUserUsingEmail(userEmail, modelName, userSchemaObject, databaseURL, dbConnectionClient = null) {
    // --- Initial Input Validation ---
    if (!userEmail || !modelName || !userSchemaObject || !databaseURL) {
        return {
            success: false,
            error: 'Missing required input parameters (email, modelName, schema, or databaseURL).'
        };
    }
    if (!(userSchemaObject instanceof mongoose.Schema)) {
         return {
            success: false,
            error: `Invalid schema provided for model '${modelName}'. Expected a Mongoose Schema object.`
        };
    }

    let dbToUse = null;
    let connectionCreatedInternally = false;

    // --- 1. Connection Management ---
    try {
        const isClientActive = dbConnectionClient && dbConnectionClient.readyState === 1;

        if (isClientActive) {
            // OPTION A: Use the existing, active client for optimal performance
            dbToUse = dbConnectionClient;
            console.log(`Using existing active Mongoose connection for user check: ${userEmail}`);
        } else {
            // OPTION B: Fallback - Create a new temporary connection
            console.log(`Connection inactive or missing. Creating temporary connection to: ${databaseURL}`);
            dbToUse = await mongoose.createConnection(databaseURL, {
                serverSelectionTimeoutMS: 5000, // Timeout after 5s if server is not found
            });
            connectionCreatedInternally = true;
        }

        // --- 2. Model Retrieval/Definition ---
        let UserModel;
        try {
            // Attempt to retrieve the model from the chosen connection
            UserModel = dbToUse.model(modelName);
        } catch (e) {
            // If it's not defined, define it now using the provided schema
            UserModel = dbToUse.model(modelName, userSchemaObject);
        }

        // --- 3. Perform the User Existence Check ---
        const existingUser = await UserModel.findOne({ email: userEmail }).exec();

        if (existingUser) {
            console.log(`User found in DB: ${userEmail}`);
            return {
                success: true,
                data: existingUser.toObject(),
                error: undefined,
                model: UserModel
            };
        } else {
            console.log(`User not found in DB: ${userEmail}`);
            return {
                success: true,
                data: undefined,
                error: undefined,
                model: UserModel
            };
        }

    } catch (error) {
        // Handle all connection or query errors
        console.error(`MongoDB operation failed for model '${modelName}':`, error.message);
        return {
            success: false,
            data: undefined,
            error: `Database check failed: ${error.message}`
        };
    } finally {
        // --- 4. Cleanup (Only close the connection if we created it internally) ---
        if (connectionCreatedInternally && dbToUse) {
            try {
                await dbToUse.close();
                console.log('Successfully closed internally created Mongoose connection.');
            } catch (closeError) {
                console.error('Error closing internal Mongoose connection:', closeError.message);
            }
        }
    }
}

// Export the function for use in the backend logic.
module.exports = checkNewOrOldUserUsingEmail;

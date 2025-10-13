/**
 * @fileoverview Utility function to update the username and password for a specific
 * user identified by their email address in the MongoDB database.
 *
 * It uses a resilient connection strategy:
 * 1. Prefers using a provided, active Mongoose connection client (dbConnectionClient).
 * 2. If the client is missing or inactive, it establishes a new connection (using databaseURL),
 * performs the update, and closes the connection afterward.
 *
 * NOTE: In a production application, passwords should be hashed (e.g., using bcrypt)
 * before being passed to this function or handled via a Mongoose pre-save hook.
 */
const mongoose = require('mongoose');

/**
 * Updates the username and password fields for a user matching the provided email.
 *
 * @param {string} userEmail The email address of the user to update.
 * @param {string} newUsername The new username to set.
 * @param {string} newPassword The new password to set (should be hashed before use).
 * @param {string} modelName The name of the Mongoose model (e.g., 'User').
 * @param {mongoose.Schema} userSchemaObject The Mongoose Schema object that defines
 * the collection structure.
 * @param {string} databaseURL The MongoDB connection string, used as a fallback.
 * @param {mongoose.Connection | null} [dbConnectionClient=null] An optional, active Mongoose
 * connection instance. This is preferred if available and connected.
 * @returns {Promise<{success: boolean, data?: object, error?: string, model?: mongoose.Model}>}
 * A Promise that resolves to an object containing the status, the updated user record,
 * the error message, and the Mongoose model used.
 */
async function updateUsernameAndPasswordUsingEmail(
    userEmail,
    newUsername,
    newPassword,
    modelName,
    userSchemaObject,
    databaseURL,
    dbConnectionClient = null
) {
    // --- Initial Input Validation ---
    if (!userEmail || !newUsername || !newPassword || !modelName || !userSchemaObject || !databaseURL) {
        return {
            success: false,
            error: 'Missing required input parameters (email, username, password, modelName, schema, or databaseURL).'
        };
    }

    // Check if the critical fields are strings
    if (typeof userEmail !== 'string' || typeof newUsername !== 'string' || typeof newPassword !== 'string') {
        return {
            success: false,
            error: 'Email, username, and password must all be strings.'
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
            console.log(`Using existing active Mongoose connection for user update: ${userEmail}`);
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

        // --- 3. Perform the Update Operation ---
        const updatedUser = await UserModel.findOneAndUpdate(
            { email: userEmail },
            { username: newUsername, password: newPassword },
            { new: true, runValidators: true } // new: true returns the updated document; runValidators ensures validation rules are respected
        ).exec();

        if (updatedUser) {
            console.log(`User updated successfully: ${userEmail}`);
            return {
                success: true,
                data: updatedUser.toObject(),
                error: undefined,
                model: UserModel
            };
        } else {
            // If the query succeeds but no document matches the email
            console.log(`User not found for update: ${userEmail}`);
            return {
                success: false,
                data: undefined,
                error: `No user found with email: ${userEmail}`,
                model: UserModel
            };
        }

    } catch (error) {
        // Handle all connection or query errors
        console.error(`MongoDB update failed for model '${modelName}':`, error.message);
        return {
            success: false,
            data: undefined,
            error: `Database update failed: ${error.message}`
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
module.exports = updateUsernameAndPasswordUsingEmail;

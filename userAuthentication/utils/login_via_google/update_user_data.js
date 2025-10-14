// userAuthentication/utils/login_via_google/update_user_data.js
/**
 * @fileoverview Utility function for updating an existing user's profile data.
 *
 * This function handles efficient and safe updates to user documents, ensuring:
 * 1. Database connection resiliency.
 * 2. Restriction of immutable/sensitive fields (e.g., userId, googleId).
 * 3. Execution of Mongoose validation and pre-save hooks (like password hashing).
 * 4. Sanitization of the user object before it is returned.
 */
const mongoose = require('mongoose');

// --- External Dependencies ---
/** * @type {mongoose.Model} 
 * Importing the pre-defined User schema from the user's specified path.
 */
const UserModel = require('../../database/mongoDB/user_database_model.js'); 
// -----------------------------

// List of fields that MUST NOT be updated by a generic profile update utility.
// These are either immutable, handled by specific flows (like OAuth), or sensitive.
const RESTRICTED_FIELDS = [
    'userId',        // Immutable primary key
    '_id',           // Mongoose internal ID
    'googleId',      // Provider IDs are only set during initial OAuth login/link
    'facebookId',
    'githubId',
    'appleId',
    'emailVerified', // Should only be updated via an official email verification flow
    'createdAt',     // Timestamps are managed automatically by Mongoose
    'updatedAt',
    '__v',           // Mongoose version key
];

/**
 * Sanitizes the user object to remove sensitive data before returning it.
 * This is crucial for security, preventing fields like 'password' and private 
 * OAuth provider IDs from reaching the client.
 *
 * @param {object} userObject The raw user object (from .toObject()).
 * @returns {object} The sanitized public user data.
 */
function sanitizeUserData(userObject) {
    const { 
        password, 
        googleId, 
        facebookId, 
        githubId,
        appleId,
        ...publicData 
    } = userObject;

    return publicData;
}

/**
 * Updates a user's profile data in the database by their application-wide userId.
 *
 * @param {string} appUserId The application-wide unique user ID (UUID).
 * @param {object} dataToUpdate Key-value pairs of user data to update.
 * @param {string} databaseURL The MongoDB connection string, used as a fallback.
 * @param {mongoose.Connection | null} [dbConnectionClient=null] An optional, active Mongoose connection instance.
 * @returns {Promise<{success: boolean, data?: object, error?: string}>}
 * A Promise resolving to the result object containing the status, the updated public user record, and error.
 */
async function updateUserData(appUserId, dataToUpdate, databaseURL, dbConnectionClient = null) {
    // --- Initial Input Validation ---
    if (!appUserId || !dataToUpdate || Object.keys(dataToUpdate).length === 0 || !databaseURL) {
        return {
            success: false,
            error: 'Missing required input: userId, update data, or database URL.'
        };
    }

    const clientErrorMessage = "Failed to update user profile. Please try again later.";
    let dbToUse = null;
    let connectionCreatedInternally = false;
    
    // 1. Filter and prepare data for update
    const filteredUpdateData = {};
    for (const key in dataToUpdate) {
        if (RESTRICTED_FIELDS.includes(key)) {
            console.warn(`Attempted update of restricted field: ${key} for user ${appUserId}`);
            continue; // Skip restricted fields
        }
        // Only include non-undefined/non-null values
        if (dataToUpdate[key] !== undefined && dataToUpdate[key] !== null) {
            filteredUpdateData[key] = dataToUpdate[key];
        }
    }

    if (Object.keys(filteredUpdateData).length === 0) {
        return {
            success: false,
            error: 'No valid fields provided for update.'
        };
    }

    // --- 2. Connection Management (Defensive approach) ---
    try {
        const isClientActive = dbConnectionClient && dbConnectionClient.readyState === 1;

        if (isClientActive) {
            dbToUse = dbConnectionClient;
            console.log(`Using existing active Mongoose connection for user update: ${appUserId}`);
        } else {
            // Fallback - Create a new temporary connection
            dbToUse = await mongoose.createConnection(databaseURL, {
                serverSelectionTimeoutMS: 5000,
            });
            // Attach the model definition
            dbToUse.model(UserModel.modelName, UserModel.schema); 
            connectionCreatedInternally = true;
        }

        const User = dbToUse.model(UserModel.modelName);

        // --- 3. Find, Modify, and Save (Ensures Hashing/Validation) ---
        const user = await User.findOne({ userId: appUserId }).exec();

        if (!user) {
            return {
                success: false,
                error: `User not found with ID: ${appUserId}`
            };
        }

        // Apply updates to the Mongoose document instance
        user.set(filteredUpdateData);

        // Save the document. This triggers:
        // a) Schema validators (e.g., phone number format)
        // b) Pre-save hooks (e.g., password hashing if 'password' was updated)
        const updatedUser = await user.save();

        // --- 4. Success and Sanitization ---
        if (updatedUser) {
            console.log(`User profile updated successfully: ${updatedUser.userId}`);
            
            const publicData = sanitizeUserData(updatedUser.toObject());

            return {
                success: true,
                data: publicData, // Return the sanitized object
                error: undefined,
            };
        } else {
            throw new Error("Database document save failed unexpectedly after update.");
        }

    } catch (error) {
        // Handle MongoDB uniqueness error (E11000)
        if (error.code === 11000) {
             const key = Object.keys(error.keyPattern)[0];
             // Return generic error message to the client
             console.error(`MongoDB duplicate key error during update: ${key}`);
             return {
                success: false,
                data: undefined,
                error: `The provided value for '${key}' already exists. Please use a unique value.`
            };
        }
        
        // Handle Mongoose validation errors (e.g., phone number)
        if (error.name === 'ValidationError') {
            const path = Object.keys(error.errors)[0];
            const message = error.errors[path].message;
            console.error(`Validation Error during update: ${message}`);
            return {
                success: false,
                data: undefined,
                error: `Validation failed for field '${path}': ${message}`
            };
        }


        // Log the detailed error for internal debugging
        console.error(`System error during user data update (${appUserId}):`, error);

        // Return a generic, safe error message to the client
        return {
            success: false,
            data: undefined,
            error: clientErrorMessage
        };
    } finally {
        // --- 5. Cleanup ---
        if (connectionCreatedInternally && dbToUse) {
            try {
                await dbToUse.close(); 
            } catch (closeError) {
                console.error('Error closing internal Mongoose connection:', closeError.message);
            }
        }
    }
}

// Export the function
module.exports = updateUserData;

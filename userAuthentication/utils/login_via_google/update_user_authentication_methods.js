/**
 * @fileoverview Utility function for managing a user's linked authentication methods 
 * (local credentials, OAuth provider IDs, and primary email/username).
 *
 * CRITICAL RULE: This function enforces that a user must retain at least one active 
 * login method (Local Login, Google, Facebook, etc.) after the update.
 */
const mongoose = require('mongoose');

// --- External Dependencies ---
/** * @type {mongoose.Model} 
 * Importing the pre-defined User schema from the user's specified path.
 */
const UserModel = require('../../database/mongoDB/user_database_model.js'); 
// -----------------------------

// Fields related to profile authentication and linking/unlinking
const AUTHENTICATION_FIELDS = [
    'email',         // Can be updated
    'username',      // Can be linked/unlinked
    'password',      // Can be updated/linked/unlinked (will be hashed by schema hook)
    'googleId',      // Can be linked/unlinked (set to null)
    'facebookId',
    'githubId',
    'appleId',
];

// Fields that define a unique provider link (used for the minimum link check)
const PROVIDER_FIELDS = [
    'username',
    'password',
    'googleId',
    'facebookId',
    'githubId',
    'appleId',
];

/**
 * Checks the potential state of the user document (current data + updates) to determine 
 * how many active authentication methods remain.
 *
 * @param {object} currentState The user's current data object (from .toObject()).
 * @param {object} updates The data object containing the pending modifications.
 * @returns {number} The count of active authentication methods.
 */
function calculateActiveMethods(currentState, updates) {
    // Merge current state with pending updates. Null/undefined values in updates 
    // will correctly represent unlinking/removal.
    const potentialState = { ...currentState, ...updates };

    let activeCount = 0;
    
    // 1. Check Local Login (Active if both username AND password are set/retained)
    // We treat the pair as one method. Since the password hook runs before saving, 
    // checking for the presence of the field in potentialState is sufficient.
    if (!!potentialState.username && !!potentialState.password) {
        activeCount++;
    } else if (!!potentialState.username && updates.password === undefined && !!currentState.password) {
        // Handle case where password isn't being updated, but username is retained, 
        // and a password already exists.
        activeCount++;
    }

    // 2. Check OAuth Logins
    PROVIDER_FIELDS.forEach(key => {
        // Skip username/password since they are handled together above
        if (key === 'username' || key === 'password') return;

        // Check if the provider ID remains non-null/non-empty after the update
        if (potentialState[key] !== null && potentialState[key] !== undefined && potentialState[key] !== '') {
            activeCount++;
        }
    });

    return activeCount;
}

/**
 * Generates a client-friendly map showing the user's active login methods.
 *
 * @param {object} user The updated Mongoose user document.
 * @returns {{statusMap: object, activeMethods: string[]}} Object containing the boolean map and a list of active methods.
 */
function generateStatusMap(user) {
    const status = user.toObject();
    
    // Check for local login: Active if username AND password fields are non-empty/non-null
    const isLocalActive = !!status.username && !!status.password;

    const statusMap = {
        authViaLocal: isLocalActive,
        authViaEmail: !!status.email, // Email is mandatory, so this should generally be true
        authViaGoogle: !!status.googleId,
        authViaFacebook: !!status.facebookId,
        authViaGithub: !!status.githubId,
        authViaApple: !!status.appleId,
    };
    
    // Create a list of active method names (e.g., ['Local', 'Google'])
    const activeMethods = Object.keys(statusMap)
        .filter(key => statusMap[key])
        .map(key => key.replace('authVia', ''));

    return { statusMap, activeMethods };
}


/**
 * Updates a user's authentication-related data in the database by their application-wide userId.
 *
 * @param {string} appUserId The application-wide unique user ID (UUID).
 * @param {object} dataToUpdate Key-value pairs of authentication data to update (e.g., {googleId: null, password: 'newHash'}).
 * @param {string} databaseURL The MongoDB connection string, used as a fallback.
 * @param {mongoose.Connection | null} [dbConnectionClient=null] An optional, active Mongoose connection instance.
 * @returns {Promise<{success: boolean, data?: {statusMap: object, activeMethods: string[]}, error?: string}>}
 * A Promise resolving to the result object containing the status and the map of active authentication methods.
 */
async function updateAuthenticationMethods(appUserId, dataToUpdate, databaseURL, dbConnectionClient = null) {
    // --- Initial Input Validation ---
    if (!appUserId || !dataToUpdate || Object.keys(dataToUpdate).length === 0 || !databaseURL) {
        return {
            success: false,
            error: 'Missing required input: userId, update data, or database URL.'
        };
    }

    const clientErrorMessage = "Failed to update authentication methods. Please try again later.";
    let dbToUse = null;
    let connectionCreatedInternally = false;
    
    // 1. Filter and prepare data for update (only allow AUTHENTICATION_FIELDS)
    const filteredUpdateData = {};
    for (const key in dataToUpdate) {
        if (AUTHENTICATION_FIELDS.includes(key)) {
            // Null/undefined values are explicitly allowed here to represent unlinking
            filteredUpdateData[key] = dataToUpdate[key];
        } else {
            console.warn(`Attempted update of unauthorized field in authentication utility: ${key}`);
        }
    }

    if (Object.keys(filteredUpdateData).length === 0) {
        return {
            success: false,
            error: 'No valid authentication fields provided for update.'
        };
    }

    // --- 2. Connection Management ---
    try {
        const isClientActive = dbConnectionClient && dbConnectionClient.readyState === 1;

        if (isClientActive) {
            dbToUse = dbConnectionClient;
        } else {
            // Fallback - Create a new temporary connection
            dbToUse = await mongoose.createConnection(databaseURL, {
                serverSelectionTimeoutMS: 5000,
            });
            dbToUse.model(UserModel.modelName, UserModel.schema); 
            connectionCreatedInternally = true;
        }

        const User = dbToUse.model(UserModel.modelName);

        // --- 3. Find User ---
        const user = await User.findOne({ userId: appUserId }).exec();

        if (!user) {
            return { success: false, error: `User not found with ID: ${appUserId}` };
        }

        // --- 4. Critical: Check Minimum Active Authentication Methods ---
        const activeCount = calculateActiveMethods(user.toObject(), filteredUpdateData);

        if (activeCount <= 0) {
            return {
                success: false,
                error: 'Cannot remove all authentication methods. You must retain at least one way to log in.'
            };
        }

        // --- 5. Apply Updates and Save (Triggers Hashing/Validation) ---
        user.set(filteredUpdateData);

        const updatedUser = await user.save();

        // --- 6. Success and Status Mapping ---
        if (updatedUser) {
            console.log(`User authentication methods updated successfully for user: ${updatedUser.userId}`);
            
            const { statusMap, activeMethods } = generateStatusMap(updatedUser);

            return {
                success: true,
                data: {
                    statusMap,
                    activeMethods
                },
                error: undefined,
            };
        } else {
            throw new Error("Database document save failed unexpectedly after update.");
        }

    } catch (error) {
        // Handle MongoDB uniqueness error (E11000) - e.g., setting a duplicate email or username
        if (error.code === 11000) {
             const key = Object.keys(error.keyPattern)[0];
             console.error(`MongoDB duplicate key error during authentication update: ${key}`);
             return {
                success: false,
                data: undefined,
                error: `The provided value for '${key}' already exists for another user. Please use a unique value.`
            };
        }
        
        // Handle Mongoose validation errors
        if (error.name === 'ValidationError') {
            const path = Object.keys(error.errors)[0];
            const message = error.errors[path].message;
            console.error(`Validation Error during authentication update: ${message}`);
            return {
                success: false,
                data: undefined,
                error: `Validation failed for field '${path}': ${message}`
            };
        }

        // Log the detailed error for internal debugging
        console.error(`System error during authentication update (${appUserId}):`, error);

        // Return a generic, safe error message to the client
        return {
            success: false,
            data: undefined,
            error: clientErrorMessage
        };
    } finally {
        // --- 7. Cleanup ---
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
module.exports = updateAuthenticationMethods;

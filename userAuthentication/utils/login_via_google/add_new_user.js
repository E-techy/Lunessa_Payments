/**
 * @fileoverview Utility function for adding a new user who has authenticated via Google.
 *
 * This function ensures:
 * 1. Resilient database connection (using existing client or creating a temporary one).
 * 2. Uniqueness checks on email and googleId to prevent duplicate accounts (with MongoDB index enforcement).
 * 3. Generation of a main, unique application-wide userId (UUID) with guaranteed uniqueness check.
 * 4. Secure storage of user data derived from the Google ID token and sanitization upon retrieval.
 */
const mongoose = require('mongoose');
// The 'crypto' module provides the randomUUID function for generating v4 UUIDs
const { randomUUID } = require('crypto'); 

// --- External Dependencies ---
/** * 1. Google ID Token Verification Utility
 * @type {function(string, string): Promise<{success: boolean, data?: {userId: string, email: string, name: string, givenName: string, familyName: string, picture: string, emailVerified: boolean}, error?: string}>} 
 * Assuming both utility files are in the same directory ('login_via_google')
 */
const extractInfoFromGoogleIDToken = require('./extract_info_from_GoogleID.js'); 

/**
 * 2. Mongoose User Model (defines schema structure)
 * @type {mongoose.Model} 
 * Importing the pre-defined model from the user's specified path
 */
const UserModel = require('../../database/mongoDB/user_database_model.js'); 
// -----------------------------

const MAX_UUID_ATTEMPTS = 5; // Maximum number of times to try generating a unique userId

/**
 * Validates the Google ID token, extracts user data, and adds the new user to the database.
 * It first checks for existing users by email and googleId.
 *
 * @param {string} idToken The Google ID token received from the client (frontend).
 * @param {string} clientId The client ID corresponding to the application that generated the token.
 * @param {string} databaseURL The MongoDB connection string, used as a fallback.
 * @param {mongoose.Connection | null} [dbConnectionClient=null] An optional, active Mongoose connection instance.
 * @returns {Promise<{success: boolean, data?: object, error?: string}>}
 * A Promise resolving to the result object containing the status, new user record, and error.
 */
async function addNewGoogleUser(idToken, clientId, databaseURL, dbConnectionClient = null) {
    // --- Initial Input Validation ---
    if (!idToken || !clientId || !databaseURL) {
        return {
            success: false,
            error: 'Missing required input parameters (token, client ID, or database URL).'
        };
    }

    const clientErrorMessage = "Registration failed. Please try again later.";
    let dbToUse = null;
    let connectionCreatedInternally = false;
    let googleData; // Verified data from Google

    // --- 1. Google ID Token Verification ---
    const tokenResult = await extractInfoFromGoogleIDToken(idToken, clientId);
    if (!tokenResult.success) {
        // Log the specific failure for internal audit
        console.error('Google ID Token verification failed during registration:', tokenResult.error);
        return {
            success: false,
            error: tokenResult.error || "Google sign-in verification failed."
        };
    }
    googleData = tokenResult.data;

    // --- 2. Connection Management (Defensive approach) ---
    try {
        // Check if the passed client is active (ready state 1 means connected)
        const isClientActive = dbConnectionClient && dbConnectionClient.readyState === 1;

        if (isClientActive) {
            // OPTION A: Use the existing, active client for optimal performance
            dbToUse = dbConnectionClient;
            console.log(`Using existing active Mongoose connection for new Google user check: ${googleData.email}`);
        } else {
            // OPTION B: Fallback - Create a new temporary connection
            console.log(`Connection inactive or missing. Creating temporary connection to database.`);
            
            dbToUse = await mongoose.createConnection(databaseURL, {
                serverSelectionTimeoutMS: 5000,
            });
            // Attach the model definition to the temporary connection instance
            dbToUse.model(UserModel.modelName, UserModel.schema); 
            connectionCreatedInternally = true;
        }

        // Get the model instance associated with the active connection.
        const User = dbToUse.model(UserModel.modelName);

        // --- 3. Uniqueness Check (Fast Fail) ---
        // This is a fast check; the MongoDB unique index (E11000 error) handles the ultimate race condition defense.
        const existingUser = await User.findOne({
            $or: [
                { email: googleData.email },
                { googleId: googleData.userId } 
            ]
        }).exec();

        if (existingUser) {
            console.log(`User already exists (email or Google ID): ${googleData.email}. Returning existing user data.`);
            return {
                success: false,
                error: "An account with this email or Google ID already exists. Please log in.", 
                data: existingUser.toObject(),
            };
        }

        // --- 4. Generate Unique Application-wide userId (UUID) ---
        let newAppUserId;
        let isUnique = false;
        let attempts = 0;

        // Robust loop to ensure the generated UUID does not conflict with an existing user
        while (!isUnique && attempts < MAX_UUID_ATTEMPTS) {
            newAppUserId = randomUUID();
            const check = await User.findOne({ userId: newAppUserId }).exec();
            if (!check) {
                isUnique = true;
            }
            attempts++;
        }

        if (!isUnique) {
            // This is a rare, severe failure scenario
            console.error(`Failed to generate a unique userId after ${MAX_UUID_ATTEMPTS} attempts.`);
            throw new Error("Failed to generate a unique user identifier."); 
        }

        // --- 5. Prepare New User Data ---
        const newUserPayload = {
            userId: newAppUserId,
            email: googleData.email,
            emailVerified: googleData.emailVerified,
            googleId: googleData.userId, // Storing the unique Google Subject ID (Internal use)
            
            // Profile details from Google
            name: googleData.name,
            givenName: googleData.givenName,
            familyName: googleData.familyName,
            picture: googleData.picture,
        };

        // --- 6. Save New User ---
        const newUser = new User(newUserPayload);
        const savedUser = await newUser.save();

        if (savedUser) {
            // [Fix 4] Sanitize data before returning to the client/caller
            const userObject = savedUser.toObject();
            
            // Destructure to omit sensitive internal fields (like password, googleId, and other provider IDs)
            const { 
                password, 
                googleId, 
                facebookId, 
                githubId,
                appleId,
                ...publicData 
            } = userObject;

            return {
                success: true,
                data: publicData, // Return the sanitized object
                error: undefined,
            };
        } else {
            throw new Error("Database document save failed unexpectedly.");
        }

    } catch (error) {
        // Handle MongoDB uniqueness error (E11000) - Race Condition protection
        if (error.code === 11000) {
             const key = Object.keys(error.keyPattern)[0];
             const value = error.keyValue[key];
             // Log only the non-sensitive key/value for debugging
             console.error(`MongoDB duplicate key error during Google registration: ${key} = ${value}`);
             return {
                success: false,
                data: undefined,
                // Return generic error message to the client
                error: `An account using this ${key} already exists. Please log in or use a different account.`
            };
        }

        // Log the detailed error to the console for internal debugging
        console.error(`System error adding new Google user (${googleData ? googleData.email : 'unknown'}):`, error);

        // Return a generic, safe error message to the client
        return {
            success: false,
            data: undefined,
            error: clientErrorMessage
        };
    } finally {
        // --- 7. Cleanup (Only close the connection if we created it internally) ---
        if (connectionCreatedInternally && dbToUse) {
            try {
                // The database connection is closed using the connection instance
                await dbToUse.close(); 
            } catch (closeError) {
                console.error('Error closing internal Mongoose connection:', closeError.message);
            }
        }
    }
}

// Export the function
module.exports = addNewGoogleUser;

/**
 * @fileoverview Mongoose Schema definition for the User model.
 * This schema supports both local (password) and multiple OAuth provider logins.
 * It uses explicit indexes and pre-save hooks for security and data integrity.
 */
const mongoose = require('mongoose');
// NOTE: Must install a library like 'bcryptjs' for production
const bcrypt = require('bcryptjs'); 

// The main, unique identifier for the user across the entire application.
// This is generated as a UUID upon creation.
const userId = {
    type: String,
    required: true,
    unique: true,
    immutable: true, // Should never be changed after creation
};

// Common fields for all authentication types
const email = {
    type: String,
    required: true,
    unique: true, // This is enforced via an explicit index below
    trim: true,
    lowercase: true,
};

const emailVerified = {
    type: Boolean,
    default: false,
};

// Fields for Local (Username/Password) Login
const username = {
    type: String,
    unique: true,
    sparse: true, // Allows null values, so users without a local account don't conflict
    trim: true,
};

const password = {
    type: String,
    // The password field will be empty/undefined for OAuth users (like Google).
};

// --- Unique Provider Identifiers (OAuth) ---
// These fields store the unique Subject ID ('sub') provided by the third-party OAuth provider.
const googleId = {
    type: String,
    unique: true, // Enforced via an explicit index below
    sparse: true, // Allows null/undefined values
};

const facebookId = {
    type: String,
    unique: true,
    sparse: true,
};

const githubId = {
    type: String,
    unique: true,
    sparse: true,
};

const appleId = {
    type: String,
    unique: true,
    sparse: true,
};
// -------------------------------------------

// General Profile Information
const name = { // Full Name
    type: String,
    trim: true,
};

const givenName = { // First Name
    type: String,
    trim: true,
};

const familyName = { // Last Name
    type: String,
    trim: true,
};

const picture = { // Profile Picture URL
    type: String,
};

// --- Additional Profile & Security Fields ---
const phoneNumber = {
    type: String,
    unique: true,
    sparse: true, // Optional and must be unique if provided
    trim: true,
    validate: {
        validator: function(v) {
            // Basic regex validation for common phone number formats (optional)
            return v === null || v.length === 0 || /\d{10,15}/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
    }
};

const address = {
    type: String, // Simple single-line address field
    trim: true,
};

const twoFactorEnabled = { // Flag for 2FA status
    type: Boolean,
    default: false,
};
// --------------------------------------------------

const UserSchema = new mongoose.Schema({
    userId,
    email,
    emailVerified,
    username,
    password,
    // Added unique provider IDs
    googleId,
    facebookId,
    githubId,
    appleId,
    name,
    givenName,
    familyName,
    picture,
    // New fields
    phoneNumber,
    address,
    twoFactorEnabled,
}, {
    timestamps: true, // Adds createdAt and updatedAt timestamps
});

// --------------------------------------------------
// --- Security Fixes & Schema Enhancements ---
// --------------------------------------------------

// [Fix 3] Password Hashing Enforcement (Pre-Save Hook)
const SALT_WORK_FACTOR = 12;

UserSchema.pre('save', async function(next) {
    // Only hash the password if it has been modified (or is new) AND is actually present
    if (!this.isModified('password') || !this.password) {
        return next();
    }

    try {
        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        console.error("Error hashing password during pre-save hook:", err);
        // Pass the error to Mongoose to prevent the document from saving
        next(err); 
    }
});

// [Fix 2] Explicit Unique Index Enforcement (Race Condition Protection)
// This ensures MongoDB enforces uniqueness even when concurrent write operations occur.
// Defining these indexes explicitly is more robust than relying solely on the 'unique' property.

// For email: Required and Unique
UserSchema.index({ email: 1 }, { unique: true }); 

// For OAuth Provider IDs: Optional (Sparse) and Unique
UserSchema.index({ googleId: 1 }, { unique: true, sparse: true });
UserSchema.index({ facebookId: 1 }, { unique: true, sparse: true });
UserSchema.index({ githubId: 1 }, { unique: true, sparse: true });
UserSchema.index({ appleId: 1 }, { unique: true, sparse: true });


// Export the schema so it can be used to define the model in the utility functions
module.exports = UserSchema;

// Global configuration and state variables
let isModifyMode = false;
let rowCounter = 4;
let hasUnsavedStatusChange = false;
let currentStatus = 'active'; // Track the current saved status

// Application constants
const APP_CONFIG = {
    SAVE_DELAY: 1500,
    NOTIFICATION_DURATION: 4000,
    DATE_FORMAT: {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    }
};

// Global configuration and state variables
let isModifyMode = false;
let rowCounter = 0; // Will be updated by server data
let hasUnsavedStatusChange = false;
let currentStatus = 'active'; // Track the current saved status

// Make these globally accessible
window.isModifyMode = isModifyMode;
window.rowCounter = rowCounter;
window.hasUnsavedStatusChange = hasUnsavedStatusChange;
window.currentStatus = currentStatus;

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

// Make APP_CONFIG globally accessible
window.APP_CONFIG = APP_CONFIG;

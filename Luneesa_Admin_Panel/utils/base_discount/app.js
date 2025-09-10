// Main application initialization

/**
 * Initialize the entire application
 */
function initializeApp() {
    initializeStatus();
    initializeTabs();
    
    // Add any other initialization code here
    console.log('Payment Admin System initialized successfully');
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

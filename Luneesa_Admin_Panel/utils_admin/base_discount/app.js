// APP.JS - Main application initialization and coordination

/**
 * Initialize the entire base discount application
 */
function initializeApp() {
    console.log('🚀 Initializing Base Discount Admin System...');
    
    // Initialize status management first
    if (typeof initializeStatus === 'function') {
        initializeStatus();
    } else {
        console.warn('⚠️ Status initialization function not available');
    }
    
    // Load base discount data (this will also sync status with backend)
    if (typeof fetchBaseDiscount === 'function') {
        fetchBaseDiscount();
    } else {
        console.warn('⚠️ Data fetching function not available');
    }
    
    // Initialize current status from loaded data after a delay
    setTimeout(initializeCurrentStatus, 1000);
    
    console.log('✅ Base Discount Admin System initialization complete');
}

/**
 * Initialize current status based on loaded data
 * This is a fallback in case status sync doesn't work properly
 */
async function initializeCurrentStatus() {
    try {
        const response = await fetch('/base_discount', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        
        const data = await response.json();
        
        if (data.success && data.data) {
            const toggle = document.querySelector('.toggle-switch');
            const status = data.data.status || 'active';
            
            // Update global currentStatus variable
            window.currentStatus = status;
            
            // Update toggle UI to match backend status
            if (toggle) {
                if (status === 'active') {
                    toggle.classList.add('active');
                } else {
                    toggle.classList.remove('active');
                }
            }
            
            console.log(`✅ Status initialized from fallback endpoint: ${status}`);
        }
    } catch (error) {
        console.warn('⚠️ Could not initialize status from fallback endpoint:', error);
    }
}

/**
 * Set up global event listeners for the application
 */
function setupGlobalEventListeners() {
    document.addEventListener('DOMContentLoaded', function() {
        // Initialize everything when DOM is ready
        initializeApp();
        
        console.log('✅ Global event listeners set up');
    });
    
    // Handle page visibility changes to refresh data when user returns
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden && typeof fetchBaseDiscount === 'function') {
            console.log('👀 Page visible again, refreshing data...');
            fetchBaseDiscount();
        }
    });
}

/**
 * Handle application errors gracefully
 */
function handleAppError(error, context = 'Application') {
    console.error(`❌ ${context} Error:`, error);
    
    if (typeof showNotification === 'function') {
        showNotification(`${context} error: ${error.message}`, 'error');
    }
}

/**
 * Check if all required dependencies are loaded
 */
function checkDependencies() {
    const requiredFunctions = [
        'fetchBaseDiscount',
        'initializeStatus', 
        'toggleStatus',
        'saveStatusChanges',
        'showNotification'
    ];
    
    const missingFunctions = requiredFunctions.filter(funcName => typeof window[funcName] !== 'function');
    
    if (missingFunctions.length > 0) {
        console.warn('⚠️ Missing required functions:', missingFunctions);
        return false;
    }
    
    // Check if API is available
    if (!window.baseDiscountAPI) {
        console.warn('⚠️ Base discount API not available');
        return false;
    }
    
    return true;
}

/**
 * Application health check
 */
function performHealthCheck() {
    console.log('🏥 Performing application health check...');
    
    const dependenciesOK = checkDependencies();
    const domElementsOK = checkRequiredDOMElements();
    
    if (dependenciesOK && domElementsOK) {
        console.log('✅ Application health check passed');
        return true;
    } else {
        console.warn('⚠️ Application health check failed');
        return false;
    }
}

/**
 * Check if required DOM elements exist
 */
function checkRequiredDOMElements() {
    const requiredElements = [
        '.toggle-switch',
        '#discountTableBody',
        '.save-status-btn'
    ];
    
    const missingElements = requiredElements.filter(selector => !document.querySelector(selector));
    
    if (missingElements.length > 0) {
        console.warn('⚠️ Missing required DOM elements:', missingElements);
        return false;
    }
    
    return true;
}

// Set up global event listeners immediately
setupGlobalEventListeners();

// Export functions to global scope
if (typeof window !== 'undefined') {
    window.initializeApp = initializeApp;
    window.performHealthCheck = performHealthCheck;
    window.handleAppError = handleAppError;
}

// Main Application Initialization and Event Listeners

/**
 * Initialize the application when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
});

/**
 * Set up all event listeners
 */
function initializeEventListeners() {
    setupTokenInputListener();
    setupModelSelectListener();
    setupCouponInputListener();
    setupCalculateButtonListener();
}

/**
 * Setup tokens input event listener with debouncing
 */
function setupTokenInputListener() {
    const tokensInput = document.getElementById('tokens');
    
    tokensInput.addEventListener('input', function() {
        // Just validate the input but don't calculate price automatically
        // Keep the pricing breakdown visible if it's already shown
        // User can manually click Calculate again if they want updated prices
    });
}

/**
 * Setup model select change listener
 */
function setupModelSelectListener() {
    const modelSelect = document.getElementById('model');
    
    modelSelect.addEventListener('change', function() {
        // Keep the pricing breakdown visible if it's already shown
        // User can manually click Calculate again if they want updated prices
    });
}

/**
 * Setup coupon input keypress listener
 */
function setupCouponInputListener() {
    const couponInput = document.getElementById('couponInput');
    
    couponInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            applyCouponCode();
        }
    });
}

/**
 * Setup calculate button click listener
 */
function setupCalculateButtonListener() {
    const calculateBtn = document.getElementById('calculateBtn');
    
    calculateBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const modelSelect = document.getElementById('model');
        const tokensInput = document.getElementById('tokens');
        
        // Validate inputs before calculating
        if (!modelSelect.value) {
            showNotification('Please select an AI model first', 'warning');
            return;
        }
        
        if (!tokensInput.value || parseInt(tokensInput.value) < 1) {
            showNotification('Please enter a valid number of tokens (minimum 1)', 'warning');
            return;
        }

        // ✅ Reset coupon whenever recalculating
        if (typeof removeCouponFromUI === 'function') {
            removeCouponFromUI();
        }
        
        // Only calculate and show pricing breakdown when button is clicked
        calculatePrice();
    });
}


// Global functions that need to be accessible from HTML onclick attributes
window.calculatePrice = calculatePrice;
window.applyOffer = applyOffer;
window.handlePurchase = handlePurchase;

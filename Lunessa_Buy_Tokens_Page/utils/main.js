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
}

/**
 * Setup tokens input event listener with debouncing
 */
function setupTokenInputListener() {
    const tokensInput = document.getElementById('tokens');
    const debouncedCalculate = createDebouncedHandler(function() {
        const modelSelect = document.getElementById('model');
        if (modelSelect.value && this.value) {
            calculatePrice();
        }
    }, APP_CONFIG.debounceDelay);

    tokensInput.addEventListener('input', debouncedCalculate);
}

/**
 * Setup model select change listener
 */
function setupModelSelectListener() {
    const modelSelect = document.getElementById('model');
    
    modelSelect.addEventListener('change', function() {
        const tokensInput = document.getElementById('tokens');
        if (this.value && tokensInput.value) {
            calculatePrice();
        }
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

// Global functions that need to be accessible from HTML onclick attributes
window.calculatePrice = calculatePrice;
window.applyCouponCode = applyCouponCode;
window.removeCoupon = removeCoupon;
window.toggleCouponInput = toggleCouponInput;
window.applyOffer = applyOffer;
window.handlePurchase = handlePurchase;

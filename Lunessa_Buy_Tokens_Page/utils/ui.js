// UI Utilities and Notification Functions

/**
 * Show notification to user
 */
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, APP_CONFIG.notificationDuration);
}

/**
 * Handle purchase process
 */
function handlePurchase() {
    if (currentCalculation.basePrice === 0) {
        showNotification('Please calculate pricing first', 'warning');
        return;
    }
    
    const purchaseBtn = document.getElementById('purchaseBtn');
    const originalContent = purchaseBtn.innerHTML;
    
    // Show processing state
    setPurchaseButtonState(purchaseBtn, true);
    
    setTimeout(() => {
        completePurchase(purchaseBtn, originalContent);
    }, APP_CONFIG.processingDelay);
}

/**
 * Set purchase button state (loading/normal)
 */
function setPurchaseButtonState(button, isProcessing) {
    if (isProcessing) {
        button.innerHTML = '<span class="btn-text">Processing...</span>';
        button.disabled = true;
    } else {
        button.disabled = false;
    }
}

/**
 * Complete the purchase process
 */
function completePurchase(purchaseBtn, originalContent) {
    let message = `Purchase successful! You have bought ${currentCalculation.tokens.toLocaleString()} tokens for $${currentCalculation.totalPrice.toFixed(2)}`;
    
    if (currentCalculation.discount > 0) {
        message += ` (saved $${currentCalculation.discount.toFixed(2)})`;
    }
    
    showNotification(message, 'success');
    resetPurchaseForm();
    
    purchaseBtn.innerHTML = originalContent;
    purchaseBtn.disabled = false;
}

/**
 * Reset purchase form to initial state
 */
function resetPurchaseForm() {
    document.getElementById('model').value = '';
    document.getElementById('tokens').value = '';
    document.getElementById('pricingBreakdown').classList.remove('show');
    resetOffers();
    resetCouponInput();
    
    // Reset calculation state
    currentCalculation = {
        tokens: 0,
        rate: 0,
        basePrice: 0,
        discount: 0,
        totalPrice: 0,
        appliedOffer: null,
        appliedCoupon: null,
        modelName: '',
        discountSource: ''
    };
}

/**
 * Debounced input handler
 */
function createDebouncedHandler(callback, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => callback.apply(this, args), delay);
    };
}

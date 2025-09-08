// Coupon Management Functions

/**
 * Apply a coupon code to the current purchase
 */
function applyCouponCode() {
    const couponInput = document.getElementById('couponInput');
    const couponCode = couponInput.value.trim().toUpperCase();
    const applyBtn = document.getElementById('applyCouponBtn');

    if (!validateCouponApplication(couponCode)) {
        return;
    }

    const coupon = validCoupons[couponCode];
    
    if (!coupon) {
        showCouponFeedback('Invalid coupon code', 'error');
        applyBtn.classList.add('shake');
        setTimeout(() => applyBtn.classList.remove('shake'), 500);
        return;
    }

    if (currentCalculation.basePrice < coupon.minAmount) {
        showCouponFeedback(`Minimum purchase amount is ₹${coupon.minAmount}`, 'error');
        return;
    }

    applyCoupon(couponCode, coupon);
}

/**
 * Validate if coupon can be applied
 */
function validateCouponApplication(couponCode) {
    if (currentCalculation.basePrice === 0) {
        showCouponFeedback('Please calculate pricing first', 'error');
        return false;
    }

    if (!couponCode) {
        showCouponFeedback('Please enter a coupon code', 'error');
        return false;
    }

    if (currentCalculation.appliedCoupon) {
        showCouponFeedback('A coupon is already applied', 'error');
        return false;
    }

    return true;
}

/**
 * Apply the validated coupon (works with base discount)
 */
function applyCoupon(couponCode, coupon) {
    // IMPORTANT: Remove any existing offer/coupon first and reset calculation
    removeCurrentDiscounts();
    resetOffers();

    // Use the new applyCouponDiscount function from calculation.js
    // This applies the coupon discount on the amount AFTER base discount
    const couponDiscount = applyCouponDiscount(coupon.type, coupon.value, couponCode);

    updatePricingBreakdown();
    showAppliedCoupon(couponCode);
    
    // Show success message with breakdown
    const totalSaved = (currentCalculation.baseDiscount || 0) + couponDiscount;
    const message = currentCalculation.baseDiscount > 0 
        ? `Coupon ${couponCode} applied! Base discount (₹${currentCalculation.baseDiscount.toFixed(2)}) + Coupon discount (₹${couponDiscount.toFixed(2)}) = Total saved: ₹${totalSaved.toFixed(2)}`
        : `Coupon ${couponCode} applied! You saved: ₹${couponDiscount.toFixed(2)}`;
    
    showNotification(message, 'success');
}

/**
 * Show applied coupon in UI
 */
function showAppliedCoupon(couponCode) {
    const inputSection = document.getElementById('couponInputSection');
    const appliedSection = document.getElementById('appliedCouponSection');
    const appliedCodeSpan = document.getElementById('appliedCouponCode');
    
    inputSection.style.display = 'none';
    appliedSection.style.display = 'block';
    appliedCodeSpan.textContent = couponCode;
}

/**
 * Remove applied coupon (preserves base discount)
 */
function removeCoupon() {
    removeCurrentDiscounts();
    updatePricingBreakdown();
    resetCouponInput();
    showNotification('Coupon removed', 'success');
}

/**
 * Show coupon feedback message
 */
function showCouponFeedback(message, type) {
    const feedbackDiv = document.getElementById('couponFeedback');
    feedbackDiv.textContent = message;
    feedbackDiv.className = `coupon-feedback ${type}`;
    feedbackDiv.style.display = 'block';

    if (type === 'error') {
        setTimeout(() => {
            feedbackDiv.style.display = 'none';
        }, APP_CONFIG.notificationDuration);
    }
}

/**
 * Reset coupon input to initial state
 */
function resetCouponInput() {
    const couponInput = document.getElementById('couponInput');
    const applyBtn = document.getElementById('applyCouponBtn');
    const feedbackDiv = document.getElementById('couponFeedback');
    const inputSection = document.getElementById('couponInputSection');
    const appliedSection = document.getElementById('appliedCouponSection');
    const toggleElement = document.getElementById('couponToggle');

    couponInput.value = '';
    couponInput.disabled = false;
    applyBtn.textContent = 'Apply';
    applyBtn.classList.remove('applied');
    applyBtn.disabled = false;
    feedbackDiv.style.display = 'none';
    
    // Reset visibility states
    inputSection.style.display = 'none';
    appliedSection.style.display = 'none';
    toggleElement.style.display = 'flex';
}

/**
 * Toggle coupon input visibility
 */
function toggleCouponInput() {
    const inputSection = document.getElementById('couponInputSection');
    const toggleElement = document.getElementById('couponToggle');
    
    if (inputSection.style.display === 'none') {
        inputSection.style.display = 'block';
        toggleElement.style.display = 'none';
    }
}

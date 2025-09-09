// Price Calculation Functions

/**
 * Main price calculation function with base discount integration
 */
function calculatePrice() {
    const modelSelect = document.getElementById('model');
    const tokensInput = document.getElementById('tokens');
    
    if (!modelSelect.value || !tokensInput.value) {
        showNotification('Please select a model and enter number of tokens', 'warning');
        return;
    }

    if (parseInt(tokensInput.value) < 1) {
        showNotification('Token quantity must be at least 1', 'error');
        return;
    }

    const selectedOption = modelSelect.options[modelSelect.selectedIndex];
    const rate = parseFloat(selectedOption.dataset.rate);
    const tokens = parseInt(tokensInput.value);
    const basePrice = tokens * rate;
    const modelName = selectedOption.text.split(' - ')[0];

    // Update calculation state
    resetCalculationState();
    currentCalculation.tokens = tokens;
    currentCalculation.rate = rate;
    currentCalculation.basePrice = basePrice;
    currentCalculation.modelName = modelName;
    
    // Apply base discount first (from server data)
    const hasBaseDiscount = applyBaseDiscount(basePrice);
    
    // Show next level suggestion if applicable
    const nextLevel = getNextDiscountLevel(basePrice);
    if (nextLevel && !hasBaseDiscount) {
        showNotification(nextLevel.message, 'info');
    }

    updatePricingBreakdown();
    resetOffers();
    
    const pricingSection = document.getElementById('pricingBreakdown');
    pricingSection.classList.add('show');
    
    const discountMessage = hasBaseDiscount 
        ? `Price calculated with base discount applied! Saved ₹${currentCalculation.baseDiscount.toFixed(2)}`
        : 'Pricing calculated successfully!';
    
    showNotification(discountMessage, 'success');
}

/**
 * Reset calculation state to initial values
 */
function resetCalculationState() {
    currentCalculation.discount = 0;
    currentCalculation.appliedOffer = null;
    currentCalculation.appliedCoupon = null;
    currentCalculation.discountSource = '';
    currentCalculation.baseDiscount = 0;
    currentCalculation.baseDiscountInfo = null;
}

/**
 * Update pricing breakdown display
 */
function updatePricingBreakdown() {
    document.getElementById('billTokens').textContent = currentCalculation.tokens.toLocaleString();
    document.getElementById('tokenRate').textContent = `₹${currentCalculation.rate.toFixed(3)}`;
    document.getElementById('billPrice').textContent = `₹${currentCalculation.basePrice.toFixed(2)}`;
    document.getElementById('totalPrice').textContent = `₹${currentCalculation.totalPrice.toFixed(2)}`;
    
    const modelBadge = document.getElementById('selectedModelBadge');
    modelBadge.textContent = currentCalculation.modelName;
    modelBadge.style.display = 'block';
    
    // Use the new base discount display function
    updateBaseDiscountDisplay();
}

/**
 * Update discount display in pricing breakdown
 */
function updateDiscountDisplay() {
    const discountRow = document.getElementById('discountRow');
    const discountSource = document.getElementById('discountSource');
    
    if (currentCalculation.discount > 0) {
        discountRow.style.display = 'flex';
        if (currentCalculation.discountSource === 'coupon') {
            discountSource.textContent = `(${currentCalculation.appliedCoupon})`;
        } else if (currentCalculation.appliedOffer) {
            discountSource.textContent = `(${currentCalculation.appliedOffer})`;
        } else {
            discountSource.textContent = '';
        }
    } else {
        discountRow.style.display = 'none';
    }
}

/**
 * Remove current discounts and reset calculation to base state
 * This ensures proper calculation when switching between offers/coupons
 */
function removeCurrentDiscounts() {
    // Reset discount-related calculations while preserving base discount
    currentCalculation.discount = 0;
    currentCalculation.appliedOffer = null;
    currentCalculation.appliedCoupon = null;
    currentCalculation.discountSource = '';
    
    // Reset total price to base price minus base discount only
    currentCalculation.totalPrice = currentCalculation.basePrice - (currentCalculation.baseDiscount || 0);
    
    console.log('🔄 Current discounts removed - Reset to base state:', {
        basePrice: currentCalculation.basePrice,
        baseDiscount: currentCalculation.baseDiscount || 0,
        totalPrice: currentCalculation.totalPrice
    });
}

/**
 * Calculate discount amount based on type and value
 * This function now works on the amount AFTER base discount has been applied
 */
function calculateDiscount(discountType, discountValue, baseAmount) {
    let discount = 0;
    
    if (discountType === 'percentage') {
        discount = (baseAmount * discountValue) / 100;
    } else if (discountType === 'flat') {
        discount = discountValue;
    }
    
    // Ensure discount doesn't exceed base amount
    return Math.min(discount, baseAmount);
}

/**
 * Apply offer discount to the current calculation
 * This applies the offer discount on the amount AFTER base discount
 */
function applyOfferDiscount(discountType, discountValue, offerTitle) {
    // Calculate offer discount on the amount after base discount (currentCalculation.totalPrice)
    const offerDiscount = calculateDiscount(discountType, discountValue, currentCalculation.totalPrice);
    
    // Update calculation with offer discount
    currentCalculation.discount = offerDiscount;
    currentCalculation.appliedOffer = offerTitle;
    currentCalculation.discountSource = 'offer';
    
    // Apply the offer discount to get the final total
    currentCalculation.totalPrice = currentCalculation.totalPrice - offerDiscount;
    
    console.log('📊 Offer discount applied:', {
        offerTitle: offerTitle,
        discountType: discountType,
        discountValue: discountValue,
        basePrice: currentCalculation.basePrice,
        baseDiscount: currentCalculation.baseDiscount,
        priceAfterBaseDiscount: currentCalculation.totalPrice + offerDiscount,
        offerDiscount: offerDiscount,
        finalTotal: currentCalculation.totalPrice
    });
    
    return offerDiscount;
}

/**
 * Apply coupon discount to the current calculation
 * This applies the coupon discount on the amount AFTER base discount
 */
function applyCouponDiscount(discountType, discountValue, couponCode) {
    // Calculate coupon discount on the amount after base discount (currentCalculation.totalPrice)
    const couponDiscount = calculateDiscount(discountType, discountValue, currentCalculation.totalPrice);
    
    // Update calculation with coupon discount
    currentCalculation.discount = couponDiscount;
    currentCalculation.appliedCoupon = couponCode;
    currentCalculation.discountSource = 'coupon';
    
    // Apply the coupon discount to get the final total
    currentCalculation.totalPrice = currentCalculation.totalPrice - couponDiscount;
    
    console.log('📊 Coupon discount applied:', {
        couponCode: couponCode,
        discountType: discountType,
        discountValue: discountValue,
        basePrice: currentCalculation.basePrice,
        baseDiscount: currentCalculation.baseDiscount,
        priceAfterBaseDiscount: currentCalculation.totalPrice + couponDiscount,
        couponDiscount: couponDiscount,
        finalTotal: currentCalculation.totalPrice
    });
    
    return couponDiscount;
}

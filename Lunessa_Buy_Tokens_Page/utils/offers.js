// Offers Management Functions

/**
 * Apply an offer from offer cards
 */
function applyOffer(button) {
    const card = button.closest('.offer-card');
    const discountType = card.dataset.discountType;
    const discountValue = parseFloat(card.dataset.discountValue);
    const minAmount = parseFloat(card.dataset.minAmount);
    
    if (!validateOfferApplication(minAmount)) {
        return;
    }
    
    resetOffers();
    resetCouponInput();
    
    const discount = calculateDiscount(discountType, discountValue, currentCalculation.basePrice);
    const offerName = card.querySelector('h3').textContent;
    
    applyOfferDiscount(discount, offerName, card, button);
}

/**
 * Validate if offer can be applied
 */
function validateOfferApplication(minAmount) {
    if (currentCalculation.basePrice === 0) {
        showNotification('Please calculate pricing first', 'warning');
        return false;
    }
    
    if (currentCalculation.basePrice < minAmount) {
        showNotification(`Minimum purchase amount is ₹${minAmount}`, 'error');
        return false;
    }
    
    if (currentCalculation.appliedCoupon) {
        showNotification('Please remove the coupon first to apply an offer', 'warning');
        return false;
    }
    
    return true;
}

/**
 * Apply offer discount to calculation (works with base discount)
 */
function applyOfferDiscount(discount, offerName, card, button) {
    // Set the exclusive discount from offer
    currentCalculation.discount = discount;
    
    // Calculate final price based on base discount availability
    if (currentCalculation.baseDiscount && currentCalculation.baseDiscount > 0) {
        // Base discount is available - apply both discounts
        // Formula: Total = base price - base discount - exclusive discount (offer)
        const baseDiscountedPrice = currentCalculation.basePrice - currentCalculation.baseDiscount;
        currentCalculation.totalPrice = Math.max(0, baseDiscountedPrice - discount);
        
        const totalSaved = currentCalculation.baseDiscount + discount;
        showNotification(`🎉 Exclusive offer applied! Base discount (₹${currentCalculation.baseDiscount.toFixed(2)}) + Offer discount (₹${discount.toFixed(2)}) = Total saved: ₹${totalSaved.toFixed(2)}`, 'success');
    } else {
        // Base discount is NOT available - apply only exclusive discount
        // Formula: Total = base price - exclusive discount (offer only)
        currentCalculation.totalPrice = Math.max(0, currentCalculation.basePrice - discount);
        
        showNotification(`🎉 Exclusive offer applied! You saved: ₹${discount.toFixed(2)}`, 'success');
    }
    
    // Update calculation state
    currentCalculation.appliedOffer = offerName;
    currentCalculation.appliedCoupon = null;
    currentCalculation.discountSource = 'offer';
    
    // Update UI elements
    card.classList.add('applied');
    button.classList.add('applied');
    button.textContent = 'Applied ✓';
    
    // Update the pricing breakdown display
    updatePricingBreakdown();
    updateBaseDiscountDisplay();
    
    console.log('💰 Offer Applied Summary:', {
        offerName: offerName,
        basePrice: currentCalculation.basePrice,
        baseDiscount: currentCalculation.baseDiscount || 0,
        exclusiveDiscount: discount,
        finalTotal: currentCalculation.totalPrice,
        totalSaved: (currentCalculation.baseDiscount || 0) + discount
    });
}

/**
 * Reset all offers to default state
 */
function resetOffers() {
    const offerCards = document.querySelectorAll('.offer-card');
    const applyBtns = document.querySelectorAll('.apply-offer-btn');
    
    offerCards.forEach(card => card.classList.remove('applied'));
    applyBtns.forEach(btn => {
        btn.classList.remove('applied');
        btn.textContent = 'Apply Offer';
    });
}

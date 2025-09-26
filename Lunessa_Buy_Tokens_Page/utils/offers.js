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
    
    // IMPORTANT: Remove any existing offer/coupon first and reset calculation
    removeCurrentDiscounts();
    resetOffers();
    
    const offerName = card.querySelector('h3').textContent;
    
    // Use the new applyOfferDiscount function from calculation.js
    // This applies the discount on the amount AFTER base discount
    const offerDiscount = applyOfferDiscount(discountType, discountValue, offerName);
    
    // Update UI elements
    card.classList.add('applied');
    button.classList.add('applied');
    button.textContent = 'Applied ✓';
    
    // Update the pricing breakdown display
    updatePricingBreakdown();
    
    // Show success message with breakdown
    const totalSaved = (currentCalculation.baseDiscount || 0) + offerDiscount;
    const message = currentCalculation.baseDiscount > 0 
        ? `🎉 Exclusive offer applied! Base discount ($${currentCalculation.baseDiscount.toFixed(2)}) + Offer discount ($${offerDiscount.toFixed(2)}) = Total saved: $${totalSaved.toFixed(2)}`
        : `🎉 Exclusive offer applied! You saved: $${offerDiscount.toFixed(2)}`;
    
    showNotification(message, 'success');
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
        showNotification(`Minimum purchase amount is $${minAmount}`, 'error');
        return false;
    }
    
    if (currentCalculation.appliedCoupon) {
        showNotification('Please remove the coupon first to apply an offer', 'warning');
        return false;
    }
    
    return true;
}

// This function is no longer needed - replaced by applyOfferDiscount in calculation.js

// This function is now available in calculation.js

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

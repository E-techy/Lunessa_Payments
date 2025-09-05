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
 * Apply offer discount to calculation
 */
function applyOfferDiscount(discount, offerName, card, button) {
    currentCalculation.discount = discount;
    currentCalculation.totalPrice = currentCalculation.basePrice - discount;
    currentCalculation.appliedOffer = offerName;
    currentCalculation.appliedCoupon = null;
    currentCalculation.discountSource = 'offer';
    
    // Update UI
    card.classList.add('applied');
    button.classList.add('applied');
    button.textContent = 'Applied ✓';
    
    updatePricingBreakdown();
    showNotification(`Offer applied! You saved ₹${discount.toFixed(2)}`, 'success');
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

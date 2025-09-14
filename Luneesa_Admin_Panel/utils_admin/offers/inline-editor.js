// Inline editing functionality

// Edit offer - opens inline edit form
function editOffer(index) {
    event.stopPropagation();
    const offer = offersData[index];
    if (!offer) {
        console.error('Offer not found at index:', index);
        return;
    }
    
    // Show inline edit form
    showInlineEditForm(offer, index);
}

// Show inline edit form
function showInlineEditForm(offer, index) {
    // Hide offers list and show edit form
    document.getElementById('offersList').style.display = 'none';
    document.getElementById('inlineEditForm').style.display = 'block';
    
    // Update form title
    document.getElementById('editFormTitle').textContent = `Edit Offer - ${offer.title}`;
    
    // Store current editing index
    window.currentInlineEditIndex = index;
    
    // Populate readonly fields
    document.getElementById('inlineOfferId').value = offer.id;
    document.getElementById('inlineOfferIdValue').value = offer.offerId;
    document.getElementById('inlineCreatedAt').value = new Date(offer.createdAt).toLocaleString();
    document.getElementById('inlineUpdatedAt').value = new Date(offer.updatedAt).toLocaleString();
    
    // Populate editable fields
    document.getElementById('inlineTitle').value = offer.title;
    document.getElementById('inlineStatus').value = offer.status;
    document.getElementById('inlineDescription').value = offer.description || '';
    document.getElementById('inlineOfferCode').value = offer.offerCode || '';
    document.getElementById('inlineGlobalUsedCount').value = offer.globalUsedCount;
    document.getElementById('inlineDiscountType').value = offer.discountType;
    document.getElementById('inlineDiscountValue').value = offer.discountValue;
    document.getElementById('inlineMaxDiscountAmount').value = offer.maxDiscountAmount || '';
    document.getElementById('inlineMinPurchaseAmount').value = offer.minPurchaseAmount || '';
    document.getElementById('inlineOfferType').value = offer.offerType;
    document.getElementById('inlineUsageLimit').value = offer.usageLimit || '';
    document.getElementById('inlineUsageLimitPerUser').value = offer.usageLimitPerUser || '';
    document.getElementById('inlineStartDate').value = new Date(offer.startDate).toISOString().slice(0, 16);
    document.getElementById('inlineEndDate').value = new Date(offer.endDate).toISOString().slice(0, 16);
    
    // Initialize max discount visibility
    toggleInlineMaxDiscount();
}

// Toggle max discount field in inline edit form
function toggleInlineMaxDiscount() {
    const discountType = document.getElementById('inlineDiscountType').value;
    const maxDiscountGroup = document.getElementById('inlineMaxDiscountGroup');
    
    if (discountType === 'percentage') {
        maxDiscountGroup.style.display = 'block';
    } else {
        maxDiscountGroup.style.display = 'none';
        document.getElementById('inlineMaxDiscountAmount').value = '';
    }
}

// Cancel inline edit
function cancelInlineEdit() {
    // Show offers list and hide edit form
    document.getElementById('offersList').style.display = 'block';
    document.getElementById('inlineEditForm').style.display = 'none';
    
    // Clear current editing index
    window.currentInlineEditIndex = -1;
}

// Save inline edit
async function saveInlineEdit() {
    const form = document.getElementById('inlineOfferForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    const index = window.currentInlineEditIndex;
    if (index === -1 || !offersData[index]) {
        showNotification('Error: Invalid offer index', 'error');
        return;
    }
    
    const currentOffer = offersData[index];
    
    // Debug: Log the offer object to see its structure
    console.log('Inline update - Offer object:', currentOffer);
    console.log('Inline update - Offer offerId:', currentOffer.offerId);
    console.log('Inline update - Offer id:', currentOffer.id);
    
    // Use the correct identifier - check for offerId first, fallback to id
    const offerIdentifier = currentOffer.offerId || currentOffer.id;
    
    if (!offerIdentifier) {
        showNotification('Error: No valid offer identifier found for update', 'error');
        return;
    }
    
    const modificationData = {
        title: document.getElementById('inlineTitle').value,
        description: document.getElementById('inlineDescription').value,
        offerCode: document.getElementById('inlineOfferCode').value || null,
        globalUsedCount: parseInt(document.getElementById('inlineGlobalUsedCount').value) || 0,
        discountType: document.getElementById('inlineDiscountType').value,
        discountValue: parseFloat(document.getElementById('inlineDiscountValue').value),
        maxDiscountAmount: document.getElementById('inlineMaxDiscountAmount').value ? 
            parseFloat(document.getElementById('inlineMaxDiscountAmount').value) : null,
        minPurchaseAmount: document.getElementById('inlineMinPurchaseAmount').value ?
            parseFloat(document.getElementById('inlineMinPurchaseAmount').value) : null,
        offerType: document.getElementById('inlineOfferType').value,
        usageLimit: document.getElementById('inlineUsageLimit').value ?
            parseInt(document.getElementById('inlineUsageLimit').value) : null,
        usageLimitPerUser: document.getElementById('inlineUsageLimitPerUser').value ?
            parseInt(document.getElementById('inlineUsageLimitPerUser').value) : null,
        startDate: new Date(document.getElementById('inlineStartDate').value),
        endDate: new Date(document.getElementById('inlineEndDate').value),
        status: document.getElementById('inlineStatus').value
    };
    
    // Show loading state
    showLoadingState(true, 'offers-inline-save-btn');
    
    try {
        console.log('Inline update - Updating offer with identifier:', offerIdentifier);
        const result = await updateOffer(offerIdentifier, modificationData);
        
        if (result.success) {
            // Update local data with server response
            offersData[index] = result.data;
            showNotification('Offer updated successfully!', 'success');
            updateOffersTable();
            cancelInlineEdit();
        } else {
            throw new Error(result.error);
        }
    } catch (error) {
        console.error('Error updating offer:', error);
        showNotification(`Failed to update offer: ${error.message}`, 'error');
    } finally {
        // Remove loading state
        showLoadingState(false, 'offers-inline-save-btn');
    }
}

// Delete offer from inline edit
async function deleteInlineOffer() {
    const index = window.currentInlineEditIndex;
    if (index === -1 || !offersData[index]) {
        showNotification('Error: Invalid offer index', 'error');
        return;
    }
    
    if (!confirm('Are you sure you want to delete this offer?')) {
        return;
    }
    
    const offer = offersData[index];
    
    // Debug: Log the offer object to see its structure
    console.log('Inline delete - Offer object:', offer);
    console.log('Inline delete - Offer offerId:', offer.offerId);
    console.log('Inline delete - Offer id:', offer.id);
    
    // Use the correct identifier - check for offerId first, fallback to id
    const offerIdentifier = offer.offerId || offer.id;
    
    if (!offerIdentifier) {
        showNotification('Error: No valid offer identifier found', 'error');
        console.error('Offer object missing offerId and id:', offer);
        return;
    }
    
    try {
        console.log('Inline delete - Deleting offer with identifier:', offerIdentifier);
        const result = await deleteOffer(offerIdentifier);
        
        if (result.success) {
            // Remove from local data
            offersData.splice(index, 1);
            showNotification('Offer deleted successfully!', 'success');
            updateOffersTable();
            cancelInlineEdit();
        } else {
            throw new Error(result.error);
        }
    } catch (error) {
        console.error('Error deleting offer:', error);
        showNotification(`Failed to delete offer: ${error.message}`, 'error');
    }
}

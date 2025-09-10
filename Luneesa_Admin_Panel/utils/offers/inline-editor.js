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
function saveInlineEdit() {
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
    
    // Update the offer data
    offersData[index] = {
        ...offersData[index],
        title: document.getElementById('inlineTitle').value,
        description: document.getElementById('inlineDescription').value,
        offerCode: document.getElementById('inlineOfferCode').value,
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
        startDate: new Date(document.getElementById('inlineStartDate').value).toISOString(),
        endDate: new Date(document.getElementById('inlineEndDate').value).toISOString(),
        status: document.getElementById('inlineStatus').value,
        updatedAt: new Date().toISOString()
    };
    
    showNotification('Offer updated successfully!', 'success');
    updateOffersTable();
    cancelInlineEdit();
}

// Delete offer from inline edit
function deleteInlineOffer() {
    const index = window.currentInlineEditIndex;
    if (index === -1 || !offersData[index]) {
        showNotification('Error: Invalid offer index', 'error');
        return;
    }
    
    if (confirm('Are you sure you want to delete this offer?')) {
        offersData.splice(index, 1);
        showNotification('Offer deleted successfully!', 'success');
        updateOffersTable();
        cancelInlineEdit();
    }
}

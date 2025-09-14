// Form handling and validation functionality

// Initialize form
function initializeForm() {
    // Set default dates
    const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    document.getElementById('startDate').value = now.toISOString().slice(0, 16);
    document.getElementById('endDate').value = nextWeek.toISOString().slice(0, 16);
}

// Toggle max discount field based on discount type
function toggleMaxDiscount() {
    const discountType = document.getElementById('discountType').value;
    const maxDiscountGroup = document.getElementById('maxDiscountGroup');
    
    if (discountType === 'percentage') {
        maxDiscountGroup.style.display = 'block';
        document.getElementById('maxDiscountAmount').required = true;
    } else {
        maxDiscountGroup.style.display = 'none';
        document.getElementById('maxDiscountAmount').value = '';
        document.getElementById('maxDiscountAmount').required = false;
    }
}

// Set single select values (keeping function name for compatibility)
function setMultiSelectValues(selectId, value) {
    const select = document.getElementById(selectId);
    select.value = value;
}

// Get single select values (keeping function name for compatibility)
function getMultiSelectValues(selectId) {
    const select = document.getElementById(selectId);
    return select.value;
}

// Clear form
function clearForm() {
    document.getElementById('offerForm').reset();
    isEditMode = false;
    currentEditingIndex = -1;
    
    // Hide non-editable fields
    document.getElementById('idField').classList.add('hidden');
    document.getElementById('offerIdField').classList.add('hidden');
    document.getElementById('timestampFields').classList.add('hidden');
    document.getElementById('globalUsedCountGroup').style.display = 'none';
    document.getElementById('offers-delete-current-btn').classList.add('hidden');
    
    // Reset header
    document.getElementById('createHeaderText').textContent = 'Create New Offer';
    
    // Remove selection from table
    document.querySelectorAll('.offers-table tr').forEach(r => r.classList.remove('selected'));
    
    initializeForm();
}

// Save offer
async function saveOffer() {
    // Prevent duplicate submissions
    const saveButton = document.getElementById('offers-save-offer-btn');
    if (saveButton.disabled) {
        console.log('⚠️ Save button is disabled, preventing duplicate submission');
        return;
    }
    
    const form = document.getElementById('offerForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const offerData = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value || null,
        offerCode: document.getElementById('offerCode').value || null,
        discountType: document.getElementById('discountType').value,
        discountValue: parseFloat(document.getElementById('discountValue').value),
        maxDiscountAmount: document.getElementById('maxDiscountAmount').value ? 
            parseFloat(document.getElementById('maxDiscountAmount').value) : null,
        offerType: document.getElementById('offerType').value,
        applicableTo: getMultiSelectValues('applicableTo'),
        minPurchaseAmount: document.getElementById('minPurchaseAmount').value ? 
            parseFloat(document.getElementById('minPurchaseAmount').value) : null,
        applicableProducts: getMultiSelectValues('applicableProducts'),
        usageLimit: document.getElementById('usageLimit').value ? 
            parseInt(document.getElementById('usageLimit').value) : null,
        usageLimitPerUser: document.getElementById('usageLimitPerUser').value ? 
            parseInt(document.getElementById('usageLimitPerUser').value) : null,
        startDate: new Date(document.getElementById('startDate').value),
        endDate: new Date(document.getElementById('endDate').value),
        status: document.getElementById('status').value
    };

    console.log('🚀 saveOffer called:', { isEditMode, currentEditingIndex, offerData });
    
    // Show loading state and disable button
    showLoadingState(true, 'offers-save-offer-btn');

    try {
        if (isEditMode) {
            // Update existing offer
            const currentOffer = offersData[currentEditingIndex];
            
            // Debug: Log the offer object to see its structure
            console.log('Update - Offer object:', currentOffer);
            console.log('Update - Offer offerId:', currentOffer.offerId);
            console.log('Update - Offer id:', currentOffer.id);
            
            // Use the correct identifier - check for offerId first, fallback to id
            const offerIdentifier = currentOffer.offerId || currentOffer.id;
            
            if (!offerIdentifier) {
                throw new Error('No valid offer identifier found for update');
            }
            
            console.log('Updating offer with identifier:', offerIdentifier);
            const result = await updateOffer(offerIdentifier, offerData);
            
            if (result.success) {
                // Update local data with server response
                offersData[currentEditingIndex] = result.data;
                showNotification('Offer updated successfully!', 'success');
            } else {
                throw new Error(result.error);
            }
        } else {
            // Create new offer
            console.log('🆕 Creating new offer with data:', offerData);
            const result = await createOffer(offerData);
            console.log('🆕 Create offer result:', result);
            
            if (result.success) {
                // Add new offer to local data
                offersData.push(result.data);
                showNotification('Offer created successfully!', 'success');
                
                // Clear form after successful creation
                clearForm();
            } else {
                throw new Error(result.error);
            }
        }

        // Refresh the offers table
        updateOffersTable();
        
        // Switch back to offers list
        showOffersTab();
        
    } catch (error) {
        console.error('❌ Error saving offer:', error);
        showNotification(`Failed to save offer: ${error.message}`, 'error');
    } finally {
        // Remove loading state and re-enable button
        showLoadingState(false, 'offers-save-offer-btn');
    }
}

// Delete current offer
function deleteCurrentOffer() {
    if (confirm('Are you sure you want to delete this offer?')) {
        offersData.splice(currentEditingIndex, 1);
        console.log('Deleting offer at index:', currentEditingIndex);
        showNotification('Offer deleted successfully!', 'success');
        showOffersTab();
    }
}

// Table management and display functionality

// Update offers table with current data (wrapper for backward compatibility)
function updateOffersTable() {
    filteredOffersData = [...offersData];
    updateOffersTableWithData(filteredOffersData);
}

// Function to populate offers data from database and update table
function populateOffersFromDatabase(databaseOffers) {
    offersData = databaseOffers;
    filteredOffersData = [...offersData];
    updateOffersTableWithData(filteredOffersData);
    updateQuickStats();
}

// Update offers table with specific data
function updateOffersTableWithData(data) {
    const tbody = document.getElementById('offersTableBody');
    tbody.innerHTML = '';
    
    if (data.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="5" class="text-center p-4">No offers found matching your criteria</td>';
        tbody.appendChild(row);
        return;
    }
    
    data.forEach((offer, index) => {
        // Find the original index in offersData for edit operations
        const originalIndex = offersData.findIndex(o => o.id === offer.id);
        
        // FIXED: Use actual offerId instead of index for delete operations
        const offerIdForDelete = offer.offerId || offer.id;
        
        console.log('Table row - offer:', offer.title, 'originalIndex:', originalIndex, 'offerId:', offerIdForDelete);
        
        const row = document.createElement('tr');
        row.setAttribute('data-offer-index', originalIndex);
        row.setAttribute('data-offer-id', offerIdForDelete); // Add actual offerId
        row.onclick = () => selectOffer(row, originalIndex);
        
        const discountDisplay = offer.discountType === 'percentage' ? 
            `${offer.discountValue}%` : 
            `${offer.discountValue}`;
        
        const createdDate = new Date(offer.createdAt).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
        
        row.innerHTML = `
            <td>
                <div>
                    <strong>${offer.title}</strong>
                    <br><small class="text-muted" title="Full ID: ${offerIdForDelete}">ID: ${offerIdForDelete}</small>
                </div>
            </td>
            <td>${discountDisplay}</td>
            <td>${createdDate}</td>
            <td><span class="status-badge status-${offer.status}">${offer.status}</span></td>
            <td>
                <div class="d-flex ">
                    <button class="btn-primary btn-sm edit-offer-btn" data-offer-index="${originalIndex}" title="Edit offer">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-danger btn-sm" onclick="handleDeleteClick('${offerIdForDelete}', ${originalIndex})" title="Delete offer - ID: ${offerIdForDelete}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// Global delete handler (bypasses event delegation issues)
window.handleDeleteClick = function(offerId, arrayIndex) {
    console.log('🎯 Direct handleDeleteClick called with:', { offerId, arrayIndex });
    console.log('🎯 offerId type:', typeof offerId, 'arrayIndex type:', typeof arrayIndex);
    
    if (!offerId || typeof offerId !== 'string') {
        console.error('❌ Invalid offerId:', offerId);
        showNotification('Error: Invalid offer ID', 'error');
        return;
    }
    
    if (isNaN(arrayIndex) || arrayIndex < 0 || arrayIndex >= offersData.length) {
        console.error('❌ Invalid arrayIndex:', arrayIndex);
        showNotification('Error: Invalid array index', 'error');
        return;
    }
    
    // Call our deleteOfferDirectly function
    deleteOfferDirectly(offerId, arrayIndex);
};

// Delete offer directly using offerId (NEW SIMPLIFIED VERSION)
async function deleteOfferDirectly(offerId, arrayIndex) {
    console.log('=== DELETE OFFER DIRECTLY DEBUG START ===');
    console.log('1. Called with offerId:', offerId, 'type:', typeof offerId);
    console.log('1. Called with arrayIndex:', arrayIndex, 'type:', typeof arrayIndex);
    
    if (!confirm('Are you sure you want to delete this offer?')) {
        console.log('1. User cancelled deletion');
        return;
    }
    
    // Validate inputs
    if (!offerId || typeof offerId !== 'string') {
        showNotification('Error: Invalid offer ID', 'error');
        console.error('2. Invalid offerId:', offerId);
        return;
    }
    
    if (isNaN(arrayIndex) || arrayIndex < 0 || arrayIndex >= offersData.length) {
        showNotification('Error: Invalid array index', 'error');
        console.error('2. Invalid arrayIndex:', arrayIndex);
        return;
    }
    
    try {
        console.log('3. Making API call with offerId:', offerId);
        
        // Call the deleteOffer API function with the actual offerId
        const result = await deleteOffer(offerId);
        
        console.log('4. API response:', result);
        
        if (result.success) {
            // Remove from local data using the array index
            const deletedOffer = offersData[arrayIndex];
            console.log('5. Removing offer from local array:', deletedOffer?.title);
            
            offersData.splice(arrayIndex, 1);
            showNotification('Offer deleted successfully!', 'success');
            updateOffersTable();
            updateQuickStats();
            console.log('6. UI updated successfully');
        } else {
            throw new Error(result.error);
        }
    } catch (error) {
        console.error('❌ Error deleting offer:', error);
        console.log('6. Full error:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
        showNotification(`Failed to delete offer: ${error.message}`, 'error');
    }
    
    console.log('=== DELETE OFFER DIRECTLY DEBUG END ===');
}

// Delete offer from table (UPDATED TO USE OFFER ID)
async function deleteOfferFromTable(index) {
    console.log('⚠️  WARNING: deleteOfferFromTable called with index:', index);
    console.log('⚠️  This function should not be used anymore. Use deleteOfferDirectly instead.');
    
    // Find the offer at this index and get its offerId
    const offer = offersData[index];
    if (offer && offer.offerId) {
        console.log('🔄 Redirecting to deleteOfferDirectly with offerId:', offer.offerId);
        return deleteOfferDirectly(offer.offerId, index);
    } else {
        showNotification('Error: Could not find offer to delete', 'error');
        console.error('No offer found at index:', index);
    }
}

// Update quick stats
function updateQuickStats() {
    const activeOffers = offersData.filter(offer => offer.status === 'active').length;
    const expiredToday = offersData.filter(offer => {
        const endDate = new Date(offer.endDate);
        const today = new Date();
        return endDate.toDateString() === today.toDateString() && offer.status === 'expired';
    }).length;
    
    // Only update stats if the elements exist
    const statCards = document.querySelectorAll('.stat-card .stat-number');
    if (statCards.length > 0) {
        statCards[0].textContent = activeOffers;
        if (statCards.length > 1) {
            statCards[1].textContent = expiredToday;
        }
    }
    
    // Log stats for debugging (optional)
    console.log('Stats updated:', { activeOffers, expiredToday });
}

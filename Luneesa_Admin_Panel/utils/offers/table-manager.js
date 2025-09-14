// Table management and display functionality

// Update offers table with current data (wrapper for backward compatibility)
function updateOffersTable() {
    filteredOffersData = [...offersData];
    updateOffersTableWithData(filteredOffersData);
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
        // Find the original index in offersData for edit/delete operations
        const originalIndex = offersData.findIndex(o => o.id === offer.id);
        
        const row = document.createElement('tr');
        row.setAttribute('data-offer-index', originalIndex);
        row.onclick = () => selectOffer(row, originalIndex);
        
        const discountDisplay = offer.discountType === 'percentage' ? 
            `${offer.discountValue}%` : 
            formatCurrency(offer.discountValue);
        
        const createdDate = new Date(offer.createdAt).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
        
        row.innerHTML = `
            <td>${offer.title}</td>
            <td>${discountDisplay}</td>
            <td>${createdDate}</td>
            <td><span class="status-badge status-${offer.status}">${offer.status}</span></td>
            <td>
                <div class="d-flex ">
                    <button class="btn-primary btn-sm edit-offer-btn" data-offer-index="${originalIndex}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-danger btn-sm delete-offer-btn" data-offer-index="${originalIndex}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// Delete offer from table
function deleteOffer(index) {
    event.stopPropagation();
    if (confirm('Are you sure you want to delete this offer?')) {
        offersData.splice(index, 1);
        console.log('Deleting offer at index:', index);
        showNotification('Offer deleted successfully!', 'success');
        updateOffersTable();
        updateQuickStats();
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

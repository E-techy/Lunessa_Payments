// Navigation and tab switching functionality

// Tab switching functions
function showOffersSection() {
    // This would be called when main 'offers' tab is clicked
    document.getElementById('offerSubTabs').style.display = 'flex';
    showOffersTab(); // Default to offers list
}

function showOffersTab() {
    // Switch to Offers List sub-tab
    document.getElementById('offersContent').classList.add('active');
    document.getElementById('createContent').classList.remove('active');
    
    document.getElementById('offers-sub-tab-btn').classList.add('active');
    document.getElementById('offers-create-sub-tab-btn').classList.remove('active');
    
    // Update offers table
    updateOffersTable();
    updateQuickStats();
}

function showCreateTab() {
    // Switch to Create/Edit sub-tab
    document.getElementById('createContent').classList.add('active');
    document.getElementById('offersContent').classList.remove('active');
    
    document.getElementById('offers-create-sub-tab-btn').classList.add('active');
    document.getElementById('offers-sub-tab-btn').classList.remove('active');
    
    // If not in edit mode, clear the form
    if (!isEditMode) {
        clearForm();
    }
}

// Select offer row
function selectOffer(row, index) {
    // Remove previous selection
    document.querySelectorAll('.offers-table tr').forEach(r => r.classList.remove('selected'));
    // Add selection to current row
    row.classList.add('selected');
}

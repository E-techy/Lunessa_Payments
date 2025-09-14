// Central Event Listeners Setup
// This file sets up all event listeners for the application

/**
 * Initialize all event listeners when DOM is loaded
 */
function initializeEventListeners() {
    // Main tab navigation
    setupMainTabListeners();
    
    // Base discount section listeners
    setupBaseDiscountListeners();
    
    // Offers section listeners  
    setupOffersListeners();
    
    // Coupons section listeners
    setupCouponsListeners();
    
    // Input validation listeners
    setupInputValidationListeners();
    
    console.log('All event listeners initialized successfully');
}

/**
 * Setup coupons section listeners
 */
function setupCouponsListeners() {
    // Note: Coupons functionality is handled by the CouponsManager class
    // This function is kept for consistency and future extensions
    console.log('Coupons listeners setup completed - handled by CouponsManager class');
}

/**
 * Setup main tab navigation listeners
 */
function setupMainTabListeners() {
    // Main tabs
    const aiModelsTab = document.getElementById('ai-models-tab-btn');
    const baseDiscountTab = document.getElementById('base-discount-tab-btn');
    const offersTab = document.getElementById('offers-tab-btn');
    const couponsTab = document.getElementById('coupons-tab-btn');
    const paymentsTab = document.getElementById('payments-tab-btn');
    
    if (aiModelsTab) {
        aiModelsTab.addEventListener('click', (e) => {
            e.target = aiModelsTab; // Set event target for showTab function
            showTab('ai-models');
        });
    }
    
    if (baseDiscountTab) {
        baseDiscountTab.addEventListener('click', (e) => {
            e.target = baseDiscountTab; // Set event target for showTab function
            showTab('base-discount');
        });
    }
    
    if (offersTab) {
        offersTab.addEventListener('click', (e) => {
            e.target = offersTab;
            showTab('offers');
        });
    }
    
    if (couponsTab) {
        couponsTab.addEventListener('click', (e) => {
            e.target = couponsTab;
            showTab('coupons');
        });
    }
    
    if (paymentsTab) {
        paymentsTab.addEventListener('click', (e) => {
            e.target = paymentsTab;
            showTab('payments');
        });
    }
}

/**
 * Setup base discount section listeners
 */
function setupBaseDiscountListeners() {
    // Status toggle
    const statusToggle = document.getElementById('base-discount-status-toggle');
    if (statusToggle) {
        statusToggle.addEventListener('click', toggleStatus);
    }
    
    // Modify button
    const modifyBtn = document.getElementById('base-discount-modify-btn');
    if (modifyBtn) {
        modifyBtn.addEventListener('click', toggleModifyMode);
    }
    
    // Save status button
    const saveStatusBtn = document.getElementById('base-discount-save-status-btn');
    if (saveStatusBtn) {
        saveStatusBtn.addEventListener('click', saveStatusChanges);
    }
    
    // Delete row buttons
    for (let i = 0; i <= 10; i++) { // Setup for multiple potential rows
        const deleteBtn = document.getElementById(`base-discount-delete-row-${i}`);
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => deleteRow(i));
        }
    }
    
    // Add level button
    const addLevelBtn = document.getElementById('base-discount-add-level-btn');
    if (addLevelBtn) {
        addLevelBtn.addEventListener('click', addNewLevel);
    }
    
    // Save changes button
    const saveChangesBtn = document.getElementById('base-discount-save-changes-btn');
    if (saveChangesBtn) {
        saveChangesBtn.addEventListener('click', saveChanges);
    }
}

/**
 * Setup offers section listeners
 */
function setupOffersListeners() {
    // Offers sub-tabs
    const offersSubTab = document.getElementById('offers-sub-tab-btn');
    const createSubTab = document.getElementById('offers-create-sub-tab-btn');
    
    if (offersSubTab) {
        offersSubTab.addEventListener('click', showOffersTab);
    }
    
    if (createSubTab) {
        createSubTab.addEventListener('click', showCreateTab);
    }
    
    // Search and filter
    const searchInput = document.getElementById('offers-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => searchOffers(e.target.value));
    }
    
    const statusFilter = document.getElementById('offers-status-filter');
    if (statusFilter) {
        statusFilter.addEventListener('change', (e) => filterOffers(e.target.value));
    }
    
    // Export button
    const exportBtn = document.getElementById('offers-export-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportOffers);
    }
    
    // Inline edit form buttons
    const inlineCancelBtn = document.getElementById('offers-inline-cancel-btn');
    if (inlineCancelBtn) {
        inlineCancelBtn.addEventListener('click', cancelInlineEdit);
    }
    
    const inlineSaveBtn = document.getElementById('offers-inline-save-btn');
    if (inlineSaveBtn) {
        inlineSaveBtn.addEventListener('click', saveInlineEdit);
    }
    
    const inlineCancelFooterBtn = document.getElementById('offers-inline-cancel-footer-btn');
    if (inlineCancelFooterBtn) {
        inlineCancelFooterBtn.addEventListener('click', cancelInlineEdit);
    }
    
    // Form buttons
    const saveOfferBtn = document.getElementById('offers-save-offer-btn');
    if (saveOfferBtn) {
        saveOfferBtn.addEventListener('click', saveOffer);
    }
    
    const clearFormBtn = document.getElementById('offers-clear-form-btn');
    if (clearFormBtn) {
        clearFormBtn.addEventListener('click', clearForm);
    }
    
    const deleteCurrentBtn = document.getElementById('offers-delete-current-btn');
    if (deleteCurrentBtn) {
        deleteCurrentBtn.addEventListener('click', deleteCurrentOffer);
    }
    
    // Discount type change listeners
    const discountType = document.getElementById('discountType');
    if (discountType) {
        discountType.addEventListener('change', toggleMaxDiscount);
    }
    
    const inlineDiscountType = document.getElementById('inlineDiscountType');
    if (inlineDiscountType) {
        inlineDiscountType.addEventListener('change', toggleInlineMaxDiscount);
    }
}

/**
 * Setup input validation listeners for numeric fields
 */
function setupInputValidationListeners() {
    // Get all numeric input fields
    const numericInputs = document.querySelectorAll('input[type="tel"][inputmode="numeric"]');
    
    numericInputs.forEach(input => {
        input.addEventListener('input', function() {
            // Remove any non-numeric characters
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    });
    
    // Special handling for offer code - convert to uppercase
    const offerCodeInputs = document.querySelectorAll('#offerCode, #inlineOfferCode');
    offerCodeInputs.forEach(input => {
        input.addEventListener('input', function() {
            this.value = this.value.toUpperCase();
        });
    });
}

/**
 * Add event listener for dynamically created delete buttons in base discount table
 */
function addDeleteRowListener(rowIndex) {
    const deleteBtn = document.querySelector(`button[onclick="deleteRow(${rowIndex})"]`);
    if (deleteBtn) {
        // Remove onclick attribute
        deleteBtn.removeAttribute('onclick');
        // Add new event listener
        deleteBtn.addEventListener('click', () => deleteRow(rowIndex));
    }
}

/**
 * Setup dynamic table event listeners (for newly created rows)
 */
function setupDynamicTableListeners() {
    // Base discount table event delegation
    const baseDiscountTableBody = document.getElementById('discountTableBody');
    if (baseDiscountTableBody) {
        baseDiscountTableBody.addEventListener('click', function(e) {
            if (e.target.closest('.delete-btn')) {
                const btn = e.target.closest('.delete-btn');
                const row = btn.closest('tr');
                const rowIndex = row.getAttribute('data-row');
                if (rowIndex !== null) {
                    deleteRow(parseInt(rowIndex));
                }
            }
        });
    }
    
    // Offers table event delegation
    const offersTableBody = document.getElementById('offersTableBody');
    if (offersTableBody) {
        offersTableBody.addEventListener('click', function(e) {
            // Edit offer button
            if (e.target.closest('.edit-offer-btn')) {
                e.stopPropagation();
                const btn = e.target.closest('.edit-offer-btn');
                const offerIndex = parseInt(btn.getAttribute('data-offer-index'));
                editOffer(offerIndex);
            }
            // Delete offer button
            else if (e.target.closest('.delete-offer-btn')) {
                e.stopPropagation();
                const btn = e.target.closest('.delete-offer-btn');
                const offerIndex = parseInt(btn.getAttribute('data-offer-index'));
                deleteOffer(offerIndex);
            }
            // Row click for selection
            else {
                const row = e.target.closest('tr');
                if (row && row.querySelector('.edit-offer-btn')) {
                    const btn = row.querySelector('.edit-offer-btn');
                    const offerIndex = parseInt(btn.getAttribute('data-offer-index'));
                    selectOffer(row, offerIndex);
                }
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure other scripts have loaded
    setTimeout(initializeEventListeners, 100);
    setTimeout(setupDynamicTableListeners, 100);
});

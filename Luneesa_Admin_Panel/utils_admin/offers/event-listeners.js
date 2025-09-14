// Event listeners for offer management

// Initialize event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit to ensure all scripts are loaded
    setTimeout(setupOfferEventListeners, 100);
});

function setupOfferEventListeners() {
    // Prevent multiple setups
    if (window.offersEventListenersSetup) {
        console.log('⚠️ Offer event listeners already set up, skipping...');
        return;
    }
    
    console.log('🌐 Setting up offer event listeners...');
    
    // Create offer button
    const saveOfferBtn = document.getElementById('offers-save-offer-btn');
    if (saveOfferBtn) {
        // Remove any existing listeners first
        const newSaveBtn = saveOfferBtn.cloneNode(true);
        saveOfferBtn.parentNode.replaceChild(newSaveBtn, saveOfferBtn);
        
        newSaveBtn.addEventListener('click', function(e) {
            console.log('💾 Save offer button clicked');
            e.preventDefault();
            e.stopImmediatePropagation();
            saveOffer();
        });
        console.log('✅ Save offer button listener attached');
    } else {
        console.warn('⚠️ Save offer button not found');
    }

    // Update offer button (inline editor)
    const updateOfferBtn = document.getElementById('offers-inline-save-btn');
    if (updateOfferBtn) {
        updateOfferBtn.addEventListener('click', function(e) {
            e.preventDefault();
            saveInlineEdit();
        });
    }

    // Clear form button
    const clearFormBtn = document.getElementById('offers-clear-form-btn');
    if (clearFormBtn) {
        clearFormBtn.addEventListener('click', function(e) {
            e.preventDefault();
            clearForm();
        });
    }

    // Cancel inline edit buttons
    const cancelBtns = ['offers-inline-cancel-btn', 'offers-inline-cancel-footer-btn'];
    cancelBtns.forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                cancelInlineEdit();
            });
        }
    });

    // Load all offers on page load
    loadAllOffers();
    
    // Mark as set up to prevent duplicate setup
    window.offersEventListenersSetup = true;
    console.log('✅ Offer event listeners set up successfully');
}

// Function to load all offers from server
async function loadAllOffers() {
    try {
        console.log('Loading all offers from server...');
        const result = await getAllOffers();
        
        if (result.success && result.data) {
            // Update global offers data
            window.offersData = result.data;
            window.filteredOffersData = [...result.data];
            
            // Update the table
            updateOffersTableWithData(window.filteredOffersData);
            updateQuickStats();
            
            showNotification(`Loaded ${result.data.length} offers`, 'success');
            console.log('Offers loaded successfully:', result.data);
        } else {
            throw new Error(result.error || 'No data received');
        }
    } catch (error) {
        console.error('Error loading offers:', error);
        showNotification(`Failed to load offers: ${error.message}`, 'error');
        
        // Fallback to empty data
        window.offersData = [];
        window.filteredOffersData = [];
        updateOffersTableWithData([]);
    }
}

// Set up delete button event delegation (since buttons are dynamically created)
document.addEventListener('click', function(e) {
    
    if (e.target.classList.contains('delete-offer-btn') || 
        e.target.closest('.delete-offer-btn')) {
        
        console.log('🗑️ Delete button click detected!');
        e.preventDefault();
        e.stopPropagation();
        
        const btn = e.target.classList.contains('delete-offer-btn') ? 
                   e.target : e.target.closest('.delete-offer-btn');
        
        console.log('🔘 Button element:', btn);
        console.log('🔘 Button attributes:', {
            'data-offer-id': btn.getAttribute('data-offer-id'),
            'data-offer-index': btn.getAttribute('data-offer-index')
        });
        
        // FIXED: Use actual offerId instead of array index
        const offerId = btn.getAttribute('data-offer-id');
        const index = parseInt(btn.getAttribute('data-offer-index')); // Still need for UI removal
        
        console.log('🎯 Delete button clicked - offerId:', offerId, 'type:', typeof offerId);
        console.log('🎯 Delete button clicked - index:', index, 'type:', typeof index);
        
        if (offerId && !isNaN(index)) {
            console.log('✅ Valid data, calling deleteOfferDirectly with offerId:', offerId, 'and index:', index);
            deleteOfferDirectly(offerId, index);
        } else {
            console.error('❌ Invalid offerId or index for delete operation - offerId:', offerId, 'index:', index);
            showNotification('Error: Invalid offer data for deletion', 'error');
        }
    }
    
    if (e.target.classList.contains('edit-offer-btn') || 
        e.target.closest('.edit-offer-btn')) {
        
        e.preventDefault();
        e.stopPropagation();
        
        const btn = e.target.classList.contains('edit-offer-btn') ? 
                   e.target : e.target.closest('.edit-offer-btn');
        
        const index = parseInt(btn.getAttribute('data-offer-index'));
        if (!isNaN(index)) {
            editOffer(index);
        }
    }
});

// Initialize global variables if not already defined
if (typeof window.offersData === 'undefined') {
    window.offersData = [];
}
if (typeof window.filteredOffersData === 'undefined') {
    window.filteredOffersData = [];
}
if (typeof window.isEditMode === 'undefined') {
    window.isEditMode = false;
}
if (typeof window.currentEditingIndex === 'undefined') {
    window.currentEditingIndex = -1;
}

console.log('Offer event listeners script loaded');
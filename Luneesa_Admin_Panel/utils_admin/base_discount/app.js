// Main application initialization

/**
 * Initialize the entire application
 */
function initializeApp() {
    console.log('🚀 Initializing Payment Admin System...');
    
    // Initialize status management
    if (typeof initializeStatus === 'function') {
        initializeStatus();
        console.log('✅ Status management initialized');
    }
    
    // Set up event listeners for base discount functionality
    setupBaseDiscountEventListeners();
    
    console.log('✅ Payment Admin System initialized successfully');
}

/**
 * Set up event listeners for base discount functionality
 */
function setupBaseDiscountEventListeners() {
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
    
    // Delete button event delegation (for dynamically created buttons)
    const tableBody = document.getElementById('discountTableBody');
    if (tableBody) {
        tableBody.addEventListener('click', function(event) {
            if (event.target.closest('.delete-btn')) {
                const button = event.target.closest('.delete-btn');
                const rowIndex = button.getAttribute('data-row-index') || button.id.split('-').pop();
                deleteRow(rowIndex);
            }
        });
    }
    
    console.log('✅ Base discount event listeners set up');
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

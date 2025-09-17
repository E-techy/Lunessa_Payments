// STATUS.JS - Status management functionality only

/**
 * Toggle status between active/inactive
 */
function toggleStatus() {
    const toggle = document.querySelector('.toggle-switch');
    const controllableButtons = document.querySelectorAll('.controllable-btn');
    const content = document.querySelector('.content');
    const table = document.querySelector('.discount-table');
    const addLevelSection = document.querySelector('.add-level-section');
    const saveSection = document.querySelector('.save-section');
    const saveStatusBtn = document.querySelector('.save-status-btn');
    
    // Toggle the visual state
    toggle.classList.toggle('active');
    
    const newStatus = toggle.classList.contains('active') ? 'active' : 'inactive';
    
    // Use global variables with fallback
    const currentBackendStatus = window.currentStatus || 'active';
    
    // Check if status has changed from saved backend status
    if (newStatus !== currentBackendStatus) {
        window.hasUnsavedStatusChange = true;
        if (saveStatusBtn) {
            saveStatusBtn.classList.remove('hidden');
            
            // Update button text based on current toggle state
            if (toggle.classList.contains('active')) {
                saveStatusBtn.textContent = 'Save Changes (Active)';
            } else {
                saveStatusBtn.textContent = 'Save Changes (Inactive)';
            }
        }
    } else {
        window.hasUnsavedStatusChange = false;
        if (saveStatusBtn) {
            saveStatusBtn.classList.add('hidden');
        }
    }
    
    // Update UI elements based on toggle state
    if (toggle.classList.contains('active')) {
        showContentElements(controllableButtons, table, addLevelSection, saveSection, content);
        
        if (window.hasUnsavedStatusChange && typeof showNotification === 'function') {
            showNotification('Status changed to Active. Click "Save Changes (Active)" to confirm.', 'info');
        }
    } else {
        hideContentElements(controllableButtons, table, addLevelSection, saveSection, content);
        
        if (window.hasUnsavedStatusChange && typeof showNotification === 'function') {
            showNotification('Status changed to Inactive. Click "Save Changes (Inactive)" to confirm.', 'warning');
        }
    }
}

/**
 * Save status changes to backend
 */
async function saveStatusChanges() {
    const toggle = document.querySelector('.toggle-switch');
    const saveStatusBtn = document.querySelector('.save-status-btn');
    
    if (!toggle || !saveStatusBtn) {
        console.error('❌ Required DOM elements not found');
        return;
    }
    
    const newStatus = toggle.classList.contains('active') ? 'active' : 'inactive';
    
    // Show loading state
    const originalButtonText = saveStatusBtn.textContent;
    saveStatusBtn.textContent = 'Saving...';
    saveStatusBtn.disabled = true;
    
    try {
        // Check if API is available
        if (!window.baseDiscountAPI || typeof window.baseDiscountAPI.updateStatus !== 'function') {
            throw new Error('Base discount API not available');
        }
        
        const result = await window.baseDiscountAPI.updateStatus(newStatus);
        
        if (result.success) {
            // Update global status to match what was saved
            window.currentStatus = newStatus;
            window.hasUnsavedStatusChange = false;
            
            saveStatusBtn.textContent = 'Saved!';
            
            if (typeof showNotification === 'function') {
                showNotification(`Status successfully saved as: ${window.currentStatus}`, 'success');
            }
            
            setTimeout(() => {
                saveStatusBtn.classList.add('hidden');
                saveStatusBtn.disabled = false;
                saveStatusBtn.textContent = 'Save Changes';
                
                // Refresh data to confirm backend state
                if (typeof fetchBaseDiscount === 'function') {
                    fetchBaseDiscount();
                }
            }, 1000);
        } else {
            throw new Error(result.error || 'Failed to update status');
        }
        
    } catch (error) {
        console.error('❌ Status update failed:', error);
        saveStatusBtn.textContent = 'Save Failed';
        
        if (typeof showNotification === 'function') {
            showNotification(`Failed to update status: ${error.message}`, 'error');
        }
        
        // Revert toggle to match current backend state
        const currentBackendStatus = window.currentStatus || 'active';
        if (currentBackendStatus === 'active') {
            toggle.classList.add('active');
        } else {
            toggle.classList.remove('active');
        }
        
        // Reset UI elements to match reverted state
        const controllableButtons = document.querySelectorAll('.controllable-btn');
        const content = document.querySelector('.content');
        const table = document.querySelector('.discount-table');
        const addLevelSection = document.querySelector('.add-level-section');
        const saveSection = document.querySelector('.save-section');
        
        if (currentBackendStatus === 'active') {
            showContentElements(controllableButtons, table, addLevelSection, saveSection, content);
        } else {
            hideContentElements(controllableButtons, table, addLevelSection, saveSection, content);
        }
        
        setTimeout(() => {
            saveStatusBtn.textContent = originalButtonText;
            saveStatusBtn.disabled = false;
        }, 2000);
    }
}

/**
 * Show content elements when status is active
 */
function showContentElements(controllableButtons, table, addLevelSection, saveSection, content) {
    if (controllableButtons) {
        controllableButtons.forEach(btn => {
            if (!btn.classList.contains('save-status-btn')) {
                btn.classList.remove('hidden');
            }
        });
    }
    if (table) table.classList.remove('hidden');
    if (addLevelSection) addLevelSection.classList.remove('hidden');
    if (saveSection) saveSection.classList.remove('hidden');
    if (content) content.classList.remove('status-disabled');
}

/**
 * Hide content elements when status is inactive
 */
function hideContentElements(controllableButtons, table, addLevelSection, saveSection, content) {
    if (controllableButtons) {
        controllableButtons.forEach(btn => {
            if (!btn.classList.contains('save-status-btn')) {
                btn.classList.add('hidden');
            }
        });
    }
    if (table) table.classList.add('hidden');
    if (addLevelSection) addLevelSection.classList.add('hidden');
    if (saveSection) saveSection.classList.add('hidden');
    if (content) content.classList.add('status-disabled');
}

/**
 * Initialize status management system
 */
function initializeStatus() {
    const toggle = document.querySelector('.toggle-switch');
    const table = document.querySelector('.discount-table');
    const addLevelSection = document.querySelector('.add-level-section');
    const saveSection = document.querySelector('.save-section');
    const saveStatusBtn = document.querySelector('.save-status-btn');
    
    if (!toggle) {
        console.warn('⚠️ Toggle switch not found during initialization');
        return;
    }
    
    // Initialize global variables if not already set
    if (typeof window.currentStatus === 'undefined') {
        window.currentStatus = 'active'; // Default, will be overridden by fetchBaseDiscount
    }
    if (typeof window.hasUnsavedStatusChange === 'undefined') {
        window.hasUnsavedStatusChange = false;
    }
    
    // Get initial status from toggle state (before backend sync)
    const initialToggleStatus = toggle.classList.contains('active') ? 'active' : 'inactive';
    
    console.log(`🏁 Initializing status - Toggle: ${initialToggleStatus}, Backend will sync later`);
    
    // Set up initial UI based on toggle state
    const controllableButtons = document.querySelectorAll('.controllable-btn');
    
    if (toggle.classList.contains('active')) {
        showContentElements(controllableButtons, table, addLevelSection, saveSection);
    } else {
        hideContentElements(controllableButtons, table, addLevelSection, saveSection);
    }
    
    // Ensure save status button is initially hidden
    if (saveStatusBtn) {
        saveStatusBtn.classList.add('hidden');
    }
    
    console.log('✅ Status management initialized');
}

/**
 * Sync toggle with backend status (called from fetchBaseDiscount)
 */
function syncToggleWithBackendStatus(backendStatus) {
    const toggle = document.querySelector('.toggle-switch');
    const controllableButtons = document.querySelectorAll('.controllable-btn');
    const content = document.querySelector('.content');
    const table = document.querySelector('.discount-table');
    const addLevelSection = document.querySelector('.add-level-section');
    const saveSection = document.querySelector('.save-section');
    const saveStatusBtn = document.querySelector('.save-status-btn');
    
    if (!toggle) {
        console.warn('⚠️ Toggle switch not found during sync');
        return;
    }
    
    // Update global status
    window.currentStatus = backendStatus || 'inactive';
    
    console.log(`🔄 Syncing toggle with backend status: ${window.currentStatus}`);
    
    // Update toggle visual state to match backend
    if (window.currentStatus === 'active') {
        toggle.classList.add('active');
        showContentElements(controllableButtons, table, addLevelSection, saveSection, content);
    } else {
        toggle.classList.remove('active');
        hideContentElements(controllableButtons, table, addLevelSection, saveSection, content);
    }
    
    // Reset unsaved changes since we're syncing with backend
    window.hasUnsavedStatusChange = false;
    
    // Hide save button since we're in sync
    if (saveStatusBtn) {
        saveStatusBtn.classList.add('hidden');
    }
    
    console.log(`✅ Toggle synced: ${window.currentStatus} (Toggle active: ${toggle.classList.contains('active')})`);
}

// Export functions to global scope
if (typeof window !== 'undefined') {
    window.toggleStatus = toggleStatus;
    window.saveStatusChanges = saveStatusChanges;
    window.initializeStatus = initializeStatus;
    window.syncToggleWithBackendStatus = syncToggleWithBackendStatus;
    window.showContentElements = showContentElements;
    window.hideContentElements = hideContentElements;
}
// Status management functionality

/**
 * Toggle the status switch and handle visibility of content
 */
function toggleStatus() {
    const toggle = document.querySelector('.toggle-switch');
    const controllableButtons = document.querySelectorAll('.controllable-btn');
    const content = document.querySelector('.content');
    const table = document.querySelector('.discount-table');
    const addLevelSection = document.querySelector('.add-level-section');
    const saveSection = document.querySelector('.save-section');
    const saveStatusBtn = document.querySelector('.save-status-btn');
    
    toggle.classList.toggle('active');
    
    const newStatus = toggle.classList.contains('active') ? 'active' : 'inactive';
    
    // Check if status has changed from saved status
    if (newStatus !== window.currentStatus) {
        window.hasUnsavedStatusChange = true;
        saveStatusBtn.classList.remove('hidden');
        // Update button text based on current toggle state
        if (toggle.classList.contains('active')) {
            saveStatusBtn.textContent = 'Save Changes (Active)';
        } else {
            saveStatusBtn.textContent = 'Save Changes (Inactive)';
        }
    } else {
        window.hasUnsavedStatusChange = false;
        saveStatusBtn.classList.add('hidden');
    }
    
    if (toggle.classList.contains('active')) {
        // Status is ON - show all content
        showContentElements(controllableButtons, table, addLevelSection, saveSection, content);
        
        if (window.hasUnsavedStatusChange) {
            showNotification('Status changed to Active. Click "Save Changes (Active)" to confirm.', 'info');
        }
    } else {
        // Status is OFF - hide all content
        hideContentElements(controllableButtons, table, addLevelSection, saveSection, content);
        
        if (window.hasUnsavedStatusChange) {
            showNotification('Status changed to Inactive. Click "Save Changes (Inactive)" to confirm.', 'warning');
        }
    }
}

/**
 * Save status changes to the system
 */
function saveStatusChanges() {
    const toggle = document.querySelector('.toggle-switch');
    const saveStatusBtn = document.querySelector('.save-status-btn');
    
    // Update current status to match toggle state
    window.currentStatus = toggle.classList.contains('active') ? 'active' : 'inactive';
    window.hasUnsavedStatusChange = false;
    
    // Show loading state
    saveStatusBtn.textContent = 'Saving...';
    saveStatusBtn.disabled = true;
    
    // TODO: Replace with actual API call to save status
    // Example API call:
    // await fetch('/admin/update_base_discount_status', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   credentials: 'include',
    //   body: JSON.stringify({ status: window.currentStatus })
    // });
    
    // Simulate API call
    setTimeout(() => {
        saveStatusBtn.textContent = 'Saved!';
        showNotification(`Status successfully saved as: ${window.currentStatus}`, 'success');
        
        setTimeout(() => {
            saveStatusBtn.classList.add('hidden');
            saveStatusBtn.disabled = false;
            saveStatusBtn.textContent = 'Save Changes';
        }, 1000);
    }, APP_CONFIG.SAVE_DELAY);
}

/**
 * Show content elements when status is active
 */
function showContentElements(controllableButtons, table, addLevelSection, saveSection, content) {
    controllableButtons.forEach(btn => {
        if (!btn.classList.contains('save-status-btn')) {
            btn.classList.remove('hidden');
        }
    });
    table.classList.remove('hidden');
    addLevelSection.classList.remove('hidden');
    saveSection.classList.remove('hidden');
    content.classList.remove('status-disabled');
}

/**
 * Hide content elements when status is inactive
 */
function hideContentElements(controllableButtons, table, addLevelSection, saveSection, content) {
    controllableButtons.forEach(btn => {
        if (!btn.classList.contains('save-status-btn')) {
            btn.classList.add('hidden');
        }
    });
    table.classList.add('hidden');
    addLevelSection.classList.add('hidden');
    saveSection.classList.add('hidden');
    content.classList.add('status-disabled');
}

/**
 * Initialize status on page load
 */
function initializeStatus() {
    const toggle = document.querySelector('.toggle-switch');
    const table = document.querySelector('.discount-table');
    const addLevelSection = document.querySelector('.add-level-section');
    const saveSection = document.querySelector('.save-section');
    const saveStatusBtn = document.querySelector('.save-status-btn');
    
    // Initialize current status based on toggle state
    window.currentStatus = toggle.classList.contains('active') ? 'active' : 'inactive';
    
    if (toggle.classList.contains('active')) {
        // Status is already ON by default, ensure all content is visible
        const controllableButtons = document.querySelectorAll('.controllable-btn');
        controllableButtons.forEach(btn => {
            if (!btn.classList.contains('save-status-btn')) {
                btn.classList.remove('hidden');
            }
        });
        table.classList.remove('hidden');
        addLevelSection.classList.remove('hidden');
        saveSection.classList.remove('hidden');
    } else {
        // Status is OFF by default, hide all content
        const controllableButtons = document.querySelectorAll('.controllable-btn');
        controllableButtons.forEach(btn => {
            if (!btn.classList.contains('save-status-btn')) {
                btn.classList.add('hidden');
            }
        });
        table.classList.add('hidden');
        addLevelSection.classList.add('hidden');
        saveSection.classList.add('hidden');
    }
    
    // Ensure save status button is initially hidden
    saveStatusBtn.classList.add('hidden');
}

// Make functions globally accessible
window.toggleStatus = toggleStatus;
window.saveStatusChanges = saveStatusChanges;
window.initializeStatus = initializeStatus;

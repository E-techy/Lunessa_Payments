// Navigation and tab management

/**
 * Initialize tab functionality
 */
function initializeTabs() {
    // Tab functionality (inactive tabs)
    document.querySelectorAll('.tab:not(.active)').forEach(tab => {
        tab.addEventListener('click', function() {
            alert('This tab is not implemented yet. Only Base discount is functional.');
        });
    });
}

/**
 * Switch to a specific tab (for future implementation)
 * @param {string} tabName - Name of the tab to switch to
 */
function switchTab(tabName) {
    // Remove active class from all tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Add active class to selected tab
    const selectedTab = document.querySelector(`[data-tab="${tabName}"]`);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Hide/show content based on tab
    // This would be implemented when other tabs are created
}

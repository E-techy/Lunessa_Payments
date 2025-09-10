// Main initialization and event handling

// Initialize the application
function initializeApp() {
    initializeForm();
    toggleMaxDiscount();
    updateOffersTable();
    updateQuickStats();
    
    // Show offers tab by default
    showOffersTab();
    
    // Initialize inline edit index
    window.currentInlineEditIndex = -1;
}

// Initialize the form and app when page loads
document.addEventListener('DOMContentLoaded', initializeApp);

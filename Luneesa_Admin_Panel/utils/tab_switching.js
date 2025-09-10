// Tab switching functionality
function showTab(tabName) {
    // Remove active class from all tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Add active class to clicked tab
    event.target.classList.add('active');
    
    // Show corresponding content
    const contentId = tabName + '-content';
    const content = document.getElementById(contentId);
    if (content) {
        content.classList.add('active');
    }
    
    // Special handling for offers tab - automatically activate the "Offers" sub-tab
    if (tabName === 'offers') {
        // Small delay to ensure the offers content is visible first
        setTimeout(() => {
            if (typeof showOffersTab === 'function') {
                showOffersTab();
            }
        }, 10);
    }
}
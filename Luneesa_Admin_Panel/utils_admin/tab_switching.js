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
    
    // Special handling for AI Models tab
    if (tabName === 'ai-models') {
        // Ensure AI Models list sub-tab is active by default
        setTimeout(() => {
            const aiListTab = document.getElementById('ai-models-list-sub-tab-btn');
            const aiCreateTab = document.getElementById('ai-models-create-sub-tab-btn');
            const aiListContent = document.getElementById('aiModelsListContent');
            const aiCreateContent = document.getElementById('aiModelsCreateContent');
            
            if (aiListTab && aiCreateTab && aiListContent && aiCreateContent) {
                aiListTab.classList.add('active');
                aiCreateTab.classList.remove('active');
                aiListContent.classList.add('active');
                aiCreateContent.classList.remove('active');
            }
            
            // Hide any open inline edit form
            if (typeof hideAiInlineEditForm === 'function') {
                hideAiInlineEditForm();
            }
        }, 10);
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
    
    // Special handling for coupons tab
    if (tabName === 'coupons') {
        setTimeout(() => {
            const couponListTab = document.getElementById('coupons-list-sub-tab-btn');
            const couponCreateTab = document.getElementById('coupons-create-sub-tab-btn');
            const couponListContent = document.getElementById('couponsListContent');
            const couponCreateContent = document.getElementById('couponsCreateContent');
            
            if (couponListTab && couponCreateTab && couponListContent && couponCreateContent) {
                couponListTab.classList.add('active');
                couponCreateTab.classList.remove('active');
                couponListContent.classList.add('active');
                couponCreateContent.classList.remove('active');
            }
            
            // Initialize coupons manager if not already done
            if (!window.couponsManager && document.getElementById('coupons-content')) {
                window.couponsManager = new CouponsManager();
            }
        }, 10);
    }
}
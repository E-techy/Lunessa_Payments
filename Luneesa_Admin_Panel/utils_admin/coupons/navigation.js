// Coupons Navigation Handler
class CouponsNavigation {
    constructor() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Sub-tab navigation
        document.getElementById('coupons-list-sub-tab-btn')?.addEventListener('click', () => {
            this.showCouponsListTab();
        });

        document.getElementById('coupons-create-sub-tab-btn')?.addEventListener('click', () => {
            this.showCreateCouponTab();
        });
    }

    showCouponsListTab() {
        // Update sub-tab buttons
        document.querySelectorAll('.coupon-sub-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.getElementById('coupons-list-sub-tab-btn').classList.add('active');

        // Update tab content
        document.querySelectorAll('.coupon-tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById('couponsListContent').classList.add('active');

        // Cancel any active inline editing
        if (window.couponsManager && window.couponsManager.inlineEditor) {
            window.couponsManager.inlineEditor.cancelInlineEdit();
        }
    }

    showCreateCouponTab() {
        // Update sub-tab buttons
        document.querySelectorAll('.coupon-sub-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.getElementById('coupons-create-sub-tab-btn').classList.add('active');

        // Update tab content
        document.querySelectorAll('.coupon-tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById('couponsCreateContent').classList.add('active');

        // Clear create form
        if (window.couponsManager && window.couponsManager.formHandler) {
            window.couponsManager.formHandler.clearCreateForm();
        }

        // Auto-enable allotment mode when create tab is opened
        this.autoEnableAllotmentMode();
    }

    autoEnableAllotmentMode() {
        // Wait for the form handler to be ready and DOM to be updated
        setTimeout(() => {
            const allotmentToggle = document.getElementById('coupon-allotment-toggle');
            if (allotmentToggle && !allotmentToggle.checked) {
                // Programmatically check the toggle
                allotmentToggle.checked = true;
                
                // Trigger the change event to activate allotment mode
                const changeEvent = new Event('change', { bubbles: true });
                allotmentToggle.dispatchEvent(changeEvent);
                
                // Also directly call the toggle function if available
                if (window.couponsManager && 
                    window.couponsManager.formHandler && 
                    typeof window.couponsManager.formHandler.toggleAllotmentMode === 'function') {
                    window.couponsManager.formHandler.toggleAllotmentMode(true);
                }
            }
        }, 100); // Small delay to ensure DOM is ready
    }

    getCurrentActiveTab() {
        if (document.getElementById('couponsListContent').classList.contains('active')) {
            return 'list';
        } else if (document.getElementById('couponsCreateContent').classList.contains('active')) {
            return 'create';
        }
        return null;
    }
}

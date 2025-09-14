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

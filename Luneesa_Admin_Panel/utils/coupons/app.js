// Coupons Management System - Main Application
class CouponsManager {
    constructor() {
        this.init();
    }

    init() {
        // Initialize data layer
        this.data = new CouponsData();
        
        // Initialize table manager
        this.tableManager = new CouponsTableManager(this.data);
        
        // Initialize utilities
        this.showMessage = CouponsUtils.showMessage;
        this.onSuccess = (message) => this.showMessage(message, 'success');
        this.onError = (message) => this.showMessage(message, 'error');
        
        // Initialize form handler
        this.formHandler = new CouponsFormHandler(
            this.data, 
            this.onSuccess, 
            this.onError
        );
        
        // Initialize inline editor
        this.inlineEditor = new CouponsInlineEditor(
            this.data,
            this.formHandler,
            this.onSuccess,
            this.onError
        );
        
        // Initialize navigation
        this.navigation = new CouponsNavigation();
        
        // Initialize search and filter
        this.searchFilter = new CouponsSearchFilter(this.tableManager);
        
        // Initialize export functionality
        this.exportDuplicate = new CouponsExportDuplicate(
            this.tableManager,
            this.onSuccess
        );
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Initial render
        this.tableManager.renderCouponsTable();
    }

    setupEventListeners() {
        // Export button
        document.getElementById('coupons-export-btn')?.addEventListener('click', () => {
            this.exportCoupons();
        });

        // Create form buttons
        document.getElementById('coupons-save-coupon-btn')?.addEventListener('click', () => {
            this.saveCoupon();
        });

        document.getElementById('coupons-clear-form-btn')?.addEventListener('click', () => {
            this.formHandler.clearCreateForm();
        });

        // Inline edit buttons
        document.getElementById('coupons-inline-cancel-btn')?.addEventListener('click', () => {
            this.inlineEditor.cancelInlineEdit();
        });

        document.getElementById('coupons-inline-cancel-footer-btn')?.addEventListener('click', () => {
            this.inlineEditor.cancelInlineEdit();
        });

        document.getElementById('coupons-inline-save-btn')?.addEventListener('click', () => {
            this.saveInlineEdit();
        });
    }

    // Public methods that can be called from HTML onclick handlers
    saveCoupon() {
        const result = this.formHandler.saveCoupon();
        if (result) {
            this.tableManager.refreshTable();
            this.searchFilter.filterCoupons(); // Reapply current filters
        }
    }

    editCoupon(couponId) {
        this.inlineEditor.editCoupon(couponId);
    }

    saveInlineEdit() {
        const result = this.inlineEditor.saveInlineEdit();
        if (result) {
            this.tableManager.refreshTable();
            this.searchFilter.filterCoupons(); // Reapply current filters
        }
    }

    deleteCoupon(couponId) {
        if (!confirm('Are you sure you want to delete this coupon?')) {
            return;
        }

        const success = this.data.deleteCoupon(couponId);
        if (success) {
            this.tableManager.refreshTable();
            this.searchFilter.filterCoupons(); // Reapply current filters
            this.showMessage('Coupon deleted successfully!', 'success');
        } else {
            this.showMessage('Failed to delete coupon', 'error');
        }
    }

    exportCoupons() {
        this.exportDuplicate.exportCoupons();
    }

    // Navigation methods (for external access if needed)
    showCouponsListTab() {
        this.navigation.showCouponsListTab();
    }

    showCreateCouponTab() {
        this.navigation.showCreateCouponTab();
    }

    // Utility methods
    refreshAll() {
        this.tableManager.refreshTable();
        this.searchFilter.filterCoupons();
    }

    clearAllFilters() {
        this.searchFilter.clearFilters();
    }

    getCurrentFilters() {
        return this.searchFilter.getCurrentFilters();
    }

    getFilteredCoupons() {
        return this.tableManager.getFilteredCoupons();
    }

    getAllCoupons() {
        return this.data.getAllCoupons();
    }
}

// Initialize the coupons manager when DOM is ready
let couponsManager;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize only if we're on the page with coupons elements
    if (document.getElementById('coupons-content')) {
        couponsManager = new CouponsManager();
        // Make it globally available
        window.couponsManager = couponsManager;
    }
});

// Also initialize when the coupons tab becomes active
document.addEventListener('click', function(e) {
    if (e.target && e.target.id === 'coupons-tab-btn') {
        setTimeout(() => {
            if (!couponsManager && document.getElementById('coupons-content')) {
                couponsManager = new CouponsManager();
                window.couponsManager = couponsManager;
            }
        }, 100);
    }
});

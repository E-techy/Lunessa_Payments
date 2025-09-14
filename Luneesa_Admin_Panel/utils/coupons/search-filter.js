// Coupons Search and Filter
class CouponsSearchFilter {
    constructor(tableManager) {
        this.tableManager = tableManager;
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Search and filter
        document.getElementById('coupons-search-input')?.addEventListener('input', (e) => {
            this.filterCoupons();
        });

        document.getElementById('coupons-status-filter')?.addEventListener('change', (e) => {
            this.filterCoupons();
        });
    }

    filterCoupons() {
        const searchTerm = document.getElementById('coupons-search-input')?.value || '';
        const statusFilter = document.getElementById('coupons-status-filter')?.value || 'all';

        this.tableManager.filterCoupons(searchTerm, statusFilter);
    }

    clearFilters() {
        document.getElementById('coupons-search-input').value = '';
        document.getElementById('coupons-status-filter').value = 'all';
        this.filterCoupons();
    }

    getCurrentFilters() {
        return {
            searchTerm: document.getElementById('coupons-search-input')?.value || '',
            statusFilter: document.getElementById('coupons-status-filter')?.value || 'all'
        };
    }
}

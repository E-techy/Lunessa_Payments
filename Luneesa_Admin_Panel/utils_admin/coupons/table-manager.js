// Coupons Table Manager
class CouponsTableManager {
    constructor(couponsData) {
        this.couponsData = couponsData;
        this.filteredCoupons = [];
        this.updateFilteredCoupons();
    }

    updateFilteredCoupons() {
        this.filteredCoupons = this.couponsData.getAllCoupons();
    }

    renderCouponsTable() {
        const tbody = document.getElementById('couponsTableBody');
        if (!tbody) return;

        if (this.filteredCoupons.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="4" class="coupon-empty-state">
                        <i class="fas fa-ticket-alt"></i>
                        <p>No coupons found</p>
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = this.filteredCoupons.map(coupon => {
            const statusBadge = coupon.used 
                ? '<span class="coupon-status-badge coupon-status-used">Used</span>'
                : '<span class="coupon-status-badge coupon-status-available">Available</span>';

            const discountDisplay = coupon.discountType === 'percentage' 
                ? `${coupon.discountValue}%`
                : CouponsUtils.formatCurrency(coupon.discountValue);

            const discountTypeBadge = coupon.discountType === 'percentage'
                ? '<span class="coupon-discount-type coupon-discount-percentage">%</span>'
                : '<span class="coupon-discount-type coupon-discount-flat">$</span>';

            return `
                <tr data-coupon-id="${coupon.id}">
                    <td>
                        <strong>${coupon.couponCode}</strong>
                        <div class="text-sm">Min: ${CouponsUtils.formatCurrency(coupon.minOrderValue)}</div>
                    </td>
                    <td>
                        ${discountTypeBadge} ${discountDisplay}
                        ${coupon.maxDiscountAmount ? `<div class="text-sm">Max: ${CouponsUtils.formatCurrency(coupon.maxDiscountAmount)}</div>` : ''}
                    </td>
                    <td>${statusBadge}</td>
                    <td>
                        <div class="coupon-action-table-buttons">
                            <button class="coupon-btn coupon-btn-primary" id="coupon-edit-btn-${coupon.id}" data-coupon-id="${coupon.id}">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="coupon-btn coupon-btn-danger" id="coupon-delete-btn-${coupon.id}" data-coupon-id="${coupon.id}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
        
        // Setup event listeners for action buttons after rendering
        this.setupActionButtonListeners();
    }

    setupActionButtonListeners() {
        // Remove existing listeners to prevent duplicates
        document.querySelectorAll('[id^="coupon-edit-btn-"], [id^="coupon-delete-btn-"]').forEach(btn => {
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
        });

        // Add event listeners for edit buttons
        document.querySelectorAll('[id^="coupon-edit-btn-"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const couponId = parseInt(e.currentTarget.getAttribute('data-coupon-id'));
                if (window.couponsManager) {
                    window.couponsManager.editCoupon(couponId);
                }
            });
        });

        // Add event listeners for delete buttons
        document.querySelectorAll('[id^="coupon-delete-btn-"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const couponId = parseInt(e.currentTarget.getAttribute('data-coupon-id'));
                if (window.couponsManager) {
                    window.couponsManager.deleteCoupon(couponId);
                }
            });
        });
    }

    // Filter and search methods
    filterCoupons(searchTerm = '', statusFilter = 'all') {
        const allCoupons = this.couponsData.getAllCoupons();
        
        this.filteredCoupons = allCoupons.filter(coupon => {
            const matchesSearch = coupon.couponCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  coupon.discountType.toLowerCase().includes(searchTerm.toLowerCase());
            
            let matchesStatus = true;
            if (statusFilter !== 'all') {
                matchesStatus = coupon.used.toString() === statusFilter;
            }

            return matchesSearch && matchesStatus;
        });

        this.renderCouponsTable();
    }

    refreshTable() {
        this.updateFilteredCoupons();
        this.renderCouponsTable();
    }

    getFilteredCoupons() {
        return [...this.filteredCoupons];
    }
}

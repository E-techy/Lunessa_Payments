// User Coupons Search Functionality
class UserCouponsSearch {
    constructor() {
        this.currentUserData = null;
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Search button click
        document.getElementById('user-coupons-search-btn')?.addEventListener('click', () => {
            this.searchUserCoupons();
        });

        // Enter key in username input
        document.getElementById('user-coupons-username-input')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.searchUserCoupons();
            }
        });

        // Clear search button
        document.getElementById('user-coupons-clear-btn')?.addEventListener('click', () => {
            this.clearSearch();
        });
    }

    async searchUserCoupons() {
        const usernameInput = document.getElementById('user-coupons-username-input');
        const username = usernameInput?.value?.trim();

        if (!username) {
            this.showMessage('Please enter a username to search', 'error');
            return;
        }

        // Show loading state
        this.setLoadingState(true);

        try {
            const userData = await this.fetchUserCoupons(username);
            if (userData) {
                this.currentUserData = userData;
                this.renderUserCouponsTable(userData);
                this.showSearchResults();
                this.showMessage(`Found coupons for user: ${username}`, 'success');
            } else {
                this.clearResults();
                this.showMessage(`No coupon data found for user: ${username}`, 'error');
            }
        } catch (error) {
            console.error('Error searching user coupons:', error);
            this.clearResults();
            this.showMessage('Error occurred while searching. Please try again.', 'error');
        } finally {
            this.setLoadingState(false);
        }
    }

    async fetchUserCoupons(username) {
        try {
            const response = await fetch(`/admin/get_user_coupons?username=${encodeURIComponent(username)}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("authToken")
                }
            });

            const result = await response.json();

            if (!result.success) {
                console.error("❌ Failed to fetch coupons:", result.error);
                return null;
            }

            return result.data;

        } catch (err) {
            console.error("⚠️ Error fetching coupons:", err);
            throw err;
        }
    }

    renderUserCouponsTable(userData) {
        const tbody = document.getElementById('userCouponsTableBody');
        if (!tbody) return;

        if (!userData.availableCoupons || userData.availableCoupons.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" class="coupon-empty-state">
                        <i class="fas fa-ticket-alt"></i>
                        <p>No coupons found for user: ${userData.username}</p>
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = userData.availableCoupons.map((coupon, index) => {
            const statusBadge = coupon.used 
                ? '<span class="coupon-status-badge coupon-status-used">Used</span>'
                : '<span class="coupon-status-badge coupon-status-available">Available</span>';

            const discountDisplay = coupon.discountType === 'percentage' 
                ? `${coupon.discountValue}%`
                : this.formatCurrency(coupon.discountValue);

            const discountTypeBadge = coupon.discountType === 'percentage'
                ? '<span class="coupon-discount-type coupon-discount-percentage">%</span>'
                : '<span class="coupon-discount-type coupon-discount-flat">$</span>';

            const maxDiscountDisplay = coupon.maxDiscountAmount 
                ? this.formatCurrency(coupon.maxDiscountAmount)
                : 'N/A';

            return `
                <tr data-coupon-index="${index}">
                    <td><strong>${coupon.couponCode}</strong></td>
                    <td>
                        ${discountTypeBadge} ${discountDisplay}
                    </td>
                    <td>${this.formatCurrency(coupon.minOrderValue)}</td>
                    <td>${maxDiscountDisplay}</td>
                    <td>${statusBadge}</td>
                    <td>${this.formatDateTime(coupon.createdAt)}</td>
                    <td>${this.formatDateTime(coupon.updatedAt)}</td>
                </tr>
            `;
        }).join('');
    }

    showSearchResults() {
        const searchResults = document.getElementById('userCouponsSearchResults');
        const defaultContent = document.getElementById('couponsDefaultContent');
        
        if (searchResults) {
            searchResults.style.display = 'block';
        }
        if (defaultContent) {
            defaultContent.style.display = 'none';
        }
    }

    clearSearch() {
        const usernameInput = document.getElementById('user-coupons-username-input');
        if (usernameInput) {
            usernameInput.value = '';
        }
        this.clearResults();
    }

    clearResults() {
        const searchResults = document.getElementById('userCouponsSearchResults');
        const defaultContent = document.getElementById('couponsDefaultContent');
        
        if (searchResults) {
            searchResults.style.display = 'none';
        }
        if (defaultContent) {
            defaultContent.style.display = 'block';
        }

        this.currentUserData = null;
        
        // Clear table body
        const tbody = document.getElementById('userCouponsTableBody');
        if (tbody) {
            tbody.innerHTML = '';
        }
    }

    setLoadingState(loading) {
        const searchBtn = document.getElementById('user-coupons-search-btn');
        const clearBtn = document.getElementById('user-coupons-clear-btn');
        const usernameInput = document.getElementById('user-coupons-username-input');

        if (searchBtn) {
            searchBtn.disabled = loading;
            searchBtn.innerHTML = loading 
                ? '<i class="fas fa-spinner fa-spin"></i> Searching...' 
                : '<i class="fas fa-search"></i> Search';
        }

        if (clearBtn) {
            clearBtn.disabled = loading;
        }

        if (usernameInput) {
            usernameInput.disabled = loading;
        }
    }

    showMessage(message, type = 'info') {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.coupon-success-message, .coupon-error');
        existingMessages.forEach(msg => msg.remove());

        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = type === 'error' ? 'coupon-error' : 'coupon-success-message';
        messageDiv.innerHTML = `
            <i class="fas fa-${type === 'error' ? 'exclamation-triangle' : 'check-circle'}"></i>
            <span>${message}</span>
        `;

        // Insert message at the top of the coupons list content
        const activeContent = document.getElementById('couponsListContent');
        if (activeContent) {
            activeContent.insertBefore(messageDiv, activeContent.firstChild);

            // Auto remove after 4 seconds
            setTimeout(() => {
                messageDiv.remove();
            }, 4000);
        }
    }

    formatCurrency(amount) {
        if (amount === null || amount === undefined) {
            return 'N/A';
        }
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    }

    formatDateTime(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // Export functionality for user coupons
    exportUserCoupons() {
        if (!this.currentUserData || !this.currentUserData.availableCoupons || this.currentUserData.availableCoupons.length === 0) {
            this.showMessage('No user coupon data to export', 'error');
            return;
        }

        const csvData = this.convertToCSV(this.currentUserData);
        this.downloadCSV(csvData, `user-coupons-${this.currentUserData.username}-${new Date().toISOString().split('T')[0]}.csv`);
        this.showMessage(`Exported ${this.currentUserData.availableCoupons.length} coupons for user: ${this.currentUserData.username}`, 'success');
    }

    convertToCSV(userData) {
        const headers = ['Username', 'Coupon Code', 'Discount Type', 'Discount Value', 'Min Order Value', 'Max Discount Amount', 'Used', 'Created At', 'Updated At'];
        
        const rows = userData.availableCoupons.map(coupon => [
            userData.username,
            coupon.couponCode,
            coupon.discountType,
            coupon.discountValue,
            coupon.minOrderValue,
            coupon.maxDiscountAmount || '',
            coupon.used ? 'Yes' : 'No',
            coupon.createdAt,
            coupon.updatedAt
        ]);

        const csvContent = [headers, ...rows]
            .map(row => row.map(field => `"${field}"`).join(','))
            .join('\n');

        return csvContent;
    }

    downloadCSV(csvContent, filename) {
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // Get current search results
    getCurrentUserData() {
        return this.currentUserData;
    }

    // Check if search results are currently displayed
    hasSearchResults() {
        const searchResults = document.getElementById('userCouponsSearchResults');
        return searchResults && searchResults.style.display !== 'none';
    }
}

// Initialize user coupons search when DOM is ready
let userCouponsSearch;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize only if we're on the page with coupons elements
    if (document.getElementById('couponsListContent')) {
        userCouponsSearch = new UserCouponsSearch();
        // Make it globally available
        window.userCouponsSearch = userCouponsSearch;
    }
});

// Also initialize when the coupons tab becomes active
document.addEventListener('click', function(e) {
    if (e.target && e.target.id === 'coupons-tab-btn') {
        setTimeout(() => {
            if (!userCouponsSearch && document.getElementById('couponsListContent')) {
                userCouponsSearch = new UserCouponsSearch();
                window.userCouponsSearch = userCouponsSearch;
            }
        }, 100);
    }
});

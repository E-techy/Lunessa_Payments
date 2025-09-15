/**
 * Delete User Coupons Functionality
 * Handles deletion of coupons using the /admin/delete_coupons endpoint
 */
class DeleteUserCoupons {
    constructor() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Listen for delete button clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('.coupon-btn-danger')) {
                const button = e.target.closest('.coupon-btn-danger');
                const couponIndex = this.extractCouponIndex(button);
                if (couponIndex !== null) {
                    this.deleteUserCoupon(couponIndex);
                }
            }
        });
    }

    /**
     * Extract coupon index from button context
     * @param {HTMLElement} button - The delete button element
     * @returns {number|null} - The coupon index or null if not found
     */
    extractCouponIndex(button) {
        // Method 1: Check onclick attribute
        const onclickAttr = button.getAttribute('onclick');
        if (onclickAttr) {
            const match = onclickAttr.match(/deleteUserCoupon\((\d+)\)/);
            if (match) {
                return parseInt(match[1]);
            }
        }

        // Method 2: Check data attribute on button
        const dataIndex = button.getAttribute('data-coupon-index');
        if (dataIndex !== null) {
            return parseInt(dataIndex);
        }

        // Method 3: Check parent row's data attribute
        const row = button.closest('tr, .coupon-item, .coupon-row');
        if (row) {
            const rowIndex = row.getAttribute('data-coupon-index');
            if (rowIndex !== null) {
                return parseInt(rowIndex);
            }
        }

        // Method 4: Find index based on row position
        const allRows = document.querySelectorAll('#userCouponsTableBody tr');
        const currentRow = button.closest('tr');
        if (currentRow && allRows.length > 0) {
            return Array.from(allRows).indexOf(currentRow);
        }

        return null;
    }

    /**
     * Get coupon code from UI element at given index
     * @param {number} couponIndex - Index of the coupon
     * @returns {string|null} - Coupon code or null if not found
     */
    getCouponCodeByIndex(couponIndex) {
        // Method 1: From current user data if available
        if (window.userCouponsSearch && window.userCouponsSearch.currentUserData) {
            const coupon = window.userCouponsSearch.currentUserData.availableCoupons[couponIndex];
            if (coupon) {
                return coupon.couponCode;
            }
        }

        // Method 2: From table row
        const tableRows = document.querySelectorAll('#userCouponsTableBody tr');
        if (tableRows[couponIndex]) {
            const couponCodeCell = tableRows[couponIndex].querySelector('td:first-child strong');
            if (couponCodeCell) {
                return couponCodeCell.textContent.trim();
            }
        }

        // Method 3: From data attribute
        const rowWithData = document.querySelector(`[data-coupon-index="${couponIndex}"]`);
        if (rowWithData) {
            const couponCode = rowWithData.getAttribute('data-coupon-code');
            if (couponCode) {
                return couponCode;
            }
        }

        return null;
    }

    /**
     * Get current username from the search
     * @returns {string|null} - Username or null if not found
     */
    getCurrentUsername() {
        // Method 1: From userCouponsSearch instance
        if (window.userCouponsSearch && window.userCouponsSearch.currentUserData) {
            return window.userCouponsSearch.currentUserData.username;
        }

        // Method 2: From input field
        const usernameInput = document.getElementById('user-coupons-username-input');
        if (usernameInput && usernameInput.value.trim()) {
            return usernameInput.value.trim();
        }

        return null;
    }

    /**
     * Delete a coupon from user(s) - FIXED: Single confirmation dialog
     * @param {number} couponIndex - Index of the coupon in the displayed list
     * @param {string|string[]} usernames - Optional: specific username(s) to delete from
     */
    async deleteUserCoupon(couponIndex, usernames = null) {
        try {
            const couponCode = this.getCouponCodeByIndex(couponIndex);
            if (!couponCode) {
                this.showNotification('Error: Could not find coupon code', 'error');
                console.error('Could not extract coupon code from index:', couponIndex);
                return;
            }

            // If no specific usernames provided, use current search user
            if (!usernames) {
                const currentUsername = this.getCurrentUsername();
                if (currentUsername) {
                    usernames = currentUsername;
                }
                // If still no usernames, it will delete from ALL users (handled below)
            }

            // FIXED: Single confirmation dialog with appropriate message
            let confirmMessage;
            if (usernames) {
                // Specific user(s)
                const userList = Array.isArray(usernames) ? usernames.join(', ') : usernames;
                confirmMessage = `Are you sure you want to delete coupon "${couponCode}" from user(s): ${userList}?`;
            } else {
                // All users
                confirmMessage = `⚠️ WARNING: No specific user found.\n\nThis will delete coupon "${couponCode}" from ALL users.\n\nAre you sure you want to proceed?`;
            }
            
            // Show single confirmation dialog
            if (!confirm(confirmMessage)) {
                return;
            }

            // Show loading state
            this.setLoadingState(true);

            // Prepare request payload
            const payload = { couponCode };
            if (usernames) {
                payload.usernames = usernames;
            }

            console.log('🚀 Sending delete request:', payload);

            // Get auth token
            const authToken = localStorage.getItem('authToken');
            if (!authToken) {
                this.showNotification('Authentication token not found. Please login again.', 'error');
                return;
            }

            // Make API request to your backend route
            const response = await fetch('/admin/delete_coupons', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                credentials: 'include', // Include cookies for authentication
                body: JSON.stringify(payload)
            });

            console.log('📡 Response status:', response.status);

            let result;
            try {
                result = await response.json();
                console.log('📦 Response data:', result);
            } catch (parseError) {
                console.error('Failed to parse response JSON:', parseError);
                this.showNotification('Invalid response from server', 'error');
                return;
            }

            if (response.ok && result.success) {
                this.showNotification(
                    result.message || `Coupon "${couponCode}" deleted successfully`, 
                    'success'
                );
                
                // Remove the coupon from UI
                this.removeCouponFromUI(couponIndex);
                
                // Update the userCouponsSearch instance if available
                if (window.userCouponsSearch && window.userCouponsSearch.currentUserData) {
                    window.userCouponsSearch.currentUserData.availableCoupons.splice(couponIndex, 1);
                    window.userCouponsSearch.renderUserCouponsTable(window.userCouponsSearch.currentUserData);
                }
                
            } else {
                console.error('❌ Delete failed:', result);
                this.showNotification(
                    result.error || `Failed to delete coupon (${response.status})`, 
                    'error'
                );
                
                // Log additional details for debugging
                if (response.status === 400) {
                    console.log('🔍 Debug info:');
                    console.log('- Coupon Code:', couponCode);
                    console.log('- Usernames:', usernames);
                    console.log('- Payload sent:', payload);
                    console.log('- Auth token present:', !!authToken);
                }
            }

        } catch (error) {
            console.error('💥 Network error deleting coupon:', error);
            this.showNotification('Network error occurred while deleting coupon', 'error');
        } finally {
            this.setLoadingState(false);
        }
    }

    /**
     * Delete coupon from specific user
     * @param {number} couponIndex - Coupon index
     * @param {string} username - Specific username to delete coupon from
     */
    async deleteUserCouponFromUser(couponIndex, username) {
        await this.deleteUserCoupon(couponIndex, username);
    }

    /**
     * Delete coupon from multiple users
     * @param {number} couponIndex - Coupon index
     * @param {string[]} usernames - Array of usernames to delete coupon from
     */
    async deleteUserCouponFromUsers(couponIndex, usernames) {
        await this.deleteUserCoupon(couponIndex, usernames);
    }

    /**
     * Show notification to user
     * @param {string} message - Message to display
     * @param {string} type - Type: 'success', 'error', 'warning', 'info'
     */
    showNotification(message, type = 'info') {
        // Try to use existing notification system from userCouponsSearch
        if (window.userCouponsSearch && typeof window.userCouponsSearch.showMessage === 'function') {
            window.userCouponsSearch.showMessage(message, type);
            return;
        }

        // Fallback: create simple notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            color: white;
            font-weight: bold;
            z-index: 10000;
            min-width: 300px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            animation: slideInRight 0.3s ease-out;
        `;
        
        // Set background color based on type
        const colors = {
            success: '#28a745',
            error: '#dc3545',
            warning: '#ffc107',
            info: '#17a2b8'
        };
        notification.style.backgroundColor = colors[type] || colors.info;
        
        // Add icon based on type
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-triangle',
            warning: 'fas fa-exclamation-circle',
            info: 'fas fa-info-circle'
        };
        
        notification.innerHTML = `
            <i class="${icons[type] || icons.info}"></i>
            <span style="margin-left: 8px;">${message}</span>
        `;
        
        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease-in';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }
        }, 5000);

        // Add click to dismiss
        notification.addEventListener('click', () => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease-in';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }
        });
    }

    /**
     * Set loading state for delete buttons
     * @param {boolean} isLoading - Whether to show loading state
     */
    setLoadingState(isLoading) {
        const deleteButtons = document.querySelectorAll('.coupon-btn-danger');
        deleteButtons.forEach(button => {
            if (isLoading) {
                button.disabled = true;
                button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                button.title = 'Deleting coupon...';
            } else {
                button.disabled = false;
                button.innerHTML = '<i class="fas fa-trash"></i>';
                button.title = 'Delete coupon';
            }
        });
    }

    /**
     * Remove coupon from UI after successful deletion
     * @param {number} couponIndex - Index of the coupon to remove
     */
    removeCouponFromUI(couponIndex) {
        // Method 1: Remove by data attribute
        const couponElement = document.querySelector(`[data-coupon-index="${couponIndex}"]`);
        if (couponElement) {
            const row = couponElement.closest('tr, .coupon-item, .coupon-row');
            if (row) {
                row.style.transition = 'opacity 0.3s ease-out';
                row.style.opacity = '0.5';
                setTimeout(() => {
                    if (row.parentNode) {
                        row.remove();
                    }
                }, 300);
                return;
            }
        }

        // Method 2: Remove by row index
        const couponRows = document.querySelectorAll('#userCouponsTableBody tr');
        if (couponRows[couponIndex]) {
            const row = couponRows[couponIndex];
            row.style.transition = 'opacity 0.3s ease-out';
            row.style.opacity = '0.5';
            setTimeout(() => {
                if (row.parentNode) {
                    row.remove();
                }
            }, 300);
        }
    }

    /**
     * Debug function to test the delete endpoint
     * @param {string} couponCode - Coupon code to test with
     * @param {string} username - Username to test with
     */
    async debugDeleteRequest(couponCode = 'TEST_COUPON', username = 'test_user') {
        try {
            const authToken = localStorage.getItem('authToken');
            console.log('🔧 Debug Delete Request');
            console.log('- Auth token:', authToken ? 'Present' : 'Missing');
            console.log('- Coupon Code:', couponCode);
            console.log('- Username:', username);

            const payload = {
                couponCode: couponCode,
                usernames: username
            };

            console.log('- Payload:', JSON.stringify(payload, null, 2));

            const response = await fetch('/admin/delete_coupons', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                credentials: 'include',
                body: JSON.stringify(payload)
            });

            console.log('- Response Status:', response.status);
            console.log('- Response Headers:', Object.fromEntries(response.headers.entries()));

            const result = await response.json();
            console.log('- Response Body:', result);

            return { response, result };
        } catch (error) {
            console.error('Debug request failed:', error);
            return { error };
        }
    }

    /**
     * Add CSS animations for notifications
     */
    addNotificationStyles() {
        if (!document.getElementById('delete-coupon-styles')) {
            const style = document.createElement('style');
            style.id = 'delete-coupon-styles';
            style.textContent = `
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes slideOutRight {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Initialize delete functionality
let deleteUserCoupons;

document.addEventListener('DOMContentLoaded', function() {
    deleteUserCoupons = new DeleteUserCoupons();
    deleteUserCoupons.addNotificationStyles();
    // Make it globally available
    window.deleteUserCoupons = deleteUserCoupons;
});

// Global functions for backward compatibility
function deleteUserCoupon(couponIndex, usernames = null) {
    if (window.deleteUserCoupons) {
        return window.deleteUserCoupons.deleteUserCoupon(couponIndex, usernames);
    }
}

function deleteUserCouponFromUser(couponIndex, username) {
    if (window.deleteUserCoupons) {
        return window.deleteUserCoupons.deleteUserCouponFromUser(couponIndex, username);
    }
}

function deleteUserCouponFromUsers(couponIndex, usernames) {
    if (window.deleteUserCoupons) {
        return window.deleteUserCoupons.deleteUserCouponFromUsers(couponIndex, usernames);
    }
}

// Debug function - call this in browser console to test
function debugDeleteCoupons(couponCode, username) {
    if (window.deleteUserCoupons) {
        return window.deleteUserCoupons.debugDeleteRequest(couponCode, username);
    }
    console.error('deleteUserCoupons not initialized');
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DeleteUserCoupons;
}
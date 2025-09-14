// Coupons Utility Functions
class CouponsUtils {
    static formatDateTime(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    static showMessage(message, type = 'info') {
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

        // Insert message at the top of the active tab content
        const activeContent = document.querySelector('.coupon-tab-content.active');
        if (activeContent) {
            activeContent.insertBefore(messageDiv, activeContent.firstChild);

            // Auto remove after 3 seconds
            setTimeout(() => {
                messageDiv.remove();
            }, 3000);
        }
    }

    static validateCouponCode(code) {
        if (!code || typeof code !== 'string') {
            return { isValid: false, message: 'Coupon code is required' };
        }

        const trimmedCode = code.trim();
        if (trimmedCode.length < 3) {
            return { isValid: false, message: 'Coupon code must be at least 3 characters long' };
        }

        if (trimmedCode.length > 50) {
            return { isValid: false, message: 'Coupon code cannot exceed 50 characters' };
        }

        // Check for valid characters (alphanumeric and common special characters)
        const validPattern = /^[A-Z0-9_-]+$/;
        if (!validPattern.test(trimmedCode.toUpperCase())) {
            return { isValid: false, message: 'Coupon code can only contain letters, numbers, hyphens, and underscores' };
        }

        return { isValid: true, message: 'Valid coupon code' };
    }

    static validateDiscountValue(value, type) {
        const numValue = parseInt(value);
        
        if (isNaN(numValue) || numValue <= 0) {
            return { isValid: false, message: 'Discount value must be a positive number' };
        }

        if (type === 'percentage' && numValue > 100) {
            return { isValid: false, message: 'Percentage discount cannot exceed 100%' };
        }

        if (type === 'flat' && numValue > 1000) {
            return { isValid: false, message: 'Flat discount cannot exceed $1,000' };
        }

        return { isValid: true, message: 'Valid discount value' };
    }

    static formatCurrency(amount) {
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

    static formatDiscountDisplay(coupon) {
        if (coupon.discountType === 'percentage') {
            return `${coupon.discountValue}%`;
        } else {
            return this.formatCurrency(coupon.discountValue);
        }
    }

    static generateCouponCode(prefix = '', length = 8) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = prefix.toUpperCase();
        
        for (let i = 0; i < length - prefix.length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        
        return result;
    }

    static calculateDiscount(orderValue, coupon) {
        if (orderValue < coupon.minOrderValue) {
            return 0;
        }

        let discount = 0;
        if (coupon.discountType === 'percentage') {
            discount = (orderValue * coupon.discountValue) / 100;
            if (coupon.maxDiscountAmount && discount > coupon.maxDiscountAmount) {
                discount = coupon.maxDiscountAmount;
            }
        } else {
            discount = coupon.discountValue;
        }

        return Math.min(discount, orderValue);
    }

    static isCouponExpired(coupon, expiryDate = null) {
        if (!expiryDate) return false;
        return new Date(expiryDate) < new Date();
    }

    static sanitizeInput(input) {
        if (typeof input !== 'string') return input;
        return input.trim().replace(/[<>]/g, '');
    }
}

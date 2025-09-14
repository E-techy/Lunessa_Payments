// Coupons Form Handler
class CouponsFormHandler {
    constructor(couponsData, onSuccess, onError) {
        this.couponsData = couponsData;
        this.onSuccess = onSuccess;
        this.onError = onError;
    }

    saveCoupon() {
        const form = document.getElementById('couponForm');
        if (!form) return;

        const couponData = {
            couponCode: document.getElementById('couponCode')?.value.trim().toUpperCase(),
            used: document.getElementById('couponUsed')?.value === 'true',
            minOrderValue: parseInt(document.getElementById('couponMinOrderValue')?.value) || 0,
            discountType: document.getElementById('couponDiscountType')?.value,
            discountValue: parseInt(document.getElementById('couponDiscountValue')?.value),
            maxDiscountAmount: parseInt(document.getElementById('couponMaxDiscountAmount')?.value) || null
        };

        // Validation
        const validationResult = this.validateCouponData(couponData);
        if (!validationResult.isValid) {
            this.onError(validationResult.message);
            return;
        }

        // Check for duplicate coupon codes
        if (this.couponsData.couponCodeExists(couponData.couponCode)) {
            this.onError('Coupon code already exists');
            return;
        }

        // Create new coupon
        const newCoupon = this.couponsData.addCoupon(couponData);
        this.clearCreateForm();
        this.onSuccess('Coupon created successfully!');
        
        return newCoupon;
    }

    validateCouponData(couponData, excludeId = null) {
        if (!couponData.couponCode) {
            return { isValid: false, message: 'Coupon code is required' };
        }

        if (!couponData.discountValue || couponData.discountValue <= 0) {
            return { isValid: false, message: 'Valid discount value is required' };
        }

        if (this.couponsData.couponCodeExists(couponData.couponCode, excludeId)) {
            return { isValid: false, message: 'Coupon code already exists' };
        }

        return { isValid: true };
    }

    clearCreateForm() {
        document.getElementById('couponCode').value = '';
        document.getElementById('couponUsed').value = 'false';
        document.getElementById('couponMinOrderValue').value = '';
        document.getElementById('couponDiscountType').value = 'percentage';
        document.getElementById('couponDiscountValue').value = '';
        document.getElementById('couponMaxDiscountAmount').value = '';
    }

    populateEditForm(coupon) {
        if (!coupon) return;

        document.getElementById('couponInlineCreatedAt').value = this.formatDateTime(coupon.createdAt);
        document.getElementById('couponInlineUpdatedAt').value = this.formatDateTime(coupon.updatedAt);
        document.getElementById('couponInlineCode').value = coupon.couponCode;
        document.getElementById('couponInlineUsed').value = coupon.used.toString();
        document.getElementById('couponInlineMinOrder').value = coupon.minOrderValue;
        document.getElementById('couponInlineDiscountType').value = coupon.discountType;
        document.getElementById('couponInlineDiscountValue').value = coupon.discountValue;
        document.getElementById('couponInlineMaxDiscount').value = coupon.maxDiscountAmount || '';
    }

    getEditFormData() {
        return {
            couponCode: document.getElementById('couponInlineCode')?.value.trim().toUpperCase(),
            used: document.getElementById('couponInlineUsed')?.value === 'true',
            minOrderValue: parseInt(document.getElementById('couponInlineMinOrder')?.value) || 0,
            discountType: document.getElementById('couponInlineDiscountType')?.value,
            discountValue: parseInt(document.getElementById('couponInlineDiscountValue')?.value),
            maxDiscountAmount: parseInt(document.getElementById('couponInlineMaxDiscount')?.value) || null
        };
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
}

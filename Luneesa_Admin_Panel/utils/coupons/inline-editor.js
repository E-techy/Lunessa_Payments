// Coupons Inline Editor
class CouponsInlineEditor {
    constructor(couponsData, formHandler, onSuccess, onError) {
        this.couponsData = couponsData;
        this.formHandler = formHandler;
        this.onSuccess = onSuccess;
        this.onError = onError;
        this.currentEditingCoupon = null;
    }

    editCoupon(couponId) {
        const coupon = this.couponsData.getCouponById(couponId);
        if (!coupon) return;

        this.currentEditingCoupon = coupon;
        
        // Show inline edit form
        document.getElementById('couponInlineEditForm').style.display = 'block';
        document.querySelector('.coupons-layout').classList.add('editing');

        // Populate form fields
        this.formHandler.populateEditForm(coupon);
    }

    saveInlineEdit() {
        if (!this.currentEditingCoupon) return;

        const updatedData = this.formHandler.getEditFormData();

        // Validation
        const validationResult = this.formHandler.validateCouponData(updatedData, this.currentEditingCoupon.id);
        if (!validationResult.isValid) {
            this.onError(validationResult.message);
            return;
        }

        // Update coupon
        const updatedCoupon = this.couponsData.updateCoupon(this.currentEditingCoupon.id, updatedData);
        if (updatedCoupon) {
            this.cancelInlineEdit();
            this.onSuccess('Coupon updated successfully!');
            return updatedCoupon;
        } else {
            this.onError('Failed to update coupon');
        }
    }

    cancelInlineEdit() {
        this.currentEditingCoupon = null;
        document.getElementById('couponInlineEditForm').style.display = 'none';
        document.querySelector('.coupons-layout').classList.remove('editing');
    }

    isEditing() {
        return this.currentEditingCoupon !== null;
    }

    getCurrentEditingCoupon() {
        return this.currentEditingCoupon;
    }
}

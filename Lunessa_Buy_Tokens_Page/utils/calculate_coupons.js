// utils/calculate_coupons.js
/**
 * Applies the coupon to the calculation
 * @param {object} couponData - { couponCode, discountType, discountValue, minAmount }
 */
function applyCouponToCalculation(couponData) {
  if (!currentCalculation) return;

  const { couponCode, discountType, discountValue, minAmount } = couponData;

  if (currentCalculation.basePrice < minAmount) {
    return showCouponError(`❌ Minimum purchase amount for this coupon is ₹${minAmount}`);
  }

  // Remove old discounts
  if (typeof removeCurrentDiscounts === "function") removeCurrentDiscounts();
  if (typeof resetOffers === "function") resetOffers();

  // Apply discount
  if (typeof applyCouponDiscount === "function") {
    const couponDiscount = applyCouponDiscount(discountType, discountValue, couponCode);

    if (typeof updatePricingBreakdown === "function") updatePricingBreakdown();

    // Update UI
    const appliedCouponCode = document.getElementById('appliedCouponCode');
    if (appliedCouponCode) appliedCouponCode.textContent = couponCode;

    document.getElementById('couponInputSection').style.display = 'none';
    document.getElementById('appliedCouponSection').style.display = 'block';
    document.getElementById('couponInput').value = '';

    const totalSaved = (currentCalculation.baseDiscount || 0) + couponDiscount;
    const msg = currentCalculation.baseDiscount > 0
      ? `🎉 Coupon ${couponCode} applied! Total saved: ₹${totalSaved.toFixed(2)}`
      : `🎉 Coupon ${couponCode} applied! You saved: ₹${couponDiscount.toFixed(2)}`;

    if (typeof showNotification === "function") showNotification(msg, "success");
    else showCouponSuccess(msg);
  } else {
    console.error("❌ applyCouponDiscount function not found");
    showCouponError("❌ Error applying coupon. Please refresh and try again.");
  }
}

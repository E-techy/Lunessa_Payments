// utils/verify_coupons_from_customer.js
document.addEventListener("DOMContentLoaded", () => {
  /** -------------------------
   * Elements
   * ------------------------- */
  const couponToggle = document.getElementById("couponToggle");
  const couponInputSection = document.getElementById("couponInputSection");
  const couponInput = document.getElementById("couponInput");
  const applyCouponBtn = document.getElementById("applyCouponBtn");
  const couponFeedback = document.getElementById("couponFeedback");
  const appliedCouponSection = document.getElementById("appliedCouponSection");
  const removeCouponBtn = document.querySelector(".remove-coupon-btn");

  if (!couponToggle || !couponInputSection) return;

  /** -------------------------
   * Global Helper Functions
   * ------------------------- */

  // Remove coupon from UI (global)
  window.removeCouponFromUI = function() {
    if (typeof removeCoupon === "function") removeCoupon();
    else {
      if (typeof removeCurrentDiscounts === "function") removeCurrentDiscounts();
      if (typeof updatePricingBreakdown === "function") updatePricingBreakdown();
      appliedCouponSection.style.display = 'none';
      couponInputSection.style.display = 'none';
      couponFeedback.style.display = 'none';
      if (typeof showNotification === 'function') showNotification('Coupon removed', 'success');
    }
    if (currentCalculation) currentCalculation.couponApplied = false;
  };

  // Show error message
  window.showCouponError = (msg) => {
    couponFeedback.textContent = msg;
    couponFeedback.style.color = "#ef4444";
    couponFeedback.style.display = "block";
    setTimeout(() => (couponFeedback.style.display = "none"), 4000);
  };

  // Show success message
  window.showCouponSuccess = (msg) => {
    couponFeedback.textContent = msg;
    couponFeedback.style.color = "#10b981";
    couponFeedback.style.display = "block";
    setTimeout(() => (couponFeedback.style.display = "none"), 3000);
  };

  // Apply button loading state
  window.setApplyButtonLoading = (isLoading) => {
    if (!applyCouponBtn) return;
    applyCouponBtn.disabled = isLoading;
    applyCouponBtn.textContent = isLoading ? "Verifying..." : "Apply";
    applyCouponBtn.style.opacity = isLoading ? "0.7" : "1";
  };

  /** -------------------------
   * Coupon UI Logic
   * ------------------------- */

  // Toggle coupon input section
  couponToggle.addEventListener("click", () => {
    const isHidden = couponInputSection.style.display === "none" || couponInputSection.style.display === "";
    couponInputSection.style.display = isHidden ? "block" : "none";
    if (isHidden) {
      couponFeedback.textContent = "";
      couponFeedback.style.display = "none";
    }
  });

  // Apply coupon on click or Enter key
  if (applyCouponBtn) applyCouponBtn.addEventListener("click", () => verifyCouponCode(couponInput.value));
  if (couponInput) couponInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") verifyCouponCode(couponInput.value);
  });

  // Remove coupon button
  if (removeCouponBtn) removeCouponBtn.addEventListener("click", removeCouponFromUI);

  /** -------------------------
   * Verify Coupon Backend
   * ------------------------- */
  async function verifyCouponCode(couponCode) {
    if (!couponCode) return showCouponError("⚠️ Please enter a coupon code.");
    if (!currentCalculation || currentCalculation.basePrice === 0) return showCouponError("⚠️ Please calculate pricing first.");

    setApplyButtonLoading(true);

    try {
      const res = await fetch("/verify_coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          couponCode: couponCode.trim().toUpperCase(),
          totalAmount: currentCalculation.totalPrice || currentCalculation.basePrice,
          modelType: currentCalculation.modelName || "unknown"
        }),
        credentials: "include",
      });
      const data = await res.json();

      if (res.ok && data.success) {
        applyCouponToCalculation(data.data);
      } else {
        const errorMessage = data.error || "Invalid coupon code";
        showCouponError(`❌ ${errorMessage}`);
        applyCouponBtn.classList.add('shake');
        setTimeout(() => applyCouponBtn.classList.remove('shake'), 500);
      }
    } catch (err) {
      console.error(err);
      showCouponError("⚠️ Server error. Please try again later.");
    } finally {
      setApplyButtonLoading(false);
    }
  }
});

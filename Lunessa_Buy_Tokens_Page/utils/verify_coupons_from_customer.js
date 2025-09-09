// utils/verify_coupons_from_customer.js
document.addEventListener("DOMContentLoaded", () => {
  const couponToggle = document.getElementById("couponToggle");
  const couponInputSection = document.getElementById("couponInputSection");
  const couponInput = document.getElementById("couponInput");
  const applyCouponBtn = document.getElementById("applyCouponBtn");
  const couponFeedback = document.getElementById("couponFeedback");
  const appliedCouponSection = document.getElementById("appliedCouponSection");
  const removeCouponBtn = document.querySelector(".remove-coupon-btn");

  if (!couponToggle || !couponInputSection) {
    console.warn("⚠️ Coupon elements not found in DOM");
    return;
  }

  // ✅ Toggle coupon input section (show/hide)
  couponToggle.addEventListener("click", () => {
    const isHidden =
      couponInputSection.style.display === "none" ||
      couponInputSection.style.display === "";

    couponInputSection.style.display = isHidden ? "block" : "none";

    // Clear old feedback when toggled open
    if (isHidden) {
      couponFeedback.textContent = "";
      couponFeedback.style.display = "none";
    }
  });

  // ✅ Apply coupon on button click
  if (applyCouponBtn) {
    applyCouponBtn.addEventListener("click", async () => {
      await verifyCouponCode();
    });
  }

  // ✅ Apply coupon on Enter key press
  if (couponInput) {
    couponInput.addEventListener("keypress", async (e) => {
      if (e.key === "Enter") {
        await verifyCouponCode();
      }
    });
  }

  // ✅ Remove coupon functionality
  if (removeCouponBtn) {
    removeCouponBtn.addEventListener("click", () => {
      removeCouponFromUI();
    });
  }

  /**
   * Main function to verify coupon code
   */
  async function verifyCouponCode() {
    const couponCode = couponInput.value.trim().toUpperCase();

    // Validate input
    if (!couponCode) {
      showCouponError("⚠️ Please enter a coupon code.");
      return;
    }

    // Check if pricing is calculated
    if (!currentCalculation || currentCalculation.basePrice === 0) {
      showCouponError("⚠️ Please calculate pricing first before applying a coupon.");
      return;
    }

    // Check if a coupon is already applied
    if (currentCalculation.appliedCoupon) {
      showCouponError("⚠️ A coupon is already applied. Remove it first to apply a new one.");
      return;
    }

    // Show loading state
    setApplyButtonLoading(true);

    try {
      const response = await fetch("/verify_coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          couponCode: couponCode,
          totalAmount: currentCalculation.totalPrice || currentCalculation.basePrice,
          modelType: currentCalculation.modelName || "unknown"
        }),
        credentials: "include", // ensures cookie (JWT) is sent
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Coupon is valid - apply it
        applyCouponToCalculation(data.data);
      } else {
        // Coupon is invalid
        const errorMessage = data.error || "Invalid coupon code";
        showCouponError(`❌ ${errorMessage}`);
        
        // Add shake animation to button
        applyCouponBtn.classList.add('shake');
        setTimeout(() => applyCouponBtn.classList.remove('shake'), 500);
      }
    } catch (err) {
      console.error("⚠️ Coupon verification error:", err);
      showCouponError("⚠️ Server error. Please try again later.");
    } finally {
      setApplyButtonLoading(false);
    }
  }

  /**
   * Apply verified coupon to the current calculation
   */
  function applyCouponToCalculation(couponData) {
    const { couponCode, discountType, discountValue, minAmount } = couponData;

    // Check minimum amount requirement
    if (currentCalculation.basePrice < minAmount) {
      showCouponError(`❌ Minimum purchase amount for this coupon is ₹${minAmount}`);
      return;
    }

    // Remove any existing offer/coupon first
    if (typeof removeCurrentDiscounts === 'function') {
      removeCurrentDiscounts();
    }
    if (typeof resetOffers === 'function') {
      resetOffers();
    }

    // Apply coupon discount using the existing calculation system
    if (typeof applyCouponDiscount === 'function') {
      const couponDiscount = applyCouponDiscount(discountType, discountValue, couponCode);
      
      // Update pricing breakdown UI
      if (typeof updatePricingBreakdown === 'function') {
        updatePricingBreakdown();
      }
      
      // Show applied coupon in UI
      showAppliedCouponInUI(couponCode);
      
      // Calculate total savings
      const totalSaved = (currentCalculation.baseDiscount || 0) + couponDiscount;
      const successMessage = currentCalculation.baseDiscount > 0 
        ? `🎉 Coupon ${couponCode} applied! Total saved: ₹${totalSaved.toFixed(2)}`
        : `🎉 Coupon ${couponCode} applied! You saved: ₹${couponDiscount.toFixed(2)}`;
      
      // Show success notification
      if (typeof showNotification === 'function') {
        showNotification(successMessage, 'success');
      } else {
        showCouponSuccess(successMessage);
      }
    } else {
      console.error("❌ applyCouponDiscount function not found");
      showCouponError("❌ Error applying coupon. Please refresh and try again.");
    }
  }

  /**
   * Show applied coupon in UI and hide input section
   */
  function showAppliedCouponInUI(couponCode) {
    const appliedCouponCode = document.getElementById('appliedCouponCode');
    
    if (appliedCouponCode) {
      appliedCouponCode.textContent = couponCode;
    }
    
    // Hide input section and show applied section
    couponInputSection.style.display = 'none';
    appliedCouponSection.style.display = 'block';
    
    // Clear input
    couponInput.value = '';
  }

  /**
   * Remove coupon from UI and recalculate
   */
  function removeCouponFromUI() {
    // Use existing remove coupon function if available
    if (typeof removeCoupon === 'function') {
      removeCoupon();
    } else {
      // Fallback manual removal
      if (typeof removeCurrentDiscounts === 'function') {
        removeCurrentDiscounts();
      }
      if (typeof updatePricingBreakdown === 'function') {
        updatePricingBreakdown();
      }
      
      // Reset UI
      appliedCouponSection.style.display = 'none';
      couponInputSection.style.display = 'none';
      couponFeedback.style.display = 'none';
      
      if (typeof showNotification === 'function') {
        showNotification('Coupon removed', 'success');
      }
    }
  }

  /**
   * Show coupon error message
   */
  function showCouponError(message) {
    couponFeedback.textContent = message;
    couponFeedback.style.color = "#ef4444";
    couponFeedback.style.display = "block";
    
    // Auto-hide error after 4 seconds
    setTimeout(() => {
      couponFeedback.style.display = "none";
    }, 4000);
  }

  /**
   * Show coupon success message
   */
  function showCouponSuccess(message) {
    couponFeedback.textContent = message;
    couponFeedback.style.color = "#10b981";
    couponFeedback.style.display = "block";
    
    // Auto-hide success after 3 seconds
    setTimeout(() => {
      couponFeedback.style.display = "none";
    }, 3000);
  }

  /**
   * Set loading state for apply button
   */
  function setApplyButtonLoading(isLoading) {
    if (isLoading) {
      applyCouponBtn.disabled = true;
      applyCouponBtn.textContent = "Verifying...";
      applyCouponBtn.style.opacity = "0.7";
    } else {
      applyCouponBtn.disabled = false;
      applyCouponBtn.textContent = "Apply";
      applyCouponBtn.style.opacity = "1";
    }
  }
});

// Add shake animation CSS if not already present
if (!document.querySelector('#couponShakeStyles')) {
  const style = document.createElement('style');
  style.id = 'couponShakeStyles';
  style.textContent = `
    .shake {
      animation: shake 0.5s ease-in-out;
    }
    
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
    }
  `;
  document.head.appendChild(style);
}

// utils/verify_coupons_from_customer.js
document.addEventListener("DOMContentLoaded", () => {
  const couponToggle = document.getElementById("couponToggle");
  const couponInputSection = document.getElementById("couponInputSection");
  const couponInput = document.getElementById("couponInput");
  const applyCouponBtn = document.getElementById("applyCouponBtn");
  const couponFeedback = document.getElementById("couponFeedback");

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
    }
  });

  // ✅ Apply coupon on button click
  if (applyCouponBtn) {
    applyCouponBtn.addEventListener("click", async () => {
      const couponCode = couponInput.value.trim();

      if (!couponCode) {
        couponFeedback.textContent = "⚠️ Please enter a coupon code.";
        couponFeedback.style.color = "red";
        return;
      }

      // Show loading
      applyCouponBtn.disabled = true;
      applyCouponBtn.textContent = "Applying...";

      try {
        const response = await fetch("/verify_coupons", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ couponCode }),
          credentials: "include", // ensures cookie (JWT) is sent
        });

        const data = await response.json();

        if (data.success) {
          console.log("✅ Coupon verified:", data);
          couponFeedback.textContent = `🎉 Coupon applied: ${data.data.couponCode}`;
          couponFeedback.style.color = "green";
        } else {
          console.warn("❌ Coupon error:", data.error);
          couponFeedback.textContent = `❌ ${data.error}`;
          couponFeedback.style.color = "red";
        }
      } catch (err) {
        console.error("⚠️ Fetch error:", err);
        couponFeedback.textContent = "⚠️ Server error. Try again later.";
        couponFeedback.style.color = "red";
      } finally {
        // Reset button
        applyCouponBtn.disabled = false;
        applyCouponBtn.textContent = "Apply";
      }
    });
  }
});

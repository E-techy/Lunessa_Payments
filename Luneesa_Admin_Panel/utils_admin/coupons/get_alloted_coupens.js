// User Coupons API Fetch Function
async function fetchUserCoupons(username) {
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

    console.log("✅ User Coupons Data:");
    console.log("Username:", result.data.username);
    console.log("Available Coupons:", result.data.availableCoupons);
    console.log("Offers Used:", result.data.offersUsed);

    // 🔹 Nicely log each coupon
    if (result.data.availableCoupons && result.data.availableCoupons.length > 0) {
      result.data.availableCoupons.forEach((coupon, index) => {
        console.log(`\nCoupon #${index + 1}`);
        console.table(coupon); // pretty print coupon object
      });
    }

    return result.data;

  } catch (err) {
    console.error("⚠️ Error fetching coupons:", err);
    throw err;
  }
}
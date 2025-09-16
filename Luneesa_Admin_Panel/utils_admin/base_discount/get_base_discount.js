/**
 * Auto-fetch Base Discount Data from server on page load
 */
async function fetchBaseDiscountData() {
  try {
    const response = await fetch("/admin/view_base_discount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // If using Authorization header instead of cookies:
        // "Authorization": `Bearer ${yourToken}`
      },
      credentials: "include", // ✅ send cookies automatically if present
    });

    const result = await response.json();
    console.log("📦 Base Discount Data Response:", result);

    if (result.success) {
      console.log("✅ Base Discount Data:", result.data);
    } else {
      console.error("❌ Error fetching base discount:", result.error);
    }
  } catch (err) {
    console.error("❌ Network error while fetching base discount:", err);
  }
}

// 🔥 Run automatically when page loads
window.addEventListener("DOMContentLoaded", fetchBaseDiscountData);

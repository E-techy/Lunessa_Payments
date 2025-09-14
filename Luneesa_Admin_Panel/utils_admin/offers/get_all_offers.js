// ✅ Fetch all offers (requires valid admin JWT in cookies or Authorization header)
async function fetchAdminOffers() {
    try {
    const response = await fetch("/admin/offers?action=get", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        // If you’re not storing JWT in cookies, include it here:
        // "Authorization": "Bearer " + yourToken
        },
        credentials: "include", // 🔑 ensures cookies are sent with request
    });

    const result = await response.json();

    if (result.success) {
        console.log("✅ Offers fetched successfully:", result.data);

        if (result.data.length > 0) {
        result.data.forEach((offer, idx) => {
            // console.log(`Offer ${idx + 1}:`, offer);
        });
        } else {
        console.log("ℹ️ No offers found in the database.");
        }
    } else {
        console.warn("⚠️ Failed to fetch offers:", result.error);
    }
    } catch (err) {
    console.error("❌ Error fetching offers:", err);
    }
}

// 🚀 Auto-fetch when page loads
document.addEventListener("DOMContentLoaded", fetchAdminOffers);
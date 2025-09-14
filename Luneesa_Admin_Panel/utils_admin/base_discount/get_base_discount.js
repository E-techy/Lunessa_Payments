async function fetchBaseDiscount() {
try {
    const response = await fetch("/base_discount", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    if (data.success) {
    console.log("✅ Base discount data loaded:", data.data);

    // Pretty-print discount levels
    if (data.data.levels && data.data.levels.length > 0) {
        console.log("📊 Discount Levels:");
        data.data.levels.forEach((level, index) => {
        console.log(
            ` Level ${index + 1}: Min ₹${level.minOrderValue}, Max ₹${level.maxOrderValue}, ` +
            `${level.discountType} Discount = ${level.discountValue}`
        );
        });
    }
    } else {
    console.warn("⚠️ No active discount slab found:", data.error);
    }
} catch (error) {
    console.error("❌ Error fetching base discount:", error);
}
}

// ✅ Run automatically when page loads
document.addEventListener("DOMContentLoaded", fetchBaseDiscount);

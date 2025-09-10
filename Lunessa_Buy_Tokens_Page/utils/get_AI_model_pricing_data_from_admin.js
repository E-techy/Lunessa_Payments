document.addEventListener("DOMContentLoaded", async () => {
try {
    const response = await fetch("http://localhost:3004/AI_models_pricing_data", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    });

    const result = await response.json();

    if (result.success) {
    console.log("✅ AI Models Pricing Data:", result.data);
    } else {
    console.error("❌ Failed to fetch models:", result.message);
    }
} catch (error) {
    console.error("❌ Error fetching models:", error);
}
});


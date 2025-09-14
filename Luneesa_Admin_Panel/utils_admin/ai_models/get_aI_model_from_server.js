document.addEventListener("DOMContentLoaded", async () => {
try {
    // Fetch all AI models pricing data
    const response = await fetch("/AI_models_pricing_data", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({}), // empty = fetch all models
    });

    const result = await response.json();

    if (result.success) {
    console.log("✅ AI Models Pricing Data:", result.data);
    } else {
    console.error("❌ Error:", result.message);
    }
} catch (error) {
    console.error("❌ Request failed:", error);
}
});


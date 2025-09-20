document.addEventListener("DOMContentLoaded", () => {
    const fetchBtn = document.getElementById("razorpay-fetch-orders-btn");

    if (!fetchBtn) {
        console.error("❌ Fetch Orders button not found in DOM");
        return;
    }

    fetchBtn.addEventListener("click", async () => {
        console.log("🔍 Fetch Orders clicked");

        // Collect values from form
        const orderId = document.getElementById("razorpay-order-id")?.value.trim();
        const username = document.getElementById("razorpay-username")?.value.trim();
        const paymentMethod = document.getElementById("razorpay-payment-method")?.value;
        const fromDate = document.getElementById("razorpay-from-date")?.value;
        const toDate = document.getElementById("razorpay-to-date")?.value;
        const count = document.getElementById("razorpay-count-limit")?.value;
        const skip = document.getElementById("razorpay-skip-offset")?.value;

        // Convert datetime-local → Unix timestamp (seconds)
        const from = fromDate ? Math.floor(new Date(fromDate).getTime() / 1000) : undefined;
        const to = toDate ? Math.floor(new Date(toDate).getTime() / 1000) : undefined;

        // Build request payload
        const payload = {
            orderId: orderId || undefined,
            allOrders: !orderId || !!username,
            username: username || undefined,
            paymentMethod: paymentMethod || undefined,
            from,
            to,
            count: count ? Number(count) : undefined,
            skip: skip ? Number(skip) : undefined
        };

        console.log("📤 Sending Payload:", payload);

        // Show results div
        const resultsSection = document.getElementById("razorpay-results-section");
        if (resultsSection) {
            resultsSection.style.display = "block";
        }

        try {
            const response = await fetch("/admin/fetch_razorpay_orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            // ✅ Log result in console
            console.log("📦 Razorpay Orders API Response:", result);

        } catch (err) {
            console.error("❌ Error fetching orders:", err);
        }
    });
});

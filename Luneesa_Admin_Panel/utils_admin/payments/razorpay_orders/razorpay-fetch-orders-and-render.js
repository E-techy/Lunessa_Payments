document.addEventListener("DOMContentLoaded", () => {
    const fetchBtn = document.getElementById("razorpay-fetch-orders-btn");
    const toggleJsonBtn = document.getElementById("toggle-json-response-btn");

    if (!fetchBtn) {
        console.error("❌ Fetch Orders button not found in DOM");
        return;
    }

    // JSON toggle functionality
    if (toggleJsonBtn) {
        toggleJsonBtn.addEventListener("click", () => {
            const jsonContent = document.getElementById("json-response-content");
            const icon = toggleJsonBtn.querySelector("i");
            
            if (jsonContent.style.display === "none") {
                jsonContent.style.display = "block";
                toggleJsonBtn.innerHTML = '<i class="fas fa-eye-slash"></i> Hide JSON';
            } else {
                jsonContent.style.display = "none";
                toggleJsonBtn.innerHTML = '<i class="fas fa-eye"></i> Show JSON';
            }
        });
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

        // Show loading state
        showLoadingState();

        // Show results section
        const resultsSection = document.getElementById("razorpay-orders-display-section");
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
            
            // Log result in console
            console.log("📦 Razorpay Orders API Response:", result);

            // Hide loading state
            hideLoadingState();

            // Display the results
            if (result.success && result.data) {
                // 🔧 FIX: Handle both single order object and array of orders
                let ordersArray;
                if (Array.isArray(result.data)) {
                    // Multiple orders returned
                    ordersArray = result.data;
                } else {
                    // Single order returned (when searching by orderId)
                    ordersArray = [result.data];
                }

                if (ordersArray.length > 0) {
                    displayOrdersTable(ordersArray);
                    displayJsonResponse(result);
                } else {
                    showNoDataState();
                    displayJsonResponse(result);
                }
            } else {
                showNoDataState();
                displayJsonResponse(result);
            }

        } catch (err) {
            console.error("❌ Error fetching orders:", err);
            hideLoadingState();
            showErrorState(err.message);
        }
    });

    // Utility Functions
    function showLoadingState() {
        const loading = document.getElementById("razorpay-orders-loading");
        const table = document.getElementById("razorpay-orders-table");
        const noData = document.getElementById("razorpay-orders-no-data");
        
        if (loading) loading.style.display = "flex";
        if (table) table.style.display = "none";
        if (noData) noData.style.display = "none";
    }

    function hideLoadingState() {
        const loading = document.getElementById("razorpay-orders-loading");
        if (loading) loading.style.display = "none";
    }

    function showNoDataState() {
        const noData = document.getElementById("razorpay-orders-no-data");
        const table = document.getElementById("razorpay-orders-table");
        
        if (noData) noData.style.display = "flex";
        if (table) table.style.display = "none";
    }

    function showErrorState(errorMessage) {
        const noData = document.getElementById("razorpay-orders-no-data");
        const table = document.getElementById("razorpay-orders-table");
        
        if (noData) {
            noData.style.display = "flex";
            noData.innerHTML = `
                <i class="fas fa-exclamation-triangle" style="color: #ef4444;"></i>
                <span>Error fetching orders: ${errorMessage}</span>
            `;
        }
        if (table) table.style.display = "none";
    }

    function displayOrdersTable(orders) {
        const tableBody = document.getElementById("razorpay-orders-table-body");
        const table = document.getElementById("razorpay-orders-table");
        const noData = document.getElementById("razorpay-orders-no-data");

        if (!tableBody) return;

        // Clear existing rows
        tableBody.innerHTML = "";

        // Show table, hide no data message
        if (table) table.style.display = "table";
        if (noData) noData.style.display = "none";

        // Populate table rows
        orders.forEach(order => {
            const row = document.createElement("tr");
            
            // Parse payment info to get username if available
            let parsedUsername = "N/A";
            try {
                if (order.notes && order.notes.paymentInfo) {
                    const paymentInfo = JSON.parse(order.notes.paymentInfo);
                    parsedUsername = paymentInfo.u || "N/A";
                } else if (order.notes && order.notes.userDetails) {
                    const userDetails = JSON.parse(order.notes.userDetails);
                    parsedUsername = userDetails.username || "N/A";
                }
            } catch (e) {
                console.warn("Could not parse payment info for order:", order.id);
            }

            row.innerHTML = `
                <td><span class="order-id">${order.id}</span></td>
                <td><span class="order-amount">${formatAmount(order.amount)}</span></td>
                <td><span class="order-status-badge ${getStatusClass(order.status)}">${order.status}</span></td>
                <td><span class="order-username">${parsedUsername}</span></td>
                <td>N/A</td>
                <td><span class="order-date">${formatDate(order.created_at)}</span></td>
                <td><span class="order-receipt">${order.receipt}</span></td>
            `;
            
            tableBody.appendChild(row);
        });
    }

    function displayJsonResponse(data) {
        const jsonDataElement = document.getElementById("json-response-data");
        if (jsonDataElement) {
            jsonDataElement.textContent = JSON.stringify(data, null, 2);
        }
    }

    function formatAmount(amountInCents) {
        // Convert cents to dollars and format
        const amount = amountInCents / 100;
        return amount.toFixed(2);
    }

    function formatDate(unixTimestamp) {
        const date = new Date(unixTimestamp * 1000);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    }

    function getStatusClass(status) {
        switch (status.toLowerCase()) {
            case 'paid': return 'status-paid';
            case 'created': return 'status-created';
            case 'failed': return 'status-failed';
            default: return 'status-created';
        }
    }
});
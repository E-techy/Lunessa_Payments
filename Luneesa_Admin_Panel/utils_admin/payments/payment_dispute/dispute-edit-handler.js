document.addEventListener("DOMContentLoaded", () => {
    let currentDisputeData = null;
    
    // Add event listener for modify buttons (this will be called when dispute table is rendered)
    document.addEventListener("click", (event) => {
        if (event.target.closest(".dispute-modify-btn")) {
            const btn = event.target.closest(".dispute-modify-btn");
            const disputeId = btn.getAttribute("data-dispute-id");
            const orderId = btn.getAttribute("data-order-id");
            const row = btn.closest("tr");
            
            if (row) {
                openEditDisputeTab(row, disputeId, orderId);
            }
        }
    });
    
    function openEditDisputeTab(row, disputeId, orderId) {
        // Get the modify button to extract all data attributes
        const modifyBtn = row.querySelector(".dispute-modify-btn");
        
        if (!modifyBtn) {
            console.error("Could not find modify button in row");
            return;
        }
        
        // Extract data from button attributes
        const username = modifyBtn.getAttribute("data-username") || "";
        const orderIdText = modifyBtn.getAttribute("data-order-id") || orderId;
        const disputeComment = modifyBtn.getAttribute("data-dispute-comment") || "";
        const resolvedComment = modifyBtn.getAttribute("data-resolved-comment") || "";
        const isResolved = modifyBtn.getAttribute("data-resolved") === "true";
        
        // Store current dispute data
        currentDisputeData = {
            disputeId: disputeId,
            orderId: orderIdText,
            username: username,
            resolved: isResolved,
            disputeComment: disputeComment,
            resolvedComment: resolvedComment
        };
        
        // Hide the dispute table section
        const disputeTableSection = document.getElementById("dispute-table-display-section");
        if (disputeTableSection) {
            disputeTableSection.style.display = "none";
        }

        // Show the edit section
        const editSection = document.getElementById("dispute-edit-display-section");
        if (editSection) {
            editSection.style.display = "block";
            
            // Populate the form
            document.getElementById("dispute-edit-username").value = username;
            document.getElementById("dispute-edit-orderid").value = orderIdText;
            document.getElementById("dispute-edit-resolved").value = isResolved.toString();
            
            // Set the dispute comment (read-only)
            document.getElementById("dispute-edit-comment").value = disputeComment;
            
            // Set resolved comment if exists
            document.getElementById("dispute-edit-resolved-comment").value = resolvedComment;
            
            // Scroll to the edit section
            editSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        
        console.log("Opening edit tab for dispute:", currentDisputeData);
    }
    
    // Fetch Order button handler
    document.addEventListener("click", async (event) => {
        if (event.target.closest("#dispute-fetch-order-btn")) {
            const orderIdInput = document.getElementById("dispute-edit-orderid");
            const orderId = orderIdInput.value.trim();
            
            if (!orderId) {
                console.warn("No Order ID provided");
                alert("Please enter an Order ID");
                return;
            }
            
            console.log("Fetching order for ID:", orderId);
            
            // Show loading state
            const fetchBtn = document.getElementById("dispute-fetch-order-btn");
            const originalText = fetchBtn.innerHTML;
            fetchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Fetching...';
            fetchBtn.disabled = true;
            
            try {
                // Prepare request body
                const requestBody = {
                    orderId: orderId
                };
                
                // Make API call
                const response = await fetch("/admin/fetch_razorpay_orders", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include", // Include cookies for authentication
                    body: JSON.stringify(requestBody)
                });
                
                const result = await response.json();
                
                if (response.ok && result.success) {
                    console.log("=== RAZORPAY ORDER FETCHED ===");
                    console.log("Order Data:", result.data);
                    console.log("=== END ORDER DATA ===");
                    
                    // Render the order data in the dispute-readonly-section
                    renderOrderDetails(result.data);
                    
                    // Show success message
                    console.log(`✅ Order ${orderId} fetched successfully! Check console for details.`);
                    
                    // Optional: Show a brief success notification
                    const successMsg = document.createElement("div");
                    successMsg.style.cssText = `
                        position: fixed; top: 20px; right: 20px; z-index: 9999;
                        background: #10b981; color: white; padding: 12px 20px;
                        border-radius: 6px; font-size: 14px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    `;
                    successMsg.innerHTML = `<i class="fas fa-check"></i> Order data loaded successfully!`;
                    document.body.appendChild(successMsg);
                    
                    setTimeout(() => {
                        if (document.body.contains(successMsg)) {
                            document.body.removeChild(successMsg);
                        }
                    }, 3000);
                    
                } else {
                    console.error("Failed to fetch order:", result.error || "Unknown error");
                    console.log(`❌ Failed to fetch order ${orderId}:`, result.error || "Unknown error");
                }
            } catch (error) {
                console.error("Error fetching order:", error);
                console.log(`❌ Network error while fetching order ${orderId}:`, error.message);
            } finally {
                // Reset button state
                fetchBtn.innerHTML = originalText;
                fetchBtn.disabled = false;
            }
        }
    });

    // Function to render order details
    function renderOrderDetails(orderData) {
        const orderDetailsSection = document.getElementById("dispute-order-details-section");
        const orderInfoContainer = document.getElementById("dispute-order-info");
        
        if (!orderDetailsSection || !orderInfoContainer) {
            console.error("Order details section not found");
            return;
        }
        
        // Parse payment info if it exists
        let paymentInfo = null;
        let userDetails = null;
        
        if (orderData.notes) {
            try {
                if (orderData.notes.paymentInfo) {
                    paymentInfo = JSON.parse(orderData.notes.paymentInfo);
                }
                if (orderData.notes.userDetails) {
                    userDetails = JSON.parse(orderData.notes.userDetails);
                }
            } catch (error) {
                console.warn("Error parsing order notes:", error);
            }
        }
        
        // Create order details HTML
        const orderDetailsHTML = `
            <div class="order-details-grid">
                <div class="order-basic-info">
                    <h5><i class="fas fa-info-circle"></i> Basic Information</h5>
                    <div class="order-info-row">
                        <div class="order-info-item">
                            <label>Order ID:</label>
                            <span class="order-value">${orderData.id}</span>
                        </div>
                        <div class="order-info-item">
                            <label>Status:</label>
                            <span class="order-status order-status-${orderData.status}">${orderData.status}</span>
                        </div>
                    </div>
                    <div class="order-info-row">
                        <div class="order-info-item">
                            <label>Amount:</label>
                            <span class="order-value">$${(orderData.amount / 100).toFixed(2)}</span>
                        </div>
                        <div class="order-info-item">
                            <label>Currency:</label>
                            <span class="order-value">${orderData.currency}</span>
                        </div>
                    </div>
                    <div class="order-info-row">
                        <div class="order-info-item">
                            <label>Amount Paid:</label>
                            <span class="order-value">$${(orderData.amount_paid / 100).toFixed(2)}</span>
                        </div>
                        <div class="order-info-item">
                            <label>Amount Due:</label>
                            <span class="order-value">$${(orderData.amount_due / 100).toFixed(2)}</span>
                        </div>
                    </div>
                    <div class="order-info-row">
                        <div class="order-info-item">
                            <label>Created At:</label>
                            <span class="order-value">${new Date(orderData.created_at * 1000).toLocaleString()}</span>
                        </div>
                        <div class="order-info-item">
                            <label>Receipt:</label>
                            <span class="order-value">${orderData.receipt || 'N/A'}</span>
                        </div>
                    </div>
                    <div class="order-info-row">
                        <div class="order-info-item">
                            <label>Attempts:</label>
                            <span class="order-value">${orderData.attempts}</span>
                        </div>
                        <div class="order-info-item">
                            <label>Entity:</label>
                            <span class="order-value">${orderData.entity}</span>
                        </div>
                    </div>
                </div>
                
                ${orderData.notes && orderData.notes.orderType ? `
                <div class="order-notes-info">
                    <h5><i class="fas fa-sticky-note"></i> Order Notes</h5>
                    <div class="order-info-item">
                        <label>Order Type:</label>
                        <span class="order-value">${orderData.notes.orderType}</span>
                    </div>
                </div>
                ` : ''}
                
                ${paymentInfo ? `
                <div class="order-payment-info">
                    <h5><i class="fas fa-credit-card"></i> Payment Information</h5>
                    <div class="order-info-row">
                        <div class="order-info-item">
                            <label>Username:</label>
                            <span class="order-value">${paymentInfo.u || 'N/A'}</span>
                        </div>
                        <div class="order-info-item">
                            <label>Agent ID:</label>
                            <span class="order-value">${paymentInfo.a || 'N/A'}</span>
                        </div>
                    </div>
                    <div class="order-info-row">
                        <div class="order-info-item">
                            <label>Tokens:</label>
                            <span class="order-value">${paymentInfo.t || 'N/A'}</span>
                        </div>
                        <div class="order-info-item">
                            <label>Amount ($):</label>
                            <span class="order-value">$${paymentInfo.amt || 'N/A'}</span>
                        </div>
                    </div>
                    <div class="order-info-row">
                        <div class="order-info-item">
                            <label>Base Price:</label>
                            <span class="order-value">$${paymentInfo.bp || 'N/A'}</span>
                        </div>
                        <div class="order-info-item">
                            <label>Price Per Token:</label>
                            <span class="order-value">$${paymentInfo.pp || 'N/A'}</span>
                        </div>
                    </div>
                    <div class="order-info-row">
                        <div class="order-info-item">
                            <label>Base Discount:</label>
                            <span class="order-value">$${paymentInfo.bd || 'N/A'}</span>
                        </div>
                        <div class="order-info-item">
                            <label>Promo Discount:</label>
                            <span class="order-value">$${paymentInfo.pd || 'N/A'}</span>
                        </div>
                    </div>
                    ${paymentInfo.pt && paymentInfo.pc ? `
                    <div class="order-info-row">
                        <div class="order-info-item">
                            <label>Promo Type:</label>
                            <span class="order-value">${paymentInfo.pt}</span>
                        </div>
                        <div class="order-info-item">
                            <label>Promo Code:</label>
                            <span class="order-value">${paymentInfo.pc}</span>
                        </div>
                    </div>
                    ` : ''}
                </div>
                ` : ''}
            </div>
        `;
        
        // Update the container
        orderInfoContainer.innerHTML = orderDetailsHTML;
        
        // Show the order details section
        orderDetailsSection.style.display = "block";
    }
    
    // Allot Tokens button handler
    document.addEventListener("click", (event) => {
        if (event.target.closest("#dispute-allot-tokens-btn")) {
            if (currentDisputeData) {
                console.log("Allot tokens clicked for dispute:", currentDisputeData);
                // Placeholder - no API call as requested
                alert(`Allot Tokens functionality for:\nUsername: ${currentDisputeData.username}\nOrder ID: ${currentDisputeData.orderId}\n\nThis will open token allocation when implemented.`);
            }
        }
    });
    
    // Update Dispute button handler
    document.addEventListener("click", (event) => {
        if (event.target.closest("#dispute-update-btn")) {
            if (currentDisputeData) {
                const resolvedValue = document.getElementById("dispute-edit-resolved").value;
                const resolvedComment = document.getElementById("dispute-edit-resolved-comment").value.trim();
                
                console.log("Update dispute clicked:", {
                    disputeId: currentDisputeData.disputeId,
                    orderId: currentDisputeData.orderId,
                    username: currentDisputeData.username,
                    resolved: resolvedValue === "true",
                    resolvedComment: resolvedComment
                });
                
                // Placeholder - no API call as requested
                alert(`Update Dispute:\nDispute ID: ${currentDisputeData.disputeId}\nResolved: ${resolvedValue === "true" ? "Yes" : "No"}\nComment: ${resolvedComment || "No comment"}\n\nThis will update the dispute when implemented.`);
            }
        }
    });
    
    // Cancel Edit button handler
    document.addEventListener("click", (event) => {
        if (event.target.closest("#dispute-cancel-edit-btn")) {
            closeEditDisputeTab();
        }
    });
    
    function closeEditDisputeTab() {
        const editSection = document.getElementById("dispute-edit-display-section");
        if (editSection) {
            editSection.style.display = "none";
        }
        
        // Show the dispute table section again
        const disputeTableSection = document.getElementById("dispute-table-display-section");
        if (disputeTableSection) {
            disputeTableSection.style.display = "block";
        }
        
        // Clear form data
        document.getElementById("dispute-edit-username").value = "";
        document.getElementById("dispute-edit-orderid").value = "";
        document.getElementById("dispute-edit-resolved").value = "false";
        document.getElementById("dispute-edit-comment").value = "";
        document.getElementById("dispute-edit-resolved-comment").value = "";
        
        // Clear current dispute data
        currentDisputeData = null;
        
        console.log("Edit dispute tab closed");
    }
});
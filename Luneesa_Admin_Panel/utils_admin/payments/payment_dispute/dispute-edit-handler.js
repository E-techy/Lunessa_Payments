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
                    
                    // Show success message
                    console.log(`✅ Order ${orderId} fetched successfully! Check console for details.`);
                    
                    // Optional: Show a brief success notification
                    const successMsg = document.createElement("div");
                    successMsg.style.cssText = `
                        position: fixed; top: 20px; right: 20px; z-index: 9999;
                        background: #10b981; color: white; padding: 12px 20px;
                        border-radius: 6px; font-size: 14px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    `;
                    successMsg.innerHTML = `<i class="fas fa-check"></i> Order data logged to console!`;
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
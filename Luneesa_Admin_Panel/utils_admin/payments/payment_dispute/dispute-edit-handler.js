document.addEventListener("DOMContentLoaded", () => {
    let currentDisputeData = null;
    let orderFetched = false;
    
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
        
        // Reset the order fetched flag
        orderFetched = false;
        
        // Disable the Allot Tokens button initially
        const allotTokensBtn = document.getElementById("dispute-allot-tokens-btn");
        if (allotTokensBtn) {
            allotTokensBtn.disabled = true;
            allotTokensBtn.classList.add("dispute-btn-disabled");
        }
        
        // Hide the dispute table section
        const disputeTableSection = document.getElementById("dispute-table-display-section");
        if (disputeTableSection) {
            disputeTableSection.style.display = "none";
        }
    
        // Populate the form
        document.getElementById("dispute-edit-username").value = username;
        document.getElementById("dispute-edit-orderid").value = orderIdText;
        document.getElementById("dispute-edit-resolved").value = isResolved.toString();
        
        // ADD THIS LINE: Clear Agent ID initially
        document.getElementById("dispute-edit-agentid").value = "";
        
        // Set the dispute comment (read-only)
        document.getElementById("dispute-edit-comment").value = disputeComment;
        
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
            
        // Clear any previous order details when opening a new dispute
        clearOrderDetails();
        
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
                    
                    // Set the flag that order has been fetched
                    orderFetched = true;
                    
                    // Enable the Allot Tokens button
                    const allotTokensBtn = document.getElementById("dispute-allot-tokens-btn");
                    if (allotTokensBtn) {
                        allotTokensBtn.disabled = false;
                        allotTokensBtn.classList.remove("dispute-btn-disabled");
                    }
                    
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
                    
                    // Keep the button disabled on error
                    orderFetched = false;
                    const allotTokensBtn = document.getElementById("dispute-allot-tokens-btn");
                    if (allotTokensBtn) {
                        allotTokensBtn.disabled = true;
                        allotTokensBtn.classList.add("dispute-btn-disabled");
                    }
                }
            } catch (error) {
                console.error("Error fetching order:", error);
                console.log(`❌ Network error while fetching order ${orderId}:`, error.message);
                
                // Keep the button disabled on error
                orderFetched = false;
                const allotTokensBtn = document.getElementById("dispute-allot-tokens-btn");
                if (allotTokensBtn) {
                    allotTokensBtn.disabled = true;
                    allotTokensBtn.classList.add("dispute-btn-disabled");
                }
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
        
        // ADD THIS: Update the Agent ID field when order is fetched
        if (paymentInfo && paymentInfo.a) {
            const agentIdInput = document.getElementById("dispute-edit-agentid");
            if (agentIdInput) {
                agentIdInput.value = paymentInfo.a;
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
            // Check if order has been fetched first
            if (!orderFetched) {
                alert("Please fetch order details first before allocating tokens.");
                return;
            }
            
            const tokenSection = document.getElementById("dispute-token-allocation-section");
            const successSection = document.getElementById("dispute-token-success-display-section");
            const usernameInput = document.getElementById("dispute-edit-username");
            const agentIdInput = document.getElementById("dispute-edit-agentid");
            
            if (tokenSection) {
                if (tokenSection.style.display === "none" || !tokenSection.style.display) {
                    // Show the token allocation section
                    tokenSection.style.display = "block";
                    
                    // ADDED: Hide the success section when opening token allocation
                    if (successSection) {
                        successSection.style.display = "none";
                    }
                    
                    // Pre-populate the username (non-editable)
                    const tokenUsernameInput = document.getElementById("token-alloc-username");
                    const tokenAgentIdInput = document.getElementById("token-alloc-agentid");
                    
                    if (tokenUsernameInput) {
                        tokenUsernameInput.value = usernameInput.value;
                    }
                    
                    if (tokenAgentIdInput) {
                        tokenAgentIdInput.value = agentIdInput.value;
                    }
                    
                    // Scroll to token section
                    tokenSection.scrollIntoView({ behavior: "smooth", block: "center" });
                    
                    console.log("Token allocation section opened");
                } else {
                    // Hide the token allocation section
                    tokenSection.style.display = "none";
                    console.log("Token allocation section closed");
                }
            }
        }
    });

    // Token Allocation Submit button handler
    document.addEventListener("click", async (event) => {
        if (event.target.closest("#token-allocation-submit-btn")) {
            const username = document.getElementById("token-alloc-username").value;
            const agentId = document.getElementById("token-alloc-agentid").value;
            const modelName = document.getElementById("token-alloc-modelname").value.trim();
            const tokensToAdd = document.getElementById("token-alloc-tokens").value;
            
            if (!modelName) {
                alert("Please enter a model name");
                return;
            }
            
            if (!tokensToAdd || isNaN(parseInt(tokensToAdd))) {
                alert("Please enter a valid number for tokens to add/deduct");
                return;
            }
            
            if (!username) {
                alert("Username is required. Please fetch order first.");
                return;
            }
            
            if (!agentId) {
                alert("Agent ID is required. Please fetch order first.");
                return;
            }
            
            // Show loading state
            const submitBtn = document.getElementById("token-allocation-submit-btn");
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Allocating...';
            submitBtn.disabled = true;
            
            try {
                const requestBody = {
                    username: username,
                    agentId: agentId,
                    modelName: modelName,
                    tokensToAdd: parseInt(tokensToAdd)
                };
                
                console.log("Token allocation request:", requestBody);
                
                // Make API call to your route
                const response = await fetch("/admin/allot_tokens_to_agents", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include", // Include cookies for authentication
                    body: JSON.stringify(requestBody)
                });
                
                const result = await response.json();
                
                if (response.ok && result.success) {
                    console.log("✅ Token allocation successful:", result);
                    
                    // Hide the token allocation section
                    const tokenSection = document.getElementById("dispute-token-allocation-section");
                    if (tokenSection) {
                        tokenSection.style.display = "none";
                    }
                    
                    // Show and populate the success section
                    displayTokenSuccessSection(result.data);
                    
                    // Show success message
                    const successMsg = document.createElement("div");
                    successMsg.style.cssText = `
                        position: fixed; top: 20px; right: 20px; z-index: 9999;
                        background: #10b981; color: white; padding: 12px 20px;
                        border-radius: 6px; font-size: 14px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    `;
                    successMsg.innerHTML = `<i class="fas fa-check"></i> ${tokensToAdd > 0 ? 'Added' : 'Deducted'} ${Math.abs(tokensToAdd)} tokens successfully!`;
                    document.body.appendChild(successMsg);
                    
                    setTimeout(() => {
                        if (document.body.contains(successMsg)) {
                            document.body.removeChild(successMsg);
                        }
                    }, 4000);
                    
                    // Clear the token allocation form
                    document.getElementById("token-alloc-modelname").value = "";
                    document.getElementById("token-alloc-tokens").value = "";
                    
                } else {
                    console.error("❌ Token allocation failed:", result.error || "Unknown error");
                    
                    // Show error message
                    const errorMsg = document.createElement("div");
                    errorMsg.style.cssText = `
                        position: fixed; top: 20px; right: 20px; z-index: 9999;
                        background: #ef4444; color: white; padding: 12px 20px;
                        border-radius: 6px; font-size: 14px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    `;
                    errorMsg.innerHTML = `<i class="fas fa-times"></i> Token allocation failed!`;
                    document.body.appendChild(errorMsg);
                    
                    setTimeout(() => {
                        if (document.body.contains(errorMsg)) {
                            document.body.removeChild(errorMsg);
                        }
                    }, 4000);
                    
                    alert(`❌ ERROR: ${result.error || "Failed to allocate tokens. Please try again."}`);
                }
                
            } catch (error) {
                console.error("❌ Network error during token allocation:", error);
                
                // Show network error message
                const errorMsg = document.createElement("div");
                errorMsg.style.cssText = `
                    position: fixed; top: 20px; right: 20px; z-index: 9999;
                    background: #ef4444; color: white; padding: 12px 20px;
                    border-radius: 6px; font-size: 14px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                `;
                errorMsg.innerHTML = `<i class="fas fa-times"></i> Network error occurred!`;
                document.body.appendChild(errorMsg);
                
                setTimeout(() => {
                    if (document.body.contains(errorMsg)) {
                        document.body.removeChild(errorMsg);
                    }
                }, 4000);
                
                alert(`❌ NETWORK ERROR: ${error.message}`);
                
            } finally {
                // Reset button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        }
    });

    // Token Allocation Cancel button handler
    document.addEventListener("click", (event) => {
        if (event.target.closest("#token-allocation-cancel-btn")) {
            const tokenSection = document.getElementById("dispute-token-allocation-section");
            
            // Clear the form
            document.getElementById("token-alloc-modelname").value = "";
            document.getElementById("token-alloc-tokens").value = "";
            
            // Hide the section
            if (tokenSection) {
                tokenSection.style.display = "none";
            }
            
            console.log("Token allocation cancelled");
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
        // Reset order fetched state
        orderFetched = false;
        
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
        
        // ADD THESE LINES: Clear token allocation form
        document.getElementById("dispute-edit-agentid").value = "";
        document.getElementById("token-alloc-modelname").value = "";
        document.getElementById("token-alloc-tokens").value = "";
        
        // Clear any displayed order details
        clearOrderDetails();
        
        // Hide success section
        const successSection = document.getElementById("dispute-token-success-display-section");
        if (successSection) {
            successSection.style.display = "none";
        }
        
        // Clear current dispute data
        currentDisputeData = null;
        
        console.log("Edit dispute tab closed");
    }
    
    // Function to clear order details
    function clearOrderDetails() {
        const orderDetailsSection = document.getElementById("dispute-order-details-section");
        const orderInfoContainer = document.getElementById("dispute-order-info");
        
        if (orderDetailsSection) {
            orderDetailsSection.style.display = "none";
        }
        
        if (orderInfoContainer) {
            orderInfoContainer.innerHTML = "";
        }
        
        // ADD THIS: Clear agent ID
        const agentIdInput = document.getElementById("dispute-edit-agentid");
        if (agentIdInput) {
            agentIdInput.value = "";
        }
        
        // ADD THIS: Hide token allocation section
        const tokenSection = document.getElementById("dispute-token-allocation-section");
        if (tokenSection) {
            tokenSection.style.display = "none";
        }
        
        // Hide success section
        const successSection = document.getElementById("dispute-token-success-display-section");
        if (successSection) {
            successSection.style.display = "none";
        }
        
        console.log("Order details cleared");
    }
    
    // Function to display token success section
    function displayTokenSuccessSection(data) {
        const successSection = document.getElementById("dispute-token-success-display-section");
        
        if (!successSection) {
            console.error("Success section not found");
            return;
        }
        
        // Populate agent information
        document.getElementById("success-agent-id").textContent = data.agentId || "N/A";
        document.getElementById("success-agent-name").textContent = data.agentName || "N/A";
        
        // Populate token balances
        const tokenBalancesContainer = document.getElementById("success-token-balances");
        if (data.tokenBalances && data.tokenBalances.length > 0) {
            const balancesHTML = data.tokenBalances.map(balance => `
                <div class="token-balance-card ${balance.status === 'active' ? 'active' : ''}">
                    <div class="token-balance-model">${balance.modelName}</div>
                    <div class="token-balance-tokens">Tokens: ${balance.availableTokens.toLocaleString()}</div>
                    <div class="token-balance-status ${balance.status}">${balance.status}</div>
                </div>
            `).join('');
            tokenBalancesContainer.innerHTML = balancesHTML;
        } else {
            tokenBalancesContainer.innerHTML = '<p style="color: #6b7280;">No token balances available</p>';
        }
        
        // Populate using model information
        const usingModelContainer = document.getElementById("success-using-model");
        if (data.usingModel) {
            const usingModelHTML = `
                <div class="using-model-row">
                    <span class="using-model-label">Model Name:</span>
                    <span class="using-model-value">${data.usingModel.modelName}</span>
                </div>
                <div class="using-model-row">
                    <span class="using-model-label">Available Tokens:</span>
                    <span class="using-model-value">${data.usingModel.availableTokens.toLocaleString()}</span>
                </div>
                <div class="using-model-row">
                    <span class="using-model-label">Status:</span>
                    <span class="using-model-value token-balance-status ${data.usingModel.status}">${data.usingModel.status}</span>
                </div>
            `;
            usingModelContainer.innerHTML = usingModelHTML;
        } else {
            usingModelContainer.innerHTML = '<p style="color: #6b7280;">No active model information available</p>';
        }
        
        // Show the success section
        successSection.style.display = "block";
        
        // Scroll to success section
        successSection.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    // Token Success Close button handler
    document.addEventListener("click", (event) => {
        if (event.target.closest("#token-success-close-btn")) {
            const successSection = document.getElementById("dispute-token-success-display-section");
            if (successSection) {
                successSection.style.display = "none";
            }
            console.log("Token success section closed");
        }
    });
});
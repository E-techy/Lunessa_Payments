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
    document.addEventListener("click", (event) => {
        if (event.target.closest("#dispute-fetch-order-btn")) {
            if (currentDisputeData) {
                console.log("Fetch order clicked for:", currentDisputeData.orderId);
                // Placeholder - no API call as requested
                alert(`Fetch Order functionality for Order ID: ${currentDisputeData.orderId}\n\nThis will fetch order details when implemented.`);
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
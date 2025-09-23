document.addEventListener("DOMContentLoaded", () => {
    const fetchBtn = document.getElementById("dispute-fetch-btn");
    if (!fetchBtn) return;

    fetchBtn.addEventListener("click", async () => {
        const usernameInput = document.getElementById("dispute-username").value.trim();
        const resolvedSelect = document.getElementById("dispute-resolved-filter").value;

        const payload = {};
        if (usernameInput) payload.username = usernameInput;
        if (resolvedSelect === "resolved") payload.resolved = true;
        else if (resolvedSelect === "unresolved") payload.resolved = false;

        try {
            const response = await fetch("/admin/fetch_disputes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            console.log("Fetch Disputes Response:", data);
            
            // Render the disputes in table format
            if (data.success) {
                renderDisputesTable(data.data, usernameInput);
            } else {
                showError("Failed to fetch disputes: " + (data.message || "Unknown error"));
            }
        } catch (err) {
            console.error("Error fetching disputes:", err);
            showError("Error fetching disputes: " + err.message);
        }
    });

    function renderDisputesTable(disputeData, hasUsernameFilter) {
        // First, check if disputes table section already exists, if not create it
        let disputeTableSection = document.getElementById("dispute-table-display-section");
        
        if (!disputeTableSection) {
            // Create the table section after the dispute filters section
            const filtersSection = document.querySelector(".dispute-filters-section");
            disputeTableSection = document.createElement("div");
            disputeTableSection.className = "dispute-table-display-section";
            disputeTableSection.id = "dispute-table-display-section";
            
            disputeTableSection.innerHTML = `
                <div class="portal-title-section">
                    <i class="fas fa-table"></i>
                    <h4>Dispute Results</h4>
                </div>
                
                <div class="dispute-table-container">
                    <table class="dispute-table" id="dispute-table">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Order ID</th>
                                <th>Resolved</th>
                                <th>Created</th>
                                <th>Updated</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="dispute-table-body">
                        </tbody>
                    </table>
                    
                    <div class="dispute-loading" id="dispute-loading" style="display: none;">
                        <i class="fas fa-spinner fa-spin"></i>
                        <span>Loading disputes...</span>
                    </div>
                    
                    <div class="dispute-no-data" id="dispute-no-data" style="display: none;">
                        <div class="dispute-not-found">
                            <i class="fas fa-info-circle"></i>
                            <span>No disputes found</span>
                        </div>
                    </div>
                </div>
            `;
            
            filtersSection.parentNode.appendChild(disputeTableSection);
        }

        // Show the table section
        disputeTableSection.style.display = "block";
        
        const tableBody = document.getElementById("dispute-table-body");
        const noDataDiv = document.getElementById("dispute-no-data");
        
        // Clear existing rows
        tableBody.innerHTML = "";
        noDataDiv.style.display = "none";
        
        // Handle different data structures based on API response
        let disputes = [];
        
        if (hasUsernameFilter) {
            // When username is provided, data is an object with disputes array
            if (disputeData && disputeData.disputes && Array.isArray(disputeData.disputes)) {
                disputes = disputeData.disputes.map(dispute => ({
                    ...dispute,
                    username: disputeData.username
                }));
            }
        } else {
            // When no username, data is an array of objects, each with disputes
            if (Array.isArray(disputeData)) {
                disputeData.forEach(userDisputes => {
                    if (userDisputes.disputes && Array.isArray(userDisputes.disputes)) {
                        userDisputes.disputes.forEach(dispute => {
                            disputes.push({
                                ...dispute,
                                username: userDisputes.username
                            });
                        });
                    }
                });
            }
        }
        
        if (disputes.length === 0) {
            noDataDiv.style.display = "block";
            return;
        }
        
        // Render each dispute row
        disputes.forEach((dispute, index) => {
            const row = document.createElement("tr");
            row.setAttribute("data-dispute-id", dispute.disputeId);
            row.className = "dispute-row";
            
            // Format date
            const createdDate = new Date(dispute.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            });
            
            // Format updated date
            const updatedDate = new Date(dispute.updatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            });

            // Resolved status badge
            const resolvedBadge = dispute.resolved 
                ? '<span class="dispute-status-badge dispute-resolved">Resolved</span>'
                : '<span class="dispute-status-badge dispute-unresolved">Unresolved</span>';
            
            row.innerHTML = `
                <td class="dispute-cell-username">${escapeHtml(dispute.username || "N/A")}</td>
                <td class="dispute-cell-orderid">
                    <span class="dispute-order-id">${escapeHtml(dispute.orderId)}</span>
                </td>
                <td class="dispute-cell-resolved">${resolvedBadge}</td>
                <td class="dispute-cell-created">${createdDate}</td>
                <td class="dispute-cell-updated">${updatedDate}</td>
                <td class="dispute-cell-actions">
                    <button class="dispute-action-btn dispute-modify-btn" 
                            id="dispute-modify-btn-${index}" 
                            title="Modify dispute"
                            data-dispute-id="${dispute.disputeId}"
                            data-order-id="${dispute.orderId}"
                            data-username="${dispute.username || ''}"
                            data-dispute-comment="${escapeHtml(dispute.disputeComment || '')}"
                            data-resolved="${dispute.resolved || false}"
                            data-resolved-comment="${escapeHtml(dispute.resolvedComment || '')}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="dispute-action-btn dispute-delete-btn" 
                            id="dispute-delete-btn-${index}" 
                            title="Delete dispute"
                            data-dispute-id="${dispute.disputeId}"
                            data-order-id="${dispute.orderId}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    function showError(message) {
        // Create or update error display
        let errorDiv = document.getElementById("dispute-error-display");
        
        if (!errorDiv) {
            const filtersSection = document.querySelector(".dispute-filters-section");
            errorDiv = document.createElement("div");
            errorDiv.id = "dispute-error-display";
            errorDiv.className = "dispute-error-message";
            filtersSection.parentNode.appendChild(errorDiv);
        }
        
        errorDiv.innerHTML = `
            <div class="error-content">
                <i class="fas fa-exclamation-circle"></i>
                <span>${escapeHtml(message)}</span>
                <button class="error-close-btn" onclick="this.parentElement.parentElement.style.display='none'">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        errorDiv.style.display = "block";
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            if (errorDiv) errorDiv.style.display = "none";
        }, 5000);
    }

    function escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return String(text).replace(/[&<>"']/g, function(m) { return map[m]; });
    }
});
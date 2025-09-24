// Global variable to store agents data
let agentsData = {
    "success": false,
    "agents": []
};

// Function to fetch agents data from database
async function fetchAgentsFromDatabase() {
    try {
        const response = await fetch("/view_agent_tokens", {
            method: "POST",
            credentials: "include", // send JWT cookie
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Agent token details fetched:", data);
        
        // Validate data structure
        if (!data || typeof data !== 'object') {
            throw new Error('Invalid data format received from server');
        }
        
        if (!data.hasOwnProperty('success')) {
            throw new Error('Missing success field in response');
        }
        
        if (!data.success) {
            throw new Error(data.message || 'Server returned unsuccessful response');
        }
        
        if (!Array.isArray(data.agents)) {
            throw new Error('Agents data is not in expected array format');
        }
        
        // Update global agentsData
        agentsData = data;
        
        // Trigger table re-render if the DOM is ready
        if (document.readyState === 'complete') {
            renderAgentsTable();
        }
        
        return data;
    } catch (error) {
        console.error("Error fetching agent tokens:", error);
        
        // Set error state
        agentsData = {
            "success": false,
            "agents": [],
            "error": error.message
        };
        
        // Show error message in UI if DOM is ready
        if (document.readyState === 'complete') {
            showErrorMessage(error.message);
            // Add event listener for retry button
            setTimeout(() => {
                const retryBtn = document.getElementById('retry-btn');
                if (retryBtn) {
                    retryBtn.addEventListener('click', refreshAgentsData);
                }
            }, 100);
        }
        
        throw error;
    }
}

// Function to show error message in UI
function showErrorMessage(message) {
    const tbody = document.querySelector('tbody');
    if (tbody) {
        tbody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align: center; padding: 3rem;">
                    <div class="error-container">
                        <div style="font-size: 2rem; margin-bottom: 1rem; color: #dc3545;">⚠️</div>
                        <div style="font-size: 1.1rem; margin-bottom: 0.5rem; color: #dc3545; font-weight: 600;">Error Loading Data</div>
                        <div style="font-size: 0.9rem; opacity: 0.8; margin-bottom: 1.5rem; color: #6b7280;">${message}</div>
                        <button id="retry-btn" class="retry-button">
                            <svg style="width: 16px; height: 16px; margin-right: 8px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                            </svg>
                            Retry
                        </button>
                    </div>
                </td>
            </tr>
        `;
        
        // Add event listener for the retry button
        setTimeout(() => {
            const retryBtn = document.getElementById('retry-btn');
            if (retryBtn) {
                retryBtn.addEventListener('click', refreshAgentsData);
            }
        }, 10);
    }
}

// Function to show loading state
function showLoadingState() {
    const tbody = document.querySelector('tbody');
    if (tbody) {
        tbody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align: center; padding: 3rem;">
                    <div class="loading-container">
                        <div class="loading-spinner"></div>
                        <div style="font-size: 1.1rem; margin-top: 1rem; color: #374151;">Loading agents...</div>
                        <div style="font-size: 0.9rem; opacity: 0.7; margin-top: 0.5rem;">Please wait while we fetch your data</div>
                    </div>
                </td>
            </tr>
        `;
    }
}

// Function to animate table rows
function animateTableRows() {
    const rows = document.querySelectorAll('tbody tr:not(.details-row)');
    rows.forEach((row, index) => {
        row.style.opacity = '0';
        row.style.transform = 'translateY(10px)';
        row.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        setTimeout(() => {
            row.style.opacity = '1';
            row.style.transform = 'translateY(0)';
        }, index * 50);
    });
}

// Function to refresh data manually
async function refreshAgentsData() {
    showLoadingState();
    try {
        await fetchAgentsFromDatabase();
        renderAgentsTable();
        
        // Show success message briefly if no agents found
        const tbody = document.querySelector('tbody');
        if (tbody && agentsData.agents && agentsData.agents.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="4" style="text-align: center; padding: 2rem; color: #059669;">
                        <div style="font-size: 1.1rem; margin-bottom: 0.5rem;">✅ Data refreshed successfully</div>
                        <div style="font-size: 0.9rem; opacity: 0.7;">No agents found</div>
                    </td>
                </tr>
            `;
        }
        
        // Animate rows if we have data
        if (agentsData.agents && agentsData.agents.length > 0) {
            setTimeout(() => {
                animateTableRows();
            }, 10);
        }
    } catch (error) {
        console.error('Failed to refresh data:', error);
        // Error will be shown by fetchAgentsFromDatabase
    }
}
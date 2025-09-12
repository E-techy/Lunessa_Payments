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
                <td colspan="4" style="text-align: center; padding: 2rem; color: #dc3545;">
                    <div style="font-size: 1.1rem; margin-bottom: 0.5rem;">⚠️ Error Loading Data</div>
                    <div style="font-size: 0.9rem; opacity: 0.8;">${message}</div>
                    <button id="retry-btn" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">
                        Retry
                    </button>
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
                <td colspan="4" style="text-align: center; padding: 2rem;">
                    <div style="font-size: 1.1rem; margin-bottom: 0.5rem;">🔄 Loading agents...</div>
                    <div style="font-size: 0.9rem; opacity: 0.7;">Fetching data from database</div>
                </td>
            </tr>
        `;
    }
}

// Function to refresh data manually
async function refreshAgentsData() {
    showLoadingState();
    try {
        await fetchAgentsFromDatabase();
        renderAgentsTable();
        
        // Show success message briefly
        const tbody = document.querySelector('tbody');
        if (tbody && agentsData.agents.length === 0) {
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
        if (agentsData.agents.length > 0) {
            setTimeout(() => {
                animateTableRows();
            }, 10);
        }
    } catch (error) {
        console.error('Failed to refresh data:', error);
        // Error will be shown by fetchAgentsFromDatabase
    }
}
// Main application logic and initialization

function populateAgentDetails(agentId) {
    const detailsContainer = document.getElementById(`agent-details-${agentId}`);
    const agent = findAgentById(agentId);
    
    if (!agent || !detailsContainer) return;
    
    // Render agent details HTML
    const agentHtml = createAgentDetailsHTML(agent);
    detailsContainer.innerHTML = agentHtml;
    
    // Add event listeners for toggle switches
    addToggleEventListeners(agent);
}

function renderAgentsTable() {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';

    // Handle empty or invalid data
    if (!agentsData || !agentsData.agents || !Array.isArray(agentsData.agents)) {
        tbody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align: center; padding: 2rem;">
                    <div class="empty-state">
                        <div style="font-size: 2rem; margin-bottom: 1rem; color: #9ca3af;">📭</div>
                        <div style="font-size: 1.1rem; margin-bottom: 0.5rem; color: #374151; font-weight: 600;">No Data Available</div>
                        <div style="font-size: 0.9rem; opacity: 0.7; color: #6b7280;">No agents found or data not loaded</div>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    if (agentsData.agents.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align: center; padding: 2rem;">
                    <div class="empty-state">
                        <div style="font-size: 2rem; margin-bottom: 1rem; color: #9ca3af;">🤖</div>
                        <div style="font-size: 1.1rem; margin-bottom: 0.5rem; color: #374151; font-weight: 600;">No Agents Found</div>
                        <div style="font-size: 0.9rem; opacity: 0.7; color: #6b7280;">No agents are currently available</div>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    agentsData.agents.forEach(agent => {
        // Create main agent row
        const row = document.createElement('tr');
        row.innerHTML = createAgentRowHTML(agent);
        tbody.appendChild(row);
        
        // Create expandable details row
        const detailsRow = document.createElement('tr');
        detailsRow.id = `details-${agent.agentId}`;
        detailsRow.style.display = 'none';
        detailsRow.className = 'details-row';
        detailsRow.innerHTML = createDetailsRowHTML(agent);
        tbody.appendChild(detailsRow);
        
        // Add event listeners after creating elements
        addRowEventListeners(agent);
    });
}

function animateTableRows() {
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach((row, index) => {
        row.style.opacity = '0';
        row.style.transform = 'translateY(20px)';
        setTimeout(() => {
            row.style.transition = 'all 0.5s ease';
            row.style.opacity = '1';
            row.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Initialize the application
async function initializeApp() {
    // Show loading state
    showLoadingState();
    
    try {
        // Fetch data from database
        await fetchAgentsFromDatabase();
        
        // Render table with fetched data
        renderAgentsTable();
        
        // Animate rows after rendering if we have data
        if (agentsData.agents && agentsData.agents.length > 0) {
            setTimeout(() => {
                animateTableRows();
            }, 10);
        }
    } catch (error) {
        console.error('Failed to initialize app:', error);
        // Error message will be shown by fetchAgentsFromDatabase
    }
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// Add event listener for refresh button after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const refreshBtn = document.getElementById('refresh-data-btn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', refreshAgentsData);
    }
});

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
function initializeApp() {
    renderAgentsTable();
    
    // Animate rows after rendering
    setTimeout(() => {
        animateTableRows();
    }, 10);
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

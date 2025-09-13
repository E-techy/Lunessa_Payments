// Event handlers and user interaction functions

function toggleModelStatus(agentId, modelName, currentStatus) {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    
    // Update the data
    if (updateModelStatus(agentId, modelName, newStatus)) {
        // Track the change
        addPendingChange(agentId, modelName, newStatus);
        
        // Update the UI
        populateAgentDetails(agentId);
        showSaveButton(agentId);
    }
}

function toggleViewer(agentId) {
    const detailsRow = document.getElementById(`details-${agentId}`);
    const viewerToggle = document.getElementById(`viewer-toggle-${agentId}`);
    
    if (hasExpandedRow(agentId)) {
        // Collapse
        detailsRow.style.display = 'none';
        viewerToggle.classList.remove('expanded');
        removeExpandedRow(agentId);
    } else {
        // First, collapse any other open rows
        getAllExpandedRows().forEach(openAgentId => {
            const openRow = document.getElementById(`details-${openAgentId}`);
            const openToggle = document.getElementById(`viewer-toggle-${openAgentId}`);
            if (openRow && openToggle) {
                openRow.style.display = 'none';
                openToggle.classList.remove('expanded');
            }
        });
        clearExpandedRows();
        
        // Expand this row
        detailsRow.style.display = 'table-row';
        viewerToggle.classList.add('expanded');
        addExpandedRow(agentId);
        
        // Populate the details content
        populateAgentDetails(agentId);
    }
}

function handlePurchase(agentName, agentId) {
    alert(`Purchase tokens for ${agentName} (${agentId})`);
}

function addToggleEventListeners(agent) {
    agent.tokenBalances.forEach((model, index) => {
        const toggleId = `toggle-${agent.agentId}-${model.modelName}-${index}`;
        const toggle = document.getElementById(toggleId);
        if (toggle) {
            toggle.addEventListener('change', function() {
                const agentId = this.dataset.agentId;
                const modelName = this.dataset.modelName;
                const currentStatus = this.dataset.currentStatus;
                toggleModelStatus(agentId, modelName, currentStatus);
            });
        }
    });
}

function addRowEventListeners(agent) {
    const viewerToggle = document.getElementById(`viewer-toggle-${agent.agentId}`);
    const buyBtn = document.getElementById(`buy-btn-${agent.agentId}`);
    
    if (viewerToggle) {
        viewerToggle.addEventListener('click', function() {
            const agentId = this.dataset.agentId;
            toggleViewer(agentId);
        });
    }
    
    if (buyBtn) {
        buyBtn.addEventListener("click", function () {
        const agentId = this.dataset.agentId;

        // Redirect to /buy_agent_tokens with agentId in query
        window.location.href = `/buy_agent_tokens?agentId=${encodeURIComponent(agentId)}`;
    });
    }
}

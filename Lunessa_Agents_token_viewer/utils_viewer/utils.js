// Utility functions for formatting and data manipulation

function formatDate(dateString) {
    try {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch (error) {
        return dateString;
    }
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
}

function findAgentById(agentId) {
    return agentsData.agents.find(a => a.agentId === agentId);
}

function findModelByName(agent, modelName) {
    return agent.tokenBalances.find(m => m.modelName === modelName);
}

function updateModelStatus(agentId, modelName, newStatus) {
    const agent = findAgentById(agentId);
    if (agent) {
        const model = findModelByName(agent, modelName);
        if (model) {
            model.status = newStatus;
            
            // Update the usingModel based on active status
            updateUsingModel(agentId);
            
            return true;
        }
    }
    return false;
}

function updateUsingModel(agentId) {
    const agent = findAgentById(agentId);
    if (agent) {
        // Find the currently active model
        const activeModel = agent.tokenBalances.find(model => model.status === 'active');
        
        if (activeModel) {
            // Set the active model as the using model
            agent.usingModel = {
                modelName: activeModel.modelName,
                status: 'active',
                availableTokens: activeModel.availableTokens,
                createdAt: activeModel.createdAt,
                updatedAt: activeModel.updatedAt
            };
        } else {
            // No active model, set usingModel to null or empty
            agent.usingModel = null;
        }
        
        // Update the main table row to reflect the change
        updateMainTableRow(agentId);
    }
}

function updateMainTableRow(agentId) {
    const agent = findAgentById(agentId);
    if (!agent) return;
    
    // Find the main table row for this agent
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach(row => {
        const viewerToggle = row.querySelector(`#viewer-toggle-${agentId}`);
        if (viewerToggle) {
            // This is the main row for this agent
            const usingModelCell = row.querySelector('.using-model');
            if (usingModelCell) {
                const usingModelName = agent.usingModel ? agent.usingModel.modelName : 'No Model';
                const modelClass = agent.usingModel ? 'using-model active' : 'using-model inactive';
                
                usingModelCell.textContent = usingModelName;
                usingModelCell.className = modelClass;
            }
        }
    });
}

function updateModelTimestamp(agentId, modelName) {
    const agent = findAgentById(agentId);
    if (agent) {
        const model = findModelByName(agent, modelName);
        if (model) {
            model.updatedAt = new Date().toISOString();
            return true;
        }
    }
    return false;
}

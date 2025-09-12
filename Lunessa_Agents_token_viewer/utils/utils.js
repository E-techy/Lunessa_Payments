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
            return true;
        }
    }
    return false;
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

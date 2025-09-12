// State management for the agent viewer application
let expandedRows = new Set();
let pendingChanges = {};
let hasUnsavedChanges = false;

// State update functions
function addExpandedRow(agentId) {
    expandedRows.add(agentId);
}

function removeExpandedRow(agentId) {
    expandedRows.delete(agentId);
}

function clearExpandedRows() {
    expandedRows.clear();
}

function hasExpandedRow(agentId) {
    return expandedRows.has(agentId);
}

function getAllExpandedRows() {
    return Array.from(expandedRows);
}

function addPendingChange(agentId, modelName, newStatus) {
    if (!pendingChanges[agentId]) {
        pendingChanges[agentId] = {};
    }
    pendingChanges[agentId][modelName] = newStatus;
    hasUnsavedChanges = true;
}

function clearPendingChanges() {
    pendingChanges = {};
    hasUnsavedChanges = false;
}

function getPendingChanges() {
    return pendingChanges;
}

function getHasUnsavedChanges() {
    return hasUnsavedChanges;
}

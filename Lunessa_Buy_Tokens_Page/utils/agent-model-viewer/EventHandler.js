// Event handling for AgentModelViewer
class EventHandler {
    constructor(viewer) {
        this.viewer = viewer;
    }

    bindEvents() {
        const viewerToggle = document.getElementById('viewerToggle');
        
        if (viewerToggle) {
            viewerToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.viewer.uiManager.toggleViewer();
            });
        }
    }

    toggleModelStatus(modelName) {
        if (!this.viewer.agentsData || !this.viewer.agentsData.agents || this.viewer.agentsData.agents.length === 0) return;
        
        const currentAgent = this.viewer.agentsData.agents[0];
        const model = currentAgent.tokenBalances.find(m => m.modelName === modelName);
        
        if (model) {
            // Toggle the status
            model.status = model.status === 'active' ? 'inactive' : 'active';
            
            // Update the updatedAt timestamp
            model.updatedAt = new Date().toISOString();
            
            // Update usingModel logic - use the first active model or null if none
            const activeModel = currentAgent.tokenBalances.find(m => m.status === 'active');
            if (activeModel) {
                currentAgent.usingModel = {
                    modelName: activeModel.modelName,
                    availableTokens: activeModel.availableTokens,
                    status: activeModel.status
                };
            } else {
                currentAgent.usingModel = null;
            }
            
            // Mark as having unsaved changes
            this.viewer.hasUnsavedChanges = true;
            
            // DON'T update info-cards immediately - wait for save
            // this.updateInfoCards(); // Commented out
            
            // Only update the expanded view to show the toggle change
            if (this.viewer.isExpanded) {
                this.viewer.uiManager.renderAgents();
            }
            
            // Optional: Trigger a callback or event for external handling
            if (typeof this.viewer.onModelStatusChange === 'function') {
                this.viewer.onModelStatusChange(modelName, model.status);
            }
        }
    }

    switchToAgent(agentId) {
        if (!this.viewer.agentsData || !this.viewer.agentsData.agents) return;
        
        const targetAgent = this.viewer.agentsData.agents.find(agent => agent.agentId === agentId);
        if (!targetAgent) return;
        
        // Agent switching logic can be implemented here if needed
        this.viewer.uiManager.updateInfoCards();
        
        if (this.viewer.isExpanded) {
            this.viewer.uiManager.renderAgents();
        }
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = EventHandler;
}
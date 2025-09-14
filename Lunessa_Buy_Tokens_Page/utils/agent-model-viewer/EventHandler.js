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
        const targetModel = currentAgent.tokenBalances.find(m => m.modelName === modelName);
        
        if (!targetModel) return;
        
        const now = new Date().toISOString();
        
        // If toggling to active, first deactivate all other models
        if (targetModel.status === 'inactive') {
            // Deactivate all other models
            currentAgent.tokenBalances.forEach(model => {
                if (model.modelName !== modelName && model.status === 'active') {
                    model.status = 'inactive';
                    model.updatedAt = now;
                }
            });
            
            // Activate the target model
            targetModel.status = 'active';
            targetModel.updatedAt = now;
            
            // Update usingModel to the newly activated model
            currentAgent.usingModel = {
                modelName: targetModel.modelName,
                availableTokens: targetModel.availableTokens,
                status: 'active'
            };
        } else {
            // If deactivating the current active model
            targetModel.status = 'inactive';
            targetModel.updatedAt = now;
            
            // Check if there are any other active models
            const remainingActiveModel = currentAgent.tokenBalances.find(m => 
                m.modelName !== modelName && m.status === 'active'
            );
            
            if (remainingActiveModel) {
                // Use the remaining active model
                currentAgent.usingModel = {
                    modelName: remainingActiveModel.modelName,
                    availableTokens: remainingActiveModel.availableTokens,
                    status: 'active'
                };
            } else {
                // No active models left
                currentAgent.usingModel = null;
            }
        }
        
        // Mark as having unsaved changes
        this.viewer.hasUnsavedChanges = true;
        
        // Update the UI to reflect changes
        if (this.viewer.isExpanded) {
            this.viewer.uiManager.renderAgents();
        }
        
        // Update info cards to show the current state (but not persisted until save)
        this.viewer.uiManager.updateInfoCards();
        
        // Optional: Trigger a callback or event for external handling
        if (typeof this.viewer.onModelStatusChange === 'function') {
            this.viewer.onModelStatusChange(modelName, targetModel.status);
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
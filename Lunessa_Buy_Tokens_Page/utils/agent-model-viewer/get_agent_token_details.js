// Data management and API calls for AgentModelViewer
class DataManager {
    constructor(viewer) {
        this.viewer = viewer;
    }

    async loadAgentsData() {
        try {
            // Show loading state
            this.showLoadingState();
            
            // Fetch data from the API endpoint
            const response = await fetch('/view_agent_tokens', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Include authorization header if token is stored in localStorage or cookies
                    ...(Utils.getAuthToken() && { 'Authorization': `Bearer ${Utils.getAuthToken()}` })
                },
                credentials: 'include', // Include cookies for authentication
                body: JSON.stringify({}) // Empty body - no specific agentId to get all agents
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log(data)
            if (data.success) {
                this.viewer.agentsData = data;
                // Store original data for comparison
                this.viewer.originalData = JSON.parse(JSON.stringify(this.viewer.agentsData));
                this.viewer.hasUnsavedChanges = false;
                this.viewer.uiManager.updateInfoCards();
            } else {
                throw new Error(data.error || 'Failed to load agent data');
            }
            
        } catch (error) {
            console.error('Error loading agents data:', error);
            this.handleLoadError(error.message);
        }
    }

    showLoadingState() {
        // Update info cards with loading state
        const agentNameElement = document.querySelector('.agent-card .agent-name');
        const statusBadgeElement = document.querySelector('.agent-card .status-badge');
        const tokenCountElement = document.querySelector('.token-card .token-count');
        const availabilityElement = document.querySelector('.token-card .availability');
        
        if (agentNameElement) agentNameElement.textContent = 'Loading...';
        if (statusBadgeElement) {
            statusBadgeElement.textContent = 'Loading';
            statusBadgeElement.className = 'status-badge loading';
        }
        if (tokenCountElement) tokenCountElement.textContent = '---';
        if (availabilityElement) availabilityElement.textContent = 'Loading agent data...';
    }
    
    handleLoadError(errorMessage) {
        // Set error state in UI
        const agentNameElement = document.querySelector('.agent-card .agent-name');
        const statusBadgeElement = document.querySelector('.agent-card .status-badge');
        const tokenCountElement = document.querySelector('.token-card .token-count');
        const availabilityElement = document.querySelector('.token-card .availability');
        
        if (agentNameElement) agentNameElement.textContent = 'Error Loading';
        if (statusBadgeElement) {
            statusBadgeElement.textContent = 'Error';
            statusBadgeElement.className = 'status-badge error';
        }
        if (tokenCountElement) tokenCountElement.textContent = '0';
        if (availabilityElement) availabilityElement.textContent = `Error: ${errorMessage}`;
        
        // Set empty agents data
        this.viewer.agentsData = {
            success: false,
            error: errorMessage,
            agents: []
        };
        
        Utils.showNotification(`Failed to load agent data: ${errorMessage}`);
    }

    async saveChanges() {
        if (!this.viewer.hasUnsavedChanges) return;
        
        try {
            // Show saving state
            this.showSavingState();
            
            // Prepare the data to save - extract the modified agent
            const currentAgent = this.viewer.agentsData.agents[0];
            if (!currentAgent) {
                throw new Error('No agent data to save');
            }

            // Find the currently active model
            const activeModel = currentAgent.tokenBalances.find(model => model.status === 'active');
            
            if (!activeModel) {
                throw new Error('No active model found to save');
            }

            // Prepare the request data for the modify_agent_usingModel endpoint
            const requestData = {
                agentId: currentAgent.agentId,
                modelName: activeModel.modelName,
                status: 'active' // We're always setting the active model
            };
            
            // API call to save changes to server using the modify_agent_usingModel endpoint
            const response = await fetch('/modify_agent_usingModel', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Include authorization header if token is stored
                    ...(Utils.getAuthToken() && { 'Authorization': `Bearer ${Utils.getAuthToken()}` })
                },
                credentials: 'include',
                body: JSON.stringify(requestData)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            
            if (result.success) {
                // Update the viewer data with the server response
                if (result.data) {
                    // Update the current agent with the server response
                    const updatedAgent = result.data;
                    currentAgent.usingModel = updatedAgent.usingModel;
                    currentAgent.tokenBalances = updatedAgent.tokenBalances;
                }
                
                // Update original data to current data
                this.viewer.originalData = JSON.parse(JSON.stringify(this.viewer.agentsData));
                this.viewer.hasUnsavedChanges = false;
                
                // Update info-cards with the latest data
                this.viewer.uiManager.updateInfoCards();
                
                // Update UI to hide save button and refresh agents display
                if (this.viewer.isExpanded) {
                    this.viewer.uiManager.renderAgents();
                }
                
                // Show success message
                Utils.showNotification('Model status updated successfully!', 'success', 3000);
                
                // Optional: Trigger callback for external handling
                if (typeof this.viewer.onSaveChanges === 'function') {
                    this.viewer.onSaveChanges(this.viewer.agentsData);
                }
            } else {
                throw new Error(result.error || 'Failed to save changes');
            }
            
        } catch (error) {
            console.error('Error saving changes:', error);
            Utils.showNotification(`Error saving changes: ${error.message}`);
            
            // Reset the save button state
            this.resetSaveButtonState();
        }
    }
    
    showSavingState() {
        const saveButton = document.querySelector('.save-changes-btn');
        if (saveButton) {
            saveButton.textContent = 'Saving...';
            saveButton.disabled = true;
            saveButton.style.opacity = '0.6';
            saveButton.style.cursor = 'not-allowed';
        }
    }

    resetSaveButtonState() {
        const saveButton = document.querySelector('.save-changes-btn');
        if (saveButton) {
            saveButton.textContent = 'Save Changes';
            saveButton.disabled = false;
            saveButton.style.opacity = '1';
            saveButton.style.cursor = 'pointer';
        }
    }

    async refreshData() {
        try {
            await this.loadAgentsData();
            if (this.viewer.isExpanded) {
                this.viewer.uiManager.renderAgents();
            }
        } catch (error) {
            console.error('Error refreshing agent data:', error);
            Utils.showNotification('Failed to refresh data');
        }
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = DataManager;
}
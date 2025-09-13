class AgentModelViewer {
    constructor() {
        this.isExpanded = false;
        this.agentsData = null;
        this.hasUnsavedChanges = false;
        this.originalData = null;
        this.init();
    }
    
    updateAgentsData(newData) {
        this.agentsData = newData;
        this.updateInfoCards();
        if (this.isExpanded) {
            this.renderAgents();
        }
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.bindEvents();
                this.loadAgentsData();
            });
        } else {
            this.bindEvents();
            this.loadAgentsData();
        }
    }

    bindEvents() {
        const viewerToggle = document.getElementById('viewerToggle');
        
        if (viewerToggle) {
            viewerToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleViewer();
            });
        }
    }

    toggleViewer() {
        const viewerContent = document.getElementById('viewerContent');
        const viewerToggle = document.getElementById('viewerToggle');
        
        if (!viewerContent || !viewerToggle) return;

        this.isExpanded = !this.isExpanded;
        
        if (this.isExpanded) {
            viewerContent.style.display = 'block';
            viewerToggle.classList.add('expanded');
            this.renderAgents();
        } else {
            viewerContent.style.display = 'none';
            viewerToggle.classList.remove('expanded');
        }
    }

    loadAgentsData() {
        this.agentsData = {
            "success": true,
            "agents": [
                {
                    "agentId": "AGT-50345a8fdb40c313",
                    "agentName": "Agent Arjun",
                    "tokenBalances": [
                        {
                            "modelName": "gpt-4",
                            "availableTokens": 800001500,
                            "status": "active",
                            "createdAt": "2024-09-10T18:16:26.338Z",
                            "updatedAt": "2024-09-10T21:23:21.165Z"
                        },
                        {
                            "modelName": "gpt-5",
                            "availableTokens": 10000000,
                            "status": "inactive",
                            "createdAt": "2024-09-10T18:22:45.781Z",
                            "updatedAt": "2024-09-10T18:22:45.781Z"
                        }
                    ],
                    "usingModel": {
                        "modelName": "gpt-4",
                        "availableTokens": 800001500,
                        "status": "active"
                    },
                    "defaultModel": null,
                    "lastModified": "2025-09-10T21:23:21.165Z",
                    "createdAt": "2025-08-17T20:43:05.583Z"
                }
            ]
        };
        
        // Store original data for comparison
        this.originalData = JSON.parse(JSON.stringify(this.agentsData));
        this.hasUnsavedChanges = false;
        
        this.updateInfoCards();
    }
    
    updateInfoCards() {
        if (!this.agentsData || !this.agentsData.agents || this.agentsData.agents.length === 0) return;
        
        // Use the first agent
        const currentAgent = this.agentsData.agents[0];
        
        if (!currentAgent) return;
        
        const agentNameElement = document.querySelector('.agent-card .agent-name');
        const statusBadgeElement = document.querySelector('.agent-card .status-badge');
        
        if (agentNameElement) {
            agentNameElement.textContent = currentAgent.agentName;
        }
        
        if (statusBadgeElement) {
            const hasActiveModels = currentAgent.tokenBalances.some(model => model.status === 'active');
            statusBadgeElement.textContent = hasActiveModels ? 'Active' : 'Inactive';
            statusBadgeElement.className = hasActiveModels ? 'status-badge active' : 'status-badge inactive';
        }
        
        const tokenCountElement = document.querySelector('.token-card .token-count');
        const availabilityElement = document.querySelector('.token-card .availability');
        
        if (currentAgent.usingModel && tokenCountElement) {
            const formattedTokens = this.formatNumber(currentAgent.usingModel.availableTokens);
            tokenCountElement.textContent = formattedTokens;
            
            if (availabilityElement) {
                availabilityElement.textContent = `${currentAgent.usingModel.modelName} - Ready for Purchase`;
            }
        } else if (tokenCountElement && availabilityElement) {
            tokenCountElement.textContent = '0';
            availabilityElement.textContent = 'No Active Model';
        }
    }

    renderAgents() {
        const agentsGrid = document.getElementById('agentsGrid');
        if (!agentsGrid || !this.agentsData) return;

        if (!this.agentsData.success || !this.agentsData.agents || this.agentsData.agents.length === 0) {
            agentsGrid.innerHTML = this.renderEmptyState();
            return;
        }

        const currentAgent = this.agentsData.agents[0]; // Use first agent
        
        if (!currentAgent) {
            agentsGrid.innerHTML = this.renderEmptyState();
            return;
        }

        // Always render agents and show all models (both active and inactive)

        const agentHtml = this.renderAgent(currentAgent);
        const saveButtonHtml = this.renderSaveButton();
        agentsGrid.innerHTML = agentHtml + saveButtonHtml;
    }

    renderAgent(agent) {
        // Show all models (both active and inactive)
        const allModels = agent.tokenBalances;
        
        if (allModels.length === 0) return '';

        const modelsHtml = allModels.map(model => this.renderModel(model, agent.usingModel)).join('');
        
        // Format dates for display
        const lastModified = agent.lastModified ? this.formatDate(agent.lastModified) : 'N/A';
        const createdAt = agent.createdAt ? this.formatDate(agent.createdAt) : 'N/A';
        const defaultModel = agent.defaultModel || 'None';

        return `
            <div class="agent-item" style="border: 1px solid #ddd; border-radius: 8px; padding: 16px; margin-bottom: 16px; background: #f9f9f9;">
                <div class="agent-header" style="margin-bottom: 12px;">
                    <h4 class="agent-name" style="margin: 0; color: #333;">${this.escapeHtml(agent.agentName)}</h4>
                    <span class="agent-id" style="font-size: 0.9em; color: #666;">${this.escapeHtml(agent.agentId)}</span>
                </div>
                <div class="agent-metadata" style="background: #fff; padding: 12px; border-radius: 6px; margin-bottom: 12px;">
                    <div class="metadata-item" style="margin-bottom: 6px;">
                        <span class="metadata-label" style="font-weight: 600; color: #555;">Default Model:</span>
                        <span class="metadata-value" style="margin-left: 8px; color: #333;">${this.escapeHtml(defaultModel)}</span>
                    </div>
                    <div class="metadata-item" style="margin-bottom: 6px;">
                        <span class="metadata-label" style="font-weight: 600; color: #555;">Created:</span>
                        <span class="metadata-value" style="margin-left: 8px; color: #333;">${createdAt}</span>
                    </div>
                    <div class="metadata-item">
                        <span class="metadata-label" style="font-weight: 600; color: #555;">Last Modified:</span>
                        <span class="metadata-value" style="margin-left: 8px; color: #333;">${lastModified}</span>
                    </div>
                </div>
                <div class="models-container">
                    ${modelsHtml}
                </div>
            </div>
        `;
    }

    renderSaveButton() {
        const isVisible = this.hasUnsavedChanges ? 'block' : 'none';
        const buttonClass = this.hasUnsavedChanges ? 'save-changes-active' : 'save-changes-inactive';
        
        return `
            <div class="save-changes-container" style="display: flex; justify-content: flex-end; margin-top: 16px; padding: 0 8px;">
                <button class="save-changes-btn ${buttonClass}" 
                        onclick="window.agentModelViewer.saveChanges()" 
                        style="display: ${isVisible}; background: #28a745; color: white; border: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 0.9em; transition: all 0.3s ease; box-shadow: 0 2px 4px rgba(40, 167, 69, 0.3);">
                    Save Changes
                </button>
            </div>
        `;
    }

    renderModel(model, usingModel) {
        const formattedTokens = this.formatNumber(model.availableTokens);
        const statusClass = model.status === 'active' ? 'status-active' : 'status-inactive';
        const statusColor = model.status === 'active' ? '#28a745' : '#dc3545';
        const toggleBgColor = model.status === 'active' ? '#28a745' : '#dc3545';
        const togglePosition = model.status === 'active' ? 'translateX(28px)' : 'translateX(2px)';
        
        // Format model timestamps if available
        const createdAt = model.createdAt ? this.formatDate(model.createdAt) : '';
        const updatedAt = model.updatedAt ? this.formatDate(model.updatedAt) : '';

        return `
            <div class="model-item" style="border: 1px solid #e0e0e0; padding: 16px; margin: 8px 0; border-radius: 8px; background: #fff; display: flex; justify-content: space-between; align-items: flex-start;">
                <div class="left-section" style="flex: 1;">
                    <div class="model-info" style="display: flex; align-items: center; margin-bottom: 12px;">
                        <div class="status-indicator ${statusClass}" style="background-color: ${statusColor}; width: 12px; height: 12px; border-radius: 50%; display: inline-block; margin-right: 8px;"></div>
                        <span class="model-name" style="font-weight: 600; font-size: 1.1em; margin-right: 12px;">${this.escapeHtml(model.modelName)}</span>
                        <span class="status-text" style="font-size: 0.9em; color: ${statusColor}; text-transform: capitalize; font-weight: 500;">${model.status}</span>
                    </div>
                    <div class="toggle-section" style="display: flex; align-items: center;">
                        <span style="margin-right: 12px; font-size: 0.9em; color: #666;">Status:</span>
                        <div class="status-toggle" onclick="window.agentModelViewer.toggleModelStatus('${model.modelName}')" style="position: relative; width: 50px; height: 24px; background-color: ${toggleBgColor}; border-radius: 12px; cursor: pointer; transition: all 0.3s ease;">
                            <div class="toggle-slider" style="position: absolute; top: 2px; width: 20px; height: 20px; background: white; border-radius: 50%; transform: ${togglePosition}; transition: transform 0.3s ease; box-shadow: 0 1px 3px rgba(0,0,0,0.3);"></div>
                        </div>
                    </div>
                </div>
                <div class="right-section" style="text-align: right; color: #666;">
                    <div class="token-count" style="font-size: 1.1em;font-weight: 600;color: #333;margin-bottom: 8px;justify-content: flex-end;">${formattedTokens} tokens</div>
                    <div class="timestamps" style="font-size: 0.85em; line-height: 1.5;">
                        ${createdAt ? `<div><strong>Created:</strong> ${createdAt}</div>` : ''}
                        ${updatedAt ? `<div><strong>Updated:</strong> ${updatedAt}</div>` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    renderEmptyState() {
        return `
            <div class="empty-state">
                <div class="empty-state-icon">🤖</div>
                <h4>No Active Agents Found</h4>
                <p>There are currently no agents with active models available.<br>Check back later or contact support for assistance.</p>
            </div>
        `;
    }

    formatDate(dateString) {
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

    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toLocaleString();
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    toggleModelStatus(modelName) {
        if (!this.agentsData || !this.agentsData.agents || this.agentsData.agents.length === 0) return;
        
        const currentAgent = this.agentsData.agents[0];
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
            this.hasUnsavedChanges = true;
            
            // DON'T update info-cards immediately - wait for save
            // this.updateInfoCards(); // Commented out
            
            // Only update the expanded view to show the toggle change
            if (this.isExpanded) {
                this.renderAgents();
            }
            
            // Optional: Trigger a callback or event for external handling
            if (typeof this.onModelStatusChange === 'function') {
                this.onModelStatusChange(modelName, model.status);
            }
        }
    }

    // Method to set a callback for status changes
    setOnModelStatusChange(callback) {
        this.onModelStatusChange = callback;
    }

    saveChanges() {
        if (!this.hasUnsavedChanges) return;
        
        try {
            // Here you can add API call to save changes to server
            console.log('Saving changes:', this.agentsData);
            
            // Update original data to current data
            this.originalData = JSON.parse(JSON.stringify(this.agentsData));
            this.hasUnsavedChanges = false;
            
            // Update info-cards with the latest data
            this.updateInfoCards();
            
            // Update UI to hide save button
            if (this.isExpanded) {
                this.renderAgents();
            }
            
            // Optional: Show success message
            this.showSaveNotification('Changes saved successfully!', 'success');
            
            // Optional: Trigger callback for external handling
            if (typeof this.onSaveChanges === 'function') {
                this.onSaveChanges(this.agentsData);
            }
            
        } catch (error) {
            console.error('Error saving changes:', error);
            this.showSaveNotification('Error saving changes!', 'error');
        }
    }
    
    showSaveNotification(message, type) {
        // Create temporary notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : '#dc3545'};
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            font-weight: 600;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transition: all 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Method to set a callback for save events
    setOnSaveChanges(callback) {
        this.onSaveChanges = callback;
    }

    switchToAgent(agentId) {
        if (!this.agentsData || !this.agentsData.agents) return;
        
        const targetAgent = this.agentsData.agents.find(agent => agent.agentId === agentId);
        if (!targetAgent) return;
        
        // Agent switching logic can be implemented here if needed
        this.updateInfoCards();
        
        if (this.isExpanded) {
            this.renderAgents();
        }
    }

    async refreshData() {
        try {
            this.loadAgentsData();
            if (this.isExpanded) {
                this.renderAgents();
            }
        } catch (error) {
            console.error('Error refreshing agent data:', error);
        }
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (!window.agentModelViewer) {
            window.agentModelViewer = new AgentModelViewer();
        }
    });
} else {
    if (!window.agentModelViewer) {
        window.agentModelViewer = new AgentModelViewer();
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = AgentModelViewer;
}
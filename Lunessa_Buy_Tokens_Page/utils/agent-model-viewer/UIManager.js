// UI rendering and DOM manipulation for AgentModelViewer
class UIManager {
    constructor(viewer) {
        this.viewer = viewer;
    }

    updateInfoCards() {
        if (!this.viewer.agentsData || !this.viewer.agentsData.agents || this.viewer.agentsData.agents.length === 0) return;
        
        // Use the first agent
        const currentAgent = this.viewer.agentsData.agents[0];
        
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
        
        const modelNameElement = document.querySelector('.using-model-card .model-name');
        const tokenCountElement = document.querySelector('.using-model-card .token-count');
        
        if (currentAgent.usingModel && modelNameElement && tokenCountElement) {
            modelNameElement.textContent = currentAgent.usingModel.modelName;
            const formattedTokens = Utils.formatNumber(currentAgent.usingModel.availableTokens);
            tokenCountElement.textContent = `${formattedTokens} tokens`;
        } else if (modelNameElement && tokenCountElement) {
            modelNameElement.textContent = 'No Active Model';
            tokenCountElement.textContent = '0 tokens';
        }
    }

    renderAgents() {
        const agentsGrid = document.getElementById('agentsGrid');
        if (!agentsGrid || !this.viewer.agentsData) return;

        if (!this.viewer.agentsData.success || !this.viewer.agentsData.agents || this.viewer.agentsData.agents.length === 0) {
            agentsGrid.innerHTML = this.renderEmptyState();
            return;
        }

        const currentAgent = this.viewer.agentsData.agents[0]; // Use first agent
        
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
        const lastModified = agent.lastModified ? Utils.formatDate(agent.lastModified) : 'N/A';
        const createdAt = agent.createdAt ? Utils.formatDate(agent.createdAt) : 'N/A';
        const defaultModel = agent.defaultModel || 'None';

        return `
            <div class="agent-item" style="border: 1px solid #ddd; border-radius: 8px; padding: 16px; margin-bottom: 16px; background: #f9f9f9;">
                <div class="agent-header" style="margin-bottom: 12px;">
                    <h4 class="agent-name" style="margin: 0; color: #333;">${Utils.escapeHtml(agent.agentName)}</h4>
                    <span class="agent-id" style="font-size: 0.9em; color: #666;">${Utils.escapeHtml(agent.agentId)}</span>
                </div>
                <div class="agent-metadata" style="background: #fff; padding: 12px; border-radius: 6px; margin-bottom: 12px;">
                    <div class="metadata-item" style="margin-bottom: 6px;">
                        <span class="metadata-label" style="font-weight: 600; color: #555;">Default Model:</span>
                        <span class="metadata-value" style="margin-left: 8px; color: #333;">${Utils.escapeHtml(defaultModel)}</span>
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
        const isVisible = this.viewer.hasUnsavedChanges ? 'block' : 'none';
        const buttonClass = this.viewer.hasUnsavedChanges ? 'save-changes-active' : 'save-changes-inactive';
        
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
        const formattedTokens = Utils.formatNumber(model.availableTokens);
        const statusClass = model.status === 'active' ? 'status-active' : 'status-inactive';
        const statusColor = model.status === 'active' ? '#28a745' : '#dc3545';
        const toggleBgColor = model.status === 'active' ? '#28a745' : '#dc3545';
        const togglePosition = model.status === 'active' ? 'translateX(28px)' : 'translateX(2px)';
        
        // Format model timestamps if available
        const createdAt = model.createdAt ? Utils.formatDate(model.createdAt) : '';
        const updatedAt = model.updatedAt ? Utils.formatDate(model.updatedAt) : '';

        return `
            <div class="model-item" style="border: 1px solid #e0e0e0; padding: 16px; margin: 8px 0; border-radius: 8px; background: #fff; display: flex; justify-content: space-between; align-items: flex-start;">
                <div class="left-section" style="flex: 1;">
                    <div class="model-info" style="display: flex; align-items: center; margin-bottom: 12px;">
                        <div class="status-indicator ${statusClass}" style="background-color: ${statusColor}; width: 12px; height: 12px; border-radius: 50%; display: inline-block; margin-right: 8px;"></div>
                        <span class="model-name" style="font-weight: 600; font-size: 1.1em; margin-right: 8px;">${Utils.escapeHtml(model.modelName)}</span>
                        <span class="status-text" style="font-size: 0.9em; color: ${statusColor}; text-transform: capitalize; font-weight: 500; margin-right: auto;">${model.status}</span>
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

    toggleViewer() {
        const viewerContent = document.getElementById('viewerContent');
        const viewerToggle = document.getElementById('viewerToggle');
        
        if (!viewerContent || !viewerToggle) return;

        this.viewer.isExpanded = !this.viewer.isExpanded;
        
        if (this.viewer.isExpanded) {
            viewerContent.style.display = 'block';
            viewerToggle.classList.add('expanded');
            this.renderAgents();
        } else {
            viewerContent.style.display = 'none';
            viewerToggle.classList.remove('expanded');
        }
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UIManager;
}
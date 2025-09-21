// UI rendering functions for agent details and models

function createModelItemHTML(model, agentId, index) {
    const formattedTokens = formatNumber(model.availableTokens);
    const statusColor = model.status === 'active' ? '#10b981' : '#ef4444';
    const createdAt = formatDate(model.createdAt);
    const updatedAt = formatDate(model.updatedAt);
    const toggleId = `toggle-${agentId}-${model.modelName}-${index}`;

    return `
        <div class="model-item" style="border: 1px solid #e0e0e0; padding: 16px; margin: 8px 0; border-radius: 8px; background: #fff; display: flex; justify-content: space-between; align-items: flex-start;">
            <div class="left-section" style="flex: 1;">
                <div class="model-info" style="display: flex; align-items: center; margin-bottom: 12px;">
                    <div class="status-indicator" style="background-color: ${statusColor}; width: 12px; height: 12px; border-radius: 50%; display: inline-block; margin-right: 8px;"></div>
                    <span class="model-name" style="font-weight: 600; font-size: 1.1em; margin-right: 12px;">${model.modelName.toUpperCase()}</span>
                    <span class="status-text" style="font-size: 0.9em; color: ${statusColor}; text-transform: capitalize; font-weight: 500;">${model.status}</span>
                </div>
                <div class="status-control" style="display: flex; align-items: center; gap: 12px; margin-top: 8px;">
                    <span style="font-size: 0.9em; color: #666;">Status:</span>
                    <label class="toggle-switch" style="position: relative; display: inline-block; width: 50px; height: 24px;">
                        <input type="checkbox" id="${toggleId}" ${model.status === 'active' ? 'checked' : ''} 
                                data-agent-id="${agentId}" 
                                data-model-name="${model.modelName}" 
                                data-current-status="${model.status}"
                                style="opacity: 0; width: 0; height: 0;">
                            <span class="toggle-slider" style="background-color: ${model.status === 'active' ? '#10b981' : '#ccc'};">
                            <span class="toggle-slider-circle" style="left: ${model.status === 'active' ? '29px' : '3px'};"></span>
                        </span>
                    </label>
                </div>
            </div>
            <div class="right-section" style="text-align: right; color: #666;">
                <div class="token-count" style="font-size: 1.1em; font-weight: 600; color: #333; margin-bottom: 8px;">⚡ ${formattedTokens} tokens</div>
                <div class="timestamps" style="font-size: 0.85em; line-height: 1.5;">
                    <div><strong>Created:</strong> ${createdAt}</div>
                    <div><strong>Updated:</strong> ${updatedAt}</div>
                </div>
            </div>
        </div>
    `;
}

function createAgentDetailsHTML(agent) {
    const lastModified = formatDate(agent.lastModified);
    const createdAt = formatDate(agent.createdAt);
    const defaultModel = agent.defaultModel || 'None';
    const usingModelName = agent.usingModel ? agent.usingModel.modelName : 'None';
    const usingModelStatus = agent.usingModel ? 'Active' : 'No Active Model';
    const usingModelClass = agent.usingModel ? 'using-model-active' : 'using-model-inactive';

    const modelsHtml = agent.tokenBalances.map((model, index) => 
        createModelItemHTML(model, agent.agentId, index)
    ).join('');

    return `
        <div class="agent-header" style="margin-bottom: 16px; padding-bottom: 12px; border-bottom: 2px solid #e5e7eb;">
            <h4 style="margin: 0 0 8px 0; color: #1e293b; font-size: 1.2em;">${agent.agentName}</h4>
            <span style="font-size: 0.9em; color: #6b7280; font-family: monospace; background: #f3f4f6; padding: 2px 6px; border-radius: 4px;">${agent.agentId}</span>
        </div>
        <div class="agent-metadata" style="background: #fff; padding: 16px; border-radius: 8px; margin-bottom: 16px; border: 1px solid #e5e7eb;">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
                <div class="metadata-item">
                    <span style="font-weight: 600; color: #374151;">Currently Using:</span><br>
                    <span class="${usingModelClass}" style="font-weight: 600; padding: 4px 8px; border-radius: 4px; font-size: 0.9em;">${usingModelName}</span>
                    <br><small style="color: #6b7280; font-size: 0.8em;">${usingModelStatus}</small>
                </div>
                <div class="metadata-item">
                    <span style="font-weight: 600; color: #374151;">Default Model:</span><br>
                    <span style="color: #6b7280;">${defaultModel}</span>
                </div>
                <div class="metadata-item">
                    <span style="font-weight: 600; color: #374151;">Created:</span><br>
                    <span style="color: #6b7280; font-size: 0.9em;">${createdAt}</span>
                </div>
                <div class="metadata-item">
                    <span style="font-weight: 600; color: #374151;">Last Modified:</span><br>
                    <span style="color: #6b7280; font-size: 0.9em;">${lastModified}</span>
                </div>
            </div>
        </div>
        <div class="models-container">
            <h5 style="color: #374151; margin: 0 0 12px 0; font-size: 1.1em; display: flex;">Model Status & Tokens:</h5>
            ${modelsHtml}
        </div>
    `;
}

function createAgentRowHTML(agent) {
    const usingModelName = agent.usingModel ? agent.usingModel.modelName : 'No Model';
    const modelClass = agent.usingModel ? 'using-model active' : 'using-model inactive';
    
    return `
        <td>
            <span class="agent-name">${agent.agentName}</span>
        </td>
        <td>
            <span class="agent-id">${agent.agentId}</span>
        </td>
        <td>
            <span class="${modelClass}">${usingModelName}</span>
        </td>
        <td>
            <button class="viewer-toggle" id="viewer-toggle-${agent.agentId}" data-agent-id="${agent.agentId}">
                <svg class="arrow-icon" width="12" height="8" viewBox="0 0 12 8" fill="none">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <button class="buy-btn" id="buy-btn-${agent.agentId}" data-agent-name="${agent.agentName}" data-agent-id="${agent.agentId}">
                Buy Tokens
            </button>
        </td>
    `;
}

function createDetailsRowHTML(agent) {
    return `
        <td colspan="4" style="padding: 0; border: none;">
            <div class="agent-details-content" style="padding: 20px; background: #f8f9fa; border-radius: 8px; margin: 10px;">
                <div id="agent-details-${agent.agentId}">
                    <!-- Details will be populated here -->
                </div>
            </div>
        </td>
    `;
}

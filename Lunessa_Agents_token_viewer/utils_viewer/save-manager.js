// Save functionality and related UI components

// Helper function to get authentication token
function getAuthToken() {
    // Try to get token from localStorage first
    let token = localStorage.getItem('authToken');
    
    // If not in localStorage, try to get from cookies
    if (!token) {
        const cookies = document.cookie.split(';');
        const authCookie = cookies.find(cookie => cookie.trim().startsWith('authToken='));
        if (authCookie) {
            token = authCookie.split('=')[1];
        }
    }
    
    return token;
}

// Helper function to show error messages
function showErrorMessage(message) {
    // Remove any existing error messages
    const existingError = document.getElementById('error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.id = 'error-message';
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #ef4444, #dc2626);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        z-index: 1000;
        font-weight: 500;
        max-width: 400px;
        word-wrap: break-word;
        animation: slideIn 0.3s ease-out;
    `;
    
    errorDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
            <span>❌</span>
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="background: none; border: none; color: white; 
                           margin-left: auto; cursor: pointer; font-size: 16px;">
                ×
            </button>
        </div>
    `;
    
    // Add CSS animation if not already added
    if (!document.getElementById('error-animation-style')) {
        const style = document.createElement('style');
        style.id = 'error-animation-style';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(errorDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (errorDiv && errorDiv.parentElement) {
            errorDiv.remove();
        }
    }, 5000);
}

function showSaveButton(agentId) {
    const agentDetailsContent = document.querySelector(`#details-${agentId} .agent-details-content`);
    let saveButton = document.getElementById('save-changes-btn');
    
    if (!saveButton && getHasUnsavedChanges() && agentDetailsContent) {
        // Remove any existing save button first
        const existingBtn = document.getElementById('save-button-container');
        if (existingBtn) existingBtn.remove();
        
        const saveButtonContainer = document.createElement('div');
        saveButtonContainer.id = 'save-button-container';
        saveButtonContainer.style.cssText = `
            display: flex;
            justify-content: flex-end;
            margin-top: 20px;
            padding-top: 16px;
            border-top: 1px solid #e5e7eb;
        `;
        
        saveButtonContainer.innerHTML = `
            <button id="save-changes-btn" class="save-agents-btn">
                Save Changes
            </button>
        `;
        
        agentDetailsContent.appendChild(saveButtonContainer);
        
        // Add event listener for save button
        const btn = saveButtonContainer.querySelector('#save-changes-btn');
        btn.addEventListener('click', saveChanges);
        
        // Add hover effect
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 16px rgba(16, 185, 129, 0.4)';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
        });
    }
}

async function saveChanges() {
    if (!getHasUnsavedChanges()) return;
    
    console.log('Saving changes:', getPendingChanges());
    
    const saveBtn = document.getElementById('save-changes-btn');
    const originalContent = saveBtn.innerHTML;
    
    // Update UI to show saving state
    saveBtn.innerHTML = '<span>⏳</span> Saving...';
    saveBtn.disabled = true;
    saveBtn.style.opacity = '0.7';
    
    try {
        const pendingChanges = getPendingChanges();
        const savePromises = [];
        const processedAgents = new Set(); // Track which agents we've processed
        
        // Group changes by agent
        Object.keys(pendingChanges).forEach(agentId => {
            if (processedAgents.has(agentId)) return;
            processedAgents.add(agentId);
            
            const agent = findAgentById(agentId);
            if (!agent) return;
            
            // Find which model should be active after all changes
            const activeModel = agent.tokenBalances.find(model => model.status === 'active');
            const usingModelName = activeModel ? activeModel.modelName : null;
            
            console.log(`Agent ${agentId} - Active model after changes:`, usingModelName);
            
            // Send comprehensive update to server
            const savePromise = fetch('/modify_agent_usingModel', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getAuthToken() ? `Bearer ${getAuthToken()}` : undefined
                },
                credentials: 'include',
                body: JSON.stringify({
                    agentId: agentId,
                    // Send the active model as the one to use
                    modelName: usingModelName,
                    status: 'active',
                    // Include all model statuses for context
                    allModelStatuses: agent.tokenBalances.map(model => ({
                        modelName: model.modelName,
                        status: model.status
                    })),
                    // Explicitly set which model should be the "using model"
                    setAsUsingModel: true
                })
            }).then(async response => {
                const result = await response.json();
                
                if (!response.ok || !result.success) {
                    throw new Error(result.error || `Failed to update agent ${agentId}`);
                }
                
                return { agentId, usingModelName, result };
            });
            
            savePromises.push(savePromise);
        });
        
        // Wait for all API calls to complete
        const results = await Promise.all(savePromises);
        
        // Update timestamps for all changed models
        Object.keys(pendingChanges).forEach(agentId => {
            Object.keys(pendingChanges[agentId]).forEach(modelName => {
                updateModelTimestamp(agentId, modelName);
            });
        });
        
        // Clear pending changes
        clearPendingChanges();
        
        // Update button to show success
        saveBtn.innerHTML = '<span>✅</span> Changes Saved!';
        saveBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        
        // Re-render the details if expanded to show updated data
        getAllExpandedRows().forEach(agentId => {
            populateAgentDetails(agentId);
        });
        
        // Refresh the main table to ensure using model is correctly displayed
        setTimeout(() => {
            renderAgentsTable();
        }, 500);
        
        // Remove save button after success
        setTimeout(() => {
            const saveButtonContainer = document.getElementById('save-button-container');
            if (saveButtonContainer) {
                saveButtonContainer.remove();
            }
        }, 2000);
        
        console.log('All changes saved successfully:', results);
        
    } catch (error) {
        console.error('Error saving changes:', error);
        
        // Update button to show error
        saveBtn.innerHTML = '<span>❌</span> Save Failed';
        saveBtn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
        
        // Re-enable button and restore original state after showing error
        setTimeout(() => {
            saveBtn.innerHTML = originalContent;
            saveBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            saveBtn.disabled = false;
            saveBtn.style.opacity = '1';
        }, 3000);
        
        // Show error message to user
        showErrorMessage(error.message || 'Failed to save changes. Please try again.');
    }
}

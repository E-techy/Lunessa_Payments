// Save functionality and related UI components

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
            <button id="save-changes-btn" style="
                background: linear-gradient(135deg, #10b981, #059669);
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 8px;
                font-weight: 600;
                font-size: 0.9rem;
                cursor: pointer;
                box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 8px;
                white-space: nowrap;
            ">
                <span>💾</span>
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

function saveChanges() {
    if (!getHasUnsavedChanges()) return;
    
    console.log('Saving changes:', getPendingChanges());
    
    // Simulate API call
    const saveBtn = document.getElementById('save-changes-btn');
    const originalContent = saveBtn.innerHTML;
    
    saveBtn.innerHTML = '<span>⏳</span> Saving...';
    saveBtn.disabled = true;
    saveBtn.style.opacity = '0.7';
    
    // Simulate save delay
    setTimeout(() => {
        // Update timestamps for changed models
        Object.keys(getPendingChanges()).forEach(agentId => {
            Object.keys(getPendingChanges()[agentId]).forEach(modelName => {
                updateModelTimestamp(agentId, modelName);
            });
        });
        
        // Clear pending changes
        clearPendingChanges();
        
        // Update button to show success
        saveBtn.innerHTML = '<span>✅</span> Changes Saved!';
        saveBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        
        // Re-render the details if expanded
        getAllExpandedRows().forEach(agentId => {
            populateAgentDetails(agentId);
        });
        
        setTimeout(() => {
            const saveButtonContainer = document.getElementById('save-button-container');
            if (saveButtonContainer) {
                saveButtonContainer.remove();
            }
        }, 2000);
        
    }, 1000);
}

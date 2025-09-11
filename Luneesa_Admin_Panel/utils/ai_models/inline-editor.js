// AI Models Inline Editor

// Initialize inline editor handlers
function initAiInlineEditor() {
    console.log('Initializing AI Inline Editor...');
    
    // Inline save button
    const inlineSaveBtn = document.getElementById('ai-models-inline-save-btn');
    if (inlineSaveBtn) {
        inlineSaveBtn.addEventListener('click', handleAiInlineSave);
        console.log('AI Inline save button listener added');
    } else {
        console.warn('AI Inline save button not found');
    }
    
    // Inline cancel buttons
    const cancelBtn1 = document.getElementById('ai-models-inline-cancel-btn');
    const cancelBtn2 = document.getElementById('ai-models-inline-cancel-footer-btn');
    
    if (cancelBtn1) {
        cancelBtn1.addEventListener('click', hideAiInlineEditForm);
        console.log('AI Inline header cancel button listener added');
    } else {
        console.warn('AI Inline header cancel button not found: ai-models-inline-cancel-btn');
    }
    
    if (cancelBtn2) {
        cancelBtn2.addEventListener('click', hideAiInlineEditForm);
        console.log('AI Inline footer cancel button listener added');
    } else {
        console.warn('AI Inline footer cancel button not found: ai-models-inline-cancel-footer-btn');
    }
    
    // Add event delegation as backup for cancel buttons
    document.addEventListener('click', function(e) {
        if (e.target && (e.target.id === 'ai-models-inline-cancel-btn' || e.target.id === 'ai-models-inline-cancel-footer-btn')) {
            console.log('Cancel button clicked via event delegation:', e.target.id);
            hideAiInlineEditForm();
        }
        // Also check for clicks on icons inside buttons
        if (e.target && e.target.tagName === 'I') {
            const parentBtn = e.target.closest('#ai-models-inline-cancel-btn, #ai-models-inline-cancel-footer-btn');
            if (parentBtn) {
                console.log('Cancel button icon clicked via event delegation:', parentBtn.id);
                hideAiInlineEditForm();
            }
        }
    });
    
    console.log('AI Inline Editor initialization complete');
}

// Show inline edit form (exactly like offers showInlineEditForm)
function showAiInlineEditForm(model, modelId) {
    // Hide AI models list and show edit form
    document.getElementById('aiModelsList').style.display = 'none';
    document.getElementById('aiInlineEditForm').style.display = 'block';
    
    // Update form title
    document.getElementById('aiEditFormTitle').textContent = `Edit AI Model - ${model.modelName}`;
    
    // Store current editing model ID
    window.currentAiEditingId = modelId;
    
    // Populate readonly fields
    document.getElementById('aiInlineModelId').value = model.id;
    document.getElementById('aiInlineCreatedAt').value = new Date(model.createdAt).toLocaleString();
    document.getElementById('aiInlineUpdatedAt').value = new Date(model.updatedAt).toLocaleString();
    
    // Populate editable fields
    document.getElementById('aiInlineModelName').value = model.modelName;
    document.getElementById('aiInlineProvider').value = model.provider;
    document.getElementById('aiInlinePricePerToken').value = model.pricePerToken;
    document.getElementById('aiInlineCurrency').value = model.currency;
    document.getElementById('aiInlineAvailableTill').value = new Date(model.availableTill).toISOString().slice(0, 16);
}

// Hide inline edit form (exactly like offers cancelInlineEdit)
function hideAiInlineEditForm() {
    console.log('Hiding AI inline edit form...');
    
    // Show AI models list and hide edit form
    document.getElementById('aiModelsList').style.display = 'block';
    document.getElementById('aiInlineEditForm').style.display = 'none';
    
    // Clear current editing model ID
    window.currentAiEditingId = null;
    
    console.log('AI inline edit form hidden successfully');
}

// Handle inline save (exactly like offers saveInlineEdit)
function handleAiInlineSave() {
    const form = document.getElementById('aiInlineModelForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    const modelId = window.currentAiEditingId;
    if (!modelId) {
        showAiNotification('Error: No model selected for editing', 'error');
        return;
    }
    
    const modelIndex = currentAiModels.findIndex(m => m.id === modelId);
    if (modelIndex === -1) {
        showAiNotification('Error: Model not found', 'error');
        return;
    }
    
    // Update the model data
    currentAiModels[modelIndex] = {
        ...currentAiModels[modelIndex],
        modelName: document.getElementById('aiInlineModelName').value,
        provider: document.getElementById('aiInlineProvider').value,
        pricePerToken: parseFloat(document.getElementById('aiInlinePricePerToken').value),
        currency: document.getElementById('aiInlineCurrency').value,
        availableTill: new Date(document.getElementById('aiInlineAvailableTill').value).toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    // Update filtered array
    const filteredIndex = filteredAiModels.findIndex(m => m.id === modelId);
    if (filteredIndex !== -1) {
        filteredAiModels[filteredIndex] = { ...currentAiModels[modelIndex] };
    }
    
    showAiNotification('AI model updated successfully!', 'success');
    renderAiModelsTable();
    hideAiInlineEditForm();
}

// Edit AI Model in create tab (fallback method)
function editAiModelInCreateTab(modelId) {
    const modelIndex = currentAiModels.findIndex(m => m.id === modelId);
    if (modelIndex === -1) return;
    
    const model = currentAiModels[modelIndex];
    
    // Set edit mode
    isAiEditMode = true;
    editingAiModelId = modelId;
    currentAiEditingIndex = modelIndex;
    
    // Switch to create tab
    showAiModelsCreateTab();
    
    // Populate form with model data
    populateAiCreateForm(model);
    
    // Update form for edit mode
    updateAiCreateFormForEdit(model.modelName);
    
    // Show additional fields for editing
    showAiEditModeFields(model);
}

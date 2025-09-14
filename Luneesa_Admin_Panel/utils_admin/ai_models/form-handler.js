// AI Models Form Handler

// Initialize form handlers
function initAiModelsFormHandlers() {
    // Save model button
    const saveBtn = document.getElementById('ai-models-save-model-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', handleAiModelSave);
    }
    
    // Clear form button
    const clearBtn = document.getElementById('ai-models-clear-form-btn');
    if (clearBtn) {
        clearBtn.addEventListener('click', handleAiFormClear);
    }
    
    // Delete current model button
    const deleteBtn = document.getElementById('ai-models-delete-current-btn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', deleteCurrentAiModel);
    }
    
    // Form validation on input
    const form = document.getElementById('aiModelForm');
    if (form) {
        const inputs = form.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateAiFormField(input));
            input.addEventListener('input', () => clearAiFieldError(input));
        });
    }
}

// Handle model save (create or update)
async function handleAiModelSave() {
    const formData = getAiCreateFormData();
    const errors = validateAiModelForm(formData);
    
    // Clear previous errors
    clearAllAiFormErrors();
    
    // Show errors if any
    if (Object.keys(errors).length > 0) {
        displayAiFormErrors(errors);
        showAiNotification('Please fix the form errors', 'error');
        return;
    }
    
    // Disable form while saving
    const saveBtn = document.getElementById('ai-models-save-model-btn');
    if (saveBtn) {
        saveBtn.disabled = true;
        saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
    }
    
    try {
        if (isAiEditMode && editingAiModelId) {
            // Update existing model
            await updateAiModel(editingAiModelId, formData);
        } else {
            // Create new model
            await createAiModel(formData);
        }
    } finally {
        // Re-enable form
        if (saveBtn) {
            saveBtn.disabled = false;
            if (isAiEditMode) {
                saveBtn.innerHTML = '<i class="fas fa-save"></i> Update Model';
            } else {
                saveBtn.innerHTML = '<i class="fas fa-save"></i> Save Model';
            }
        }
    }
}

// Create new AI model
async function createAiModel(formData) {
    try {
        // Save to server
        await saveAiModelToServer(formData);
        
        // Clear form and reset state
        clearAiCreateForm();
        isAiEditMode = false;
        editingAiModelId = null;
        currentAiEditingIndex = -1;
        updateAiCreateFormForNew();
        
        // Switch back to list tab
        showAiModelsListTab();
        
        showAiNotification('AI model created successfully', 'success');
    } catch (error) {
        console.error('Error creating AI model:', error);
        showAiNotification('Failed to create AI model: ' + error.message, 'error');
    }
}

// Update existing AI model
async function updateAiModel(modelId, formData) {
    try {
        // Update on server
        await updateAiModelOnServer(modelId, formData);
        
        // Clear form and reset state
        clearAiCreateForm();
        isAiEditMode = false;
        editingAiModelId = null;
        currentAiEditingIndex = -1;
        updateAiCreateFormForNew();
        
        // Switch back to list tab
        showAiModelsListTab();
        
        showAiNotification('AI model updated successfully', 'success');
    } catch (error) {
        console.error('Error updating AI model:', error);
        showAiNotification('Failed to update AI model: ' + error.message, 'error');
    }
}

// Handle form clear
function handleAiFormClear() {
    clearAiCreateForm();
    isAiEditMode = false;
    editingAiModelId = null;
    currentAiEditingIndex = -1;
    updateAiCreateFormForNew();
}

// Validate single form field
function validateAiFormField(input) {
    const fieldName = input.id.replace('ai', '').replace(/([A-Z])/g, (match) => match.toLowerCase());
    const value = input.type === 'number' ? parseFloat(input.value) : input.value.trim();
    
    let error = null;
    
    switch(input.id) {
        case 'aiModelName':
            if (!value) error = 'Model name is required';
            break;
        case 'aiProvider':
            if (!value) error = 'Provider is required';
            break;
        case 'aiPricePerToken':
            if (!value || value <= 0) error = 'Valid price per token is required';
            break;
        case 'aiAvailableTill':
            if (!input.value) {
                error = 'Available till date is required';
            } else {
                const tillDate = new Date(input.value);
                const now = new Date();
                if (tillDate <= now) {
                    error = 'Available till date must be in the future';
                }
            }
            break;
    }
    
    const formGroup = input.closest('.ai-form-group');
    if (error) {
        showAiFieldError(formGroup, error);
    } else {
        clearAiFieldError(input);
    }
}

// Display form errors
function displayAiFormErrors(errors) {
    Object.keys(errors).forEach(fieldName => {
        const input = document.getElementById('ai' + fieldName.charAt(0).toUpperCase() + fieldName.slice(1));
        if (input) {
            const formGroup = input.closest('.ai-form-group');
            showAiFieldError(formGroup, errors[fieldName]);
        }
    });
}

// Show field error
function showAiFieldError(formGroup, message) {
    if (!formGroup) return;
    
    formGroup.classList.add('has-error');
    formGroup.classList.remove('has-success');
    
    // Remove existing error message
    const existingError = formGroup.querySelector('.ai-form-error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'ai-form-error-message';
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    formGroup.appendChild(errorDiv);
}

// Clear field error
function clearAiFieldError(input) {
    const formGroup = input.closest('.ai-form-group');
    if (!formGroup) return;
    
    formGroup.classList.remove('has-error');
    if (input.value.trim()) {
        formGroup.classList.add('has-success');
    } else {
        formGroup.classList.remove('has-success');
    }
    
    const errorMsg = formGroup.querySelector('.ai-form-error-message');
    if (errorMsg) {
        errorMsg.remove();
    }
}

// Clear all form errors
function clearAllAiFormErrors() {
    const formGroups = document.querySelectorAll('.ai-form-group');
    formGroups.forEach(group => {
        group.classList.remove('has-error', 'has-success');
        const errorMsg = group.querySelector('.ai-form-error-message');
        if (errorMsg) {
            errorMsg.remove();
        }
    });
}

// Delete current AI model (when in edit mode)
function deleteCurrentAiModel() {
    if (!isAiEditMode || !editingAiModelId) return;
    
    const model = currentAiModels.find(m => m.id === editingAiModelId);
    if (!model) return;
    
    const confirmDelete = confirm(`Are you sure you want to delete "${model.modelName}"?\n\nThis action cannot be undone.`);
    if (!confirmDelete) return;
    
    // Remove from current models
    const modelIndex = currentAiModels.findIndex(m => m.id === editingAiModelId);
    if (modelIndex !== -1) {
        currentAiModels.splice(modelIndex, 1);
    }
    
    // Remove from filtered models
    const filteredIndex = filteredAiModels.findIndex(m => m.id === editingAiModelId);
    if (filteredIndex !== -1) {
        filteredAiModels.splice(filteredIndex, 1);
    }
    
    // Clear form and reset state
    clearAiCreateForm();
    isAiEditMode = false;
    editingAiModelId = null;
    currentAiEditingIndex = -1;
    updateAiCreateFormForNew();
    
    // Switch back to list tab
    showAiModelsListTab();
    
    // Refresh table
    renderAiModelsTable();
    
    showAiNotification('AI model deleted successfully', 'success');
}

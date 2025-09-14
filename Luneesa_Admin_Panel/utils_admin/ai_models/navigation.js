// AI Models Navigation Handler

// Handle AI Models sub-tab navigation
function initAiModelsNavigation() {
    const listSubTab = document.getElementById('ai-models-list-sub-tab-btn');
    const createSubTab = document.getElementById('ai-models-create-sub-tab-btn');
    const listContent = document.getElementById('aiModelsListContent');
    const createContent = document.getElementById('aiModelsCreateContent');
    
    if (!listSubTab || !createSubTab || !listContent || !createContent) {
        console.error('AI Models navigation elements not found');
        return;
    }
    
    // Handle List sub-tab click
    listSubTab.addEventListener('click', function() {
        if (this.classList.contains('active')) return;
        showAiModelsListTab();
    });
    
    // Handle Create sub-tab click
    createSubTab.addEventListener('click', function() {
        if (this.classList.contains('active')) return;
        showAiModelsCreateTab();
    });
}

// Show AI Models List tab
function showAiModelsListTab() {
    const listSubTab = document.getElementById('ai-models-list-sub-tab-btn');
    const createSubTab = document.getElementById('ai-models-create-sub-tab-btn');
    const listContent = document.getElementById('aiModelsListContent');
    const createContent = document.getElementById('aiModelsCreateContent');
    
    // Update sub-tab states
    createSubTab.classList.remove('active');
    listSubTab.classList.add('active');
    
    // Update content visibility
    createContent.classList.remove('active');
    listContent.classList.add('active');
    
    // Refresh the table
    renderAiModelsTable();
}

// Show AI Models Create tab
function showAiModelsCreateTab() {
    const listSubTab = document.getElementById('ai-models-list-sub-tab-btn');
    const createSubTab = document.getElementById('ai-models-create-sub-tab-btn');
    const listContent = document.getElementById('aiModelsListContent');
    const createContent = document.getElementById('aiModelsCreateContent');
    
    // Update sub-tab states
    listSubTab.classList.remove('active');
    createSubTab.classList.add('active');
    
    // Update content visibility
    listContent.classList.remove('active');
    createContent.classList.add('active');
    
    // If not in edit mode, clear the form
    if (!isAiEditMode) {
        clearAiCreateForm();
        updateAiCreateFormForNew();
    }
}

// Edit AI Model using inline editor (exactly like editOffer function)
function editAiModel(modelId) {
    event.stopPropagation();
    const model = currentAiModels.find(m => m.id === modelId);
    if (!model) {
        console.error('AI Model not found:', modelId);
        return;
    }
    
    // Show inline edit form
    showAiInlineEditForm(model, modelId);
}

// Show edit mode fields (ID, timestamps, etc.)
function showAiEditModeFields(model) {
    // We'll add these fields to the create form for edit mode
    const form = document.getElementById('aiModelForm');
    
    // Check if edit fields already exist
    let editSection = document.getElementById('ai-edit-mode-fields');
    
    if (!editSection) {
        // Create edit section
        editSection = document.createElement('div');
        editSection.id = 'ai-edit-mode-fields';
        editSection.className = 'ai-readonly-section';
        editSection.innerHTML = `
            <h4 style="margin-bottom: 16px; color: #374151; display: flex; align-items: center; gap: 8px;">
                <i class="fas fa-database"></i> Database Information
            </h4>
            <div class="ai-form-row">
                <div class="ai-form-group">
                    <label>ID</label>
                    <input type="text" id="aiEditModeId" disabled class="readonly-field" style="background: #f9fafb; color: #6b7280;">
                </div>
            </div>
            <div class="ai-form-row">
                <div class="ai-form-group">
                    <label>Created At</label>
                    <input type="text" id="aiEditModeCreatedAt" disabled class="readonly-field" style="background: #f9fafb; color: #6b7280;">
                </div>
                <div class="ai-form-group">
                    <label>Updated At</label>
                    <input type="text" id="aiEditModeUpdatedAt" disabled class="readonly-field" style="background: #f9fafb; color: #6b7280;">
                </div>
            </div>
            <hr style="margin: 20px 0; border: 1px solid #e5e7eb;">
        `;
        
        // Insert at the beginning of the form
        form.insertBefore(editSection, form.firstChild);
    }
    
    // Populate read-only fields
    document.getElementById('aiEditModeId').value = model.id || '';
    document.getElementById('aiEditModeCreatedAt').value = formatAiDate(model.createdAt) || '';
    document.getElementById('aiEditModeUpdatedAt').value = formatAiDate(model.updatedAt) || '';
    
    // Show delete button
    const deleteBtn = document.getElementById('ai-models-delete-current-btn');
    if (deleteBtn) {
        deleteBtn.classList.remove('hidden');
        deleteBtn.style.display = 'inline-block';
    }
}

// Hide edit mode fields
function hideAiEditModeFields() {
    const editSection = document.getElementById('ai-edit-mode-fields');
    if (editSection) {
        editSection.remove();
    }
    
    // Hide delete button
    const deleteBtn = document.getElementById('ai-models-delete-current-btn');
    if (deleteBtn) {
        deleteBtn.classList.add('hidden');
        deleteBtn.style.display = 'none';
    }
}

// Update create form header and buttons for new model
function updateAiCreateFormForNew() {
    const headerText = document.getElementById('aiCreateHeaderText');
    const saveBtn = document.getElementById('ai-models-save-model-btn');
    
    if (headerText) {
        headerText.innerHTML = ' Create New AI Model';
    }
    
    if (saveBtn) {
        saveBtn.innerHTML = '<i class="fas fa-save"></i> Save Model';
        saveBtn.className = 'ai-success-create';
    }
    
    // Hide edit mode fields
    hideAiEditModeFields();
}

// Update create form for editing existing model
function updateAiCreateFormForEdit(modelName) {
    const headerText = document.getElementById('aiCreateHeaderText');
    const saveBtn = document.getElementById('ai-models-save-model-btn');
    
    if (headerText) {
        headerText.innerHTML = `<i class="fas fa-edit"></i> Edit ${modelName}`;
    }
    
    if (saveBtn) {
        saveBtn.innerHTML = '<i class="fas fa-save"></i> Update Model';
        saveBtn.className = 'btn btn-warning';
    }
}

// Switch to create tab and populate form for editing (backwards compatibility)
function switchToCreateTabForEdit(modelId) {
    editAiModel(modelId);
}

// Main function to programmatically switch to AI Models List tab
function switchToAiModelsListTab() {
    console.log('Switching to AI Models List tab...');
    
    // Find and click the AI Models list sub-tab button
    const listSubTabBtn = document.getElementById('ai-models-list-sub-tab-btn');
    if (listSubTabBtn) {
        // Trigger the click event to switch tabs
        listSubTabBtn.click();
        
        // Add visual feedback with a brief highlight
        listSubTabBtn.style.animation = 'aiTabHighlight 0.6s ease-in-out';
        setTimeout(() => {
            listSubTabBtn.style.animation = '';
        }, 600);
        
        console.log('Successfully switched to AI Models List tab');
    } else {
        console.error('AI Models list sub-tab button not found');
        // Fallback: directly call showAiModelsListTab
        showAiModelsListTab();
    }
}

// Clear create form
function clearAiCreateForm() {
    const form = document.getElementById('aiModelForm');
    if (form) {
        form.reset();
    }
    
    // Reset edit mode
    isAiEditMode = false;
    editingAiModelId = null;
    currentAiEditingIndex = -1;
    
    // Remove any validation states
    const formGroups = document.querySelectorAll('.ai-form-group');
    formGroups.forEach(group => {
        group.classList.remove('has-error', 'has-success');
        const errorMsg = group.querySelector('.ai-form-error-message');
        if (errorMsg) {
            errorMsg.remove();
        }
    });
    
    // Hide edit mode fields
    hideAiEditModeFields();
}

// Populate create form with model data
function populateAiCreateForm(model) {
    document.getElementById('aiModelName').value = model.modelName || '';
    document.getElementById('aiProvider').value = model.provider || '';
    document.getElementById('aiPricePerToken').value = model.pricePerToken || '';
    document.getElementById('aiCurrency').value = model.currency || 'USD';
    document.getElementById('aiAvailableTill').value = formatDateTimeForInput(model.availableTill);
}

// Get form data from create form
function getAiCreateFormData() {
    return {
        modelName: document.getElementById('aiModelName').value.trim(),
        provider: document.getElementById('aiProvider').value.trim(),
        pricePerToken: parseFloat(document.getElementById('aiPricePerToken').value),
        currency: document.getElementById('aiCurrency').value,
        availableTill: document.getElementById('aiAvailableTill').value
    };
}

document.addEventListener("DOMContentLoaded", function () {
  const listTab = document.getElementById("ai-models-list-sub-tab-btn");
  const createTab = document.getElementById("ai-models-create-sub-tab-btn");

  const listContent = document.getElementById("aiModelsListContent");
  const createContent = document.getElementById("aiModelsCreateContent");

  function switchTab(activeTab, activeContent) {
    // Reset all tabs
    [listTab, createTab].forEach(tab => tab.classList.remove("active"));
    [listContent, createContent].forEach(content => content.classList.remove("active"));

    // Activate selected
    activeTab.classList.add("active");
    activeContent.classList.add("active");
    
    // If switching to list tab, refresh the table
    if (activeTab === listTab) {
        // Refresh AI models table to show updated data
        if (typeof renderAiModelsTable === 'function') {
            renderAiModelsTable();
        }
    }
  }

  listTab.addEventListener("click", () => switchTab(listTab, listContent));
  createTab.addEventListener("click", () => switchTab(createTab, createContent));
});
// AI Models Table Manager - Updated

// Initialize table handlers
function initAiModelsTableHandlers() {
    // Initial table render
    renderAiModelsTable();
}

// Render AI models table with only specified columns
function renderAiModelsTable() {
    const tableBody = document.getElementById('aiModelsTableBody');
    if (!tableBody) return;
    
    if (filteredAiModels.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" class="ai-models-table-empty">
                    <i class="fas fa-robot"></i>
                    <div>No AI models found</div>
                    <small>Try adjusting your search or filters</small>
                </td>
            </tr>
        `;
        return;
    }
    
    tableBody.innerHTML = filteredAiModels.map(model => createAiModelRow(model)).join('');
    
    // Attach event listeners to new buttons
    attachAiRowEventListeners();
}

// Create AI model table row with only required columns
function createAiModelRow(model) {
    const providerBadgeClass = getProviderBadgeClass(model.provider);
    
    return `
        <tr data-model-id="${model.id}">
            <td>
                <strong>${escapeHtml(model.modelName)}</strong>
            </td>
            <td>
                <span class="ai-provider-badge ${providerBadgeClass}">
                    ${escapeHtml(model.provider)}
                </span>
            </td>
            <td class="ai-price-cell">
                ${formatAiPrice(model.pricePerToken)}
            </td>
            <td class="ai-currency-cell">
                ${escapeHtml(model.currency)}
            </td>
            <td>
                <button class="ai-inline-edit-btn" 
                        data-model-id="${model.id}" 
                        title="Edit model">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="ai-delete-btn" 
                        data-model-id="${model.id}" 
                        title="Delete model">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `;
}

// Attach event listeners to table row buttons
function attachAiRowEventListeners() {
    // Edit buttons (use inline editor)
    document.querySelectorAll('.ai-inline-edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const modelId = e.currentTarget.getAttribute('data-model-id');
            editAiModel(modelId);
        });
    });
    
    // Delete buttons
    document.querySelectorAll('.ai-delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modelId = e.currentTarget.getAttribute('data-model-id');
            handleAiModelDelete(modelId);
        });
    });
}

// Handle model deletion
function handleAiModelDelete(modelId) {
    const model = currentAiModels.find(m => m.id === modelId);
    if (!model) return;
    
    const confirmDelete = confirm(`Are you sure you want to delete "${model.modelName}"?\n\nThis action cannot be undone.`);
    if (!confirmDelete) return;
    
    deleteAiModel(modelId);
}

// Delete AI model
function deleteAiModel(modelId) {
    // Remove from current models
    const modelIndex = currentAiModels.findIndex(m => m.id === modelId);
    if (modelIndex !== -1) {
        currentAiModels.splice(modelIndex, 1);
    }
    
    // Remove from filtered models
    const filteredIndex = filteredAiModels.findIndex(m => m.id === modelId);
    if (filteredIndex !== -1) {
        filteredAiModels.splice(filteredIndex, 1);
    }
    
    // If editing this model, clear the form
    if (editingAiModelId === modelId) {
        clearAiCreateForm();
        isAiEditMode = false;
        editingAiModelId = null;
        currentAiEditingIndex = -1;
        updateAiCreateFormForNew();
    }
    
    // Refresh table
    renderAiModelsTable();
    
    showAiNotification('AI model deleted successfully', 'success');
}

// HTML escape function
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

// Show loading state
function showAiTableLoading() {
    const tableBody = document.getElementById('aiModelsTableBody');
    if (tableBody) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" class="ai-models-table-loading">
                    <i class="fas fa-spinner fa-spin"></i>
                    <div>Loading AI models...</div>
                </td>
            </tr>
        `;
    }
}
// AI Models Export and Duplicate Functions

// Initialize export handlers
function initAiModelsExport() {
    const exportBtn = document.getElementById('ai-models-export-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', handleAiExport);
    }
}

// Handle export functionality
function handleAiExport() {
    const exportData = filteredAiModels.map(model => ({
        'Model Name': model.modelName,
        'Provider': model.provider,
        'Price Per Token': model.pricePerToken,
        'Currency': model.currency,
        'Available Till': formatAiDate(model.availableTill),
        'Created At': formatAiDate(model.createdAt),
        'Updated At': formatAiDate(model.updatedAt)
    }));
    
    if (exportData.length === 0) {
        showAiNotification('No data to export', 'warning');
        return;
    }
    
    // Create CSV content
    const csvContent = convertToCSV(exportData);
    
    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `ai-models-${getCurrentDateString()}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showAiNotification(`Exported ${exportData.length} AI models`, 'success');
}

// Convert array of objects to CSV
function convertToCSV(data) {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvRows = [];
    
    // Add headers
    csvRows.push(headers.map(header => `"${header}"`).join(','));
    
    // Add data rows
    data.forEach(row => {
        const values = headers.map(header => {
            const value = row[header];
            // Escape quotes and wrap in quotes
            return `"${String(value).replace(/"/g, '""')}"`;
        });
        csvRows.push(values.join(','));
    });
    
    return csvRows.join('\n');
}

// Get current date string for filename
function getCurrentDateString() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    return `${year}${month}${day}_${hours}${minutes}`;
}

// Duplicate AI model
function duplicateAiModel(modelId) {
    const originalModel = currentAiModels.find(m => m.id === modelId);
    if (!originalModel) return;
    
    const duplicatedModel = {
        ...originalModel,
        id: generateAiModelId(),
        modelName: `${originalModel.modelName} (Copy)`,
        createdAt: getCurrentTimestamp(),
        updatedAt: getCurrentTimestamp()
    };
    
    // Add to data arrays
    currentAiModels.unshift(duplicatedModel);
    
    // Apply current filters
    const filterState = getAiFilterState();
    applyAiFilters(filterState.searchTerm, filterState.selectedProvider);
    
    showAiNotification('AI model duplicated successfully', 'success');
}

// Bulk operations
function bulkDeleteAiModels(modelIds) {
    if (!modelIds || modelIds.length === 0) return;
    
    const confirmDelete = confirm(`Are you sure you want to delete ${modelIds.length} AI model(s)?\n\nThis action cannot be undone.`);
    if (!confirmDelete) return;
    
    let deletedCount = 0;
    
    modelIds.forEach(modelId => {
        // Remove from current models
        const modelIndex = currentAiModels.findIndex(m => m.id === modelId);
        if (modelIndex !== -1) {
            currentAiModels.splice(modelIndex, 1);
            deletedCount++;
        }
    });
    
    // Reset editing state if needed
    if (modelIds.includes(editingAiModelId)) {
        clearAiCreateForm();
        editingAiModelId = null;
        updateAiCreateFormForNew();
    }
    
    // Hide inline edit form if needed
    const inlineForm = document.getElementById('aiInlineEditForm');
    const editingId = inlineForm?.getAttribute('data-editing-id');
    if (editingId && modelIds.includes(editingId)) {
        hideAiInlineEditForm();
    }
    
    // Apply current filters
    const filterState = getAiFilterState();
    applyAiFilters(filterState.searchTerm, filterState.selectedProvider);
    
    showAiNotification(`${deletedCount} AI model(s) deleted successfully`, 'success');
}

// Export filtered results
function exportFilteredAiModels() {
    if (filteredAiModels.length === 0) {
        showAiNotification('No filtered results to export', 'warning');
        return;
    }
    
    handleAiExport();
}

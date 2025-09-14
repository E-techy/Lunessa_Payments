// AI Models Main Application

// Initialize AI Models functionality
async function initAiModels() {
    console.log('Initializing AI Models...');
    
    try {
        // Initialize all components
        initAiModelsNavigation();
        initAiModelsFormHandlers();
        initAiInlineEditor();
        initAiModelsTableHandlers();
        initAiModelsSearchFilter();
        initAiModelsExport();
        
        // Initialize data from server
        await initAiModelsData();
        
        console.log('AI Models initialized successfully');
    } catch (error) {
        console.error('Error initializing AI Models:', error);
        showAiNotification('Failed to initialize AI Models', 'error');
    }
}

// Initialize AI Models when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initAiModels().catch(console.error);
    });
} else {
    initAiModels().catch(console.error);
}

// Global AI Models event handlers (if needed for dynamic content)
window.aiModelsHandlers = {
    switchToCreateTab: switchToCreateTabForEdit,
    showInlineEdit: showAiInlineEditForm,
    deleteModel: handleAiModelDelete,
    duplicateModel: duplicateAiModel,
    exportModels: handleAiExport,
    clearFilters: clearAiFilters,
    sortModels: sortAiModels
};

// Auto-refresh functionality (if needed)
function startAiModelsAutoRefresh(intervalMs = 30000) {
    setInterval(() => {
        // Refresh table to show updated data
        renderAiModelsTable();
        updateAiResultsCount();
    }, intervalMs);
}

// Cleanup function
function cleanupAiModels() {
    // Clear any intervals or timeouts
    // Remove event listeners if needed
    console.log('AI Models cleanup completed');
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initAiModels,
        currentAiModels,
        filteredAiModels,
        aiModelsHandlers: window.aiModelsHandlers
    };
}

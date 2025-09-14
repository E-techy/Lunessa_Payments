// AI Models Data Management - Server Integration

// State management for AI models
let currentAiModels = [];
let filteredAiModels = [];
let editingAiModelId = null;
let isAiEditMode = false;
let currentAiEditingIndex = -1;

// Initialize data loading from server
async function initAiModelsData() {
    console.log('Loading AI models from server...');
    try {
        await loadAiModelsFromServer();
        console.log('AI models loaded successfully:', currentAiModels.length, 'models');
    } catch (error) {
        console.error('Failed to load AI models:', error);
        showAiNotification('Failed to load AI models from server', 'error');
    }
}

// Load AI models from server
async function loadAiModelsFromServer() {
    try {
        const response = await fetch("/AI_models_pricing_data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({}), // empty = fetch all models
        });

        const result = await response.json();

        if (result.success && Array.isArray(result.data)) {
            // Process server data to match our expected format
            currentAiModels = result.data.map(model => ({
                ...model,
                // Ensure dates are properly formatted
                availableTill: model.availableTill || new Date().toISOString(),
                createdAt: model.createdAt || new Date().toISOString(),
                updatedAt: model.updatedAt || new Date().toISOString()
            }));
            
            // Initialize filtered array
            filteredAiModels = [...currentAiModels];
            
            // Render table if it exists
            if (typeof renderAiModelsTable === 'function') {
                renderAiModelsTable();
            }
            
            console.log("✅ AI Models loaded from server:", currentAiModels);
            return currentAiModels;
        } else {
            throw new Error(result.message || 'Invalid server response');
        }
    } catch (error) {
        console.error("❌ Failed to load AI models:", error);
        throw error;
    }
}

// Refresh data from server
async function refreshAiModelsData() {
    try {
        await loadAiModelsFromServer();
        
        // Apply current filters if any
        if (typeof getAiFilterState === 'function') {
            const filterState = getAiFilterState();
            if (typeof applyAiFilters === 'function') {
                applyAiFilters(filterState.searchTerm, filterState.selectedProvider);
            }
        }
        
        showAiNotification('Data refreshed successfully', 'success');
    } catch (error) {
        showAiNotification('Failed to refresh data', 'error');
    }
}

// Save model to server (create new model)
async function saveAiModelToServer(modelData) {
    try {
        const response = await fetch("/AI_models_pricing_data", {
            method: "POST", // or PUT based on your API
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                action: 'create',
                data: modelData
            }),
        });

        const result = await response.json();

        if (result.success) {
            console.log("✅ AI Model created on server:", result.data);
            // Refresh data to get updated list
            await refreshAiModelsData();
            return result.data;
        } else {
            throw new Error(result.message || 'Failed to create model');
        }
    } catch (error) {
        console.error("❌ Failed to create AI model:", error);
        throw error;
    }
}

// Update model on server
async function updateAiModelOnServer(modelId, modelData) {
    try {
        const response = await fetch("/AI_models_pricing_data", {
            method: "PUT", // or POST based on your API
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                action: 'update',
                id: modelId,
                data: modelData
            }),
        });

        const result = await response.json();

        if (result.success) {
            console.log("✅ AI Model updated on server:", result.data);
            // Refresh data to get updated list
            await refreshAiModelsData();
            return result.data;
        } else {
            throw new Error(result.message || 'Failed to update model');
        }
    } catch (error) {
        console.error("❌ Failed to update AI model:", error);
        throw error;
    }
}

// Delete model from server
async function deleteAiModelFromServer(modelId) {
    try {
        const response = await fetch("/AI_models_pricing_data", {
            method: "DELETE", // or POST based on your API
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                action: 'delete',
                id: modelId
            }),
        });

        const result = await response.json();

        if (result.success) {
            console.log("✅ AI Model deleted from server:", modelId);
            // Refresh data to get updated list
            await refreshAiModelsData();
            return true;
        } else {
            throw new Error(result.message || 'Failed to delete model');
        }
    } catch (error) {
        console.error("❌ Failed to delete AI model:", error);
        throw error;
    }
}

// Generate a new ID for creating models (fallback if server doesn't provide one)
function generateAiModelId() {
    return Array.from({length: 24}, () => Math.floor(Math.random() * 16).toString(16)).join('');
}

// Get current timestamp in ISO format
function getCurrentTimestamp() {
    return new Date().toISOString();
}

// Note: Data initialization is handled by app.js - no auto-initialization here

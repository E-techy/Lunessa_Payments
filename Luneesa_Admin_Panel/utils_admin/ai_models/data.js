// AI Models Data Management - Server Integration

// State management for AI models
let currentAiModels = [];
let filteredAiModels = [];
let editingAiModelId = null;
let isAiEditMode = false;
let currentAiEditingIndex = -1;

// Authentication token management
function getAuthToken() {
    // Try to get token from cookie first
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'authToken') {
            return value;
        }
    }
    
    // Try localStorage as fallback (if used by your app)
    return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
}

// Create authenticated fetch headers
function createAuthHeaders() {
    const headers = {
        "Content-Type": "application/json"
    };
    
    const token = getAuthToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
}

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
            headers: createAuthHeaders(),
            body: JSON.stringify({}), // empty = fetch all models
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Authentication required. Please log in again.');
            } else if (response.status === 403) {
                throw new Error('Access denied. Insufficient permissions.');
            } else {
                throw new Error(`Server error: ${response.status}`);
            }
        }

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
        const response = await fetch("/admin/AI_pricing_data", {
            method: "POST",
            headers: createAuthHeaders(),
            body: JSON.stringify({
                action: 'add',
                modelsData: [modelData]
            }),
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Authentication required. Please log in again.');
            } else if (response.status === 403) {
                throw new Error('Access denied. Only superAdmin can create models.');
            } else {
                throw new Error(`Server error: ${response.status}`);
            }
        }

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
        // Find the current model to get the modelName for modification
        const currentModel = currentAiModels.find(m => m.id === modelId);
        if (!currentModel) {
            throw new Error('Model not found for update');
        }

        // Prepare model data with modelName for server identification
        const updateData = {
            ...modelData,
            modelName: currentModel.modelName // Use existing modelName for identification
        };

        const response = await fetch("/admin/AI_pricing_data", {
            method: "POST",
            headers: createAuthHeaders(),
            body: JSON.stringify({
                action: 'modify',
                modelsData: [updateData]
            }),
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Authentication required. Please log in again.');
            } else if (response.status === 403) {
                throw new Error('Access denied. Only superAdmin can modify models.');
            } else {
                throw new Error(`Server error: ${response.status}`);
            }
        }

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
        // Find the model to get its modelName for deletion
        const modelToDelete = currentAiModels.find(m => m.id === modelId);
        if (!modelToDelete) {
            throw new Error('Model not found for deletion');
        }

        const response = await fetch("/admin/AI_pricing_data", {
            method: "POST",
            headers: createAuthHeaders(),
            body: JSON.stringify({
                action: 'delete',
                modelsData: [modelToDelete.modelName] // Send modelName for deletion
            }),
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Authentication required. Please log in again.');
            } else if (response.status === 403) {
                throw new Error('Access denied. Only superAdmin can delete models.');
            } else {
                throw new Error(`Server error: ${response.status}`);
            }
        }

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

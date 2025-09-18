/**
 * Token Allocation System - Main Controller
 * Coordinates all modules and provides unified API
 */

class TokenAllocationSystem {
    constructor() {
        this.modules = {};
        this.initialized = false;
        this.init();
    }
    
    init() {
        // Wait for all modules to load
        this.waitForModules().then(() => {
            this.initializeModules();
            this.bindMainEvents();
            this.initialized = true;
            console.log('Token Allocation System initialized successfully');
        });
    }
    
    async waitForModules() {
        const requiredModules = [
            'TokenAllocationCore',
            'TokenSingleHandler', 
            'TokenBulkHandler',
            'TokenJsonHandler',
            'TokenFormValidation',
            'TokenResultsHandler',
            'TokenNotificationHandler'
        ];
        
        return new Promise((resolve) => {
            const checkModules = () => {
                const allLoaded = requiredModules.every(moduleName => 
                    typeof window[moduleName] !== 'undefined'
                );
                
                if (allLoaded) {
                    resolve();
                } else {
                    setTimeout(checkModules, 100);
                }
            };
            checkModules();
        });
    }
    
    initializeModules() {
        try {
            this.modules.core = new TokenAllocationCore();
            this.modules.single = new TokenSingleHandler();
            this.modules.bulk = new TokenBulkHandler();
            this.modules.json = new TokenJsonHandler();
            this.modules.validation = new TokenFormValidation();
            this.modules.results = new TokenResultsHandler();
            this.modules.notifications = new TokenNotificationHandler();
            
            console.log('All modules initialized:', Object.keys(this.modules));
        } catch (error) {
            console.error('Error initializing modules:', error);
            alert('Failed to initialize token allocation system. Please refresh the page.');
        }
    }
    
    bindMainEvents() {
        // Global keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 's':
                        e.preventDefault();
                        this.quickSave();
                        break;
                    case 'r':
                        e.preventDefault();
                        this.refreshAll();
                        break;
                    case 'Escape':
                        this.cancelAllOperations();
                        break;
                }
            }
        });
        
        // Global error handling
        window.addEventListener('error', (e) => {
            console.error('Global error:', e.error);
            if (this.modules.notifications) {
                this.modules.notifications.showError('An unexpected error occurred. Please try again.');
            }
        });
        
        // Unload warning for unsaved changes
        window.addEventListener('beforeunload', (e) => {
            if (this.hasUnsavedChanges()) {
                e.preventDefault();
                e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
                return e.returnValue;
            }
        });
    }
    
    // Public API methods
    getCurrentMode() {
        return this.modules.core?.getCurrentMode() || 'single';
    }
    
    switchMode(mode) {
        if (this.modules.core) {
            this.modules.core.switchMode(mode);
        }
    }
    
    validateAllFields() {
        if (!this.modules.validation) return false;
        
        const currentMode = this.getCurrentMode();
        if (currentMode === 'single') {
            return this.modules.validation.validateAllSingleFields();
        } else {
            return this.modules.validation.validateAllBulkFields();
        }
    }
    
    clearAllForms() {
        if (this.modules.single) {
            this.modules.single.clearSingleForm();
        }
        if (this.modules.bulk) {
            this.modules.bulk.clearAllBulkUsers();
        }
        if (this.modules.json) {
            this.modules.json.clearJsonData();
        }
    }
    
    showResults(results) {
        if (this.modules.results) {
            this.modules.results.showResults(results);
        }
    }
    
    hideResults() {
        if (this.modules.results) {
            this.modules.results.hideResults();
        }
    }
    
    showNotification(message, type = 'info', duration) {
        if (this.modules.notifications) {
            return this.modules.notifications.showNotification(message, type, duration);
        }
        return null;
    }
    
    // Utility methods
    quickSave() {
        const currentData = this.exportCurrentState();
        localStorage.setItem('tokenAllocation_backup', JSON.stringify(currentData));
        
        if (this.modules.notifications) {
            this.modules.notifications.showSuccess('Current state saved to local backup');
        }
    }
    
    quickLoad() {
        try {
            const savedData = localStorage.getItem('tokenAllocation_backup');
            if (savedData) {
                const data = JSON.parse(savedData);
                this.importState(data);
                
                if (this.modules.notifications) {
                    this.modules.notifications.showSuccess('State restored from local backup');
                }
            } else {
                if (this.modules.notifications) {
                    this.modules.notifications.showWarning('No backup found');
                }
            }
        } catch (error) {
            console.error('Error loading backup:', error);
            if (this.modules.notifications) {
                this.modules.notifications.showError('Failed to load backup');
            }
        }
    }
    
    exportCurrentState() {
        const state = {
            timestamp: new Date().toISOString(),
            mode: this.getCurrentMode(),
            singleForm: {},
            bulkData: [],
            jsonData: null,
            results: []
        };
        
        // Export single form data
        const singleForm = document.getElementById('singleTokenForm');
        if (singleForm) {
            const formData = new FormData(singleForm);
            for (let [key, value] of formData.entries()) {
                state.singleForm[key] = value;
            }
        }
        
        // Export bulk data
        if (this.modules.bulk) {
            state.bulkData = this.modules.bulk.getBulkFormData();
        }
        
        // Export JSON data
        if (this.modules.json) {
            state.jsonData = this.modules.json.getJsonData();
        }
        
        // Export current results
        if (this.modules.results) {
            state.results = this.modules.results.getResults();
        }
        
        return state;
    }
    
    importState(state) {
        if (!state) return;
        
        // Switch to saved mode
        if (state.mode) {
            this.switchMode(state.mode);
        }
        
        // Import single form data
        if (state.singleForm) {
            Object.keys(state.singleForm).forEach(key => {
                const field = document.getElementById(key);
                if (field) {
                    field.value = state.singleForm[key];
                }
            });
        }
        
        // Import JSON data
        if (state.jsonData && this.modules.json) {
            this.modules.json.setJsonData(state.jsonData);
        }
        
        // Import results
        if (state.results && this.modules.results) {
            this.modules.results.showResults(state.results);
        }
    }
    
    refreshAll() {
        if (this.hasUnsavedChanges()) {
            if (confirm('This will clear all current data. Are you sure?')) {
                this.clearAllForms();
                this.hideResults();
                if (this.modules.notifications) {
                    this.modules.notifications.clearAll();
                    this.modules.notifications.showInfo('All data cleared');
                }
            }
        } else {
            this.clearAllForms();
            this.hideResults();
        }
    }
    
    hasUnsavedChanges() {
        // Check if any forms have data
        const singleForm = document.getElementById('singleTokenForm');
        if (singleForm) {
            const formData = new FormData(singleForm);
            for (let [key, value] of formData.entries()) {
                if (value.trim()) return true;
            }
        }
        
        // Check bulk entries
        const bulkEntries = document.querySelectorAll('.bulk-user-entry input');
        for (let input of bulkEntries) {
            if (input.value.trim()) return true;
        }
        
        // Check JSON data
        const jsonData = document.getElementById('jsonImportData')?.value?.trim();
        if (jsonData) return true;
        
        return false;
    }
    
    cancelAllOperations() {
        // Cancel any ongoing operations
        const loadingButtons = document.querySelectorAll('.token-btn-loading');
        loadingButtons.forEach(button => {
            button.classList.remove('token-btn-loading');
            button.disabled = false;
        });
        
        if (this.modules.notifications) {
            this.modules.notifications.showInfo('All operations cancelled');
        }
    }
    
    // Module access methods
    getSingleHandler() {
        return this.modules.single;
    }
    
    getBulkHandler() {
        return this.modules.bulk;
    }
    
    getJsonHandler() {
        return this.modules.json;
    }
    
    getValidationHandler() {
        return this.modules.validation;
    }
    
    getResultsHandler() {
        return this.modules.results;
    }
    
    getNotificationHandler() {
        return this.modules.notifications;
    }
    
    getCoreHandler() {
        return this.modules.core;
    }
    
    // System info
    getSystemInfo() {
        return {
            initialized: this.initialized,
            modules: Object.keys(this.modules),
            currentMode: this.getCurrentMode(),
            hasResults: this.modules.results?.hasResults() || false,
            hasNotifications: this.modules.notifications?.hasActiveNotifications() || false,
            version: '1.0.0'
        };
    }
}

// Global initialization
let tokenAllocation;
document.addEventListener('DOMContentLoaded', () => {
    tokenAllocation = new TokenAllocationSystem();
    
    // Make it globally available for debugging
    window.tokenAllocation = tokenAllocation;
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TokenAllocationSystem;
}

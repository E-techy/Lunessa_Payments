/**
 * Token Allocation System - Main Entry Point
 * Coordinates all modules and provides a single entry point for the application
 * 
 * This file should be loaded after all the individual modules
 */

// Global namespace to avoid conflicts
window.TokenAllocationApp = {
    // Module references
    core: null,
    api: null,
    dataHandler: null,
    validator: null,
    bulkManager: null,
    jsonHandler: null,
    resultsDisplay: null,
    successDisplay: null,
    notifications: null,
    formsHandler: null,
    
    // Configuration
    config: {
        apiEndpoint: '/admin/allot_tokens_to_agents',
        mockMode: false,
        debug: false
    },
    
    // Initialize the entire application
    init(userConfig = {}) {
        // Merge user configuration
        this.config = { ...this.config, ...userConfig };
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeModules());
        } else {
            this.initializeModules();
        }
    },
    
    initializeModules() {
        try {
            this.log('Initializing Token Allocation System...');
            
            // Initialize modules in dependency order
            this.initializeNotifications();
            this.initializeValidator();
            this.initializeDataHandler();
            this.initializeAPIHandler();
            this.initializeBulkManager();
            this.initializeJsonHandler();
            this.initializeResultsDisplay();
            this.initializeSuccessDisplay();
            this.initializeFormsHandler();
            this.initializeCoreSystem();
            
            this.bindGlobalEvents();
            
            this.log('Token Allocation System initialized successfully');
        } catch (error) {
            console.error('Failed to initialize Token Allocation System:', error);
        }
    },
    
    initializeNotifications() {
        if (typeof TokenNotifications !== 'undefined') {
            this.notifications = new TokenNotifications();
            window.tokenNotifications = this.notifications;
        }
    },
    
    initializeValidator() {
        if (typeof TokenValidator !== 'undefined') {
            this.validator = new TokenValidator();
            window.tokenValidator = this.validator;
        }
    },
    
    initializeDataHandler() {
        if (typeof TokenDataHandler !== 'undefined') {
            this.dataHandler = new TokenDataHandler();
            window.tokenDataHandler = this.dataHandler;
        }
    },
    
    initializeAPIHandler() {
        if (typeof TokenAPIHandler !== 'undefined') {
            this.api = new TokenAPIHandler();
            this.api.mockMode = this.config.mockMode;
            window.tokenAPI = this.api;
        }
    },
    
    initializeBulkManager() {
        if (typeof TokenBulkManager !== 'undefined') {
            this.bulkManager = new TokenBulkManager();
            window.tokenBulkManager = this.bulkManager;
        }
    },
    
    initializeJsonHandler() {
        if (typeof TokenJsonHandler !== 'undefined') {
            this.jsonHandler = new TokenJsonHandler();
            window.tokenJsonHandler = this.jsonHandler;
        }
    },
    
    initializeResultsDisplay() {
        if (typeof TokenResultsDisplay !== 'undefined') {
            this.resultsDisplay = new TokenResultsDisplay();
            window.tokenResults = this.resultsDisplay;
        }
    },
    
    initializeSuccessDisplay() {
        if (typeof TokenSuccessDisplay !== 'undefined') {
            this.successDisplay = new TokenSuccessDisplay();
            window.tokenSuccessDisplay = this.successDisplay;
        }
    },
    
    initializeFormsHandler() {
        if (typeof TokenFormsHandler !== 'undefined') {
            this.formsHandler = new TokenFormsHandler();
            window.tokenFormsHandler = this.formsHandler;
        }
    },
    
    initializeCoreSystem() {
        if (typeof TokenAllocationSystem !== 'undefined') {
            this.core = new TokenAllocationSystem();
            this.core.apiEndpoint = this.config.apiEndpoint;
            window.tokenAllocation = this.core;
        }
    },
    
    bindGlobalEvents() {
        // Global keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K to focus search/username field
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const usernameField = document.getElementById('singleUsername');
                if (usernameField) {
                    usernameField.focus();
                }
            }
            
            // Escape to clear notifications
            if (e.key === 'Escape') {
                if (this.notifications) {
                    this.notifications.clearAllNotifications();
                }
            }
        });
        
        // Window beforeunload warning for unsaved changes
        window.addEventListener('beforeunload', (e) => {
            if (this.hasUnsavedChanges()) {
                e.preventDefault();
                e.returnValue = '';
                return '';
            }
        });
        
        // Handle visibility change (tab switching)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.log('Application hidden');
            } else {
                this.log('Application visible');
                this.refreshIfNeeded();
            }
        });
    },
    
    hasUnsavedChanges() {
        // Check if there are unsaved changes in forms
        const singleForm = document.getElementById('singleTokenForm');
        if (singleForm) {
            const formData = new FormData(singleForm);
            for (let [key, value] of formData.entries()) {
                if (value.trim() !== '') {
                    return true;
                }
            }
        }
        
        // Check bulk entries
        const bulkEntries = document.querySelectorAll('.bulk-user-entry');
        for (let entry of bulkEntries) {
            const inputs = entry.querySelectorAll('input');
            for (let input of inputs) {
                if (input.value.trim() !== '') {
                    return true;
                }
            }
        }
        
        return false;
    },
    
    refreshIfNeeded() {
        // Refresh data if the tab has been hidden for more than 5 minutes
        const now = Date.now();
        const lastVisible = localStorage.getItem('tokenApp_lastVisible');
        
        if (lastVisible && (now - parseInt(lastVisible)) > 300000) { // 5 minutes
            this.log('Refreshing data after long absence');
            // You could trigger a data refresh here
        }
        
        localStorage.setItem('tokenApp_lastVisible', now.toString());
    },
    
    // Utility methods
    log(message, level = 'info') {
        if (this.config.debug || level === 'error') {
            console[level]('[TokenAllocationApp]', message);
        }
    },
    
    showError(message, error = null) {
        this.log(`Error: ${message}`, 'error');
        if (error) {
            console.error(error);
        }
        
        if (this.notifications) {
            this.notifications.showError(message);
        } else {
            alert(message);
        }
    },
    
    showSuccess(message) {
        this.log(`Success: ${message}`);
        if (this.notifications) {
            this.notifications.showSuccess(message);
        }
    },
    
    // Public API methods
    allocateTokens(formData) {
        if (this.core) {
            return this.core.handleSingleAllocation();
        }
    },
    
    allocateBulkTokens(bulkData) {
        if (this.core) {
            return this.core.handleBulkAllocation();
        }
    },
    
    previewBulkChanges() {
        if (this.core) {
            return this.core.previewBulkChanges();
        }
    },
    
    exportResults(results, filename) {
        if (this.resultsDisplay) {
            return this.resultsDisplay.exportResults(results, filename);
        }
    },
    
    exportSuccessData() {
        if (this.dataHandler) {
            return this.dataHandler.exportSuccessData();
        }
    },
    
    resetApplication() {
        // Clear all forms and data
        if (this.formsHandler) {
            this.formsHandler.clearAllValidations();
        }
        
        if (this.core) {
            this.core.clearSingleForm();
            this.core.clearAllBulkUsers();
            this.core.clearJsonData();
        }
        
        if (this.resultsDisplay) {
            this.resultsDisplay.clearResults();
        }
        
        if (this.successDisplay) {
            this.successDisplay.hideSuccessDisplay();
        }
        
        if (this.notifications) {
            this.notifications.clearAllNotifications();
        }
        
        this.showSuccess('Application reset successfully');
    },
    
    // Configuration methods
    setConfig(key, value) {
        this.config[key] = value;
        
        // Apply configuration changes to modules
        if (key === 'apiEndpoint' && this.core) {
            this.core.apiEndpoint = value;
        }
        
        if (key === 'mockMode' && this.api) {
            this.api.mockMode = value;
        }
    },
    
    getConfig(key) {
        return key ? this.config[key] : { ...this.config };
    },
    
    // Debug methods
    getModuleStatus() {
        return {
            core: !!this.core,
            api: !!this.api,
            dataHandler: !!this.dataHandler,
            validator: !!this.validator,
            bulkManager: !!this.bulkManager,
            jsonHandler: !!this.jsonHandler,
            resultsDisplay: !!this.resultsDisplay,
            successDisplay: !!this.successDisplay,
            notifications: !!this.notifications,
            formsHandler: !!this.formsHandler
        };
    },
    
    // Health check
    healthCheck() {
        const status = this.getModuleStatus();
        const totalModules = Object.keys(status).length;
        const loadedModules = Object.values(status).filter(Boolean).length;
        
        this.log(`Health Check: ${loadedModules}/${totalModules} modules loaded`);
        
        return {
            healthy: loadedModules === totalModules,
            loadedModules,
            totalModules,
            modules: status
        };
    }
};

// Auto-initialize when script is loaded
TokenAllocationApp.init();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TokenAllocationApp;
}

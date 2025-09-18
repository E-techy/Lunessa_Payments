/**
 * Token Allocation System - Core System
 * Main controller class that orchestrates the entire token allocation system
 */

class TokenAllocationSystem {
    constructor() {
        this.currentMode = 'single';
        this.bulkUserCount = 1;
        this.bulkUsers = [];
        this.apiEndpoint = '/admin/allot_tokens_to_agents';
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.initializeBulkMode();
    }
    
    bindEvents() {
        // Mode switching
        document.getElementById('single-mode-tab')?.addEventListener('click', () => {
            this.switchMode('single');
        });
        
        document.getElementById('bulk-mode-tab')?.addEventListener('click', () => {
            this.switchMode('bulk');
        });
        
        // Bulk method switching
        document.getElementById('manual-entry-tab')?.addEventListener('click', () => {
            this.switchBulkMethod('manual');
        });
        
        document.getElementById('json-import-tab')?.addEventListener('click', () => {
            this.switchBulkMethod('json');
        });
        
        // Single mode actions
        document.getElementById('single-allocate-btn')?.addEventListener('click', () => {
            this.handleSingleAllocation();
        });
        
        document.getElementById('single-clear-btn')?.addEventListener('click', () => {
            this.clearSingleForm();
        });
        
        // Bulk mode actions
        document.getElementById('add-bulk-user-btn')?.addEventListener('click', () => {
            this.addBulkUser();
        });
        
        document.getElementById('clear-all-bulk-btn')?.addEventListener('click', () => {
            this.clearAllBulkUsers();
        });
        
        document.getElementById('bulk-allocate-btn')?.addEventListener('click', () => {
            this.handleBulkAllocation();
        });
        
        document.getElementById('bulk-preview-btn')?.addEventListener('click', () => {
            this.previewBulkChanges();
        });
        
        // JSON import actions
        document.getElementById('validate-json-btn')?.addEventListener('click', () => {
            this.validateJsonData();
        });
        
        document.getElementById('clear-json-btn')?.addEventListener('click', () => {
            this.clearJsonData();
        });
    }
    
    switchMode(mode) {
        this.currentMode = mode;
        
        // Update tab styles
        document.querySelectorAll('.token-mode-tab').forEach(tab => {
            tab.classList.remove('token-mode-active');
        });
        document.getElementById(`${mode}-mode-tab`).classList.add('token-mode-active');
        
        // Update content visibility
        document.querySelectorAll('.token-mode-content').forEach(content => {
            content.classList.remove('token-mode-content-active');
        });
        document.getElementById(`${mode}-mode-content`).classList.add('token-mode-content-active');
        
        // Clear results when switching modes
        if (typeof tokenResults !== 'undefined') {
            tokenResults.hideResults();
        }
    }
    
    switchBulkMethod(method) {
        // Update method tab styles
        document.querySelectorAll('.bulk-method-tab').forEach(tab => {
            tab.classList.remove('bulk-method-active');
        });
        document.getElementById(`${method === 'manual' ? 'manual-entry' : 'json-import'}-tab`).classList.add('bulk-method-active');
        
        // Update content visibility
        document.querySelectorAll('.bulk-entry-content').forEach(content => {
            content.classList.remove('bulk-entry-active');
        });
        document.getElementById(`${method === 'manual' ? 'manual-entry' : 'json-import'}-content`).classList.add('bulk-entry-active');
    }
    
    initializeBulkMode() {
        // Add initial bulk user entry
        this.addBulkUser();
    }
    
    clearSingleForm() {
        document.getElementById('singleTokenForm')?.reset();
        if (typeof tokenResults !== 'undefined') {
            tokenResults.hideResults();
        }
        // Clear any validation errors
        if (typeof tokenFormsHandler !== 'undefined') {
            tokenFormsHandler.clearAllValidations();
        }
    }
    
    clearJsonData() {
        document.getElementById('jsonImportData').value = '';
        if (typeof tokenJsonHandler !== 'undefined') {
            tokenJsonHandler.hideJsonValidation();
        }
    }
    
    async handleSingleAllocation() {
        if (typeof tokenDataHandler === 'undefined') {
            console.error('tokenDataHandler not available');
            return;
        }
        
        const formData = tokenDataHandler.getSingleFormData();
        
        if (typeof tokenValidator !== 'undefined' && !tokenValidator.validateSingleForm(formData)) {
            return;
        }
        
        // Additional validation using forms handler
        if (typeof tokenFormsHandler !== 'undefined' && !tokenFormsHandler.validateAllSingleFields()) {
            return;
        }
        
        const button = document.getElementById('single-allocate-btn');
        button.classList.add('token-btn-loading');
        button.disabled = true;
        
        try {
            if (typeof tokenAPI === 'undefined') {
                throw new Error('tokenAPI not available');
            }
            
            const response = await tokenAPI.allocateTokens(this.apiEndpoint, formData);
            
            if (response.success) {
                if (typeof tokenSuccessDisplay !== 'undefined') {
                    tokenSuccessDisplay.displayTokenAllocationSuccess(response.data);
                }
                
                if (typeof tokenResults !== 'undefined') {
                    tokenResults.showResults([{
                    username: formData.username,
                    agentId: formData.agentId,
                    modelName: formData.modelName,
                    status: 'success',
                    message: response.message || `Successfully allocated ${formData.tokensToAdd} tokens`,
                    tokensAllocated: formData.tokensToAdd
                }]);
                
                this.clearSingleForm();
                if (typeof tokenNotifications !== 'undefined') {
                    tokenNotifications.showNotification('Token allocation successful!', 'success');
                }
            } else {
                if (typeof tokenResults !== 'undefined') {
                    tokenResults.showResults([{
                    username: formData.username,
                    agentId: formData.agentId,
                    modelName: formData.modelName,
                    status: 'error',
                    message: response.error || 'Allocation failed',
                    tokensAllocated: 0
                }]);
                }
                if (typeof tokenNotifications !== 'undefined') {
                    tokenNotifications.showNotification('Token allocation failed: ' + (response.error || 'Unknown error'), 'error');
                }
            }
        }} catch (error) {
            console.error('Token allocation error:', error);
            if (typeof tokenResults !== 'undefined') {
                tokenResults.showResults([{
                username: formData.username,
                agentId: formData.agentId || 'N/A',
                modelName: formData.modelName || 'N/A',
                status: 'error',
                message: 'Network error: ' + error.message,
                tokensAllocated: 0
            }]);
            }
            if (typeof tokenNotifications !== 'undefined') {
                tokenNotifications.showNotification('Network error occurred. Please try again.', 'error');
            }
        } finally {
            button.classList.remove('token-btn-loading');
            button.disabled = false;
        }
    }

    async handleBulkAllocation() {
        if (typeof tokenDataHandler === 'undefined') {
            console.error('tokenDataHandler not available');
            return;
        }
        
        const bulkData = tokenDataHandler.getBulkFormData();
        
        if (typeof tokenValidator !== 'undefined' && !tokenValidator.validateBulkForm(bulkData)) {
            return;
        }
        
        // Additional validation using forms handler
        if (typeof tokenFormsHandler !== 'undefined' && !tokenFormsHandler.validateAllBulkFields()) {
            return;
        }
        
        const button = document.getElementById('bulk-allocate-btn');
        button.classList.add('token-btn-loading');
        button.disabled = true;
        
        try {
            if (typeof tokenAPI === 'undefined') {
                throw new Error('tokenAPI not available');
            }
            
            const response = await tokenAPI.allocateBulkTokens(this.apiEndpoint, bulkData);
            
            if (response.success && response.results) {
                const formattedResults = response.results.map(r => ({
                    username: r.username || 'N/A',
                    agentId: r.agentId || 'N/A', 
                    modelName: r.modelName || 'N/A',
                    status: r.success ? 'success' : 'error',
                    message: r.success ? 
                        `Successfully allocated tokens` : 
                        (r.error || 'Allocation failed'),
                    tokensAllocated: r.success ? 'Allocated' : 0
                }));
                
                if (typeof tokenResults !== 'undefined') {
                    tokenResults.showResults(formattedResults);
                }
                this.clearAllBulkUsers();
                
                const successCount = formattedResults.filter(r => r.status === 'success').length;
                const totalCount = formattedResults.length;
                if (typeof tokenNotifications !== 'undefined') {
                    tokenNotifications.showNotification(`Bulk allocation completed: ${successCount}/${totalCount} successful`, 
                        successCount === totalCount ? 'success' : 'warning');
                }
            } else {
                if (typeof tokenNotifications !== 'undefined') {
                    tokenNotifications.showNotification('Bulk allocation failed: ' + (response.error || 'Unknown error'), 'error');
                }
            }
        } catch (error) {
            console.error('Bulk allocation error:', error);
            if (typeof tokenNotifications !== 'undefined') {
                tokenNotifications.showNotification('Network error occurred during bulk allocation. Please try again.', 'error');
            }
        } finally {
            button.classList.remove('token-btn-loading');
            button.disabled = false;
        }
    }

    async previewBulkChanges() {
        if (typeof tokenDataHandler === 'undefined') {
            console.error('tokenDataHandler not available');
            return;
        }
        
        const bulkData = tokenDataHandler.getBulkFormData();
        
        if (typeof tokenValidator !== 'undefined' && !tokenValidator.validateBulkForm(bulkData)) {
            return;
        }
        
        const button = document.getElementById('bulk-preview-btn');
        button.classList.add('token-btn-loading');
        button.disabled = true;
        
        try {
            if (typeof tokenAPI === 'undefined') {
                throw new Error('tokenAPI not available');
            }
            
            const result = await tokenAPI.previewBulkAllocation(bulkData);
            
            if (result.success && result.preview) {
                const previewResults = result.preview.map(preview => ({
                    username: preview.username,
                    status: 'preview',
                    message: `Will ${preview.tokensToChange > 0 ? 'add' : 'deduct'} ${Math.abs(preview.tokensToChange)} tokens for ${preview.modelName}`,
                    tokensAllocated: preview.tokensToChange
                }));
                if (typeof tokenResults !== 'undefined') {
                    tokenResults.showResults(previewResults);
                }
            } else {
                alert('Preview failed: ' + (result.message || 'Unknown error'));
            }
        } catch (error) {
            alert('Preview error: ' + error.message);
        } finally {
            button.classList.remove('token-btn-loading');
            button.disabled = false;
        }
    }
    
    validateJsonData() {
        if (typeof tokenJsonHandler !== 'undefined') {
            return tokenJsonHandler.validateJsonData();
        }
        return false;
    }
    
    addBulkUser() {
        if (typeof tokenBulkManager !== 'undefined') {
            return tokenBulkManager.addBulkUser(this.bulkUserCount++);
        }
        return null;
    }
    
    removeBulkUser(userId) {
        if (typeof tokenBulkManager !== 'undefined') {
            tokenBulkManager.removeBulkUser(userId);
        }
        
        // Ensure at least one user entry exists
        const remainingEntries = document.querySelectorAll('.bulk-user-entry');
        if (remainingEntries.length === 0) {
            this.addBulkUser();
        }
    }
    
    clearAllBulkUsers() {
        if (typeof tokenBulkManager !== 'undefined') {
            tokenBulkManager.clearAllBulkUsers();
        }
        this.bulkUserCount = 0;
        this.addBulkUser();
        if (typeof tokenResults !== 'undefined') {
            tokenResults.hideResults();
        }
    }
}

// Initialize the token allocation system when DOM is loaded
let tokenAllocation;
document.addEventListener('DOMContentLoaded', () => {
    tokenAllocation = new TokenAllocationSystem();
});

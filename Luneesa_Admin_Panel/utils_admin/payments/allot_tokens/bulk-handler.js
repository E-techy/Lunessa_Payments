/**
 * Token Allocation System - Bulk Handler Module
 * Handles bulk user token allocation and management
 */

class TokenBulkHandler {
    constructor() {
        this.bindEvents();
    }
    
    bindEvents() {
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
    }
    
    addBulkUser() {
        const bulkUserCount = tokenAllocationCore ? 
            tokenAllocationCore.incrementBulkUserCount() : 
            (window.bulkUserCount = (window.bulkUserCount || 0) + 1);
            
        const container = document.getElementById('bulkUsersContainer');
        
        const userEntry = document.createElement('div');
        userEntry.className = 'bulk-user-entry';
        userEntry.id = `bulk-user-${bulkUserCount}`;
        
        userEntry.innerHTML = `
            <div class="bulk-user-entry-header">
                <h5>User ${bulkUserCount}</h5>
                <button type="button" class="bulk-remove-user" onclick="tokenBulkHandler.removeBulkUser(${bulkUserCount})">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="bulk-user-form">
                <div class="token-form-group">
                    <label>Username *</label>
                    <input type="text" id="bulk-username-${bulkUserCount}" placeholder="Enter username" required>
                </div>
                <div class="token-form-group">
                    <label>Agent ID *</label>
                    <input type="text" id="bulk-agentid-${bulkUserCount}" placeholder="e.g., AGT-50345a8fdb40c313" required>
                </div>
                <div class="token-form-group">
                    <label>Model Name *</label>
                    <input type="text" id="bulk-modelname-${bulkUserCount}" placeholder="e.g., gpt-4, claude-3-sonnet" required>
                </div>
                <div class="token-form-group">
                    <label>Tokens to Add/Deduct *</label>
                    <input type="number" id="bulk-tokens-${bulkUserCount}" placeholder="50 or -10" step="1" required>
                </div>
            </div>
        `;
        
        container.appendChild(userEntry);
        
        // Setup validation for the new entry
        if (typeof tokenFormsHandler !== 'undefined') {
            setTimeout(() => tokenFormsHandler.setupBulkEntryValidation(userEntry), 100);
        }
        
        // Focus on username field
        setTimeout(() => {
            document.getElementById(`bulk-username-${bulkUserCount}`)?.focus();
        }, 100);
    }
    
    removeBulkUser(userId) {
        const userEntry = document.getElementById(`bulk-user-${userId}`);
        if (userEntry) {
            userEntry.remove();
        }
        
        // Ensure at least one user entry exists
        const remainingEntries = document.querySelectorAll('.bulk-user-entry');
        if (remainingEntries.length === 0) {
            this.addBulkUser();
        }
    }
    
    clearAllBulkUsers() {
        const container = document.getElementById('bulkUsersContainer');
        container.innerHTML = '';
        
        if (tokenAllocationCore) {
            tokenAllocationCore.resetBulkUserCount();
        } else {
            window.bulkUserCount = 0;
        }
        
        this.addBulkUser();
        
        if (typeof tokenResultsHandler !== 'undefined') {
            tokenResultsHandler.hideResults();
        }
    }
    
    async handleBulkAllocation() {
        const bulkData = this.getBulkFormData();
        
        if (!this.validateBulkForm(bulkData)) {
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
            let result;
            
            if (typeof tokenAPI !== 'undefined' && tokenAPI.mockMode) {
                result = await tokenAPI.mockResponse('bulk', { usernames: bulkData });
            } else if (typeof tokenAPI !== 'undefined') {
                result = await tokenAPI.allocateBulkUsers(bulkData);
            } else {
                // Fallback to direct API call
                const response = await fetch('/admin/allot_tokens_to_agents', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ usernames: bulkData })
                });
                result = await response.json();
                result.success = response.ok;
            }
            
            if (result.success && result.results) {
                if (typeof tokenResultsHandler !== 'undefined') {
                    tokenResultsHandler.showResults(result.results);
                }
                this.clearAllBulkUsers();
            } else {
                const errorMsg = 'Bulk allocation failed: ' + (result.message || 'Unknown error');
                if (typeof tokenNotificationHandler !== 'undefined') {
                    tokenNotificationHandler.showError(errorMsg);
                } else {
                    alert(errorMsg);
                }
            }
        } catch (error) {
            const errorMsg = 'Network error: ' + error.message;
            if (typeof tokenNotificationHandler !== 'undefined') {
                tokenNotificationHandler.showError(errorMsg);
            } else {
                alert(errorMsg);
            }
        } finally {
            button.classList.remove('token-btn-loading');
            button.disabled = false;
        }
    }
    
    async previewBulkChanges() {
        const bulkData = this.getBulkFormData();
        
        if (!this.validateBulkForm(bulkData)) {
            return;
        }
        
        const button = document.getElementById('bulk-preview-btn');
        button.classList.add('token-btn-loading');
        button.disabled = true;
        
        try {
            let result;
            
            if (typeof tokenAPI !== 'undefined' && tokenAPI.mockMode) {
                result = await tokenAPI.mockResponse('preview', { usernames: bulkData });
                const previewResults = result.preview.map(preview => ({
                    username: preview.username,
                    status: 'preview',
                    message: `Will ${preview.tokensToChange > 0 ? 'add' : 'deduct'} ${Math.abs(preview.tokensToChange)} tokens for ${preview.modelName}`,
                    tokensAllocated: preview.tokensToChange
                }));
                
                if (typeof tokenResultsHandler !== 'undefined') {
                    tokenResultsHandler.showResults(previewResults);
                }
            } else if (typeof tokenAPI !== 'undefined') {
                result = await tokenAPI.previewBulkAllocation(bulkData);
                if (result.success && result.preview) {
                    const previewResults = result.preview.map(preview => ({
                        username: preview.username,
                        status: 'preview',
                        message: `Will ${preview.tokensToChange > 0 ? 'add' : 'deduct'} ${Math.abs(preview.tokensToChange)} tokens for ${preview.modelName}`,
                        tokensAllocated: preview.tokensToChange
                    }));
                    
                    if (typeof tokenResultsHandler !== 'undefined') {
                        tokenResultsHandler.showResults(previewResults);
                    }
                } else {
                    const errorMsg = 'Preview failed: ' + (result.message || 'Unknown error');
                    if (typeof tokenNotificationHandler !== 'undefined') {
                        tokenNotificationHandler.showError(errorMsg);
                    } else {
                        alert(errorMsg);
                    }
                }
            } else {
                // Fallback to local preview
                const previewResults = bulkData.map(user => ({
                    username: user.username,
                    status: 'preview',
                    message: `Will ${user.tokensToAdd > 0 ? 'add' : 'deduct'} ${Math.abs(user.tokensToAdd)} tokens for ${user.modelName}`,
                    tokensAllocated: user.tokensToAdd
                }));
                
                if (typeof tokenResultsHandler !== 'undefined') {
                    tokenResultsHandler.showResults(previewResults);
                }
            }
        } catch (error) {
            const errorMsg = 'Preview error: ' + error.message;
            if (typeof tokenNotificationHandler !== 'undefined') {
                tokenNotificationHandler.showError(errorMsg);
            } else {
                alert(errorMsg);
            }
        } finally {
            button.classList.remove('token-btn-loading');
            button.disabled = false;
        }
    }
    
    getBulkFormData() {
        const activeMethod = document.querySelector('.bulk-entry-active')?.id;
        
        if (activeMethod === 'json-import-content') {
            const jsonData = document.getElementById('jsonImportData').value.trim();
            if (!jsonData) return [];
            
            try {
                return JSON.parse(jsonData);
            } catch (error) {
                return [];
            }
        } else {
            // Manual entry
            const users = [];
            document.querySelectorAll('.bulk-user-entry').forEach((entry) => {
                const id = entry.id.split('-')[2];
                const user = {
                    username: document.getElementById(`bulk-username-${id}`)?.value?.trim(),
                    agentId: document.getElementById(`bulk-agentid-${id}`)?.value?.trim(),
                    modelName: document.getElementById(`bulk-modelname-${id}`)?.value,
                    tokensToAdd: parseInt(document.getElementById(`bulk-tokens-${id}`)?.value) || 0
                };
                
                if (user.username && user.agentId && user.modelName) {
                    users.push(user);
                }
            });
            
            return users;
        }
    }
    
    validateBulkForm(data) {
        if (!data || data.length === 0) {
            const errorMsg = 'No valid user data found. Please add users or validate your JSON.';
            if (typeof tokenNotificationHandler !== 'undefined') {
                tokenNotificationHandler.showError(errorMsg);
            } else {
                alert(errorMsg);
            }
            return false;
        }
        
        return true;
    }
}

// Initialize bulk handler
let tokenBulkHandler;
document.addEventListener('DOMContentLoaded', () => {
    tokenBulkHandler = new TokenBulkHandler();
});

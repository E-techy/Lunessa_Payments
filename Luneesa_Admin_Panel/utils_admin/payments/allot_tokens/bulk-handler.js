/**
 * Token Allocation System - Bulk Mode Handler
 * Handles bulk user token allocation operations
 */

class TokenBulkHandler {
    constructor() {
        this.bulkUserCount = 0;
        this.init();
    }
    
    init() {
        this.bindBulkModeEvents();
    }
    
    bindBulkModeEvents() {
        // Bulk mode action buttons
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
        this.bulkUserCount++;
        const container = document.getElementById('bulkUsersContainer');
        
        const userEntry = document.createElement('div');
        userEntry.className = 'bulk-user-entry';
        userEntry.id = `bulk-user-${this.bulkUserCount}`;
        
        userEntry.innerHTML = `
            <div class="bulk-user-entry-header">
                <h5>User ${this.bulkUserCount}</h5>
                <button type="button" class="bulk-remove-user" onclick="tokenBulkHandler.removeBulkUser(${this.bulkUserCount})">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="bulk-user-form">
                <div class="token-form-group">
                    <label>Username *</label>
                    <input type="text" id="bulk-username-${this.bulkUserCount}" placeholder="Enter username" required>
                </div>
                <div class="token-form-group">
                    <label>Agent ID *</label>
                    <input type="text" id="bulk-agentid-${this.bulkUserCount}" placeholder="e.g., USER123AGENT789ABC" required>
                </div>
                <div class="token-form-group">
                    <label>Model Name *</label>
                    <input type="text" id="bulk-modelname-${this.bulkUserCount}" placeholder="e.g., gpt-4, claude-3-sonnet" required>
                </div>
                <div class="token-form-group">
                    <label>Tokens to Add/Deduct *</label>
                    <input type="number" id="bulk-tokens-${this.bulkUserCount}" placeholder="50 or -10" step="1" required>
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
            document.getElementById(`bulk-username-${this.bulkUserCount}`)?.focus();
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
        this.bulkUserCount = 0;
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
            const response = await fetch(tokenAllocation.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenAllocation.getAuthToken()}`
                },
                credentials: 'include',
                body: JSON.stringify({ usernames: bulkData })
            });
            
            const result = await response.json();
            console.log(result);
            
            if (response.ok && result.success && result.results) {
                // Format results for display
                const formattedResults = result.results.map(r => ({
                    username: r.username || 'N/A',
                    agentId: r.agentId || 'N/A', 
                    modelName: r.modelName || 'N/A',
                    status: r.success ? 'success' : 'error',
                    message: r.success ? 
                        `Successfully allocated tokens` : 
                        (r.error || 'Allocation failed'),
                    tokensAllocated: r.success ? 'Allocated' : 0
                }));
                
                if (typeof tokenResultsHandler !== 'undefined') {
                    tokenResultsHandler.showResults(formattedResults);
                }
                
                this.clearAllBulkUsers();
                
                const successCount = formattedResults.filter(r => r.status === 'success').length;
                const totalCount = formattedResults.length;
                
                if (typeof tokenNotificationHandler !== 'undefined') {
                    tokenNotificationHandler.showNotification(
                        `Bulk allocation completed: ${successCount}/${totalCount} successful`, 
                        successCount === totalCount ? 'success' : 'warning'
                    );
                }
            } else {
                if (typeof tokenNotificationHandler !== 'undefined') {
                    tokenNotificationHandler.showNotification('Bulk allocation failed: ' + (result.error || 'Unknown error'), 'error');
                }
            }
        } catch (error) {
            console.error('Bulk allocation error:', error);
            if (typeof tokenNotificationHandler !== 'undefined') {
                tokenNotificationHandler.showNotification('Network error occurred during bulk allocation. Please try again.', 'error');
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
            // Fallback to local preview
            const previewResults = bulkData.map(user => ({
                username: user.username,
                agentId: user.agentId || 'N/A',
                modelName: user.modelName || 'N/A',
                status: 'preview',
                message: `Will ${user.tokensToAdd > 0 ? 'add' : 'deduct'} ${Math.abs(user.tokensToAdd)} tokens for ${user.modelName}`,
                tokensAllocated: user.tokensToAdd
            }));
            
            if (typeof tokenResultsHandler !== 'undefined') {
                tokenResultsHandler.showResults(previewResults);
            }
        } catch (error) {
            if (typeof tokenNotificationHandler !== 'undefined') {
                tokenNotificationHandler.showNotification('Preview error: ' + error.message, 'error');
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
            if (typeof tokenNotificationHandler !== 'undefined') {
                tokenNotificationHandler.showNotification('No valid user data found. Please add users or validate your JSON.', 'error');
            }
            return false;
        }
        
        return true;
    }
}

// Initialize bulk handler when DOM is loaded
let tokenBulkHandler;
document.addEventListener('DOMContentLoaded', () => {
    tokenBulkHandler = new TokenBulkHandler();
});

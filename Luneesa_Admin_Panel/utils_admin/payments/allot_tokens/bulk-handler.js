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
        
        // document.getElementById('bulk-preview-btn')?.addEventListener('click', () => {
        //     this.previewBulkChanges();
        // });
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
}
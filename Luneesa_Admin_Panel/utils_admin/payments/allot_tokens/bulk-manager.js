/**
 * Token Allocation System - Bulk Manager
 * Handles bulk user entry management and operations
 */

class TokenBulkManager {
    constructor() {
        this.userCount = 0;
    }
    
    addBulkUser(bulkUserCount) {
        // Calculate the next user number based on existing entries
        const existingUsers = document.querySelectorAll('.bulk-user-entry').length;
        this.userCount = bulkUserCount || (existingUsers + 1);
        const container = document.getElementById('bulkUsersContainer');
        
        const userEntry = document.createElement('div');
        userEntry.className = 'bulk-user-entry';
        userEntry.id = `bulk-user-${this.userCount}`;
        
        userEntry.innerHTML = `
            <div class="bulk-user-entry-header">
                <h5>User ${this.userCount}</h5>
                <button type="button" class="bulk-remove-user" onclick="tokenAllocation.removeBulkUser(${this.userCount})">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="bulk-user-form">
                <div class="token-form-group">
                    <label>Username *</label>
                    <input type="text" id="bulk-username-${this.userCount}" placeholder="Enter username" required>
                </div>
                <div class="token-form-group">
                    <label>Agent ID *</label>
                    <input type="text" id="bulk-agentid-${this.userCount}" placeholder="e.g., USER123AGENT789ABC" required>
                </div>
                <div class="token-form-group">
                <label>Model Name *</label>
                <input type="text" id="bulk-modelname-${this.userCount}" placeholder="e.g., gpt-4, claude-3-sonnet" required>
                </div>
                <div class="token-form-group">
                    <label>Tokens to Add/Deduct *</label>
                    <input type="number" id="bulk-tokens-${this.userCount}" placeholder="50 or -10" step="1" required>
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
            document.getElementById(`bulk-username-${this.userCount}`)?.focus();
        }, 100);
        
        return this.userCount;
    }
    
    removeBulkUser(userId) {
        const userEntry = document.getElementById(`bulk-user-${userId}`);
        if (userEntry) {
            userEntry.remove();
            // Renumber all remaining users to maintain sequential numbering
            this.renumberUsers();
        }
    }
    
    clearAllBulkUsers() {
        const container = document.getElementById('bulkUsersContainer');
        container.innerHTML = '';
        this.userCount = 0;
    }
    
    getBulkUserCount() {
        return document.querySelectorAll('.bulk-user-entry').length;
    }
    
    renumberUsers() {
        const container = document.getElementById('bulkUsersContainer');
        const userEntries = container.querySelectorAll('.bulk-user-entry');
        
        // Reset user count to the actual number of entries
        this.userCount = userEntries.length;
        
        // Renumber each user entry
        userEntries.forEach((entry, index) => {
            const newUserNumber = index + 1;
            const newId = `bulk-user-${newUserNumber}`;
            
            // Update the main container ID
            entry.id = newId;
            
            // Update the header text
            const header = entry.querySelector('.bulk-user-entry-header h5');
            if (header) {
                header.textContent = `User ${newUserNumber}`;
            }
            
            // Update the remove button onclick
            const removeButton = entry.querySelector('.bulk-remove-user');
            if (removeButton) {
                removeButton.setAttribute('onclick', `tokenAllocation.removeBulkUser(${newUserNumber})`);
            }
            
            // Update all input field IDs
            const usernameInput = entry.querySelector('[id^="bulk-username-"]');
            if (usernameInput) {
                usernameInput.id = `bulk-username-${newUserNumber}`;
            }
            
            const agentIdInput = entry.querySelector('[id^="bulk-agentid-"]');
            if (agentIdInput) {
                agentIdInput.id = `bulk-agentid-${newUserNumber}`;
            }
            
            const modelNameInput = entry.querySelector('[id^="bulk-modelname-"]');
            if (modelNameInput) {
                modelNameInput.id = `bulk-modelname-${newUserNumber}`;
            }
            
            const tokensInput = entry.querySelector('[id^="bulk-tokens-"]');
            if (tokensInput) {
                tokensInput.id = `bulk-tokens-${newUserNumber}`;
            }
        });
        
        console.log(`🔄 Renumbered ${userEntries.length} user entries`);
        
        // Re-setup validation for renumbered entries
        if (typeof tokenFormsHandler !== 'undefined') {
            userEntries.forEach(entry => {
                tokenFormsHandler.setupBulkEntryValidation(entry);
            });
        }
    }
    
    validateAllBulkEntries() {
        // Check if validator is available
        if (typeof tokenValidator === 'undefined' || !tokenValidator) {
            console.warn('tokenValidator not available, skipping validation');
            return true; // Allow submission if validator isn't loaded
        }
        
        const bulkEntries = document.querySelectorAll('.bulk-user-entry');
        let allValid = true;
        
        bulkEntries.forEach(entry => {
            const inputs = entry.querySelectorAll('input, select');
            inputs.forEach(input => {
                const fieldType = tokenValidator.getBulkFieldType(input.id);
                const rules = tokenValidator.getBulkFieldRules(fieldType);
                const isValid = tokenValidator.validateField(input.id, rules);
                if (!isValid) allValid = false;
            });
        });
        
        return allValid;
    }
    
    clearBulkValidations() {
        const bulkInputs = document.querySelectorAll('.bulk-user-entry input, .bulk-user-entry select');
        bulkInputs.forEach(input => {
            input.classList.remove('invalid');
            input.style.color = '';
            const errorMessage = input.parentNode.querySelector('.error-message');
            if (errorMessage) errorMessage.remove();
        });
    }
}

// Initialize bulk manager
let tokenBulkManager;
document.addEventListener('DOMContentLoaded', () => {
    tokenBulkManager = new TokenBulkManager();
});

/**
 * Token Allocation System - Core System (Updated)
 * Handles only tab switching + bulk user entry management (works with TokenBulkManager)
 */

class TokenAllocationSystem {
    constructor() {
        this.currentMode = 'single';
        this.bulkUserCount = 0; // sync with TokenBulkManager
        
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
        
        // Bulk mode actions
        document.getElementById('add-bulk-user-btn')?.addEventListener('click', () => {
            this.addBulkUser();
        });
        
        document.getElementById('clear-all-bulk-btn')?.addEventListener('click', () => {
            this.clearAllBulkUsers();
        });
    }
    
    switchMode(mode) {
        this.currentMode = mode;
        
        // Update tab styles
        document.querySelectorAll('.token-mode-tab').forEach(tab => {
            tab.classList.remove('token-mode-active');
        });
        document.getElementById(`${mode}-mode-tab`)?.classList.add('token-mode-active');
        
        // Update content visibility
        document.querySelectorAll('.token-mode-content').forEach(content => {
            content.classList.remove('token-mode-content-active');
        });
        document.getElementById(`${mode}-mode-content`)?.classList.add('token-mode-content-active');
    }
    
    switchBulkMethod(method) {
        // Update method tab styles
        document.querySelectorAll('.bulk-method-tab').forEach(tab => {
            tab.classList.remove('bulk-method-active');
        });
        document.getElementById(`${method === 'manual' ? 'manual-entry' : 'json-import'}-tab`)?.classList.add('bulk-method-active');
        
        // Update content visibility
        document.querySelectorAll('.bulk-entry-content').forEach(content => {
            content.classList.remove('bulk-entry-active');
        });
        document.getElementById(`${method === 'manual' ? 'manual-entry' : 'json-import'}-content`)?.classList.add('bulk-entry-active');
    }
    
    // Initialize bulk mode with one entry
    initializeBulkMode() {
        this.addBulkUser();
    }
    
    addBulkUser() {
        if (typeof tokenBulkManager !== 'undefined') {
            // Let the bulk manager handle the counting
            tokenBulkManager.addBulkUser();
            // Update our counter to match
            this.bulkUserCount = tokenBulkManager.userCount;
        }
    }
    
    removeBulkUser(userId) {
        if (typeof tokenBulkManager !== 'undefined') {
            tokenBulkManager.removeBulkUser(userId);
        }
        
        // Ensure at least one entry always exists
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
        this.addBulkUser(); // always keep one
    }
}

// Initialize system
let tokenAllocation;
document.addEventListener('DOMContentLoaded', () => {
    tokenAllocation = new TokenAllocationSystem();
});

/**
 * Token Allocation System - Core System Module
 * Main controller for the token allocation system
 */

class TokenAllocationSystem {
    constructor() {
        this.currentMode = 'single';
        this.bulkUserCount = 0;
        this.apiEndpoint = '/admin/allot_tokens_to_agents';
        
        this.init();
    }
    
    init() {
        this.bindModeEvents();
        this.initializeBulkMode();
    }
    
    bindModeEvents() {
        // Mode switching events
        document.getElementById('single-mode-tab')?.addEventListener('click', () => {
            this.switchMode('single');
        });
        
        document.getElementById('bulk-mode-tab')?.addEventListener('click', () => {
            this.switchMode('bulk');
        });
        
        // Bulk method switching events
        document.getElementById('manual-entry-tab')?.addEventListener('click', () => {
            this.switchBulkMethod('manual');
        });
        
        document.getElementById('json-import-tab')?.addEventListener('click', () => {
            this.switchBulkMethod('json');
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
        if (typeof tokenResultsHandler !== 'undefined') {
            tokenResultsHandler.hideResults();
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
        if (typeof tokenBulkHandler !== 'undefined') {
            tokenBulkHandler.addBulkUser();
        }
    }
    
    // Helper method to get authentication token
    getAuthToken() {
        // Try to get token from cookie first
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const [name, value] = cookie.trim().split('=');
            if (name === 'authToken') {
                return value;
            }
        }
        
        // Try to get token from localStorage as fallback
        return localStorage.getItem('authToken') || '';
    }
}

// Initialize the token allocation system when DOM is loaded
let tokenAllocation;
document.addEventListener('DOMContentLoaded', () => {
    tokenAllocation = new TokenAllocationSystem();
});

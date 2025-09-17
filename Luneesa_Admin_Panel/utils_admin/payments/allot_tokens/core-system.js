/**
 * Token Allocation System - Core System Module
 * Core functionality and initialization
 */

class TokenAllocationCore {
    constructor() {
        
        this.init();
    }
    
    init() {
        this.bindModeEvents();
    }
    
    bindModeEvents() {
        // Mode switching
        document.getElementById('single-mode-tab')?.addEventListener('click', () => {
            this.switchMode('single');
        });
        
        document.getElementById('bulk-mode-tab')?.addEventListener('click', () => {
            this.switchMode('bulk');
        });
    }
    
    switchMode(mode) {
        this.currentMode = mode;
        
        // Update tab styles
        document.querySelectorAll('.token-mode-tab').forEach(tab => {
            tab.classList.remove('token-mode-active');
        });
        document.getElementById(`${mode}-mode-tab`).classList.add('token-mode-active');
        
        // Clear results when switching modes
        if (this.resultsHandler) {
            this.resultsHandler.hideResults();
        }
    }
}
// Initialize core system
let tokenAllocationCore;
document.addEventListener('DOMContentLoaded', () => {
    tokenAllocationCore = new TokenAllocationCore();
});

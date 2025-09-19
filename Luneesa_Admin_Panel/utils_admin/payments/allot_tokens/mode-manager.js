/**
 * Token Allocation Mode Manager
 * Handles switching between modes and tabs while clearing displays appropriately
 */

class TokenAllocationModeManager {
    constructor() {
        this.init();
    }

    init() {
        this.bindModeTabEvents();
        this.bindMainTabEvents();
        this.bindPortalNavEvents();
        console.log('🔄 Mode Manager initialized');
    }

    /**
     * Bind token allocation mode tab events (Single/Bulk)
     */
    bindModeTabEvents() {
        const singleModeTab = document.getElementById('single-mode-tab');
        const bulkModeTab = document.getElementById('bulk-mode-tab');

        if (singleModeTab) {
            singleModeTab.addEventListener('click', () => {
                this.switchToSingleMode();
            });
        }

        if (bulkModeTab) {
            bulkModeTab.addEventListener('click', () => {
                this.switchToBulkMode();
            });
        }
    }

    /**
     * Bind main navigation tab events (AI-Models, Base discount, etc.)
     */
    bindMainTabEvents() {
        const mainTabs = document.querySelectorAll('.tab');
        mainTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                if (tab.id !== 'payments-tab-btn') {
                    // Clear displays when switching away from payments
                    this.clearAllTokenDisplays();
                }
            });
        });
    }

    /**
     * Bind portal navigation events (Allot Tokens, Razorpay Orders)
     */
    bindPortalNavEvents() {
        const portalNavItems = document.querySelectorAll('.portal-nav-item');
        portalNavItems.forEach(item => {
            item.addEventListener('click', () => {
                if (!item.classList.contains('nav-selected')) {
                    // Clear displays when switching between portal sections
                    this.clearAllTokenDisplays();
                }
            });
        });
    }

    /**
     * Switch to single mode and clear displays
     */
    switchToSingleMode() {
        console.log('🔄 Switching to Single Mode');
        
        // Clear all displays first
        this.clearAllTokenDisplays();
        
        // Handle tab switching (if not already handled by existing code)
        const singleTab = document.getElementById('single-mode-tab');
        const bulkTab = document.getElementById('bulk-mode-tab');
        const singleContent = document.getElementById('single-mode-content');
        const bulkContent = document.getElementById('bulk-mode-content');

        if (singleTab && bulkTab && singleContent && bulkContent) {
            // Update tab states
            singleTab.classList.add('token-mode-active');
            bulkTab.classList.remove('token-mode-active');
            
            // Update content states
            singleContent.classList.add('token-mode-content-active');
            bulkContent.classList.remove('token-mode-content-active');
        }
    }

    /**
     * Switch to bulk mode and clear displays
     */
    switchToBulkMode() {
        console.log('🔄 Switching to Bulk Mode');
        
        // Clear all displays first
        this.clearAllTokenDisplays();
        
        // Handle tab switching (if not already handled by existing code)
        const singleTab = document.getElementById('single-mode-tab');
        const bulkTab = document.getElementById('bulk-mode-tab');
        const singleContent = document.getElementById('single-mode-content');
        const bulkContent = document.getElementById('bulk-mode-content');

        if (singleTab && bulkTab && singleContent && bulkContent) {
            // Update tab states
            bulkTab.classList.add('token-mode-active');
            singleTab.classList.remove('token-mode-active');
            
            // Update content states
            bulkContent.classList.add('token-mode-content-active');
            singleContent.classList.remove('token-mode-content-active');
        }
    }

    /**
     * Clear all token-related displays
     */
    clearAllTokenDisplays() {
        // Clear results section
        const resultsSection = document.getElementById('tokenResultsSection');
        if (resultsSection) {
            resultsSection.style.display = 'none';
            const resultsContent = document.getElementById('tokenResultsContent');
            if (resultsContent) {
                resultsContent.innerHTML = '';
            }
        }
        
        // Clear success display
        if (window.tokenSuccessDisplay) {
            window.tokenSuccessDisplay.clearSuccessDisplay();
        }
        
        // Clear stored results in event handlers
        if (window.tokenEventHandlers) {
            window.tokenEventHandlers.lastResults = null;
        }
        
        console.log('🧹 All token displays cleared');
    }

    /**
     * Initialize when returning to payments tab
     */
    onPaymentsTabActivated() {
        console.log('💳 Payments tab activated');
        // You can add any initialization logic here if needed
    }
}

// Initialize mode manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit to ensure other components are loaded
    setTimeout(() => {
        window.tokenModeManager = new TokenAllocationModeManager();
    }, 500);
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TokenAllocationModeManager;
}
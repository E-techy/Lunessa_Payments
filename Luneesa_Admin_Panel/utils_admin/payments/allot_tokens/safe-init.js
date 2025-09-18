/**
 * Token Allocation System - Safe Initialization
 * Ensures all modules are loaded before initializing dependencies
 */

(function() {
    'use strict';
    
    // Track loaded modules
    const loadedModules = new Set();
    const requiredModules = [
        'TokenNotifications',
        'TokenValidator', 
        'TokenDataHandler',
        'TokenAPIHandler',
        'TokenBulkManager',
        'TokenJsonHandler',
        'TokenResultsDisplay',
        'TokenSuccessDisplay',
        'TokenFormsHandler',
        'TokenAllocationSystem'
    ];
    
    // Module initialization queue
    const initQueue = [];
    
    // Check if all required modules are loaded
    function allModulesLoaded() {
        return requiredModules.every(moduleName => typeof window[moduleName] !== 'undefined');
    }
    
    // Safe module initialization
    function safeInit() {
        console.log('🔄 Checking module availability...');
        
        // Check which modules are available
        const available = [];
        const missing = [];
        
        requiredModules.forEach(moduleName => {
            if (typeof window[moduleName] !== 'undefined') {
                available.push(moduleName);
                loadedModules.add(moduleName);
            } else {
                missing.push(moduleName);
            }
        });
        
        console.log('✅ Available modules:', available);
        if (missing.length > 0) {
            console.log('❌ Missing modules:', missing);
        }
        
        // Initialize available modules with safe checks
        initializeAvailableModules();
        
        // Report status
        const loadedCount = available.length;
        const totalCount = requiredModules.length;
        const loadPercentage = Math.round((loadedCount / totalCount) * 100);
        
        console.log(`📊 Module loading: ${loadedCount}/${totalCount} (${loadPercentage}%)`);
        
        if (loadedCount === totalCount) {
            console.log('🎉 All modules loaded successfully!');
            initializeFinalSystem();
        } else {
            console.warn('⚠️ Some modules are missing. System will work with reduced functionality.');
            initializePartialSystem();
        }
    }
    
    function initializeAvailableModules() {
        // Initialize notifications first (no dependencies)
        if (typeof TokenNotifications !== 'undefined' && !window.tokenNotifications) {
            try {
                window.tokenNotifications = new TokenNotifications();
                console.log('✓ TokenNotifications initialized');
            } catch (error) {
                console.error('Failed to initialize TokenNotifications:', error);
            }
        }
        
        // Initialize validator (no dependencies)
        if (typeof TokenValidator !== 'undefined' && !window.tokenValidator) {
            try {
                window.tokenValidator = new TokenValidator();
                console.log('✓ TokenValidator initialized');
            } catch (error) {
                console.error('Failed to initialize TokenValidator:', error);
            }
        }
        
        // Initialize data handler (no dependencies)
        if (typeof TokenDataHandler !== 'undefined' && !window.tokenDataHandler) {
            try {
                window.tokenDataHandler = new TokenDataHandler();
                console.log('✓ TokenDataHandler initialized');
            } catch (error) {
                console.error('Failed to initialize TokenDataHandler:', error);
            }
        }
        
        // Initialize API handler (no dependencies)
        if (typeof TokenAPIHandler !== 'undefined' && !window.tokenAPI) {
            try {
                window.tokenAPI = new TokenAPIHandler();
                console.log('✓ TokenAPIHandler initialized');
            } catch (error) {
                console.error('Failed to initialize TokenAPIHandler:', error);
            }
        }
        
        // Initialize bulk manager (no dependencies)
        if (typeof TokenBulkManager !== 'undefined' && !window.tokenBulkManager) {
            try {
                window.tokenBulkManager = new TokenBulkManager();
                console.log('✓ TokenBulkManager initialized');
            } catch (error) {
                console.error('Failed to initialize TokenBulkManager:', error);
            }
        }
        
        // Initialize JSON handler (no dependencies)
        if (typeof TokenJsonHandler !== 'undefined' && !window.tokenJsonHandler) {
            try {
                window.tokenJsonHandler = new TokenJsonHandler();
                console.log('✓ TokenJsonHandler initialized');
            } catch (error) {
                console.error('Failed to initialize TokenJsonHandler:', error);
            }
        }
        
        // Initialize results display (no dependencies)
        if (typeof TokenResultsDisplay !== 'undefined' && !window.tokenResults) {
            try {
                window.tokenResults = new TokenResultsDisplay();
                console.log('✓ TokenResultsDisplay initialized');
            } catch (error) {
                console.error('Failed to initialize TokenResultsDisplay:', error);
            }
        }
        
        // Initialize success display (no dependencies)
        if (typeof TokenSuccessDisplay !== 'undefined' && !window.tokenSuccessDisplay) {
            try {
                window.tokenSuccessDisplay = new TokenSuccessDisplay();
                console.log('✓ TokenSuccessDisplay initialized');
            } catch (error) {
                console.error('Failed to initialize TokenSuccessDisplay:', error);
            }
        }
        
        // Initialize forms handler (depends on validator and bulk manager)
        if (typeof TokenFormsHandler !== 'undefined' && !window.tokenFormsHandler) {
            try {
                window.tokenFormsHandler = new TokenFormsHandler();
                console.log('✓ TokenFormsHandler initialized');
            } catch (error) {
                console.error('Failed to initialize TokenFormsHandler:', error);
            }
        }
    }
    
    function initializeFinalSystem() {
        // Initialize core system last (depends on all other modules)
        if (typeof TokenAllocationSystem !== 'undefined' && !window.tokenAllocation) {
            try {
                window.tokenAllocation = new TokenAllocationSystem();
                console.log('✓ TokenAllocationSystem initialized');
                
                // Initialize main app coordinator if available
                if (typeof TokenAllocationApp !== 'undefined') {
                    // The app will auto-initialize, just ensure config is applied
                    console.log('✓ TokenAllocationApp coordinator active');
                }
                
            } catch (error) {
                console.error('Failed to initialize TokenAllocationSystem:', error);
            }
        }
    }
    
    function initializePartialSystem() {
        console.log('🔧 Initializing with partial functionality...');
        
        // Try to initialize core system even if some modules are missing
        if (typeof TokenAllocationSystem !== 'undefined' && !window.tokenAllocation) {
            try {
                window.tokenAllocation = new TokenAllocationSystem();
                console.log('✓ TokenAllocationSystem initialized (partial functionality)');
            } catch (error) {
                console.error('Failed to initialize TokenAllocationSystem:', error);
            }
        }
    }
    
    // Retry mechanism for delayed module loading
    function retryInitialization(maxRetries = 3, delay = 1000) {
        let retries = 0;
        
        function tryInit() {
            if (allModulesLoaded() || retries >= maxRetries) {
                safeInit();
                return;
            }
            
            retries++;
            console.log(`🔄 Retry ${retries}/${maxRetries} - waiting for modules...`);
            setTimeout(tryInit, delay);
        }
        
        tryInit();
    }
    
    // Initialize when DOM is ready
    function initialize() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(safeInit, 100); // Small delay to ensure all scripts loaded
            });
        } else {
            setTimeout(safeInit, 100);
        }
    }
    
    // Public API for manual initialization
    window.TokenSystemInit = {
        initialize: safeInit,
        retry: retryInitialization,
        status: function() {
            const available = requiredModules.filter(name => typeof window[name] !== 'undefined');
            const missing = requiredModules.filter(name => typeof window[name] === 'undefined');
            
            return {
                loaded: available.length,
                total: requiredModules.length,
                percentage: Math.round((available.length / requiredModules.length) * 100),
                available: available,
                missing: missing,
                ready: available.length === requiredModules.length
            };
        }
    };
    
    // Auto-initialize
    initialize();
    
})();

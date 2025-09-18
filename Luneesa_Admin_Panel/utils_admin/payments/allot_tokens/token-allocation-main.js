/**
 * Token Allocation System - Main Entry Point
 * Loads all modules and initializes the system
 */

// Module loading configuration
const TOKEN_MODULES = {
    'core-system': 'modules/core-system.js',
    'single-handler': 'modules/single-handler.js',
    'bulk-handler': 'modules/bulk-handler.js',
    'json-handler': 'modules/json-handler.js',
    'form-validation': 'modules/form-validation.js',
    'results-handler': 'modules/results-handler.js',
    'notification-handler': 'modules/notification-handler.js'
};

class TokenModuleLoader {
    constructor() {
        this.loadedModules = new Set();
        this.loadingPromises = new Map();
    }
    
    async loadModule(moduleName) {
        // Return existing promise if already loading
        if (this.loadingPromises.has(moduleName)) {
            return this.loadingPromises.get(moduleName);
        }
        
        // Return immediately if already loaded
        if (this.loadedModules.has(moduleName)) {
            return Promise.resolve();
        }
        
        const moduleUrl = TOKEN_MODULES[moduleName];
        if (!moduleUrl) {
            throw new Error(`Unknown module: ${moduleName}`);
        }
        
        const loadPromise = this.loadScript(moduleUrl).then(() => {
            this.loadedModules.add(moduleName);
            console.log(`✓ Loaded module: ${moduleName}`);
        }).catch(error => {
            console.error(`✗ Failed to load module ${moduleName}:`, error);
            throw error;
        });
        
        this.loadingPromises.set(moduleName, loadPromise);
        return loadPromise;
    }
    
    loadScript(url) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = url;
            script.onload = resolve;
            script.onerror = () => reject(new Error(`Failed to load script: ${url}`));
            // document.head.appendChild(script);
        });
    }
    
    async loadAllModules() {
        console.log('🚀 Loading Token Allocation System modules...');
        
        try {
            // Load modules in dependency order
            const loadOrder = [
                'notification-handler',  // No dependencies
                'results-handler',       // Uses notification-handler
                'form-validation',       // No dependencies
                'json-handler',          // Uses notification-handler
                'single-handler',        // Uses notification-handler, results-handler, form-validation
                'bulk-handler',          // Uses notification-handler, results-handler, form-validation
                'core-system'            // Uses all others
            ];
            
            for (const moduleName of loadOrder) {
                await this.loadModule(moduleName);
            }
            
            console.log('✅ All Token Allocation System modules loaded successfully');
            
            // Initialize system after all modules are loaded
            this.initializeSystem();
            
        } catch (error) {
            console.error('❌ Failed to load Token Allocation System:', error);
            this.showLoadingError(error);
        }
    }
    
    initializeSystem() {
        // All modules should be initialized by their own DOMContentLoaded events
        // This is just for any final setup
        document.dispatchEvent(new CustomEvent('tokenSystemReady', {
            detail: { loadedModules: Array.from(this.loadedModules) }
        }));
        
        console.log('🎉 Token Allocation System ready!');
    }
    
    showLoadingError(error) {
        const errorContainer = document.createElement('div');
        errorContainer.id = 'token-loading-error';
        errorContainer.innerHTML = `
            <div style="
                background-color: #FEE2E2;
                border: 1px solid #FECACA;
                color: #DC2626;
                padding: 16px;
                border-radius: 8px;
                margin: 20px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            ">
                <h4 style="margin: 0 0 8px 0; font-size: 16px;">
                    <i class="fas fa-exclamation-triangle"></i>
                    Failed to Load Token Allocation System
                </h4>
                <p style="margin: 0; font-size: 14px;">
                    ${error.message}
                </p>
                <button onclick="location.reload()" style="
                    margin-top: 12px;
                    padding: 8px 16px;
                    background-color: #DC2626;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                ">
                    Reload Page
                </button>
            </div>
        `;
        
        // Insert error message at the top of the token allocation content
        const tokenContent = document.querySelector('#single-mode-content, .token-allocation-container, body');
        if (tokenContent) {
            tokenContent.insertBefore(errorContainer, tokenContent.firstChild);
        }
    }
    
    getLoadedModules() {
        return Array.from(this.loadedModules);
    }
    
    isModuleLoaded(moduleName) {
        return this.loadedModules.has(moduleName);
    }
}

// Initialize module loader
const tokenModuleLoader = new TokenModuleLoader();

// Auto-load modules when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        tokenModuleLoader.loadAllModules();
    });
} else {
    // DOM already loaded
    tokenModuleLoader.loadAllModules();
}

// Export for manual loading if needed
window.tokenModuleLoader = tokenModuleLoader;

// Utility function to check if system is ready
window.isTokenSystemReady = function() {
    return tokenModuleLoader.getLoadedModules().length === Object.keys(TOKEN_MODULES).length;
};

// Event listener for system ready
document.addEventListener('tokenSystemReady', (event) => {
    console.log('Token System Ready Event:', event.detail);
    
    // Any additional setup after system is fully loaded
    if (typeof tokenResultsHandler !== 'undefined') {
        tokenResultsHandler.addExportButtons();
    }
});

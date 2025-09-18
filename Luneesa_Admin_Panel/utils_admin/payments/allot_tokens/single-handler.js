/**
 * Token Allocation System - Single Mode Handler
 * Handles single user token allocation operations
 */

class TokenSingleHandler {
    constructor() {
        this.init();
    }
    
    init() {
        this.bindSingleModeEvents();
    }
    
    bindSingleModeEvents() {
        // Single mode action buttons
        document.getElementById('single-allocate-btn')?.addEventListener('click', () => {
            this.handleSingleAllocation();
        });
        
        document.getElementById('single-clear-btn')?.addEventListener('click', () => {
            this.clearSingleForm();
        });
    }
    
    async handleSingleAllocation() {
        const formData = this.getSingleFormData();
        
        if (!this.validateSingleForm(formData)) {
            return;
        }
        
        // Additional validation using forms handler
        if (typeof tokenFormsHandler !== 'undefined' && !tokenFormsHandler.validateAllSingleFields()) {
            return;
        }
        
        const button = document.getElementById('single-allocate-btn');
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
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            console.log(result);
            
            if (response.ok && result.success) {
                const successResult = [{
                    username: formData.username,
                    agentId: formData.agentId,
                    modelName: formData.modelName,
                    status: 'success',
                    message: result.message || `Successfully allocated ${formData.tokensToAdd} tokens`,
                    tokensAllocated: formData.tokensToAdd
                }];
                
                if (typeof tokenResultsHandler !== 'undefined') {
                    tokenResultsHandler.showResults(successResult);
                }
                
                this.clearSingleForm();
                if (typeof tokenNotificationHandler !== 'undefined') {
                    tokenNotificationHandler.showNotification('Token allocation successful!', 'success');
                }
            } else {
                const errorResult = [{
                    username: formData.username,
                    agentId: formData.agentId,
                    modelName: formData.modelName,
                    status: 'error',
                    message: result.error || 'Allocation failed',
                    tokensAllocated: 0
                }];
                
                if (typeof tokenResultsHandler !== 'undefined') {
                    tokenResultsHandler.showResults(errorResult);
                }
                
                if (typeof tokenNotificationHandler !== 'undefined') {
                    tokenNotificationHandler.showNotification('Token allocation failed: ' + (result.error || 'Unknown error'), 'error');
                }
            }
        } catch (error) {
            console.error('Token allocation error:', error);
            const errorResult = [{
                username: formData.username,
                agentId: formData.agentId || 'N/A',
                modelName: formData.modelName || 'N/A',
                status: 'error',
                message: 'Network error: ' + error.message,
                tokensAllocated: 0
            }];
            
            if (typeof tokenResultsHandler !== 'undefined') {
                tokenResultsHandler.showResults(errorResult);
            }
            
            if (typeof tokenNotificationHandler !== 'undefined') {
                tokenNotificationHandler.showNotification('Network error occurred. Please try again.', 'error');
            }
        } finally {
            button.classList.remove('token-btn-loading');
            button.disabled = false;
        }
    }
    
    getSingleFormData() {
        return {
            username: document.getElementById('singleUsername')?.value?.trim(),
            agentId: document.getElementById('singleAgentId')?.value?.trim(),
            modelName: document.getElementById('singleModelName')?.value,
            tokensToAdd: parseInt(document.getElementById('singleTokensToAdd')?.value) || 0
        };
    }
    
    validateSingleForm(data) {
        const errors = [];
        
        if (!data.username) errors.push('Username is required');
        if (!data.agentId) errors.push('Agent ID is required');
        if (!data.modelName) errors.push('Model Name is required');
        if (!data.tokensToAdd && data.tokensToAdd !== 0) errors.push('Tokens to Add/Deduct is required');
        
        // Validate Agent ID length (20 characters)
        if (data.agentId && data.agentId.length !== 20) {
            errors.push('Agent ID must be exactly 20 characters long');
        }
        
        // Validate tokens is a number and not zero
        if (data.tokensToAdd !== undefined && data.tokensToAdd !== null) {
            if (!Number.isInteger(data.tokensToAdd)) {
                errors.push('Tokens to Add/Deduct must be a valid integer');
            }
            if (data.tokensToAdd === 0) {
                errors.push('Tokens to Add/Deduct cannot be zero');
            }
        }
        
        if (errors.length > 0) {
            if (typeof tokenNotificationHandler !== 'undefined') {
                tokenNotificationHandler.showNotification('Please fix the following errors:\n\n' + errors.join('\n'), 'error');
            }
            return false;
        }
        
        return true;
    }
    
    clearSingleForm() {
        document.getElementById('singleTokenForm')?.reset();
        
        if (typeof tokenResultsHandler !== 'undefined') {
            tokenResultsHandler.hideResults();
        }
        
        // Clear any validation errors
        if (typeof tokenFormsHandler !== 'undefined') {
            tokenFormsHandler.clearAllValidations();
        }
    }
}

// Initialize single handler when DOM is loaded
let tokenSingleHandler;
document.addEventListener('DOMContentLoaded', () => {
    tokenSingleHandler = new TokenSingleHandler();
});

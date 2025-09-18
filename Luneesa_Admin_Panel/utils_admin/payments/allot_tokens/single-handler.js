/**
 * Token Allocation System - Single Handler Module
 * Handles single user token allocation
 */

class TokenSingleHandler {
    constructor() {
        this.bindEvents();
    }
    
    bindEvents() {
        // Single mode actions
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
            let result;
            
            if (typeof tokenAPI !== 'undefined' && tokenAPI.mockMode) {
                result = await tokenAPI.mockResponse('single', formData);
            } else if (typeof tokenAPI !== 'undefined') {
                result = await tokenAPI.allocateSingleUser(formData);
            } else {
                // Fallback to direct API call
                const response = await fetch('/admin/allot_tokens_to_agents', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
                result = await response.json();
                result.success = response.ok;
            }
            
            if (result.success) {
                const results = [{
                    username: formData.username,
                    status: 'success',
                    message: result.message || `Successfully allocated ${formData.tokensToAdd} tokens`,
                    tokensAllocated: formData.tokensToAdd
                }];
                
                if (typeof tokenResultsHandler !== 'undefined') {
                    tokenResultsHandler.showResults(results);
                }
                this.clearSingleForm();
            } else {
                const results = [{
                    username: formData.username,
                    status: 'error',
                    message: result.message || 'Allocation failed',
                    tokensAllocated: 0
                }];
                
                if (typeof tokenResultsHandler !== 'undefined') {
                    tokenResultsHandler.showResults(results);
                }
            }
        } catch (error) {
            const results = [{
                username: formData.username,
                status: 'error',
                message: 'Error: ' + error.message,
                tokensAllocated: 0
            }];
            
            if (typeof tokenResultsHandler !== 'undefined') {
                tokenResultsHandler.showResults(results);
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
        
        if (errors.length > 0) {
            if (typeof tokenNotificationHandler !== 'undefined') {
                tokenNotificationHandler.showError('Please fix the following errors:\n\n' + errors.join('\n'));
            } else {
                alert('Please fix the following errors:\n\n' + errors.join('\n'));
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

// Initialize single handler
let tokenSingleHandler;
document.addEventListener('DOMContentLoaded', () => {
    tokenSingleHandler = new TokenSingleHandler();
});

/**
 * Token Allocation System - Forms Handler
 * Handles form validation, data collection, and user interactions
 */

class TokenFormsHandler {
    constructor() {
        this.modelOptions = [
            { value: 'gpt-4', label: 'GPT-4' },
            { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
            { value: 'claude-3-sonnet', label: 'Claude 3 Sonnet' },
            { value: 'claude-3-haiku', label: 'Claude 3 Haiku' },
            { value: 'gemini-pro', label: 'Gemini Pro' },
            { value: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro' }
        ];
        
        this.init();
    }
    
    init() {
        this.bindFormEvents();
        this.setupFormValidation();
    }
    
    bindFormEvents() {
        // Single form events
        const singleForm = document.getElementById('singleTokenForm');
        if (singleForm) {
            singleForm.addEventListener('input', (e) => this.handleFormInput(e));
            singleForm.addEventListener('change', (e) => this.handleFormChange(e));
        }
        
        // Auto-suggest model names
        const singleModelName = document.getElementById('singleModelName');
        if (singleModelName) {
            this.setupModelNameAutocomplete(singleModelName);
        }
    }
    
    setupFormValidation() {
        // Real-time validation for single form
        this.setupSingleFormValidation();
        
        // Setup bulk form validation
        this.setupBulkFormValidation();
    }
    
    setupSingleFormValidation() {
        const form = document.getElementById('singleTokenForm');
        if (!form) return;
        
        const fields = {
            singleUsername: { required: true, minLength: 3, maxLength: 50 },
            singleAgentId: { required: true, minLength: 20, maxLength: 20 },
            singleModelName: { required: true, minLength: 3, maxLength: 50 },
            singleTokensToAdd: { required: true, type: 'number', notZero: true }
        };
        
        Object.keys(fields).forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.addEventListener('blur', () => {
                    if (typeof tokenValidator !== 'undefined') {
                        tokenValidator.validateField(fieldId, fields[fieldId]);
                    }
                });
                field.addEventListener('input', () => {
                    if (typeof tokenValidator !== 'undefined') {
                        tokenValidator.clearFieldError(fieldId);
                    }
                });
            }
        });
    }
    
    setupBulkFormValidation() {
        // Dynamic validation for bulk user entries will be handled when entries are created
        this.observeBulkEntries();
    }
    
    observeBulkEntries() {
        const bulkContainer = document.getElementById('bulkUsersContainer');
        if (!bulkContainer) return;
        
        // Use MutationObserver to watch for dynamically added bulk entries
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1 && node.classList.contains('bulk-user-entry')) {
                        this.setupBulkEntryValidation(node);
                    }
                });
            });
        });
        
        observer.observe(bulkContainer, { childList: true });
    }
    
    setupBulkEntryValidation(entryElement) {
        const inputs = entryElement.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateBulkField(input));
            input.addEventListener('input', () => this.clearBulkFieldError(input));
            
            // Setup model name autocomplete for model name fields
            if (input.id.includes('modelname')) {
                this.setupModelNameAutocomplete(input);
            }
        });
    }
    
    validateBulkField(field) {
        if (typeof tokenValidator === 'undefined') {
            return true; // Skip validation if validator not loaded yet
        }
        const fieldType = tokenValidator.getBulkFieldType(field.id);
        const rules = tokenValidator.getBulkFieldRules(fieldType);
        return tokenValidator.validateField(field.id, rules);
    }
    
    clearBulkFieldError(field) {
        field.classList.remove('invalid');
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
    
    handleFormInput(e) {
        const field = e.target;
        
        // Special handling for token input fields
        if (field.id.includes('TokensToAdd') || field.id.includes('tokens')) {
            this.handleTokenInput(field);
        }
        
        // Real-time validation for certain fields
        if (field.type === 'text' && field.value.length > 2) {
            this.debounce(() => {
                if (field.id.includes('Username') || field.id.includes('username')) {
                    if (typeof tokenValidator !== 'undefined') {
                        tokenValidator.validateUsernameFormat(field);
                    }
                }
            }, 500)();
        }
    }
    
    handleFormChange(e) {
        const field = e.target;
        
        // Validate on change for select fields and completed text fields
        if (field.tagName === 'SELECT' || field.type === 'number') {
            setTimeout(() => {
                if (field.id.startsWith('single')) {
                    if (typeof tokenValidator !== 'undefined') {
                        tokenValidator.validateField(field.id, tokenValidator.getSingleFieldRules(field.id));
                    }
                } else {
                    this.validateBulkField(field);
                }
            }, 100);
        }
    }
    
    handleTokenInput(field) {
        const value = field.value;
        
        // Allow negative values and show appropriate styling
        if (value && !isNaN(value)) {
            const numValue = parseInt(value);
            if (numValue < 0) {
                field.style.color = '#EF4444'; // Red for deduction
            } else if (numValue > 0) {
                field.style.color = '#10B981'; // Green for addition
            } else {
                field.style.color = '#6B7280'; // Gray for zero
            }
        } else {
            field.style.color = '';
        }
    }
    
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Public methods for external validation
    validateAllSingleFields() {
        if (typeof tokenValidator === 'undefined') {
            return true; // Skip validation if validator not loaded yet
        }
        
        const fields = ['singleUsername', 'singleAgentId', 'singleModelName', 'singleTokensToAdd'];
        let allValid = true;
        
        fields.forEach(fieldId => {
            const rules = tokenValidator.getSingleFieldRules(fieldId);
            const isValid = tokenValidator.validateField(fieldId, rules);
            if (!isValid) allValid = false;
        });
        
        return allValid;
    }
    
    validateAllBulkFields() {
        if (typeof tokenBulkManager === 'undefined') {
            return true; // Skip validation if bulk manager not loaded yet
        }
        return tokenBulkManager.validateAllBulkEntries();
    }
    
    clearAllValidations() {
        // Clear single form validations
        const singleInputs = document.querySelectorAll('#singleTokenForm input, #singleTokenForm select');
        singleInputs.forEach(input => {
            input.classList.remove('invalid');
            input.style.color = '';
            const errorMessage = input.parentNode.querySelector('.error-message');
            if (errorMessage) errorMessage.remove();
        });
        
        // Clear bulk form validations
        if (typeof tokenBulkManager !== 'undefined') {
            tokenBulkManager.clearBulkValidations();
        }
    }
    
    setupModelNameAutocomplete(input) {
        const commonModels = [
            'gpt-4',
            'gpt-3.5-turbo',
            'gpt-4-turbo',
            'claude-3-sonnet',
            'claude-3-haiku',
            'claude-3-opus',
            'gemini-pro',
            'gemini-1.5-pro',
            'text-davinci-003',
            'text-embedding-ada-002'
        ];
        
        input.addEventListener('input', (e) => {
            const value = e.target.value.toLowerCase();
            if (value.length > 0) {
                const matches = commonModels.filter(model => 
                    model.toLowerCase().includes(value)
                );
                
                if (matches.length > 0) {
                    this.showModelSuggestions(input, matches);
                } else {
                    this.hideModelSuggestions(input);
                }
            } else {
                this.hideModelSuggestions(input);
            }
        });
        
        input.addEventListener('blur', (e) => {
            // Delay hiding to allow clicking on suggestions
            setTimeout(() => this.hideModelSuggestions(input), 150);
        });
        
        input.addEventListener('focus', (e) => {
            const value = e.target.value.toLowerCase();
            if (value.length > 0) {
                const matches = commonModels.filter(model => 
                    model.toLowerCase().includes(value)
                );
                if (matches.length > 0) {
                    this.showModelSuggestions(input, matches);
                }
            }
        });
    }
    
    showModelSuggestions(input, suggestions) {
        this.hideModelSuggestions(input); // Remove existing suggestions
        
        const suggestionsList = document.createElement('div');
        suggestionsList.className = 'model-suggestions';
        suggestionsList.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border: 1px solid #D1D5DB;
            border-top: none;
            border-radius: 0 0 6px 6px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            max-height: 200px;
            overflow-y: auto;
        `;
        
        suggestions.forEach(model => {
            const suggestionItem = document.createElement('div');
            suggestionItem.className = 'model-suggestion-item';
            suggestionItem.textContent = model;
            suggestionItem.style.cssText = `
                padding: 8px 12px;
                cursor: pointer;
                border-bottom: 1px solid #F3F4F6;
                transition: background-color 0.2s ease;
            `;
            
            suggestionItem.addEventListener('mouseenter', () => {
                suggestionItem.style.backgroundColor = '#F3F4F6';
            });
            
            suggestionItem.addEventListener('mouseleave', () => {
                suggestionItem.style.backgroundColor = 'white';
            });
            
            suggestionItem.addEventListener('click', () => {
                input.value = model;
                this.hideModelSuggestions(input);
                input.focus();
                
                // Trigger validation
                input.dispatchEvent(new Event('blur'));
            });
            
            suggestionsList.appendChild(suggestionItem);
        });
        
        // Position the suggestions relative to the input
        const inputGroup = input.parentNode;
        inputGroup.style.position = 'relative';
        inputGroup.appendChild(suggestionsList);
    }
    
    hideModelSuggestions(input) {
        const inputGroup = input.parentNode;
        const existingSuggestions = inputGroup.querySelector('.model-suggestions');
        if (existingSuggestions) {
            existingSuggestions.remove();
        }
    }
    
    resetForm(formType = 'single') {
        if (formType === 'single') {
            const form = document.getElementById('singleTokenForm');
            if (form) {
                form.reset();
                this.clearSingleFormValidation();
            }
        } else if (formType === 'bulk') {
            tokenBulkManager.clearAllBulkUsers();
            tokenAllocation.addBulkUser();
        } else if (formType === 'json') {
            tokenJsonHandler.clearJsonData();
        }
    }
    
    clearSingleFormValidation() {
        const singleInputs = document.querySelectorAll('#singleTokenForm input, #singleTokenForm select');
        singleInputs.forEach(input => {
            input.classList.remove('invalid');
            input.style.color = '';
            const errorMessage = input.parentNode.querySelector('.error-message');
            if (errorMessage) errorMessage.remove();
        });
    }
    
    populateFormFromData(data, formType = 'single') {
        if (formType === 'single' && data) {
            document.getElementById('singleUsername').value = data.username || '';
            document.getElementById('singleAgentId').value = data.agentId || '';
            document.getElementById('singleModelName').value = data.modelName || '';
            document.getElementById('singleTokensToAdd').value = data.tokensToAdd || '';
        }
    }
    
    getModelSuggestions(query) {
        return this.modelOptions
            .filter(option => 
                option.value.toLowerCase().includes(query.toLowerCase()) ||
                option.label.toLowerCase().includes(query.toLowerCase())
            )
            .map(option => option.value);
    }
    
    addCustomModelOption(modelName, modelLabel = null) {
        const exists = this.modelOptions.some(option => option.value === modelName);
        if (!exists) {
            this.modelOptions.push({
                value: modelName,
                label: modelLabel || modelName
            });
        }
    }
}

// Initialize forms handler when DOM is loaded
let tokenFormsHandler;
document.addEventListener('DOMContentLoaded', () => {
    tokenFormsHandler = new TokenFormsHandler();
});

/**
 * Token Allocation System - Form Validation Handler
 * Handles form validation, autocomplete, and field interactions
 */

class TokenFormsHandler {
    constructor() {
        this.commonModels = [
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
        this.setupSingleFormValidation();
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
                field.addEventListener('blur', () => this.validateField(fieldId, fields[fieldId]));
                field.addEventListener('input', () => this.clearFieldError(fieldId));
            }
        });
    }
    
    setupBulkFormValidation() {
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
    
    validateField(fieldId, rules) {
        const field = document.getElementById(fieldId);
        if (!field) return true;
        
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Required validation
        if (rules.required && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        
        // Length validation
        if (isValid && rules.minLength && value.length < rules.minLength) {
            isValid = false;
            errorMessage = `Minimum length is ${rules.minLength} characters`;
        }
        
        if (isValid && rules.maxLength && value.length > rules.maxLength) {
            isValid = false;
            errorMessage = `Maximum length is ${rules.maxLength} characters`;
        }
        
        // Pattern validation
        if (isValid && rules.pattern && !rules.pattern.test(value)) {
            isValid = false;
            errorMessage = 'Invalid format';
        }
        
        // Number validation
        if (isValid && rules.type === 'number') {
            const numValue = parseInt(value);
            if (isNaN(numValue)) {
                isValid = false;
                errorMessage = 'Must be a valid number';
            } else {
                if (rules.min !== undefined && numValue < rules.min) {
                    isValid = false;
                    errorMessage = `Minimum value is ${rules.min}`;
                }
                if (rules.max !== undefined && numValue > rules.max) {
                    isValid = false;
                    errorMessage = `Maximum value is ${rules.max}`;
                }
                if (rules.notZero && numValue === 0) {
                    isValid = false;
                    errorMessage = 'Value cannot be zero';
                }
            }
        }

        this.showFieldValidation(field, isValid, errorMessage);
        return isValid;
    }
    
    validateBulkField(field) {
        const fieldType = this.getBulkFieldType(field.id);
        let rules = {};
        
        switch (fieldType) {
            case 'username':
                rules = { required: true, minLength: 3, maxLength: 50 };
                break;
            case 'agentid':
                rules = { required: true, minLength: 20, maxLength: 20 };
                break;
            case 'modelname':
                rules = { required: true, minLength: 3, maxLength: 50 };
                break;
            case 'tokens':
                rules = { required: true, type: 'number', notZero: true };
                break;
        }
        
        return this.validateField(field.id, rules);
    }
    
    getBulkFieldType(fieldId) {
        if (fieldId.includes('username')) return 'username';
        if (fieldId.includes('agentid')) return 'agentid';
        if (fieldId.includes('modelname')) return 'modelname';
        if (fieldId.includes('tokens')) return 'tokens';
        return 'unknown';
    }
    
    showFieldValidation(field, isValid, errorMessage) {
        // Remove existing error styling and messages
        field.classList.remove('invalid');
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        if (!isValid) {
            field.classList.add('invalid');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = errorMessage;
            field.parentNode.appendChild(errorDiv);
        }
    }
    
    clearFieldError(fieldId) {
        const field = document.getElementById(fieldId);
        if (field) {
            field.classList.remove('invalid');
            const errorMessage = field.parentNode.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
        }
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
                    this.validateUsernameFormat(field);
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
                    this.validateField(field.id, this.getSingleFieldRules(field.id));
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
    
    validateUsernameFormat(field) {
        const username = field.value.trim();
        const isValid = /^[a-zA-Z0-9_.-]+$/.test(username);
        
        if (!isValid && username.length > 0) {
            this.showFieldValidation(field, false, 'Username can only contain letters, numbers, dots, hyphens, and underscores');
        } else {
            this.showFieldValidation(field, true, '');
        }
    }
    
    getSingleFieldRules(fieldId) {
        const rules = {
            singleUsername: { required: true, minLength: 3, maxLength: 50 },
            singleAgentId: { required: true, minLength: 20, maxLength: 20 },
            singleModelName: { required: true, minLength: 3, maxLength: 50 },
            singleTokensToAdd: { required: true, type: 'number', notZero: true }
        };
        
        return rules[fieldId] || {};
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
        const fields = ['singleUsername', 'singleAgentId', 'singleModelName', 'singleTokensToAdd'];
        let allValid = true;
        
        fields.forEach(fieldId => {
            const rules = this.getSingleFieldRules(fieldId);
            const isValid = this.validateField(fieldId, rules);
            if (!isValid) allValid = false;
        });
        
        return allValid;
    }
    
    validateAllBulkFields() {
        const bulkEntries = document.querySelectorAll('.bulk-user-entry');
        let allValid = true;
        
        bulkEntries.forEach(entry => {
            const inputs = entry.querySelectorAll('input, select');
            inputs.forEach(input => {
                const isValid = this.validateBulkField(input);
                if (!isValid) allValid = false;
            });
        });
        
        return allValid;
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
        const bulkInputs = document.querySelectorAll('.bulk-user-entry input, .bulk-user-entry select');
        bulkInputs.forEach(input => {
            input.classList.remove('invalid');
            input.style.color = '';
            const errorMessage = input.parentNode.querySelector('.error-message');
            if (errorMessage) errorMessage.remove();
        });
    }
    
    setupModelNameAutocomplete(input) {
        input.addEventListener('input', (e) => {
            const value = e.target.value.toLowerCase();
            if (value.length > 0) {
                const matches = this.commonModels.filter(model => 
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
                const matches = this.commonModels.filter(model => 
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
}

// Initialize forms handler when DOM is loaded
let tokenFormsHandler;
document.addEventListener('DOMContentLoaded', () => {
    tokenFormsHandler = new TokenFormsHandler();
});

/**
 * Token Allocation System - Form Validation Module
 * Handles all form validation and user input processing
 */

class TokenFormValidation {
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
        
        // Auto-generate agent ID based on username (optional helper)
        const singleUsername = document.getElementById('singleUsername');
        if (singleUsername) {
            singleUsername.addEventListener('blur', () => this.suggestAgentId('single'));
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
            singleAgentId: { required: true, pattern: /^AGT-[a-zA-Z0-9]{16}$/ },
            singleModelName: { required: true, minLength: 3, maxLength: 50 },
            singleTokensToAdd: { required: true, type: 'number', min: -10000, max: 10000 }
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
            
            // Auto-suggest agent ID for username fields
            if (input.id.includes('username')) {
                const userId = input.id.split('-')[2];
                input.addEventListener('blur', () => this.suggestAgentId('bulk', userId));
            }
            
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
            }
        }
        
        // Special validation for agent ID
        if (isValid && fieldId.includes('AgentId') && value && !value.startsWith('AGT-')) {
            isValid = false;
            errorMessage = 'Agent ID must start with "AGT-" followed by 16 characters';
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
                rules = { required: true, pattern: /^AGT-[a-zA-Z0-9]{16}$/ };
                break;
            case 'modelname':
                rules = { required: true, minLength: 3, maxLength: 50 };
                break;
            case 'tokens':
                rules = { required: true, type: 'number', min: -10000, max: 10000 };
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
    
    suggestAgentId(mode, userId = null) {
        let usernameField, agentIdField;
        
        if (mode === 'single') {
            usernameField = document.getElementById('singleUsername');
            agentIdField = document.getElementById('singleAgentId');
        } else {
            usernameField = document.getElementById(`bulk-username-${userId}`);
            agentIdField = document.getElementById(`bulk-agentid-${userId}`);
        }
        
        if (!usernameField || !agentIdField || agentIdField.value.trim()) {
            return; // Don't override existing agent ID
        }
        
        const username = usernameField.value.trim();
        if (username) {
            // Generate a suggested agent ID in AGT-XXXXXXXXXXXXXXXX format
            const randomString = this.generateRandomString(16);
            agentIdField.value = `AGT-${randomString}`;
            agentIdField.style.fontStyle = 'italic';
            agentIdField.style.color = '#6B7280';
            
            // Clear the styling when user focuses on the field
            agentIdField.addEventListener('focus', function clearSuggestion() {
                agentIdField.style.fontStyle = '';
                agentIdField.style.color = '';
                agentIdField.removeEventListener('focus', clearSuggestion);
            });
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
            singleAgentId: { required: true, pattern: /^AGT-[a-zA-Z0-9]{16}$/ },
            singleModelName: { required: true, minLength: 3, maxLength: 50 },
            singleTokensToAdd: { required: true, type: 'number', min: -10000, max: 10000 }
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
    
    generateRandomString(length) {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
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
}

// Initialize form validation handler
let tokenFormsHandler;
document.addEventListener('DOMContentLoaded', () => {
    tokenFormsHandler = new TokenFormValidation();
});

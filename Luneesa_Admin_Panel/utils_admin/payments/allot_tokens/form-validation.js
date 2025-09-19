/**
 * Token Allocation Form Validation
 * Handles validation for both single and bulk token allocation forms
 */

class TokenFormValidator {
    constructor() {
        this.validationRules = {
            username: {
                required: true,
                minLength: 3,
                maxLength: 50,
                pattern: /^[a-zA-Z0-9_.-]+$/,
                message: 'Username must be 3-50 characters, alphanumeric with -, _, .'
            },
            agentId: {
                required: true,
                minLength: 10,
                maxLength: 100,
                pattern: /^[A-Za-z0-9-]+$/,
                message: 'Agent ID must be 10-100 characters, alphanumeric with hyphens'
            },
            modelName: {
                required: true,
                minLength: 2,
                maxLength: 100,
                pattern: /^[a-zA-Z0-9._-]+$/,
                message: 'Model name must be 2-100 characters, alphanumeric with ., _, -'
            },
            tokensToAdd: {
                required: true,
                type: 'integer',
                min: -99999999,
                max: 999999999,
                notZero: true,
                message: 'Tokens must be a non-zero integer between -999999 and 999999'
            }
        };
    }

    /**
     * Validate a single field
     */
    validateField(fieldId, customRules = null) {
        const field = document.getElementById(fieldId);
        if (!field) return true;

        const fieldType = this.getFieldType(fieldId);
        const rules = customRules || this.validationRules[fieldType];
        
        if (!rules) return true;

        const value = field.value.trim();
        const errors = [];

        // Required validation
        if (rules.required && !value) {
            errors.push('This field is required');
        }

        if (value) {
            // Length validations
            if (rules.minLength && value.length < rules.minLength) {
                errors.push(`Minimum length is ${rules.minLength} characters`);
            }
            
            if (rules.maxLength && value.length > rules.maxLength) {
                errors.push(`Maximum length is ${rules.maxLength} characters`);
            }

            // Pattern validation
            if (rules.pattern && !rules.pattern.test(value)) {
                errors.push(rules.message || 'Invalid format');
            }

            // Type validation
            if (rules.type === 'integer') {
                const numValue = parseInt(value);
                if (isNaN(numValue) || numValue.toString() !== value) {
                    errors.push('Must be a valid integer');
                } else {
                    if (rules.min !== undefined && numValue < rules.min) {
                        errors.push(`Minimum value is ${rules.min}`);
                    }
                    if (rules.max !== undefined && numValue > rules.max) {
                        errors.push(`Maximum value is ${rules.max}`);
                    }
                    if (rules.notZero && numValue === 0) {
                        errors.push('Value cannot be zero');
                    }
                }
            }
        }

        // Update field UI
        this.updateFieldValidation(field, errors);
        
        return errors.length === 0;
    }

    /**
     * Update field validation UI
     */
    updateFieldValidation(field, errors) {
        // Remove existing validation styles
        field.classList.remove('invalid');
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) existingError.remove();

        if (errors.length > 0) {
            // Add error styles
            field.classList.add('invalid');
            
            // Add error message
            const errorElement = document.createElement('small');
            errorElement.className = 'error-message';
            errorElement.textContent = errors[0]; // Show first error
            field.parentNode.appendChild(errorElement);
        }
    }

    /**
     * Get field type from field ID
     */
    getFieldType(fieldId) {
        if (fieldId.includes('username') || fieldId.includes('Username')) return 'username';
        if (fieldId.includes('agentid') || fieldId.includes('AgentId')) return 'agentId';
        if (fieldId.includes('modelname') || fieldId.includes('ModelName')) return 'modelName';
        if (fieldId.includes('tokens') || fieldId.includes('Tokens')) return 'tokensToAdd';
        return 'unknown';
    }

    /**
     * Get field type for bulk entries
     */
    getBulkFieldType(fieldId) {
        if (fieldId.includes('username')) return 'username';
        if (fieldId.includes('agentid')) return 'agentId';
        if (fieldId.includes('modelname')) return 'modelName';
        if (fieldId.includes('tokens')) return 'tokensToAdd';
        return 'unknown';
    }

    /**
     * Get validation rules for field type
     */
    getBulkFieldRules(fieldType) {
        return this.validationRules[fieldType];
    }

    /**
     * Validate single form
     */
    validateSingleForm() {
        const fields = ['singleUsername', 'singleAgentId', 'singleModelName', 'singleTokensToAdd'];
        let isValid = true;

        fields.forEach(fieldId => {
            if (!this.validateField(fieldId)) {
                isValid = false;
            }
        });

        return isValid;
    }

    /**
     * Validate all bulk entries
     */
    validateBulkForm() {
        const bulkEntries = document.querySelectorAll('.bulk-user-entry');
        let isValid = true;

        bulkEntries.forEach((entry, index) => {
            const inputs = entry.querySelectorAll('input, select');
            inputs.forEach(input => {
                if (!this.validateField(input.id)) {
                    isValid = false;
                }
            });
        });

        return isValid;
    }

    /**
     * Clear all validations
     */
    clearValidations(container = document) {
        const invalidFields = container.querySelectorAll('.invalid');
        invalidFields.forEach(field => {
            field.classList.remove('invalid');
        });

        const errorMessages = container.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.remove());
    }

    /**
     * Setup real-time validation for a form
     */
    setupRealTimeValidation(formSelector) {
        const form = document.querySelector(formSelector);
        if (!form) return;

        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            // Validate on blur (when user leaves field)
            input.addEventListener('blur', () => {
                this.validateField(input.id);
            });

            // Clear validation on input (when user starts typing)
            input.addEventListener('input', () => {
                if (input.classList.contains('invalid')) {
                    input.classList.remove('invalid');
                    const errorElement = input.parentNode.querySelector('.error-message');
                    if (errorElement) errorElement.remove();
                }
            });
        });
    }

    /**
     * Collect and validate single form data
     */
    getSingleFormData() {
        if (!this.validateSingleForm()) {
            return null;
        }

        return {
            username: document.getElementById('singleUsername').value.trim(),
            agentId: document.getElementById('singleAgentId').value.trim(),
            modelName: document.getElementById('singleModelName').value.trim(),
            tokensToAdd: parseInt(document.getElementById('singleTokensToAdd').value.trim())
        };
    }

    /**
     * Collect and validate bulk form data
     */
    getBulkFormData() {
        const bulkEntries = document.querySelectorAll('.bulk-user-entry');
        const data = [];

        let isValid = true;

        bulkEntries.forEach((entry, index) => {
            const usernameEl = entry.querySelector('[id*="username"]');
            const agentIdEl = entry.querySelector('[id*="agentid"]');
            const modelNameEl = entry.querySelector('[id*="modelname"]');
            const tokensEl = entry.querySelector('[id*="tokens"]');

            // Validate each field in this entry
            const entryValid = [
                this.validateField(usernameEl.id),
                this.validateField(agentIdEl.id),
                this.validateField(modelNameEl.id),
                this.validateField(tokensEl.id)
            ].every(valid => valid);

            if (!entryValid) {
                isValid = false;
            } else {
                data.push({
                    username: usernameEl.value.trim(),
                    agentId: agentIdEl.value.trim(),
                    modelName: modelNameEl.value.trim(),
                    tokensToAdd: parseInt(tokensEl.value.trim())
                });
            }
        });

        return isValid ? data : null;
    }
}

// Create global instance
window.tokenValidator = new TokenFormValidator();

// Initialize real-time validation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (window.tokenValidator) {
        window.tokenValidator.setupRealTimeValidation('#singleTokenForm');
        
        // Setup validation for bulk entries (will be called when entries are added)
        const observer = new MutationObserver(() => {
            document.querySelectorAll('.bulk-user-entry').forEach(entry => {
                const inputs = entry.querySelectorAll('input, select');
                inputs.forEach(input => {
                    if (!input.hasAttribute('data-validation-setup')) {
                        input.setAttribute('data-validation-setup', 'true');
                        input.addEventListener('blur', () => {
                            window.tokenValidator.validateField(input.id);
                        });
                        input.addEventListener('input', () => {
                            if (input.classList.contains('invalid')) {
                                input.classList.remove('invalid');
                                const errorElement = input.parentNode.querySelector('.error-message');
                                if (errorElement) errorElement.remove();
                            }
                        });
                    }
                });
            });
        });

        const bulkContainer = document.getElementById('bulkUsersContainer');
        if (bulkContainer) {
            observer.observe(bulkContainer, { childList: true, subtree: true });
        }
    }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TokenFormValidator;
}
/**
 * Token Allocation System - JSON Import Handler
 * Handles JSON data import and validation for bulk operations
 */

class TokenJsonHandler {
    constructor() {
        this.init();
    }
    
    init() {
        this.bindJsonEvents();
        this.setupJsonTextarea();
    }
    
    bindJsonEvents() {
        // JSON import action buttons
        document.getElementById('validate-json-btn')?.addEventListener('click', () => {
            this.validateJsonData();
        });
        
        document.getElementById('clear-json-btn')?.addEventListener('click', () => {
            this.clearJsonData();
        });
    }
    
    setupJsonTextarea() {
        // JSON textarea formatting
        const jsonTextarea = document.getElementById('jsonImportData');
        if (jsonTextarea) {
            jsonTextarea.addEventListener('paste', (e) => {
                setTimeout(() => this.formatJsonData(), 100);
            });
            
            jsonTextarea.addEventListener('blur', (e) => {
                this.formatJsonData();
            });
        }
    }
    
    validateJsonData() {
        const jsonData = document.getElementById('jsonImportData').value.trim();
        
        if (!jsonData) {
            this.showJsonValidation('Please enter JSON data to validate.', 'error');
            return false;
        }
        
        try {
            const parsedData = JSON.parse(jsonData);
            
            if (!Array.isArray(parsedData)) {
                this.showJsonValidation('JSON must be an array of user objects.', 'error');
                return false;
            }
            
            // Validate each user object
            const errors = [];
            parsedData.forEach((user, index) => {
                if (!user.username) errors.push(`User ${index + 1}: Missing username`);
                if (!user.agentId) errors.push(`User ${index + 1}: Missing agentId`);
                if (!user.modelName) errors.push(`User ${index + 1}: Missing modelName`);
                if (user.tokensToAdd === undefined || user.tokensToAdd === null) {
                    errors.push(`User ${index + 1}: Missing tokensToAdd`);
                }
                if (typeof user.tokensToAdd !== 'number') {
                    errors.push(`User ${index + 1}: tokensToAdd must be a number`);
                }
            });
            
            if (errors.length > 0) {
                this.showJsonValidation(`Validation errors:<br>${errors.join('<br>')}`, 'error');
                return false;
            }
            
            this.showJsonValidation(`✅ JSON is valid! Found ${parsedData.length} users ready for token allocation.`, 'success');
            return true;
            
        } catch (error) {
            this.showJsonValidation(`Invalid JSON format: ${error.message}`, 'error');
            return false;
        }
    }
    
    formatJsonData() {
        const textarea = document.getElementById('jsonImportData');
        if (!textarea) return;
        
        const content = textarea.value.trim();
        if (!content) return;
        
        try {
            const parsed = JSON.parse(content);
            const formatted = JSON.stringify(parsed, null, 2);
            textarea.value = formatted;
        } catch (error) {
            // Invalid JSON, leave as is
        }
    }
    
    showJsonValidation(message, type) {
        const resultDiv = document.getElementById('jsonValidationResult');
        if (resultDiv) {
            resultDiv.style.display = 'block';
            resultDiv.className = `json-validation-result ${type}`;
            resultDiv.innerHTML = message;
        }
    }
    
    hideJsonValidation() {
        const resultDiv = document.getElementById('jsonValidationResult');
        if (resultDiv) {
            resultDiv.style.display = 'none';
        }
    }
    
    clearJsonData() {
        const jsonTextarea = document.getElementById('jsonImportData');
        if (jsonTextarea) {
            jsonTextarea.value = '';
        }
        this.hideJsonValidation();
    }
    
    getJsonSampleData() {
        return `[
  {
    "username": "user1",
    "agentId": "USER123AGENT789ABC",
    "modelName": "gpt-4",
    "tokensToAdd": 100
  },
  {
    "username": "user2", 
    "agentId": "USER456AGENT123DEF",
    "modelName": "claude-3-sonnet",
    "tokensToAdd": -50
  }
]`;
    }
    
    insertSampleData() {
        const jsonTextarea = document.getElementById('jsonImportData');
        if (jsonTextarea) {
            jsonTextarea.value = this.getJsonSampleData();
            this.formatJsonData();
        }
    }
}

// Initialize JSON handler when DOM is loaded
let tokenJsonHandler;
document.addEventListener('DOMContentLoaded', () => {
    tokenJsonHandler = new TokenJsonHandler();
});

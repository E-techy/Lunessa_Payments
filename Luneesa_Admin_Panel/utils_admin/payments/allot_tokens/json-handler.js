/**
 * Token Allocation System - JSON Handler Module
 * Handles JSON import and validation functionality
 */

class TokenJsonHandler {
    constructor() {
        this.bindEvents();
    }
    
    bindEvents() {
        // JSON import actions
        document.getElementById('validate-json-btn')?.addEventListener('click', () => {
            this.validateJsonData();
        });
        
        document.getElementById('clear-json-btn')?.addEventListener('click', () => {
            this.clearJsonData();
        });
        
        // JSON textarea formatting
        const jsonTextarea = document.getElementById('jsonImportData');
        if (jsonTextarea) {
            jsonTextarea.addEventListener('paste', (e) => {
                setTimeout(() => this.formatJsonData(), 100);
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
            console.warn('Invalid JSON format, unable to format:', error.message);
        }
    }
    
    getJsonData() {
        const jsonData = document.getElementById('jsonImportData')?.value?.trim();
        if (!jsonData) return null;
        
        try {
            return JSON.parse(jsonData);
        } catch (error) {
            console.error('Error parsing JSON data:', error);
            return null;
        }
    }
    
    setJsonData(data) {
        const textarea = document.getElementById('jsonImportData');
        if (textarea && data) {
            try {
                const formatted = JSON.stringify(data, null, 2);
                textarea.value = formatted;
            } catch (error) {
                console.error('Error formatting JSON data:', error);
                textarea.value = JSON.stringify(data);
            }
        }
    }
    
    generateSampleJson() {
        const sampleData = [
            {
                "username": "john_doe",
                "agentId": "AGT-50345a8fdb40c313",
                "modelName": "gpt-4",
                "tokensToAdd": 100
            },
            {
                "username": "jane_smith", 
                "agentId": "AGT-7b9e2f1a8d6c4e5f",
                "modelName": "claude-3-sonnet",
                "tokensToAdd": 50
            },
            {
                "username": "bob_wilson",
                "agentId": "AGT-1a2b3c4d5e6f7g8h",
                "modelName": "gemini-pro",
                "tokensToAdd": -25
            }
        ];
        
        this.setJsonData(sampleData);
        this.showJsonValidation('Sample JSON data loaded. You can modify this template for your needs.', 'success');
    }
    
    exportCurrentBulkData() {
        if (typeof tokenBulkHandler !== 'undefined') {
            const bulkData = tokenBulkHandler.getBulkFormData();
            if (bulkData && bulkData.length > 0) {
                this.setJsonData(bulkData);
                this.showJsonValidation(`Exported ${bulkData.length} users from manual entry to JSON format.`, 'success');
            } else {
                this.showJsonValidation('No bulk user data found to export.', 'error');
            }
        }
    }
    
    importToManualEntry() {
        const jsonData = this.getJsonData();
        if (!jsonData || !Array.isArray(jsonData)) {
            this.showJsonValidation('Please enter valid JSON data before importing.', 'error');
            return;
        }
        
        if (!this.validateJsonData()) {
            return;
        }
        
        // Switch to manual entry mode
        if (typeof tokenAllocationCore !== 'undefined') {
            tokenAllocationCore.switchBulkMethod('manual');
        }
        
        // Clear existing entries
        if (typeof tokenBulkHandler !== 'undefined') {
            tokenBulkHandler.clearAllBulkUsers();
        }
        
        // Add each user to manual entry
        jsonData.forEach((userData, index) => {
            if (typeof tokenBulkHandler !== 'undefined') {
                tokenBulkHandler.addBulkUser();
                
                // Fill in the data
                const userCount = tokenAllocationCore ? 
                    tokenAllocationCore.getBulkUserCount() : 
                    (window.bulkUserCount || index + 1);
                    
                setTimeout(() => {
                    document.getElementById(`bulk-username-${userCount}`)?.setAttribute('value', userData.username || '');
                    document.getElementById(`bulk-agentid-${userCount}`)?.setAttribute('value', userData.agentId || '');
                    document.getElementById(`bulk-modelname-${userCount}`)?.setAttribute('value', userData.modelName || '');
                    document.getElementById(`bulk-tokens-${userCount}`)?.setAttribute('value', userData.tokensToAdd || 0);
                }, 100 * (index + 1));
            }
        });
        
        this.showJsonValidation(`Successfully imported ${jsonData.length} users to manual entry mode.`, 'success');
    }
}

// Initialize JSON handler
let tokenJsonHandler;
document.addEventListener('DOMContentLoaded', () => {
    tokenJsonHandler = new TokenJsonHandler();
});

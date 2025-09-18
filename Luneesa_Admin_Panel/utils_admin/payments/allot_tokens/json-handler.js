/**
 * Token Allocation System - JSON Handler
 * Handles JSON import/export and validation functionality
 */

class TokenJsonHandler {
    constructor() {
        this.init();
    }
    
    init() {
        this.bindJsonEvents();
    }
    
    bindJsonEvents() {
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
        resultDiv.style.display = 'block';
        resultDiv.className = `json-validation-result ${type}`;
        resultDiv.innerHTML = message;
    }
    
    hideJsonValidation() {
        const resultDiv = document.getElementById('jsonValidationResult');
        resultDiv.style.display = 'none';
    }
    
    generateSampleJson() {
        const sampleData = [
            {
                "username": "john_doe",
                "agentId": "USER123AGENT789ABC01",
                "modelName": "gpt-4",
                "tokensToAdd": 100
            },
            {
                "username": "jane_smith",
                "agentId": "USER456AGENT789DEF02",
                "modelName": "claude-3-sonnet",
                "tokensToAdd": -50
            },
            {
                "username": "mike_johnson",
                "agentId": "USER789AGENT789GHI03",
                "modelName": "gemini-pro",
                "tokensToAdd": 200
            }
        ];
        
        const textarea = document.getElementById('jsonImportData');
        if (textarea) {
            textarea.value = JSON.stringify(sampleData, null, 2);
            this.validateJsonData();
        }
    }
    
    exportToJson(data, filename = 'token-allocation-export') {
        try {
            const jsonStr = JSON.stringify(data, null, 2);
            const blob = new Blob([jsonStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = `${filename}-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            
            return true;
        } catch (error) {
            console.error('JSON export error:', error);
            return false;
        }
    }
    
    importFromJson(file) {
        return new Promise((resolve, reject) => {
            if (!file || file.type !== 'application/json') {
                reject(new Error('Please select a valid JSON file'));
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    resolve(data);
                } catch (error) {
                    reject(new Error('Invalid JSON file format'));
                }
            };
            reader.onerror = () => reject(new Error('Error reading file'));
            reader.readAsText(file);
        });
    }
}

// Initialize JSON handler
let tokenJsonHandler;
document.addEventListener('DOMContentLoaded', () => {
    tokenJsonHandler = new TokenJsonHandler();
});

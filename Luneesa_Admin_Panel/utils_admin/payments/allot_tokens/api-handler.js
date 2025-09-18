/**
 * Token Allocation System - API Handler
 * Handles all API communications for token allocation operations
 */

class TokenAPIHandler {
    constructor() {
        this.mockMode = false; // Set to true for testing without backend
    }
    
    async allocateTokens(endpoint, formData) {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.getAuthToken()}`
            },
            credentials: 'include',
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        console.log(result);
        
        return {
            success: response.ok && result.success,
            data: result.data,
            message: result.message,
            error: result.error
        };
    }
    
    async allocateBulkTokens(endpoint, bulkData) {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.getAuthToken()}`
            },
            credentials: 'include',
            body: JSON.stringify({ usernames: bulkData })
        });
        
        const result = await response.json();
        console.log(result);
        
        return {
            success: response.ok && result.success,
            results: result.results,
            error: result.error
        };
    }
    
    async previewBulkAllocation(bulkData) {
        if (this.mockMode) {
            return this.mockResponse('preview', { usernames: bulkData });
        }
        
        // In a real implementation, you might have a preview endpoint
        // For now, we'll create a local preview
        return {
            success: true,
            preview: bulkData.map(user => ({
                username: user.username,
                modelName: user.modelName,
                tokensToChange: user.tokensToAdd
            }))
        };
    }
    
    mockResponse(type, data) {
        // Mock responses for testing
        if (type === 'preview') {
            return Promise.resolve({
                success: true,
                preview: data.usernames.map(user => ({
                    username: user.username,
                    modelName: user.modelName,
                    tokensToChange: user.tokensToAdd
                }))
            });
        }
        
        return Promise.resolve({
            success: true,
            message: 'Mock response'
        });
    }
    
    getAuthToken() {
        // Try to get token from cookie first
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const [name, value] = cookie.trim().split('=');
            if (name === 'authToken') {
                return value;
            }
        }
        
        // Try to get token from localStorage as fallback
        return localStorage.getItem('authToken') || '';
    }
}

// Initialize API handler
let tokenAPI;
document.addEventListener('DOMContentLoaded', () => {
    tokenAPI = new TokenAPIHandler();
});

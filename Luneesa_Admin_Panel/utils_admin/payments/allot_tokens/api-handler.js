/**
 * Token Allocation API Service
 * Handles all API communications for token allocation
 */

class TokenAllocationAPI {
    constructor() {
        this.baseURL = ''; // Adjust this to your API base URL
        this.endpoints = {
            allotTokens: '/admin/allot_tokens_to_agents'
        };
    }

    /**
     * Get authentication token from cookies or localStorage
     */
    getAuthToken() {
        // Try to get from cookies first (as per your auth middleware)
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const [name, value] = cookie.trim().split('=');
            if (name === 'authToken') {
                return value;
            }
        }
        
        // Fallback to localStorage if needed
        return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    }

    /**
     * Make authenticated API request
     */
    async makeRequest(url, options = {}) {
        const token = this.getAuthToken();
        
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` })
            },
            credentials: 'include' // Include cookies for authentication
        };

        const finalOptions = {
            ...defaultOptions,
            ...options,
            headers: {
                ...defaultOptions.headers,
                ...options.headers
            }
        };

        try {
            const response = await fetch(url, finalOptions);
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ 
                    error: `HTTP ${response.status}: ${response.statusText}` 
                }));
                throw new Error(errorData.error || `Request failed with status ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API Request Error:', error);
            throw error;
        }
    }

    /**
     * Allocate tokens to a single agent
     */
    async allocateTokensSingle(data) {
        const { username, agentId, modelName, tokensToAdd } = data;
        
        console.log('🚀 Sending single allocation request:', { username, agentId, modelName, tokensToAdd });
        
        const response = await this.makeRequest(this.endpoints.allotTokens, {
            method: 'POST',
            body: JSON.stringify({
                username,
                agentId,
                modelName,
                tokensToAdd: parseInt(tokensToAdd)
            })
        });

        console.log('✅ Single allocation response:', response);
        return response;
    }

    /**
     * Allocate tokens to multiple agents (bulk)
     */
    async allocateTokensBulk(usersData) {
        console.log('🚀 Sending bulk allocation request:', usersData);
        
        // Convert tokensToAdd to integers and ensure proper structure
        const processedData = usersData.map(user => ({
            username: user.username,
            agentId: user.agentId,
            modelName: user.modelName,
            tokensToAdd: parseInt(user.tokensToAdd)
        }));

        try {
            const response = await this.makeRequest(this.endpoints.allotTokens, {
                method: 'POST',
                body: JSON.stringify({
                    usernames: processedData
                })
            });

            console.log('✅ Bulk allocation response:', response);
            
            // Transform response to include individual results
            if (response.success === false) {
                // If bulk request failed, mark all entries as failed
                const results = processedData.map(user => ({
                    ...user,
                    success: false,
                    error: response.error || 'Unknown error occurred',
                    message: response.error || 'Allocation failed'
                }));
                
                return {
                    success: false,
                    results,
                    error: response.error
                };
            }
            
            // If successful, process individual results
            const results = processedData.map((user, index) => {
                const individualResult = response.results?.[index] || response;
                return {
                    ...user,
                    success: individualResult.success !== false,
                    message: individualResult.message || 'Allocation completed successfully',
                    error: individualResult.error || null
                };
            });
            
            return {
                success: true,
                results,
                message: response.message
            };
            
        } catch (error) {
            console.error('❌ Bulk allocation error:', error);
            
            // Create failed results for all entries
            const results = processedData.map(user => ({
                ...user,
                success: false,
                error: error.message || 'Network or server error',
                message: error.message || 'Failed to allocate tokens'
            }));
            
            return {
                success: false,
                results,
                error: error.message
            };
        }
    }

    /**
     * Validate JSON data for bulk import
     */
    validateBulkJSON(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            
            if (!Array.isArray(data)) {
                throw new Error('JSON must be an array of user objects');
            }

            if (data.length === 0) {
                throw new Error('Array cannot be empty');
            }

            // Validate each entry
            const errors = [];
            data.forEach((entry, index) => {
                const required = ['username', 'agentId', 'modelName', 'tokensToAdd'];
                const missing = required.filter(field => !entry.hasOwnProperty(field) || entry[field] === '');
                
                if (missing.length > 0) {
                    errors.push(`Entry ${index + 1}: Missing required fields: ${missing.join(', ')}`);
                }

                if (entry.tokensToAdd !== undefined && (!Number.isInteger(entry.tokensToAdd) || entry.tokensToAdd === 0)) {
                    errors.push(`Entry ${index + 1}: tokensToAdd must be a non-zero integer`);
                }
            });

            if (errors.length > 0) {
                throw new Error(errors.join('\n'));
            }

            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
}

// Create global instance
window.tokenAPI = new TokenAllocationAPI();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TokenAllocationAPI;
}
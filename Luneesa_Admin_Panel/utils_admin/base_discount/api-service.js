// API service for Base Discount Slab operations
// Connects to backend endpoints: /admin/base_discount

/**
 * API Service for Base Discount Slab operations
 * Handles authentication and API calls to the backend
 */
class BaseDiscountAPI {
    constructor() {
        this.baseURL = '/admin/base_discount';
        this.authToken = this.getAuthToken();
    }

    /**
     * Get authentication token from cookies or localStorage
     */
    getAuthToken() {
        // Try to get token from cookies first
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const [name, value] = cookie.trim().split('=');
            if (name === 'authToken') {
                return value;
            }
        }
        
        // Fallback to localStorage if needed
        return localStorage.getItem('authToken') || null;
    }

    /**
     * Get headers for API requests
     */
    getHeaders() {
        const headers = {
            'Content-Type': 'application/json',
        };

        if (this.authToken) {
            headers['Authorization'] = `Bearer ${this.authToken}`;
        }

        return headers;
    }

    /**
     * Handle API response
     */
    async handleResponse(response) {
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || `HTTP error! status: ${response.status}`);
        }

        return data;
    }

    /**
     * Add or create new base discount slab
     * @param {Object} discountData - The discount slab data
     * @returns {Promise<Object>} API response
     */
    async addBaseDiscountSlab(discountData) {
        try {
            console.log('🚀 Adding/Creating base discount slab:', discountData);
            
            const response = await fetch(`${this.baseURL}?action=add`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify({
                    data: discountData
                })
            });

            const result = await this.handleResponse(response);
            console.log('✅ Successfully added base discount slab:', result);
            
            return result;
        } catch (error) {
            console.error('❌ Error adding base discount slab:', error);
            throw error;
        }
    }

    /**
     * Update existing base discount slab
     * @param {Object} discountData - The discount slab data
     * @param {string} status - Status (active/inactive)
     * @returns {Promise<Object>} API response
     */
    async updateBaseDiscountSlab(discountData, status = 'active') {
        try {
            console.log('🚀 Updating base discount slab:', { discountData, status });
            
            const response = await fetch(`${this.baseURL}?action=update`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify({
                    data: discountData,
                    status: status
                })
            });

            const result = await this.handleResponse(response);
            console.log('✅ Successfully updated base discount slab:', result);
            
            return result;
        } catch (error) {
            console.error('❌ Error updating base discount slab:', error);
            throw error;
        }
    }

    /**
     * Delete a specific discount level by index
     * @param {number} index - Index of the level to delete
     * @returns {Promise<Object>} API response
     */
    async deleteDiscountLevel(index) {
        const numericIndex = parseInt(index);
        if (isNaN(numericIndex) || numericIndex < 0) {
            throw new Error(`Invalid index: ${index}`);
        }

        const response = await fetch(`${this.baseURL}?action=delete`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ index: numericIndex })
        });

        return this.handleResponse(response);
    }

    /**
     * Update only the status of the base discount slab
     * @param {string} status - Status (active/inactive)
     * @returns {Promise<Object>} API response
     */
    async updateStatus(status) {
        try {
            // First, get current data using the correct admin endpoint
            const currentData = await this.getCurrentData();
            if (!currentData || !currentData.levels) {
                throw new Error('No existing data found to update status');
            }

            console.log('🚀 Updating status to:', status);
            
            const response = await fetch(`${this.baseURL}?action=update`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify({
                    data: { levels: currentData.levels },
                    status: status
                })
            });

            const result = await this.handleResponse(response);
            console.log('✅ Successfully updated status:', result);
            
            return result;
        } catch (error) {
            console.error('❌ Error updating status:', error);
            throw error;
        }
    }

    /**
     * Get current base discount data (helper method)
     * FIXED: Use the correct admin endpoint
     */
    async getCurrentData() {
        try {
            const response = await fetch('/admin/view_base_discount', {
                method: 'POST',
                headers: this.getHeaders(),
                credentials: 'include'
            });

            const data = await response.json();
            
            if (data.success && data.data) {
                // Handle both array and object responses
                if (Array.isArray(data.data) && data.data.length > 0) {
                    return data.data[0]; // Return first discount object
                } else if (data.data && !Array.isArray(data.data)) {
                    return data.data;
                }
            }
            
            return null;
        } catch (error) {
            console.error('❌ Error fetching current data:', error);
            return null;
        }
    }
}

// Create global instance
const baseDiscountAPI = new BaseDiscountAPI();

// Export for use in other files
window.baseDiscountAPI = baseDiscountAPI;
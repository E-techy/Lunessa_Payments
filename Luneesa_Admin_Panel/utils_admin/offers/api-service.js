// API service for offer management

/**
 * Get authentication token from cookies or localStorage
 * @returns {string|null} - Auth token
 */
function getAuthToken() {
    // Try to get from cookies first
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'authToken') {
            return value;
        }
    }
    
    // Fallback to localStorage if available
    return localStorage.getItem('authToken');
}

/**
 * Make API request with authentication
 * @param {string} url - API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise<Object>} - API response
 */
async function makeAuthenticatedRequest(url, options = {}) {
    const token = getAuthToken();
    
    if (!token) {
        throw new Error('No authentication token found');
    }
    
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
    
    const mergedOptions = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options.headers
        }
    };
    
    const response = await fetch(url, mergedOptions);
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Network error' }));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }
    
    return response.json();
}

/**
 * Create a new offer
 * @param {Object} offerData - Offer data
 * @returns {Promise<Object>} - API response
 */
async function createOffer(offerData) {
    try {
        // Clean and validate the offer data
        const cleanedData = {
            title: offerData.title,
            description: offerData.description || null,
            offerCode: offerData.offerCode || null,
            discountType: offerData.discountType,
            discountValue: parseFloat(offerData.discountValue) || 0,
            offerType: offerData.offerType,
            applicableTo: Array.isArray(offerData.applicableTo) ? offerData.applicableTo : [offerData.applicableTo],
            minPurchaseAmount: (offerData.minPurchaseAmount === null || offerData.minPurchaseAmount === '' || offerData.minPurchaseAmount === undefined) ? 
                null : parseFloat(offerData.minPurchaseAmount),
            applicableProducts: Array.isArray(offerData.applicableProducts) ? offerData.applicableProducts : [offerData.applicableProducts],
            usageLimit: (offerData.usageLimit === null || offerData.usageLimit === '' || offerData.usageLimit === undefined) ? 
                null : parseInt(offerData.usageLimit),
            usageLimitPerUser: (offerData.usageLimitPerUser === null || offerData.usageLimitPerUser === '' || offerData.usageLimitPerUser === undefined) ? 
                null : parseInt(offerData.usageLimitPerUser),
            startDate: offerData.startDate instanceof Date ? offerData.startDate : new Date(offerData.startDate),
            endDate: offerData.endDate instanceof Date ? offerData.endDate : new Date(offerData.endDate),
            status: offerData.status || 'active'
        };
        
        // Only include maxDiscountAmount for percentage discounts
        if (offerData.discountType === 'percentage') {
            cleanedData.maxDiscountAmount = (offerData.maxDiscountAmount === null || offerData.maxDiscountAmount === '' || offerData.maxDiscountAmount === undefined) ? 
                null : parseFloat(offerData.maxDiscountAmount);
        }
        // For flat discounts, don't include maxDiscountAmount at all
        
        console.log('Creating offer with cleaned data:', cleanedData);
        
        const response = await makeAuthenticatedRequest('/admin/offers?action=create', {
            method: 'POST',
            body: JSON.stringify(cleanedData)
        });
        
        return response;
    } catch (error) {
        console.error('Error creating offer:', error);
        throw error;
    }
}

/**
 * Update an existing offer
 * @param {string} offerId - Offer ID
 * @param {Object} modificationData - Data to update
 * @returns {Promise<Object>} - API response
 */
async function updateOffer(offerId, modificationData) {
    try {
        // Clean and validate the modification data
        const cleanedData = {};
        
        // Handle string fields
        if (modificationData.title !== undefined) cleanedData.title = modificationData.title;
        if (modificationData.description !== undefined) cleanedData.description = modificationData.description || null;
        if (modificationData.offerCode !== undefined) cleanedData.offerCode = modificationData.offerCode || null;
        if (modificationData.discountType !== undefined) cleanedData.discountType = modificationData.discountType;
        if (modificationData.offerType !== undefined) cleanedData.offerType = modificationData.offerType;
        if (modificationData.status !== undefined) cleanedData.status = modificationData.status;
        
        // Handle numeric fields - ensure they are numbers or null
        if (modificationData.discountValue !== undefined) {
            cleanedData.discountValue = parseFloat(modificationData.discountValue) || 0;
        }
        
        // Only include maxDiscountAmount for percentage discounts
        if (modificationData.discountType === 'percentage' && modificationData.maxDiscountAmount !== undefined) {
            const val = modificationData.maxDiscountAmount;
            cleanedData.maxDiscountAmount = (val === null || val === '' || val === undefined) ? null : parseFloat(val);
        }
        // For flat discounts, don't include maxDiscountAmount at all
        
        if (modificationData.minPurchaseAmount !== undefined) {
            const val = modificationData.minPurchaseAmount;
            cleanedData.minPurchaseAmount = (val === null || val === '' || val === undefined) ? null : parseFloat(val);
        }
        if (modificationData.usageLimit !== undefined) {
            const val = modificationData.usageLimit;
            cleanedData.usageLimit = (val === null || val === '' || val === undefined) ? null : parseInt(val);
        }
        if (modificationData.usageLimitPerUser !== undefined) {
            const val = modificationData.usageLimitPerUser;
            cleanedData.usageLimitPerUser = (val === null || val === '' || val === undefined) ? null : parseInt(val);
        }
        if (modificationData.globalUsedCount !== undefined) {
            cleanedData.globalUsedCount = parseInt(modificationData.globalUsedCount) || 0;
        }
        
        // Handle array fields
        if (modificationData.applicableTo !== undefined) {
            cleanedData.applicableTo = Array.isArray(modificationData.applicableTo) ? 
                modificationData.applicableTo : [modificationData.applicableTo];
        }
        if (modificationData.applicableProducts !== undefined) {
            cleanedData.applicableProducts = Array.isArray(modificationData.applicableProducts) ? 
                modificationData.applicableProducts : [modificationData.applicableProducts];
        }
        
        // Handle date fields
        if (modificationData.startDate !== undefined) {
            cleanedData.startDate = modificationData.startDate instanceof Date ? 
                modificationData.startDate : new Date(modificationData.startDate);
        }
        if (modificationData.endDate !== undefined) {
            cleanedData.endDate = modificationData.endDate instanceof Date ? 
                modificationData.endDate : new Date(modificationData.endDate);
        }
        
        const requestData = {
            offerId: offerId,
            modificationData: cleanedData
        };
        
        console.log('Updating offer with cleaned data:', requestData);
        
        const response = await makeAuthenticatedRequest('/admin/offers?action=modify', {
            method: 'POST',
            body: JSON.stringify(requestData)
        });
        
        return response;
    } catch (error) {
        console.error('Error updating offer:', error);
        throw error;
    }
}

/**
 * Delete an offer
 * @param {string} offerId - Offer ID
 * @returns {Promise<Object>} - API response
 */
async function deleteOffer(offerId) {
    try {
        // FIXED: Ensure offerId is always a string
        const stringOfferId = String(offerId);
        const requestData = { offerId: stringOfferId };
        
        console.log('API deleteOffer - Original offerId type:', typeof offerId);
        console.log('API deleteOffer - Original offerId value:', offerId);
        console.log('API deleteOffer - Converted offerId type:', typeof stringOfferId);
        console.log('API deleteOffer - Converted offerId value:', stringOfferId);
        console.log('API deleteOffer - Request data:', requestData);
        console.log('API deleteOffer - JSON stringified:', JSON.stringify(requestData));
        
        const response = await makeAuthenticatedRequest('/admin/offers?action=delete', {
            method: 'POST',
            body: JSON.stringify(requestData)
        });
        
        return response;
    } catch (error) {
        console.error('Error deleting offer:', error);
        throw error;
    }
}

/**
 * Get all offers
 * @returns {Promise<Object>} - API response with offers data
 */
async function getAllOffers() {
    try {
        console.log('Fetching all offers');
        
        const response = await makeAuthenticatedRequest('/admin/offers?action=get', {
            method: 'POST'
        });
        
        return response;
    } catch (error) {
        console.error('Error fetching offers:', error);
        throw error;
    }
}

/**
 * Show notification to user
 * @param {string} message - Notification message
 * @param {string} type - Notification type ('success', 'error', 'warning')
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-times-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles if not already added
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 12px 20px;
                border-radius: 6px;
                color: white;
                font-weight: 500;
                z-index: 10000;
                min-width: 300px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                animation: slideInRight 0.3s ease-out;
            }
            
            .notification-success { background-color: #10b981; }
            .notification-error { background-color: #ef4444; }
            .notification-warning { background-color: #f59e0b; }
            .notification-info { background-color: #3b82f6; }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease-out reverse';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

/**
 * Show loading state
 * @param {boolean} isLoading - Whether to show loading
 * @param {string} elementId - ID of button to show loading on
 */
function showLoadingState(isLoading, elementId) {
    const button = document.getElementById(elementId);
    if (!button) return;
    
    if (isLoading) {
        button.disabled = true;
        button.dataset.originalContent = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    } else {
        button.disabled = false;
        if (button.dataset.originalContent) {
            button.innerHTML = button.dataset.originalContent;
            delete button.dataset.originalContent;
        }
    }
}
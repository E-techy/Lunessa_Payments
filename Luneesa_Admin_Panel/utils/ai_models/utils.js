// AI Models Utility Functions

// Format currency as USD
function formatCurrency(amount) {
    if (amount === null || amount === undefined) return 'N/A';
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 6
    }).format(amount);
}

// Parse currency input (remove $ and convert to number)
function parseCurrency(value) {
    if (typeof value === 'string') {
        return parseFloat(value.replace(/[$,]/g, '')) || 0;
    }
    return parseFloat(value) || 0;
}

// Format price for display
function formatAiPrice(price) {
    if (price < 0.001) {
        return price.toFixed(6);
    } else if (price < 1) {
        return price.toFixed(4);
    } else {
        return price.toFixed(3);
    }
}

// Format date for display
function formatAiDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
    });
}

// Format datetime for input fields
function formatDateTimeForInput(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

// Get provider badge class
function getProviderBadgeClass(provider) {
    switch(provider.toLowerCase()) {
        case 'openai':
            return 'openai';
        case 'anthropic':
            return 'anthropic';
        case 'google':
            return 'google';
        default:
            return 'openai';
    }
}

// Check if model is available
function isModelAvailable(availableTill) {
    const now = new Date();
    const tillDate = new Date(availableTill);
    return tillDate > now;
}

// Validate AI model form data
function validateAiModelForm(formData) {
    const errors = {};
    
    if (!formData.modelName || formData.modelName.trim() === '') {
        errors.modelName = 'Model name is required';
    }
    
    if (!formData.provider || formData.provider.trim() === '') {
        errors.provider = 'Provider is required';
    }
    
    if (!formData.pricePerToken || formData.pricePerToken <= 0) {
        errors.pricePerToken = 'Valid price per token is required';
    }
    
    if (!formData.availableTill) {
        errors.availableTill = 'Available till date is required';
    } else {
        const tillDate = new Date(formData.availableTill);
        const now = new Date();
        if (tillDate <= now) {
            errors.availableTill = 'Available till date must be in the future';
        }
    }
    
    return errors;
}

// Show notification
function showAiNotification(message, type = 'success') {
    // Create notification element if it doesn't exist
    let notification = document.getElementById('ai-notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'ai-notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 24px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        document.body.appendChild(notification);
    }
    
    // Set notification style based on type
    let backgroundColor;
    switch(type) {
        case 'success':
            backgroundColor = '#059669';
            break;
        case 'error':
            backgroundColor = '#DC2626';
            break;
        case 'warning':
            backgroundColor = '#D97706';
            break;
        default:
            backgroundColor = '#059669';
    }
    
    notification.style.backgroundColor = backgroundColor;
    notification.textContent = message;
    
    // Show notification
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
    }, 3000);
}

// Debounce function for search
function debounce(func, wait) {
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

// Utility functions for DOM manipulation and notifications

/**
 * Show notification to user
 * @param {string} message - The message to display
 * @param {string} type - The type of notification (info, success, warning, error)
 */
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Auto remove after configured duration
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, APP_CONFIG.NOTIFICATION_DURATION);
}

/**
 * Get current date formatted for display
 * @returns {string} Formatted date string
 */
function getCurrentFormattedDate() {
    return new Date().toLocaleDateString('en-GB', APP_CONFIG.DATE_FORMAT);
}

/**
 * Validate numeric input
 * @param {HTMLInputElement} input - The input element to validate
 * @returns {boolean} True if valid
 */
function validateNumericInput(input) {
    const value = parseFloat(input.value);
    return !isNaN(value) && value >= 0 && input.value.trim() !== '';
}

/**
 * Create input element with specified attributes
 * @param {string} type - Input type
 * @param {string} className - CSS class name
 * @param {string} value - Initial value
 * @param {object} attributes - Additional attributes
 * @returns {HTMLInputElement} Created input element
 */
function createInputElement(type, className, value, attributes = {}) {
    const input = document.createElement('input');
    input.type = type;
    input.className = className;
    input.value = value;
    
    Object.keys(attributes).forEach(attr => {
        input.setAttribute(attr, attributes[attr]);
    });
    
    return input;
}

/**
 * Create select element with options
 * @param {string} className - CSS class name
 * @param {Array} options - Array of option objects {value, text, selected}
 * @returns {HTMLSelectElement} Created select element
 */
function createSelectElement(className, options) {
    const select = document.createElement('select');
    select.className = className;
    
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.value;
        optionElement.textContent = option.text;
        if (option.selected) {
            optionElement.selected = true;
        }
        select.appendChild(optionElement);
    });
    
    return select;
}

// Make functions globally accessible
window.showNotification = showNotification;
window.getCurrentFormattedDate = getCurrentFormattedDate;
window.validateNumericInput = validateNumericInput;
window.createInputElement = createInputElement;
window.createSelectElement = createSelectElement;

/**
 * Token Allocation System - Notification Handler
 * Handles all notification and toast messages
 */

class TokenNotificationHandler {
    constructor() {
        this.notifications = [];
        this.maxNotifications = 5;
        this.defaultDuration = 5000; // 5 seconds
        
        this.init();
    }
    
    init() {
        this.createNotificationContainer();
        this.addNotificationStyles();
    }
    
    createNotificationContainer() {
        // Check if container already exists
        if (document.getElementById('token-notification-container')) {
            return;
        }
        
        const container = document.createElement('div');
        container.id = 'token-notification-container';
        container.className = 'token-notification-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            pointer-events: none;
            max-width: 400px;
        `;
        
        document.body.appendChild(container);
    }
    
    showNotification(message, type = 'info', duration = null) {
        const notificationId = this.generateId();
        const notification = this.createNotificationElement(notificationId, message, type);
        
        // Manage notification count
        if (this.notifications.length >= this.maxNotifications) {
            this.removeOldestNotification();
        }
        
        // Add to container
        const container = document.getElementById('token-notification-container');
        container.appendChild(notification);
        
        // Add to tracking array
        this.notifications.push({
            id: notificationId,
            element: notification,
            timestamp: Date.now()
        });
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('notification-show');
        }, 10);
        
        // Auto remove
        const autoRemoveDuration = duration || this.defaultDuration;
        setTimeout(() => {
            this.removeNotification(notificationId);
        }, autoRemoveDuration);
        
        return notificationId;
    }
    
    createNotificationElement(id, message, type) {
        const notification = document.createElement('div');
        notification.id = `notification-${id}`;
        notification.className = `token-notification token-notification-${type}`;
        
        const config = this.getTypeConfig(type);
        
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">
                    <i class="fas ${config.icon}"></i>
                </div>
                <div class="notification-message">
                    ${this.formatMessage(message)}
                </div>
                <button class="notification-close" onclick="tokenNotificationHandler.removeNotification('${id}')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        notification.style.cssText = `
            background-color: ${config.backgroundColor};
            color: ${config.textColor};
            border-left: 4px solid ${config.borderColor};
        `;
        
        return notification;
    }
    
    getTypeConfig(type) {
        const configs = {
            success: {
                icon: 'fa-check-circle',
                backgroundColor: '#10B981',
                textColor: '#FFFFFF',
                borderColor: '#059669'
            },
            error: {
                icon: 'fa-exclamation-circle',
                backgroundColor: '#EF4444',
                textColor: '#FFFFFF',
                borderColor: '#DC2626'
            },
            warning: {
                icon: 'fa-exclamation-triangle',
                backgroundColor: '#F59E0B',
                textColor: '#FFFFFF',
                borderColor: '#D97706'
            },
            info: {
                icon: 'fa-info-circle',
                backgroundColor: '#3B82F6',
                textColor: '#FFFFFF',
                borderColor: '#2563EB'
            }
        };
        
        return configs[type] || configs.info;
    }
    
    formatMessage(message) {
        if (typeof message !== 'string') {
            message = String(message);
        }
        
        // Convert newlines to <br> tags
        message = message.replace(/\n/g, '<br>');
        
        // Escape HTML to prevent XSS (but allow <br> tags)
        const div = document.createElement('div');
        div.textContent = message;
        let escapedMessage = div.innerHTML;
        escapedMessage = escapedMessage.replace(/&lt;br&gt;/g, '<br>');
        
        return escapedMessage;
    }
    
    removeNotification(id) {
        const notification = document.getElementById(`notification-${id}`);
        if (!notification) return;
        
        // Animate out
        notification.classList.add('notification-hide');
        
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
            
            // Remove from tracking array
            this.notifications = this.notifications.filter(n => n.id !== id);
        }, 300);
    }
    
    removeOldestNotification() {
        if (this.notifications.length === 0) return;
        
        const oldest = this.notifications[0];
        this.removeNotification(oldest.id);
    }
    
    clearAllNotifications() {
        this.notifications.forEach(notification => {
            this.removeNotification(notification.id);
        });
    }
    
    generateId() {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
    
    addNotificationStyles() {
        // Check if styles already added
        if (document.getElementById('token-notification-styles')) {
            return;
        }
        
        const style = document.createElement('style');
        style.id = 'token-notification-styles';
        style.textContent = `
            .token-notification {
                margin-bottom: 10px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                font-size: 14px;
                line-height: 1.4;
                pointer-events: auto;
                transform: translateX(100%);
                opacity: 0;
                transition: all 0.3s ease-out;
                max-width: 100%;
            }
            
            .token-notification.notification-show {
                transform: translateX(0);
                opacity: 1;
            }
            
            .token-notification.notification-hide {
                transform: translateX(100%);
                opacity: 0;
                transition: all 0.3s ease-in;
            }
            
            .notification-content {
                display: flex;
                align-items: flex-start;
                padding: 16px;
                gap: 12px;
            }
            
            .notification-icon {
                flex-shrink: 0;
                font-size: 18px;
                margin-top: 2px;
            }
            
            .notification-message {
                flex: 1;
                word-wrap: break-word;
                overflow-wrap: break-word;
            }
            
            .notification-close {
                flex-shrink: 0;
                background: none;
                border: none;
                color: inherit;
                cursor: pointer;
                padding: 4px;
                border-radius: 4px;
                font-size: 16px;
                opacity: 0.7;
                transition: all 0.2s ease;
                margin-top: -2px;
            }
            
            .notification-close:hover {
                opacity: 1;
                background-color: rgba(255, 255, 255, 0.1);
            }
            
            .notification-close:active {
                transform: scale(0.95);
            }
            
            /* Animation keyframes */
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
            
            @keyframes slideOutRight {
                from { 
                    transform: translateX(0); 
                    opacity: 1; 
                }
                to { 
                    transform: translateX(100%); 
                    opacity: 0; 
                }
            }
            
            /* Responsive design */
            @media (max-width: 480px) {
                .token-notification-container {
                    top: 10px;
                    right: 10px;
                    left: 10px;
                    max-width: none;
                }
                
                .notification-content {
                    padding: 12px;
                    gap: 8px;
                }
                
                .notification-icon {
                    font-size: 16px;
                }
                
                .token-notification {
                    font-size: 13px;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
    
    // Utility methods for common notification patterns
    showSuccess(message, duration = null) {
        return this.showNotification(message, 'success', duration);
    }
    
    showError(message, duration = 8000) { // Errors stay longer
        return this.showNotification(message, 'error', duration);
    }
    
    showWarning(message, duration = 6000) {
        return this.showNotification(message, 'warning', duration);
    }
    
    showInfo(message, duration = null) {
        return this.showNotification(message, 'info', duration);
    }
    
    // Progress notification for long operations
    showProgress(message) {
        const id = this.generateId();
        const notification = this.createProgressNotification(id, message);
        
        const container = document.getElementById('token-notification-container');
        container.appendChild(notification);
        
        this.notifications.push({
            id: id,
            element: notification,
            timestamp: Date.now(),
            type: 'progress'
        });
        
        setTimeout(() => {
            notification.classList.add('notification-show');
        }, 10);
        
        return id;
    }
    
    createProgressNotification(id, message) {
        const notification = document.createElement('div');
        notification.id = `notification-${id}`;
        notification.className = 'token-notification token-notification-progress';
        
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">
                    <i class="fas fa-spinner fa-spin"></i>
                </div>
                <div class="notification-message">${this.formatMessage(message)}</div>
            </div>
        `;
        
        notification.style.cssText = `
            background-color: #6366F1;
            color: #FFFFFF;
            border-left: 4px solid #4F46E5;
        `;
        
        return notification;
    }
    
    updateProgress(id, message) {
        const notification = document.getElementById(`notification-${id}`);
        if (notification) {
            const messageElement = notification.querySelector('.notification-message');
            if (messageElement) {
                messageElement.innerHTML = this.formatMessage(message);
            }
        }
    }
    
    completeProgress(id, message, type = 'success') {
        const notification = document.getElementById(`notification-${id}`);
        if (notification) {
            const config = this.getTypeConfig(type);
            
            // Update icon
            const iconElement = notification.querySelector('.notification-icon i');
            if (iconElement) {
                iconElement.className = `fas ${config.icon}`;
            }
            
            // Update message
            const messageElement = notification.querySelector('.notification-message');
            if (messageElement) {
                messageElement.innerHTML = this.formatMessage(message);
            }
            
            // Update styles
            notification.style.cssText = `
                background-color: ${config.backgroundColor};
                color: ${config.textColor};
                border-left: 4px solid ${config.borderColor};
            `;
            
            // Auto remove after delay
            setTimeout(() => {
                this.removeNotification(id);
            }, 3000);
        }
    }
}

// Initialize notification handler when DOM is loaded
let tokenNotificationHandler;
document.addEventListener('DOMContentLoaded', () => {
    tokenNotificationHandler = new TokenNotificationHandler();
});

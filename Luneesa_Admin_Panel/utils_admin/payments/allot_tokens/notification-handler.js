/**
 * Token Allocation System - Notification Handler Module
 * Handles system notifications, alerts, and user feedback
 */

class TokenNotificationHandler {
    constructor() {
        this.notifications = [];
        this.maxNotifications = 5;
        this.defaultDuration = 5000;
        this.init();
    }
    
    init() {
        this.createNotificationContainer();
        this.bindEvents();
    }
    
    createNotificationContainer() {
        if (!document.getElementById('token-notifications-container')) {
            const container = document.createElement('div');
            container.id = 'token-notifications-container';
            container.className = 'token-notifications-container';
            container.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                max-width: 400px;
                pointer-events: none;
            `;
            document.body.appendChild(container);
        }
    }
    
    bindEvents() {
        // Listen for keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Escape') {
                this.clearAll();
            }
        });
    }
    
    showSuccess(message, duration = this.defaultDuration) {
        return this.showNotification(message, 'success', duration);
    }
    
    showError(message, duration = 8000) {
        return this.showNotification(message, 'error', duration);
    }
    
    showWarning(message, duration = 6000) {
        return this.showNotification(message, 'warning', duration);
    }
    
    showInfo(message, duration = this.defaultDuration) {
        return this.showNotification(message, 'info', duration);
    }
    
    showNotification(message, type = 'info', duration = this.defaultDuration) {
        const notification = {
            id: this.generateId(),
            message,
            type,
            duration,
            timestamp: Date.now()
        };
        
        this.notifications.push(notification);
        this.renderNotification(notification);
        
        // Auto-dismiss after duration
        if (duration > 0) {
            setTimeout(() => {
                this.dismiss(notification.id);
            }, duration);
        }
        
        // Clean up old notifications if too many
        this.cleanupNotifications();
        
        return notification.id;
    }
    
    renderNotification(notification) {
        const container = document.getElementById('token-notifications-container');
        if (!container) return;
        
        const notificationElement = document.createElement('div');
        notificationElement.id = `notification-${notification.id}`;
        notificationElement.className = `token-notification ${notification.type}`;
        notificationElement.style.cssText = `
            background: white;
            border: 1px solid #e5e7eb;
            border-left: 4px solid ${this.getTypeColor(notification.type)};
            border-radius: 6px;
            padding: 16px;
            margin-bottom: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            pointer-events: auto;
            transform: translateX(100%);
            transition: all 0.3s ease;
            max-width: 100%;
            word-wrap: break-word;
        `;
        
        notificationElement.innerHTML = `
            <div class="token-notification-content">
                <div class="token-notification-header">
                    <span class="token-notification-icon">
                        ${this.getTypeIcon(notification.type)}
                    </span>
                    <span class="token-notification-type">
                        ${notification.type.toUpperCase()}
                    </span>
                    <button class="token-notification-close" onclick="tokenNotificationHandler.dismiss('${notification.id}')">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="token-notification-message">
                    ${this.escapeHtml(notification.message)}
                </div>
                <div class="token-notification-time">
                    ${new Date(notification.timestamp).toLocaleTimeString()}
                </div>
            </div>
        `;
        
        container.appendChild(notificationElement);
        
        // Trigger animation
        setTimeout(() => {
            notificationElement.style.transform = 'translateX(0)';
        }, 10);
        
        // Add hover effects
        notificationElement.addEventListener('mouseenter', () => {
            notificationElement.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        });
        
        notificationElement.addEventListener('mouseleave', () => {
            notificationElement.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    }
    
    dismiss(notificationId) {
        const element = document.getElementById(`notification-${notificationId}`);
        if (element) {
            element.style.transform = 'translateX(100%)';
            element.style.opacity = '0';
            
            setTimeout(() => {
                if (element.parentNode) {
                    element.parentNode.removeChild(element);
                }
            }, 300);
        }
        
        // Remove from notifications array
        this.notifications = this.notifications.filter(n => n.id !== notificationId);
    }
    
    clearAll() {
        this.notifications.forEach(notification => {
            this.dismiss(notification.id);
        });
        this.notifications = [];
    }
    
    getTypeColor(type) {
        const colors = {
            success: '#10B981',
            error: '#EF4444',
            warning: '#F59E0B',
            info: '#3B82F6'
        };
        return colors[type] || colors.info;
    }
    
    getTypeIcon(type) {
        const icons = {
            success: '<i class="fas fa-check-circle" style="color: #10B981;"></i>',
            error: '<i class="fas fa-exclamation-circle" style="color: #EF4444;"></i>',
            warning: '<i class="fas fa-exclamation-triangle" style="color: #F59E0B;"></i>',
            info: '<i class="fas fa-info-circle" style="color: #3B82F6;"></i>'
        };
        return icons[type] || icons.info;
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    generateId() {
        return 'notif_' + Math.random().toString(36).substr(2, 9);
    }
    
    cleanupNotifications() {
        if (this.notifications.length > this.maxNotifications) {
            const oldestNotifications = this.notifications
                .sort((a, b) => a.timestamp - b.timestamp)
                .slice(0, this.notifications.length - this.maxNotifications);
                
            oldestNotifications.forEach(notification => {
                this.dismiss(notification.id);
            });
        }
    }
    
    // Advanced notification methods
    showProgress(message, progress = 0) {
        const notificationId = this.showNotification(message, 'info', 0); // No auto-dismiss
        this.updateProgress(notificationId, progress);
        return notificationId;
    }
    
    updateProgress(notificationId, progress) {
        const element = document.getElementById(`notification-${notificationId}`);
        if (element) {
            let progressBar = element.querySelector('.progress-bar');
            if (!progressBar) {
                progressBar = document.createElement('div');
                progressBar.className = 'progress-bar';
                progressBar.style.cssText = `
                    width: 100%;
                    height: 4px;
                    background: #e5e7eb;
                    border-radius: 2px;
                    margin-top: 8px;
                    overflow: hidden;
                `;
                
                const progressFill = document.createElement('div');
                progressFill.className = 'progress-fill';
                progressFill.style.cssText = `
                    height: 100%;
                    background: #3B82F6;
                    transition: width 0.3s ease;
                    width: 0%;
                `;
                
                progressBar.appendChild(progressFill);
                element.querySelector('.token-notification-content').appendChild(progressBar);
            }
            
            const progressFill = progressBar.querySelector('.progress-fill');
            if (progressFill) {
                progressFill.style.width = `${Math.min(Math.max(progress, 0), 100)}%`;
            }
        }
    }
    
    showLoading(message) {
        const notificationId = this.generateId();
        const container = document.getElementById('token-notifications-container');
        if (!container) return;
        
        const notificationElement = document.createElement('div');
        notificationElement.id = `notification-${notificationId}`;
        notificationElement.className = 'token-notification loading';
        notificationElement.style.cssText = `
            background: white;
            border: 1px solid #e5e7eb;
            border-left: 4px solid #3B82F6;
            border-radius: 6px;
            padding: 16px;
            margin-bottom: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            pointer-events: auto;
            transform: translateX(100%);
            transition: all 0.3s ease;
            max-width: 100%;
        `;
        
        notificationElement.innerHTML = `
            <div class="token-notification-content">
                <div class="token-notification-header">
                    <span class="token-notification-icon">
                        <i class="fas fa-spinner fa-spin" style="color: #3B82F6;"></i>
                    </span>
                    <span class="token-notification-type">LOADING</span>
                </div>
                <div class="token-notification-message">
                    ${this.escapeHtml(message)}
                </div>
            </div>
        `;
        
        container.appendChild(notificationElement);
        
        // Trigger animation
        setTimeout(() => {
            notificationElement.style.transform = 'translateX(0)';
        }, 10);
        
        return notificationId;
    }
    
    updateLoadingMessage(notificationId, newMessage) {
        const element = document.getElementById(`notification-${notificationId}`);
        if (element) {
            const messageElement = element.querySelector('.token-notification-message');
            if (messageElement) {
                messageElement.textContent = newMessage;
            }
        }
    }
    
    // Batch operations
    showBatchStart(operation, itemCount) {
        return this.showLoading(`Starting ${operation} for ${itemCount} items...`);
    }
    
    showBatchProgress(notificationId, completed, total, operation) {
        const progress = Math.round((completed / total) * 100);
        this.updateLoadingMessage(notificationId, `${operation}: ${completed}/${total} completed (${progress}%)`);
        this.updateProgress(notificationId, progress);
    }
    
    showBatchComplete(notificationId, operation, successCount, failCount) {
        this.dismiss(notificationId);
        
        if (failCount === 0) {
            this.showSuccess(`${operation} completed successfully! ${successCount} items processed.`);
        } else {
            this.showWarning(`${operation} completed with ${failCount} failures. ${successCount} items succeeded.`);
        }
    }
    
    // API response handlers
    handleApiResponse(response, operation) {
        if (response.success) {
            this.showSuccess(response.message || `${operation} completed successfully.`);
        } else {
            this.showError(response.message || `${operation} failed. Please try again.`);
        }
    }
    
    handleApiError(error, operation) {
        let message = `${operation} failed: `;
        
        if (error.response && error.response.data && error.response.data.message) {
            message += error.response.data.message;
        } else if (error.message) {
            message += error.message;
        } else {
            message += 'Unknown error occurred';
        }
        
        this.showError(message);
    }
    
    // Utility methods
    getActiveNotifications() {
        return [...this.notifications];
    }
    
    hasActiveNotifications() {
        return this.notifications.length > 0;
    }
    
    getNotificationById(id) {
        return this.notifications.find(n => n.id === id);
    }
    
    // Settings
    setDefaultDuration(duration) {
        this.defaultDuration = duration;
    }
    
    setMaxNotifications(max) {
        this.maxNotifications = max;
        this.cleanupNotifications();
    }
}

// Initialize notification handler
let tokenNotificationHandler;
document.addEventListener('DOMContentLoaded', () => {
    tokenNotificationHandler = new TokenNotificationHandler();
});

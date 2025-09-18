/**
 * Token Allocation System - Notifications
 * Handles user notifications and feedback messages
 */

class TokenNotifications {
    constructor() {
        this.notificationCounter = 0;
        this.activeNotifications = new Map();
        this.init();
    }
    
    init() {
        this.addNotificationStyles();
    }
    
    showNotification(message, type = 'info', options = {}) {
        const {
            duration = 5000,
            persistent = false,
            showClose = true,
            position = 'top-right',
            id = null
        } = options;
        
        // Check if there's an existing notification system
        if (typeof this.showToast === 'function') {
            this.showToast(message, type);
            return;
        }
        
        // Create unique ID for this notification
        const notificationId = id || `notification-${++this.notificationCounter}`;
        
        // Remove existing notification with same ID
        if (this.activeNotifications.has(notificationId)) {
            this.removeNotification(notificationId);
        }
        
        // Create notification element
        const notification = this.createNotificationElement(message, type, notificationId, showClose);
        
        // Position the notification
        this.positionNotification(notification, position);
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Store reference
        this.activeNotifications.set(notificationId, {
            element: notification,
            timer: null
        });
        
        // Auto remove after duration (unless persistent)
        if (!persistent && duration > 0) {
            const timer = setTimeout(() => {
                this.removeNotification(notificationId);
            }, duration);
            
            this.activeNotifications.get(notificationId).timer = timer;
        }
        
        // Animate in
        requestAnimationFrame(() => {
            notification.classList.add('notification-show');
        });
        
        return notificationId;
    }
    
    createNotificationElement(message, type, id, showClose) {
        const notification = document.createElement('div');
        notification.className = `token-notification token-notification-${type}`;
        notification.id = id;
        
        const iconMap = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        
        const icon = iconMap[type] || 'info-circle';
        
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">
                    <i class="fas fa-${icon}"></i>
                </div>
                <div class="notification-message">${message}</div>
                ${showClose ? `
                    <button class="notification-close" onclick="tokenNotifications.removeNotification('${id}')">
                        <i class="fas fa-times"></i>
                    </button>
                ` : ''}
            </div>
        `;
        
        return notification;
    }
    
    positionNotification(notification, position) {
        const positions = {
            'top-right': { top: '20px', right: '20px' },
            'top-left': { top: '20px', left: '20px' },
            'top-center': { top: '20px', left: '50%', transform: 'translateX(-50%)' },
            'bottom-right': { bottom: '20px', right: '20px' },
            'bottom-left': { bottom: '20px', left: '20px' },
            'bottom-center': { bottom: '20px', left: '50%', transform: 'translateX(-50%)' }
        };
        
        const pos = positions[position] || positions['top-right'];
        
        Object.assign(notification.style, {
            position: 'fixed',
            zIndex: '10000',
            maxWidth: '400px',
            ...pos
        });
    }
    
    removeNotification(id) {
        const notificationData = this.activeNotifications.get(id);
        if (!notificationData) return;
        
        const { element, timer } = notificationData;
        
        // Clear timer if exists
        if (timer) {
            clearTimeout(timer);
        }
        
        // Animate out
        element.classList.add('notification-hide');
        
        setTimeout(() => {
            if (element.parentElement) {
                element.remove();
            }
            this.activeNotifications.delete(id);
        }, 300);
    }
    
    clearAllNotifications() {
        this.activeNotifications.forEach((_, id) => {
            this.removeNotification(id);
        });
    }
    
    showSuccess(message, options = {}) {
        return this.showNotification(message, 'success', options);
    }
    
    showError(message, options = {}) {
        return this.showNotification(message, 'error', { ...options, duration: 8000 });
    }
    
    showWarning(message, options = {}) {
        return this.showNotification(message, 'warning', { ...options, duration: 6000 });
    }
    
    showInfo(message, options = {}) {
        return this.showNotification(message, 'info', options);
    }
    
    showPersistent(message, type = 'info', options = {}) {
        return this.showNotification(message, type, { ...options, persistent: true });
    }
    
    showProgressNotification(message, progress = 0) {
        const id = 'progress-notification';
        
        // Remove existing progress notification
        if (this.activeNotifications.has(id)) {
            this.removeNotification(id);
        }
        
        const notification = document.createElement('div');
        notification.className = 'token-notification token-notification-progress';
        notification.id = id;
        
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">
                    <i class="fas fa-spinner fa-spin"></i>
                </div>
                <div class="notification-message">
                    <div class="progress-text">${message}</div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progress}%"></div>
                    </div>
                    <div class="progress-percent">${Math.round(progress)}%</div>
                </div>
            </div>
        `;
        
        this.positionNotification(notification, 'top-right');
        document.body.appendChild(notification);
        
        this.activeNotifications.set(id, {
            element: notification,
            timer: null
        });
        
        requestAnimationFrame(() => {
            notification.classList.add('notification-show');
        });
        
        return id;
    }
    
    updateProgressNotification(message, progress) {
        const notification = document.getElementById('progress-notification');
        if (!notification) return;
        
        const textElement = notification.querySelector('.progress-text');
        const fillElement = notification.querySelector('.progress-fill');
        const percentElement = notification.querySelector('.progress-percent');
        
        if (textElement) textElement.textContent = message;
        if (fillElement) fillElement.style.width = `${progress}%`;
        if (percentElement) percentElement.textContent = `${Math.round(progress)}%`;
        
        // Auto-complete and remove when 100%
        if (progress >= 100) {
            setTimeout(() => {
                this.removeNotification('progress-notification');
                this.showSuccess('Operation completed successfully!');
            }, 1000);
        }
    }
    
    showConfirmation(message, onConfirm, onCancel = null) {
        const id = 'confirmation-notification';
        
        const notification = document.createElement('div');
        notification.className = 'token-notification token-notification-confirm';
        notification.id = id;
        
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">
                    <i class="fas fa-question-circle"></i>
                </div>
                <div class="notification-message">${message}</div>
                <div class="notification-actions">
                    <button class="btn-confirm" onclick="tokenNotifications.handleConfirmation('${id}', true)">
                        <i class="fas fa-check"></i> Confirm
                    </button>
                    <button class="btn-cancel" onclick="tokenNotifications.handleConfirmation('${id}', false)">
                        <i class="fas fa-times"></i> Cancel
                    </button>
                </div>
            </div>
        `;
        
        this.positionNotification(notification, 'top-center');
        document.body.appendChild(notification);
        
        this.activeNotifications.set(id, {
            element: notification,
            timer: null,
            onConfirm,
            onCancel
        });
        
        requestAnimationFrame(() => {
            notification.classList.add('notification-show');
        });
        
        return id;
    }
    
    handleConfirmation(id, confirmed) {
        const notificationData = this.activeNotifications.get(id);
        if (!notificationData) return;
        
        const { onConfirm, onCancel } = notificationData;
        
        if (confirmed && onConfirm) {
            onConfirm();
        } else if (!confirmed && onCancel) {
            onCancel();
        }
        
        this.removeNotification(id);
    }
    
    addNotificationStyles() {
        if (document.getElementById('token-notification-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'token-notification-styles';
        style.textContent = `
            .token-notification {
                background: white;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                font-size: 14px;
                line-height: 1.4;
                max-width: 400px;
                opacity: 0;
                transform: translateX(100%);
                transition: all 0.3s ease-out;
                margin-bottom: 8px;
            }
            
            .token-notification.notification-show {
                opacity: 1;
                transform: translateX(0);
            }
            
            .token-notification.notification-hide {
                opacity: 0;
                transform: translateX(100%);
            }
            
            .token-notification-success {
                border-left: 4px solid #10B981;
                background: linear-gradient(90deg, #F0FDF4 0%, #FFFFFF 100%);
            }
            
            .token-notification-error {
                border-left: 4px solid #EF4444;
                background: linear-gradient(90deg, #FEF2F2 0%, #FFFFFF 100%);
            }
            
            .token-notification-warning {
                border-left: 4px solid #F59E0B;
                background: linear-gradient(90deg, #FFFBEB 0%, #FFFFFF 100%);
            }
            
            .token-notification-info {
                border-left: 4px solid #3B82F6;
                background: linear-gradient(90deg, #EFF6FF 0%, #FFFFFF 100%);
            }
            
            .token-notification-progress {
                border-left: 4px solid #8B5CF6;
                background: linear-gradient(90deg, #F5F3FF 0%, #FFFFFF 100%);
            }
            
            .token-notification-confirm {
                border-left: 4px solid #F59E0B;
                background: linear-gradient(90deg, #FFFBEB 0%, #FFFFFF 100%);
            }
            
            .notification-content {
                display: flex;
                align-items: flex-start;
                padding: 16px;
                gap: 12px;
            }
            
            .notification-icon {
                flex-shrink: 0;
                margin-top: 2px;
            }
            
            .token-notification-success .notification-icon { color: #10B981; }
            .token-notification-error .notification-icon { color: #EF4444; }
            .token-notification-warning .notification-icon { color: #F59E0B; }
            .token-notification-info .notification-icon { color: #3B82F6; }
            .token-notification-progress .notification-icon { color: #8B5CF6; }
            .token-notification-confirm .notification-icon { color: #F59E0B; }
            
            .notification-message {
                flex: 1;
                margin-right: 8px;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: #6B7280;
                cursor: pointer;
                padding: 4px;
                border-radius: 4px;
                flex-shrink: 0;
                transition: all 0.2s ease;
            }
            
            .notification-close:hover {
                background-color: rgba(107, 114, 128, 0.1);
                color: #374151;
            }
            
            .progress-bar {
                width: 100%;
                height: 4px;
                background: #E5E7EB;
                border-radius: 2px;
                overflow: hidden;
                margin: 8px 0 4px 0;
            }
            
            .progress-fill {
                height: 100%;
                background: #8B5CF6;
                transition: width 0.3s ease;
                border-radius: 2px;
            }
            
            .progress-percent {
                font-size: 12px;
                color: #6B7280;
                text-align: right;
            }
            
            .notification-actions {
                display: flex;
                gap: 8px;
                margin-top: 8px;
            }
            
            .btn-confirm, .btn-cancel {
                padding: 6px 12px;
                border: none;
                border-radius: 4px;
                font-size: 12px;
                cursor: pointer;
                transition: all 0.2s ease;
                display: flex;
                align-items: center;
                gap: 4px;
            }
            
            .btn-confirm {
                background: #10B981;
                color: white;
            }
            
            .btn-confirm:hover {
                background: #059669;
            }
            
            .btn-cancel {
                background: #6B7280;
                color: white;
            }
            
            .btn-cancel:hover {
                background: #4B5563;
            }
            
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        
        document.head.appendChild(style);
    }
}

// Initialize notifications
let tokenNotifications;
document.addEventListener('DOMContentLoaded', () => {
    tokenNotifications = new TokenNotifications();
});

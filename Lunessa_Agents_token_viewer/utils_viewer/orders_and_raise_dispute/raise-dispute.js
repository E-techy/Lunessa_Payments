/**
 * Dispute Popup Handler
 * Handles the popup functionality for raising disputes
 */

class DisputePopupManager {
    constructor() {
        this.popup = null;
        this.overlay = null;
        this.init();
    }

    init() {
        this.createPopupHTML();
        this.attachEventListeners();
    }

    createPopupHTML() {
        // Create overlay
        this.overlay = document.createElement('div');
        this.overlay.className = 'dispute-popup-overlay';
        this.overlay.style.display = 'none';

        // Create popup container
        this.popup = document.createElement('div');
        this.popup.className = 'dispute-popup';

        // Popup HTML content
        this.popup.innerHTML = `
            <div class="dispute-popup-header">
                <h3>Raise Dispute</h3>
                <button class="dispute-popup-close" type="button">&times;</button>
            </div>
            <div class="dispute-popup-content">
                <div class="dispute-form">
                    <div class="form-group">
                        <label for="dispute-order-id">Order ID</label>
                        <input type="text" id="dispute-order-id" class="form-input" readonly>
                    </div>
                    <div class="form-group">
                        <label for="dispute-comment">Dispute Comment</label>
                        <textarea id="dispute-comment" class="form-textarea" rows="4" placeholder="Please describe your dispute in detail..."></textarea>
                    </div>
                </div>
            </div>
            <div class="dispute-popup-footer">
                <button class="btn btn-secondary" id="cancel-dispute-btn">Cancel</button>
                <button class="btn btn-primary" id="submit-dispute-btn">Submit Request</button>
            </div>
        `;

        // Add popup to overlay
        this.overlay.appendChild(this.popup);
        
        // Add overlay to body
        document.body.appendChild(this.overlay);
    }

    attachEventListeners() {
        // Listen for clicks on raise dispute buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('raise-dispute-btn')) {
                const orderId = e.target.getAttribute('data-order-id');
                this.openPopup(orderId);
            }
        });

        // Close popup events
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.closePopup();
            }
        });

        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('dispute-popup-close') || 
                e.target.id === 'cancel-dispute-btn') {
                this.closePopup();
            }
            // Handle submit dispute button click
            if (e.target.id === 'submit-dispute-btn') {
                this.handleSubmitDispute();
            }
        });
    }

    openPopup(orderId) {
        const orderIdInput = document.getElementById('dispute-order-id');
        const commentTextarea = document.getElementById('dispute-comment');
        
        // Set order ID and clear comment
        orderIdInput.value = orderId;
        commentTextarea.value = '';
        
        // Show popup
        this.overlay.style.display = 'flex';
        
        // Focus on comment textarea
        setTimeout(() => {
            commentTextarea.focus();
        }, 100);
    }

    closePopup() {
        this.overlay.style.display = 'none';
    }

    async handleSubmitDispute() {
        const orderIdInput = document.getElementById('dispute-order-id');
        const commentTextarea = document.getElementById('dispute-comment');
        const submitBtn = document.getElementById('submit-dispute-btn');
        
        const orderId = orderIdInput.value.trim();
        const disputeComment = commentTextarea.value.trim();
        
        // Validate input
        if (!orderId) {
            this.showErrorMessage('Order ID is required');
            return;
        }
        
        if (!disputeComment) {
            this.showErrorMessage('Dispute comment is required');
            commentTextarea.focus();
            return;
        }
        
        if (disputeComment.length < 10) {
            this.showErrorMessage('Dispute comment must be at least 10 characters long');
            commentTextarea.focus();
            return;
        }
        
        try {
            // Disable submit button during API call
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';
            
            // Make API call to raise dispute
            const response = await fetch('/raise_payment_dispute', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Include cookies for authentication
                body: JSON.stringify({
                    orderId: orderId,
                    disputeComment: disputeComment
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                this.showSuccessMessage('Dispute raised successfully!');
                // Close popup after a short delay
                setTimeout(() => {
                    this.closePopup();
                    // Optionally reload orders to show updated status
                    if (typeof window.loadOrders === 'function') {
                        window.loadOrders();
                    }
                }, 1500);
            } else {
                this.showErrorMessage(result.error || 'Failed to raise dispute');
            }
            
        } catch (error) {
            console.error('Error raising dispute:', error);
            this.showErrorMessage('Network error. Please try again.');
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Request';
        }
    }
    
    showErrorMessage(message) {
        this.showMessage(message, 'error');
    }
    
    showSuccessMessage(message) {
        this.showMessage(message, 'success');
    }
    
    showMessage(message, type = 'error') {
        // Remove any existing message
        const existingMessage = this.popup.querySelector('.dispute-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `dispute-message dispute-message-${type}`;
        messageDiv.textContent = message;
        
        // Insert message after the form
        const disputeForm = this.popup.querySelector('.dispute-form');
        disputeForm.parentNode.insertBefore(messageDiv, disputeForm.nextSibling);
        
        // Auto-remove error messages after 5 seconds
        if (type === 'error') {
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 5000);
        }
    }
}

// Initialize the dispute popup manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.disputePopupManager = new DisputePopupManager();
});

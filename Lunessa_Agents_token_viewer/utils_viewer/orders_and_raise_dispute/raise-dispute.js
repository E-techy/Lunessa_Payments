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
}

// Initialize the dispute popup manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.disputePopupManager = new DisputePopupManager();
});

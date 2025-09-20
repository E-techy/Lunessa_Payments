/**
 * Razorpay Orders Help Modal System
 * Provides comprehensive help and guidance for using the Razorpay Orders interface
 */

document.addEventListener('DOMContentLoaded', function() {
    // Create and inject the help modal HTML
    createHelpModal();
    
    // Attach event listener to help button
    const helpButton = document.getElementById('razorpay-help-btn');
    if (helpButton) {
        helpButton.addEventListener('click', function() {
            console.log('🆘 Help button clicked - Opening help modal');
            openHelpModal();
        });
    }

    // Handle modal interactions
    setupModalEventListeners();
});

/**
 * Creates the help modal HTML structure and injects it into the DOM
 */
function createHelpModal() {
    const modalHTML = `
        <div id="razorpay-help-modal" class="razorpay-help-modal" style="display: none;">
            <div class="razorpay-help-overlay"></div>
            <div class="razorpay-help-content">
                <div class="razorpay-help-header">
                    <div class="help-title">
                        <i class="fas fa-question-circle"></i>
                        <h2>How to Use Razorpay Orders</h2>
                    </div>
                    <button class="razorpay-help-close" id="razorpay-help-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <div class="razorpay-help-body">
                    <!-- Filter Options Section -->
                    <div class="help-section">
                        <h3><i class="fas fa-filter"></i> Filter Options</h3>
                        
                        <div class="help-filters">
                            <div class="help-filter-item">
                                <div class="filter-icon">
                                    <i class="fas fa-hashtag"></i>
                                </div>
                                <div class="filter-content">
                                    <h4>Order ID</h4>
                                    <p>Search for a specific order by entering the complete Order ID (e.g., order_12345)</p>
                                    <small><strong>Note:</strong> When Order ID is specified, other filters are ignored</small>
                                </div>
                            </div>

                            <div class="help-filter-item">
                                <div class="filter-icon">
                                    <i class="fas fa-user"></i>
                                </div>
                                <div class="filter-content">
                                    <h4>Username</h4>
                                    <p>Filter orders by the user who made the payment. Enter the exact username.</p>
                                </div>
                            </div>

                            <div class="help-filter-item">
                                <div class="filter-icon">
                                    <i class="fas fa-credit-card"></i>
                                </div>
                                <div class="filter-content">
                                    <h4>Payment Method</h4>
                                    <p>Filter by payment method: UPI, Card, Net Banking, or Wallet</p>
                                </div>
                            </div>

                            <div class="help-filter-item">
                                <div class="filter-icon">
                                    <i class="fas fa-calendar-alt"></i>
                                </div>
                                <div class="filter-content">
                                    <h4>Date Range</h4>
                                    <p>Use From Date and To Date to filter orders within a specific time period</p>
                                    <small><strong>Tip:</strong> Dates are converted to Unix timestamps automatically</small>
                                </div>
                            </div>

                            <div class="help-filter-item">
                                <div class="filter-icon">
                                    <i class="fas fa-list-ol"></i>
                                </div>
                                <div class="filter-content">
                                    <h4>Pagination</h4>
                                    <p><strong>Count (Limit):</strong> Number of orders to retrieve (default: 10, max: 1000)</p>
                                    <p><strong>Skip (Offset):</strong> Number of orders to skip (useful for pagination)</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Tips Section -->
                    <div class="help-section">
                        <h3><i class="fas fa-lightbulb"></i> Pro Tips</h3>
                        
                        <div class="help-tips">
                            <div class="help-tip">
                                <i class="fas fa-exclamation-triangle"></i>
                                <span>If you specify an Order ID, all other filters will be ignored</span>
                            </div>
                            <div class="help-tip">
                                <i class="fas fa-clock"></i>
                                <span>Timestamps are automatically converted from your local time to Unix format</span>
                            </div>
                            <div class="help-tip">
                                <i class="fas fa-sort-numeric-up"></i>
                                <span>Default limit is 10 orders, maximum allowed is 1000 per request</span>
                            </div>
                            <div class="help-tip">
                                <i class="fas fa-keyboard"></i>
                                <span>Press Enter in any input field to trigger the search</span>
                            </div>
                            <div class="help-tip">
                                <i class="fas fa-download"></i>
                                <span>Export functionality works with currently displayed results</span>
                            </div>
                            <div class="help-tip">
                                <i class="fas fa-eye"></i>
                                <span>Use "Show/Hide JSON" to view raw API response data</span>
                            </div>
                        </div>
                    </div>

                    <!-- Status Information Section -->
                    <div class="help-section">
                        <h3><i class="fas fa-info-circle"></i> Order Status Guide</h3>
                        
                        <div class="help-status-guide">
                            <div class="status-item">
                                <span class="status-badge status-created">Created</span>
                                <span>Order created but payment not yet completed</span>
                            </div>
                            <div class="status-item">
                                <span class="status-badge status-paid">Paid</span>
                                <span>Payment successfully completed</span>
                            </div>
                            <div class="status-item">
                                <span class="status-badge status-failed">Failed</span>
                                <span>Payment attempt failed</span>
                            </div>
                        </div>
                    </div>                
                </div>

                <div class="razorpay-help-footer">
                    <button class="razorpay-btn razorpay-btn-primary" id="razorpay-help-got-it">
                        <i class="fas fa-check"></i>
                        Got it!
                    </button>
                </div>
            </div>
        </div>
    `;

    // Inject modal into DOM
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

/**
 * Sets up event listeners for modal interactions
 */
function setupModalEventListeners() {
    const modal = document.getElementById('razorpay-help-modal');
    const closeBtn = document.getElementById('razorpay-help-close');
    const gotItBtn = document.getElementById('razorpay-help-got-it');
    const overlay = modal?.querySelector('.razorpay-help-overlay');

    // Close modal handlers
    [closeBtn, gotItBtn, overlay].forEach(element => {
        if (element) {
            element.addEventListener('click', closeHelpModal);
        }
    });

    // Enter key support for form inputs
    const formInputs = document.querySelectorAll('#razorpay-order-id, #razorpay-username, #razorpay-count-limit, #razorpay-skip-offset');
    formInputs.forEach(input => {
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const fetchBtn = document.getElementById('razorpay-fetch-orders-btn');
                if (fetchBtn) {
                    fetchBtn.click();
                }
            }
        });
    });
}

/**
 * Opens the help modal
 */
function openHelpModal() {
    const modal = document.getElementById('razorpay-help-modal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Focus management for accessibility
        const firstFocusable = modal.querySelector('button');
        if (firstFocusable) {
            firstFocusable.focus();
        }
    }
}

/**
 * Closes the help modal
 */
function closeHelpModal() {
    const modal = document.getElementById('razorpay-help-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
        
        // Return focus to help button
        const helpButton = document.getElementById('razorpay-help-btn');
        if (helpButton) {
            helpButton.focus();
        }
    }
}

// Export for potential external use
window.RazorpayHelp = {
    open: openHelpModal,
    close: closeHelpModal
};
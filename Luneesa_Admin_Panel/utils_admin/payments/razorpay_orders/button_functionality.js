// Basic functionality for the buttons
document.addEventListener('DOMContentLoaded', function() {
    // Clear Filters button
    document.getElementById('razorpay-clear-filters-btn').addEventListener('click', function() {
        console.log('Clear Filters clicked');
        // Clear all form inputs
        document.getElementById('razorpay-order-id').value = '';
        document.getElementById('razorpay-username').value = '';
        document.getElementById('razorpay-payment-method').value = '';
        document.getElementById('razorpay-from-date').value = '';
        document.getElementById('razorpay-to-date').value = '';
        document.getElementById('razorpay-count-limit').value = '';
        document.getElementById('razorpay-skip-offset').value = '';
        
        // Hide results section
        document.getElementById('razorpay-orders-display-section').style.display = 'none';
    });
    
    // Help button
    document.getElementById('razorpay-help-btn').addEventListener('click', function() {
        console.log('Help button clicked');
    });
});

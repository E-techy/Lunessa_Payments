// Basic functionality for the buttons
document.addEventListener('DOMContentLoaded', function() {

    // Fetch Order button
    document.getElementById('razorpay-fetch-orders-btn').addEventListener('click', function() { 
        console.log('Fetch Orders clicked'); 
        // Add your fetch logic here 
        document.getElementById('razorpay-results-section').style.display = 'block'; });

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
        document.getElementById('razorpay-results-section').style.display = 'none';
    });
    
    // Export CSV button
    document.getElementById('razorpay-export-csv-btn').addEventListener('click', function() {
        console.log('Export CSV button clicked');
        // Add your export logic here
    });
    
    // Help button
    document.getElementById('razorpay-help-btn').addEventListener('click', function() {
        console.log('Help button clicked');
    });
});

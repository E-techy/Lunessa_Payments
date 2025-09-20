/**
 * Razorpay Orders CSV Export Functionality
 * This module handles exporting Razorpay order data to CSV format
 */

document.addEventListener("DOMContentLoaded", () => {
    const exportCsvBtn = document.getElementById("razorpay-export-csv-btn");
    
    if (!exportCsvBtn) {
        console.error("❌ Export CSV button not found in DOM");
        return;
    }

    // Add event listener for CSV export
    exportCsvBtn.addEventListener("click", () => {
        console.log("📊 Export CSV clicked");
        exportToCSV();
    });
});

/**
 * Main export function - gets data and triggers CSV download
 */
function exportToCSV() {
    try {
        // Get the JSON response data
        const jsonDataElement = document.getElementById("json-response-data");
        if (!jsonDataElement || !jsonDataElement.textContent.trim()) {
            showExportError("No data to export. Please fetch orders first.");
            return;
        }

        // Parse the JSON data
        const jsonData = JSON.parse(jsonDataElement.textContent);
        
        if (!jsonData.success || !jsonData.data) {
            showExportError("No valid order data found to export.");
            return;
        }

        // Handle both single order and multiple orders
        let ordersArray;
        if (Array.isArray(jsonData.data)) {
            ordersArray = jsonData.data;
        } else {
            ordersArray = [jsonData.data];
        }

        if (ordersArray.length === 0) {
            showExportError("No orders found to export.");
            return;
        }

        // Show loading state
        showExportLoading();

        // Convert to CSV
        const csvContent = convertOrdersToCSV(ordersArray);
        
        // Generate filename with current date
        const filename = `razorpay-orders-${new Date().toISOString().split('T')[0]}.csv`;
        
        // Download the CSV file
        downloadCSV(csvContent, filename);
        
        // Show success message
        showExportSuccess(ordersArray.length, filename);
        
        console.log("✅ CSV export completed successfully");
        
    } catch (error) {
        console.error("❌ Error exporting CSV:", error);
        showExportError(`Error exporting CSV: ${error.message}`);
    }
}

/**
 * Convert orders array to CSV format
 * @param {Array} orders - Array of order objects
 * @returns {string} CSV formatted string
 */
function convertOrdersToCSV(orders) {
    if (!orders || orders.length === 0) return '';

    // Define CSV headers
    const headers = [
        'Order ID',
        'Amount (Cents)',
        'Amount (Currency)',
        'Amount Due',
        'Amount Paid',
        'Currency',
        'Status',
        'Receipt',
        'Username',
        'User Agent',
        'Tokens',
        'Base Price',
        'Premium Price',
        'Base Discount',
        'Premium Discount',
        'Payment Type',
        'Promo Code',
        'Created Date',
        'Attempts',
        'Description',
        'Order Type',
        'Offer ID'
    ];

    // Convert orders to CSV rows
    const csvRows = [headers.join(',')];

    orders.forEach(order => {
        // Parse payment info and user details
        let paymentInfo = {};
        let userDetails = {};
        
        try {
            if (order.notes && order.notes.paymentInfo) {
                paymentInfo = JSON.parse(order.notes.paymentInfo);
            }
            if (order.notes && order.notes.userDetails) {
                userDetails = JSON.parse(order.notes.userDetails);
            }
        } catch (e) {
            console.warn("Could not parse order notes for:", order.id);
        }

        // Create row data
        const row = [
            escapeCsvValue(order.id || ''),
            order.amount || 0,
            formatAmount(order.amount || 0),
            order.amount_due || 0,
            order.amount_paid || 0,
            escapeCsvValue(order.currency || ''),
            escapeCsvValue(order.status || ''),
            escapeCsvValue(order.receipt || ''),
            escapeCsvValue(paymentInfo.u || userDetails.username || ''),
            escapeCsvValue(paymentInfo.a || ''),
            paymentInfo.t || 0,
            paymentInfo.bp || 0,
            paymentInfo.pp || 0,
            paymentInfo.bd || 0,
            paymentInfo.pd || 0,
            escapeCsvValue(paymentInfo.pt || ''),
            escapeCsvValue(paymentInfo.pc || ''),
            formatDateForCSV(order.created_at),
            order.attempts || 0,
            escapeCsvValue(order.description || ''),
            escapeCsvValue(order.notes?.orderType || ''),
            escapeCsvValue(order.offer_id || '')
        ];

        csvRows.push(row.join(','));
    });

    return csvRows.join('\n');
}

/**
 * Escape CSV values that contain special characters
 * @param {*} value - Value to escape
 * @returns {string} Escaped value
 */
function escapeCsvValue(value) {
    if (value === null || value === undefined) return '';
    
    const stringValue = String(value);
    
    // If the value contains comma, newline, or quotes, wrap it in quotes and escape internal quotes
    if (stringValue.includes(',') || stringValue.includes('\n') || stringValue.includes('"')) {
        return '"' + stringValue.replace(/"/g, '""') + '"';
    }
    
    return stringValue;
}

/**
 * Format amount from cents to currency format
 * @param {number} amountInCents - Amount in cents
 * @returns {string} Formatted amount
 */
function formatAmount(amountInCents) {
    if (!amountInCents) return '0.00';
    const amount = amountInCents / 100;
    return amount.toFixed(2);
}

/**
 * Format Unix timestamp to readable date for CSV
 * @param {number} unixTimestamp - Unix timestamp
 * @returns {string} Formatted date string
 */
function formatDateForCSV(unixTimestamp) {
    if (!unixTimestamp) return '';
    
    const date = new Date(unixTimestamp * 1000);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'UTC'
    });
}

/**
 * Download CSV content as file
 * @param {string} csvContent - CSV formatted content
 * @param {string} filename - Desired filename
 */
function downloadCSV(csvContent, filename) {
    try {
        // Create a Blob with the CSV content
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        
        // Create a download link
        const link = document.createElement('a');
        
        if (link.download !== undefined) {
            // Create object URL and set as href
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            link.style.visibility = 'hidden';
            
            // Add to document, click, and remove
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Clean up the object URL
            setTimeout(() => URL.revokeObjectURL(url), 100);
        } else {
            // Fallback for older browsers
            showExportError('Your browser does not support automatic CSV download.');
            console.log('CSV Content for manual copy:', csvContent);
        }
    } catch (error) {
        console.error("Error in downloadCSV:", error);
        showExportError('Failed to download CSV file.');
    }
}

/**
 * Show export loading state
 */
function showExportLoading() {
    const exportBtn = document.getElementById("razorpay-export-csv-btn");
    if (exportBtn) {
        exportBtn.disabled = true;
        exportBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Exporting...';
    }
}

/**
 * Show export success message
 * @param {number} recordCount - Number of records exported
 * @param {string} filename - Exported filename
 */
function showExportSuccess(recordCount, filename) {
    const exportBtn = document.getElementById("razorpay-export-csv-btn");
    if (exportBtn) {
        // Restore button
        exportBtn.disabled = false;
        exportBtn.innerHTML = '<i class="fas fa-download"></i> Export CSV';
        
        // Show temporary success state
        exportBtn.classList.add('btn-success-flash');
        exportBtn.innerHTML = '<i class="fas fa-check"></i> Exported!';
        
        setTimeout(() => {
            exportBtn.classList.remove('btn-success-flash');
            exportBtn.innerHTML = '<i class="fas fa-download"></i> Export CSV';
        }, 2000);
    }
    
    // Show success message
    console.log(`✅ Successfully exported ${recordCount} orders to ${filename}`);
    
    // Optional: Show toast notification if you have a toast system
    showToastNotification(`✅ Successfully exported ${recordCount} orders`, 'success');
}

/**
 * Show export error message
 * @param {string} message - Error message to display
 */
function showExportError(message) {
    const exportBtn = document.getElementById("razorpay-export-csv-btn");
    if (exportBtn) {
        exportBtn.disabled = false;
        exportBtn.innerHTML = '<i class="fas fa-download"></i> Export CSV';
    }
    
    console.error("❌ Export Error:", message);
    alert(`❌ ${message}`);
}

/**
 * Show toast notification (if toast system exists)
 * @param {string} message - Message to show
 * @param {string} type - Type of notification (success, error, info)
 */
function showToastNotification(message, type = 'info') {
    // Check if there's a toast system available
    if (typeof showToast === 'function') {
        showToast(message, type);
    } else if (typeof toast === 'object' && toast.show) {
        toast.show(message, type);
    }
    // If no toast system, just log it (alert is handled in error function)
    if (type !== 'error') {
        console.log(`📢 ${message}`);
    }
}
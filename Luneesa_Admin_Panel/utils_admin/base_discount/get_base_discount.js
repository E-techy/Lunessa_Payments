// GET_BASE_DISCOUNT.JS - Data fetching and table rendering only

/**
 * Fetch base discount data from API and render table
 */
async function fetchBaseDiscount() {
    try {
        const response = await fetch("/admin/view_base_discount", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        const data = await response.json();

        if (data.success) {
            console.log("✅ Base discount data loaded:", data.data);

            // Handle array response - get the first discount object
            let discountData = null;
            
            if (Array.isArray(data.data) && data.data.length > 0) {
                discountData = data.data[0];
                console.log("📦 Processing discount object:", discountData);
            } else if (data.data && !Array.isArray(data.data)) {
                discountData = data.data;
            }

            if (discountData) {
                // Sync toggle with backend status (uses status.js function)
                if (typeof syncToggleWithBackendStatus === 'function') {
                    syncToggleWithBackendStatus(discountData.status);
                }
                
                if (discountData.levels && discountData.levels.length > 0) {
                    console.log("📊 Discount Levels:");
                    discountData.levels.forEach((level, index) => {
                        console.log(
                            ` Level ${index + 1}: Min $${level.minOrderValue}, Max $${level.maxOrderValue}, ` +
                            `${level.discountType} Discount = $${level.discountValue}`
                        );
                    });

                    renderDiscountTable(discountData);
                } else {
                    console.warn("⚠️ No discount levels found in data");
                    clearDiscountTable();
                }
            } else {
                console.warn("⚠️ No discount data found");
                clearDiscountTable();
                // If no data, set toggle to inactive
                if (typeof syncToggleWithBackendStatus === 'function') {
                    syncToggleWithBackendStatus('inactive');
                }
            }
        } else {
            console.warn("⚠️ API response failed:", data.error);
            clearDiscountTable();
            if (typeof syncToggleWithBackendStatus === 'function') {
                syncToggleWithBackendStatus('inactive');
            }
        }
    } catch (error) {
        console.error("❌ Error fetching base discount:", error);
        clearDiscountTable();
        if (typeof syncToggleWithBackendStatus === 'function') {
            syncToggleWithBackendStatus('inactive');
        }
    }
}

/**
 * Render discount data in table format
 */
function renderDiscountTable(discountData) {
    const tableBody = document.getElementById('discountTableBody');
    
    if (!tableBody) {
        console.error('❌ Table body element not found');
        return;
    }

    // Clear existing rows
    tableBody.innerHTML = '';

    if (!discountData.levels || discountData.levels.length === 0) {
        // Show empty state
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `
            <td colspan="6" style="text-align: center; padding: 20px; color: #666;">
                No discount levels found
            </td>
        `;
        tableBody.appendChild(emptyRow);
        return;
    }

    // Render each discount level as a table row
    discountData.levels.forEach((level, index) => {
        const row = document.createElement('tr');
        row.setAttribute('data-row', index);

        const minValueUSD = level.minOrderValue;
        const maxValueUSD = level.maxOrderValue;
        const discountValueUSD = level.discountValue;

        // Format created date
        const createdDate = new Date(level.createdAt).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });

        row.innerHTML = `
            <td><span class="readonly-field-base-discount">${minValueUSD}</span></td>
            <td><span class="readonly-field-base-discount">${maxValueUSD}</span></td>
            <td><span class="readonly-field-base-discount">${level.discountType}</span></td>
            <td><span class="readonly-field-base-discount">${discountValueUSD}${level.discountType === 'percentage' ? '%' : ''}</span></td>
            <td>${createdDate}</td>
            <td><button class="delete-btn controllable-btn" id="base-discount-delete-row-${index}"><i class="fas fa-trash"></i></button></td>
        `;

        tableBody.appendChild(row);
    });

    console.log(`✅ Rendered ${discountData.levels.length} discount levels in table`);
}

/**
 * Clear discount table and show error state
 */
function clearDiscountTable() {
    const tableBody = document.getElementById('discountTableBody');
    
    if (tableBody) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 20px; color: #666;">
                    Failed to load discount data
                </td>
            </tr>
        `;
    }
}

/**
 * Delete discount level by index
 */
async function deleteDiscountLevel(rowIndex) {
    try {
        console.log(`🗑️ Attempting to delete discount level at index: ${rowIndex}`);
        
        const numericIndex = parseInt(rowIndex);
        if (isNaN(numericIndex) || numericIndex < 0) {
            console.error('❌ Invalid index for deletion:', rowIndex);
            if (typeof showNotification === 'function') {
                showNotification(`Invalid row index: ${rowIndex}`, 'error');
            }
            return;
        }
        
        const deleteBtn = document.querySelector(`#base-discount-delete-row-${numericIndex}`);
        if (deleteBtn) {
            deleteBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            deleteBtn.disabled = true;
        }
        
        const result = await window.baseDiscountAPI.deleteDiscountLevel(numericIndex);
        
        if (result.success) {
            console.log(`✅ Successfully deleted discount level at index ${numericIndex}`);
            if (typeof showNotification === 'function') {
                showNotification('Discount level deleted successfully!', 'success');
            }
            
            // Refresh the table to show updated data
            setTimeout(() => {
                fetchBaseDiscount();
            }, 500);
        } else {
            throw new Error(result.error || 'Failed to delete discount level');
        }
        
    } catch (error) {
        console.error('❌ Error deleting discount level:', error);
        if (typeof showNotification === 'function') {
            showNotification(`Failed to delete: ${error.message}`, 'error');
        }
        
        const deleteBtn = document.querySelector(`#base-discount-delete-row-${rowIndex}`);
        if (deleteBtn) {
            deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
            deleteBtn.disabled = false;
        }
    }
}

/**
 * Add event listeners for delete buttons
 */
function addDeleteEventListeners() {
    document.addEventListener('click', function(event) {
        if (event.target.closest('.delete-btn[id^="base-discount-delete-row-"]')) {
            const button = event.target.closest('.delete-btn');
            const rowIndex = button.id.split('-').pop();
            
            if (confirm('Are you sure you want to delete this discount level?')) {
                deleteDiscountLevel(rowIndex);
            }
        }
    });
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", function() {
    // Initialize global variables if not already set
    if (typeof window.currentStatus === 'undefined') {
        window.currentStatus = 'active';
    }
    if (typeof window.hasUnsavedStatusChange === 'undefined') {
        window.hasUnsavedStatusChange = false;
    }
    
    // Load data
    fetchBaseDiscount();
    addDeleteEventListeners();
    
    console.log('✅ Base Discount Data Fetcher initialized');
});
// INTEGRATED: get_base_discount.js with proper status synchronization

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

            // ✅ Handle array response - get the first discount object
            let discountData = null;
            
            if (Array.isArray(data.data) && data.data.length > 0) {
                discountData = data.data[0];
                console.log("📦 Processing discount object:", discountData);
            } else if (data.data && !Array.isArray(data.data)) {
                discountData = data.data;
            }

            if (discountData) {
                // ✅ CRITICAL: Sync the toggle with backend status BEFORE rendering
                syncToggleWithBackendStatus(discountData.status);
                
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
                syncToggleWithBackendStatus('inactive');
            }
        } else {
            console.warn("⚠️ API response failed:", data.error);
            clearDiscountTable();
            syncToggleWithBackendStatus('inactive');
        }
    } catch (error) {
        console.error("❌ Error fetching base discount:", error);
        clearDiscountTable();
        syncToggleWithBackendStatus('inactive');
    }
}

/**
 * ✅ NEW: Sync toggle state with backend status
 * This ensures the UI reflects the actual backend state
 */
function syncToggleWithBackendStatus(backendStatus) {
    const toggle = document.querySelector('.toggle-switch');
    const controllableButtons = document.querySelectorAll('.controllable-btn');
    const content = document.querySelector('.content');
    const table = document.querySelector('.discount-table');
    const addLevelSection = document.querySelector('.add-level-section');
    const saveSection = document.querySelector('.save-section');
    const saveStatusBtn = document.querySelector('.save-status-btn');
    
    if (!toggle) {
        console.warn('⚠️ Toggle switch not found in DOM');
        return;
    }
    
    // Update global currentStatus to match backend
    window.currentStatus = backendStatus || 'inactive';
    
    console.log(`🔄 Syncing toggle with backend status: ${window.currentStatus}`);
    
    // Update toggle visual state to match backend
    if (window.currentStatus === 'active') {
        toggle.classList.add('active');
        // Show all content elements
        showContentElements(controllableButtons, table, addLevelSection, saveSection, content);
    } else {
        toggle.classList.remove('active');
        // Hide all content elements
        hideContentElements(controllableButtons, table, addLevelSection, saveSection, content);
    }
    
    // Reset unsaved changes flag since we're syncing with backend
    window.hasUnsavedStatusChange = false;
    
    // Hide save status button since we're in sync
    if (saveStatusBtn) {
        saveStatusBtn.classList.add('hidden');
    }
    
    console.log(`✅ Toggle synced: ${window.currentStatus} (Active class: ${toggle.classList.contains('active')})`);
}

/**
 * Show content elements when status is active
 */
function showContentElements(controllableButtons, table, addLevelSection, saveSection, content) {
    if (controllableButtons) {
        controllableButtons.forEach(btn => {
            if (!btn.classList.contains('save-status-btn')) {
                btn.classList.remove('hidden');
            }
        });
    }
    if (table) table.classList.remove('hidden');
    if (addLevelSection) addLevelSection.classList.remove('hidden');
    if (saveSection) saveSection.classList.remove('hidden');
    if (content) content.classList.remove('status-disabled');
}

/**
 * Hide content elements when status is inactive
 */
function hideContentElements(controllableButtons, table, addLevelSection, saveSection, content) {
    if (controllableButtons) {
        controllableButtons.forEach(btn => {
            if (!btn.classList.contains('save-status-btn')) {
                btn.classList.add('hidden');
            }
        });
    }
    if (table) table.classList.add('hidden');
    if (addLevelSection) addLevelSection.classList.add('hidden');
    if (saveSection) saveSection.classList.add('hidden');
    if (content) content.classList.add('status-disabled');
}

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
 * ✅ UPDATED: Toggle status with proper backend sync check
 */
function toggleStatus() {
    const toggle = document.querySelector('.toggle-switch');
    const controllableButtons = document.querySelectorAll('.controllable-btn');
    const content = document.querySelector('.content');
    const table = document.querySelector('.discount-table');
    const addLevelSection = document.querySelector('.add-level-section');
    const saveSection = document.querySelector('.save-section');
    const saveStatusBtn = document.querySelector('.save-status-btn');
    
    // Toggle the visual state
    toggle.classList.toggle('active');
    
    const newStatus = toggle.classList.contains('active') ? 'active' : 'inactive';
    
    // Check if status has changed from saved backend status
    if (newStatus !== window.currentStatus) {
        window.hasUnsavedStatusChange = true;
        saveStatusBtn.classList.remove('hidden');
        
        // Update button text based on current toggle state
        if (toggle.classList.contains('active')) {
            saveStatusBtn.textContent = 'Save Changes (Active)';
        } else {
            saveStatusBtn.textContent = 'Save Changes (Inactive)';
        }
    } else {
        window.hasUnsavedStatusChange = false;
        saveStatusBtn.classList.add('hidden');
    }
    
    // Update UI elements based on toggle state
    if (toggle.classList.contains('active')) {
        showContentElements(controllableButtons, table, addLevelSection, saveSection, content);
        
        if (window.hasUnsavedStatusChange) {
            showNotification('Status changed to Active. Click "Save Changes (Active)" to confirm.', 'info');
        }
    } else {
        hideContentElements(controllableButtons, table, addLevelSection, saveSection, content);
        
        if (window.hasUnsavedStatusChange) {
            showNotification('Status changed to Inactive. Click "Save Changes (Inactive)" to confirm.', 'warning');
        }
    }
}

/**
 * ✅ UPDATED: Save status changes with proper backend sync
 */
async function saveStatusChanges() {
    const toggle = document.querySelector('.toggle-switch');
    const saveStatusBtn = document.querySelector('.save-status-btn');
    
    const newStatus = toggle.classList.contains('active') ? 'active' : 'inactive';
    
    // Show loading state
    saveStatusBtn.textContent = 'Saving...';
    saveStatusBtn.disabled = true;
    
    try {
        const result = await window.baseDiscountAPI.updateStatus(newStatus);
        
        if (result.success) {
            // ✅ Update global status to match what was saved
            window.currentStatus = newStatus;
            window.hasUnsavedStatusChange = false;
            
            saveStatusBtn.textContent = 'Saved!';
            showNotification(`Status successfully saved as: ${window.currentStatus}`, 'success');
            
            setTimeout(() => {
                saveStatusBtn.classList.add('hidden');
                saveStatusBtn.disabled = false;
                saveStatusBtn.textContent = 'Save Changes';
                
                // ✅ Refresh data to confirm backend state
                fetchBaseDiscount();
            }, 1000);
        } else {
            throw new Error(result.error || 'Failed to update status');
        }
        
    } catch (error) {
        console.error('❌ Status update failed:', error);
        saveStatusBtn.textContent = 'Save Failed';
        showNotification(`Failed to update status: ${error.message}`, 'error');
        
        // ✅ Revert toggle to match current backend state
        syncToggleWithBackendStatus(window.currentStatus);
        
        setTimeout(() => {
            saveStatusBtn.textContent = 'Save Changes';
            saveStatusBtn.disabled = false;
        }, 2000);
    }
}

// Add event listeners for delete buttons
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

async function deleteDiscountLevel(rowIndex) {
    try {
        console.log(`🗑️ Attempting to delete discount level at index: ${rowIndex}`);
        
        const numericIndex = parseInt(rowIndex);
        if (isNaN(numericIndex) || numericIndex < 0) {
            console.error('❌ Invalid index for deletion:', rowIndex);
            showNotification(`Invalid row index: ${rowIndex}`, 'error');
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
            showNotification('Discount level deleted successfully!', 'success');
            
            // Refresh the table to show updated data
            setTimeout(() => {
                fetchBaseDiscount();
            }, 500);
        } else {
            throw new Error(result.error || 'Failed to delete discount level');
        }
        
    } catch (error) {
        console.error('❌ Error deleting discount level:', error);
        showNotification(`Failed to delete: ${error.message}`, 'error');
        
        const deleteBtn = document.querySelector(`#base-discount-delete-row-${rowIndex}`);
        if (deleteBtn) {
            deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
            deleteBtn.disabled = false;
        }
    }
}

// ✅ Initialize everything when DOM is ready
document.addEventListener("DOMContentLoaded", function() {
    // Initialize global variables
    window.currentStatus = 'active'; // Default, will be overridden by backend data
    window.hasUnsavedStatusChange = false;
    
    // Load data and sync status
    fetchBaseDiscount();
    addDeleteEventListeners();
    
    console.log('✅ Base Discount System initialized with status synchronization');
});
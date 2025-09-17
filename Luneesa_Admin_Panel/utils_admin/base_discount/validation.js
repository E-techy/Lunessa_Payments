// VALIDATION.JS - Data validation and saving functionality only

/**
 * Validate table data and save all changes
 */
async function saveChanges() {
    // First, exit modify mode if active
    if (isModifyMode && typeof toggleModifyMode === 'function') {
        toggleModifyMode();
    }
    
    // Process any new rows - validate and convert them to readonly format
    const newRows = document.querySelectorAll('.new-row');
    let isValid = true;
    let validationErrors = [];
    
    newRows.forEach((row, index) => {
        const validationResult = validateRow(row);
        if (!validationResult.isValid) {
            isValid = false;
            validationErrors.push(`Row ${index + 1}: ${validationResult.errors.join(', ')}`);
        }
        
        if (validationResult.isValid) {
            convertRowToReadonly(row);
            row.classList.remove('new-row');
        }
    });
    
    // if (!isValid) {
    //     if (typeof showNotification === 'function') {
    //         showNotification(
    //             `Please fix validation errors:\n${validationErrors.join('\n')}`,
    //             'error'
    //         );
    //     }
    //     return;
    // }
    
    // Perform save operation with API call
    await performSaveOperation();
}

/**
 * Validate a single row's data
 */
function validateRow(row) {
    const inputs = row.querySelectorAll('.new-field');
    let isValid = true;
    let errors = [];
    
    if (inputs.length < 4) {
        return { isValid: false, errors: ['Incomplete row data'] };
    }
    
    const minInput = inputs[0];
    const maxInput = inputs[1];
    const typeSelect = inputs[2];
    const discountInput = inputs[3];
    
    // Validate min value
    if (!validateNumericInput(minInput)) {
        isValid = false;
        minInput.classList.add('error');
        errors.push('Min value must be a valid positive number');
    } else {
        minInput.classList.remove('error');
    }
    
    // Validate max value
    if (!validateNumericInput(maxInput)) {
        isValid = false;
        maxInput.classList.add('error');
        errors.push('Max value must be a valid positive number');
    } else {
        maxInput.classList.remove('error');
    }
    
    // Validate discount value
    if (!validateNumericInput(discountInput)) {
        isValid = false;
        discountInput.classList.add('error');
        errors.push('Discount value must be a valid positive number');
    } else {
        discountInput.classList.remove('error');
        
        // Special validation for percentage
        const discountType = typeSelect.value;
        const discountValue = parseFloat(discountInput.value);
        
        if (discountType === 'percentage' && discountValue > 100) {
            isValid = false;
            discountInput.classList.add('error');
            errors.push('Percentage discount cannot exceed 100%');
        }
    }
    
    // Validate min/max relationship
    if (minInput.value && maxInput.value) {
        const minValue = parseFloat(minInput.value);
        const maxValue = parseFloat(maxInput.value);
        
        if (!isNaN(minValue) && !isNaN(maxValue) && minValue >= maxValue) {
            isValid = false;
            minInput.classList.add('error');
            maxInput.classList.add('error');
            errors.push('Min value must be less than max value');
        }
    }
    
    return { isValid, errors };
}

/**
 * Convert editable row to readonly format
 */
function convertRowToReadonly(row) {
    const inputs = row.querySelectorAll('.new-field');
    
    inputs.forEach(input => {
        const parentTd = input.parentNode;
        const value = input.value;
        const span = document.createElement('span');
        span.className = 'readonly-field-base-discount';
        
        // Add % sign for percentage discount values
        if (parentTd.cellIndex === 3) {
            const typeSelect = row.querySelector('.discount-select');
            const discountType = typeSelect ? typeSelect.value : 'flat';
            span.textContent = discountType === 'percentage' ? value + '%' : value;
        } else {
            span.textContent = value;
        }
        
        parentTd.innerHTML = '';
        parentTd.appendChild(span);
    });
}

/**
 * Perform the save operation with real API calls
 */
async function performSaveOperation() {
    const saveBtn = document.querySelector('.save-btn, #base-discount-save-changes-btn');
    if (!saveBtn) {
        console.error('❌ Save button not found');
        return;
    }
    
    const originalText = saveBtn.textContent;
    
    saveBtn.textContent = 'Saving...';
    saveBtn.disabled = true;
    
    try {
        // Collect all discount levels from the table
        const discountLevels = collectDiscountLevelsFromTable();
        
        if (discountLevels.length === 0) {
            if (typeof showNotification === 'function') {
                showNotification('No discount levels to save', 'warning');
            }
            return;
        }

        // Check if API is available
        if (!window.baseDiscountAPI) {
            throw new Error('Base discount API not available');
        }

        // Try to update first, if it fails, create new
        let result;
        try {
            result = await window.baseDiscountAPI.updateBaseDiscountSlab({
                levels: discountLevels
            });
        } catch (error) {
            // If update fails (e.g., no existing slab), try to add/create
            console.log('Update failed, trying to create new:', error.message);
            result = await window.baseDiscountAPI.addBaseDiscountSlab({
                levels: discountLevels
            });
        }
        
        if (result.success) {
            saveBtn.textContent = 'Saved!';
            if (typeof showNotification === 'function') {
                showNotification(`Successfully saved ${discountLevels.length} discount levels!`, 'success');
            }
            
            // Refresh the table with updated data
            setTimeout(() => {
                if (typeof fetchBaseDiscount === 'function') {
                    fetchBaseDiscount();
                }
            }, 1000);
        } else {
            throw new Error(result.error || 'Failed to save');
        }
        
    } catch (error) {
        console.error('❌ Save operation failed:', error);
        saveBtn.textContent = 'Save Failed';
        if (typeof showNotification === 'function') {
            showNotification(`Failed to save: ${error.message}`, 'error');
        }
    } finally {
        setTimeout(() => {
            saveBtn.textContent = originalText;
            saveBtn.disabled = false;
        }, 2000);
    }
}

/**
 * Collect discount levels data from the table
 */
function collectDiscountLevelsFromTable() {
    const tableBody = document.getElementById('discountTableBody');
    if (!tableBody) {
        console.error('❌ Table body not found');
        return [];
    }
    
    const rows = tableBody.querySelectorAll('tr');
    const discountLevels = [];
    
    rows.forEach((row, index) => {
        const cells = row.querySelectorAll('td');
        if (cells.length < 4) return; // Skip invalid rows
        
        const minValue = cells[0].querySelector('input, span');
        const maxValue = cells[1].querySelector('input, span');
        const discountType = cells[2].querySelector('select, span');
        const discountValue = cells[3].querySelector('input, span');
        
        if (minValue && maxValue && discountType && discountValue) {
            const minVal = parseFloat(minValue.value || minValue.textContent);
            const maxVal = parseFloat(maxValue.value || maxValue.textContent);
            const discountVal = parseFloat(discountValue.value || discountValue.textContent.replace('%', ''));
            const typeVal = discountType.value || discountType.textContent;
            
            // Only add valid rows
            if (!isNaN(minVal) && !isNaN(maxVal) && !isNaN(discountVal)) {
                discountLevels.push({
                    minOrderValue: minVal,
                    maxOrderValue: maxVal,
                    discountType: typeVal,
                    discountValue: discountVal
                });
            }
        }
    });
    
    return discountLevels;
}

/**
 * Validate if all levels have unique, non-overlapping ranges
 */
function validateRangeOverlaps(levels) {
    const errors = [];
    
    for (let i = 0; i < levels.length; i++) {
        for (let j = i + 1; j < levels.length; j++) {
            const level1 = levels[i];
            const level2 = levels[j];
            
            // Check if ranges overlap
            if (level1.minOrderValue < level2.maxOrderValue && level2.minOrderValue < level1.maxOrderValue) {
                errors.push(`Level ${i + 1} and Level ${j + 1} have overlapping ranges`);
            }
        }
    }
    
    return errors;
}

// Export functions to global scope
if (typeof window !== 'undefined') {
    window.saveChanges = saveChanges;
    window.validateRow = validateRow;
    window.collectDiscountLevelsFromTable = collectDiscountLevelsFromTable;
}

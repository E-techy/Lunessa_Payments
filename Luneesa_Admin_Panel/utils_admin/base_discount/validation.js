// Data validation and saving functionality

/**
 * Validate table data and save changes
 */
function saveChanges() {
    if (isModifyMode) {
        toggleModifyMode();
    }
    
    // Process any new rows - convert them to readonly format
    const newRows = document.querySelectorAll('.new-row');
    let isValid = true;
    let validationErrors = [];
    
    newRows.forEach(row => {
        const validationResult = validateRow(row);
        if (!validationResult.isValid) {
            isValid = false;
            validationErrors.push(...validationResult.errors);
        }
        
        if (validationResult.isValid) {
            convertRowToReadonly(row);
            row.classList.remove('new-row');
        }
    });
    
    if (!isValid) {
        showNotification(
            `Please fix the following errors:\n${validationErrors.join('\n')}`,
            'error'
        );
        return;
    }
    
    // Simulate save operation
    performSaveOperation();
}

/**
 * Validate a single row's data
 */
function validateRow(row) {
    const inputs = row.querySelectorAll('.new-field');
    let isValid = true;
    let errors = [];
    
    // Validate numeric inputs
    inputs.forEach(input => {
        if (input.tagName === 'INPUT' && input.type === 'number') {
            if (!validateNumericInput(input)) {
                isValid = false;
                input.classList.add('error');
                errors.push(`${input.placeholder} must be a valid positive number`);
            } else {
                input.classList.remove('error');
            }
        }
    });
    
    // ✅ Only check min/max if at least 2 inputs exist
    if (inputs.length >= 2) {
        const minValue = parseFloat(inputs[0].value);
        const maxValue = parseFloat(inputs[1].value);

        if (!isNaN(minValue) && !isNaN(maxValue) && minValue >= maxValue) {
            isValid = false;
            inputs[0].classList.add('error');
            inputs[1].classList.add('error');
            errors.push('Min Value must be less than Max Value');
        }
    }
    
    // If fewer than 2 inputs, skip min/max validation (row might not need it)
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
        span.textContent = value;
        parentTd.innerHTML = '';
        parentTd.appendChild(span);
    });
}

/**
 * Perform the save operation with real API calls
 */
async function performSaveOperation() {
    const saveBtn = document.querySelector('.save-btn');
    const originalText = saveBtn.textContent;
    
    saveBtn.textContent = 'Saving...';
    saveBtn.disabled = true;
    
    try {
        // Collect all discount levels from the table
        const discountLevels = collectDiscountLevelsFromTable();
        
        if (discountLevels.length === 0) {
            showNotification('No discount levels to save', 'warning');
            return;
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
            showNotification(`Successfully saved ${discountLevels.length} discount levels!`, 'success');
            
            // Refresh the table with updated data
            setTimeout(() => {
                fetchBaseDiscount();
            }, 1000);
        } else {
            throw new Error(result.error || 'Failed to save');
        }
        
    } catch (error) {
        console.error('❌ Save operation failed:', error);
        saveBtn.textContent = 'Save Failed';
        showNotification(`Failed to save: ${error.message}`, 'error');
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

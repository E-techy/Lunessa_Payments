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
 * Perform the save operation with loading states
 */
function performSaveOperation() {
    const saveBtn = document.querySelector('.save-btn');
    const originalText = saveBtn.textContent;
    
    saveBtn.textContent = 'Saving...';
    saveBtn.disabled = true;
    
    setTimeout(() => {
        saveBtn.textContent = 'Saved!';
        showNotification('All changes saved successfully!', 'success');
        
        setTimeout(() => {
            saveBtn.textContent = originalText;
            saveBtn.disabled = false;
        }, 1000);
    }, APP_CONFIG.SAVE_DELAY);
}

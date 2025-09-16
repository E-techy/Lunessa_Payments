// Table management functionality for discount levels

/**
 * Toggle modify mode for editing table data
 */
function toggleModifyMode() {
    window.isModifyMode = !window.isModifyMode;
    const modifyBtn = document.querySelector('.modify-btn');
    const readonlyFields = document.querySelectorAll('.readonly-field-base-discount');
    
    if (window.isModifyMode) {
        enableModifyMode(modifyBtn, readonlyFields);
    } else {
        disableModifyMode(modifyBtn);
    }
}

/**
 * Enable modify mode - convert readonly fields to editable inputs
 */
function enableModifyMode(modifyBtn, readonlyFields) {
    modifyBtn.textContent = 'Cancel';
    modifyBtn.style.background = '#EF4444';
    
    readonlyFields.forEach(field => {
        const currentValue = field.textContent;
        const parentTd = field.parentNode;
        
        if (parentTd.cellIndex === 0 || parentTd.cellIndex === 1 || parentTd.cellIndex === 3) {
            // minValue, maxValue, discountValue - input fields
            const input = createNumericInput(currentValue, parentTd.cellIndex);
            parentTd.innerHTML = '';
            parentTd.appendChild(input);
        } else if (parentTd.cellIndex === 2) {
            // discountType - select dropdown
            const select = createDiscountTypeSelect(currentValue);
            parentTd.innerHTML = '';
            parentTd.appendChild(select);
        }
    });
}

/**
 * Disable modify mode - convert editable inputs back to readonly
 */
function disableModifyMode(modifyBtn) {
    modifyBtn.textContent = 'Modify';
    modifyBtn.style.background = '#8B5CF6';
    
    const editableInputs = document.querySelectorAll('.editable-input, .discount-select');
    editableInputs.forEach(input => {
        const currentValue = input.value;
        const parentTd = input.parentNode;
        const span = document.createElement('span');
        span.className = 'readonly-field-base-discount';
        span.textContent = currentValue;
        parentTd.innerHTML = '';
        parentTd.appendChild(span);
    });
}

/**
 * Create numeric input for table editing
 */
function createNumericInput(currentValue, cellIndex) {
    const input = createInputElement('tel', 'editable-input', currentValue, {
        'min': '0',
        'pattern': '[0-9]*',
        'inputmode': 'numeric',
        'required': true
    });
    
    input.oninput = function() {
        this.value = this.value.replace(/[^0-9]/g, '');
    };
    
    if (cellIndex === 0 || cellIndex === 1) {
        input.step = '1'; // Integer step for min/max values
        input.placeholder = 'Enter value';
    } else {
        input.step = '0.01'; // Decimal step for discount value
        input.placeholder = 'Enter value';
    }
    
    return input;
}

/**
 * Create discount type select dropdown
 */
function createDiscountTypeSelect(currentValue) {
    const options = [
        { value: 'flat', text: 'flat', selected: currentValue === 'flat' },
        { value: 'percentage', text: 'percentage', selected: currentValue === 'percentage' }
    ];
    
    return createSelectElement('discount-select', options);
}

/**
 * Add a new discount level row to the table
 */
function addNewLevel() {
    const tableBody = document.getElementById('discountTableBody');
    const newRow = document.createElement('tr');
    newRow.setAttribute('data-row', window.rowCounter);
    newRow.classList.add('new-row'); // Mark as new row for styling
    
    const currentDate = getCurrentFormattedDate();
    
    // Create editable fields by default for new rows
    newRow.innerHTML = `
        <td><input type="tel" class="editable-input new-field" value="" placeholder="Min value" min="0" step="1" pattern="[0-9]*" inputmode="numeric" required></td>
        <td><input type="tel" class="editable-input new-field" value="" placeholder="Max value" min="0" step="1" pattern="[0-9]*" inputmode="numeric" required></td>
        <td>
            <select class="discount-select new-field">
                <option value="flat" selected>flat</option>
                <option value="percentage">percentage</option>
            </select>
        </td>
        <td><input type="tel" class="editable-input new-field" value="" placeholder="Discount value" min="0" step="0.01" pattern="[0-9]*" inputmode="numeric" required></td>
        <td>${currentDate}</td>
        <td>
            <button class="delete-btn controllable-btn" data-row-index="${window.rowCounter}" title="Delete this row"><i class="fas fa-trash"></i></button>
        </td>
    `;
    
    tableBody.appendChild(newRow);
    
    // Focus on the first input field
    const firstInput = newRow.querySelector('.editable-input');
    if (firstInput) {
        firstInput.focus();
        firstInput.select();
    }
    
    window.rowCounter++;
    
    // Show notification
    showNotification('New level added! Fill in the details and click Save Changes to save all.', 'info');
}

/**
 * Delete a specific row from the table
 */
function deleteRow(rowIndex) {
    const row = document.querySelector(`tr[data-row="${rowIndex}"]`);
    if (row) {
        if (confirm('Are you sure you want to delete this level?')) {
            row.remove();
            showNotification('Level deleted successfully!', 'success');
        }
    }
}

/**
 * Save all changes to the discount levels
 */
function saveChanges() {
    const tableBody = document.getElementById('discountTableBody');
    const rows = tableBody.querySelectorAll('tr');
    const discountLevels = [];
    let hasErrors = false;
    
    // Validate and collect data from all rows
    rows.forEach((row, index) => {
        const cells = row.querySelectorAll('td');
        const minValue = cells[0].querySelector('input, span');
        const maxValue = cells[1].querySelector('input, span');
        const discountType = cells[2].querySelector('select, span');
        const discountValue = cells[3].querySelector('input, span');
        
        if (minValue && maxValue && discountType && discountValue) {
            const minVal = parseFloat(minValue.value || minValue.textContent);
            const maxVal = parseFloat(maxValue.value || maxValue.textContent);
            const discountVal = parseFloat(discountValue.value || discountValue.textContent);
            const typeVal = discountType.value || discountType.textContent;
            
            // Basic validation
            if (isNaN(minVal) || isNaN(maxVal) || isNaN(discountVal)) {
                showNotification(`Row ${index + 1}: Please enter valid numbers`, 'error');
                hasErrors = true;
                return;
            }
            
            if (minVal >= maxVal) {
                showNotification(`Row ${index + 1}: Minimum value must be less than maximum value`, 'error');
                hasErrors = true;
                return;
            }
            
            if (discountVal <= 0) {
                showNotification(`Row ${index + 1}: Discount value must be greater than 0`, 'error');
                hasErrors = true;
                return;
            }
            
            // Validate percentage
            if (typeVal === 'percentage' && discountVal > 100) {
                showNotification(`Row ${index + 1}: Percentage discount cannot exceed 100%`, 'error');
                hasErrors = true;
                return;
            }
            
            discountLevels.push({
                minOrderValue: minVal,
                maxOrderValue: maxVal,
                discountType: typeVal,
                discountValue: discountVal,
                created: cells[4].textContent
            });
        }
    });
    
    if (hasErrors) {
        return;
    }
    
    if (discountLevels.length === 0) {
        showNotification('No discount levels to save', 'warning');
        return;
    }
    
    // Show loading state
    const saveBtn = document.getElementById('base-discount-save-changes-btn');
    const originalText = saveBtn.textContent;
    saveBtn.textContent = 'Saving...';
    saveBtn.disabled = true;
    
    // Simulate API call - replace with actual API call
    setTimeout(() => {
        // Convert editable fields back to readonly if in modify mode
        if (window.isModifyMode) {
            toggleModifyMode();
        }
        
        console.log('Saved discount levels:', discountLevels);
        showNotification(`Successfully saved ${discountLevels.length} discount levels!`, 'success');
        
        saveBtn.textContent = 'Saved!';
        setTimeout(() => {
            saveBtn.textContent = originalText;
            saveBtn.disabled = false;
        }, 1000);
    }, APP_CONFIG.SAVE_DELAY);
}

// Make functions globally accessible
window.toggleModifyMode = toggleModifyMode;
window.addNewLevel = addNewLevel;
window.deleteRow = deleteRow;
window.saveChanges = saveChanges;

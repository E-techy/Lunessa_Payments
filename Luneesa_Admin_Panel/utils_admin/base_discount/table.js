// TABLE.JS - Table management and editing functionality only

/**
 * Toggle modify mode for editing table data
 */
function toggleModifyMode() {
    const modifyBtn = document.querySelector('.modify-btn');
    const readonlyFields = document.querySelectorAll('.readonly-field-base-discount');
    
    isModifyMode = !isModifyMode;
    
    if (isModifyMode) {
        enableModifyMode(modifyBtn, readonlyFields);
    } else {
        disableModifyMode(modifyBtn, readonlyFields);
    }
}

/**
 * Enable modify mode - convert readonly fields to editable inputs
 */
function enableModifyMode(modifyBtn, readonlyFields) {
    modifyBtn.textContent = 'Cancel';
    modifyBtn.style.background = '#EF4444';
    
    readonlyFields.forEach(field => {
        const currentValue = field.textContent.replace('%', ''); // Remove % for editing
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
function disableModifyMode(modifyBtn, readonlyFields) {
    modifyBtn.textContent = 'Modify';
    modifyBtn.style.background = '#8B5CF6';
    
    const editableInputs = document.querySelectorAll('.editable-input, .discount-select');
    editableInputs.forEach(input => {
        const currentValue = input.value;
        const parentTd = input.parentNode;
        const span = document.createElement('span');
        span.className = 'readonly-field-base-discount';
        
        // Add % sign back for percentage values
        if (parentTd.cellIndex === 3 && parentTd.parentNode.cells[2].querySelector('select, span')) {
            const discountTypeElement = parentTd.parentNode.cells[2].querySelector('select, span');
            const discountType = discountTypeElement.value || discountTypeElement.textContent;
            span.textContent = discountType === 'percentage' ? currentValue + '%' : currentValue;
        } else {
            span.textContent = currentValue;
        }
        
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
        input.placeholder = 'Enter amount';
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
    newRow.setAttribute('data-row', rowCounter);
    newRow.classList.add('new-row'); // Mark as new row for styling
    
    const currentDate = getCurrentFormattedDate();
    
    // Create editable fields by default for new rows
    newRow.innerHTML = `
        <td><input type="tel" class="editable-input new-field" value="" placeholder="Min amount" min="0" step="1" pattern="[0-9]*" inputmode="numeric" required></td>
        <td><input type="tel" class="editable-input new-field" value="" placeholder="Max amount" min="0" step="1" pattern="[0-9]*" inputmode="numeric" required></td>
        <td>
            <select class="discount-select new-field">
                <option value="flat" selected>flat</option>
                <option value="percentage">percentage</option>
            </select>
        </td>
        <td><input type="tel" class="editable-input new-field" value="" placeholder="Discount value" min="0" step="0.01" pattern="[0-9]*" inputmode="numeric" required></td>
        <td>${currentDate}</td>
        <td>
            <button class="delete-btn controllable-btn" data-row-index="${rowCounter}" title="Delete this row"><i class="fas fa-trash"></i></button>
        </td>
    `;
    
    tableBody.appendChild(newRow);
    
    // Focus on the first input field
    const firstInput = newRow.querySelector('.editable-input');
    if (firstInput) {
        firstInput.focus();
        firstInput.select();
    }
    
    // Add input validation to numeric fields
    const numericInputs = newRow.querySelectorAll('input[type="tel"]');
    numericInputs.forEach(input => {
        input.oninput = function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        };
    });
    
    rowCounter++;
    
    // Show notification
    if (typeof showNotification === 'function') {
        showNotification('New level added! Fill in the details and click Save Changes to save all.', 'info');
    }
}

// Export functions to global scope
if (typeof window !== 'undefined') {
    window.toggleModifyMode = toggleModifyMode;
    window.addNewLevel = addNewLevel;
}

// let isModifyMode = false;
// let rowCounter = 4;
// let hasUnsavedStatusChange = false;
// let currentStatus = 'active'; // Track the current saved status

// function toggleStatus() {
//     const toggle = document.querySelector('.toggle-switch');
//     const controllableButtons = document.querySelectorAll('.controllable-btn');
//     const content = document.querySelector('.content');
//     const table = document.querySelector('.discount-table');
//     const addLevelSection = document.querySelector('.add-level-section');
//     const saveSection = document.querySelector('.save-section');
//     const saveStatusBtn = document.querySelector('.save-status-btn');
    
//     toggle.classList.toggle('active');
    
//     const newStatus = toggle.classList.contains('active') ? 'active' : 'inactive';
    
//     // Check if status has changed from saved status
//     if (newStatus !== currentStatus) {
//         hasUnsavedStatusChange = true;
//         saveStatusBtn.classList.remove('hidden');
//         saveStatusBtn.textContent = 'Save Changes';
//     } else {
//         hasUnsavedStatusChange = false;
//         saveStatusBtn.classList.add('hidden');
//     }
    
//     if (toggle.classList.contains('active')) {
//         // Status is ON - show all content
//         controllableButtons.forEach(btn => {
//             if (!btn.classList.contains('save-status-btn')) {
//                 btn.classList.remove('hidden');
//             }
//         });
//         table.classList.remove('hidden');
//         addLevelSection.classList.remove('hidden');
//         saveSection.classList.remove('hidden');
//         content.classList.remove('status-disabled');
        
//         if (hasUnsavedStatusChange) {
//             showNotification('Status changed to Active. Click "Save Changes" to confirm.', 'info');
//         }
//     } else {
//         // Status is OFF - hide all content
//         controllableButtons.forEach(btn => {
//             if (!btn.classList.contains('save-status-btn')) {
//                 btn.classList.add('hidden');
//             }
//         });
//         table.classList.add('hidden');
//         addLevelSection.classList.add('hidden');
//         saveSection.classList.add('hidden');
//         content.classList.add('status-disabled');
        
//         if (hasUnsavedStatusChange) {
//             showNotification('Status changed to Inactive. Click "Save Changes" to confirm.', 'warning');
//         }
//     }
// }

// function saveStatusChanges() {
//     const toggle = document.querySelector('.toggle-switch');
//     const saveStatusBtn = document.querySelector('.save-status-btn');
    
//     // Update current status to match toggle state
//     currentStatus = toggle.classList.contains('active') ? 'active' : 'inactive';
//     hasUnsavedStatusChange = false;
    
//     // Hide save button and show loading state
//     saveStatusBtn.textContent = 'Saving...';
//     saveStatusBtn.disabled = true;
    
//     // Simulate API call
//     setTimeout(() => {
//         saveStatusBtn.textContent = 'Saved!';
//         showNotification(`Status successfully saved as: ${currentStatus}`, 'success');
        
//         setTimeout(() => {
//             saveStatusBtn.classList.add('hidden');
//             saveStatusBtn.disabled = false;
//             saveStatusBtn.textContent = 'Save Changes';
//         }, 1000);
//     }, 1500);
// }

// function toggleModifyMode() {
//     isModifyMode = !isModifyMode;
//     const modifyBtn = document.querySelector('.modify-btn');
//     const readonlyFields = document.querySelectorAll('.readonly-field');
    
//     if (isModifyMode) {
//         modifyBtn.textContent = 'Cancel';
//         modifyBtn.style.background = '#EF4444';
        
//         readonlyFields.forEach(field => {
//             const currentValue = field.textContent;
//             const parentTd = field.parentNode;
            
//             if (parentTd.cellIndex === 0 || parentTd.cellIndex === 1 || parentTd.cellIndex === 3) {
//                 // minValue, maxValue, discountValue - input fields
//                 const input = document.createElement('input');
//                 input.type = 'tel';
//                 input.className = 'editable-input';
//                 input.value = currentValue;
//                 input.min = '0';
//                 input.pattern = '[0-9]*';
//                 input.inputMode = 'numeric';
//                 input.required = true;
//                 input.oninput = function() {
//                     this.value = this.value.replace(/[^0-9]/g, '');
//                 };
//                 if (parentTd.cellIndex === 0 || parentTd.cellIndex === 1) {
//                     input.step = '1'; // Integer step for min/max values
//                     input.placeholder = '+123(456)7890';
//                 } else {
//                     input.step = '0.01'; // Decimal step for discount value
//                     input.placeholder = '+123(456)7890';
//                 }
//                 parentTd.innerHTML = '';
//                 parentTd.appendChild(input);
//             } else if (parentTd.cellIndex === 2) {
//                 // discountType - select dropdown
//                 const select = document.createElement('select');
//                 select.className = 'discount-select';
//                 select.innerHTML = `
//                     <option value="flat" ${currentValue === 'flat' ? 'selected' : ''}>flat</option>
//                     <option value="percentage" ${currentValue === 'percentage' ? 'selected' : ''}>percentage</option>
//                 `;
//                 parentTd.innerHTML = '';
//                 parentTd.appendChild(select);
//             }
//         });
//     } else {
//         modifyBtn.textContent = 'Modify';
//         modifyBtn.style.background = '#8B5CF6';
        
//         const editableInputs = document.querySelectorAll('.editable-input, .discount-select');
//         editableInputs.forEach(input => {
//             const currentValue = input.value;
//             const parentTd = input.parentNode;
//             const span = document.createElement('span');
//             span.className = 'readonly-field';
//             span.textContent = currentValue;
//             parentTd.innerHTML = '';
//             parentTd.appendChild(span);
//         });
//     }
// }



// function addNewLevel() {
//     const tableBody = document.getElementById('discountTableBody');
//     const newRow = document.createElement('tr');
//     newRow.setAttribute('data-row', rowCounter);
//     newRow.classList.add('new-row'); // Mark as new row for styling
    
//     const currentDate = new Date().toLocaleDateString('en-GB', {
//         day: '2-digit',
//         month: 'short',
//         year: 'numeric'
//     });
    
//     // Create editable fields by default for new rows
//     newRow.innerHTML = `
//         <td><input type="tel" class="editable-input new-field" value="" placeholder="" min="0" step="1" pattern="[0-9]*" inputmode="numeric" oninput="this.value = this.value.replace(/[^0-9]/g, '')" required></td>
//         <td><input type="tel" class="editable-input new-field" value="" placeholder="" min="0" step="1" pattern="[0-9]*" inputmode="numeric" oninput="this.value = this.value.replace(/[^0-9]/g, '')" required></td>
//         <td>
//             <select class="discount-select new-field">
//                 <option value="flat" selected>flat</option>
//                 <option value="percentage">percentage</option>
//             </select>
//         </td>
//         <td><input type="tel" class="editable-input new-field" value="" placeholder="" min="0" step="0.01" pattern="[0-9]*" inputmode="numeric" oninput="this.value = this.value.replace(/[^0-9]/g, '')" required></td>
//         <td>${currentDate}</td>
//         <td>
//             <button class="delete-btn controllable-btn" onclick="deleteRow(${rowCounter})" title="Delete this row"><i class="fas fa-trash"></i></button>
//         </td>
//     `;
    
//     tableBody.appendChild(newRow);
    
//     // Focus on the first input field
//     const firstInput = newRow.querySelector('.editable-input');
//     if (firstInput) {
//         firstInput.focus();
//         firstInput.select();
//     }
    
//     rowCounter++;
    
//     // Show a subtle notification
//     showNotification('New level added! Fill in the details and click Save Changes to save all.', 'info');
// }



// function showNotification(message, type = 'info') {
//     // Remove existing notifications
//     const existingNotification = document.querySelector('.notification');
//     if (existingNotification) {
//         existingNotification.remove();
//     }
    
//     const notification = document.createElement('div');
//     notification.className = `notification ${type}`;
//     notification.textContent = message;
    
//     document.body.appendChild(notification);
    
//     // Auto remove after 4 seconds
//     setTimeout(() => {
//         if (notification.parentNode) {
//             notification.remove();
//         }
//     }, 4000);
// }

// function saveChanges() {
//     if (isModifyMode) {
//         toggleModifyMode();
//     }
    
//     // Process any new rows - convert them to readonly format
//     const newRows = document.querySelectorAll('.new-row');
//     let isValid = true;
//     let validationErrors = [];
    
//     newRows.forEach(row => {
//         const inputs = row.querySelectorAll('.new-field');
        
//         // Validate inputs
//         inputs.forEach(input => {
//             if (input.tagName === 'INPUT' && input.type === 'number') {
//                 const value = parseFloat(input.value);
//                 if (isNaN(value) || value < 0 || input.value.trim() === '') {
//                     isValid = false;
//                     input.classList.add('error');
//                     validationErrors.push(`${input.placeholder} must be a valid positive number`);
//                 } else {
//                     input.classList.remove('error');
//                 }
//             }
//         });
        
//         // Check if min value is less than max value
//         const minValue = parseFloat(inputs[0].value);
//         const maxValue = parseFloat(inputs[1].value);
//         if (!isNaN(minValue) && !isNaN(maxValue) && minValue >= maxValue) {
//             isValid = false;
//             inputs[0].classList.add('error');
//             inputs[1].classList.add('error');
//             validationErrors.push('Min Value must be less than Max Value');
//         }
        
//         if (isValid) {
//             // Convert editable fields to readonly
//             inputs.forEach(input => {
//                 const parentTd = input.parentNode;
//                 const value = input.value;
//                 const span = document.createElement('span');
//                 span.className = 'readonly-field';
//                 span.textContent = value;
//                 parentTd.innerHTML = '';
//                 parentTd.appendChild(span);
//             });
            
//             // Remove new-row class
//             row.classList.remove('new-row');
//         }
//     });
    
//     if (!isValid) {
//         showNotification(`Please fix the following errors:\n${validationErrors.join('\n')}`, 'error');
//         return;
//     }
    
//     // Simulate save operation
//     const saveBtn = document.querySelector('.save-btn');
//     const originalText = saveBtn.textContent;
//     saveBtn.textContent = 'Saving...';
//     saveBtn.disabled = true;
    
//     setTimeout(() => {
//         saveBtn.textContent = 'Saved!';
//         showNotification('All changes saved successfully!', 'success');
//         setTimeout(() => {
//             saveBtn.textContent = originalText;
//             saveBtn.disabled = false;
//         }, 1000);
//     }, 1500);
// }

// // Enhanced delete function with confirmation
// function deleteRow(rowIndex) {
//     const row = document.querySelector(`tr[data-row="${rowIndex}"]`);
//     if (row) {
//         if (confirm('Are you sure you want to delete this level?')) {
//             row.remove();
//             showNotification('Level deleted successfully!', 'success');
//         }
//     }
// }

// // Tab functionality (inactive tabs)
// document.querySelectorAll('.tab:not(.active)').forEach(tab => {
//     tab.addEventListener('click', function() {
//         alert('This tab is not implemented yet. Only Base discount is functional.');
//     });
// });

// // Initialize status on page load
// document.addEventListener('DOMContentLoaded', function() {
//     const toggle = document.querySelector('.toggle-switch');
//     const table = document.querySelector('.discount-table');
//     const addLevelSection = document.querySelector('.add-level-section');
//     const saveSection = document.querySelector('.save-section');
//     const saveStatusBtn = document.querySelector('.save-status-btn');
    
//     // Initialize current status based on toggle state
//     currentStatus = toggle.classList.contains('active') ? 'active' : 'inactive';
    
//     if (toggle.classList.contains('active')) {
//         // Status is already ON by default, ensure all content is visible
//         const controllableButtons = document.querySelectorAll('.controllable-btn');
//         controllableButtons.forEach(btn => {
//             if (!btn.classList.contains('save-status-btn')) {
//                 btn.classList.remove('hidden');
//             }
//         });
//         table.classList.remove('hidden');
//         addLevelSection.classList.remove('hidden');
//         saveSection.classList.remove('hidden');
//     } else {
//         // Status is OFF by default, hide all content
//         const controllableButtons = document.querySelectorAll('.controllable-btn');
//         controllableButtons.forEach(btn => {
//             if (!btn.classList.contains('save-status-btn')) {
//                 btn.classList.add('hidden');
//             }
//         });
//         table.classList.add('hidden');
//         addLevelSection.classList.add('hidden');
//         saveSection.classList.add('hidden');
//     }
    
//     // Ensure save status button is initially hidden
//     saveStatusBtn.classList.add('hidden');
// });

async function fetchBaseDiscount() {
    try {
        const response = await fetch("/base_discount", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();

        if (data.success) {
            console.log("✅ Base discount data loaded:", data.data);

            // Pretty-print discount levels
            if (data.data.levels && data.data.levels.length > 0) {
                console.log("📊 Discount Levels:");
                data.data.levels.forEach((level, index) => {
                    console.log(
                        ` Level ${index + 1}: Min $${level.minOrderValue}, Max $${level.maxOrderValue}, ` +
                        `${level.discountType} Discount = $${level.discountValue}`
                    );
                });

                // Render data in table
                renderDiscountTable(data.data);
            }
        } else {
            console.warn("⚠️ No active discount slab found:", data.error);
            clearDiscountTable();
        }
    } catch (error) {
        console.error("❌ Error fetching base discount:", error);
        clearDiscountTable();
    }
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

        // Values are already in USD from server
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

// Add event listeners for delete buttons (will be added dynamically)
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
        // You'll need to implement the actual delete API call here
        console.log(`🗑️ Delete discount level at index: ${rowIndex}`);
        
        // For now, just remove the row from the table
        const row = document.querySelector(`tr[data-row="${rowIndex}"]`);
        if (row) {
            row.remove();
            console.log(`✅ Removed row ${rowIndex} from table`);
        }
        
        // TODO: Add actual API call to delete from backend
        // const response = await fetch(`/base_discount/level/${levelId}`, { method: 'DELETE' });
        
    } catch (error) {
        console.error('❌ Error deleting discount level:', error);
    }
}

// ✅ Run automatically when page loads
document.addEventListener("DOMContentLoaded", function() {
    fetchBaseDiscount();
    addDeleteEventListeners();
});

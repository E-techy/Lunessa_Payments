/**
 * Auto-fetch Base Discount Data from server on page load
 */
async function fetchBaseDiscountData() {
  try {
    const response = await fetch("/admin/view_base_discount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // If using Authorization header instead of cookies:
        // "Authorization": `Bearer ${yourToken}`
      },
      credentials: "include", // ✅ send cookies automatically if present
    });

    const result = await response.json();
    console.log("📦 Base Discount Data Response:", result);

    if (result.success && result.data && result.data.length > 0) {
      console.log("✅ Base Discount Data:", result.data);
      
      // Process the base discount data
      const baseDiscountData = result.data[0]; // Get first base discount record
      
      // Update status toggle
      updateStatusToggle(baseDiscountData.status);
      
      // Populate table with levels data
      populateDiscountTable(baseDiscountData.levels);
      
    } else {
      console.warn("⚠️ No base discount data found or empty response");
      // Keep the default table data that's already in HTML
    }
  } catch (err) {
    console.error("❌ Network error while fetching base discount:", err);
    // Keep the default table data that's already in HTML
  }
}

/**
 * Update the status toggle based on server data
 */
function updateStatusToggle(status) {
  const statusToggle = document.getElementById('base-discount-status-toggle');
  const isActive = status === 'active';
  
  if (statusToggle) {
    if (isActive) {
      statusToggle.classList.add('active');
    } else {
      statusToggle.classList.remove('active');
    }
    
    // Update global status variable
    window.currentStatus = status;
  }
}

/**
 * Populate the discount table with data from server
 */
function populateDiscountTable(levels) {
  const tableBody = document.getElementById('discountTableBody');
  
  if (!tableBody || !levels || levels.length === 0) {
    console.warn("⚠️ No table body found or no levels data");
    return;
  }

  // Clear existing table content
  tableBody.innerHTML = '';
  
  // Populate with server data
  levels.forEach((level, index) => {
    const row = createDiscountTableRow(level, index);
    tableBody.appendChild(row);
  });
  
  // Update row counter for future additions
  window.rowCounter = levels.length;
  
  console.log(`✅ Populated table with ${levels.length} discount levels`);
}

/**
 * Create a table row from level data
 */
function createDiscountTableRow(level, index) {
  const row = document.createElement('tr');
  row.setAttribute('data-row', index);
  
  // Format creation date
  const createdDate = formatDateForDisplay(level.createdAt);
  
  row.innerHTML = `
    <td><span class="readonly-field-base-discount">${level.minOrderValue}</span></td> 
    <td><span class="readonly-field-base-discount">${level.maxOrderValue}</span></td> 
    <td><span class="readonly-field-base-discount">${level.discountType}</span></td>
    <td><span class="readonly-field-base-discount">${level.discountValue}</span></td> 
    <td>${createdDate}</td>
    <td><button class="delete-btn controllable-btn" id="base-discount-delete-row-${index}"><i class="fas fa-trash"></i></button></td>
  `;
  
  return row;
}

/**
 * Format date from server format to display format
 */
function formatDateForDisplay(dateString) {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short', 
      year: 'numeric'
    });
  } catch (error) {
    console.warn("⚠️ Error formatting date:", dateString, error);
    return getCurrentFormattedDate(); // Fallback to current date
  }
}

// 🔥 Run automatically when page loads
window.addEventListener("DOMContentLoaded", fetchBaseDiscountData);

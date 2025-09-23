document.addEventListener("DOMContentLoaded", () => {
  const disputesTabButton = document.getElementById("your-dispute-tab");
  const refreshDisputesBtn = document.getElementById("refresh-disputes-btn");

  // Function to format date
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // Function to show loading state
  function showLoadingState() {
    const tableBody = document.getElementById("disputes-table-body");
    if (!tableBody) return;

    tableBody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; padding: 2rem;">
          <div style="font-size: 1.1rem; margin-bottom: 0.5rem;">🔄 Loading disputes...</div>
          <div style="font-size: 0.9rem; opacity: 0.7;">Fetching data from database</div>
        </td>
      </tr>
    `;
  }

  // Function to show error state
  function showErrorState() {
    const tableBody = document.getElementById("disputes-table-body");
    if (!tableBody) return;

    tableBody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; padding: 2rem; color: #dc3545;">
          <div style="font-size: 1.1rem; margin-bottom: 0.5rem;">⚠️ Error Loading Disputes</div>
          <div style="font-size: 0.9rem; opacity: 0.8;">Failed to load disputes. Please try again.</div>
          <button id="retry-disputes-btn" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Retry
          </button>
        </td>
      </tr>
    `;
    
    // Add event listener for retry button
    setTimeout(() => {
      const retryBtn = document.getElementById('retry-disputes-btn');
      if (retryBtn) {
        retryBtn.addEventListener('click', refreshDisputesData);
      }
    }, 10);
  }

  // Function to animate table rows
  function animateTableRows() {
    const rows = document.querySelectorAll('#disputes-table-body tr');
    rows.forEach((row, index) => {
      row.style.opacity = '0';
      row.style.transform = 'translateY(10px)';
      row.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      
      setTimeout(() => {
        row.style.opacity = '1';
        row.style.transform = 'translateY(0)';
      }, index * 50);
    });
  }

  // Function to render disputes table
  function renderDisputesTable(disputes) {
  // Store disputes data globally for details expansion
  currentDisputesData = disputes || [];
  const tableBody = document.getElementById("disputes-table-body");
    
    if (!disputes || disputes.length === 0) {
      tableBody.innerHTML = disputes.map((dispute, index) => `
        <tr>
          <td>
            <span class="dispute-order-id-cell">${dispute.orderId}</span>
          </td>
          <td>
            <span class="dispute-resolved-cell ${dispute.resolved ? 'resolved-true' : 'resolved-false'}">
              ${dispute.resolved ? 'Resolved' : 'Pending'}
            </span>
          </td>
          <td class="dispute-date-cell">
            ${formatDate(dispute.createdAt)}
          </td>
          <td class="dispute-date-cell">
            ${formatDate(dispute.updatedAt)}
          </td>
          <td class="dispute-actions-cell">
            <button class="dispute-action-btn" title="View Details" data-dispute-id="${dispute.disputeId}" data-dispute-index="${index}">
              <svg class="view-dispute-arrow-icon" viewBox="0 0 12 8" fill="none">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
          </td>
        </tr>
      `).join('');
      return;
    }

    tableBody.innerHTML = disputes.map(dispute => `
      <tr>
        <td>
          <span class="dispute-order-id-cell">${dispute.orderId}</span>
        </td>
        <td>
          <span class="dispute-resolved-cell ${dispute.resolved ? 'resolved-true' : 'resolved-false'}">
            ${dispute.resolved ? 'Resolved' : 'Pending'}
          </span>
        </td>
        <td class="dispute-date-cell">
          ${formatDate(dispute.createdAt)}
        </td>
        <td class="dispute-date-cell">
          ${formatDate(dispute.updatedAt)}
        </td>
        <td class="dispute-actions-cell">
          <button class="dispute-action-btn" title="View Details" data-dispute-id="${dispute.disputeId}" data-dispute-index="${disputes.indexOf(dispute)}">
            <svg class="view-dispute-arrow-icon" viewBox="0 0 12 8" fill="none">
                  <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
          </button>
        </td>
      </tr>
    `).join('');
  }

  // Function to fetch disputes (basic version for tab switching)
  async function fetchDisputes() {
    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch("/get_your_disputes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { "Authorization": `Bearer ${token}` }),
        },
      });

      const data = await response.json();
      console.log("Disputes Response:", data);
      
      if (data.success && data.data && data.data.disputes) {
        renderDisputesTable(data.data.disputes);
      } else {
        renderDisputesTable([]);
      }
    } catch (error) {
      console.error("Error fetching disputes:", error);
      renderDisputesTable([]);
    }
  }

  // Function to refresh disputes data manually (enhanced version)
  async function refreshDisputesData() {
    showLoadingState();
    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch("/get_your_disputes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { "Authorization": `Bearer ${token}` }),
        },
      });

      const data = await response.json();
      console.log("Disputes Response:", data);
      
      if (data.success && data.data && data.data.disputes) {
        renderDisputesTable(data.data.disputes);
        
        // Animate rows if we have disputes
        if (data.data.disputes.length > 0) {
          setTimeout(() => {
            animateTableRows();
          }, 10);
        }
      } else {
        renderDisputesTable([]);
        
        // Show success message briefly if no disputes found
        const tableBody = document.getElementById('disputes-table-body');
        if (tableBody) {
          tableBody.innerHTML = `
            <tr>
              <td colspan="5" style="text-align: center; padding: 2rem; color: #059669;">
                <div style="font-size: 1.1rem; margin-bottom: 0.5rem;">✅ Disputes refreshed successfully</div>
                <div style="font-size: 0.9rem; opacity: 0.7;">No disputes found</div>
              </td>
            </tr>
          `;
        }
      }
    } catch (error) {
      console.error("Error refreshing disputes:", error);
      showErrorState();
    }
  }

  // Store current disputes data globally for details expansion
  let currentDisputesData = [];

  // Function to create dispute details row HTML
  function createDisputeDetailsRow(dispute) {
    // Format dates
    const formatDate = (dateStr) => {
      if (!dateStr) return 'N/A';
      const date = new Date(dateStr);
      return date.toLocaleDateString() + ', ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    };

    return `
      <tr class="dispute-details-row">
        <td colspan="5" style="
          padding: 20px;
          text-align: start;
          font-size: 1rem;
          vertical-align: middle;">
          <div class="dispute-details">
            <p><strong>Your Comment:</strong> ${dispute.disputeComment || 'No comment provided'}</p>
            ${dispute.resolved && dispute.resolvedComment ? 
              `<p><strong>Resolution Comment:</strong> ${dispute.resolvedComment}</p>` : 
              dispute.resolved ? 
              `<p><strong>Resolution Comment:</strong> No resolution comment provided</p>` : 
              `<p><strong>Resolution Status:</strong> <em>Dispute is still pending resolution</em></p>`
            }
          </div>
        </td>
      </tr>
    `;
  }

  // Add event listener for dispute action buttons
  document.addEventListener('click', function(e) {
    if (e.target.closest('.dispute-action-btn')) {
      const button = e.target.closest('.dispute-action-btn');
      const disputeIndex = parseInt(button.dataset.disputeIndex);
      const row = button.closest('tr');
      
      // Toggle button state
      button.classList.toggle('expanded');
      
      // Check if details row already exists
      const existingDetailsRow = row.nextElementSibling;
      if (existingDetailsRow && existingDetailsRow.classList.contains('dispute-details-row')) {
        // Remove existing details row
        existingDetailsRow.remove();
      } else {
        // Find the dispute data using the index
        const disputeData = currentDisputesData[disputeIndex];
        
        if (disputeData) {
          // Create and insert details row
          const detailsRow = createDisputeDetailsRow(disputeData);
          row.insertAdjacentHTML('afterend', detailsRow);
          
          // Animate the new row
          setTimeout(() => {
            const newRow = row.nextElementSibling;
            if (newRow) newRow.classList.add('show');
          }, 10);
        }
      }
    }
  });

  // Event listeners
  if (disputesTabButton) {
    disputesTabButton.addEventListener("click", fetchDisputes);
  }
  
  if (refreshDisputesBtn) {
    refreshDisputesBtn.addEventListener("click", refreshDisputesData);
  }
});
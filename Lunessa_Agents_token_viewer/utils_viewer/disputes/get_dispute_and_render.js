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

  // Function to render disputes table
  function renderDisputesTable(disputes) {
    const tableBody = document.getElementById("disputes-table-body");
    
    if (!disputes || disputes.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="5">
            <div class="disputes-empty-state">
              <h3>No Disputes Found</h3>
              <p>You haven't raised any disputes yet.</p>
            </div>
          </td>
        </tr>
      `;
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
          <button class="dispute-action-btn" title="View Details">
            <svg class="view-dispute-arrow-icon" viewBox="0 0 12 8" fill="none">
                  <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
          </button>
        </td>
      </tr>
    `).join('');
  }

  // Function to fetch disputes
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

  // Event listeners
  disputesTabButton.addEventListener("click", fetchDisputes);
  refreshDisputesBtn.addEventListener("click", fetchDisputes);
});
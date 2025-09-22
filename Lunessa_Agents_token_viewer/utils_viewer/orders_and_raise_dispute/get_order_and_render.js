document.addEventListener("DOMContentLoaded", () => {
  const yourOrdersBtn = document.getElementById("your-orders-tab");
  const refreshOrdersBtn = document.getElementById("refresh-orders-btn");

  // Function to fetch and render orders
  async function fetchAndRenderOrders() {
    try {
      // Replace with however you're storing the token
      const token = localStorage.getItem("authToken") || "";

      const response = await fetch("/get_your_orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("📦 User Orders Response:", data);
      
      if (data.success && data.data && data.data.orders) {
        renderOrdersTable(data.data.orders);
      } else {
        renderEmptyState();
      }
    } catch (err) {
      console.error("❌ Failed to fetch user orders:", err);
      renderErrorState();
    }
  }

  // Function to render orders table
  function renderOrdersTable(orders) {
    const tableBody = document.getElementById("orders-table-body");
    
    if (!tableBody) return;
    
    if (orders.length === 0) {
      renderEmptyState();
      return;
    }

    tableBody.innerHTML = orders.map(order => {
      const orderId = order.orderId || 'N/A';
      const agentId = order.paymentInfo?.billingSnapshot?.agentId || 'N/A';
      const amount = order.amount ? `$${order.amount}` : 'N/A';
      const modelName = order.paymentInfo?.billingSnapshot?.modelName || 'N/A';
      const status = order.status || 'pending';
      
      return `
        <tr>
          <td>
            <div class="order-id-cell" title="${orderId}">
              ${orderId}
            </div>
          </td>
          <td>
            <div class="agent-id-cell">
              ${agentId}
            </div>
          </td>
          <td>
            <div class="amount-cell">
              ${amount}
            </div>
          </td>
          <td>
            <div class="model-name-cell">
              ${modelName}
            </div>
          </td>
          <td>
            <div class="status-cell status-${status}">
              ${status}
            </div>
          </td>
          <td>
            <div class="actions-cell">
              <button class="view-order-btn" data-order-id="${orderId}">
                <svg class="view-arrow-icon" viewBox="0 0 12 8" fill="currentColor">
                  <path d="M6 8L2.5 4.5H9.5L6 8Z"/>
                </svg>
              </button>
              <button class="raise-dispute-btn" data-order-id="${orderId}">
                Raise Dispute
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  // Function to render empty state
  function renderEmptyState() {
    const tableBody = document.getElementById("orders-table-body");
    if (!tableBody) return;

    tableBody.innerHTML = `
      <tr>
        <td colspan="6">
          <div class="orders-empty-state">
            <h3>No Orders Found</h3>
            <p>You haven't placed any orders yet.</p>
          </div>
        </td>
      </tr>
    `;
  }

  // Function to render error state
  function renderErrorState() {
    const tableBody = document.getElementById("orders-table-body");
    if (!tableBody) return;

    tableBody.innerHTML = `
      <tr>
        <td colspan="6">
          <div class="orders-empty-state">
            <h3>Error Loading Orders</h3>
            <p>Failed to load orders. Please try again.</p>
          </div>
        </td>
      </tr>
    `;
  }

  // Event listeners
  if (yourOrdersBtn) {
    yourOrdersBtn.addEventListener("click", () => {
      fetchAndRenderOrders();
    });
  }

  if (refreshOrdersBtn) {
    refreshOrdersBtn.addEventListener("click", () => {
      fetchAndRenderOrders();
    });
  }
});
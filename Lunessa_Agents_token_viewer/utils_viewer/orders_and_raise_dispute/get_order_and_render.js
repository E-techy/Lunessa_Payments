document.addEventListener("DOMContentLoaded", () => {
  const yourOrdersBtn = document.getElementById("your-orders-tab");
  const refreshOrdersBtn = document.getElementById("refresh-orders-btn");

  // Function to fetch and render orders
  async function fetchAndRenderOrders() {
    // Show loading state immediately when function is called
    showLoadingState();
    
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

  // Function to refresh orders data manually
  async function refreshOrdersData() {
      showLoadingState();
      try {
          await fetchAndRenderOrders();
          
          // Show success message briefly if no orders found
          const tbody = document.getElementById('orders-table-body');
          if (tbody && tbody.innerHTML.includes('No Orders Found')) {
              tbody.innerHTML = `
                  <tr>
                      <td colspan="7" style="text-align: center; padding: 2rem; color: #059669;">
                          <div style="font-size: 1.1rem; margin-bottom: 0.5rem;">✅ Orders refreshed successfully</div>
                          <div style="font-size: 0.9rem; opacity: 0.7;">No orders found</div>
                      </td>
                  </tr>
              `;
          }
          
          // Animate rows if we have orders
          const hasOrders = tbody && !tbody.innerHTML.includes('No Orders Found') && !tbody.innerHTML.includes('Error Loading Orders');
          if (hasOrders) {
              setTimeout(() => {
                  animateTableRows();
              }, 10);
          }
      } catch (error) {
          console.error('Failed to refresh orders:', error);
          renderErrorState();
      }
  }

  // Function to show loading state
  function showLoadingState() {
      const tbody = document.getElementById('orders-table-body');
      if (!tbody) return;

      tbody.innerHTML = `
          <tr>
              <td colspan="7" style="text-align: center; padding: 3rem;">
                  <div class="loading-container">
                      <div class="loading-spinner"></div>
                      <div style="font-size: 1.1rem; margin-top: 1rem; color: #374151;">Loading your orders...</div>
                      <div style="font-size: 0.9rem; opacity: 0.7; margin-top: 0.5rem;">Please wait while we fetch your data</div>
                  </div>
              </td>
          </tr>
      `;
  }

  // Function to animate table rows
  function animateTableRows() {
      const rows = document.querySelectorAll('#orders-table-body tr');
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
  // Function to render orders table
  function renderOrdersTable(orders) {
     // Store orders data globally for details expansion
    window.currentOrdersData = orders;
    const tableBody = document.getElementById("orders-table-body");
    
    if (!tableBody) return;
    
    if (orders.length === 0) {
      renderEmptyState();
      return;
    }

    tableBody.innerHTML = orders.map((order, index) => {
      const orderId = order.orderId || 'N/A';
      const agentId = order.paymentInfo?.billingSnapshot?.agentId || 'N/A';
      const amount = order.amount ? `${order.amount}` : 'N/A';
      const modelName = order.paymentInfo?.billingSnapshot?.modelName || 'N/A';
      const status = order.status || 'pending';
      const tokens = order.paymentInfo?.billingSnapshot?.tokens || 'N/A';
      const formattedTokens = tokens !== 'N/A' ? tokens.toLocaleString() : 'N/A';
      
      // Use a unique identifier combining receipt and index
      const uniqueId = `${order.receipt || 'no-receipt'}-${index}`;

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
            <div class="model-name-cell">
              ${modelName}
            </div>
          </td>
          <td>
            <div class="tokens-cell">
              ${formattedTokens}
            </div>
          </td>
          <td>
            <div class="amount-cell">
              $${amount}
            </div>
          </td>
          <td>
            <div class="status-cell status-${status}">
              ${status}
            </div>
          </td>
          <td>
            <div class="actions-cell">
              <button class="view-order-btn" data-unique-id="${uniqueId}">
                <svg class="view-arrow-icon" viewBox="0 0 12 8" fill="none">
                  <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
        <td colspan="7">
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
        <td colspan="7">
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
        refreshOrdersData();
    });
  }
  // Add event listener for view order buttons
  document.addEventListener('click', function(e) {
      if (e.target.closest('.view-order-btn')) {
          const button = e.target.closest('.view-order-btn');
          const uniqueId = button.dataset.uniqueId;
          const row = button.closest('tr');
          
          // Toggle button state
          button.classList.toggle('expanded');
          
          // Check if details row already exists
          const existingDetailsRow = row.nextElementSibling;
          if (existingDetailsRow && existingDetailsRow.classList.contains('order-details-row')) {
              // Remove existing details row
              existingDetailsRow.remove();
          } else {
              // Find the order data using the unique identifier
              const orders = window.currentOrdersData || [];
              const [receiptPart, indexPart] = uniqueId.split('-');
              const orderIndex = parseInt(indexPart);
              const orderData = orders[orderIndex];
              
              if (orderData) {
                  // Create and insert details row
                  const detailsRow = createOrderDetailsRow(orderData);
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

  // Function to create order details row HTML
  function createOrderDetailsRow(order) {
      const billing = order.paymentInfo?.billingSnapshot || {};
      const promo = billing.promo || {};
      const baseDiscount = billing.baseDiscount || {};
      const baseDiscountLevel = baseDiscount.level || {};
      
      // Use the same token extraction logic as the main table
      const tokens = billing.tokens || 'N/A';
      const formattedTokens = tokens !== 'N/A' ? tokens.toLocaleString() : 'N/A';
      
      // Format dates
      const formatDate = (dateStr) => {
          if (!dateStr) return 'N/A';
          const date = new Date(dateStr);
          return date.toLocaleDateString() + ', ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + ' PM';
      };

      // Get discount value
      const getDiscountValue = () => {
          if (baseDiscountLevel.discountValue) return baseDiscountLevel.discountValue;
          if (promo.data?.discountValue) return promo.data.discountValue;
          return 'N/A';
      };
      
      // Get min order value
      const getMinOrderValue = () => {
          if (baseDiscountLevel.minOrderValue) return baseDiscountLevel.minOrderValue;
          if (promo.data?.minOrderValue) return promo.data.minOrderValue;
          return 'N/A';
      };
      
      return `
          <tr class="order-details-row">
              <td colspan="7">
                  <div class="order-details-content">
                      <div class="order-details-grid">
                          <!-- Order Information Card -->
                          <div class="order-detail-card">
                              <h4>Order Information</h4>
                              <div class="order-detail-item">
                                  <span class="order-detail-label">Order ID:</span>
                                  <span class="order-detail-value">${order.orderId || 'N/A'}</span>
                              </div>
                              <div class="order-detail-item">
                                  <span class="order-detail-label">Receipt:</span>
                                  <span class="order-detail-value">${order.receipt || 'N/A'}</span>
                              </div>
                              <div class="order-detail-item">
                                  <span class="order-detail-label">Status:</span>
                                  <span class="order-detail-value status-${order.status || 'pending'}">${order.status || 'pending'}</span>
                              </div>
                              <div class="order-detail-item">
                                  <span class="order-detail-label">Created:</span>
                                  <span class="order-detail-value">${formatDate(order.createdAt)}</span>
                              </div>
                          </div>
                          
                          <!-- Payment Details Card -->
                          <div class="order-detail-card">
                              <h4>Payment Details</h4>
                              <div class="order-detail-item">
                                  <span class="order-detail-label">Amount:</span>
                                  <span class="order-detail-value amount">$${order.amount || 'N/A'}</span>
                              </div>
                              <div class="order-detail-item">
                                  <span class="order-detail-label">Currency:</span>
                                  <span class="order-detail-value">${billing.currency || 'USD'}</span>
                              </div>
                              <div class="order-detail-item">
                                  <span class="order-detail-label">Base Amount:</span>
                                  <span class="order-detail-value">$${billing.baseAmount || 'N/A'}</span>
                              </div>
                              <div class="order-detail-item">
                                  <span class="order-detail-label">Total Discount:</span>
                                  <span class="order-detail-value discount">$${billing.totalDiscount || '0'}</span>
                              </div>
                              <div class="order-detail-item">
                                  <span class="order-detail-label">Final Payable:</span>
                                  <span class="order-detail-value amount">$${billing.finalPayable || 'N/A'}</span>
                              </div>
                          </div>
                          
                          <!-- Agent & Model Info Card -->
                          <div class="order-detail-card">
                              <h4>Agent & Model Info</h4>
                              <div class="order-detail-item">
                                  <span class="order-detail-label">Agent ID:</span>
                                  <span class="order-detail-value agent-id">${billing.agentId || 'N/A'}</span>
                              </div>
                              <div class="order-detail-item">
                                  <span class="order-detail-label">Username:</span>
                                  <span class="order-detail-value">${billing.username || 'N/A'}</span>
                              </div>
                              <div class="order-detail-item">
                                  <span class="order-detail-label">Model:</span>
                                  <span class="order-detail-value model">${billing.modelName || 'N/A'}</span>
                              </div>
                              <div class="order-detail-item">
                                  <span class="order-detail-label">Tokens:</span>
                                  <span class="order-detail-value">${formattedTokens}</span>
                              </div>
                              <div class="order-detail-item">
                                  <span class="order-detail-label">Per Token Price:</span>
                                  <span class="order-detail-value">$${billing.perTokenPrice || 'N/A'}</span>
                              </div>
                          </div>
                          
                          <!-- Discount Information Card -->
                          <div class="order-detail-card">
                              <h4>Discount Information</h4>
                              <div class="order-detail-item">
                                  <span class="order-detail-label">Base Discount:</span>
                                  <span class="order-detail-value discount">$${baseDiscount.amount || '0'}</span>
                              </div>
                              <div class="order-detail-item">
                                  <span class="order-detail-label">Base Applied:</span>
                                  <span class="order-detail-value">${baseDiscount.applied ? 'Yes' : 'No'}</span>
                              </div>
                              <div class="order-detail-item">
                                  <span class="order-detail-label">Promo Type:</span>
                                  <span class="order-detail-value">${promo.type || 'N/A'}</span>
                              </div>
                              <div class="order-detail-item">
                                  <span class="order-detail-label">Promo Code Used:</span>
                                  <span class="order-detail-value ${promo.code ? 'promo-code' : ''}">${promo.code || 'None'}</span>
                              </div>
                              <div class="order-detail-item">
                                  <span class="order-detail-label">Promo Discount:</span>
                                  <span class="order-detail-value discount">$${promo.discountAmount || '0'}</span>
                              </div>
                          </div>
                      </div>
                  </div>
              </td>
          </tr>
      `;
  }
});
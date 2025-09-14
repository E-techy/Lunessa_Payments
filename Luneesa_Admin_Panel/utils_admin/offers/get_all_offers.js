// ✅ Fetch all offers (requires valid admin JWT in cookies or Authorization header)
async function fetchAdminOffers() {
    // Show loading state
    showLoadingInTable();
    
    try {
        const response = await fetch("/admin/offers?action=get", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // If you're not storing JWT in cookies, include it here:
                // "Authorization": "Bearer " + yourToken
            },
            credentials: "include", // 🔑 ensures cookies are sent with request
        });

        const result = await response.json();

        if (result.success) {
            console.log("✅ Offers fetched successfully:", result.data);

            if (result.data.length > 0) {
                // Populate the offers data and update the table
                populateOffersFromDatabase(result.data);
                console.log(`📊 Rendered ${result.data.length} offers in the table`);
            } else {
                console.log("ℹ️ No offers found in the database.");
                // Clear the table and show no data message
                populateOffersFromDatabase([]);
            }
        } else {
            console.warn("⚠️ Failed to fetch offers:", result.error);
            // Show error in the table
            showErrorInTable(result.error);
        }
    } catch (err) {
        console.error("❌ Error fetching offers:", err);
        // Show error in the table
        showErrorInTable("Failed to connect to server. Please try again.");
    }
}

// Function to show error message in the table
function showErrorInTable(errorMessage) {
    const tbody = document.getElementById('offersTableBody');
    if (tbody) {
        tbody.innerHTML = '';
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="5" class="text-center p-4 text-danger">❌ Error: ${errorMessage}</td>`;
        tbody.appendChild(row);
    }
}

// Function to show loading state in the table
function showLoadingInTable() {
    const tbody = document.getElementById('offersTableBody');
    if (tbody) {
        tbody.innerHTML = '';
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="5" class="text-center p-4">🔄 Loading offers...</td>';
        tbody.appendChild(row);
    }
}

// Function to refresh offers data
async function refreshOffers() {
    await fetchAdminOffers();
}

// 🚀 Auto-fetch when page loads
document.addEventListener("DOMContentLoaded", fetchAdminOffers);

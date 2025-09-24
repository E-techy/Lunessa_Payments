// Tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Show corresponding panel
            document.getElementById(targetTab).classList.add('active');

            // Trigger specific tab actions
            if (targetTab === 'your-orders') {
                // Trigger orders loading when Your Orders tab is clicked
                if (typeof fetchAndRenderOrders === 'function') {
                    fetchAndRenderOrders();
                }
            }
        });
    });
});
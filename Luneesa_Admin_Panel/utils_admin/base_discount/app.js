// Main application initialization

/**
 * Initialize the entire application
 */
function initializeApp() {
    // Initialize status management
    initializeStatus();
    
    // Load base discount data
    if (typeof fetchBaseDiscount === 'function') {
        fetchBaseDiscount();
    }
    
    // Initialize current status from loaded data
    initializeCurrentStatus();
    
    console.log('Base Discount Admin System initialized successfully');
}

/**
 * Initialize current status based on loaded data
 */
async function initializeCurrentStatus() {
    try {
        // Wait a bit for data to load
        setTimeout(async () => {
            const response = await fetch('/base_discount', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            
            const data = await response.json();
            
            if (data.success && data.data) {
                const toggle = document.querySelector('.toggle-switch');
                const status = data.data.status || 'active';
                
                // Update global currentStatus variable
                if (typeof currentStatus !== 'undefined') {
                    currentStatus = status;
                }
                
                // Update toggle UI to match backend status
                if (toggle) {
                    if (status === 'active') {
                        toggle.classList.add('active');
                    } else {
                        toggle.classList.remove('active');
                    }
                }
                
                console.log(`✅ Status initialized from backend: ${status}`);
            }
        }, 1000);
    } catch (error) {
        console.warn('⚠️ Could not initialize status from backend:', error);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

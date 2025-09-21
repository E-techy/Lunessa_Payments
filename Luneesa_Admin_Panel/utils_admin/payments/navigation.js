// Payment Portal Navigation Controller
class PaymentPortalController {
    constructor() {
        this.activeSection = 'token-allocation';
        this.initialize();
    }

    initialize() {
        this.setupEventHandlers();
        this.activateSection('token-allocation'); // Show Token Allocation by default
    }

    setupEventHandlers() {
        // Bind navigation item click events
        const tokenAllocationNav = document.getElementById('token-allocation-nav-btn');
        const razorpayManagementNav = document.getElementById('razorpay-management-nav-btn');
        const paymentDisputeManagementNav = document.getElementById('payment-dispute-management-nav-btn');

        if (tokenAllocationNav) {
            tokenAllocationNav.addEventListener('click', () => this.activateSection('token-allocation'));
        }

        if (razorpayManagementNav) {
            razorpayManagementNav.addEventListener('click', () => this.activateSection('razorpay-management'));
        }

        if (paymentDisputeManagementNav) {
            paymentDisputeManagementNav.addEventListener('click', () => this.activateSection('payment-dispute-management'));
        }
    }

    activateSection(sectionName) {
        // Update active section
        this.activeSection = sectionName;

        // Remove selection from all portal navigation items
        document.querySelectorAll('.portal-nav-item').forEach(navItem => {
            navItem.classList.remove('nav-selected');
        });

        // Remove active view from all portal section views
        document.querySelectorAll('.portal-section-view').forEach(sectionView => {
            sectionView.classList.remove('view-active');
        });

        // Add selection to clicked navigation item
        const selectedNav = document.getElementById(sectionName + '-nav-btn');
        if (selectedNav) {
            selectedNav.classList.add('nav-selected');
        }

        // Show corresponding section view
        const activeView = document.getElementById(sectionName + '-view');
        if (activeView) {
            activeView.classList.add('view-active');
        }

        // Execute section-specific initialization
        this.handleSectionActivation(sectionName);
    }

    handleSectionActivation(sectionName) {
        switch(sectionName) {
            case 'token-allocation':
                this.initializeTokenAllocation();
                break;
            case 'razorpay-management':
                this.initializeRazorpayManagement();
                break;
            case 'payment-dispute-management':
                this.initializePaymentDisputeManagement();
                break;
            default:
                console.log(`Unknown section: ${sectionName}`);
        }
    }

    initializeTokenAllocation() {
        // Initialize Token Allocation functionality
        console.log('Token Allocation section activated');
        // Add your token allocation specific initialization code here
    }

    initializeRazorpayManagement() {
        // Initialize Razorpay Management functionality
        console.log('Razorpay Management section activated');
        // Add your razorpay management specific initialization code here
    }

    initializePaymentDisputeManagement() {
        // Initialize Payment Dispute Management functionality
        console.log('Payment Dispute Management section activated');
        // Add your payment dispute management specific initialization code here
    }

    getActiveSection() {
        return this.activeSection;
    }
}

// Global instance
window.paymentPortalController = null;

// Initialize when payment portal becomes active
function initializePaymentPortal() {
    if (!window.paymentPortalController) {
        window.paymentPortalController = new PaymentPortalController();
    }
    return window.paymentPortalController;
}

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PaymentPortalController, initializePaymentPortal };
}

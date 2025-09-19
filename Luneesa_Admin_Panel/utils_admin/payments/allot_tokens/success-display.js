/**
 * Token Allocation Success Display
 * Handles the display of agent details when token allocation is successful in single mode only
 */

class TokenAllocationSuccessDisplay {
    constructor() {
        this.init();
    }

    init() {
        // This class will handle success display for single mode only
        console.log('🎉 Success Display initialized');
    }

    /**
     * Show success details for single mode allocation
     * @param {Object} successData - The success response from server
     */
    showSingleModeSuccess(successData) {
        // Only show for single mode, not bulk mode
        const isBulkMode = document.getElementById('bulk-mode-tab')?.classList.contains('token-mode-active');
        if (isBulkMode) {
            console.log('📋 Bulk mode active - skipping success display');
            return;
        }

        console.log('🎯 Showing single mode success display:', successData);

        // Create or get the success display container
        const successContainer = this.createSuccessContainer();
        
        // Extract agent data from the response
        const agentData = successData.data;
        
        // Generate the success display HTML
        const successHTML = this.generateSuccessHTML(agentData);
        
        // Insert the HTML into the container
        successContainer.innerHTML = successHTML;
        
        // Show the container
        successContainer.style.display = 'block';
        
        // Scroll to the success display
        successContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        console.log('✅ Single mode success display shown');
    }

    /**
     * Create or get the success display container
     * @returns {HTMLElement} The success container element
     */
    createSuccessContainer() {
        let container = document.getElementById('token-success-display-container');
        
        if (!container) {
            container = document.createElement('div');
            container.id = 'token-success-display-container';
            container.className = 'token-success-display-wrapper';
            container.style.display = 'none';
            
            // Find the token results section to insert after it
            const resultsSection = document.getElementById('tokenResultsSection');
            if (resultsSection && resultsSection.parentNode) {
                resultsSection.parentNode.insertBefore(container, resultsSection.nextSibling);
            } else {
                // Fallback: append to payments content
                const paymentsContent = document.getElementById('payments-content');
                if (paymentsContent) {
                    paymentsContent.appendChild(container);
                }
            }
        }
        
        return container;
    }

    /**
     * Generate the success display HTML
     * @param {Object} agentData - The agent data from success response
     * @returns {string} HTML string for success display
     */
    generateSuccessHTML(agentData) {
        return `
            <div class="token-success-display-panel" id="tokenSuccessDisplayPanel">
                <div class="success-display-header">
                    <div class="success-header-content">
                        <i class="fas fa-check-circle success-icon"></i>
                        <h4>Token Allocation Successful</h4>
                        <p>Agent details loaded successfully</p>
                    </div>
                    <button type="button" class="success-close-btn" id="successCloseBtn" onclick="window.tokenSuccessDisplay?.hideSuccessDisplay()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <div class="success-display-content">
                    <!-- Agent Information Section -->
                    <div class="success-info-section">
                        <div class="success-section-header">
                            <i class="fas fa-robot"></i>
                            <h5>Agent Information</h5>
                        </div>
                        <div class="success-info-grid">
                            <div class="success-info-item">
                                <span class="success-info-label">Agent ID:</span>
                                <span class="success-info-value agent-id-value">${this.escapeHtml(agentData.agentId)}</span>
                            </div>
                            <div class="success-info-item">
                                <span class="success-info-label">Agent Name:</span>
                                <span class="success-info-value agent-name-value">${this.escapeHtml(agentData.agentName)}</span>
                            </div>
                            <div class="success-info-item">
                                <span class="success-info-label">Username:</span>
                                <span class="success-info-value username-value">${this.escapeHtml(agentData.username)}</span>
                            </div>
                            <div class="success-info-item">
                                <span class="success-info-label">Using Model:</span>
                                <span class="success-info-value model-badge">${this.escapeHtml(agentData.usingModel?.modelName || 'N/A')}</span>
                            </div>
                            <div class="success-info-item">
                                <span class="success-info-label">Available Tokens:</span>
                                <span class="success-info-value tokens-value">${this.formatNumber(agentData.usingModel?.availableTokens || 0)}</span>
                            </div>
                            <div class="success-info-item">
                                <span class="success-info-label">Status:</span>
                                <span class="success-info-value status-badge status-${(agentData.usingModel?.status || 'inactive').toLowerCase()}">${this.capitalizeFirst(agentData.usingModel?.status || 'inactive')}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Company Information Section -->
                    <div class="success-info-section">
                        <div class="success-section-header">
                            <i class="fas fa-building"></i>
                            <h5>Company Information</h5>
                        </div>
                        <div class="success-info-grid">
                            <div class="success-info-item">
                                <span class="success-info-label">Company Name:</span>
                                <span class="success-info-value">${this.escapeHtml(agentData.companyName)}</span>
                            </div>
                            <div class="success-info-item">
                                <span class="success-info-label">Owner:</span>
                                <span class="success-info-value">${this.escapeHtml(agentData.companyOwnerName)}</span>
                            </div>
                            <div class="success-info-item">
                                <span class="success-info-label">Email:</span>
                                <span class="success-info-value company-email-value">${this.escapeHtml(agentData.companyEmail)}</span>
                            </div>
                            <div class="success-info-item">
                                <span class="success-info-label">Support Number:</span>
                                <span class="success-info-value company-phone-value">${this.escapeHtml(agentData.companyHumanServiceNumber)}</span>
                            </div>
                            <div class="success-info-item">
                                <span class="success-info-label">Established:</span>
                                <span class="success-info-value">${this.formatDate(agentData.establishmentDate)}</span>
                            </div>
                            <div class="success-info-item">
                                <span class="success-info-label">Description:</span>
                                <span class="success-info-value company-desc-value">${this.escapeHtml(agentData.companyDescription)}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Token Balances Section -->
                    ${this.generateTokenBalancesSection(agentData.tokenBalances)}

                    <!-- Services/Items Section -->
                    ${this.generateServicesSection(agentData.items)}
                </div>
            </div>
        `;
    }

    /**
     * Generate token balances section HTML
     * @param {Array} tokenBalances - Array of token balance objects
     * @returns {string} HTML string for token balances
     */
    generateTokenBalancesSection(tokenBalances) {
        if (!tokenBalances || tokenBalances.length === 0) {
            return '';
        }

        let balancesHTML = `
            <div class="success-info-section">
                <div class="success-section-header">
                    <i class="fas fa-coins"></i>
                    <h5>Token Balances</h5>
                </div>
                <div class="token-balances-grid">
        `;

        tokenBalances.forEach(balance => {
            balancesHTML += `
                <div class="token-balance-item ${balance.status === 'active' ? 'active-balance' : 'inactive-balance'}">
                    <div class="balance-header">
                        <span class="balance-model-name">${this.escapeHtml(balance.modelName)}</span>
                        <span class="balance-status status-${balance.status}">${this.capitalizeFirst(balance.status)}</span>
                    </div>
                    <div class="balance-tokens">
                        <i class="fas fa-coins"></i>
                        ${this.formatNumber(balance.availableTokens)}
                    </div>
                    <div class="balance-dates">
                        <small>Created: ${this.formatDate(balance.createdAt)}</small>
                        <small>Updated: ${this.formatDate(balance.updatedAt)}</small>
                    </div>
                </div>
            `;
        });

        balancesHTML += `
                </div>
            </div>
        `;

        return balancesHTML;
    }

    /**
     * Generate services section HTML
     * @param {Array} items - Array of service items
     * @returns {string} HTML string for services
     */
    generateServicesSection(items) {
        if (!items || items.length === 0) {
            return '';
        }

        let servicesHTML = `
            <div class="success-info-section">
                <div class="success-section-header">
                    <i class="fas fa-cogs"></i>
                    <h5>Available Services</h5>
                </div>
                <div class="services-list">
        `;

        items.forEach(item => {
            servicesHTML += `
                <div class="service-item-card">
                    <div class="service-header">
                        <h6 class="service-name">${this.escapeHtml(item.itemName)}</h6>
                        <span class="service-code">${this.escapeHtml(item.itemCode)}</span>
                    </div>
                    <div class="service-description">
                        <p>${this.escapeHtml(item.itemInitialWorkingExplanation)}</p>
                    </div>
                    ${item.itemRunningSteps && item.itemRunningSteps.length > 0 ? `
                    <div class="service-steps">
                        <strong>Process:</strong>
                        <ol>
                            ${item.itemRunningSteps.map(step => `<li>${this.escapeHtml(step)}</li>`).join('')}
                        </ol>
                    </div>
                    ` : ''}
                    ${item.commonProblemsSolutions && item.commonProblemsSolutions.length > 0 ? `
                    <div class="service-troubleshooting">
                        <strong>Common Issues:</strong>
                        <div class="troubleshooting-list">
                            ${item.commonProblemsSolutions.map(solution => `
                                <div class="troubleshooting-item">
                                    <span class="problem">${this.escapeHtml(solution.problem)}</span>
                                    <span class="solution">${this.escapeHtml(solution.solution)}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}
                </div>
            `;
        });

        servicesHTML += `
                </div>
            </div>
        `;

        return servicesHTML;
    }

    /**
     * Hide the success display
     */
    hideSuccessDisplay() {
        const container = document.getElementById('token-success-display-container');
        if (container) {
            container.style.display = 'none';
            console.log('❌ Success display hidden');
        }
    }

    /**
     * Clear success display when switching modes or tabs
     */
    clearSuccessDisplay() {
        const container = document.getElementById('token-success-display-container');
        if (container) {
            container.style.display = 'none';
            container.innerHTML = '';
            console.log('🧹 Success display cleared');
        }
    }

    /**
     * Utility function to escape HTML
     * @param {string} text - Text to escape
     * @returns {string} Escaped HTML
     */
    escapeHtml(text) {
        if (text === null || text === undefined) return 'N/A';
        const div = document.createElement('div');
        div.textContent = text.toString();
        return div.innerHTML;
    }

    /**
     * Format number with commas
     * @param {number} num - Number to format
     * @returns {string} Formatted number
     */
    formatNumber(num) {
        if (num === null || num === undefined || isNaN(num)) return '0';
        return Number(num).toLocaleString();
    }

    /**
     * Format date string
     * @param {string} dateString - Date string to format
     * @returns {string} Formatted date
     */
    formatDate(dateString) {
        if (!dateString) return 'N/A';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch {
            return 'N/A';
        }
    }

    /**
     * Capitalize first letter
     * @param {string} str - String to capitalize
     * @returns {string} Capitalized string
     */
    capitalizeFirst(str) {
        if (!str) return 'N/A';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
}

// Initialize success display when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.tokenSuccessDisplay = new TokenAllocationSuccessDisplay();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TokenAllocationSuccessDisplay;
}
/**
 * Token Allocation System - Success Display
 * Handles detailed success response display and visualization
 */

class TokenSuccessDisplay {
    constructor() {
        // Initialize success display
    }
    
    displayTokenAllocationSuccess(data) {
        // Create a success display section in the single mode content
        const singleModeContent = document.getElementById('single-mode-content');
        
        // Remove any existing success display
        const existingDisplay = singleModeContent.querySelector('.token-success-display');
        if (existingDisplay) {
            existingDisplay.remove();
        }
        
        // Create the success display element
        const successDisplay = document.createElement('div');
        successDisplay.className = 'token-success-display';
        successDisplay.innerHTML = this.generateSuccessDisplayHtml(data);
        
        // Insert after the action buttons
        const actionButtons = singleModeContent.querySelector('.token-action-buttons');
        if (actionButtons) {
            actionButtons.insertAdjacentElement('afterend', successDisplay);
        } else {
            singleModeContent.appendChild(successDisplay);
        }
        
        // Scroll to the success display
        successDisplay.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    generateSuccessDisplayHtml(data) {
        // Format the response data for display
        const tokenBalances = data.tokenBalances || [];
        const usingModel = data.usingModel || null;
        const items = data.items || [];
        const userInfo = data;
        
        return `
            <div class="success-display-header">
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h4>Token Allocation Successful!</h4>
                <p>Tokens have been successfully allocated to the user.</p>
            </div>
            
            <div class="success-display-content">
                ${this.generateUserInfoSection(userInfo)}
                ${this.generateTokenBalancesSection(tokenBalances)}
                ${this.generateUsingModelSection(usingModel)}
                ${this.generateItemsSection(items)}
                ${this.generateAccountDetailsSection(userInfo)}
            </div>
            
            <div class="success-display-actions">
                <button type="button" class="token-secondary" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i> Close
                </button>
                <button type="button" class="token-primary" onclick="tokenDataHandler.exportSuccessData()">
                    <i class="fas fa-download"></i> Export Data
                </button>
            </div>
        `;
    }
    
    generateUserInfoSection(userInfo) {
        return `
            <!-- User Information -->
            <div class="success-section">
                <div class="section-header">
                    <i class="fas fa-user"></i>
                    <h5>User Information</h5>
                </div>
                <div class="info-grid">
                    <div class="info-item">
                        <span class="info-label">Company Name:</span>
                        <span class="info-value">${userInfo.companyName || 'N/A'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Owner Name:</span>
                        <span class="info-value">${userInfo.companyOwnerName || 'N/A'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Username:</span>
                        <span class="info-value">${userInfo.username || 'N/A'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Agent ID:</span>
                        <span class="info-value"><code>${userInfo.agentId || 'N/A'}</code></span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Agent Name:</span>
                        <span class="info-value">${userInfo.agentName || 'N/A'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Contact:</span>
                        <span class="info-value">${userInfo.companyHumanServiceNumber || 'N/A'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Email:</span>
                        <span class="info-value">${userInfo.companyEmail || 'N/A'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Establishment Date:</span>
                        <span class="info-value">${userInfo.establishmentDate ? new Date(userInfo.establishmentDate).toLocaleDateString() : 'N/A'}</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    generateTokenBalancesSection(tokenBalances) {
        if (!tokenBalances || tokenBalances.length === 0) return '';
        
        return `
            <!-- Token Balances -->
            <div class="success-section">
                <div class="section-header">
                    <i class="fas fa-coins"></i>
                    <h5>Token Balances</h5>
                </div>
                <div class="token-balances-grid">
                    ${tokenBalances.map(token => `
                        <div class="token-balance-item ${token.status === 'active' ? 'active' : 'inactive'}">
                            <div class="token-model-name">
                                <i class="fas fa-robot"></i>
                                ${token.modelName}
                                ${token.status === 'active' ? '<span class="active-badge">ACTIVE</span>' : '<span class="inactive-badge">INACTIVE</span>'}
                            </div>
                            <div class="token-amount">
                                <span class="token-count">${token.availableTokens.toLocaleString()}</span>
                                <span class="token-label">tokens</span>
                            </div>
                            <div class="token-dates">
                                <div class="token-date">
                                    <small>Created: ${new Date(token.createdAt).toLocaleDateString()}</small>
                                </div>
                                <div class="token-date">
                                    <small>Updated: ${new Date(token.updatedAt).toLocaleDateString()}</small>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    generateUsingModelSection(usingModel) {
        if (!usingModel) return '';
        
        return `
            <!-- Currently Using Model -->
            <div class="success-section">
                <div class="section-header">
                    <i class="fas fa-star"></i>
                    <h5>Currently Using Model</h5>
                </div>
                <div class="using-model-display">
                    <div class="using-model-card active">
                        <div class="model-icon">
                            <i class="fas fa-robot"></i>
                        </div>
                        <div class="model-info">
                            <h6>${usingModel.modelName}</h6>
                            <p class="model-tokens">${usingModel.availableTokens.toLocaleString()} tokens available</p>
                            <p class="model-status">Status: <span class="status-active">${usingModel.status}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    generateItemsSection(items) {
        if (!items || items.length === 0) return '';
        
        return `
            <!-- Available Items -->
            <div class="success-section">
                <div class="section-header">
                    <i class="fas fa-cogs"></i>
                    <h5>Available Items (${items.length})</h5>
                </div>
                <div class="items-grid">
                    ${items.map(item => `
                        <div class="item-card">
                            <div class="item-header">
                                <h6>${item.itemName}</h6>
                                <code class="item-code">${item.itemCode}</code>
                            </div>
                            <p class="item-description">${item.itemInitialWorkingExplanation}</p>
                            
                            <div class="item-details">
                                <div class="item-steps">
                                    <strong>Running Steps:</strong>
                                    <ol>
                                        ${item.itemRunningSteps.map(step => `<li>${step}</li>`).join('')}
                                    </ol>
                                </div>
                                
                                ${item.commonProblemsSolutions && item.commonProblemsSolutions.length > 0 ? `
                                    <div class="item-problems">
                                        <strong>Common Problems & Solutions:</strong>
                                        <ul>
                                            ${item.commonProblemsSolutions.map(ps => `
                                                <li>
                                                    <strong>Problem:</strong> ${ps.problem}<br>
                                                    <strong>Solution:</strong> ${ps.solution}
                                                </li>
                                            `).join('')}
                                        </ul>
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    generateAccountDetailsSection(userInfo) {
        return `
            <!-- Account Details -->
            <div class="success-section">
                <div class="section-header">
                    <i class="fas fa-info-circle"></i>
                    <h5>Account Details</h5>
                </div>
                <div class="account-details">
                    <div class="info-grid">
                        <div class="info-item">
                            <span class="info-label">Account ID:</span>
                            <span class="info-value"><code>${userInfo.id || 'N/A'}</code></span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Created At:</span>
                            <span class="info-value">${userInfo.createdAt ? new Date(userInfo.createdAt).toLocaleString() : 'N/A'}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Last Modified:</span>
                            <span class="info-value">${userInfo.lastModified ? new Date(userInfo.lastModified).toLocaleString() : 'N/A'}</span>
                        </div>
                    </div>
                    
                    ${userInfo.companyDescription ? `
                        <div class="company-description">
                            <strong>Company Description:</strong>
                            <p>${userInfo.companyDescription}</p>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }
    
    hideSuccessDisplay() {
        const successDisplay = document.querySelector('.token-success-display');
        if (successDisplay) {
            successDisplay.remove();
        }
    }
    
    generateCompactSuccessDisplay(data) {
        // Compact version for bulk operations or space-constrained displays
        return `
            <div class="success-display-compact">
                <div class="compact-header">
                    <i class="fas fa-check-circle text-success"></i>
                    <span>Success: ${data.username || 'User'}</span>
                </div>
                <div class="compact-details">
                    <small>Agent: ${data.agentId || 'N/A'} | Model: ${data.modelName || 'N/A'}</small>
                </div>
            </div>
        `;
    }
}

// Initialize success display
let tokenSuccessDisplay;
document.addEventListener('DOMContentLoaded', () => {
    tokenSuccessDisplay = new TokenSuccessDisplay();
});

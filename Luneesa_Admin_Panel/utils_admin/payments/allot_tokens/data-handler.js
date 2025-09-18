/**
 * Token Allocation System - Data Handler
 * Handles form data collection and processing
 */

class TokenDataHandler {
    constructor() {
        // Initialize if needed
    }
    
    getSingleFormData() {
        return {
            username: document.getElementById('singleUsername')?.value?.trim(),
            agentId: document.getElementById('singleAgentId')?.value?.trim(),
            modelName: document.getElementById('singleModelName')?.value,
            tokensToAdd: parseInt(document.getElementById('singleTokensToAdd')?.value) || 0
        };
    }
    
    getBulkFormData() {
        const activeMethod = document.querySelector('.bulk-entry-active')?.id;
        
        if (activeMethod === 'json-import-content') {
            const jsonData = document.getElementById('jsonImportData').value.trim();
            if (!jsonData) return [];
            
            try {
                return JSON.parse(jsonData);
            } catch (error) {
                return [];
            }
        } else {
            // Manual entry
            const users = [];
            document.querySelectorAll('.bulk-user-entry').forEach((entry) => {
                const id = entry.id.split('-')[2];
                const user = {
                    username: document.getElementById(`bulk-username-${id}`)?.value?.trim(),
                    agentId: document.getElementById(`bulk-agentid-${id}`)?.value?.trim(),
                    modelName: document.getElementById(`bulk-modelname-${id}`)?.value,
                    tokensToAdd: parseInt(document.getElementById(`bulk-tokens-${id}`)?.value) || 0
                };
                
                if (user.username && user.agentId && user.modelName) {
                    users.push(user);
                }
            });
            
            return users;
        }
    }
    
    extractUserInfoFromDisplay(display) {
        const userSection = display.querySelector('.success-section');
        const info = {};
        if (userSection) {
            userSection.querySelectorAll('.info-item').forEach(item => {
                const label = item.querySelector('.info-label')?.textContent.replace(':', '');
                const value = item.querySelector('.info-value')?.textContent;
                if (label && value) {
                    info[label] = value;
                }
            });
        }
        return info;
    }
    
    extractTokenBalancesFromDisplay(display) {
        const tokenSection = display.querySelector('.token-balances-grid');
        const balances = [];
        if (tokenSection) {
            tokenSection.querySelectorAll('.token-balance-item').forEach(item => {
                const modelName = item.querySelector('.token-model-name')?.textContent.replace('ACTIVEINACTIVE', '').trim();
                const tokenCount = item.querySelector('.token-count')?.textContent;
                const status = item.classList.contains('active') ? 'active' : 'inactive';
                if (modelName && tokenCount) {
                    balances.push({ modelName, tokenCount, status });
                }
            });
        }
        return balances;
    }
    
    extractUsingModelFromDisplay(display) {
        const usingSection = display.querySelector('.using-model-display');
        if (usingSection) {
            const modelName = usingSection.querySelector('h6')?.textContent;
            const tokens = usingSection.querySelector('.model-tokens')?.textContent;
            const status = usingSection.querySelector('.status-active')?.textContent;
            return { modelName, tokens, status };
        }
        return null;
    }
    
    extractItemsFromDisplay(display) {
        const itemsSection = display.querySelector('.items-grid');
        const items = [];
        if (itemsSection) {
            itemsSection.querySelectorAll('.item-card').forEach(card => {
                const name = card.querySelector('h6')?.textContent;
                const code = card.querySelector('.item-code')?.textContent;
                const description = card.querySelector('.item-description')?.textContent;
                if (name) {
                    items.push({ name, code, description });
                }
            });
        }
        return items;
    }
    
    extractAccountDetailsFromDisplay(display) {
        const accountSection = display.querySelector('.account-details');
        const details = {};
        if (accountSection) {
            accountSection.querySelectorAll('.info-item').forEach(item => {
                const label = item.querySelector('.info-label')?.textContent.replace(':', '');
                const value = item.querySelector('.info-value')?.textContent;
                if (label && value) {
                    details[label] = value;
                }
            });
            const description = accountSection.querySelector('.company-description p')?.textContent;
            if (description) {
                details['Company Description'] = description;
            }
        }
        return details;
    }
    
    exportSuccessData() {
        const successDisplay = document.querySelector('.token-success-display');
        if (!successDisplay) {
            alert('No success data available to export');
            return;
        }
        
        try {
            const exportData = {
                exportTimestamp: new Date().toISOString(),
                userInfo: this.extractUserInfoFromDisplay(successDisplay),
                tokenBalances: this.extractTokenBalancesFromDisplay(successDisplay),
                usingModel: this.extractUsingModelFromDisplay(successDisplay),
                items: this.extractItemsFromDisplay(successDisplay),
                accountDetails: this.extractAccountDetailsFromDisplay(successDisplay)
            };
            
            const dataStr = JSON.stringify(exportData, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = `token-allocation-data-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            
            tokenNotifications.showNotification('Data exported successfully!', 'success');
        } catch (error) {
            console.error('Export error:', error);
            tokenNotifications.showNotification('Failed to export data', 'error');
        }
    }
}

// Initialize data handler
let tokenDataHandler;
document.addEventListener('DOMContentLoaded', () => {
    tokenDataHandler = new TokenDataHandler();
});

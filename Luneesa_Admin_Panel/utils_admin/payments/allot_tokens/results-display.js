/**
 * Token Allocation System - Results Display
 * Handles displaying operation results and status information
 */

class TokenResultsDisplay {
    constructor() {
        // Initialize results display
    }
    
    showResults(results) {
        const resultsSection = document.getElementById('tokenResultsSection');
        const resultsContent = document.getElementById('tokenResultsContent');
        
        if (!results || results.length === 0) {
            resultsContent.innerHTML = '<p>No results to display.</p>';
        } else {
            const tableHtml = `
                <table class="results-table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Agent ID</th>
                            <th>Model Name</th>
                            <th>Status</th>
                            <th>Message</th>
                            <th>Tokens</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${results.map(result => `
                            <tr>
                                <td>${result.username}</td>
                                <td><code>${result.agentId || 'N/A'}</code></td>
                                <td><span class="model-name">${result.modelName || 'N/A'}</span></td>
                                <td class="status-${result.status}">
                                    <i class="fas fa-${result.status === 'success' ? 'check-circle' : result.status === 'error' ? 'times-circle' : 'info-circle'}"></i>
                                    ${result.status.toUpperCase()}
                                </td>
                                <td>${result.message}</td>
                                <td class="token-count ${typeof result.tokensAllocated === 'number' && result.tokensAllocated !== 0 ? (result.tokensAllocated > 0 ? 'positive' : 'negative') : ''}">
                                    ${typeof result.tokensAllocated === 'number' && result.tokensAllocated !== 0 ? 
                                        (result.tokensAllocated > 0 ? '+' : '') + result.tokensAllocated : 
                                        result.tokensAllocated || 'N/A'}
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
            
            resultsContent.innerHTML = tableHtml;
        }
        
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    hideResults() {
        const resultsSection = document.getElementById('tokenResultsSection');
        resultsSection.style.display = 'none';
    }
    
    clearResults() {
        const resultsContent = document.getElementById('tokenResultsContent');
        resultsContent.innerHTML = '';
        this.hideResults();
    }
    
    showResultsSummary(results) {
        if (!results || results.length === 0) return;
        
        const summary = this.calculateResultsSummary(results);
        const summaryHtml = this.generateSummaryHtml(summary);
        
        // Find or create summary section
        let summarySection = document.getElementById('tokenResultsSummary');
        if (!summarySection) {
            summarySection = document.createElement('div');
            summarySection.id = 'tokenResultsSummary';
            summarySection.className = 'token-results-summary';
            
            const resultsSection = document.getElementById('tokenResultsSection');
            if (resultsSection) {
                resultsSection.insertBefore(summarySection, resultsSection.firstChild);
            }
        }
        
        summarySection.innerHTML = summaryHtml;
        summarySection.style.display = 'block';
    }
    
    calculateResultsSummary(results) {
        const summary = {
            total: results.length,
            success: 0,
            error: 0,
            preview: 0,
            tokensAdded: 0,
            tokensDeducted: 0
        };
        
        results.forEach(result => {
            summary[result.status]++;
            
            if (typeof result.tokensAllocated === 'number') {
                if (result.tokensAllocated > 0) {
                    summary.tokensAdded += result.tokensAllocated;
                } else if (result.tokensAllocated < 0) {
                    summary.tokensDeducted += Math.abs(result.tokensAllocated);
                }
            }
        });
        
        return summary;
    }
    
    generateSummaryHtml(summary) {
        return `
            <div class="results-summary-header">
                <h4>Operation Summary</h4>
            </div>
            <div class="results-summary-stats">
                <div class="summary-stat">
                    <span class="stat-label">Total Operations:</span>
                    <span class="stat-value">${summary.total}</span>
                </div>
                <div class="summary-stat success">
                    <span class="stat-label">Successful:</span>
                    <span class="stat-value">${summary.success}</span>
                </div>
                <div class="summary-stat error">
                    <span class="stat-label">Failed:</span>
                    <span class="stat-value">${summary.error}</span>
                </div>
                ${summary.preview > 0 ? `
                <div class="summary-stat preview">
                    <span class="stat-label">Preview:</span>
                    <span class="stat-value">${summary.preview}</span>
                </div>
                ` : ''}
                ${summary.tokensAdded > 0 ? `
                <div class="summary-stat tokens-added">
                    <span class="stat-label">Tokens Added:</span>
                    <span class="stat-value">+${summary.tokensAdded.toLocaleString()}</span>
                </div>
                ` : ''}
                ${summary.tokensDeducted > 0 ? `
                <div class="summary-stat tokens-deducted">
                    <span class="stat-label">Tokens Deducted:</span>
                    <span class="stat-value">-${summary.tokensDeducted.toLocaleString()}</span>
                </div>
                ` : ''}
            </div>
        `;
    }
    
    exportResults(results, filename = 'token-allocation-results') {
        if (!results || results.length === 0) {
            tokenNotifications.showNotification('No results to export', 'warning');
            return;
        }
        
        const exportData = {
            timestamp: new Date().toISOString(),
            summary: this.calculateResultsSummary(results),
            results: results
        };
        
        if (tokenJsonHandler.exportToJson(exportData, filename)) {
            tokenNotifications.showNotification('Results exported successfully!', 'success');
        } else {
            tokenNotifications.showNotification('Failed to export results', 'error');
        }
    }
    
    printResults(results) {
        if (!results || results.length === 0) {
            tokenNotifications.showNotification('No results to print', 'warning');
            return;
        }
        
        const printWindow = window.open('', '_blank');
        const printContent = this.generatePrintContent(results);
        
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    }
    
    generatePrintContent(results) {
        const summary = this.calculateResultsSummary(results);
        
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Token Allocation Results</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    .header { border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
                    .summary { margin-bottom: 20px; padding: 10px; background: #f5f5f5; border-radius: 5px; }
                    .results-table { width: 100%; border-collapse: collapse; }
                    .results-table th, .results-table td { 
                        border: 1px solid #ddd; padding: 8px; text-align: left; 
                    }
                    .results-table th { background: #f2f2f2; }
                    .status-success { color: #10B981; }
                    .status-error { color: #EF4444; }
                    .status-preview { color: #3B82F6; }
                    .positive { color: #10B981; }
                    .negative { color: #EF4444; }
                    @media print {
                        body { margin: 0; }
                        .no-print { display: none; }
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>Token Allocation Results</h1>
                    <p>Generated on: ${new Date().toLocaleString()}</p>
                </div>
                
                <div class="summary">
                    <h2>Summary</h2>
                    <p>Total Operations: ${summary.total} | 
                       Successful: ${summary.success} | 
                       Failed: ${summary.error}
                       ${summary.tokensAdded > 0 ? ` | Tokens Added: +${summary.tokensAdded.toLocaleString()}` : ''}
                       ${summary.tokensDeducted > 0 ? ` | Tokens Deducted: -${summary.tokensDeducted.toLocaleString()}` : ''}
                    </p>
                </div>
                
                <table class="results-table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Agent ID</th>
                            <th>Model Name</th>
                            <th>Status</th>
                            <th>Message</th>
                            <th>Tokens</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${results.map(result => `
                            <tr>
                                <td>${result.username}</td>
                                <td>${result.agentId || 'N/A'}</td>
                                <td>${result.modelName || 'N/A'}</td>
                                <td class="status-${result.status}">${result.status.toUpperCase()}</td>
                                <td>${result.message}</td>
                                <td class="${typeof result.tokensAllocated === 'number' && result.tokensAllocated !== 0 ? (result.tokensAllocated > 0 ? 'positive' : 'negative') : ''}">
                                    ${typeof result.tokensAllocated === 'number' && result.tokensAllocated !== 0 ? 
                                        (result.tokensAllocated > 0 ? '+' : '') + result.tokensAllocated : 
                                        result.tokensAllocated || 'N/A'}
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </body>
            </html>
        `;
    }
}

// Initialize results display
let tokenResults;
document.addEventListener('DOMContentLoaded', () => {
    tokenResults = new TokenResultsDisplay();
});

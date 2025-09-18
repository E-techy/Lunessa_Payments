/**
 * Token Allocation System - Results Handler
 * Handles display and management of allocation results
 */

class TokenResultsHandler {
    constructor() {
        this.init();
    }
    
    init() {
        // Any initialization needed for results handling
    }
    
    showResults(results) {
        const resultsSection = document.getElementById('tokenResultsSection');
        const resultsContent = document.getElementById('tokenResultsContent');
        
        if (!resultsSection || !resultsContent) {
            console.warn('Results display elements not found');
            return;
        }
        
        if (!results || results.length === 0) {
            resultsContent.innerHTML = '<p class="no-results">No results to display.</p>';
        } else {
            const tableHtml = this.generateResultsTable(results);
            resultsContent.innerHTML = tableHtml;
        }
        
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    generateResultsTable(results) {
        return `
            <div class="results-table-container">
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
                        ${results.map(result => this.generateResultRow(result)).join('')}
                    </tbody>
                </table>
            </div>
            <div class="results-summary">
                ${this.generateResultsSummary(results)}
            </div>
        `;
    }
    
    generateResultRow(result) {
        const statusIcon = this.getStatusIcon(result.status);
        const tokenDisplay = this.formatTokenDisplay(result.tokensAllocated);
        
        return `
            <tr class="result-row result-${result.status}">
                <td class="username-cell">
                    <span class="username">${this.escapeHtml(result.username)}</span>
                </td>
                <td class="agent-id-cell">
                    <code class="agent-id">${this.escapeHtml(result.agentId || 'N/A')}</code>
                </td>
                <td class="model-name-cell">
                    <span class="model-name">${this.escapeHtml(result.modelName || 'N/A')}</span>
                </td>
                <td class="status-cell status-${result.status}">
                    <i class="fas ${statusIcon}"></i>
                    <span class="status-text">${result.status.toUpperCase()}</span>
                </td>
                <td class="message-cell">
                    <span class="message">${this.escapeHtml(result.message)}</span>
                </td>
                <td class="token-count-cell">
                    ${tokenDisplay}
                </td>
            </tr>
        `;
    }
    
    getStatusIcon(status) {
        const icons = {
            'success': 'fa-check-circle',
            'error': 'fa-times-circle',
            'warning': 'fa-exclamation-triangle',
            'preview': 'fa-info-circle',
            'pending': 'fa-clock'
        };
        
        return icons[status] || 'fa-question-circle';
    }
    
    formatTokenDisplay(tokensAllocated) {
        if (typeof tokensAllocated === 'number' && tokensAllocated !== 0) {
            const className = tokensAllocated > 0 ? 'positive' : 'negative';
            const displayValue = tokensAllocated > 0 ? `+${tokensAllocated}` : tokensAllocated;
            return `<span class="token-count ${className}">${displayValue}</span>`;
        } else {
            return `<span class="token-count neutral">${tokensAllocated || 'N/A'}</span>`;
        }
    }
    
    generateResultsSummary(results) {
        const summary = this.calculateSummary(results);
        
        return `
            <div class="summary-stats">
                <div class="stat-item">
                    <span class="stat-label">Total:</span>
                    <span class="stat-value">${summary.total}</span>
                </div>
                <div class="stat-item success">
                    <span class="stat-label">Successful:</span>
                    <span class="stat-value">${summary.successful}</span>
                </div>
                <div class="stat-item error">
                    <span class="stat-label">Failed:</span>
                    <span class="stat-value">${summary.failed}</span>
                </div>
                ${summary.previews > 0 ? `
                <div class="stat-item preview">
                    <span class="stat-label">Previewed:</span>
                    <span class="stat-value">${summary.previews}</span>
                </div>
                ` : ''}
            </div>
        `;
    }
    
    calculateSummary(results) {
        return {
            total: results.length,
            successful: results.filter(r => r.status === 'success').length,
            failed: results.filter(r => r.status === 'error').length,
            previews: results.filter(r => r.status === 'preview').length,
            warnings: results.filter(r => r.status === 'warning').length
        };
    }
    
    hideResults() {
        const resultsSection = document.getElementById('tokenResultsSection');
        if (resultsSection) {
            resultsSection.style.display = 'none';
        }
    }
    
    clearResults() {
        const resultsContent = document.getElementById('tokenResultsContent');
        if (resultsContent) {
            resultsContent.innerHTML = '';
        }
        this.hideResults();
    }
    
    exportResults(results, format = 'csv') {
        if (!results || results.length === 0) {
            if (typeof tokenNotificationHandler !== 'undefined') {
                tokenNotificationHandler.showNotification('No results to export', 'warning');
            }
            return;
        }
        
        switch (format.toLowerCase()) {
            case 'csv':
                this.exportAsCSV(results);
                break;
            case 'json':
                this.exportAsJSON(results);
                break;
            default:
                this.exportAsCSV(results);
        }
    }
    
    exportAsCSV(results) {
        const headers = ['Username', 'Agent ID', 'Model Name', 'Status', 'Message', 'Tokens Allocated'];
        const csvContent = [
            headers.join(','),
            ...results.map(result => [
                this.escapeCsvField(result.username),
                this.escapeCsvField(result.agentId || 'N/A'),
                this.escapeCsvField(result.modelName || 'N/A'),
                this.escapeCsvField(result.status),
                this.escapeCsvField(result.message),
                this.escapeCsvField(result.tokensAllocated?.toString() || 'N/A')
            ].join(','))
        ].join('\n');
        
        this.downloadFile(csvContent, 'token-allocation-results.csv', 'text/csv');
    }
    
    exportAsJSON(results) {
        const jsonContent = JSON.stringify(results, null, 2);
        this.downloadFile(jsonContent, 'token-allocation-results.json', 'application/json');
    }
    
    downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        if (typeof tokenNotificationHandler !== 'undefined') {
            tokenNotificationHandler.showNotification(`Results exported as ${filename}`, 'success');
        }
    }
    
    escapeCsvField(field) {
        if (field === null || field === undefined) {
            return '';
        }
        
        const stringField = field.toString();
        
        // If field contains comma, newline, or quote, wrap in quotes and escape internal quotes
        if (stringField.includes(',') || stringField.includes('\n') || stringField.includes('"')) {
            return `"${stringField.replace(/"/g, '""')}"`;
        }
        
        return stringField;
    }
    
    escapeHtml(text) {
        if (text === null || text === undefined) {
            return '';
        }
        
        const div = document.createElement('div');
        div.textContent = text.toString();
        return div.innerHTML;
    }
    
    addExportButtons() {
        const resultsSection = document.getElementById('tokenResultsSection');
        if (!resultsSection) return;
        
        // Check if export buttons already exist
        if (resultsSection.querySelector('.export-buttons')) return;
        
        const exportButtonsHtml = `
            <div class="export-buttons">
                <button type="button" class="export-btn" onclick="tokenResultsHandler.exportLastResults('csv')">
                    <i class="fas fa-file-csv"></i> Export CSV
                </button>
                <button type="button" class="export-btn" onclick="tokenResultsHandler.exportLastResults('json')">
                    <i class="fas fa-file-code"></i> Export JSON
                </button>
            </div>
        `;
        
        resultsSection.insertAdjacentHTML('beforeend', exportButtonsHtml);
    }
    
    // Store last results for export functionality
    storeResults(results) {
        this.lastResults = results;
    }
    
    exportLastResults(format) {
        if (this.lastResults) {
            this.exportResults(this.lastResults, format);
        }
    }
}

// Initialize results handler when DOM is loaded
let tokenResultsHandler;
document.addEventListener('DOMContentLoaded', () => {
    tokenResultsHandler = new TokenResultsHandler();
});

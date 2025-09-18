/**
 * Token Allocation System - Results Handler Module
 * Handles display and management of operation results
 */

class TokenResultsHandler {
    constructor() {
        this.currentResults = [];
        this.init();
    }
    
    init() {
        this.bindEvents();
    }
    
    bindEvents() {
        // Results export functionality
        const exportBtn = document.getElementById('export-results-btn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportResults());
        }
        
        // Results clear functionality
        const clearBtn = document.getElementById('clear-results-btn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.hideResults());
        }
    }
    
    showResults(results) {
        this.currentResults = results;
        const resultsSection = document.getElementById('tokenResultsSection');
        const resultsContent = document.getElementById('tokenResultsContent');
        
        if (!results || results.length === 0) {
            resultsContent.innerHTML = '<p class="no-results">No results to display.</p>';
        } else {
            const tableHtml = this.generateResultsTable(results);
            resultsContent.innerHTML = tableHtml;
        }
        
        if (resultsSection) {
            resultsSection.style.display = 'block';
            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        
        // Show export button if results exist
        this.toggleExportButton(results && results.length > 0);
    }
    
    generateResultsTable(results) {
        const stats = this.calculateStats(results);
        
        return `
            <div class="results-summary">
                <div class="results-stats">
                    <div class="stat-item success">
                        <span class="stat-label">Successful:</span>
                        <span class="stat-value">${stats.successful}</span>
                    </div>
                    <div class="stat-item error">
                        <span class="stat-label">Failed:</span>
                        <span class="stat-value">${stats.failed}</span>
                    </div>
                    <div class="stat-item preview">
                        <span class="stat-label">Previewed:</span>
                        <span class="stat-value">${stats.previewed}</span>
                    </div>
                    <div class="stat-item total">
                        <span class="stat-label">Total:</span>
                        <span class="stat-value">${stats.total}</span>
                    </div>
                </div>
            </div>
            <div class="results-table-container">
                <table class="results-table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Status</th>
                            <th>Message</th>
                            <th>Tokens</th>
                            <th>Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${results.map(result => `
                            <tr class="result-row ${result.status}">
                                <td class="username">${this.escapeHtml(result.username)}</td>
                                <td class="status">
                                    <span class="status-badge ${result.status}">
                                        ${this.getStatusIcon(result.status)}
                                        ${result.status.toUpperCase()}
                                    </span>
                                </td>
                                <td class="message">${this.escapeHtml(result.message)}</td>
                                <td class="tokens ${this.getTokenClass(result.tokensAllocated)}">
                                    ${this.formatTokens(result.tokensAllocated)}
                                </td>
                                <td class="timestamp">${this.formatTimestamp(result.timestamp)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }
    
    calculateStats(results) {
        return {
            successful: results.filter(r => r.status === 'success').length,
            failed: results.filter(r => r.status === 'error').length,
            previewed: results.filter(r => r.status === 'preview').length,
            total: results.length
        };
    }
    
    getStatusIcon(status) {
        const icons = {
            success: '<i class="fas fa-check-circle"></i>',
            error: '<i class="fas fa-times-circle"></i>',
            preview: '<i class="fas fa-eye"></i>',
            pending: '<i class="fas fa-clock"></i>'
        };
        return icons[status] || '<i class="fas fa-question-circle"></i>';
    }
    
    getTokenClass(tokens) {
        if (tokens > 0) return 'positive';
        if (tokens < 0) return 'negative';
        return 'neutral';
    }
    
    formatTokens(tokens) {
        if (tokens === 0) return '0';
        return tokens > 0 ? `+${tokens}` : `${tokens}`;
    }
    
    formatTimestamp(timestamp) {
        if (!timestamp) {
            return new Date().toLocaleString();
        }
        return new Date(timestamp).toLocaleString();
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    hideResults() {
        const resultsSection = document.getElementById('tokenResultsSection');
        if (resultsSection) {
            resultsSection.style.display = 'none';
        }
        this.currentResults = [];
        this.toggleExportButton(false);
    }
    
    toggleExportButton(show) {
        const exportBtn = document.getElementById('export-results-btn');
        if (exportBtn) {
            exportBtn.style.display = show ? 'inline-block' : 'none';
        }
    }
    
    exportResults() {
        if (!this.currentResults || this.currentResults.length === 0) {
            if (typeof tokenNotificationHandler !== 'undefined') {
                tokenNotificationHandler.showWarning('No results to export.');
            } else {
                alert('No results to export.');
            }
            return;
        }
        
        const exportData = this.prepareExportData();
        this.downloadAsCSV(exportData);
    }
    
    prepareExportData() {
        const headers = ['Username', 'Status', 'Message', 'Tokens Allocated', 'Timestamp'];
        const rows = this.currentResults.map(result => [
            result.username,
            result.status,
            result.message,
            result.tokensAllocated,
            this.formatTimestamp(result.timestamp)
        ]);
        
        return [headers, ...rows];
    }
    
    downloadAsCSV(data) {
        const csvContent = data.map(row => 
            row.map(cell => `"${String(cell).replace(/"/g, '""')}`).join(',')
        ).join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', `token-allocation-results-${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        if (typeof tokenNotificationHandler !== 'undefined') {
            tokenNotificationHandler.showSuccess('Results exported successfully!');
        }
    }
    
    exportAsJSON() {
        if (!this.currentResults || this.currentResults.length === 0) {
            if (typeof tokenNotificationHandler !== 'undefined') {
                tokenNotificationHandler.showWarning('No results to export.');
            } else {
                alert('No results to export.');
            }
            return;
        }
        
        const exportData = {
            exportDate: new Date().toISOString(),
            totalResults: this.currentResults.length,
            summary: this.calculateStats(this.currentResults),
            results: this.currentResults
        };
        
        const jsonContent = JSON.stringify(exportData, null, 2);
        const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', `token-allocation-results-${new Date().toISOString().split('T')[0]}.json`);
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        if (typeof tokenNotificationHandler !== 'undefined') {
            tokenNotificationHandler.showSuccess('Results exported as JSON successfully!');
        }
    }
    
    addResult(result) {
        if (!result.timestamp) {
            result.timestamp = new Date().toISOString();
        }
        
        this.currentResults.push(result);
        this.showResults(this.currentResults);
    }
    
    updateResult(username, updatedData) {
        const resultIndex = this.currentResults.findIndex(r => r.username === username);
        if (resultIndex !== -1) {
            this.currentResults[resultIndex] = { ...this.currentResults[resultIndex], ...updatedData };
            this.showResults(this.currentResults);
        }
    }
    
    removeResult(username) {
        this.currentResults = this.currentResults.filter(r => r.username !== username);
        this.showResults(this.currentResults);
    }
    
    clearResults() {
        this.currentResults = [];
        this.hideResults();
    }
    
    getResults() {
        return [...this.currentResults];
    }
    
    hasResults() {
        return this.currentResults.length > 0;
    }
    
    getResultsCount() {
        return this.currentResults.length;
    }
    
    getSuccessfulResults() {
        return this.currentResults.filter(r => r.status === 'success');
    }
    
    getFailedResults() {
        return this.currentResults.filter(r => r.status === 'error');
    }
    
    getPreviewResults() {
        return this.currentResults.filter(r => r.status === 'preview');
    }
}

// Initialize results handler
let tokenResultsHandler;
document.addEventListener('DOMContentLoaded', () => {
    tokenResultsHandler = new TokenResultsHandler();
});

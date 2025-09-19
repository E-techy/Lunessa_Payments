/**
 * Token Allocation Event Handlers
 * Handles all button clicks and form submissions for token allocation
 */

class TokenAllocationEventHandlers {
    constructor() {
        this.currentRequest = null; // Track current request for cancellation
        this.lastResults = null; // Store last results for export
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        // Single mode events
        this.bindSingleModeEvents();
        
        // Bulk mode events
        this.bindBulkModeEvents();
        
        // JSON import events
        this.bindJSONImportEvents();
        
        // Results events
        this.bindResultsEvents();
    }

    bindSingleModeEvents() {
        // Single allocation button
        const singleAllocateBtn = document.getElementById('single-allocate-btn');
        if (singleAllocateBtn) {
            singleAllocateBtn.addEventListener('click', () => this.handleSingleAllocation());
        }

        // Single clear button
        const singleClearBtn = document.getElementById('single-clear-btn');
        if (singleClearBtn) {
            singleClearBtn.addEventListener('click', () => this.handleSingleClear());
        }
    }

    bindBulkModeEvents() {
        // Bulk allocation button
        const bulkAllocateBtn = document.getElementById('bulk-allocate-btn');
        if (bulkAllocateBtn) {
            bulkAllocateBtn.addEventListener('click', () => this.handleBulkAllocation());
        }

        // Bulk preview button
        const bulkPreviewBtn = document.getElementById('bulk-preview-btn');
        if (bulkPreviewBtn) {
            bulkPreviewBtn.addEventListener('click', () => this.handleBulkPreview());
        }
    }

    bindJSONImportEvents() {
        // Validate JSON button
        const validateJsonBtn = document.getElementById('validate-json-btn');
        if (validateJsonBtn) {
            validateJsonBtn.addEventListener('click', () => this.handleJSONValidation());
        }

        // Clear JSON button
        const clearJsonBtn = document.getElementById('clear-json-btn');
        if (clearJsonBtn) {
            clearJsonBtn.addEventListener('click', () => this.handleJSONClear());
        }
    }

    bindResultsEvents() {
        // Any results-related events can be added here
    }

    /**
     * Handle single token allocation
     */
    async handleSingleAllocation() {
        console.log('🎯 Starting single allocation...');
        
        const button = document.getElementById('single-allocate-btn');
        if (!button) return;

        try {
            // Validate form
            const formData = window.tokenValidator?.getSingleFormData();
            if (!formData) {
                this.showNotification('Please correct the form errors before submitting', 'error');
                return;
            }

            console.log('📝 Form data validated:', formData);

            // Update button state
            this.setButtonLoading(button, true);
            
            // Make API call
            const result = await window.tokenAPI.allocateTokensSingle(formData);
            
            console.log('✅ API response:', result);

            // Show results
            if (result.success) {
                // Clear any previous error displays before showing success
                this.hideResultsSection();
                
                // Show the success display (only for single mode)
                if (window.tokenSuccessDisplay && result.data) {
                    window.tokenSuccessDisplay.showSingleModeSuccess(result);
                }
                
                this.showResults({
                    success: true,
                    mode: 'single',
                    data: [{ ...formData, result }]
                });
                this.showNotification('Tokens allocated successfully!', 'success');
                
                // Clear form on success
                this.handleSingleClear();
            } else {
                // Clear any previous success display before showing error
                if (window.tokenSuccessDisplay) {
                    window.tokenSuccessDisplay.hideSuccessDisplay();
                }
                
                // Show error in results table format like bulk mode
                this.showResults({
                    success: false,
                    mode: 'single',
                    data: [{
                        ...formData,
                        success: false,
                        error: result.error || 'Allocation failed',
                        message: result.error || 'Allocation failed'
                    }]
                });
                this.showNotification(result.error || 'Allocation failed', 'error');
            }

        } catch (error) {
            console.error('❌ Single allocation error:', error);
            
            // Clear any previous success display before showing error
            if (window.tokenSuccessDisplay) {
                window.tokenSuccessDisplay.hideSuccessDisplay();
            }
            
            // Show error in results table format
            const formData = window.tokenValidator?.getSingleFormData();
            if (formData) {
                this.showResults({
                    success: false,
                    mode: 'single',
                    data: [{
                        ...formData,
                        success: false,
                        error: error.message || 'Network or server error',
                        message: error.message || 'An error occurred during allocation'
                    }]
                });
            }
            
            this.showNotification(error.message || 'An error occurred during allocation', 'error');
        } finally {
            this.setButtonLoading(button, false);
        }
    }

    /**
     * Handle bulk token allocation
     */
    async handleBulkAllocation() {
        console.log('🎯 Starting bulk allocation...');
        
        const button = document.getElementById('bulk-allocate-btn');
        if (!button) return;

        try {
            let bulkData;
            
            // Check which bulk method is active
            const manualEntryActive = document.getElementById('manual-entry-content')?.classList.contains('bulk-entry-active');
            
            if (manualEntryActive) {
                // Get data from manual entry forms
                bulkData = window.tokenValidator?.getBulkFormData();
                if (!bulkData) {
                    this.showNotification('Please correct the form errors before submitting', 'error');
                    return;
                }
            } else {
                // Get data from JSON import
                const jsonData = this.getValidatedJSONData();
                if (!jsonData) {
                    this.showNotification('Please validate JSON data before submitting', 'error');
                    return;
                }
                bulkData = jsonData;
            }

            if (!bulkData || bulkData.length === 0) {
                this.showNotification('No valid data found for allocation', 'error');
                return;
            }
            
            // Additional client-side validation
            const invalidEntries = bulkData.filter(entry => {
                return !entry.username || !entry.agentId || !entry.modelName || 
                       entry.tokensToAdd === 0 || isNaN(entry.tokensToAdd);
            });
            
            if (invalidEntries.length > 0) {
                this.showNotification(`${invalidEntries.length} entries have invalid data. Please check your inputs.`, 'error');
                return;
            }

            console.log('📝 Bulk data validated:', bulkData);

            // Update button state
            this.setButtonLoading(button, true);
            
            // Make API call
            const result = await window.tokenAPI.allocateTokensBulk(bulkData);
            
            console.log('✅ API response:', result);

            // Check if the overall operation was successful
            if (result.success === false) {
                // Show error notification
                this.showNotification(result.error || 'Bulk allocation failed', 'error');
                
                // Still show results if we have them (for partial failures)
                if (result.results && result.results.length > 0) {
                    this.showResults({
                        success: false,
                        mode: 'bulk',
                        data: result.results,
                        summary: this.generateBulkSummary(result.results)
                    });
                }
                return;
            }

            // Show results for successful operation
            const results = result.results || [];
            const summary = this.generateBulkSummary(results);
            
            this.showResults({
                success: true,
                mode: 'bulk',
                data: results,
                summary: summary
            });
            
            // Show appropriate notification based on results
            if (summary.failed > 0) {
                this.showNotification(`Bulk allocation completed with ${summary.failed} failures`, 'warning');
            } else {
                this.showNotification('Bulk allocation completed successfully!', 'success');
                
                // AUTO-RESET: Clear the bulk form only if ALL allocations were successful
                this.autoClearBulkFormOnSuccess();
            }

        } catch (error) {
            console.error('❌ Bulk allocation error:', error);
            this.showNotification(error.message || 'An error occurred during bulk allocation', 'error');
        } finally {
            this.setButtonLoading(button, false);
        }
    }

    /**
     * Auto-clear bulk form when all allocations are successful
     */
    autoClearBulkFormOnSuccess() {
        console.log('🧹 Auto-clearing bulk form after successful allocation...');
        
        try {
            // Check which bulk method is active
            const manualEntryActive = document.getElementById('manual-entry-content')?.classList.contains('bulk-entry-active');
            
            if (manualEntryActive) {
                // Clear manual entry form by clicking the clear all button
                const clearAllBtn = document.getElementById('clear-all-bulk-btn');
                if (clearAllBtn) {
                    clearAllBtn.click();
                    console.log('✅ Manual entry form cleared via Clear All button');
                } else {
                    console.warn('⚠️ Clear all button not found, trying alternative method');
                    // Alternative: Direct clear via tokenAllocation system
                    if (typeof tokenAllocation !== 'undefined') {
                        tokenAllocation.clearAllBulkUsers();
                        console.log('✅ Manual entry form cleared via tokenAllocation');
                    }
                }
            } else {
                // Clear JSON import form
                const textarea = document.getElementById('jsonImportData');
                const resultDiv = document.getElementById('jsonValidationResult');
                
                if (textarea) textarea.value = '';
                if (resultDiv) resultDiv.style.display = 'none';
                console.log('✅ JSON import form cleared');
            }
            
            // Show additional notification about auto-clear
            setTimeout(() => {
                this.showNotification('Form automatically cleared after successful allocation', 'info');
            }, 1500);
            
        } catch (error) {
            console.error('❌ Error auto-clearing bulk form:', error);
        }
    }

    /**
     * Handle bulk preview (validation without submission)
     */
    async handleBulkPreview() {
        console.log('👁️ Starting bulk preview...');
        
        try {
            let bulkData;
            
            // Check which bulk method is active
            const manualEntryActive = document.getElementById('manual-entry-content')?.classList.contains('bulk-entry-active');
            
            if (manualEntryActive) {
                bulkData = window.tokenValidator?.getBulkFormData();
                if (!bulkData) {
                    this.showNotification('Please correct the form errors before preview', 'error');
                    return;
                }
            } else {
                const jsonData = this.getValidatedJSONData();
                if (!jsonData) {
                    this.showNotification('Please validate JSON data before preview', 'error');
                    return;
                }
                bulkData = jsonData;
            }

            // Create preview results
            const previewResults = bulkData.map(entry => ({
                ...entry,
                result: {
                    success: true,
                    message: 'Preview - validation passed',
                    status: 'preview'
                }
            }));

            this.showResults({
                success: true,
                mode: 'preview',
                data: previewResults,
                summary: this.generateBulkSummary(previewResults, true)
            });

            this.showNotification('Preview generated successfully!', 'success');

        } catch (error) {
            console.error('❌ Bulk preview error:', error);
            this.showNotification(error.message || 'An error occurred during preview', 'error');
        }
    }

    /**
     * Handle JSON validation
     */
    handleJSONValidation() {
        const textarea = document.getElementById('jsonImportData');
        const resultDiv = document.getElementById('jsonValidationResult');
        
        if (!textarea || !resultDiv) return;

        const jsonText = textarea.value.trim();
        if (!jsonText) {
            this.showJSONValidationResult('Please enter JSON data to validate', false);
            return;
        }

        const validation = window.tokenAPI.validateBulkJSON(jsonText);
        
        if (validation.success) {
            this.showJSONValidationResult(`✅ Valid JSON with ${validation.data.length} entries`, true);
            console.log('📝 Validated JSON data:', validation.data);
        } else {
            this.showJSONValidationResult(`❌ ${validation.error}`, false);
        }
    }

    /**
     * Get validated JSON data
     */
    getValidatedJSONData() {
        const textarea = document.getElementById('jsonImportData');
        if (!textarea) return null;

        const jsonText = textarea.value.trim();
        if (!jsonText) return null;

        const validation = window.tokenAPI.validateBulkJSON(jsonText);
        return validation.success ? validation.data : null;
    }

    /**
     * Show JSON validation result
     */
    showJSONValidationResult(message, isSuccess) {
        const resultDiv = document.getElementById('jsonValidationResult');
        if (!resultDiv) return;

        resultDiv.style.display = 'block';
        resultDiv.className = `json-validation-result ${isSuccess ? 'success' : 'error'}`;
        resultDiv.innerHTML = `<div>${message}</div>`;
    }

    /**
     * Handle JSON clear
     */
    handleJSONClear() {
        const textarea = document.getElementById('jsonImportData');
        const resultDiv = document.getElementById('jsonValidationResult');
        
        if (textarea) textarea.value = '';
        if (resultDiv) resultDiv.style.display = 'none';
        
        this.showNotification('JSON data cleared', 'info');
    }

    /**
     * Handle single form clear
     */
    handleSingleClear() {
        const form = document.getElementById('singleTokenForm');
        if (form) {
            form.reset();
            window.tokenValidator?.clearValidations(form);
        }
        this.showNotification('Form cleared', 'info');
    }

    /**
     * Set button loading state
     */
    setButtonLoading(button, loading) {
        if (!button) return;

        if (loading) {
            button.classList.add('token-btn-loading');
            button.disabled = true;
            button.setAttribute('data-original-text', button.innerHTML);
        } else {
            button.classList.remove('token-btn-loading');
            button.disabled = false;
            const originalText = button.getAttribute('data-original-text');
            if (originalText) {
                button.innerHTML = originalText;
            }
        }
    }

    /**
     * Show results section
     */
    showResults(resultsData) {
        const resultsSection = document.getElementById('tokenResultsSection');
        const resultsContent = document.getElementById('tokenResultsContent');
        
        if (!resultsSection || !resultsContent) return;

        // Store results for export
        this.lastResults = resultsData;

        // Generate HTML content
        let html = '';
        
        if (resultsData.summary) {
            html += this.generateSummaryHTML(resultsData.summary);
        }
        
        html += this.generateResultsTableHTML(resultsData);

        resultsContent.innerHTML = html;
        resultsSection.style.display = 'block';
        
        // Scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    /**
     * Hide results section
     */
    hideResultsSection() {
        const resultsSection = document.getElementById('tokenResultsSection');
        if (resultsSection) {
            resultsSection.style.display = 'none';
        }
    }

    /**
     * Generate summary HTML for bulk operations
     */
    generateSummaryHTML(summary) {
        return `
            <div class="token-results-summary" id="tokenResultsSummary">
                <div class="results-summary-container">
                    <div class="results-summary-header">
                        <i class="fas fa-chart-bar"></i>
                        <h4>Operation Summary</h4>
                    </div>
                    <div class="results-summary-stats">
                        <div class="summary-stat total">
                            <div class="stat-icon"><i class="fas fa-users"></i></div>
                            <div class="stat-content">
                                <span class="stat-value">${summary.total}</span>
                                <span class="stat-label">Total Entries</span>
                            </div>
                        </div>
                        <div class="summary-stat success">
                            <div class="stat-icon"><i class="fas fa-check"></i></div>
                            <div class="stat-content">
                                <span class="stat-value">${summary.successful}</span>
                                <span class="stat-label">Successful</span>
                            </div>
                        </div>
                        <div class="summary-stat error">
                            <div class="stat-icon"><i class="fas fa-times"></i></div>
                            <div class="stat-content">
                                <span class="stat-value">${summary.failed}</span>
                                <span class="stat-label">Failed</span>
                            </div>
                        </div>
                        ${summary.tokensAdded ? `
                        <div class="summary-stat tokens-added">
                            <div class="stat-icon"><i class="fas fa-plus"></i></div>
                            <div class="stat-content">
                                <span class="stat-value">${summary.tokensAdded}</span>
                                <span class="stat-label">Tokens Added</span>
                            </div>
                        </div>
                        ` : ''}
                        ${summary.tokensDeducted ? `
                        <div class="summary-stat tokens-deducted">
                            <div class="stat-icon"><i class="fas fa-minus"></i></div>
                            <div class="stat-content">
                                <span class="stat-value">${Math.abs(summary.tokensDeducted)}</span>
                                <span class="stat-label">Tokens Deducted</span>
                            </div>
                        </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Generate results table HTML
     */
    generateResultsTableHTML(resultsData) {
        const { data, mode } = resultsData;
        
        if (!data || data.length === 0) {
            return `
                <div class="no-results-message">
                    <p>No results to display</p>
                </div>
            `;
        }

        let tableHTML = `
            <div class="results-table-container">
                <table class="results-table">
                    <thead>
                        <tr>
                            <th><i class="fas fa-user"></i> Username</th>
                            <th><i class="fas fa-robot"></i> Agent ID</th>
                            <th><i class="fas fa-brain"></i> Model</th>
                            <th><i class="fas fa-coins"></i> Tokens</th>
                            <th><i class="fas fa-info-circle"></i> Status</th>
                            <th><i class="fas fa-comment"></i> Message</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        data.forEach((entry, index) => {
            // Handle both old format (entry.result) and new format (entry.success directly)
            const isSuccessful = entry.success !== undefined ? entry.success : (entry.result && entry.result.success);
            const errorMessage = entry.error || (entry.result && entry.result.error);
            const successMessage = entry.message || (entry.result && entry.result.message);
            
            const status = isSuccessful ? (mode === 'preview' ? 'preview' : 'success') : 'error';
            const statusText = isSuccessful ? (mode === 'preview' ? 'Preview' : 'Success') : 'Error';
            const tokenClass = entry.tokensToAdd > 0 ? 'positive' : entry.tokensToAdd < 0 ? 'negative' : 'neutral';

            tableHTML += `
                <tr>
                    <td class="username-cell">
                        <strong>${this.escapeHtml(entry.username)}</strong>
                    </td>
                    <td class="agent-id-cell">
                        <code>${this.escapeHtml(entry.agentId)}</code>
                    </td>
                    <td class="model-name-cell">
                        <div class="model-name-badge">${this.escapeHtml(entry.modelName)}</div>
                    </td>
                    <td class="token-count-cell">
                        <div class="token-count ${tokenClass}">
                            ${entry.tokensToAdd > 0 ? '+' : ''}${entry.tokensToAdd}
                        </div>
                    </td>
                    <td class="status-cell status-${status}">
                        <div class="status-indicator">
                            <i class="fas fa-${status === 'success' ? 'check' : status === 'preview' ? 'eye' : 'times'}"></i>
                            ${statusText}
                        </div>
                    </td>
                    <td class="message-cell">
                        <div class="message-text">${this.escapeHtml(errorMessage || successMessage || 'Completed successfully')}</div>
                    </td>
                </tr>
            `;
        });

        tableHTML += `
                    </tbody>
                </table>
            </div>
        `;

        return tableHTML;
    }

    /**
     * Generate bulk summary statistics
     */
    generateBulkSummary(results, isPreview = false) {
        const total = results.length;
        const successful = results.filter(r => {
            // Handle both old format (r.result.success) and new format (r.success)
            return r.success !== undefined ? r.success : (r.result && r.result.success);
        }).length;
        const failed = total - successful;
        
        let tokensAdded = 0;
        let tokensDeducted = 0;

        results.forEach(entry => {
            // Only count tokens for successful entries
            const isSuccessful = entry.success !== undefined ? entry.success : (entry.result && entry.result.success);
            if (isSuccessful) {
                const tokens = entry.tokensToAdd || 0;
                if (tokens > 0) {
                    tokensAdded += tokens;
                } else if (tokens < 0) {
                    tokensDeducted += tokens;
                }
            }
        });

        return {
            total,
            successful,
            failed,
            tokensAdded: tokensAdded > 0 ? tokensAdded : null,
            tokensDeducted: tokensDeducted < 0 ? tokensDeducted : null,
            isPreview
        };
    }

    /**
     * Show notification message
     */
    showNotification(message, type = 'info') {
        console.log(`📢 ${type.toUpperCase()}: ${message}`);
        
        // Create notification element if it doesn't exist
        let notification = document.getElementById('token-notification');
        if (!notification) {
            notification = document.createElement('div');
            notification.id = 'token-notification';
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 12px 20px;
                border-radius: 6px;
                color: white;
                font-weight: 500;
                z-index: 10000;
                opacity: 0;
                transition: all 0.3s ease;
                max-width: 400px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            `;
            document.body.appendChild(notification);
        }

        // Set notification style based on type
        const colors = {
            success: '#10B981',
            error: '#EF4444',
            warning: '#F59E0B',
            info: '#3B82F6'
        };

        notification.style.backgroundColor = colors[type] || colors.info;
        notification.textContent = message;
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';

        // Hide notification after 5 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-10px)';
        }, 5000);
    }

    /**
     * Escape HTML to prevent XSS
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Clear all results and success displays
     */
    clearAllDisplays() {
        // Clear results section
        const resultsSection = document.getElementById('tokenResultsSection');
        if (resultsSection) {
            resultsSection.style.display = 'none';
            const resultsContent = document.getElementById('tokenResultsContent');
            if (resultsContent) {
                resultsContent.innerHTML = '';
            }
        }
        
        // Clear success display
        if (window.tokenSuccessDisplay) {
            window.tokenSuccessDisplay.clearSuccessDisplay();
        }
        
        // Clear stored results
        this.lastResults = null;
        
        console.log('🧹 All displays cleared');
    }

    /**
     * Export results to CSV
     */
    exportResults() {
        if (!this.lastResults) {
            this.showNotification('No results to export', 'warning');
            return;
        }

        const { data, mode } = this.lastResults;
        
        // Create CSV content
        const headers = ['Username', 'Agent ID', 'Model Name', 'Tokens Added', 'Status', 'Message', 'Timestamp'];
        const csvContent = [
            headers.join(','),
            ...data.map(entry => {
                const result = entry.result || {};
                const status = result.success ? (mode === 'preview' ? 'Preview' : 'Success') : 'Error';
                const message = (result.error || result.message || 'Completed successfully').replace(/,/g, ';');
                
                return [
                    `"${entry.username}"`,
                    `"${entry.agentId}"`,
                    `"${entry.modelName}"`,
                    entry.tokensToAdd,
                    status,
                    `"${message}"`,
                    new Date().toISOString()
                ].join(',');
            })
        ].join('\n');

        // Create and download file
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `token-allocation-results-${Date.now()}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        this.showNotification('Results exported successfully!', 'success');
    }
}

// Initialize event handlers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.tokenEventHandlers = new TokenAllocationEventHandlers();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TokenAllocationEventHandlers;
}
/**
 * Token Allocation JSON Import Handler
 * Handles JSON import functionality for bulk token allocation
 */

class TokenJSONHandler {
    constructor() {
        this.examples = [
            {
                name: "Basic Example",
                description: "Simple allocation with positive and negative tokens",
                data: [
                    {
                        "username": "user1",
                        "agentId": "AGT-50345a8fdb40c313",
                        "modelName": "gpt-4",
                        "tokensToAdd": 100
                    },
                    {
                        "username": "user2", 
                        "agentId": "AGT-67890b1fec51d424",
                        "modelName": "claude-3-sonnet",
                        "tokensToAdd": -50
                    }
                ]
            },
            {
                name: "Multiple Models",
                description: "Different AI models allocation",
                data: [
                    {
                        "username": "developer1",
                        "agentId": "AGT-dev001abc123",
                        "modelName": "gpt-4",
                        "tokensToAdd": 200
                    },
                    {
                        "username": "developer1",
                        "agentId": "AGT-dev001abc123", 
                        "modelName": "claude-3-opus",
                        "tokensToAdd": 150
                    },
                    {
                        "username": "tester1",
                        "agentId": "AGT-test001xyz789",
                        "modelName": "gemini-pro",
                        "tokensToAdd": 75
                    }
                ]
            },
            {
                name: "Large Scale Example",
                description: "Multiple users with various allocations",
                data: [
                    {
                        "username": "customer1",
                        "agentId": "AGT-cust001aaa111",
                        "modelName": "gpt-3.5-turbo",
                        "tokensToAdd": 50
                    },
                    {
                        "username": "customer2",
                        "agentId": "AGT-cust002bbb222",
                        "modelName": "gpt-4",
                        "tokensToAdd": 100
                    },
                    {
                        "username": "customer3",
                        "agentId": "AGT-cust003ccc333",
                        "modelName": "claude-3-haiku",
                        "tokensToAdd": 25
                    },
                    {
                        "username": "customer4",
                        "agentId": "AGT-cust004ddd444",
                        "modelName": "claude-3-sonnet",
                        "tokensToAdd": -20
                    },
                    {
                        "username": "customer5",
                        "agentId": "AGT-cust005eee555",
                        "modelName": "gemini-pro",
                        "tokensToAdd": 80
                    }
                ]
            }
        ];
        
        this.init();
    }

    init() {
        this.addJSONHelpers();
        this.bindJSONEvents();
    }

    /**
     * Add helper UI elements for JSON import
     */
    addJSONHelpers() {
        const jsonContent = document.getElementById('json-import-content');
        if (!jsonContent) return;

        // Check if helpers already exist
        if (document.getElementById('json-helpers')) return;

        const helpersHTML = `
            <div id="json-helpers" class="json-helpers-section" style="margin-bottom: 20px;">
                <div class="json-helper-header" style="display: flex; align-items: center; margin-bottom: 12px; cursor: pointer;" onclick="this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'none' ? 'block' : 'none';">
                    <i class="fas fa-question-circle" style="color: #6366f1; margin-right: 8px;"></i>
                    <span style="font-weight: 500; color: #374151;">JSON Format Help & Examples</span>
                    <i class="fas fa-chevron-down" style="margin-left: auto; color: #9ca3af; font-size: 12px;"></i>
                </div>
                
                <div class="json-helper-content" style="display: none; padding: 16px; background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 6px;">
                    <!-- Required Format -->
                    <div class="json-format-info" style="margin-bottom: 16px;">
                        <h5 style="margin: 0 0 8px 0; color: #1f2937; font-size: 14px;">
                            <i class="fas fa-code"></i> Required JSON Format
                        </h5>
                        <div style="background: #1f2937; color: #e5e7eb; padding: 12px; border-radius: 4px; font-family: 'Courier New', monospace; font-size: 12px; overflow-x: auto;">
[<br>
  {<br>
    &nbsp;&nbsp;"username": "string (required)",<br>
    &nbsp;&nbsp;"agentId": "string (required)",<br>
    &nbsp;&nbsp;"modelName": "string (required)",<br>
    &nbsp;&nbsp;"tokensToAdd": number (required, non-zero)<br>
  }<br>
]
                        </div>
                    </div>

                    <!-- Field Descriptions -->
                    <div class="json-fields-info" style="margin-bottom: 16px;">
                        <h5 style="margin: 0 0 8px 0; color: #1f2937; font-size: 14px;">
                            <i class="fas fa-list"></i> Field Descriptions
                        </h5>
                        <ul style="margin: 0; padding-left: 20px; color: #4b5563; font-size: 13px;">
                            <li><strong>username:</strong> The username who owns the agent (3-50 chars)</li>
                            <li><strong>agentId:</strong> Unique agent identifier (10-100 chars)</li>
                            <li><strong>modelName:</strong> AI model name (e.g., gpt-4, claude-3-sonnet)</li>
                            <li><strong>tokensToAdd:</strong> Tokens to add (+) or deduct (-), cannot be 0</li>
                        </ul>
                    </div>

                    <!-- Examples -->
                    <div class="json-examples" style="margin-bottom: 16px;">
                        <h5 style="margin: 0 0 12px 0; color: #1f2937; font-size: 14px;">
                            <i class="fas fa-lightbulb"></i> Quick Examples
                        </h5>
                        <div class="json-example-tabs" style="display: flex; gap: 8px; margin-bottom: 12px;">
                            ${this.examples.map((example, index) => `
                                <button class="json-example-tab ${index === 0 ? 'active' : ''}" 
                                        data-example-index="${index}"
                                        style="padding: 6px 12px; font-size: 12px; border: 1px solid #d1d5db; background: ${index === 0 ? '#3b82f6' : 'white'}; color: ${index === 0 ? 'white' : '#374151'}; border-radius: 4px; cursor: pointer;">
                                    ${example.name}
                                </button>
                            `).join('')}
                        </div>
                        <div id="json-example-content" style="background: #1f2937; color: #e5e7eb; padding: 12px; border-radius: 4px; font-family: 'Courier New', monospace; font-size: 11px; max-height: 200px; overflow-y: auto;">
                            <!-- Example content will be populated here -->
                        </div>
                        <div style="display: flex; gap: 8px; margin-top: 8px;">
                            <button class="json-load-example" style="padding: 4px 8px; font-size: 11px; background: #10b981; color: white; border: none; border-radius: 3px; cursor: pointer;">
                                <i class="fas fa-download"></i> Load Example
                            </button>
                            <button class="json-copy-example" style="padding: 4px 8px; font-size: 11px; background: #6366f1; color: white; border: none; border-radius: 3px; cursor: pointer;">
                                <i class="fas fa-copy"></i> Copy to Clipboard
                            </button>
                        </div>
                    </div>

                    <!-- Validation Tips -->
                    <div class="json-validation-tips">
                        <h5 style="margin: 0 0 8px 0; color: #1f2937; font-size: 14px;">
                            <i class="fas fa-check-circle"></i> Validation Tips
                        </h5>
                        <ul style="margin: 0; padding-left: 20px; color: #4b5563; font-size: 12px;">
                            <li>Make sure JSON is properly formatted (use a JSON validator)</li>
                            <li>All required fields must be present for each entry</li>
                            <li>tokensToAdd must be a whole number, not 0</li>
                            <li>Username and agentId must match existing records</li>
                            <li>Click "Validate JSON" before submitting</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;

        // Insert helpers before the textarea
        const importSection = jsonContent.querySelector('.json-import-section');
        if (importSection) {
            importSection.insertAdjacentHTML('beforebegin', helpersHTML);
        }

        // Show first example
        this.showExample(0);
    }

    /**
     * Bind JSON-specific events
     */
    bindJSONEvents() {
        // Example tab clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('.json-example-tab')) {
                const index = parseInt(e.target.dataset.exampleIndex);
                this.showExample(index);
                
                // Update tab styles
                document.querySelectorAll('.json-example-tab').forEach((tab, i) => {
                    tab.style.background = i === index ? '#3b82f6' : 'white';
                    tab.style.color = i === index ? 'white' : '#374151';
                });
            }
        });

        // Load example button
        document.addEventListener('click', (e) => {
            if (e.target.matches('.json-load-example') || e.target.closest('.json-load-example')) {
                this.loadCurrentExample();
            }
        });

        // Copy example button  
        document.addEventListener('click', (e) => {
            if (e.target.matches('.json-copy-example') || e.target.closest('.json-copy-example')) {
                this.copyCurrentExample();
            }
        });

        // Auto-format JSON on paste
        const textarea = document.getElementById('jsonImportData');
        if (textarea) {
            textarea.addEventListener('paste', () => {
                setTimeout(() => this.autoFormatJSON(), 100);
            });
        }
    }

    /**
     * Show example in the preview area
     */
    showExample(index) {
        const example = this.examples[index];
        if (!example) return;

        this.currentExample = example;

        const content = document.getElementById('json-example-content');
        if (content) {
            content.innerHTML = `<div style="color: #9ca3af; margin-bottom: 6px;">// ${example.description}</div>` + 
                               JSON.stringify(example.data, null, 2);
        }
    }

    /**
     * Load current example into the textarea
     */
    loadCurrentExample() {
        if (!this.currentExample) return;

        const textarea = document.getElementById('jsonImportData');
        if (textarea) {
            textarea.value = JSON.stringify(this.currentExample.data, null, 2);
            
            // Clear any previous validation results
            const resultDiv = document.getElementById('jsonValidationResult');
            if (resultDiv) resultDiv.style.display = 'none';

            // Show notification
            if (window.tokenEventHandlers) {
                window.tokenEventHandlers.showNotification(`Loaded ${this.currentExample.name} example`, 'success');
            }
        }
    }

    /**
     * Copy current example to clipboard
     */
    async copyCurrentExample() {
        if (!this.currentExample) return;

        try {
            const jsonText = JSON.stringify(this.currentExample.data, null, 2);
            await navigator.clipboard.writeText(jsonText);
            
            if (window.tokenEventHandlers) {
                window.tokenEventHandlers.showNotification('Example copied to clipboard!', 'success');
            }
        } catch (error) {
            console.error('Failed to copy:', error);
            if (window.tokenEventHandlers) {
                window.tokenEventHandlers.showNotification('Failed to copy to clipboard', 'error');
            }
        }
    }

    /**
     * Auto-format JSON if possible
     */
    autoFormatJSON() {
        const textarea = document.getElementById('jsonImportData');
        if (!textarea) return;

        try {
            const value = textarea.value.trim();
            if (!value) return;

            const parsed = JSON.parse(value);
            const formatted = JSON.stringify(parsed, null, 2);
            
            if (formatted !== value) {
                textarea.value = formatted;
                if (window.tokenEventHandlers) {
                    window.tokenEventHandlers.showNotification('JSON auto-formatted', 'info');
                }
            }
        } catch (error) {
            // Don't show error for auto-format, user might still be typing
        }
    }

    /**
     * Get validation suggestions for common errors
     */
    getValidationSuggestions(error) {
        const suggestions = [];

        if (error.includes('Unexpected token')) {
            suggestions.push('Check for missing commas, brackets, or quotes');
            suggestions.push('Make sure all strings are wrapped in double quotes');
        }

        if (error.includes('Missing required fields')) {
            suggestions.push('Ensure all entries have: username, agentId, modelName, tokensToAdd');
        }

        if (error.includes('tokensToAdd must be')) {
            suggestions.push('tokensToAdd must be a whole number (not 0)');
            suggestions.push('Use positive numbers to add tokens, negative to deduct');
        }

        if (error.includes('must be an array')) {
            suggestions.push('JSON must start with [ and end with ]');
            suggestions.push('Each user entry should be inside { } brackets');
        }

        return suggestions;
    }

    /**
     * Enhanced validation with suggestions
     */
    validateWithSuggestions(jsonString) {
        const validation = window.tokenAPI?.validateBulkJSON(jsonString);
        
        if (validation && !validation.success) {
            validation.suggestions = this.getValidationSuggestions(validation.error);
        }

        return validation;
    }
}

// Initialize JSON handler when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.tokenJSONHandler = new TokenJSONHandler();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TokenJSONHandler;
}
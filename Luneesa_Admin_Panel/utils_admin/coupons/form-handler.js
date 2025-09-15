// Enhanced Coupons Form Handler with Allotment Support
class CouponsFormHandler {
    constructor(couponsData, onSuccess, onError) {
        this.couponsData = couponsData;
        this.onSuccess = onSuccess;
        this.onError = onError;
        this.isAllotting = true; // Default to allotment mode enabled
        this.setupAllotmentUI();
    }

    setupAllotmentUI() {
        // Add event listeners for allotment mode toggle
        this.setupAllotmentModeToggle();
    }

    setupAllotmentModeToggle() {
        // Create allotment mode toggle if it doesn't exist
        const createHeader = document.querySelector('.coupon-create-header');
        if (createHeader && !document.getElementById('coupon-allotment-toggle')) {
            const toggleContainer = document.createElement('div');
            toggleContainer.className = 'coupon-allotment-toggle-container';
            toggleContainer.style.cssText = `
                display: flex;
                align-items: center;
                gap: 12px;
                margin-top: 10px;
                padding: 12px;
                background: #f0fdf4;
                border: 2px solid #10b981;
                border-radius: 6px;
                box-shadow: 0 2px 4px rgba(16, 185, 129, 0.1);
            `;
            
            toggleContainer.innerHTML = `
                <label style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-weight: 500; color: #065f46;">
                        <i class="fas fa-users" style="color: #10b981;"></i> Allot Coupons to Users
                    </span>
            `;
            
            createHeader.appendChild(toggleContainer);
            
            // Add event listener for toggle
            document.getElementById('coupon-allotment-toggle')?.addEventListener('change', (e) => {
                this.toggleAllotmentMode(e.target.checked);
            });
            
            // Auto-enable allotment mode by default
            this.isAllotting = true;
            this.updateFormForAllotmentMode();
        }
    }

    toggleAllotmentMode(enabled) {
        this.isAllotting = enabled;
        this.updateFormForAllotmentMode();
        
        // Update toggle container visual state
        const toggleContainer = document.querySelector('.coupon-allotment-toggle-container');
        if (toggleContainer) {
            if (enabled) {
                toggleContainer.classList.remove('disabled');
                // Update the descriptive text
                const descText = toggleContainer.querySelector('span:last-child');
                if (descText) {
                    descText.innerHTML = '✓ Ready to create and allot coupons to users';
                    descText.style.color = '#059669';
                    descText.style.fontWeight = '500';
                }
            } else {
                toggleContainer.classList.add('disabled');
                // Update the descriptive text
                const descText = toggleContainer.querySelector('span:last-child');
                if (descText) {
                    descText.innerHTML = 'Toggle this to create and allot coupons to specific users or all users';
                    descText.style.color = '#6b7280';
                    descText.style.fontWeight = 'normal';
                }
            }
        }
    }

    updateFormForAllotmentMode() {
        const form = document.getElementById('couponForm');
        if (!form) return;

        // Remove existing allotment fields if they exist
        const existingAllotmentSection = form.querySelector('.allotment-section');
        if (existingAllotmentSection) {
            existingAllotmentSection.remove();
        }

        if (this.isAllotting) {
            // Add allotment-specific fields
            const allotmentSection = document.createElement('div');
            allotmentSection.className = 'allotment-section coupon-form-container';
            allotmentSection.innerHTML = `
                <div class="coupon-form-section-header" style="margin: 20px 0 15px 0; padding-bottom: 10px; border-bottom: 2px solid #e5e7eb;">
                    <h4 style="margin: 0; color: #374151; display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-user-plus" style="color: #6366f1;"></i>
                        User Allotment Settings
                    </h4>
                </div>

                <div class="coupon-form-row">
                    <div class="coupon-form-group">
                        <label>
                            <input type="radio" name="allotmentType" value="specific" checked style="margin-right: 8px;">
                            Specific Users
                        </label>
                    </div>
                    <div class="coupon-form-group">
                        <label>
                            <input type="radio" name="allotmentType" value="all" style="margin-right: 8px;">
                            All Registered Users
                        </label>
                    </div>
                </div>

                <div class="coupon-form-group" id="specificUsersGroup">
                    <label>Target Usernames <span style="color: #dc2626;">*</span></label>
                    <textarea 
                        id="targetUsernames" 
                        rows="4" 
                        placeholder="Enter usernames separated by commas or new lines&#10;Example:&#10;john_doe, jane_smith&#10;user123&#10;testuser"
                        style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 6px; font-family: monospace; font-size: 13px; resize: vertical;"
                    ></textarea>
                    <div style="display: flex; align-items: center; gap: 12px; margin-top: 8px;">
                        <button 
                            id="verifyUsernamesBtn" 
                            type="button" 
                            style="background: linear-gradient(135deg, #8B5CF6, #7C3AED); color: white; border: none; padding: 8px 16px; border-radius: 6px; font-size: 13px; font-weight: 500; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: all 0.2s ease;"
                            onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 12px rgba(59, 130, 246, 0.3)';" 
                            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';"
                        >
                            <i class="fas fa-check-circle"></i>
                            Verify Usernames
                        </button>
                        <small style="color: #6b7280; flex: 1;">
                            <i class="fas fa-info-circle"></i>
                            Separate usernames with commas or new lines. Spaces will be trimmed automatically.
                        </small>
                    </div>
                </div>

                <div class="coupon-form-row" style="margin-top: 16px; padding: 12px; background: #fefce8; border: 1px solid #fbbf24; border-radius: 6px;">
                    <div class="coupon-form-group" style="margin: 0;">
                        <label style="color: #92400e; font-weight: 500;">
                            <i class="fas fa-exclamation-triangle" style="margin-right: 6px;"></i>
                            Important Notes:
                        </label>
                        <ul style="margin: 8px 0 0 20px; color: #92400e; font-size: 13px;">
                            <li>Coupons will be created and immediately allotted to selected users</li>
                            <li>If a user already has the same coupon code, it will be updated</li>
                            <li>Invalid usernames will be reported in the results</li>
                            <li>Operation cannot be undone easily</li>
                        </ul>
                    </div>
                </div>
            `;

            // Insert the allotment section before the action buttons
            const actionButtons = form.nextElementSibling;
            form.parentNode.insertBefore(allotmentSection, actionButtons);

            // Add event listeners for allotment type radio buttons
            const radioButtons = allotmentSection.querySelectorAll('input[name="allotmentType"]');
            radioButtons.forEach(radio => {
                radio.addEventListener('change', () => {
                    this.updateAllotmentTypeUI();
                });
            });

            // Update button text
            const saveButton = document.getElementById('coupons-save-coupon-btn');
            if (saveButton) {
                saveButton.innerHTML = '<i class="fas fa-paper-plane"></i> Allot Coupon';
                saveButton.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            }
        } else {
            // Reset button text
            const saveButton = document.getElementById('coupons-save-coupon-btn');
            if (saveButton) {
                saveButton.innerHTML = '<i class="fas fa-save"></i> Save Coupon';
                saveButton.style.background = '';
            }
        }

        this.updateAllotmentTypeUI();
    }

    updateAllotmentTypeUI() {
        const specificUsersGroup = document.getElementById('specificUsersGroup');
        const selectedType = document.querySelector('input[name="allotmentType"]:checked')?.value;
        
        if (specificUsersGroup) {
            if (selectedType === 'specific') {
                specificUsersGroup.style.display = 'block';
                document.getElementById('targetUsernames').required = true;
            } else {
                specificUsersGroup.style.display = 'none';
                document.getElementById('targetUsernames').required = false;
            }
        }
    }

    async saveCoupon() {
        const form = document.getElementById('couponForm');
        if (!form) return;

        // Get basic coupon data
        const couponData = {
            couponCode: document.getElementById('couponCode')?.value.trim().toUpperCase(),
            used: document.getElementById('couponUsed')?.value === 'true',
            minOrderValue: parseInt(document.getElementById('couponMinOrderValue')?.value) || 0,
            discountType: document.getElementById('couponDiscountType')?.value,
            discountValue: parseInt(document.getElementById('couponDiscountValue')?.value),
            maxDiscountAmount: parseInt(document.getElementById('couponMaxDiscountAmount')?.value) || null
        };

        // Validation
        const validationResult = this.validateCouponData(couponData);
        if (!validationResult.isValid) {
            this.onError(validationResult.message);
            return;
        }

        if (this.isAllotting) {
            // Handle allotment mode
            return await this.handleCouponAllotment(couponData);
        } else {
            // Handle regular coupon creation
            return this.handleRegularCouponCreation(couponData);
        }
    }

    handleRegularCouponCreation(couponData) {
        // Check for duplicate coupon codes
        if (this.couponsData.couponCodeExists(couponData.couponCode)) {
            this.onError('Coupon code already exists');
            return;
        }

        // Create new coupon
        const newCoupon = this.couponsData.addCoupon(couponData);
        this.clearCreateForm();
        this.onSuccess('Coupon created successfully!');
        
        return newCoupon;
    }

    async handleCouponAllotment(couponData) {
        try {
            // Show loading state
            const saveButton = document.getElementById('coupons-save-coupon-btn');
            if (saveButton) {
                saveButton.disabled = true;
                saveButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            }

            // Get allotment settings
            const allotmentType = document.querySelector('input[name="allotmentType"]:checked')?.value;
            const isAllUsers = allotmentType === 'all';
            
            let users = [];
            if (!isAllUsers) {
                const usernamesText = document.getElementById('targetUsernames')?.value.trim();
                if (!usernamesText) {
                    throw new Error('Please enter target usernames');
                }
                
                // Parse usernames (support both comma and newline separation)
                users = usernamesText
                    .split(/[,\n]/)
                    .map(u => u.trim())
                    .filter(u => u.length > 0);
                
                if (users.length === 0) {
                    throw new Error('No valid usernames provided');
                }
            }

            // Prepare API payload
            const payload = {
                couponData: [couponData], // Array as expected by backend
                allUsers: isAllUsers,
                ...(users.length > 0 && { users })
            };

            // Call the allot coupons API
            const response = await this.callAllotCouponsAPI(payload);
            
            if (response.success) {
                this.handleAllotmentSuccess(response.data, isAllUsers, users.length);
                this.clearCreateForm();
            } else {
                throw new Error(response.error || 'Failed to allot coupons');
            }

        } catch (error) {
            console.error('Coupon allotment error:', error);
            this.onError(`Allotment failed: ${error.message}`);
        } finally {
            // Reset button state
            const saveButton = document.getElementById('coupons-save-coupon-btn');
            if (saveButton) {
                saveButton.disabled = false;
                saveButton.innerHTML = '<i class="fas fa-paper-plane"></i>Allot Coupon';
            }
        }
    }

    async callAllotCouponsAPI(payload) {
        try {
            const response = await fetch('/admin/allot_coupons', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add authorization header if token is stored in localStorage or cookies
                    ...(this.getAuthHeaders())
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API call failed:', error);
            throw error;
        }
    }

    getAuthHeaders() {
        // Get JWT token from cookies or localStorage
        const token = this.getAuthToken();
        return token ? { 'Authorization': `Bearer ${token}` } : {};
    }

    getAuthToken() {
        // Try to get token from cookie first
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
            const [name, value] = cookie.trim().split('=');
            if (name === 'authToken') {
                return value;
            }
        }
        
        // Fallback to localStorage if needed
        return localStorage.getItem('authToken');
    }

    handleAllotmentSuccess(results, isAllUsers, userCount) {
        let successCount = 0;
        let errorCount = 0;
        const errors = [];

        results.forEach(result => {
            if (result.success) {
                successCount++;
            } else {
                errorCount++;
                errors.push(`${result.username}: ${result.error}`);
            }
        });

        // Create detailed success message
        let message = `✅ Coupon allotment completed!\n\n`;
        message += `📊 Summary:\n`;
        message += `• Successfully allotted to: ${successCount} users\n`;
        
        if (errorCount > 0) {
            message += `• Failed for: ${errorCount} users\n`;
        }
        
        if (isAllUsers) {
            message += `• Mode: All registered users\n`;
        } else {
            message += `• Mode: Specific users (${userCount} requested)\n`;
        }

        // Show detailed results in a modal or expandable section
        if (errors.length > 0 && errors.length <= 10) {
            message += `\n❌ Errors:\n${errors.slice(0, 10).join('\n')}`;
            if (errors.length > 10) {
                message += `\n... and ${errors.length - 10} more errors`;
            }
        }

        // Use a more sophisticated notification for complex results
        this.showAllotmentResults({
            message,
            successCount,
            errorCount,
            errors,
            isAllUsers,
            userCount
        });
    }

    showAllotmentResults(results) {
        // Create a modal or detailed notification
        const existingModal = document.getElementById('allotment-results-modal');
        if (existingModal) {
            existingModal.remove();
        }

        const modal = document.createElement('div');
        modal.id = 'allotment-results-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        `;

        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            border-radius: 12px;
            padding: 24px;
            max-width: 600px;
            width: 100%;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        `;

        let statusIcon = '✅';
        let statusColor = '#10b981';
        let statusText = 'Success';

        if (results.errorCount > 0) {
            if (results.successCount === 0) {
                statusIcon = '❌';
                statusColor = '#ef4444';
                statusText = 'Failed';
            } else {
                statusIcon = '⚠️';
                statusColor = '#f59e0b';
                statusText = 'Partial Success';
            }
        }

        modalContent.innerHTML = `
            <div style="text-align: center; margin-bottom: 24px;">
                <div style="font-size: 48px; margin-bottom: 12px;">${statusIcon}</div>
                <h3 style="margin: 0; color: ${statusColor};">${statusText}</h3>
                <p style="margin: 8px 0 0 0; color: #6b7280;">Coupon Allotment Results</p>
            </div>

            <div style="background: #f9fafb; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
                <h4 style="margin: 0 0 12px 0; color: #374151;">Summary</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                    <div style="text-align: center; padding: 12px; background: #ecfdf5; border-radius: 6px;">
                        <div style="font-size: 24px; font-weight: bold; color: #10b981;">${results.successCount}</div>
                        <div style="font-size: 12px; color: #065f46;">Successful</div>
                    </div>
                    ${results.errorCount > 0 ? `
                    <div style="text-align: center; padding: 12px; background: #fef2f2; border-radius: 6px;">
                        <div style="font-size: 24px; font-weight: bold; color: #ef4444;">${results.errorCount}</div>
                        <div style="font-size: 12px; color: #991b1b;">Failed</div>
                    </div>` : ''}
                </div>
                <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #e5e7eb; font-size: 13px; color: #6b7280;">
                    Mode: ${results.isAllUsers ? 'All registered users' : `Specific users (${results.userCount} requested)`}
                </div>
            </div>

            ${results.errors.length > 0 ? `
            <div style="margin-bottom: 20px;">
                <h4 style="margin: 0 0 12px 0; color: #374151; display: flex; align-items: center; gap: 8px;">
                    <i class="fas fa-exclamation-triangle" style="color: #f59e0b;"></i>
                    Errors (${results.errors.length})
                </h4>
                <div style="max-height: 200px; overflow-y: auto; background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; padding: 12px;">
                    ${results.errors.slice(0, 20).map(error => 
                        `<div style="font-family: monospace; font-size: 12px; color: #991b1b; margin-bottom: 4px;">${error}</div>`
                    ).join('')}
                    ${results.errors.length > 20 ? `
                    <div style="font-size: 12px; color: #6b7280; font-style: italic; margin-top: 8px;">
                        ... and ${results.errors.length - 20} more errors
                    </div>` : ''}
                </div>
            </div>` : ''}

            <div style="text-align: right;">
                <button onclick="window.couponsManager.formHandler.closeAllotmentResultsModal()" 
                        style="background: #6366f1; color: white; border: none; padding: 12px 24px; border-radius: 6px; font-size: 14px; font-weight: 500; cursor: pointer;">
                    <i class="fas fa-check"></i> Close
                </button>
            </div>
        `;

        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        // Also show a brief success message
        this.onSuccess(`Coupon allotment completed! ${results.successCount} successful${results.errorCount > 0 ? `, ${results.errorCount} failed` : ''}`);
    }

    closeAllotmentResultsModal() {
        // Remove the modal
        const modal = document.getElementById('allotment-results-modal');
        if (modal) {
            modal.remove();
        }

        // Auto-navigate to the Coupons list tab
        if (window.couponsManager && window.couponsManager.navigation) {
            window.couponsManager.navigation.showCouponsListTab();
        } else {
            // Fallback: directly manipulate DOM
            this.activateCouponsListTab();
        }
    }

    activateCouponsListTab() {
        // Update sub-tab buttons
        const listTab = document.getElementById('coupons-list-sub-tab-btn');
        const createTab = document.getElementById('coupons-create-sub-tab-btn');
        
        if (listTab) {
            // Remove active from all coupon sub-tabs
            document.querySelectorAll('.coupon-sub-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Add active to list tab
            listTab.classList.add('active');
            
            // Programmatically click the list tab if it has a click handler
            listTab.click();
        }

        // Update tab content
        const listContent = document.getElementById('couponsListContent');
        const createContent = document.getElementById('couponsCreateContent');
        
        if (listContent && createContent) {
            // Remove active from all coupon tab contents
            document.querySelectorAll('.coupon-tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Show list content
            listContent.classList.add('active');
        }

        // Cancel any active inline editing
        if (window.couponsManager && window.couponsManager.inlineEditor) {
            window.couponsManager.inlineEditor.cancelInlineEdit();
        }
    }

    validateCouponData(couponData, excludeId = null) {
        if (!couponData.couponCode) {
            return { isValid: false, message: 'Coupon code is required' };
        }

        if (!couponData.discountValue || couponData.discountValue <= 0) {
            return { isValid: false, message: 'Valid discount value is required' };
        }

        // Business rule validations from your backend
        if (couponData.discountType === 'percentage' && couponData.discountValue > 50) {
            return { isValid: false, message: 'Percentage discount cannot exceed 50%' };
        }

        if (couponData.discountType === 'flat' && couponData.minOrderValue > 0) {
            const maxFlatDiscount = couponData.minOrderValue * 0.5;
            if (couponData.discountValue > maxFlatDiscount) {
                return { isValid: false, message: `Flat discount cannot exceed 50% of minimum order value (max: ${maxFlatDiscount})` };
            }
        }

        // Only check for duplicates in non-allotment mode
        if (!this.isAllotting && this.couponsData.couponCodeExists(couponData.couponCode, excludeId)) {
            return { isValid: false, message: 'Coupon code already exists' };
        }

        return { isValid: true };
    }

    clearCreateForm() {
        document.getElementById('couponCode').value = '';
        document.getElementById('couponUsed').value = 'false';
        document.getElementById('couponMinOrderValue').value = '';
        document.getElementById('couponDiscountType').value = 'percentage';
        document.getElementById('couponDiscountValue').value = '';
        document.getElementById('couponMaxDiscountAmount').value = '';
        
        // Clear allotment fields if they exist
        const targetUsernames = document.getElementById('targetUsernames');
        if (targetUsernames) {
            targetUsernames.value = '';
        }
        
        const specificRadio = document.querySelector('input[name="allotmentType"][value="specific"]');
        if (specificRadio) {
            specificRadio.checked = true;
            this.updateAllotmentTypeUI();
        }
        
        // Ensure allotment mode stays enabled after clearing
        const allotmentToggle = document.getElementById('coupon-allotment-toggle');
        if (allotmentToggle && !allotmentToggle.checked) {
            allotmentToggle.checked = true;
            this.toggleAllotmentMode(true);
        }
    }

    populateEditForm(coupon) {
        if (!coupon) return;

        document.getElementById('couponInlineCreatedAt').value = this.formatDateTime(coupon.createdAt);
        document.getElementById('couponInlineUpdatedAt').value = this.formatDateTime(coupon.updatedAt);
        document.getElementById('couponInlineCode').value = coupon.couponCode;
        document.getElementById('couponInlineUsed').value = coupon.used.toString();
        document.getElementById('couponInlineMinOrder').value = coupon.minOrderValue;
        document.getElementById('couponInlineDiscountType').value = coupon.discountType;
        document.getElementById('couponInlineDiscountValue').value = coupon.discountValue;
        document.getElementById('couponInlineMaxDiscount').value = coupon.maxDiscountAmount || '';
    }

    getEditFormData() {
        return {
            couponCode: document.getElementById('couponInlineCode')?.value.trim().toUpperCase(),
            used: document.getElementById('couponInlineUsed')?.value === 'true',
            minOrderValue: parseInt(document.getElementById('couponInlineMinOrder')?.value) || 0,
            discountType: document.getElementById('couponInlineDiscountType')?.value,
            discountValue: parseInt(document.getElementById('couponInlineDiscountValue')?.value),
            maxDiscountAmount: parseInt(document.getElementById('couponInlineMaxDiscount')?.value) || null
        };
    }

    formatDateTime(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

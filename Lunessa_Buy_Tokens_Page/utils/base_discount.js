// Base Discount System - Fetches discount slabs from server

// Base discount state
let baseDiscountData = null;

/**
 * Fetch base discount data from server
 * @returns {Promise<Object>} Server response with discount data
 */
async function fetchBaseDiscountData() {
    try {
        const response = await fetch('/base_discount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        if (result.success && result.data) {
            baseDiscountData = result.data;
            console.log('✅ Base discount data loaded:', baseDiscountData);
            return result;
        } else {
            console.warn('⚠️ No base discount data available:', result.error);
            return { success: false, error: result.error || 'No discount data' };
        }
        
    } catch (error) {
        console.error('❌ Failed to fetch base discount data:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Calculate base discount for given order amount
 * @param {number} orderAmount - The total order amount
 * @returns {Object} Discount calculation result
 */
function calculateBaseDiscount(orderAmount) {
    // Return no discount if no base discount data available
    if (!baseDiscountData || !baseDiscountData.levels || baseDiscountData.status !== 'active') {
        return {
            hasDiscount: false,
            discountAmount: 0,
            discountType: null,
            discountValue: 0,
            level: null,
            message: 'No base discount available'
        };
    }

    // Find applicable discount level
    const applicableLevel = baseDiscountData.levels.find(level => {
        const meetsMinimum = orderAmount >= level.minOrderValue;
        const meetsMaximum = level.maxOrderValue === null || orderAmount <= level.maxOrderValue;
        return meetsMinimum && meetsMaximum;
    });

    if (!applicableLevel) {
        return {
            hasDiscount: false,
            discountAmount: 0,
            discountType: null,
            discountValue: 0,
            level: null,
            message: 'Order amount does not qualify for any discount level'
        };
    }

    // Calculate discount amount
    let discountAmount = 0;
    if (applicableLevel.discountType === 'percentage') {
        discountAmount = (orderAmount * applicableLevel.discountValue) / 100;
    } else if (applicableLevel.discountType === 'flat') {
        discountAmount = applicableLevel.discountValue;
    }

    // Ensure discount doesn't exceed order amount
    discountAmount = Math.min(discountAmount, orderAmount);

    return {
        hasDiscount: true,
        discountAmount: discountAmount,
        discountType: applicableLevel.discountType,
        discountValue: applicableLevel.discountValue,
        level: applicableLevel,
        message: `Base discount applied: ${applicableLevel.discountType === 'percentage' ? applicableLevel.discountValue + '%' : '$' + applicableLevel.discountValue}`
    };
}

/**
 * Apply base discount to current calculation
 * @param {number} basePrice - The base price before any discounts
 */
function applyBaseDiscount(basePrice) {
    const baseDiscountResult = calculateBaseDiscount(basePrice);
    
    if (baseDiscountResult.hasDiscount) {
        // Store base discount information
        currentCalculation.baseDiscount = baseDiscountResult.discountAmount;
        currentCalculation.baseDiscountInfo = baseDiscountResult;
        
        // Apply base discount to total (base discounts are applied first)
        currentCalculation.totalPrice = basePrice - baseDiscountResult.discountAmount;
        
        console.log('📊 Base discount applied:', {
            originalPrice: basePrice,
            baseDiscountAmount: baseDiscountResult.discountAmount,
            priceAfterBaseDiscount: currentCalculation.totalPrice,
            discountInfo: baseDiscountResult.message
        });
        
        return true;
    } else {
        // No base discount applicable
        currentCalculation.baseDiscount = 0;
        currentCalculation.baseDiscountInfo = null;
        currentCalculation.totalPrice = basePrice;
        
        console.log('📊 No base discount applicable for amount:', basePrice);
        return false;
    }
}

/**
 * Get the next discount level information for user guidance
 * @param {number} currentAmount - Current order amount
 * @returns {Object|null} Next level information or null if no next level
 */
function getNextDiscountLevel(currentAmount) {
    if (!baseDiscountData || !baseDiscountData.levels) {
        return null;
    }

    // Find the next higher level
    const nextLevel = baseDiscountData.levels
        .filter(level => level.minOrderValue > currentAmount)
        .sort((a, b) => a.minOrderValue - b.minOrderValue)[0];

    if (nextLevel) {
        const additionalAmount = nextLevel.minOrderValue - currentAmount;
        return {
            level: nextLevel,
            additionalAmountNeeded: additionalAmount,
            message: `Spend $${additionalAmount.toFixed(2)} more to get ${nextLevel.discountType === 'percentage' ? nextLevel.discountValue + '%' : '$' + nextLevel.discountValue} ${nextLevel.discountType} discount!`
        };
    }

    return null;
}

/**
 * Initialize base discount system - fetch data on page load
 */
async function initializeBaseDiscount() {
    console.log('🔄 Initializing base discount system...');
    const result = await fetchBaseDiscountData();
    
    if (result.success) {
        console.log('✅ Base discount system initialized successfully');
        displayDiscountLevels(); // Show available discount levels to user
    } else {
        console.log('⚠️ Base discount system initialized without discount data');
    }
    
    return result.success;
}

/**
 * Display discount levels information to user (optional UI enhancement)
 */
function displayDiscountLevels() {
    if (!baseDiscountData || !baseDiscountData.levels) return;
    
    console.log('💰 Available Discount Levels:', baseDiscountData.levels.map(level => {
        const rangeText = level.maxOrderValue 
            ? `$${level.minOrderValue} - $${level.maxOrderValue}`
            : `$${level.minOrderValue}+`;
        
        const discountText = level.discountType === 'percentage' 
            ? `${level.discountValue}% off`
            : `$${level.discountValue} flat discount`;
            
        return `${rangeText}: ${discountText}`;
    }));
}

/**
 * Update discount display in UI to include base discount
 */
function updateBaseDiscountDisplay() {
    const discountRow = document.getElementById('discountRow');
    const discountLabel = document.getElementById('discountLabel');
    const discountSource = document.getElementById('discountSource');
    const discountAmount = document.getElementById('discountAmount');
    
    const totalDiscount = (currentCalculation.baseDiscount || 0) + (currentCalculation.discount || 0);
    
    if (totalDiscount > 0) {
        discountRow.style.display = 'flex';
        discountAmount.textContent = `-$${totalDiscount.toFixed(2)}`;
        
        // Update discount source text - show breakdown when both discounts are applied
        const sources = [];
        const discountBreakdown = [];
        
        if (currentCalculation.baseDiscount > 0) {
            sources.push('Base Discount');
            discountBreakdown.push(`-$${currentCalculation.baseDiscount.toFixed(2)}`);
        }
        if (currentCalculation.discount > 0) {
            if (currentCalculation.discountSource === 'coupon') {
                sources.push(`Coupon: ${currentCalculation.appliedCoupon}`);
                discountBreakdown.push(`-$${currentCalculation.discount.toFixed(2)}`);
            } else if (currentCalculation.appliedOffer) {
                sources.push(`Offer: ${currentCalculation.appliedOffer}`);
                discountBreakdown.push(`-$${currentCalculation.discount.toFixed(2)}`);
            }
        }
        
        if (sources.length > 1) {
            discountLabel.textContent = 'Combined Discounts';
            discountSource.textContent = `(${sources.join(' + ')})`;
            // Add breakdown in console for debugging
            console.log('💰 Discount Breakdown:', {
                baseDiscount: currentCalculation.baseDiscount || 0,
                offerDiscount: currentCalculation.discount || 0,
                totalDiscount: totalDiscount,
                breakdown: discountBreakdown
            });
        } else {
            discountLabel.textContent = sources[0] || 'Discount Applied';
            discountSource.textContent = '';
        }
        
    } else {
        discountRow.style.display = 'none';
    }
}

// Auto-initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeBaseDiscount();
});

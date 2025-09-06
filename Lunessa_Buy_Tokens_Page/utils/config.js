// Application Configuration and Constants
const APP_CONFIG = {
    debounceDelay: 800,
    notificationDuration: 3000,
    processingDelay: 2000
};

// Current calculation state
let currentCalculation = {
    tokens: 0,
    rate: 0,
    basePrice: 0,
    discount: 0,
    totalPrice: 0,
    appliedOffer: null,
    appliedCoupon: null,
    modelName: '',
    discountSource: '', // 'coupon' or 'offer'
    baseDiscount: 0, // Base discount from server
    baseDiscountInfo: null // Base discount details
};

// Predefined coupon codes
const validCoupons = {
    'SAVE10': { type: 'percentage', value: 10, minAmount: 100, description: 'Get 10% off' },
    'FLAT50': { type: 'flat', value: 50, minAmount: 200, description: 'Flat ₹50 discount' },
    'FIRST20': { type: 'percentage', value: 20, minAmount: 300, description: 'First-time user 20% off' },
    'BULK100': { type: 'flat', value: 100, minAmount: 1000, description: 'Bulk order ₹100 off' },
    'NEWYEAR25': { type: 'percentage', value: 25, minAmount: 1500, description: 'New Year 25% off' },
    'WELCOME15': { type: 'percentage', value: 15, minAmount: 500, description: 'Welcome 15% off' },
    'WEEKEND200': { type: 'flat', value: 200, minAmount: 800, description: 'Weekend ₹200 off' },
    'BULK500': { type: 'flat', value: 500, minAmount: 2000, description: 'Bulk ₹500 off' }
};

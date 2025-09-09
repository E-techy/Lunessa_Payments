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
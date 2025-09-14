// Coupons Data Management
class CouponsData {
    constructor() {
        this.coupons = [];
        this.loadMockData();
    }

    // Mock data for demonstration - All amounts converted to USD (using 1 USD = 85 INR)
    loadMockData() {
        this.coupons = [
            {
                id: 1,
                couponCode: 'SAVE20',
                used: false,
                minOrderValue: 6, // ~500 INR
                discountType: 'percentage',
                discountValue: 20,
                maxDiscountAmount: 1.2, // ~100 INR
                createdAt: '2025-01-15T10:00:00Z',
                updatedAt: '2025-01-15T10:00:00Z'
            },
            {
                id: 2,
                couponCode: 'FLAT100',
                used: true,
                minOrderValue: 12, // ~1000 INR
                discountType: 'flat',
                discountValue: 1.2, // ~100 INR
                maxDiscountAmount: null,
                createdAt: '2025-01-14T15:30:00Z',
                updatedAt: '2025-01-16T12:00:00Z'
            },
            {
                id: 3,
                couponCode: 'WELCOME15',
                used: false,
                minOrderValue: 0,
                discountType: 'percentage',
                discountValue: 15,
                maxDiscountAmount: 0.6, // ~50 INR
                createdAt: '2025-01-10T09:15:00Z',
                updatedAt: '2025-01-10T09:15:00Z'
            },
            {
                id: 4,
                couponCode: 'MEGA500',
                used: false,
                minOrderValue: 24, // ~2000 INR
                discountType: 'flat',
                discountValue: 6, // ~500 INR
                maxDiscountAmount: null,
                createdAt: '2025-01-12T14:20:00Z',
                updatedAt: '2025-01-12T14:20:00Z'
            },
            {
                id: 5,
                couponCode: 'NEWYEAR25',
                used: true,
                minOrderValue: 9, // ~750 INR
                discountType: 'percentage',
                discountValue: 25,
                maxDiscountAmount: 2.4, // ~200 INR
                createdAt: '2025-01-01T00:00:00Z',
                updatedAt: '2025-01-05T18:45:00Z'
            }
        ];
    }

    // Data access methods
    getAllCoupons() {
        return [...this.coupons];
    }

    getCouponById(id) {
        return this.coupons.find(coupon => coupon.id === id);
    }

    addCoupon(couponData) {
        const newCoupon = {
            id: Math.max(...this.coupons.map(c => c.id), 0) + 1,
            ...couponData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        this.coupons.push(newCoupon);
        return newCoupon;
    }

    updateCoupon(id, updates) {
        const couponIndex = this.coupons.findIndex(c => c.id === id);
        if (couponIndex !== -1) {
            this.coupons[couponIndex] = {
                ...this.coupons[couponIndex],
                ...updates,
                updatedAt: new Date().toISOString()
            };
            return this.coupons[couponIndex];
        }
        return null;
    }

    deleteCoupon(id) {
        const initialLength = this.coupons.length;
        this.coupons = this.coupons.filter(c => c.id !== id);
        return this.coupons.length < initialLength;
    }

    couponCodeExists(code, excludeId = null) {
        return this.coupons.some(coupon => 
            coupon.couponCode === code && (excludeId === null || coupon.id !== excludeId)
        );
    }
}

// Coupons Data Management
class CouponsData {
    constructor() {
        this.coupons = [];
        this.loadMockData();
    }

    // Initialize with empty data - remove mock data as requested
    loadMockData() {
        this.coupons = [];
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

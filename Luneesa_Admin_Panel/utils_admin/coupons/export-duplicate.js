// Coupons Export and Import Utilities
class CouponsExportDuplicate {
    constructor(tableManager, onSuccess) {
        this.tableManager = tableManager;
        this.onSuccess = onSuccess;
    }

    exportCoupons() {
        const csvContent = this.generateCSV();
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `coupons_export_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.onSuccess('Coupons exported successfully!');
    }

    generateCSV() {
        const headers = [
            'Coupon Code',
            'Used',
            'Min Order Value',
            'Discount Type',
            'Discount Value',
            'Max Discount Amount',
            'Created At',
            'Updated At'
        ];

        const filteredCoupons = this.tableManager.getFilteredCoupons();
        const rows = filteredCoupons.map(coupon => [
            coupon.couponCode,
            coupon.used ? 'Yes' : 'No',
            coupon.minOrderValue,
            coupon.discountType,
            coupon.discountValue,
            coupon.maxDiscountAmount || 'N/A',
            this.formatDateTime(coupon.createdAt),
            this.formatDateTime(coupon.updatedAt)
        ]);

        const csvContent = [headers, ...rows]
            .map(row => row.map(field => `"${field}"`).join(','))
            .join('\n');

        return csvContent;
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

    // Utility method for potential future import functionality
    parseCSV(csvText) {
        const lines = csvText.split('\n');
        const headers = lines[0].split(',').map(header => header.replace(/"/g, ''));
        const rows = [];

        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim()) {
                const values = lines[i].split(',').map(value => value.replace(/"/g, ''));
                const row = {};
                headers.forEach((header, index) => {
                    row[header] = values[index];
                });
                rows.push(row);
            }
        }

        return rows;
    }
}

// Export and duplicate functionality

// Export offers data
function exportOffers() {
    const dataToExport = offersData.map(offer => ({
        ID: offer.id,
        OfferID: offer.offerId,
        Title: offer.title,
        Description: offer.description,
        OfferCode: offer.offerCode,
        DiscountType: offer.discountType,
        DiscountValue: offer.discountValue,
        MaxDiscountAmount: offer.maxDiscountAmount,
        OfferType: offer.offerType,
        ApplicableTo: offer.applicableTo,
        MinPurchaseAmount: offer.minPurchaseAmount,
        ApplicableProducts: offer.applicableProducts,
        UsageLimit: offer.usageLimit,
        UsageLimitPerUser: offer.usageLimitPerUser,
        GlobalUsedCount: offer.globalUsedCount,
        StartDate: new Date(offer.startDate).toLocaleString(),
        EndDate: new Date(offer.endDate).toLocaleString(),
        Status: offer.status,
        CreatedAt: new Date(offer.createdAt).toLocaleString(),
        UpdatedAt: new Date(offer.updatedAt).toLocaleString()
    }));
    
    const csv = convertToCSV(dataToExport);
    downloadCSV(csv, `offers_export_${new Date().toISOString().slice(0, 10)}.csv`);
    showNotification('Offers exported successfully!', 'success');
}

// Helper function to convert data to CSV
function convertToCSV(data) {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvHeaders = headers.join(',');
    
    const csvRows = data.map(row => 
        headers.map(header => {
            const value = row[header];
            // Handle values with commas or quotes
            if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
                return `"${value.replace(/"/g, '""')}"`;
            }
            return value;
        }).join(',')
    );
    
    return [csvHeaders, ...csvRows].join('\n');
}

// Helper function to download CSV
function downloadCSV(csv, filename) {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// Duplicate offer
function duplicateOffer(index) {
    event.stopPropagation();
    const originalOffer = offersData[index];
    if (!originalOffer) return;
    
    const duplicatedOffer = {
        ...originalOffer,
        id: generateId(),
        offerId: generateOfferId(),
        title: originalOffer.title + ' (Copy)',
        offerCode: originalOffer.offerCode + '_COPY',
        globalUsedCount: 0,
        status: 'paused',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    offersData.push(duplicatedOffer);
    showNotification('Offer duplicated successfully!', 'success');
    updateOffersTable();
    updateQuickStats();
}

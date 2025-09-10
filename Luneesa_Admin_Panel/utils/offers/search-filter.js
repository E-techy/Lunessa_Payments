// Search and filter functionality

let currentFilter = 'all';
let currentSearch = '';

// Search functionality
function searchOffers(searchTerm) {
    currentSearch = searchTerm.toLowerCase();
    filterAndUpdateTable();
}

// Filter functionality
function filterOffers(status) {
    currentFilter = status;
    filterAndUpdateTable();
}

// Combined filter and search
function filterAndUpdateTable() {
    filteredOffersData = offersData.filter(offer => {
        // Apply status filter
        const statusMatch = currentFilter === 'all' || offer.status === currentFilter;
        
        // Apply search filter
        const searchMatch = currentSearch === '' || 
            offer.title.toLowerCase().includes(currentSearch) ||
            offer.description.toLowerCase().includes(currentSearch) ||
            offer.offerCode.toLowerCase().includes(currentSearch) ||
            offer.offerType.toLowerCase().includes(currentSearch);
        
        return statusMatch && searchMatch;
    });
    
    updateOffersTableWithData(filteredOffersData);
}

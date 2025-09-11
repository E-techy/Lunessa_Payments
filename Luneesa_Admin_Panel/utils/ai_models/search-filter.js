// AI Models Search and Filter

// Initialize search and filter handlers
function initAiModelsSearchFilter() {
    // Search input
    const searchInput = document.getElementById('ai-models-search-input');
    if (searchInput) {
        const debouncedSearch = debounce(handleAiSearch, 300);
        searchInput.addEventListener('input', debouncedSearch);
    }
    
    // Provider filter
    const providerFilter = document.getElementById('ai-models-provider-filter');
    if (providerFilter) {
        providerFilter.addEventListener('change', handleAiProviderFilter);
    }
}

// Handle search input
function handleAiSearch(event) {
    const searchTerm = event.target.value.toLowerCase().trim();
    applyAiFilters(searchTerm);
}

// Handle provider filter
function handleAiProviderFilter(event) {
    const selectedProvider = event.target.value;
    const searchInput = document.getElementById('ai-models-search-input');
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
    
    applyAiFilters(searchTerm, selectedProvider);
}

// Apply filters to AI models
function applyAiFilters(searchTerm = '', selectedProvider = 'all') {
    filteredAiModels = currentAiModels.filter(model => {
        // Search filter
        const matchesSearch = !searchTerm || 
            model.modelName.toLowerCase().includes(searchTerm) ||
            model.provider.toLowerCase().includes(searchTerm) ||
            model.currency.toLowerCase().includes(searchTerm);
        
        // Provider filter
        const matchesProvider = selectedProvider === 'all' || 
            model.provider === selectedProvider;
        
        return matchesSearch && matchesProvider;
    });
    
    // Re-render table with filtered data
    renderAiModelsTable();
    
    // Update results count
    updateAiResultsCount();
}

// Update results count display
function updateAiResultsCount() {
    const totalCount = currentAiModels.length;
    const filteredCount = filteredAiModels.length;
    
    // Update title if needed
    const listTitle = document.getElementById('aiModelsListTitle');
    if (listTitle) {
        if (filteredCount !== totalCount) {
            listTitle.textContent = `AI Models List (${filteredCount} of ${totalCount})`;
        } else {
            listTitle.textContent = `AI Models List (${totalCount})`;
        }
    }
}

// Clear all filters
function clearAiFilters() {
    const searchInput = document.getElementById('ai-models-search-input');
    const providerFilter = document.getElementById('ai-models-provider-filter');
    
    if (searchInput) searchInput.value = '';
    if (providerFilter) providerFilter.value = 'all';
    
    filteredAiModels = [...currentAiModels];
    renderAiModelsTable();
    updateAiResultsCount();
}

// Get current filter state
function getAiFilterState() {
    const searchInput = document.getElementById('ai-models-search-input');
    const providerFilter = document.getElementById('ai-models-provider-filter');
    
    return {
        searchTerm: searchInput ? searchInput.value.toLowerCase().trim() : '',
        selectedProvider: providerFilter ? providerFilter.value : 'all'
    };
}

// Set filter state
function setAiFilterState(searchTerm, selectedProvider) {
    const searchInput = document.getElementById('ai-models-search-input');
    const providerFilter = document.getElementById('ai-models-provider-filter');
    
    if (searchInput) searchInput.value = searchTerm;
    if (providerFilter) providerFilter.value = selectedProvider;
    
    applyAiFilters(searchTerm, selectedProvider);
}

// Sort AI models
function sortAiModels(field, direction = 'asc') {
    filteredAiModels.sort((a, b) => {
        let aValue, bValue;
        
        switch (field) {
            case 'modelName':
                aValue = a.modelName.toLowerCase();
                bValue = b.modelName.toLowerCase();
                break;
            case 'provider':
                aValue = a.provider.toLowerCase();
                bValue = b.provider.toLowerCase();
                break;
            case 'pricePerToken':
                aValue = a.pricePerToken;
                bValue = b.pricePerToken;
                break;
            case 'availableTill':
                aValue = new Date(a.availableTill);
                bValue = new Date(b.availableTill);
                break;
            case 'createdAt':
                aValue = new Date(a.createdAt);
                bValue = new Date(b.createdAt);
                break;
            default:
                return 0;
        }
        
        if (aValue < bValue) return direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return direction === 'asc' ? 1 : -1;
        return 0;
    });
    
    renderAiModelsTable();
}

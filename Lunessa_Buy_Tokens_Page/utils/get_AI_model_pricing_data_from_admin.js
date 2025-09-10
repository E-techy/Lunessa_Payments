document.addEventListener("DOMContentLoaded", async () => {
    let modelsData = [];

    // Fetch AI models pricing data from backend
    async function fetchModelsFromDB() {
        try {
            const response = await fetch("http://localhost:3004/AI_models_pricing_data", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });

            const result = await response.json();
            console.log(result);
            
            if (result.success) {
                modelsData = result.data;
                populateModelSelect(modelsData);
                return modelsData;
            } else {
                console.error("❌ Failed to fetch models:", result.message);
                return [];
            }
        } catch (error) {
            console.error("❌ Error fetching models:", error);
            return [];
        }
    }

    // Populate the select dropdown with available models
    function populateModelSelect(models) {
        const modelSelect = document.getElementById("model");
        if (!modelSelect) return;

        modelSelect.innerHTML = '<option value="">Choose AI Model</option>';

        const now = new Date();
        const availableModels = models.filter(m => new Date(m.availableTill) > now);

        availableModels.forEach(model => {
            const option = document.createElement("option");
            option.value = model.id;
            option.dataset.rate = model.pricePerToken;
            option.dataset.currency = model.currency;
            option.dataset.provider = model.provider;

            option.textContent = `${model.modelName} (${model.provider}) - ${formatPrice(model.pricePerToken, model.currency)}/token`;
            modelSelect.appendChild(option);
        });
    }

    // Format price based on currency
    function formatPrice(price, currency) {
        if (currency === "USD") return `$${price}`;
        if (currency === "INR") return `₹${price}`;
        return `${price} ${currency}`;
    }

    // Calculate cost
    function calculateCost(tokens, modelId) {
        if (!modelId || !tokens || tokens <= 0) {
            return { cost: 0, currency: "USD", modelName: "" };
        }

        const selectedModel = modelsData.find(m => m.id === modelId);
        if (!selectedModel) return { cost: 0, currency: "USD", modelName: "" };

        return {
            cost: tokens * selectedModel.pricePerToken,
            currency: selectedModel.currency,
            modelName: selectedModel.modelName,
            provider: selectedModel.provider
        };
    }

    // Update cost display
    function updateCostDisplay(tokens) {
        const modelSelect = document.getElementById("model");
        const costDisplay = document.getElementById("cost-display");
        if (!modelSelect || !costDisplay) return;

        const calculation = calculateCost(parseInt(tokens) || 0, modelSelect.value);

        if (calculation.cost > 0) {
            costDisplay.innerHTML = `
                <div class="cost-breakdown">
                    <div class="model-info">${calculation.modelName} (${calculation.provider})</div>
                    <div class="cost-info">Cost for ${tokens} tokens: 
                        <strong>${formatPrice(calculation.cost.toFixed(6), calculation.currency)}</strong>
                    </div>
                </div>
            `;
        } else {
            costDisplay.innerHTML = "";
        }
    }

    // Setup event listeners
    function setupEventListeners() {
        const modelSelect = document.getElementById("model");
        const tokensInput = document.getElementById("tokens");

        if (modelSelect) {
            modelSelect.addEventListener("change", () => {
                updateCostDisplay(tokensInput?.value || 0);
            });
        }

        if (tokensInput) {
            tokensInput.addEventListener("input", e => {
                updateCostDisplay(e.target.value);
            });
        }
    }

    // Expose small API globally if needed
    window.AIModelPricingManager = {
        calculateCost,
        updateCostDisplay,
        getModelsData: () => modelsData,
        refreshModels: fetchModelsFromDB
    };

    // Init
    await fetchModelsFromDB();
    setupEventListeners();
});

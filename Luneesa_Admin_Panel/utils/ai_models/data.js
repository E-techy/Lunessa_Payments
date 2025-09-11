// AI Models Mock Data
const aiModelsData = {
    "success": true,
    "data": [
        {
            "id": "68c071012ffa0dff3b93b2b2",
            "modelName": "gpt-5",
            "provider": "OpenAI",
            "pricePerToken": 0.005,
            "currency": "USD",
            "availableTill": "2033-12-31T00:00:00.000Z",
            "createdAt": "2025-09-11T08:30:00.000Z",
            "updatedAt": "2025-09-11T08:30:00.000Z"
        },
        {
            "id": "68c0718cd45326426710bf07",
            "modelName": "gpt-4",
            "provider": "OpenAI",
            "pricePerToken": 0.0003,
            "currency": "USD",
            "availableTill": "2032-12-31T00:00:00.000Z",
            "createdAt": "2025-09-11T08:30:00.000Z",
            "updatedAt": "2025-09-11T08:30:00.000Z"
        },
        {
            "id": "68c071ab5bc8e5c8deaafe9b",
            "modelName": "claude 3.5",
            "provider": "Anthropic",
            "pricePerToken": 0.02,
            "currency": "USD",
            "availableTill": "2032-12-31T00:00:00.000Z",
            "createdAt": "2025-09-11T08:30:00.000Z",
            "updatedAt": "2025-09-11T08:30:00.000Z"
        },
        {
            "id": "68c071b8d058f75f9bcacdf9",
            "modelName": "claude 4",
            "provider": "Anthropic",
            "pricePerToken": 0.1,
            "currency": "USD",
            "availableTill": "2032-12-31T00:00:00.000Z",
            "createdAt": "2025-09-11T08:30:00.000Z",
            "updatedAt": "2025-09-11T08:30:00.000Z"
        },
        {
            "id": "68c071e57b9753a538fc2b8c",
            "modelName": "gemini 2.5 pro",
            "provider": "Google",
            "pricePerToken": 0.000001,
            "currency": "USD",
            "availableTill": "2032-12-31T00:00:00.000Z",
            "createdAt": "2025-09-11T08:30:00.000Z",
            "updatedAt": "2025-09-11T08:30:00.000Z"
        },
        {
            "id": "68c071f81bd5111ea12a5f21",
            "modelName": "gemini 2.5 pro deep think",
            "provider": "Google",
            "pricePerToken": 0.3,
            "currency": "USD",
            "availableTill": "2032-12-31T00:00:00.000Z",
            "createdAt": "2025-09-11T08:30:00.000Z",
            "updatedAt": "2025-09-11T08:30:00.000Z"
        },
        {
            "id": "68c0724a5a828150497bf0a0",
            "modelName": "gemini 3",
            "provider": "Google",
            "pricePerToken": 0.6,
            "currency": "USD",
            "availableTill": "2032-12-31T00:00:00.000Z",
            "createdAt": "2025-09-11T08:30:00.000Z",
            "updatedAt": "2025-09-11T08:30:00.000Z"
        }
    ]
};

// State management for AI models
let currentAiModels = [...aiModelsData.data];
let filteredAiModels = [...aiModelsData.data];
let editingAiModelId = null;
let isAiEditMode = false;
let currentAiEditingIndex = -1;

// Generate a new ID for creating models
function generateAiModelId() {
    return Array.from({length: 24}, () => Math.floor(Math.random() * 16).toString(16)).join('');
}

// Get current timestamp in ISO format
function getCurrentTimestamp() {
    return new Date().toISOString();
}

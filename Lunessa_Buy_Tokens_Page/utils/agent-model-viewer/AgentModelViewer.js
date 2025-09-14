// Main AgentModelViewer class - coordinates all components
class AgentModelViewer {
    constructor() {
        this.isExpanded = false;
        this.agentsData = null;
        this.hasUnsavedChanges = false;
        this.originalData = null;
        
        // Initialize component managers
        this.dataManager = new DataManager(this);
        this.uiManager = new UIManager(this);
        this.eventHandler = new EventHandler(this);
        
        this.init();
    }
    
    updateAgentsData(newData) {
        this.agentsData = newData;
        this.uiManager.updateInfoCards();
        if (this.isExpanded) {
            this.uiManager.renderAgents();
        }
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.eventHandler.bindEvents();
                this.dataManager.loadAgentsData();
            });
        } else {
            this.eventHandler.bindEvents();
            this.dataManager.loadAgentsData();
        }
    }

    // Delegate methods to appropriate managers
    toggleModelStatus(modelName) {
        this.eventHandler.toggleModelStatus(modelName);
    }

    saveChanges() {
        this.dataManager.saveChanges();
    }

    switchToAgent(agentId) {
        this.eventHandler.switchToAgent(agentId);
    }

    refreshData() {
        this.dataManager.refreshData();
    }

    // Method to set callbacks for external handling
    setOnModelStatusChange(callback) {
        this.onModelStatusChange = callback;
    }

    setOnSaveChanges(callback) {
        this.onSaveChanges = callback;
    }
}

// Initialize the AgentModelViewer when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (!window.agentModelViewer) {
            window.agentModelViewer = new AgentModelViewer();
        }
    });
} else {
    if (!window.agentModelViewer) {
        window.agentModelViewer = new AgentModelViewer();
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = AgentModelViewer;
}
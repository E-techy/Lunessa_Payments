// utils/modify_agent_usingModel_value.js
const { PrismaClient } = require("../generated/customer-service");
const prisma = new PrismaClient();

/**
 * Modify the active/inactive status of an agent's model usage.
 *
 * @async
 * @function modifyAgentUsingModelValue
 * @param {Object} params
 * @param {string} params.username - The username of the agent.
 * @param {string} params.agentId - The unique agentId.
 * @param {string} params.modelName - The AI model name to update (e.g., "gpt-4").
 * @param {string} params.status - New status, either "active" or "inactive".
 *
 * @returns {Promise<Object>} Safe client response.
 */
async function modifyAgentUsingModelValue({ username, agentId, modelName, status }) {
  try {
    if (!username || !agentId || !modelName || !status) {
      return { success: false, error: "Missing required fields." };
    }

    if (!["active", "inactive"].includes(status)) {
      return { success: false, error: "Invalid status. Must be 'active' or 'inactive'." };
    }

    const now = new Date();

    // 1️⃣ Find agent by agentId
    const agent = await prisma.CustomerServiceAgents.findUnique({ where: { agentId } });
    if (!agent) {
      return { success: false, error: "Agent not found." };
    }

    // 2️⃣ Verify username matches this agent
    if (agent.username !== username) {
      return { success: false, error: "Username does not match this agent." };
    }

    // 3️⃣ Verify AI model exists and is not expired
    const aiModel = await prisma.AIModel.findUnique({ where: { modelName } });
    if (!aiModel) {
      return { success: false, error: `Model '${modelName}' does not exist.` };
    }
    if (new Date(aiModel.availableTill) < now) {
      // If requested model expired → deactivate if it was active
      let updatedBalances = (agent.tokenBalances || []).map(tb =>
        tb.modelName === modelName
          ? { ...tb, status: "inactive", updatedAt: now }
          : tb
      );

      await prisma.CustomerServiceAgents.update({
        where: { id: agent.id },
        data: { tokenBalances: updatedBalances, usingModel: null, lastModified: now },
      });

      return { success: false, error: `Model '${modelName}' has expired.` };
    }

    // 4️⃣ Handle expired active models in balances
    let tokenBalances = (agent.tokenBalances || []).map(tb => {
      if (tb.status === "active") {
        // Verify active model against its availableTill
        return { ...tb, status: "inactive", updatedAt: now };
      }
      return tb;
    });

    // 5️⃣ Find target balance or create if missing
    let targetBalance = tokenBalances.find(tb => tb.modelName === modelName);

    if (!targetBalance) {
      // Add new model to tokenBalances with 0 tokens
      targetBalance = {
        modelName,
        availableTokens: 0,
        status: status,
        createdAt: now,
        updatedAt: now,
      };
      tokenBalances.push(targetBalance);
    } else {
      // Update existing one
      tokenBalances = tokenBalances.map(tb =>
        tb.modelName === modelName
          ? { ...tb, status, updatedAt: now }
          : status === "active"
          ? { ...tb, status: "inactive", updatedAt: now }
          : tb
      );
    }

    // 6️⃣ Build new usingModel
    const newUsingModel =
      status === "active"
        ? {
            modelName,
            availableTokens: targetBalance.availableTokens,
            status: "active",
          }
        : null;

    // 7️⃣ Save update
    const updatedAgent = await prisma.CustomerServiceAgents.update({
      where: { id: agent.id },
      data: {
        tokenBalances,
        usingModel: newUsingModel,
        lastModified: now,
      },
      select: {
        agentId: true,
        agentName: true,
        usingModel: true,
        tokenBalances: true,
      },
    });

    return { success: true, data: updatedAgent };
  } catch (err) {
    console.error("❌ Error in modifyAgentUsingModelValue:", err.message);
    return { success: false, error: "Failed to update model status. Please try again." };
  }
}

module.exports = modifyAgentUsingModelValue;

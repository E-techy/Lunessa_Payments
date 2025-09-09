/**
 * @file utils/admin/add_modify_AI_model_pricing_data.js
 * @description Utility to add, modify, or delete AIModel pricing data.
 * Only the `superAdmin` role is allowed to perform these operations. Ensures
 * strict validation including ISO 4217 currency codes and price constraints.
 */

const { PrismaClient } = require("../../generated/customer-service");
const prisma = new PrismaClient();

// A partial list of commonly used ISO 4217 currency codes for validation
const VALID_CURRENCIES = new Set([
  "USD","EUR","GBP","JPY","INR","AUD","CAD","CHF","CNY","SGD",
  "KRW","NZD","ZAR","AED","HKD","SEK","NOK","DKK","RUB","BRL",
  // ...add more as needed
]);

/**
 * Validate AIModel object structure and business rules.
 *
 * @param {Object} model - The model data to validate.
 * @returns {{ valid: boolean, error?: string }}
 */
function validateModel(model) {
  const requiredFields = ["modelName", "provider", "pricePerToken", "availableTill"];
  for (const field of requiredFields) {
    if (!(field in model)) {
      return { valid: false, error: `Missing required field: '${field}'` };
    }
  }

  if (typeof model.modelName !== "string" || !model.modelName.trim()) {
    return { valid: false, error: "Invalid 'modelName': must be a non-empty string." };
  }

  if (typeof model.provider !== "string" || !model.provider.trim()) {
    return { valid: false, error: "Invalid 'provider': must be a non-empty string." };
  }

  if (typeof model.pricePerToken !== "number" || model.pricePerToken <= 0) {
    return { valid: false, error: "'pricePerToken' must be a number greater than 0." };
  }

  const currency = model.currency ?? "USD";
  if (typeof currency !== "string" || !VALID_CURRENCIES.has(currency)) {
    return { valid: false, error: `Invalid 'currency': must be a valid ISO 4217 code.` };
  }

  const date = new Date(model.availableTill);
  if (isNaN(date.getTime())) {
    return { valid: false, error: "Invalid 'availableTill': must be a valid date string." };
  }

  return { valid: true };
}

/**
 * Add, modify, or delete AIModel entries in the database.
 *
 * @async
 * @param {Object} params
 * @param {string} params.adminRole - Admin role (must be "superAdmin").
 * @param {"add"|"modify"|"delete"} params.action - Operation to perform.
 * @param {Array<Object|string>} params.modelsData - Data array:
 *    - For "add"/"modify": array of AIModel objects.
 *    - For "delete": array of modelName strings.
 *
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
async function addModifyAIModelPricingData({ adminRole, action, modelsData }) {
  try {
    if (adminRole !== "superAdmin") {
      return { success: false, error: "Unauthorized: Only superAdmin allowed." };
    }

    if (!["add", "modify", "delete"].includes(action)) {
      return { success: false, error: "Invalid action. Use 'add', 'modify', or 'delete'." };
    }

    if (!Array.isArray(modelsData) || modelsData.length === 0) {
      return { success: false, error: "'modelsData' must be a non-empty array." };
    }

    const results = [];

    if (action === "add") {
      for (const model of modelsData) {
        const { valid, error } = validateModel(model);
        if (!valid) return { success: false, error };

        const cleanModel = {
          modelName: model.modelName,
          provider: model.provider,
          pricePerToken: model.pricePerToken,
          currency: model.currency ?? "USD",
          availableTill: new Date(model.availableTill),
        };

        const created = await prisma.AIModel.create({ data: cleanModel });
        const { createdAt, updatedAt, ...safe } = created;
        results.push(safe);
      }
    }

    if (action === "modify") {
      for (const model of modelsData) {
        if (!model.modelName) {
          return { success: false, error: "'modelName' required for modification." };
        }
        const validation = validateModel(model);
        if (!validation.valid) return { success: false, error: validation.error };

        const updated = await prisma.AIModel.update({
          where: { modelName: model.modelName },
          data: {
            provider: model.provider,
            pricePerToken: model.pricePerToken,
            currency: model.currency ?? "USD",
            availableTill: new Date(model.availableTill),
          },
        });

        const { createdAt, updatedAt, ...safe } = updated;
        results.push(safe);
      }
    }

    if (action === "delete") {
      for (const modelName of modelsData) {
        if (typeof modelName !== "string" || !modelName.trim()) {
          return { success: false, error: "Invalid 'modelName' for deletion." };
        }

        const deleted = await prisma.AIModel.delete({ where: { modelName } });
        const { createdAt, updatedAt, ...safe } = deleted;
        results.push(safe);
      }
    }

    return { success: true, data: results };
  } catch (err) {
    console.error("Error in addModifyAIModelPricingData:", err);
    return { success: false, error: "Server error while processing AI model data." };
  }
}

module.exports = addModifyAIModelPricingData;





// Simple test runner
// if (require.main === module) {
//   (async () => {
//     console.log("➕ Adding new model...");
//     console.log(await addModifyAIModelPricingData({
//       adminRole: "superAdmin",
//       action: "add",
//       modelsData: [{
//         modelName: "gemini 3",
//         provider: "Google",
//         pricePerToken: 0.6,
//         currency: "USD",
//         availableTill: "2032-12-31",
//       }],
//     }));

//     console.log("\n✏️ Modifying model...");
//     console.log(await addModifyAIModelPricingData({
//       adminRole: "superAdmin",
//       action: "modify",
//       modelsData: [{
//         modelName: "gpt-5",
//         provider: "OpenAI",
//         pricePerToken: 0.005,
//         currency: "USD",
//         availableTill: "2033-12-31",
//       }],
//     }));

//     console.log("\n❌ Deleting model...");
//     console.log(await addModifyAIModelPricingData({
//       adminRole: "superAdmin",
//       action: "delete",
//       modelsData: ["gemini 2.5 flash"],
//     }));

//     process.exit(0);
//   })();
// }

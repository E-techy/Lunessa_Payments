/**
 * Utility function to fetch AI model pricing data.
 *
 * @module getAIModelPricingData
 */

const { PrismaClient } = require("../generated/customer-service");
const prisma = new PrismaClient();

/**
 * Fetch AI model pricing data from the database.
 *
 * @async
 * @function getAIModelPricingData
 * @param {Object} params - The input parameters.
 * @param {string|null} [params.modelName=null] - Optional model name to filter (e.g., "gpt-4").
 * @returns {Promise<Object>} Returns an object with success flag and model data.
 *
 * @example
 * // Get all models
 * const allModels = await getAIModelPricingData({});
 *
 * @example
 * // Get a specific model
 * const gpt4Data = await getAIModelPricingData({ modelName: "gpt-4" });
 */
async function getAIModelPricingData({ modelName = null }) {
  try {
    let models;

    if (modelName) {
      models = await prisma.AIModel.findUnique({
        where: { modelName },
      });
      if (!models) {
        return { success: false, error: `Model '${modelName}' not found` };
      }
      // remove timestamps
      // const { createdAt, updatedAt, ...cleanedModel } = models;
      return { success: true, data: models };
    }

    // fetch all models
    models = await prisma.AIModel.findMany();

    // strip timestamps
    // const cleanedModels = models.map(({ createdAt, updatedAt, ...rest }) => rest);

    return { success: true, data: models };
  } catch (err) {
    console.error("❌ Error in getAIModelPricingData:", err);
    return { success: false, error: "Internal server error while fetching AI model pricing data" };
  }
}

module.exports = getAIModelPricingData;




// 🧪 Simple test runner (run: node utils/get_AI_model_pricing_data.js)
if (require.main === module) {
  (async () => {
    console.log("🔍 Fetching ALL models...");
    console.log(await getAIModelPricingData({}));

    console.log("\n🔍 Fetching specific model: gpt-4...");
    console.log(await getAIModelPricingData({ modelName: "gpt-4" }));

    process.exit(0);
  })();
}

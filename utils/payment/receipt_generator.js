/**
 * Generate a unique receipt number.
 *
 * @function generateReceipt
 * @param {string} prefix - Input string to use as the base of the receipt.
 * @param {number} maxLength - Maximum length allowed for the receipt string (must be >= 13).
 * @returns {{success: boolean, receipt?: string, error?: string}}
 *
 * @example
 * const result = generateReceipt("orderAshutosh", 20);
 * if (result.success) {
 *   console.log("✅ Receipt:", result.receipt);
 * } else {
 *   console.error("❌ Error:", result.error);
 * }
 */
function generateReceipt(prefix, maxLength) {
  try {
    if (!prefix || typeof prefix !== "string") {
      return { success: false, error: "Invalid prefix. Must be a string." };
    }

    if (!maxLength || typeof maxLength !== "number" || maxLength < 13) {
      return { success: false, error: "Invalid maxLength. Must be a number >= 13 (timestamp length)." };
    }

    // Current timestamp in milliseconds (13 digits max as of now)
    const timestamp = Date.now().toString();

    // Reserve space for timestamp (always 13 chars max)
    const reservedForTimestamp = 13;

    // Remaining space for prefix
    const allowedPrefixLength = maxLength - reservedForTimestamp;

    // Keep starting part of prefix, cut from right if too long
    const finalPrefix = prefix.length > allowedPrefixLength
      ? prefix.slice(0, allowedPrefixLength)
      : prefix;

    // Build final receipt
    const receipt = `${finalPrefix}${timestamp}`.slice(0, maxLength);

    return { success: true, receipt };
  } catch (error) {
    console.error("❌ Error generating receipt:", error);
    return { success: false, error: error?.message || "Unknown error generating receipt" };
  }
}

module.exports = generateReceipt;

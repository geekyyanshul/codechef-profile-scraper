/**
 * Safely extracts and trims text content from a Cheerio element using a selector.
 * @param {cheerio.Root} $ - The Cheerio instance.
 * @param {string} selector - The CSS selector.
 * @returns {string} - The trimmed text content or an empty string if not found.
 */
const safeGetText = ($, selector) => {
    try {
      const text = $(selector).text().trim();
      return text;
    } catch (e) {
      console.warn(`[Helper] Error getting text for selector: ${selector}`);
      return '';
    }
  };
  
  module.exports = { safeGetText };
  
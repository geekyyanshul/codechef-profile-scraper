const axios = require('axios');
const cheerio = require('cheerio');
const { safeGetText } = require('../utils/parseHelpers');

/**
 * Scrapes the public CodeChef profile for a given username.
 * @param {string} username - The CodeChef username.
 * @returns {Promise<object>} - An object containing the scraped profile data.
 */
const scrapeCodeChefProfile = async (username) => {
  const url = `https://www.codechef.com/users/${username}`;

  try {
    // Fetch the HTML of the profile page
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
      }
    });

    const $ = cheerio.load(data);

    // Check if the user profile is valid by looking for a key element
    if ($('.rating-number').length === 0) {
      throw new Error('User not found or profile is not public');
    }

    // --- Extract Data using provided selectors ---

    // Main details
    const name = safeGetText($, '.user-details-container header h2');
    const profilePic = $('.user-details-container img').attr('src') || '';

    // Rating details
    const rating = safeGetText($, '.rating-number');
    const stars = safeGetText($, '.rating-star');

    // Rank details
    const globalRank = safeGetText($, '.rating-ranks ul li:nth-child(1) strong');
    const countryRank = safeGetText($, '.rating-ranks ul li:nth-child(2) strong');

    const profileData = {
      name,
      username,
      profilePic,
      rating,
      stars,
      globalRank,
      countryRank,
      profileUrl: url,
    };

    return profileData;

  } catch (error) {
    // Log the error and re-throw it to be handled by the server
    console.error(`[Scraper] Failed to scrape ${url}: ${error.message}`);
    if (error.response && error.response.status === 404) {
      throw new Error('User not found');
    }
    throw error;
  }
};

module.exports = { scrapeCodeChefProfile };

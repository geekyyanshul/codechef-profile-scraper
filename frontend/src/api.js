import axios from 'axios';

// Create an Axios instance with the backend base URL
const apiClient = axios.create({
  baseURL: 'http://localhost:5000', // Your backend URL
});

/**
 * Fetches the scraped profile data for a given CodeChef username.
 * @param {string} username - The CodeChef username.
 * @returns {Promise<axios.Response>} - The Axios response object.
 */
export const fetchProfile = (username) => {
  return apiClient.get(`/profile/${username}`);
};

// --- FIX: Import 'React' directly to resolve the ReferenceError ---
import React, { useState } from 'react'; 
// --- FIX: Bundle all code into one file for the preview environment ---
import axios from 'axios'; // External dependency

// --- CSS styles from App.css ---
const styles = `
:root {
  font-family: 'Inter', system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  
  --color-bg: #f4f7f6;
  --color-card: #ffffff;
  --color-primary: #007bff;
  --color-primary-dark: #0056b3;
  --color-text: #212529;
  --color-text-secondary: #5a626b;
  --color-error: #dc3545;
  --shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  --border-radius: 8px;
}

body {
  margin: 0;
  background-color: var(--color-bg);
  color: var(--color-text);
  min-height: 100vh;
}

#root, .app-container-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

/* --- App Container --- */
.app-container {
  width: 100%;
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: var(--color-card);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  text-align: center;
}

h1 {
  margin-top: 0;
  color: var(--color-text);
}

/* --- Search Form --- */
.search-form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.search-form input[type="text"] {
  flex-grow: 1;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #ced4da;
  border-radius: var(--border-radius);
  transition: border-color 0.2s, box-shadow 0.2s;
}

.search-form input[type="text"]:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
}

.search-form button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: #fff;
  background-color: var(--color-primary);
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: background-color 0.2s;
}

.search-form button:hover {
  background-color: var(--color-primary-dark);
}

/* --- States: Loading & Error --- */
.error-message {
  color: var(--color-error);
  font-weight: 500;
  margin: 1rem 0;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 2rem auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* --- Profile Card Component --- */
.profile-card {
  margin-top: 2rem;
  padding: 1.5rem;
  border: 1px solid #e9ecef;
  border-radius: var(--border-radius);
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.profile-pic {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.profile-info h2 {
  margin: 0;
  font-size: 1.75rem;
}

.profile-info a {
  color: var(--color-text-secondary);
  text-decoration: none;
  font-size: 1.1rem;
}

.profile-info a:hover {
  text-decoration: underline;
}

.profile-stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.stat-item {
  background-color: var(--color-bg);
  padding: 1rem;
  border-radius: var(--border-radius);
}

.stat-item-label {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  display: block;
  margin-bottom: 0.25rem;
}

.stat-item-value {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text);
}

/* Responsive */
@media (max-width: 480px) {
  .app-container {
    padding: 1rem;
  }
  
  .search-form {
    flex-direction: column;
  }

  .profile-stats-grid {
    grid-template-columns: 1fr;
  }
}
`;

// --- API Client (from api.js) ---
const apiClient = axios.create({
  baseURL: 'http://localhost:5000', // Your backend URL
});

/**
 * Fetches the scraped profile data for a given CodeChef username.
 * @param {string} username - The CodeChef username.
 * @returns {Promise<axios.Response>} - The Axios response object.
 */
const fetchProfile = (username) => {
  return apiClient.get(`/profile/${username}`);
};

// --- ProfileCard Component (from components/ProfileCard.jsx) ---
/**
 * A component to display the scraped CodeChef profile information.
 * @param {object} props - Component props.
 * @param {object} props.profile - The profile data object.
 */
const ProfileCard = ({ profile }) => {
  const {
    name,
    username,
    profilePic,
    rating,
    stars,
    globalRank,
    countryRank,
    profileUrl,
  } = profile;

  return (
    <div className="profile-card">
      <div className="profile-header">
        <img 
          src={profilePic} 
          alt={`${name}'s profile picture`}
          className="profile-pic"
          // Fallback image in case the src is broken or relative
          onError={(e) => e.target.src = 'https://placehold.co/100x100/eeeeee/cccccc?text=User'}
        />
        <div className="profile-info">
          <h2>{name}</h2>
          <a href={profileUrl} target="_blank" rel="noopener noreferrer">
            @{username}
          </a>
        </div>
      </div>

      <div className="profile-stats-grid">
        <div className="stat-item">
          <span className="stat-item-label">Rating</span>
          <span className="stat-item-value">{rating || 'N/A'}</span>
        </div>
        <div className="stat-item">
          <span className="stat-item-label">Stars</span>
          <span className="stat-item-value">{stars || 'N/A'}</span>
        </div>
        <div className="stat-item">
          <span className="stat-item-label">Global Rank</span>
          <span className="stat-item-value">{globalRank || 'N/A'}</span>
        </div>
        <div className="stat-item">
          <span className="stat-item-label">Country Rank</span>
          <span className="stat-item-value">{countryRank || 'N/A'}</span>
        </div>
      </div>
    </div>
  );
};


// --- Main App Component ---
function App() {
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * Handles the form submission to fetch a user's profile.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username) {
      setError('Please enter a username.');
      return;
    }

    // Reset state before new search
    setLoading(true);
    setProfile(null);
    setError('');

    try {
      const response = await fetchProfile(username);
      setProfile(response.data);
    } catch (err) {
      // Handle errors from the API (e.g., 404 Not Found)
      const errorMessage = err.response?.data?.error || 'Failed to fetch profile. Please try again.';
      setError(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    // This wrapper is needed so the styles apply correctly
    <div className="app-container-wrapper"> 
      <style>{styles}</style>
      <div className="app-container">
        <h1>CodeChef Profile Scraper</h1>
        
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // <-- FIX: Removed the "g." typo
            placeholder="Enter CodeChef Username"
            aria-label="CodeChef Username"
          />
          <button type="submit" disabled={loading}>
            {loading ? '...' : 'Get Profile'}
          </button>
        </form>

        {/* --- Display States --- */}

        {/* Loading Spinner */}
        {loading && <div className="loading-spinner"></div>}

        {/* Error Message */}
        {error && <p className="error-message">{error}</p>}

        {/* Profile Card */}
        {profile && <ProfileCard profile={profile} />}

      </div>
    </div>
  );
}

export default App;


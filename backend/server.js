const express = require('express');
const cors = require('cors'); // Make sure cors is installed
const dotenv = require('dotenv');
const { scrapeCodeChefProfile } = require('./scraper/codechefScraper');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


// --- Middlewares ---

// FIX: Explicitly configure CORS to allow your frontend's origin
const corsOptions = {
  origin: 'http://localhost:5173', // Your frontend URL
  optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions)); // Use the configured cors middleware
app.use(express.json()); // Middleware to parse JSON bodies

// --- Routes ---

/**
 * GET /profile/:username
 * Scrapes a CodeChef user's profile.
 */
app.get('/profile/:username', async (req, res) => {
  try {
    const { username } = req.params;
    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }
    
    console.log(`Scraping profile for: ${username}`);
    const profileData = await scrapeCodeChefProfile(username);
    res.status(200).json(profileData);

  } catch (error) {
    console.error('Error in /profile endpoint:', error.message);
    
    // Determine status code based on error message
    const statusCode = error.message === 'User not found' ? 404 : 500;
    res.status(statusCode).json({ error: error.message });
  }
});

// --- Server Startup ---
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});


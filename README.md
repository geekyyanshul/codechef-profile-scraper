CodeChef Profile Scraper

A full-stack web application that scrapes and displays a user's CodeChef profile statistics. Enter a CodeChef username to fetch their rating, rank, and more.
 
 Features

User Profile Stats: Fetches Name, Username, Rating, and Star Rating.
  
Rankings: Displays Global and Country ranks.

Profile Picture: Shows the user's profile picture.
 
Direct Link: Provides a clickable link to the user's CodeChef profile.

Error Handling: Gracefully handles invalid usernames or server errors.

Loading State: Shows a spinner while fetching data.

🛠️ Tech Stack

This project is built with a separate frontend and backend.

Backend:

Node.js 

Express (For the REST API)

Axios (For making HTTP requests to CodeChef)

Cheerio (For web scraping / parsing the HTML)

CORS (For cross-origin requests)

Frontend:

React (Vite)

Axios (For fetching data from the backend)

CSS (For custom styling)

🚀 How to Run Locally

You will need two terminals running simultaneously to run this project.

1. Backend Server

# Navigate to the backend folder
cd backend

# Install dependencies
npm install

# Start the server (runs on http://localhost:5000 by default)
node server.js


2. Frontend App

# (In a new terminal)
# Navigate to the frontend folder
cd frontend

# Install dependencies
npm install

# Start the dev server (runs on http://localhost:5173)
npm run dev


You can now view the app in your browser at http://localhost:5173.

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Note: We import the CSS here in the main entry point
// so it's loaded globally for the entire app.
import './App.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

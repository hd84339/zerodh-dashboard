import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";

// Listen for messages from landing page
window.addEventListener('message', (event) => {
  // Only accept messages from frontend origin
  if (event.origin !== 'http://localhost:3000') return;

  try {
    const data = event.data || {};
    
    // Handle AUTH_TOKEN message - store token and user
    if (data.type === 'AUTH_TOKEN' && data.token) {
      localStorage.setItem('token', data.token);
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
    }
    
    // Handle LOGOUT message
    if (data.type === 'LOGOUT') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = 'http://localhost:3000/';
    }
  } catch (e) {
    console.error('Error processing message:', e);
  }
});

// Request token from opener if needed
if (!localStorage.getItem('token') && window.opener) {
  try {
    window.opener.postMessage({ type: 'REQUEST_TOKEN' }, 'http://localhost:3000');
  } catch (e) {
    console.error('Error requesting token:', e);
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

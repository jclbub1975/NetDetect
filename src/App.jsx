import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import './Styles/index.css';
import Navbar from "./Components/Navbar.jsx";
import Home from "./Pages/Home.jsx";
import About from "./Pages/About.jsx";
import Signin from "./Pages/Signin.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import Contact from "./Pages/Contact.jsx";
import { auth } from "./Components/firebase"; // Import Firebase auth instance
import Popup from "./Components/Popup"; // Import Popup component if it exists

function App() {
  const [user, setUser] = useState(null);  // Track logged-in user
  const [showSignIn, setShowSignIn] = useState(false); // Control sign-in modal visibility

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);  // Update user state when auth changes
    });
    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  return (
    <Router>
      <Navbar user={user} onSignInClick={() => setShowSignIn(true)} /> {/* Pass user info and sign-in handler */}

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route 
            path="/contact" 
            element={<Contact isSignedIn={!!user} onSignIn={() => setShowSignIn(true)} />} 
          />
          <Route 
            path="/signin"  
            element={user ? <Navigate to="/dashboard" /> : <Signin />} // Redirect if logged in
          />
          <Route 
            path="/dashboard" 
            element={user ? <Dashboard /> : <Navigate to="/signin" />} // Protect dashboard route
          />
        </Routes>
      </div>

      {/* Sign-In Modal */}
      {showSignIn && (
        <Popup 
          isShow={showSignIn} 
          close={() => setShowSignIn(false)} 
          onSignInSuccess={() => setShowSignIn(false)} // Close modal on success
        />
      )}
    </Router>
  );
}

export default App;

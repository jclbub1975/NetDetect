import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import './Styles/index.css'; 

import Navbar from "./Components/Navbar.jsx"; 
import Home from "./Pages/Home.jsx"; 
import About from "./Pages/About.jsx"; 
import Contact from "./Pages/Contact.jsx";
import Signin from "./Pages/Signin.jsx"; 
import { auth } from "./Components/firebase"; // Ensure you import auth for checking login status

function App() {
  const [user, setUser] = useState(null);  // To track the logged-in user

  // Monitor authentication state
  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((currentUser) => {
  //     setUser(currentUser);  // Set user if logged in
  //   });
  //   return () => unsubscribe();  // Cleanup on unmount
  // }, []);

  return (
    <Router>
      <div className="App">
        <Navbar user={user} />  {/* Pass user info to Navbar */}

        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route 
              path="/signin" 
              element={user ? <Navigate to="/dashboard" /> : <Signin />}  // Redirect if logged in
            />
            {/* You can add more protected routes here */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

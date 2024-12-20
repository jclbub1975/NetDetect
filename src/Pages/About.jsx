import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Components/firebase"; // Import Firebase auth instance
import Navbar from "../Components/Navbar";
import Popup from "../Components/Popup"; // Import Sign-In modal
import TypingEffect1 from '../Components/TypingEffect1';
import Image1 from '../assets/robot1.gif';

const About = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // State for controlling modal visibility
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user login status

  // Open modal for Sign In
  const openModal = () => setIsModalOpen(true);
  // Close modal
  const closeModal = () => setIsModalOpen(false);

  // Check user login status with Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user); // Set login status based on user authentication
    });
    return () => unsubscribe(); // Clean up subscription
  }, []);

  // Navigate to dashboard if logged in
  const handleSignInSuccess = () => {
    closeModal(); // Close the sign-in modal
    navigate("/dashboard"); // Navigate to the dashboard
  };

  return (
    <>
      <Navbar onSignInClick={openModal} /> {/* Pass openModal function to Navbar */}

      <div className="min-h-screen w-full bg-gradient-to-b from-purple-500 to-blue-500 flex flex-col items-center justify-center text-center p-12 overflow-y-auto">
        <div className="max-w-4xl w-full bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-5xl text-red-700 font-semibold mb-4">
            About <br />
            <TypingEffect1 />
          </h1>
          <img
            src={Image1}
            alt="Network Management System"
            className="w-half h-auto rounded-lg shadow-md mb-6 mx-auto"
          />
          <p className="text-lg text-gray-700 mb-20 text-justify ml-8">
            AI-Based Real-Time Monitoring with Intrusion Prevention and Self-Healing Capabilities.
          </p>
          <p className="text-3xl text-blue-700 mb-12">
            About Our Network Management System
          </p>
          <p className="text-lg text-gray-700 mb-12 text-justify ml-8 mr-8">
            Our Network Management System is designed to provide organizations with a comprehensive and user-friendly solution for monitoring, managing, and securing their networks. Featuring a Centralized Dashboard, the system offers real-time insights through AI-driven traffic analysis, optimizing resource allocation and preventing congestion. Security is a top priority with Automated User Monitoring and Intrusion Detection to safeguard against unauthorized access and potential threats. Our strong Usage Analytics generate detailed reports, while Anomaly Detection flags unusual behavior to ensure proactive responses. Built for scalability, our platform adapts to your organization's growth, empowering you to focus on your core objectives with confidence that your network is secure and efficient.
          </p>
        </div>
      </div>

      {/* Modal for Sign-In */}
      {isModalOpen && (
        <Popup
          isShow={isModalOpen}
          close={closeModal} // Pass closeModal function to the modal
          onSignInSuccess={handleSignInSuccess} // Handle navigation after sign-in
        />
      )}
    </>
  );
};

export default About;

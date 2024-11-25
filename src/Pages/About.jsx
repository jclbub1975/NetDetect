import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Popup from "../Components/Popup"; // Import Popup modal component
import TypingEffect1 from '../Components/TypingEffect1';
import '../Styles/blink.css'; // Adjust the path according to your folder structure
import Image1 from '../assets/robot1.gif'; // Adjust the path to your image

const About = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // State for controlling the modal visibility

  // Check if the user is logged in and redirect to the dashboard if so
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]); // Added navigate dependency for better React practice

  // Logout functionality
  const logout = () => {
    localStorage.removeItem("access_token");
    window.scrollTo(0, 0);
    navigate("/");
  };

  // Open modal for Sign In
  const openModal = () => setIsModalOpen(true);
  // Close modal
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Navbar onSignInClick={openModal} /> {/* Pass openModal function to Navbar */}
      <div className="min-h-screen w-full bg-blue-200 flex flex-col items-center justify-center text-center p-12">
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
            Our Network Management System is designed to provide organizations with a comprehensive and user-friendly solution for monitoring, managing, and securing their networks. Featuring a Centralized Dashboard, the system offers real-time insights through AI-driven traffic analysis, optimizing resource allocation and preventing congestion. Security is a top priority, with Automated User Monitoring and Intrusion Detection to safeguard against unauthorized access and potential threats. Our robust Usage Analytics generates detailed reports, while Anomaly Detection flags unusual behavior to ensure proactive responses. Built for scalability, our platform adapts to your organization's growth, empowering you to focus on your core objectives with confidence that your network is secure and efficient.
          </p>
          <p className="text-3xl text-orange-700 mb-12">
            FEATURES
          </p>
          <p className="text-2xl text-blue-700 mb-12 text-left ml-8">
            AI-POWERED INTRUSION ALERT
          </p>
          <button
            onClick={logout}
            className="bg-red-500 text-white text-xl font-semibold py-2 px-6 rounded-md hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Modal for Sign In
      {isModalOpen && (
        <Popup
          isShow={isModalOpen}
          close={closeModal} // Pass closeModal function to the modal
        /> */}
      {/* )} */}
    </>
  );
};

export default About;

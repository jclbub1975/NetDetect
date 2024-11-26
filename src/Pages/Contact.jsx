import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Components/firebase"; // Import Firebase auth instance
import Navbar from "../Components/Navbar";
import Popup from "../Components/Popup"; // Sign-in modal
import Popup1 from "../Components/Popup1"; // Message sent modal

const ContactUs = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // For Sign-In modal
  const [isMessageSent, setIsMessageSent] = useState(false); // For Message Sent modal
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user login status
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Check if the user is logged in using Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user); // Set true if user exists, otherwise false
    });
    return () => unsubscribe(); // Clean up subscription
  }, []);

  // Open and close modals
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openMessageModal = () => setIsMessageSent(true);
  const closeMessageModal = () => setIsMessageSent(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      openModal();  // Show sign-in modal if not logged in
    } else {
      openMessageModal(); // Show message sent modal if logged in
    }
  };

  const handleSignInSuccess = () => {
    closeModal(); // Close sign-in modal
    openMessageModal(); // Show message sent modal after sign-in
  };

  const closeMessageModalAndNavigate = () => {
    closeMessageModal();
    navigate("/"); // Navigate to the homepage after closing the modal
  };

  return (
    <>
      <Navbar onSignInClick={openModal} />
      <div className="bg-gradient-to-b from-purple-500 to-blue-500 min-h-[800px] flex items-center justify-center">
        <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">Contact Us</h2>
          <p className="text-center text-gray-600 mb-6">
            Got a question? We’d love to hear from you. Send us a message and we’ll respond as soon as possible.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name*</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md mt-2"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address*</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md mt-2"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full p-3 border border-gray-300 rounded-md mt-2"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Modal for Sign-In (only show if user isn't logged in) */}
      {!isLoggedIn && isModalOpen && (
        <Popup 
          isShow={isModalOpen} 
          close={closeModal} 
          type="signin" 
          onSignInSuccess={handleSignInSuccess} 
        />
      )}

      {/* Modal for Message Sent Confirmation */}
      {isMessageSent && (
        <Popup1 isShow={isMessageSent} close={closeMessageModal}>
          <div className="p-4 text-center">
            <h3 className="text-2xl font-semibold text-green-600 mb-4">Message Sent!</h3>
            <p className="text-gray-700">Thank you for reaching out. We will get back to you shortly.</p>
            <button
              onClick={closeMessageModalAndNavigate}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            >
              Close
            </button>
          </div>
        </Popup1>
      )}
    </>
  );
};

export default ContactUs;

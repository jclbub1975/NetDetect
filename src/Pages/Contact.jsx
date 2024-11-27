import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Components/firebase"; // Import Firebase auth instance
import Navbar from "../Components/Navbar";
import Popup from "../Components/Popup"; // Sign-in modal
import Popup1 from "../Components/Popup1"; // Message sent modal
import emailjs from "emailjs-com";

const ContactUs = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // For Sign-In modal
  const [isMessageSent, setIsMessageSent] = useState(false); // For Message Sent modal
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user login status
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
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

  const handleSubmit = async () => {

    const serviceId = import.meta.env.VITE_SEVICE_ID;
    const templateId = import.meta.env.VITE_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_PUBLIC_KET;

    const templateParams = {
      from_name: formData.from_name,
      from_email: formData.from_email,
      message: formData.message
    };

    try {
      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );
      if(response){
        openMessageModal();
      }

    }catch(error){
      console.log(error)
    }
  };
  

  const handleSignInSuccess = () => {
    // Set login status to true after successful sign-in
    setIsLoggedIn(true);
    closeModal(); // Close sign-in modal
    
    // Immediately show the message sent modal after successful sign-in
    openMessageModal();
  };

  const closeMessageModalAndNavigate = () => {
    closeMessageModal();
    navigate("/dashboard"); // Navigate to the homepage after closing the modal
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

          <div>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name*</label>
              <input
                type="text"
                id="from_name"
                name="from_name"
                value={formData.from_name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md mt-2"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address*</label>
              <input
                type="email"
                id="from_email"
                name="from_email"
                value={formData.from_email}
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
            <button onClick={handleSubmit}
              className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            >
              Send Message
            </button>
          </div>
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

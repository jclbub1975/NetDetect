import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Components/firebase";
import Navbar from "../Components/Navbar";
import Popup from "../Components/Popup"; // Sign-in modal
import Popup1 from "../Components/Popup1"; // Message sent and alert modal
import emailjs from "emailjs-com";

const ContactUs = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // For Sign-In modal
  const [isMessageSent, setIsMessageSent] = useState(false); // For Message Sent modal
  const [isAlertOpen, setIsAlertOpen] = useState(false); // For Validation Alert modal
  const [alertMessage, setAlertMessage] = useState(''); // Validation message
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    message: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openMessageModal = () => setIsMessageSent(true);
  const closeMessageModal = () => setIsMessageSent(false);
  const openAlertModal = (message) => {
    setAlertMessage(message);  // Set custom alert message
    setIsAlertOpen(true);       // Open validation alert modal
  };
  const closeAlertModal = () => setIsAlertOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { from_name, from_email, message } = formData;
    if (!from_name.trim() || !from_email.trim() || !message.trim()) {
      openAlertModal("Please fill in all fields before submitting.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(from_email)) {
      openAlertModal("Please enter a valid email address.");
      return;
    }

    const serviceId = import.meta.env.VITE_SEVICE_ID;
    const templateId = import.meta.env.VITE_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_PUBLIC_KET;

    const templateParams = {
      from_name: formData.from_name,
      from_email: formData.from_email,
      message: formData.message,
    };

    try {
      const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      if (response.status === 200) {
        openMessageModal();  // Show success modal
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      openAlertModal("Failed to send the message. Please try again later.");
    }
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
            <button
              onClick={handleSubmit}
              className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            >
              Send Message
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Sign-In */}
      {!isLoggedIn && isModalOpen && (
        <Popup
          isShow={isModalOpen}
          close={closeModal}
          type="signin"
          onSignInSuccess={() => {
            setIsLoggedIn(true);
            closeModal();
          }}
        />
      )}

      {/* Modal for Message Sent Confirmation */}
      {isMessageSent && (
        <Popup1 isShow={isMessageSent} close={closeMessageModal}>
          <div className="p-4 text-center">
            <h3 className="text-2xl font-semibold text-green-600 mb-4">Message Sent!</h3>
            <p className="text-gray-700">Thank you for reaching out. We will get back to you shortly.</p>
            <button
              onClick={() => {
                closeMessageModal();
                navigate("/dashboard");
              }}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            >
              Close
            </button>
          </div>
        </Popup1>
      )}

      {/* Modal for Validation Alerts */}
      {isAlertOpen && (
        <Popup1 isShow={isAlertOpen} close={closeAlertModal}>
          <div className="p-4 text-center">
            <h3 className="text-2xl font-semibold text-red-600 mb-4">Alert!</h3>
            <p className="text-gray-700">{alertMessage}</p>
            <button
              onClick={closeAlertModal}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
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

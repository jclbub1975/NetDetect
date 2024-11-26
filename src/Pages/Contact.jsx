import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Popup from "../Components/Popup"; // Import Popup modal component
import TypingEffect1 from '../Components/TypingEffect1';
import '../Styles/blink.css';
import Image1 from '../assets/robot1.gif';

const Contact = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // State for controlling the modal visibility

  // Check if the user is logged in and redirect to the dashboard if so
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  // Open modal for Sign In
  const openModal = () => setIsModalOpen(true);
  // Close modal
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Navbar onSignInClick={openModal} /> {/* Pass openModal function to Navbar */}

      <section
                id="contact"
                className="contact flex flex-row items-center h-screen px-[10%] py-[5%] bg-gradient-to-br from-blue-200 via-white to-blue-100 relative overflow-hidden"
            >
                <h2 className="text-[#000] mr-[3rem]">Site under construction</h2>
                <p className="text-[#999]">We'll notify you when it's done!</p>
            </section>


      {/* Modal for Sign In */}
      {isModalOpen && (
        <Popup
          isShow={isModalOpen}
          close={closeModal} // Pass closeModal function to the modal
        />
      )}
    </>
  );
};

export default Contact;

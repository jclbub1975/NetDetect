import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, setPersistence, browserLocalPersistence } from "firebase/auth";
import { auth } from "../Components/firebase"; // Import Firebase auth instance
import Navbar from "../Components/Navbar";
import Popup from "../Components/Popup"; // Import Sign-In modal

const Dashboard = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // State for controlling modal visibility
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Track user login status (null means loading)
  const [isLoading, setIsLoading] = useState(true); // Loading state for auth checking

  // Open modal for Sign In
  const openModal = () => setIsModalOpen(true);
  // Close modal
  const closeModal = () => setIsModalOpen(false);

  // Set Firebase auth persistence to local for session persistence
  useEffect(() => {
    // Set persistence to local to keep the user signed in across page reloads
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          // Authentication state has been checked and updated
          if (user) {
            setIsLoggedIn(true);
            navigate("/dashboard"); // Navigate to the dashboard if user is logged in
          } else {
            setIsLoggedIn(false);
            navigate("/"); // Navigate to home page if user is not logged in
          }
          setIsLoading(false); // Stop the loading once auth state is checked
        });

        return () => unsubscribe(); // Clean up the subscription when the component is unmounted
      })
      .catch((error) => {
        console.error("Error setting persistence:", error);
        setIsLoading(false); // Stop the loading in case of an error
      });
  }, [navigate]);

  // Handle successful sign-in
  const handleSignInSuccess = () => {
    console.log("Sign-in success!");
    closeModal(); // Close the sign-in modal
    navigate("/dashboard"); // Navigate to the dashboard after successful sign-in
  };

  // If still loading the auth state, show a loading spinner or message
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar onSignInClick={openModal} /> {/* Pass openModal function to Navbar */}

      <div className="min-h-screen w-full bg-gradient-to-b from-purple-500 to-blue-500 flex flex-col items-center justify-center text-center p-12 overflow-y-auto">
        <div className="max-w-4xl w-full bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-5xl text-red-700 font-semibold mb-4">
            Site under construction <br />
          </h1>
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

export default Dashboard;

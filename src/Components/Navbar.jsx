import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faPhone, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase'
import { useNavigate } from 'react-router-dom';


function Navbar({ onSignInClick }) {
  // State to track if the user is signed in
  const [isSignedIn, setIsSignedIn] = useState(false);
  const Navigate = useNavigate();

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsSignedIn(!!user); // Set to true if user is signed in, otherwise false
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, []);

  // Handle sign-out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      Navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="navbar fixed top-0 left-0 w-full bg-white shadow-md text-[#285FF8] flex justify-between items-center z-10 px-10 py-4 transition-all duration-300">
      <div className="logo text-[1.5rem] font-semibold tracking-tight text-[#285FF8] hover:text-blue-700 transition duration-300">
        NetDetect
      </div>

      <ul className="flex gap-[5rem] items-center">
        <li>
          <Link
            to="/"
            className="flex items-center gap-4 text-[1.1rem] hover:text-[#1d4ed8] transition duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#1d4ed8] hover:after:w-full after:transition-width after:duration-500">
            <FontAwesomeIcon icon={faHome} />
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className="flex items-center gap-4 text-[1.1rem] hover:text-[#1d4ed8] transition duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#1d4ed8] hover:after:w-full after:transition-width after:duration-500">
            <FontAwesomeIcon icon={faInfoCircle} />
            About Us
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className="flex items-center gap-4 text-[1.1rem] hover:text-[#1d4ed8] transition duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#1d4ed8] hover:after:w-full after:transition-width after:duration-500">
            <FontAwesomeIcon icon={faPhone} />
            Contact
          </Link>
        </li>
      </ul>

      <div className="flex gap-4">
        {isSignedIn ? (
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 py-2 px-6 rounded-xl text-[1rem] text-white bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 transition duration-300 shadow-md hover:shadow-lg"
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            Log Out
          </button>
        ) : (
          <button
            onClick={onSignInClick}
            className="flex items-center gap-2 py-2 px-6 rounded-xl text-[1rem] text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition duration-300 shadow-md hover:shadow-lg"
          >
            <FontAwesomeIcon icon={faSignInAlt} />
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

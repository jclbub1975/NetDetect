import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from './firebase'; // Adjust path as needed
import { toast } from 'react-toastify';

const provider = new GoogleAuthProvider();

const GoogleSignInButton = ({ onSuccessRedirect = '/dashboard', buttonText = 'Sign in with Google' }) => {
  
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      toast.success('Logged in with Google successfully!', { position: 'top-center' });
      window.location.href = onSuccessRedirect; // Use navigate if you're using React Router
    } catch (error) {
      console.error(error.message);
      toast.error('Google sign-in failed: ' + error.message, { position: 'bottom-center' });
    }
  };

  return (
    <button
     onClick={handleGoogleSignIn} 
     className="btn btn-danger mt-2" aria-label={buttonText}>
      {buttonText}
    </button>
  );
};

export default GoogleSignInButton;

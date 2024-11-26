import React, { useEffect, useRef, useState } from 'react';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Popup({ isShow, close, type, onSignInSuccess  }) {
  const modalRef = useRef(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      handleRememberMe(); // Handle local storage based on Remember Me
      
      if (onSignInSuccess) {  // Trigger the callback if provided
        onSignInSuccess();
      }
      
      close();  // Close the sign-in modal
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    }
  };


  // Retrieve credentials from local storage if they exist
  useEffect(() => {
    const savedEmail = localStorage.getItem('savedEmail');
    const savedPassword = localStorage.getItem('savedPassword');
    
    if (savedEmail) setEmail(savedEmail);
    if (savedPassword) setPassword(savedPassword);
    setRememberMe(savedEmail || savedPassword ? true : false);
    
    // Set focus on modal when it opens
    if (isShow && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isShow]);

  // Save or remove credentials based on Remember Me checkbox
  const handleRememberMe = () => {
    if (rememberMe) {
      localStorage.setItem('savedEmail', email);
      localStorage.setItem('savedPassword', password);
    } else {
      localStorage.removeItem('savedEmail');
      localStorage.removeItem('savedPassword');
    }
  };

  // Close modal when clicking outside the content
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      close();
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ${isShow ? 'block' : 'hidden'}`}
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full outline-none"
        tabIndex="-1" // Makes the modal focusable
        role="dialog"
        aria-modal="true"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {type === 'signup' ? 'Sign Up' : 'Sign In'}
        </h2>
        <form className="flex flex-col gap-4" onSubmit={handleSignIn}>
          <input
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            placeholder="Email"
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            value={password}
            placeholder="Password"
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="rememberMe" className="text-gray-600 text-sm">
              Remember Me
            </label>
          </div>
          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            {type === 'signup' ? 'Create Account' : 'Sign In'}
          </button>
        </form>
        <button
          onClick={close}
          className="mt-4 text-blue-600 text-center w-full transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Popup;

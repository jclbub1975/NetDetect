import React, { useEffect, useRef, useState } from 'react';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Popup({ isShow, close, type }) {
  const modalRef = useRef(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve credentials from local storage if they exist
    const savedEmail = localStorage.getItem('savedEmail');
    const savedPassword = localStorage.getItem('savedPassword');
    
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true); // If email is found, the "Remember Me" box is checked
    }
    if (savedPassword) {
      setPassword(savedPassword);
      setRememberMe(true); // If password is found, the "Remember Me" box is checked

    }
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      
      if (rememberMe) {
        // Save credentials in local storage
        localStorage.setItem('savedEmail', email);
        localStorage.setItem('savedPassword', password); // Storing password is optional but can be useful for autofill
      } else {
        // Clear credentials from local storage
        localStorage.removeItem('savedEmail');
        localStorage.removeItem('savedPassword');
      }

      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
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
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {type === 'signup' ? 'Sign Up' : 'Sign In'}
        </h2>
        <form className="flex flex-col gap-4" onSubmit={handleSignIn}>
          <input
            type="email"
            name="email"
            autoComplete="email" // Ensures autofill for the email
            value={email}
            placeholder="Email"
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            autoComplete="current-password" // Enables password autofill
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
            {type === 'signup' ? 'Create Account' : 'Submit'}
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

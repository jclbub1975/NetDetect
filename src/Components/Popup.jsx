import React, { useEffect, useRef } from 'react';

function Popup({ isShow, close, type }) {
  const modalRef = useRef(null);

  // Close modal when clicking outside the content
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      close();
    }
  };

  useEffect(() => {
    if (isShow) {
      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isShow]);

  if (!isShow) return null;

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
        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
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

// src/components/Popup1.jsx
import React from "react";

const Popup1 = ({ isShow, close, children }) => {
  if (!isShow) return null; // Don't render if isShow is false

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full relative">
        {children}
        <button
          onClick={close}
          className="absolute top-2 right-4 text-gray-600 hover:text-gray-900 text-2xl"
        >
          &times; {/* Close button */}
        </button>
      </div>
    </div>
  );
};

export default Popup1;

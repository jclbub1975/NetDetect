import React, { useEffect, useRef } from "react";

const Popup1 = ({ close, children }) => {
  const modalRef = useRef(null);

  // Set focus on the modal when it opens
  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }
  }, []);

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full relative outline-none"
        tabIndex="-1" // Makes the modal focusable
      >
        {children}
        <button
          onClick={close}
          className="absolute top-2 right-4 text-gray-600 hover:text-gray-900 text-2xl"
          aria-label="Close modal"
        >
          &times; {/* Close button */}
        </button>
      </div>
    </div>
  );
};

export default Popup1;

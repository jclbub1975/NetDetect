import React from 'react';

function Popup({ isShow, close }) {
  if (!isShow) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-20 grid place-items-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl mb-4">Sign In</h2>
        <form className="flex flex-col items-center">
          <input type="email" placeholder="Email" className="mb-2 p-2 border rounded w-full" />
          <input type="password" placeholder="Password" className="mb-4 p-2 border rounded w-full" />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Submit</button>
        </form>
        <button onClick={close} className="mt-4 text-blue-500">Close</button>
      </div>
    </div>
  );
}

export default Popup;
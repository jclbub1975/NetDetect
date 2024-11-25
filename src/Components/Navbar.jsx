import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faPhone, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Popup from './Popup';  // Ensure the Popup component is correctly imported
import { useState } from 'react';

function Navbar() {
    const [isShow, setIshow] = useState(false)

    return (
        <nav className="navbar fixed top-0 left-0 w-full bg-white shadow-md text-[#285FF8] flex justify-between items-center z-10 px-10 py-4 transition-all duration-300">
            <div className="logo text-[1.5rem] font-semibold tracking-tight text-[#285FF8] hover:text-blue-700 transition duration-300">
                NetDetect
            </div>

            <ul className="flex gap-[5rem] items-center">
                <li>
                    <Link
                        to="/"className="flex items-center gap-4 text-[1.1rem] hover:text-[#1d4ed8] transition duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#1d4ed8] hover:after:w-full after:transition-width after:duration-500">
                        <FontAwesomeIcon icon={faHome} />
                        Home
                    </Link>
                </li>
                <li>
                    <Link
                        to="/about"className="flex items-center gap-4 text-[1.1rem] hover:text-[#1d4ed8] transition duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#1d4ed8] hover:after:w-full after:transition-width after:duration-500">
                        <FontAwesomeIcon icon={faInfoCircle} />
                        About Us
                    </Link>
                </li>
                <li>
                    <Link to="/" className="flex items-center gap-4 text-[1.1rem] hover:text-[#1d4ed8] transition duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#1d4ed8] hover:after:w-full after:transition-width after:duration-500">
                        <FontAwesomeIcon icon={faPhone} />
                        Contact
                    </Link>
                </li>
            </ul>

            <div className="flex gap-4" onClick={() => setIshow(true)}>
                    <button className="flex items-center gap-2 py-2 px-6 rounded-xl text-[1rem] text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition duration-300 shadow-md hover:shadow-lg">
                        Sign in
                    </button>
            </div>

            {isShow ? (
                <Popup
                    isShow={isShow}
                    close={() => setIshow(false)}
                />
            ) : ''}
        </nav>
    );
}

export default Navbar;

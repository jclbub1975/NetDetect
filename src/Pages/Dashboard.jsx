import React from 'react';

function Contact() {
    const logout = () => {
        console.log('User logged out');
    };

    return (
        <>
            <section
                id="contact"
                className="contact flex flex-row items-center h-screen px-[10%] py-[5%] bg-gradient-to-br from-blue-200 via-white to-blue-100 relative overflow-hidden"
            >
                <h2 className="text-[#000] mr-[3rem]">Site under construction</h2>
                <p className="text-[#999]">We'll notify you when it's done!</p>
            </section>

            <button
                onClick={logout}
                className="bg-red-500 text-white text-xl font-semibold py-2 px-6 rounded-md hover:bg-red-600 transition duration-300"
            >
                Logout
            </button>
        </>
    );
}

export default Contact;

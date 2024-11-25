import Footer from '../Components/Footer';
import { Cobe } from '../Components/Cobe';
import TypingEffect from '../Components/TypingEffect';
import Popup from '../Components/Popup';
import { useState } from 'react';

function Home() {
    const [isShow, setIshow] = useState(false)

    return (
        <>
            <section id="home" className="home flex flex-row items-center h-screen px-[10%] py-[5%] bg-gradient-to-br from-blue-200 via-white to-blue-100 relative overflow-hidden">
                <div className="column1 flex flex-col items-start justify-center h-full w-[50%] space-y-6">
                    <h1 className="text-[5.5rem] font-extrabold text-gray-800 leading-[5.5rem] mb-4 tracking-tight">
                        Protect your <br />
                        <TypingEffect />
                    </h1>
                    <p className="text-lg text-gray-600 text-start mt-2 max-w-md leading-relaxed">
                        Easy network management with AI analysis and user monitoring to secure your infrastructure.
                    </p>
                    <button onClick={() => setIshow(true)} className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-8 rounded-2xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out hover:shadow-xl animate-shine">
                        Getting Started
                    </button>
                </div>
                {isShow ? (
                    <Popup
                        isShow={isShow}
                        close={() => setIshow(false)}
                    />
                ) : ''}

                <div className="column2 relative h-full w-[50%] flex items-center justify-center">
                    <Cobe />

                    <div className="select-none absolute bottom-0 right-0 mb-8 mr-4 text-right text-[1rem] text-gray-600">
                        Secure all network on all places
                    </div>
                    <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-blue-200 rounded-full opacity-40 blur-xl animate-pulse"></div>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default Home;

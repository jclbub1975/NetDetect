import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './Styles/index.css'; 
import Navbar from "./Components/Navbar.jsx"; 
import Home from "./Pages/Home.jsx"; 
import About from "./Pages/About.jsx"; 
import Contact from "./Pages/Contact.jsx";
import Signin from "./Pages/Signin.jsx"; 

function App() {
	return (
		<Router>
			<div className="App">
				<Navbar /> 

				<div className="main-content">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/about" element={<About />} />
						<Route path="/contact" element={<Contact />} />
						<Route path="/signin" element={<Signin />} />
					</Routes>
				</div>
			</div>
		</Router>
	);
}

export default App;

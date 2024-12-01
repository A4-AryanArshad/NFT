import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';

import Navbar from './Components/Navbar';
import Dashboard from './Components/Dashboard';
import Contact from './Components/Contact';
import Home from './Components/Home';
import AboutUs from './Components/AboutUs';

import Login from './Components/Login';
import Signup from './Components/Signup';
import Create_NFT from './Components/Create_NFT';
import Email_Verify from './Components/Email_Verify';
import ForgotPage from './Components/ForgotPage';
import Reset_password from './Components/Reset_password';
import NavbarCarousel from './Components/NavbarCarousel/NavbarCarousel';
import Marquee from './Components/Marquee/Marquee';

// Wrapper component to conditionally render Navbar
const Layout = ({ children }) => {
  const location = useLocation();

  // Show Navbar on certain routes
  const showNavbar = [ '/dashboard', '/contact', '/aboutus', '/nft'].includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      {children}
    </>
  );
};

// Protected Route component to check for authentication
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

const App = () => {
  const [alerte, setAlerte] = useState(null);

  // Function to show alerts
  const showAlert = (msg, type) => {
    setAlerte({
      msg: msg,
      type: type,
    });

    // Hide the alert after 3 seconds
    setTimeout(() => {
      setAlerte(null);
    }, 3000);
  };

  return (
    <Router>
      <Routes>
        {/* Home route: Always visible with Navbar */}
        <Route path="/" element={<Marquee/>} />



        {/* Login and Signup routes */}
        <Route path="/login" element={<Login showalert={showAlert} />} />
        <Route path="/signup" element={<Signup showalert={showAlert} />} />
        <Route path="/Email_Verify" element={<Email_Verify showalert={showAlert} />} />
        <Route path="/ForgotPage" element={<ForgotPage showalert={showAlert} />} />
        <Route path="/Reset_password" element={<Reset_password showalert={showAlert} />} />

        {/* Protected routes (require login) */}
        <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/aboutus" element={<Layout><AboutUs /></Layout>} />
        <Route path="/create_nft" element={<ProtectedRoute><Layout><Create_NFT /></Layout></ProtectedRoute>} />
        

        {/* Redirect all other paths to Home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;

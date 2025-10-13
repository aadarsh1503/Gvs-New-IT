// src/components/Navbar/Navbar.jsx

import React from 'react';
// We need useState and useEffect for this functionality
import { useState, useEffect } from 'react'; 
import { CgMoon } from 'react-icons/cg';
import { FiMenu } from 'react-icons/fi';
import Sidebar from './Sidebar';

// Accept toggleTheme and isDarkMode as props
const Navbar = ({ toggleTheme, isDarkMode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // --- START: NEW STATE FOR SCROLL BEHAVIOR ---
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  // --- END: NEW STATE FOR SCROLL BEHAVIOR ---

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // --- START: NEW EFFECT FOR HANDLING SCROLL ---
  useEffect(() => {
    const controlNavbar = () => {
      // If we're scrolling down and past the navbar height
      if (window.scrollY > lastScrollY && window.scrollY > 100) { 
        setIsVisible(false);
      } else { // If we're scrolling up
        setIsVisible(true);
      }
      // Remember the new scroll position for the next move
      setLastScrollY(window.scrollY);
    };

    // Add the event listener when the component mounts
    window.addEventListener('scroll', controlNavbar);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]); // Re-run the effect if lastScrollY changes
  // --- END: NEW EFFECT FOR HANDLING SCROLL ---

  return (
    <>
      <nav 
        className={`
          fixed top-0 left-0 w-full pt-8 px-8 sm:px-16 
          flex justify-between items-center z-30
          transition-transform duration-300 ease-in-out
          ${isVisible ? 'translate-y-0' : '-translate-y-full'}
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          {/* Text color is now inherited from App.js */}
          <h1 className="text-2xl font-bold tracking-wider">LOGO</h1>
          <div className="w-2 h-2 bg-[#EF3365] rounded-full"></div>
        </div>

        {/* Nav Icons */}
        <div className="flex items-center gap-6 text-2xl">
          {/* Add the onClick handler to the moon button */}
          <button 
            onClick={toggleTheme} 
            className="hover:text-[#EF3365] transition-colors"
          >
            <CgMoon />
          </button>
          <button
            onClick={toggleSidebar}
            className="hover:text-[#EF3365] transition-colors"
          >
            <FiMenu />
          </button>
        </div>
      </nav>

      {/* Sidebar logic remains the same */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        closeSidebar={toggleSidebar} 
        isDarkMode={isDarkMode} 
      />
    </>
  );
};

export default Navbar;
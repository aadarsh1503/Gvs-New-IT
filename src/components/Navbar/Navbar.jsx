// src/components/Navbar/Navbar.jsx

import React, { useState, useEffect } from 'react';
import { CgMoon } from 'react-icons/cg';
import { FiMenu } from 'react-icons/fi';
import Sidebar from './Sidebar';

// ===== CHANGE #1: Import BOTH logos =====
import gvs from "./gvs.svg";
import gvs_white from "./gvs_white.png"; // Your new white logo for dark mode

const Navbar = ({ toggleTheme, isDarkMode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) { 
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', controlNavbar);

    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  // ===== CHANGE #2: Choose the logo source dynamically =====
  // If isDarkMode is true, use gvsWhite; otherwise, use the standard gvs.
  const logoSrc = isDarkMode ? gvs_white : gvs;

  return (
    <>
      <nav 
        className={`
          fixed -top-4 left-0 w-full px-8 sm:px-16 
          flex justify-between items-center z-30
          transition-transform duration-300 ease-in-out
          ${isVisible ? 'translate-y-0' : '-translate-y-full'}
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          {/* ===== CHANGE #3: Use the dynamic logoSrc variable ===== */}
          <img
            src={logoSrc} 
            alt="Company Logo"
            className="w-32 h-32 object-contain"
          />
        </div>

        {/* Nav Icons */}
        <div className="flex items-center gap-6 text-2xl">
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
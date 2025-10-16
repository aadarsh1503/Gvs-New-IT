// src/App.jsx

import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import './App.css';

// Import Components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import TermsAndConditions from './components/TermsAndConditions/TermsAndConditions';
import HomePage from './components/HomePage/HomePage';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy';
import RefundPolicy from './components/RefundPolicy/RefundPolicy';

function App() {
  // ===== LOCALSTORAGE INTEGRATION =====
  // The state is now initialized by reading from localStorage.
  // The `() => ...` syntax ensures this code only runs once on initial load.
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark'; // Returns true if 'dark', false otherwise
  });

  // ===== EFFECT TO SAVE THEME =====
  // This `useEffect` hook runs whenever `isDarkMode` changes.
  useEffect(() => {
    // 1. Save the choice to localStorage
    const newTheme = isDarkMode ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);

    // 2. (Optional but good practice) Add/remove a class from the root HTML element
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // The toggle function remains simple. The useEffect handles the side effects.
  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  // The rest of your component logic is perfect and doesn't need to change.
  const darkGradient = useMemo(() => {
    const colorStops = [
      '#222831', '#232932', '#242A33', '#262B34', 
      '#272C34', '#272D35', '#282D35', '#282E35', 
      '#292E36', '#292F36', '#2A2F37', '#2B3037', 
      '#2B3138', '#2C3138'
    ];
    return `linear-gradient(to bottom, ${colorStops.join(', ')})`;
  }, []);

  const appStyle = isDarkMode
    ? { background: darkGradient }
    : { backgroundColor: '#F2EEE7' };

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      smooth: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <Router>
      <div
        style={appStyle}
        className={`transition-colors duration-500 ${
          isDarkMode ? 'text-white' : 'text-black'
        }`}
      >
        <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        
        <main>
          <Routes>
            <Route path="/" element={<HomePage isDarkMode={isDarkMode} />} />
            <Route path="/terms&conditions" element={<TermsAndConditions isDarkMode={isDarkMode} />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy isDarkMode={isDarkMode} />} />
            <Route path="/refund-policy" element={<RefundPolicy isDarkMode={isDarkMode} />} />
          </Routes>
        </main>
        
        <Footer isDarkMode={isDarkMode} />
      </div>
    </Router>
  );
}

export default App;
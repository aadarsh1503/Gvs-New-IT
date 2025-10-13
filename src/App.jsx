import React, { useState, useMemo, useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import Hero from "./components/Hero/Hero";
import Navbar from "./components/Navbar/Navbar";
import './App.css';
import AboutCompany from "./components/AboutCompany/AboutCompany";
import WhatWeDo from "./components/WhatWeDo/WhatWeDo";
import ProfessionalSkills from "./components/ProfessionalSkills/ProfessionalSkills";
import OurClients from "./components/OurClients/OurClients";
import ClientLocations from "./components/Location/Location";
import ContactUs from "./components/ContactUs/ContactUs";
import Footer from "./components/Footer/Footer";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 🌙 Theme toggle
  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  // 🎨 Dark gradient palette
  const darkGradient = useMemo(() => {
    const colorStops = [
      '#222831', '#232932', '#242A33', '#262B34', 
      '#272C34', '#272D35', '#282D35', '#282E35', 
      '#292E36', '#292F36', '#2A2F37', '#2B3037', 
      '#2B3138', '#2C3138'
    ];
    return `linear-gradient(to bottom, ${colorStops.join(', ')})`;
  }, []);

  // 🌈 Background setup
  const appStyle = isDarkMode
    ? { background: darkGradient }
    : { backgroundColor: '#F2EEE7' };

  // 🚀 Smooth scroll setup with Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3, // speed of the scroll (higher = slower)
      smooth: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    // cleanup when component unmounts
    return () => lenis.destroy();
  }, []);

  return (
    <div
      style={appStyle}
      className={`transition-colors duration-500 ${
        isDarkMode ? 'text-white' : 'text-black'
      }`}
    >
      <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      <Hero isDarkMode={isDarkMode} />
      <AboutCompany isDarkMode={isDarkMode} />
      <WhatWeDo isDarkMode={isDarkMode} />
      <ProfessionalSkills isDarkMode={isDarkMode} />
      <OurClients isDarkMode={isDarkMode} />
      <ClientLocations isDarkMode={isDarkMode} />
      <ContactUs isDarkMode={isDarkMode} />
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}

export default App;

// src/App.jsx

import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './toastStyles.css';
import './App.css';

// Import Components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import TermsAndConditions from './components/TermsAndConditions/TermsAndConditions';
import HomePage from './components/HomePage/HomePage';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy';
import RefundPolicy from './components/RefundPolicy/RefundPolicy';
import StaffDetails from './components/StaffDetails/StaffDetails';
import AdminLogin from './components/Admin/AdminLogin';
import AdminSignup from './components/Admin/AdminSignup';
import AdminDashboard from './components/Admin/AdminDashboard';
import ForgotPassword from './components/Admin/ForgotPassword';
import ResetPassword from './components/Admin/ResetPassword';
import ViewStaffPage from './components/Admin/ViewStaffPage';
import EditStaffPage from './components/Admin/EditStaffPage';
import SettingsPage from './components/Admin/SettingsPage';
import SocialMediaDashboard from './components/Admin/SocialMediaDashboard';
import AddSocialMediaPage from './components/Admin/AddSocialMediaPage';
import ViewSocialMediaPage from './components/Admin/ViewSocialMediaPage';
import EditSocialMediaPage from './components/Admin/EditSocialMediaPage';

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
          isDarkMode ? 'text-white' : 'text-[#464646]'
        }`}
      >
        {/* Only show navbar on non-admin pages */}
        {!window.location.pathname.startsWith('/admin') && (
          <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        )}
        
        <main>
          <Routes>
            <Route path="/" element={<HomePage isDarkMode={isDarkMode} />} />
            <Route path="/terms&conditions" element={<TermsAndConditions isDarkMode={isDarkMode} />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy isDarkMode={isDarkMode} />} />
            <Route path="/refund-policy" element={<RefundPolicy isDarkMode={isDarkMode} />} />
            <Route path="/staff-details" element={<StaffDetails isDarkMode={isDarkMode} />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin isDarkMode={isDarkMode} />} />
            <Route path="/admin/forgot-password" element={<ForgotPassword isDarkMode={isDarkMode} />} />
            <Route path="/admin/reset-password/:token" element={<ResetPassword isDarkMode={isDarkMode} />} />
            <Route path="/admin/dashboard" element={<AdminDashboard isDarkMode={isDarkMode} toggleTheme={toggleTheme} />} />
            <Route path="/admin/staff/view/:id" element={<ViewStaffPage isDarkMode={isDarkMode} />} />
            <Route path="/admin/staff/edit/:id" element={<EditStaffPage isDarkMode={isDarkMode} />} />
            <Route path="/admin/settings" element={<SettingsPage isDarkMode={isDarkMode} />} />
            <Route path="/admin/social-media" element={<SocialMediaDashboard isDarkMode={isDarkMode} toggleTheme={toggleTheme} />} />
            <Route path="/admin/social-media/add" element={<AddSocialMediaPage isDarkMode={isDarkMode} />} />
            <Route path="/admin/social-media/view/:id" element={<ViewSocialMediaPage isDarkMode={isDarkMode} />} />
            <Route path="/admin/social-media/edit/:id" element={<EditSocialMediaPage isDarkMode={isDarkMode} />} />
            
            {/* Hidden signup route - difficult to access */}
            <Route path="/gvs-admin-secret-registration-portal-2026" element={<AdminSignup isDarkMode={isDarkMode} />} />
          </Routes>
        </main>
        
        {/* Only show footer on non-admin pages */}
        {!window.location.pathname.startsWith('/admin') && <Footer isDarkMode={isDarkMode} />}
      </div>
      
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
  );
}

export default App;
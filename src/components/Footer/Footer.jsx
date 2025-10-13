import React from 'react';
// Import the icons from the react-icons library
import { FaInstagram, FaLinkedinIn, FaFacebookF } from 'react-icons/fa';

const Footer = ({ isDarkMode }) => {
  // Define conditional classes for the background and text colors
  const footerBg = isDarkMode ? 'bg-[#222831]' : 'bg-[#F0EBE3]';
  const textColor = isDarkMode ? 'text-white' : 'text-black';

  return (
    // Apply the dynamic background and text color classes
    <footer className={`font-jost py-8 px-4 sm:px-10 font-sans text-sm ${footerBg} ${textColor}`}>
      <div className="mx-auto flex flex-col md:flex-row items-center justify-between gap-y-6 md:gap-y-0">
        
        {/* Left Side: Social Media Icons */}
        {/* The icons will automatically inherit the text color from the parent footer */}
        <div className="flex items-center space-x-4 order-2 md:order-1">
          <a href="#" aria-label="Instagram" className="hover:opacity-75 transition-opacity">
            <FaInstagram className="w-6 h-6" />
          </a>
          <a href="#" aria-label="LinkedIn" className="hover:opacity-75 transition-opacity">
            <FaLinkedinIn className="w-6 h-6" />
          </a>
          <a href="#" aria-label="Facebook" className="hover:opacity-75 transition-opacity">
            <FaFacebookF className="w-6 h-6" />
          </a>
        </div>

        {/* Center: Copyright Information */}
        {/* The text here also inherits the color from the parent footer */}
        <div className="text-center font-semibold order-1 md:order-2">
          <p>
            COPYRIGHT © 2024 <a href="#" className="text-[#EF3365] hover:underline">KLIENTSHIP TECHNOLOGIES</a>
          </p>
          <p className="mt-1">CIN: U72900KA2022PTC162006</p>
        </div>

        {/* Right Side: Legal Links */}
        <nav className="flex flex-wrap text-sm font-jost items-center justify-center gap-x-3 gap-y-2 order-3">
          <a href="#" className="text-[#EF3365] font-semibold hover:underline">Terms & Conditions</a>
          {/* Apply the dynamic text color to the separator */}
          <span className={textColor}>|</span>
          <a href="#" className="text-[#EF3365] font-semibold hover:underline">Privacy Policy</a>
          <span className={textColor}>|</span>
          <a href="#" className="text-[#EF3365] font-semibold hover:underline">Refund Policy</a>
          <span className={textColor}>|</span>
          <a href="#contact-us" className="text-[#EF3365] font-semibold hover:underline">Contact</a>
        </nav>

      </div>
    </footer>
  );
};

export default Footer;
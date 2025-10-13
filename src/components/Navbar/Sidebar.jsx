import React, { useEffect } from 'react';
import { VscClose } from 'react-icons/vsc';
import { FaInstagram, FaLinkedinIn, FaFacebookF } from 'react-icons/fa';

const NavLink = ({ children, href = '#', isDarkMode }) => {
  const linkColor = isDarkMode ? 'text-white' : 'text-black';
  return (
    <a href={href} className={`text-xl font-bold tracking-widest transition-opacity hover:opacity-70 ${linkColor}`}>
      {children}
    </a>
  );
};

const Sidebar = ({ isOpen, closeSidebar, isDarkMode }) => {
  // ===== MODIFIED: navItems is now an array of objects =====
  // Here you can define a unique href for every single item.
  const navItems = [
    { label: 'HOME', href: '/' },
    { label: 'ABOUT US', href: '#about' },
    { label: 'SERVICES', href: '#services' },
    { label: 'SHOP', href: '/store' },
    { label: 'SKILLS', href: '#expertise' },
    { label: 'SUBSIDIARIES', href: '/subsidiaries' },
    { label: 'CONTACT', href: '#contact-us' },
  ];

  const sidebarBg = isDarkMode ? 'bg-[#3136C]' : 'bg-white';
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const decorativeColor = isDarkMode ? 'bg-white' : 'bg-black';
  const borderColor = isDarkMode ? 'border-white' : 'border-black';
  const circleBg = isDarkMode ? 'bg-[#3136C]' : 'bg-white';

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <main>
      {/* 1. OVERLAY */}
      <div
        onClick={closeSidebar}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* 2. SIDEBAR CONTAINER */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-lg transform transition-transform duration-1500 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } ${sidebarBg}`}
      >
        <div className="relative h-full p-8 sm:p-12">
          {/* Close Button */}
          <button 
            onClick={closeSidebar} 
            className={`absolute text-3xl top-8 right-8 transition-opacity duration-300 hover:opacity-70 ${textColor} ${
              isOpen ? 'opacity-100 delay-300' : 'opacity-0'
            }`}
          >
            <VscClose />
          </button>

          {/* Decorative Elements */}
          <div 
            className={`absolute top-28 bottom-24 w-px left-20 ${decorativeColor} transition-transform duration-700 ease-in-out origin-top ${
              isOpen ? 'scale-y-100 delay-200' : 'scale-y-0'
            }`}
          ></div>
          <div className={`absolute w-6 h-6 -translate-x-1/2 rounded-full top-28 left-20 border-2 ${circleBg} ${borderColor} transition-opacity duration-300 ${isOpen ? 'opacity-100 delay-200' : 'opacity-0'}`}></div>
          <div className={`absolute w-6 h-6 -translate-x-1/2 rounded-full bottom-24 left-20 border-2 ${circleBg} ${borderColor} transition-opacity duration-300 ${isOpen ? 'opacity-100 delay-500' : 'opacity-0'}`}></div>
          <div className={`absolute grid grid-cols-4 gap-4 top-8 left-8 transition-opacity duration-300 ${isOpen ? 'opacity-100 delay-300' : 'opacity-0'}`}>
            {Array.from({ length: 18 }).map((_, i) => (
              <div key={i} className={`w-1.5 h-1.5 rounded-full ${decorativeColor}`}></div>
            ))}
          </div>
          
          {/* Main Content Area */}
          <div className="flex flex-col h-full pt-32 pl-24">
            {/* Navigation Menu */}
            <nav className="flex-grow">
              <ul className="flex flex-col gap-6">
                {/* ===== MODIFIED: The .map() loop now uses the object's properties ===== */}
                {navItems.map((item, index) => (
                  <li 
                    key={item.label} // Use a unique value like the label for the key
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen 
                        ? 'opacity-100 translate-x-0' 
                        : 'opacity-0 translate-x-12'
                    }`}
                    style={{ transitionDelay: `${200 + index * 50}ms` }}
                  >
                    {/* Pass the custom href and label to the NavLink */}
                    <NavLink href={item.href} isDarkMode={isDarkMode}>
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Social Media Icons */}
            <div 
              className={`flex items-center gap-6 mb-16 text-2xl ${textColor} transition-all duration-300 ease-in-out ${
                isOpen ? 'opacity-100 translate-y-0 delay-500' : 'opacity-0 translate-y-10'
              }`}
            >
              <a href="https://instagram.com" aria-label="Instagram" className="transition-opacity hover:opacity-70"><FaInstagram /></a>
              <a href="https://linkedin.com" aria-label="LinkedIn" className="transition-opacity hover:opacity-70"><FaLinkedinIn /></a>
              <a href="https://facebook.com" aria-label="Facebook" className="transition-opacity hover:opacity-70"><FaFacebookF /></a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Sidebar;
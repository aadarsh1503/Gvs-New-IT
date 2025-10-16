import React from 'react';
import Slide1 from '../Slide1/Slide1';

// ... (clientLogos data remains the same)
const clientLogos = [
  { src: 'https://klientship.in/assets/images/clients/client1.png', alt: 'Autofinance Canada Logo' },
  { src: 'https://klientship.in/assets/images/clients/client2.png', alt: 'American Academy of Implant Dentistry Logo' },
  { src: 'https://klientship.in/assets/images/clients/client3.webp', alt: 'Dentist Channel Online Logo' },
];


const OurClients = ({ isDarkMode }) => {
  // --- ===== THIS IS THE FIX ===== ---
  // We start where the previous section ended (#4a5361) for a seamless transition.
  // Then, we transition to a new, DARKER color (#3E4651) at the bottom.
  const sectionBg = isDarkMode
    ? 'bg-[#222831]' 
    : 'bg-[#F3EFE8]'; // Light mode remains flat and seamless.

  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const borderColor = isDarkMode ? 'border-white' : 'border-black';
  
  // This class is essential to make dark logos visible on a dark background.
  const logoFilter = isDarkMode ? 'filter invert' : '';

  return (
    <section className={`py-24 px-4 sm:px-6 lg:px-8 ${sectionBg}`}>
      <div className="max-w-7xl mx-auto text-center">
        
        {/* Header Section */}
        <header>
          <h2 className={`text-4xl font-jost md:text-5xl font-extrabold tracking-wider uppercase ${textColor}`}>
            Our Trusted Partners
          </h2>
          <p className="mt-4 flex items-center justify-center gap-3">
            <span className="text-xl font-jost font-semibold text-[#EF3365] tracking-widest">
              TOP COMPANIES
            </span>
            <span className={`font-serif italic text-2xl ${textColor}`}>
              we have worked with
            </span>
          </p>
        </header>

        {/* Client Logos Grid */}
        <div className="">
         <Slide1 />
        </div>

        {/* Pagination Dot */}
        <div className="mt-20 flex justify-center">
          <div className={`w-3 h-3 rounded-full bg-[#EF3365] border-2 ${borderColor}`}></div>
        </div>
        
      </div>
    </section>
  );
};

export default OurClients;
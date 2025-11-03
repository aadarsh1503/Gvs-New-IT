// src/components/Location/Location.jsx (assuming this is the file name)
import React from 'react';

const ClientLocations = ({ isDarkMode }) => {
  // Define seamless background gradient and conditional text color
  const sectionBg = isDarkMode
    ? 'bg-[#222831]' // Starts where OurClients ended
    : 'bg-[#F3EFE8]'; // Remains flat and seamless with OurClients

  const textColor = isDarkMode ? 'text-white' : 'text-[#464646]';
  
  // The map image from your source is a PNG that works well on both light and dark backgrounds.
  // If it were an SVG or a dark-themed PNG, we could apply a filter like in OurClients.
  // For this specific image, no filter is needed.

  return (
    <section className={`py-24 px-4 sm:px-6 lg:px-8 ${sectionBg}`}>
      <div className="max-w-7xl mx-auto text-center">
        
        {/* Header Section */}
        <header>
          <h2 className={`text-4xl font-jost md:text-5xl font-extrabold tracking-wider uppercase ${textColor}`}>
            Client Locations
          </h2>
          <p className="mt-4 flex items-center justify-center gap-3">
            <span className="text-sm font-jost font-semibold text-[#0284c7] tracking-widest">
              WE SERVE
            </span>
            <span className={`font-serif italic text-2xl ${textColor}`}>
              clients from all around the world.
            </span>
          </p>
        </header>

        {/* Map Image Container */}
        <div className="mt-16 max-w-xl mx-auto"> 
          <img 
            src="https://klientship.in/assets/images/locations.png"
            alt="World map showing client locations" 
            className="w-full h-auto"
          />
        </div>
        
      </div>
    </section>
  );
};

export default ClientLocations;
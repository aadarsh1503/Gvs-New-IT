import React from 'react';
import { motion } from 'framer-motion';

// --- DUMMY DATA (Unchanged) ---
const servicesData = [
  {
    category: 'ENGINEERING SERVICES',
    title: 'Comprehensive Engineering Solutions',
    description: 'Provide a range of engineering services to support your technical projects and innovations.',
  },
  {
    category: 'INTERNET OF THINGS (IOT)',
    title: 'Smart IoT Solutions',
    description: 'Develop IoT solutions that connect devices and optimize processes for improved efficiency.',
  },
  {
    category: 'APPLICATION MODERNIZATION',
    title: 'Transforming Legacy Applications',
    description: 'Modernize your legacy applications to enhance performance, security, and user experience.',
  },
  {
    category: 'CLOUD-NATIVE DEVELOPMENT',
    title: 'Scalable Cloud Solutions',
    description: 'Build and deploy applications that leverage the full potential of cloud infrastructure for scalability.',
  },
  {
    category: 'UI/UX DESIGN',
    title: 'User-Centric Design Systems',
    description: 'Create intuitive and engaging user interfaces that provide a seamless and enjoyable experience.',
  },
  {
    category: 'DATA & ANALYTICS',
    title: 'Advanced Data Analytics',
    description: 'Unlock valuable insights from your data to drive informed business decisions and strategies.',
  },
];

// --- ArrowIcon Component (Unchanged) ---
const ArrowIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.43 5.92999L20.5 12L14.43 18.07" stroke="#EF3365" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3.5 12H20.33" stroke="#EF3365" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


// ===== SERVICE CARD COMPONENT (Unchanged) =====
const ServiceCard = ({ category, title, description, isDarkMode }) => {
  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const cardBg = isDarkMode ? 'bg-[#2a303a]' : 'bg-white';
  const primaryTextColor = isDarkMode ? 'text-white' : 'text-black';
  const secondaryTextColor = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  const tertiaryTextColor = isDarkMode ? 'text-gray-400' : 'text-gray-500';
  const dotBorderColor = isDarkMode ? 'border-white/30' : 'border-black/30';

  return (
    <motion.div 
      className={`rounded-2xl p-8 shadow-sm flex flex-col relative overflow-hidden ${cardBg}`}
      variants={cardVariants}
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <p className={`text-xs font-bold tracking-widest uppercase mb-4 ${tertiaryTextColor}`}>{category}</p>
      <h3 className={`text-2xl font-bold mb-4 ${primaryTextColor}`}>{title}</h3>
      <p className={`leading-relaxed flex-grow ${secondaryTextColor}`}>{description}</p>
      <a href="#" className={`flex items-center gap-2 font-bold mt-8 z-10 ${primaryTextColor}`}>
        See Pricing <ArrowIcon />
      </a>
      <div className="absolute bottom-8 right-8 grid grid-cols-4 gap-2 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className={`w-1.5 h-1.5 rounded-full border ${dotBorderColor}`}></div>
        ))}
      </div>
    </motion.div>
  );
};


// ===== UPDATED MAIN SECTION COMPONENT =====
const WhatWeDo = ({ isDarkMode }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const sectionBg = isDarkMode
    ? 'bg-gradient-to-b from-[#3a4554] to-[#414a58]'
    : 'bg-gradient-to-b from-[#F2EEE7] to-[#EAE6DD]';

  const textColor = isDarkMode ? 'text-white' : 'text-black';

  return (
    // Added `relative` and `overflow-hidden` to contain the background text
    <section id='services' className={`relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden ${sectionBg}`}>
      
      {/* ===== START: Background watermark text ===== */}
      <div className="absolute inset-0 flex items-center z-100 justify-center z-0 pointer-events-none">
        <h2 className={`text-[120px] font-caveat relative top-[360px]  sm:text-[180px] lg:text-[300px] font-black opacity-5 select-none ${textColor}`}>
          Services
        </h2>
      </div>
      {/* ===== END: Background watermark text ===== */}

      {/* Main content container with `relative z-10` to place it above the watermark */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <header className="text-center">
          <h2 className={`text-4xl md:text-5xl font-extrabold tracking-wider uppercase ${textColor}`}>WHAT WE DO</h2>
          <p className="mt-4 flex items-center justify-center gap-3">
            <span className="text-sm font-semibold text-[#EF3365] tracking-widest">OUR</span>
            <span className={`font-serif italic text-2xl ${textColor}`}>Services</span>
          </p>
        </header>

        <motion.div 
          className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {servicesData.map((service) => (
            <ServiceCard 
              key={service.title}
              {...service}
              isDarkMode={isDarkMode}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhatWeDo;
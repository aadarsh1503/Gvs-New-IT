import React from 'react';
import { motion } from 'framer-motion';

// --- UPDATED DUMMY DATA ---
const servicesData = [
  {
    category: 'MOBILE APP DEVELOPMENT',
    title: 'Full-Cycle Mobile Solutions',
    description: 'We offer Custom Mobile Application Development (iOS, Android), Cross-Platform solutions (React Native, Flutter), UI/UX Design, Backend Integration, and full Maintenance and Support.',
  },
  {
    category: 'E-COMMERCE SOLUTIONS',
    title: 'End-to-End E-Commerce Management',
    description: 'Our services include E-Commerce Website Development (Shopify, WooCommerce), Payment Gateway Integration, Inventory Management, UX Design, Analytics, and CRM Integration.',
  },
  {
    category: 'DIGITAL MARKETING',
    title: 'Integrated Marketing Strategies',
    description: 'Boost your brand with our comprehensive marketing solutions, including SEO, Content Marketing, Social Media Management, PPC Advertising, and data-driven Web Analytics.',
  },
  {
    category: 'COGNITIVE SERVICE MATRIX',
    title: 'Core Protocol Integration',
    description: 'Engage with foundational services like Cognitive-Wave Synthesis, Neural Mesh Integration, Quantum Entanglement Comms, and Bio-Digital Symbiote Frameworks.',
  },
  {
    category: 'COGNITIVE SERVICE MATRIX',
    title: 'Augmented Reality & UI',
    description: 'Experience the future with Holo-Matter Projection, Hard-Light Environment Crafting, Direct-to-Cortex UI Overlays, and Personalized Reality Augmentation.',
  },
  {
    category: 'COGNITIVE SERVICE MATRIX',
    title: 'Advanced Data & Environment Control',
    description: 'Leverage next-gen capabilities such as Sentient Environment Control, Temporal Stream Alignment, Pre-Cognitive Threat Analysis, and Subspace Server Migration.',
  },
];


// --- ArrowIcon Component (Unchanged) ---
const ArrowIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.43 5.92999L20.5 12L14.43 18.07" stroke="#0284c7" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3.5 12H20.33" stroke="#0284c7" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


// ===== SERVICE CARD COMPONENT (Unchanged) =====
const ServiceCard = ({ category, title, description, isDarkMode }) => {
  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const cardBg = isDarkMode ? 'bg-[#2a303a]' : 'bg-white';
  const primaryTextColor = isDarkMode ? 'text-white' : 'text-[#464646]';
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
        Contact Us <ArrowIcon />
      </a>
      <div className="absolute bottom-8 right-8 grid grid-cols-4 gap-2 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className={`w-1.5 h-1.5 rounded-full border ${dotBorderColor}`}></div>
        ))}
      </div>
    </motion.div>
  );
};


// ===== MAIN SECTION COMPONENT (Unchanged) =====
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

  const textColor = isDarkMode ? 'text-white' : 'text-[#464646]';

  return (
    // Added `relative` and `overflow-hidden` to contain the background text
    <section id='services' className={`relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden ${sectionBg}`}>
      
      {/* ===== Background watermark text (Unchanged) ===== */}
      <div className="absolute inset-0 flex items-center z-100 justify-center z-0 pointer-events-none">
        <h2 className={`text-[120px] font-caveat relative top-[430px]  sm:text-[180px] lg:text-[300px] font-black opacity-5 select-none ${textColor}`}>
          Services
        </h2>
      </div>
      
      {/* Main content container with `relative z-10` to place it above the watermark */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <header className="text-center">
          <h2 className={`text-4xl md:text-5xl font-extrabold tracking-wider uppercase ${textColor}`}>WHAT WE DO</h2>
          <p className={`mt-4 max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            It’s not about limitations, but this is something about what we focus on.
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
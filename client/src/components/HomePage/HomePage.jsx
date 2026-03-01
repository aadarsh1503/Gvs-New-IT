import React from 'react';

// Import all the section components
// Note the change in relative paths from '../components/...' to '../../components/...'
import Hero from "../../components/Hero/Hero";
import AboutCompany from "../../components/AboutCompany/AboutCompany";
import WhatWeDo from "../../components/WhatWeDo/WhatWeDo";
import ProfessionalSkills from "../../components/ProfessionalSkills/ProfessionalSkills";
import OurClients from "../../components/OurClients/OurClients";
import ClientLocations from "../../components/Location/Location";
import ContactUs from "../../components/ContactUs/ContactUs";

// The HomePage component receives isDarkMode as a prop from App.js
const HomePage = ({ isDarkMode }) => {
  return (
    <>
      <Hero isDarkMode={isDarkMode} />
      <AboutCompany isDarkMode={isDarkMode} />
      <WhatWeDo isDarkMode={isDarkMode} />
      <ProfessionalSkills isDarkMode={isDarkMode} />
      <OurClients isDarkMode={isDarkMode} />
      <ClientLocations isDarkMode={isDarkMode} />
      <ContactUs isDarkMode={isDarkMode} />
    </>
  );
};

export default HomePage;
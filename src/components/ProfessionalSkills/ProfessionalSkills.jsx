import React from 'react';
import "../../index.css";

// --- DUMMY DATA (Unchanged) ---
const skillsData = [
  {
    title: 'Agile Development',
    description: 'Our team excels in Agile methodologies, ensuring flexibility and iterative progress throughout the project lifecycle, fostering better collaboration and faster delivery.',
  },
  {
    title: 'DevOps Practices',
    description: 'Our expertise in DevOps practices ensures seamless integration of development and operations, enhancing deployment frequency and service reliability.',
  },
  {
    title: 'UX/UI Design',
    description: 'Our UX/UI design skills focus on creating intuitive and engaging user experiences, ensuring that products are user-friendly and aesthetically appealing.',
  },
  {
    title: 'Cloud Computing',
    description: 'We are proficient in cloud architecture and services, enabling businesses to scale efficiently, enhance collaboration, and optimize their operations with cloud-based solutions.',
  },
  {
    title: 'Cybersecurity',
    description: 'We prioritize cybersecurity by implementing robust security protocols, risk assessments, and compliance measures to protect sensitive data and systems.',
  },
  {
    title: 'Technical Support',
    description: 'Our dedicated technical support team is equipped to provide troubleshooting and maintenance services, ensuring optimal performance of systems and applications.',
  },
];

// ===== UPDATED SkillCard COMPONENT =====
const SkillCard = ({ title, description, isDarkMode }) => {
  // Define conditional classes for the card's elements
  const titleColor = isDarkMode ? 'text-white' : 'text-[#464646]';
  const descriptionColor = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  const lineColor = isDarkMode ? 'bg-white' : 'bg-black';
  const borderColor = isDarkMode ? 'border-white' : 'border-black';

  return (
    <div>
      <h3 className={`text-xl font-jost font-bold ${titleColor}`}>{title}</h3>
      <p className={`mt-2 w-[350px] font-jost leading-relaxed h-28 line-clamp-4 ${descriptionColor}`}>
        {description}
      </p>
      <div className="relative mt-8 h-6">
        <div className={`absolute top-1/2 left-0 right-3 h-px -translate-y-1/2 ${lineColor}`}></div>
        <div className={`absolute top-1/2 right-0 h-6 w-6 -translate-y-1/2 rounded-full border-2 bg-[#0284c7] shadow-md ${borderColor}`}></div>
      </div>
    </div>
  );
};


// ===== UPDATED ProfessionalSkills COMPONENT =====
const ProfessionalSkills = ({ isDarkMode }) => {
  // Define seamless background gradient and other conditional styles
  const sectionBg = isDarkMode
    ? 'bg-gradient-to-b from-[#414a58] to-[#41a58]' // Starts where WhatWeDo ended
    : 'bg-gradient-to-b from-[#EAE6DD] to-[#F3EFE8]'; // Starts where WhatWeDo ended

  const textColor = isDarkMode ? 'text-white' : 'text-[#464646]';
  const lineColor = isDarkMode ? 'bg-white' : 'bg-black';
  const borderColor = isDarkMode ? 'border-white' : 'border-black';
  const circleBg = isDarkMode ? 'bg-[#3a4554]' : 'bg-[#FAF6F1]'; // Dark mode equivalent for the decorative circles

  return (
    <section id='expertise' className={`relative py-24 px-8 sm:px-16 overflow-hidden ${sectionBg}`}>
      
      {/* Vertical line and dots */}
      <div className={`absolute top-24 bottom-24 left-8 w-px hidden lg:block ${lineColor}`}>
        <div className={`absolute top-0 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 ${circleBg} ${borderColor}`}></div>
        <div className={`absolute bottom-0 -translate-x-1/2 translate-y-1/2 w-8 h-8 rounded-full border-2 ${circleBg} ${borderColor}`}></div>
      </div>
      
      {/* Decorative dot grid */}
      <div className="absolute bottom-[0%] -left-[1px] grid grid-cols-4 gap-6">
        {Array.from({ length: 25 }).map((_, i) => (
          <div key={i} className={`w-2 h-2 border rounded-full ${borderColor}`}></div>
        ))}
      </div>
    
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <header className="text-center">
          <h2 className={`text-4xl font-jost md:text-5xl font-extrabold tracking-wider uppercase ${textColor}`}>
            Professional Skills
          </h2>
          <p className="mt-4 text-xl">
            <span className="font-semibold font-jost text-[#0284c7]">OUR</span>
            <span className={`ml-2 font-serif italic text-2xl ${textColor}`}>Expertise</span>
          </p>
        </header>

        {/* Skills Content container */}
        <div className="mt-20 lg:ml-20">
          <div className="grid grid-cols-1 font-jost md:grid-cols-3 gap-x-12 gap-y-16">
            {skillsData.map((skill) => (
              <SkillCard 
                key={skill.title} 
                title={skill.title} 
                description={skill.description} 
                isDarkMode={isDarkMode} // Pass the prop down
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalSkills;
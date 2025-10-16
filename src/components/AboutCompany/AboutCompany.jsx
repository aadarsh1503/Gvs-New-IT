import React from 'react';

// Step 1: Accept isDarkMode as a prop
const AboutCompany = ({ isDarkMode }) => {

  // Step 2: Define conditional classes for clarity and reuse
  const sectionBgClasses = isDarkMode
    ? 'bg-gradient-to-b from-[#2C3138] from-20% to-[#3a4554]' // A dark gradient that mimics the light mode's pattern
    : 'bg-gradient-to-b from-white from-20% to-[#F2EEE7]';

  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const paragraphColor = isDarkMode ? 'text-gray-300' : 'text-gray-700';
  const lineColor = isDarkMode ? 'bg-white' : 'bg-black';
  const borderColor = isDarkMode ? 'border-white' : 'border-black';

  // Specific background colors for the decorative circles to match the gradient
  const topCircleBg = isDarkMode ? 'bg-[#2C3138]' : 'bg-white';
  const bottomCircleBg = isDarkMode ? 'bg-[#3a4554]' : 'bg-[#F2EEE7]';

  return (
    // Step 3: Apply the conditional classes to the elements
    <section id='about' className={`relative font-jost py-24 px-4 sm:px-6 lg:px-8 overflow-hidden ${sectionBgClasses}`}>
      
      {/* Background watermark text */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        <h2 className={`text-[120px] top-[470px] relative font-caveat sm:text-[180px] lg:text-[300px] font-black opacity-5 select-none ${textColor}`}>
          About Us
        </h2>
      </div>
      
      {/* Decorative line */}
      <div className={`absolute top-24 bottom-24 right-8 w-px hidden lg:block z-10 ${lineColor}`}>
        {/* Top circle */}
        <div className={`absolute top-0 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 ${topCircleBg} ${borderColor}`}></div>
        
        {/* Bottom circle */}
        <div className={`absolute bottom-0 -translate-x-1/2 translate-y-1/2 w-8 h-8 rounded-full border-2 ${bottomCircleBg} ${borderColor}`}></div>
      </div>
      
      {/* Main content container */}
      <div className="relative z-10 max-w-7xl mx-auto lg:pr-20">
        <header className="text-center">
          <h2 className={`text-4xl md:text-5xl font-extrabold tracking-wider uppercase ${textColor}`}>
            About The Company
          </h2>
          <p className="mt-4 flex items-center justify-center gap-3">
            <span className="text-sm font-semibold text-[#EF3365] tracking-widest">
              A STARTUP
            </span>
            <span className={`font-serif italic text-2xl ${textColor}`}>
              with big dreams
            </span>
          </p>
        </header>

        {/* History Section */}
        <div className="mt-20 max-w-7xl mx-auto text-left">
          <h3 className={`text-3xl font-bold ${textColor}`}>
            History
          </h3>
          <div className={`mt-6 space-y-6 text-lg leading-relaxed ${paragraphColor}`}>
            <p>
            We are a next-generation technology company, that brings to you the latest digital solutions tailored to the requirements of your business. We at GLOBAL VISION SOLUTIONS offers a wide array of services, ranging from Simple Static Sites to full-blown Content Managed Enterprise Solutions. A team of experienced developers, programmers, testers and designers work tirelessly to deliver quality business products that cater to the client’s demands. We focus on each client and work dedicatedly to provide innovative and dynamic solutions using cutting-edge tools and modern technology.

            </p>
            <p>
            In case more details required, add:
            In addition to our core development services, GLOBAL VISION SOLUTIONS takes pride in offering end-to-end digital transformation support—from strategic consultation and UI/UX design to deployment, maintenance, and scalability planning. We understand that every business is unique, which is why we emphasize close collaboration and agile methodologies to ensure our solutions evolve with your goals. Whether you're launching a startup, upgrading legacy systems, or expanding your digital footprint, our team is equipped to deliver robust, secure, and future-ready platforms that empower growth and drive success.
            </p>
            <p>
            GLOBAL VISION SOLUTIONS was founded with a vision to bridge the gap between businesses and emerging digital technologies. From its inception, the company has been driven by a passion for innovation and a commitment to excellence. What began as a small team of tech enthusiasts has grown into a dynamic organization serving clients across diverse industries. Over the years, we’ve evolved alongside the digital landscape—adapting to new tools, embracing agile methodologies, and expanding our service portfolio to meet the ever-changing demands of modern enterprises. Our journey is marked by successful partnerships, transformative projects, and a relentless pursuit of delivering value through technology.
            </p>
          </div>
        </div>

        {/* Vision Section */}
        <div className="mt-12 mb-12 max-w-7xl mx-auto text-left">
          <h3 className={`text-3xl font-bold ${textColor}`}>
            Our Vision
          </h3>
          <div className={`mt-6 space-y-6 text-lg leading-relaxed ${paragraphColor}`}>
            <p>
            We are a next-generation technology company, that brings to you the latest digital solutions tailored to the requirements of your business. We at GLOBAL VISION SOLUTIONS offers a wide array of services, ranging from Simple Static Sites to full-blown Content Managed Enterprise Solutions. A team of experienced developers, programmers, testers and designers work tirelessly to deliver quality business products that cater to the client’s demands. We focus on each client and work dedicatedly to provide innovative and dynamic solutions using cutting-edge tools and modern technology
            Stats
            </p>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default AboutCompany;
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
        <h2 className={`text-[120px] top-[430px] relative font-caveat sm:text-[180px] lg:text-[300px] font-black opacity-5 select-none ${textColor}`}>
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
              Klientship Technologies Pvt Ltd is a technology transformation company that provides advanced data solutions, application development, e-commerce solutions, comprehensive engineering solutions, smart IoT solutions, and legacy application transformation services. Founded in 2018 under the name VAwebsites by brothers Likith Jagannatha Poojary and Harshith J Poojary, the company focuses on helping startups and corporate clients through unique partnership opportunities, delivering state-of-the-art technology solutions and launching innovative digital products to elevate their business.
            </p>
            <p>
              In 2022, the company was registered as a private limited company and changed its name to Klientship Technologies Pvt Ltd. The company has its headquarters in Mangaluru, India. Klientship Technologies Pvt Ltd has several subsidiaries, including Social Bubble, which provides social media management services, The Smart Learn, an e-learning platform, Easy Tourism, a travel and tourism company and Accountin, which provides accounting and financial management services.
            </p>
            <p>
              We, as a company, have digital product experts and tech enthusiasts who form a small, focused team of experienced developers, designers, and digital marketing professionals, averaging over 5 years of industry experience. This agile and youthful team collaborates closely with clients from various sectors, including healthcare, finance, retail, and e-commerce, to deliver customized solutions that meet specific needs. By prioritizing the development of important products for startups, Klientship Technologies Pvt Ltd ensures that it leverages the expertise of its top engineers to create impactful solutions.
            </p>
          </div>
        </div>

        {/* Vision Section */}
        <div className="mt-20 max-w-7xl mx-auto text-left">
          <h3 className={`text-3xl font-bold ${textColor}`}>
            Our Vision
          </h3>
          <div className={`mt-6 space-y-6 text-lg leading-relaxed ${paragraphColor}`}>
            <p>
            Klientship Technologies Pvt Ltd envisions developing as an early-stage product development company specialized in empowering startups to transition from small ideas to exceptional success by leveraging advanced technology, including AI and data analytics. We aspire to be recognized as a specialized firm in creating early-stage products like Minimum Viable Products (MVPs) and becoming a trusted tech partner for each startup we collaborate with. In the future, we aim to be a one-stop destination for early-stage startups seeking MVP development and R&D, utilizing our shared resources to establish a global presence in promoting and advancing early-stage ventures.
            </p>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default AboutCompany;
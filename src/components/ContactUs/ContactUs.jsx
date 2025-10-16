import React from 'react';
import { IoBookOutline, IoPersonOutline, IoMailOutline, IoPhonePortraitOutline } from 'react-icons/io5';

// ContactInfoItem component remains the same
const ContactInfoItem = ({ icon, title, children, isDarkMode }) => {
  const iconContainerClasses = isDarkMode 
    ? "bg-transparent border-2 border-white text-white" 
    : "bg-white border-2 border-black text-black";
  const titleColor = isDarkMode ? 'text-white' : 'text-black';
  const textColor = isDarkMode ? 'text-gray-300' : 'text-gray-600';

  return (
    <div className="flex items-start gap-6">
      <div className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center ${iconContainerClasses}`}>
        {icon}
      </div>
      <div>
        <h3 className={`font-caveat text-3xl font-bold ${titleColor}`}>{title}</h3>
        <div className={`mt-1 leading-relaxed ${textColor}`}>{children}</div>
      </div>
    </div>
  );
};

// The main ContactUs component
const ContactUs = ({ isDarkMode }) => {
  const sectionBg = isDarkMode
    ? 'bg-gradient-to-b from-[#222831] to-[#3E4651]' 
    : 'bg-gradient-to-b from-[#F3EFE8] to-white to-80%';

  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const watermarkColor = isDarkMode ? 'text-white' : 'text-black';
  const lineColor = isDarkMode ? 'bg-white' : 'bg-black';
  const borderColor = isDarkMode ? 'border-white' : 'border-black';
  
  const topCircleBg = isDarkMode ? 'bg-[#222831]' : 'bg-[#F3EFE8]';
  const bottomCircleBg = isDarkMode ? 'bg-[#3E4651]' : 'bg-white';

  return (
    <section id='contact-us' className={`relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden ${sectionBg}`}>
      
      {isDarkMode && (
        <div className="absolute top-0 left-0 w-full h-32 to-transparent pointer-events-none" />
      )}
      
      <div className="absolute inset-0 flex items-center z-100 justify-center z-0 pointer-events-none">
        <div className={`text-[100px] top-[290px]  relative font-caveat md:text-[150px] lg:text-[300px] font-black opacity-5 select-none ${watermarkColor}`}>
          Contact Us
        </div>
      </div>
      
     <div className={`absolute top-24 bottom-24 left-8 w-px hidden lg:block z-10 ${lineColor}`}>
        <div className={`absolute top-0 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 ${topCircleBg} ${borderColor}`}></div>
        <div className={`absolute bottom-0 -translate-x-1/2 translate-y-1/2 w-8 h-8 rounded-full border-2 ${bottomCircleBg} ${borderColor}`}></div>
      </div>

      <div className="absolute bottom-[0%] -left-[1px] grid grid-cols-4 gap-6">
        {Array.from({ length: 25 }).map((_, i) => (
          <div key={i} className={`w-2 h-2 border rounded-full ${borderColor}`}></div>
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10 lg:pl-20">
        <header className="text-center">
          <h2 className={`text-4xl md:text-5xl font-extrabold  tracking-wider uppercase ${textColor}`}>
            CONTACT US
          </h2>
          <p className="mt-4 flex items-center justify-center gap-3">
            <span className="text-sm font-semibold text-[#EF3365] tracking-widest">LET'S</span>
            <span className={`font-serif italic text-2xl ${textColor}`}>Talk About Ideas</span>
          </p>
        </header>

        <div className="mt-20 grid font-jost grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-12">
          {/* Left Side: Contact Info (Unchanged) */}
          <div className="lg:col-span-2 space-y-10">
            <ContactInfoItem isDarkMode={isDarkMode} icon={<IoBookOutline size={24} />} title="Address">#22, Building 661, Road 1208, Block 712, Salmabad, Kingdom of Bahrain</ContactInfoItem>
            <ContactInfoItem isDarkMode={isDarkMode} icon={<IoPersonOutline size={24} />} title="Telephone">1749 1444</ContactInfoItem>
            <ContactInfoItem isDarkMode={isDarkMode} icon={<IoMailOutline size={24} />} title="Email">info@gvs-bh.com</ContactInfoItem>
            <ContactInfoItem isDarkMode={isDarkMode} icon={<IoPhonePortraitOutline size={24} />} title="Whatsapp">Bahrain: +973 3941 6363 <br /> KSA: +966 55 380 0550</ContactInfoItem>
          </div>

          {/* ===== RIGHT SIDE: REPLACED FORM WITH GOOGLE MAP ===== */}
          <div className="lg:col-span-3">
            <div className={`w-full h-[480px] rounded-3xl overflow-hidden border-2 ${borderColor} shadow-lg`}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14435.236249565674!2d50.5237206!3d26.1868843!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49afd0213a19d3%3A0x2f892ffe9e6f0385!2sGlobal%20Vision%20Solutions!5e0!3m2!1sen!2sin!4v1731936574918!5m2!1sen!2sin"
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location of Global Vision Solutions"
              ></iframe>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
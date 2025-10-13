import React from 'react';
import { FaXTwitter, FaLinkedinIn, FaFacebook } from 'react-icons/fa6';
import { FiEyeOff, FiLifeBuoy, FiShoppingCart, FiGrid } from 'react-icons/fi';

const Hero = ({ isDarkMode }) => {
  // ... (all your conditional style variables remain the same)
  const textStrokeStyle = {
    WebkitTextStroke: isDarkMode ? '2px #000000' : '2px #000000'
  };
  const buttonClasses = isDarkMode 
    ? "bg-transparent border-2 border-white rounded-full px-8 py-3 font-bold hover:bg-[#EF3365] hover:text-white transition-all duration-300 shadow-[4px_4px_0_0_#FFF]"
    : "bg-white border-2 border-black rounded-full px-8 py-3 font-bold hover:bg-[#EF3365] hover:text-white transition-all duration-300 shadow-[4px_4px_0_0_#000]";
  const statBoxClasses = isDarkMode
    ? "bg-[#2a303a] border-2 border-white rounded-full px-6 py-3 flex items-center gap-4 shadow-[4px_4px_0_0_#FFF]"
    : "bg-white border-2 border-black rounded-full px-6 py-3 flex items-center gap-4 shadow-[4px_4px_0_0_#000]";

  return (
    // ===== THE ONLY CHANGE IS HERE =====
    // Added `bg-transparent` so the background from App.jsx shows through.
    <div className="relative bg-transparent pb-24 font-sans">
      
      {/* ... (The rest of your Hero component code is correct and does not need to change) ... */}

      {/* Vertical decorative line and circles */}
      <div className="absolute left-8 top-0 h-full hidden md:block">
        <div className={`absolute top-16 bottom-16 left-1/2 -translate-x-1/2 w-px ${isDarkMode ? 'bg-white' : 'bg-black'}`}></div>
        <div className={`absolute top-8 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full z-10 ${isDarkMode ? ' border-2 border-white' : 'bg-white border-2 border-black'}`}></div>
        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full z-10 ${isDarkMode ? ' border-3 border-white' : 'bg-white border-3 border-black'}`}></div>
      </div>

      {/* Floating icon bar */}
      {/* <div className={`absolute right-0 top-1/2 -translate-y-1/2 flex flex-col shadow-lg z-40 ${isDarkMode ? 'bg-[#2a303a] border border-gray-700' : 'bg-white border border-gray-200'}`}>
        <button className={`p-3 border-b ${isDarkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-100'}`}><FiEyeOff size={20} /></button>
        <button className={`p-3 border-b ${isDarkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-100'}`}><FiLifeBuoy size={20} /></button>
        <button className={`p-3 border-b ${isDarkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-100'}`}><FiShoppingCart size={20} /></button>
        <button className={`p-3 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}><FiGrid size={20} /></button>
      </div> */}

      {/* Main Content Grid */}
      <main className="relative grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        <div className="flex flex-col justify-center px-8 sm:px-16 py-32 lg:py-0 z-10">
          <p className="font-bold tracking-wider mt-8">
             <span className=" text-[#EF3365] font-devinyl"><span className={`${isDarkMode ? 'text-white' : 'text-black'}`}>TRANSFORMING, </span>TECHNOLOGY WORLDWIDE</span>
          </p>
          <div>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold text-[#EF3365]" style={textStrokeStyle}>
              KLIENTSHIP
            </h1>
            <h2 className="text-6xl text-white sm:text-7xl lg:text-8xl font-extrabold" style={textStrokeStyle}>
              PVT LTD
            </h2>
          </div>
          <p className="text-2xl">
             <span className="font-caveat font-bold text-3xl">Let's sail together</span>
          </p>
          <p className={`max-w-md my-6 font-jost ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            We assist start-ups and corporates in launching exceptionally high-quality digital products by leveraging advanced tools and best industry practices. Our focus is on driving innovation and delivering excellence to the market.
          </p>
          <div className="flex items-center gap-6 my-8">
            <a href="#" aria-label="Twitter" className="text-2xl hover:text-brand-teal transition-colors"><FaXTwitter /></a>
            <a href="#" aria-label="LinkedIn" className="text-2xl hover:text-brand-teal transition-colors"><FaLinkedinIn /></a>
            <a href="#" aria-label="Facebook" className="text-2xl hover:text-brand-teal transition-colors"><FaFacebook /></a>
          </div>
          <div className="flex items-center gap-4">
            <button className={buttonClasses}>
              CONTACT NOW
            </button>
            <div className={`w-16 h-px ${isDarkMode ? 'bg-white' : 'bg-black'}`}></div>
            <p className="font-bold tracking-wider">OUR SKILLS</p>
          </div>
        </div>
        
        <div className="relative h-full hidden lg:flex items-center justify-center">
          {/* ... image and other elements ... */}
          <div className="relative right-[100px] mt-10 w-[600px] h-[600px]">
            <div className="absolute inset-0 bg-[#EF3365] rounded-full z-10"></div>
            <div className="absolute bottom-0 left-0 w-full h-[700px] overflow-hidden rounded-b-full z-20">
              <img
                src="https://luique.bslthemes.com/wp-content/uploads/2022/09/profile2.png"
                alt="Zoé Miller"
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-auto"
              />
            </div>
          </div>
          <div className="absolute top-[20%] right-[10%] grid grid-cols-5 gap-6">
            {Array.from({ length: 25 }).map((_, i) => (
              <div key={i} className={`w-2 h-2 border rounded-full ${isDarkMode ? 'border-white' : 'border-black'}`}></div>
            ))}
          </div>
          <div className={`absolute bottom-28 -left-10 z-20 ${statBoxClasses}`}>
            <span className="text-4xl font-bold">12<span className='text-[#EF3365]'>+</span></span>
            <span className="text-sm font-bold leading-tight">
              YEARS OF <br /><span className='text-[#EF3365]'>EXPERIENCE</span> 
            </span>
          </div>
          <div className="absolute top-[70%] right-[100%] grid grid-cols-5 gap-6">
            {Array.from({ length: 25 }).map((_, i) => (
              <div key={i} className={`w-2 h-2 border rounded-full ${isDarkMode ? 'border-white' : 'border-black'}`}></div>
            ))}
          </div>
          <div className={`absolute bottom-10 right-44 z-20 ${statBoxClasses}`}>
            <span className="text-4xl font-bold">330</span>
            <span className="text-sm font-bold leading-tight">
              COMPLETED <br /> <span className='text-[#EF3365]'>PROJECTS</span>
            </span>
          </div>
        </div>
      </main>

      {/* This overlay logic is still correct */}
      <div 
        className={`
          absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t to-transparent 
          pointer-events-none z-30 
          ${isDarkMode ? 'from-[#2C3138]' : 'from-white'}
        `} 
      />
    </div>
  );
};

export default Hero;
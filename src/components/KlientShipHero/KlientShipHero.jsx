import React from 'react';
import { FaInstagram, FaLinkedinIn, FaFacebookF } from 'react-icons/fa';

// You can replace this with the actual image path in your project
const womanImageUrl = 'https://klientship.in/assets/images/profile2.png';

// A helper component for the dot patterns to keep the main component cleaner
const DotPattern = ({ className }) => (
  <div className={`absolute ${className} grid grid-cols-4 gap-4 w-24 h-24`}>
    {Array.from({ length: 12 }).map((_, i) => (
      <div key={i} className="w-1.5 h-1.5 rounded-full border border-gray-500/60"></div>
    ))}
  </div>
);

const KlientShipHero = () => {
  return (
    // Main container with dark background and font settings
    <div className="bg-[#2D3038] min-h-screen text-white font-sans flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      
      {/* Faint background text */}
      <div className="absolute inset-0 flex items-center justify-center text-[18vw] lg:text-[14rem] font-extrabold text-gray-500/10 z-0 select-none tracking-tighter">
        <span className="transform -translate-x-12">Web</span>
        <span className="transform translate-x-12">Developer</span>
      </div>

      {/* Decorative vertical line on the left */}
      <div className="absolute left-8 sm:left-12 top-0 bottom-0 w-px bg-gray-500/30">
        <div className="absolute top-8 -left-[7px] w-4 h-4 rounded-full border-2 border-gray-500/30 bg-[#2D3038]"></div>
      </div>

      {/* Decorative dot grid on the bottom left */}
       <div className="absolute bottom-8 left-8 sm:left-12 grid grid-cols-5 gap-3">
         {Array.from({ length: 25 }).map((_, i) => (
           <div key={i} className="w-1.5 h-1.5 rounded-full border border-gray-500/60"></div>
         ))}
       </div>

      {/* Main content grid */}
      <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center z-10 relative">
        
        {/* === Left Content Column === */}
        <div className="space-y-6 md:space-y-8 max-w-lg">
          <p className="text-sm font-medium tracking-[0.2em]">
            TRANSFORMING, <span className="text-[#F03268]">TECHNOLOGY</span> WORLDWIDE
          </p>
          
          <div>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold text-transparent" style={{ WebkitTextStroke: '2px #F03268' }}>
              KLIENTSHIP
            </h1>
            <h2 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold">
              PVT LTD
            </h2>
          </div>
          
          <p className="text-2xl italic font-serif text-gray-300">
            Let's sail together
          </p>
          
          <p className="text-gray-400 text-base leading-relaxed">
            We assist start-ups and corporates in launching exceptionally high-quality digital products by leveraging advanced tools and best industry practices. Our focus is on driving innovation and delivering excellence to the market.
          </p>
          
          <div className="flex items-center space-x-6">
            <a href="#instagram" className="text-gray-400 hover:text-white transition-colors"><FaInstagram size={20} /></a>
            <a href="#linkedin" className="text-gray-400 hover:text-white transition-colors"><FaLinkedinIn size={20} /></a>
            <a href="#facebook" className="text-gray-400 hover:text-white transition-colors"><FaFacebookF size={20} /></a>
          </div>

          <div className="flex items-center space-x-8 pt-4">
            <button className="border border-gray-400 rounded-full px-8 py-3 text-xs font-bold tracking-wider hover:bg-white hover:text-black transition-all duration-300">
              CONTACT NOW
            </button>
            <a href="#skills" className="text-xs font-bold tracking-wider hover:text-gray-300 transition-colors">OUR SKILLS</a>
          </div>
        </div>
        
        {/* === Right Image Column === */}
        <div className="relative mt-12 md:mt-0 h-[500px] w-full max-w-[500px] mx-auto">
    {/* Pink background circle */}
    {/* It is ABSOLUTE, pinned to the BOTTOM, and centered horizontally */}
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[350px] h-[350px] sm:w-[350px] sm:h-[350px] lg:w-[450px] lg:h-[450px] bg-[#EF3365] rounded-full z-0"></div>

    {/* The Image */}
    {/* Also ABSOLUTE, pinned to the BOTTOM, and centered horizontally */}
    <img 
        src={womanImageUrl} 
        alt="Woman with headphones" 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 h-[480px] w-auto object-contain" 
    />

    {/* Dot Patterns around image (no change needed, just ensure z-index is low if needed) */}
    <DotPattern className="absolute top-0 -right-4 sm:-right-10 opacity-70" />
    <DotPattern className="absolute bottom-1/4 -left-12 sm:-left-16 opacity-70" />

    {/* Stat Badge: 8+ Years */}
    <div className="absolute top-[20%] -left-4 sm:left-0 z-20 bg-[#1E2128]/90 backdrop-blur-sm rounded-full px-4 py-3 shadow-2xl flex items-center space-x-3">
      <span className="text-3xl font-bold">8</span>
      <span className="text-3xl font-bold text-[#F03268]">+</span> 
      <span className="text-[10px] uppercase font-semibold leading-tight">Years of<br/>Experience</span>
    </div>

    {/* Stat Badge: 213 Projects */}
    <div className="absolute bottom-[15%] -right-4 sm:right-0 z-20 bg-[#1E2128]/90 backdrop-blur-sm rounded-full px-5 py-3 shadow-2xl flex items-center space-x-3">
      <span className="text-3xl font-bold">213</span>
      <span className="text-[10px] uppercase font-semibold leading-tight">Completed<br/><span className="text-[#F03268]">Projects</span></span>
    </div>
</div>
      </div>
    </div>
  );
};

export default KlientShipHero;
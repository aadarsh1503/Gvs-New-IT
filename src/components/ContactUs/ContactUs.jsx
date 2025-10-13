import React from 'react';
import { IoBookOutline, IoPersonOutline, IoMailOutline, IoPhonePortraitOutline } from 'react-icons/io5';

// ===== UPDATED ContactInfoItem COMPONENT (Same as before) =====
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

// ===== UPDATED FormInput COMPONENT (Same as before) =====
const FormInput = ({ id, label, type = 'text', required = true, isDarkMode }) => {
  const isTextarea = type === 'textarea';
  const InputComponent = isTextarea ? 'textarea' : 'input';
  
  const inputClasses = isDarkMode
    ? "bg-transparent text-white border-2 border-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EF3365] focus:ring-offset-2 focus:ring-offset-gray-800"
    : "bg-white text-black border-2 border-black focus:outline-none focus:ring-2 focus:ring-[#EF3365] focus:ring-offset-2";

  return (
    <div className={isTextarea ? 'sm:col-span-2' : ''}>
      <label htmlFor={id} className="block text-xs font-bold mb-2">
        {label} {required && <span className="text-[#EF3365]">*</span>}
      </label>
      <InputComponent
        type={type}
        id={id}
        name={id}
        required={required}
        rows={isTextarea ? 5 : undefined}
        className={`w-full rounded-full py-3 px-6 ${inputClasses}`}
        style={isTextarea ? { borderRadius: '1.5rem' } : {}}
      />
    </div>
  );
};

// ===== UPDATED ContactUs COMPONENT =====
const ContactUs = ({ isDarkMode }) => {
  // --- THIS IS THE NEW GRADIENT YOU WANT ---
  // It starts dark and transitions to a lighter, but not white, color.
  const sectionBg = isDarkMode
    ? 'bg-gradient-to-b from-[#222831] to-[#3E4651]' 
    : 'bg-gradient-to-b from-[#F3EFE8] to-white to-80%';

  // Define conditional styles for other elements
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const watermarkColor = isDarkMode ? 'text-white' : 'text-black';
  const lineColor = isDarkMode ? 'bg-white ' : 'bg-black';
  const borderColor = isDarkMode ? 'border-white' : 'border-black';
  const submitButtonClasses = isDarkMode
    ? "bg-transparent border-2 border-white text-white hover:bg-[#EF3365] hover:text-white hover:border-[#EF3365]"
    : "bg-transparent border-2 border-black text-black hover:bg-[#EF3365] hover:text-white hover:border-[#EF3365]";

  // Match decorative circles to the gradient
  // Top circle now matches the desired start color of the gradient
  const topCircleBg = isDarkMode ? 'bg-[#222831]' : 'bg-[#F3EFE8]';
  const bottomCircleBg = isDarkMode ? 'bg-[#3E4651]' : 'bg-white';

  return (
    // Add `relative` to the section to contain the pseudo-element
    <section id='contact-us' className={`relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden ${sectionBg}`}>
      
      {/* --- SEAMLESS TRANSITION OVERLAY --- */}
      {/* This div sits on top, fades from the PREVIOUS section's color to transparent, hiding the seam. */}
      {isDarkMode && (
        <div className="absolute top-0 left-0 w-full h-32  to-transparent pointer-events-none" />
      )}
      
      {/* The rest of your component content sits underneath the overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        <div className={`text-[100px] top-[250px] relative font-caveat md:text-[150px] lg:text-[300px] font-black opacity-5 select-none ${watermarkColor}`}>
          Contact Us
        </div>
      </div>
      
     {/* ===== CORRECTED DECORATIVE LINE ===== */}
     <div className={`absolute top-24 bottom-24 left-8 w-px hidden lg:block z-10 ${lineColor}`}>
        {/* Changed -translate-x-1-2 to -translate-x-1/2 */}
        <div className={`absolute top-0 -translate-x-1/2 -translate-y-1/2  w-8 h-8 rounded-full border-2 ${topCircleBg} ${borderColor}`}></div>
        
        {/* Changed -translate-x-1-2 to -translate-x-1/2 */}
        <div className={`absolute bottom-0 -translate-x-1/2 translate-y-1/2 w-8 h-8 rounded-full border-2 ${bottomCircleBg} ${borderColor}`}></div>
      </div>

      <div className="absolute bottom-[0%] -left-[1px] grid grid-cols-4 gap-6">
        {Array.from({ length: 25 }).map((_, i) => (
          <div key={i} className={`w-2 h-2 border rounded-full ${borderColor}`}></div>
        ))}
      </div>
      
      {/* Add `relative` to the content wrapper to ensure it's above the overlay */}
      <div className="max-w-7xl mx-auto relative z-10 lg:pl-20">
        <header className="text-center">
          <h2 className={`text-4xl md:text-5xl font-extrabold tracking-wider uppercase ${textColor}`}>
            CONTACT US
          </h2>
          <p className="mt-4 flex items-center justify-center gap-3">
            <span className="text-sm font-semibold text-[#EF3365] tracking-widest">LET'S</span>
            <span className={`font-serif italic text-2xl ${textColor}`}>Talk About Ideas</span>
          </p>
        </header>

        <div className="mt-20 grid font-jost grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-12">
          <div className="lg:col-span-2 space-y-10">
            {/* ... ContactInfoItems ... */}
            <ContactInfoItem isDarkMode={isDarkMode} icon={<IoBookOutline size={24} />} title="Address">102, First Floor, VSK Towers Bengrakulur Road,<br />
              Kottara Chowki Mangaluru Dakshina Kannada -<br />
              575006 Karnataka - India
</ContactInfoItem>
            <ContactInfoItem isDarkMode={isDarkMode} icon={<IoPersonOutline size={24} />} title="Time">Available Right Now
            </ContactInfoItem>
            <ContactInfoItem isDarkMode={isDarkMode} icon={<IoMailOutline size={24} />} title="Email"> klientshipindia@gmail.com
            </ContactInfoItem>
            <ContactInfoItem isDarkMode={isDarkMode} icon={<IoPhonePortraitOutline size={24} />} title="Phone">  +91 8088950719, +91 9110650853
            </ContactInfoItem>
          </div>

          <div className="lg:col-span-3">
            <form action="#" method="POST">
              <div className="grid grid-cols-1 relative z-10 sm:grid-cols-2 gap-x-6 gap-y-8">
                {/* ... FormInputs ... */}
                <FormInput isDarkMode={isDarkMode} id="fullName" label="Your Full Name" />
                <FormInput isDarkMode={isDarkMode} id="email" label="Your Email Address" type="email" />
                <FormInput isDarkMode={isDarkMode} id="phone" label="Your Phone Number" type="tel" />
                <FormInput isDarkMode={isDarkMode} id="subject" label="Your Subject" />
                <FormInput isDarkMode={isDarkMode} id="message" label="Your Message" type="textarea" />
              </div>
              <div className="absolute bottom-[0%] mx-auto grid z-0 grid-cols-5 gap-6">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div key={i} className={`w-2 h-2 border rounded-full ${borderColor}`}></div>
                ))}
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  className={`py-3 px-8 text-sm font-bold uppercase tracking-wider transition-colors duration-300 rounded-full ${submitButtonClasses}`}
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
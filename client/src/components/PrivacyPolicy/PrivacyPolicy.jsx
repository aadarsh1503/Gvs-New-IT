// src/components/PrivacyPolicy.jsx
// You can rename the file to PrivacyPolicy.jsx for clarity, but it's not required.

import React from 'react';

// NEW DATA: The content for the Privacy Policy
const privacyPolicyData = [
    {
        title: '1. Information We Collect',
        content:
          'We collect various types of information, including personal information you provide directly to us, such as your name, email address, phone number, and payment information. We may also collect non-personal information about your usage of our services.',
    },
    {
        title: '2. How We Use Your Information',
        content:
          'Your information is used to provide and improve our services, process payments, communicate with you, and fulfill your requests. We may also use your information to send promotional materials, if you have opted to receive them.',
    },
    {
        title: '3. Data Sharing and Disclosure',
        content:
          'We do not sell, trade, or otherwise transfer your personal information to outside parties without your consent, except to trusted third parties who assist us in operating our website, conducting our business, or servicing you, as long as those parties agree to keep this information confidential.',
    },
    {
        title: '4. Data Security',
        content:
          'We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or method of electronic storage is 100% secure, and we cannot guarantee its absolute security.',
    },
    {
        title: '5. Cookies',
        content:
          'Our website may use "cookies" to enhance your experience. You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer.',
    },
    {
        title: '6. Your Rights',
        content:
          'You have the right to request access to the personal information we hold about you, to have any inaccuracies corrected, and to request the deletion of your personal information. To exercise these rights, please contact us using the information provided below.',
    },
    {
        title: '7. Changes to This Policy',
        content:
          'We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on our website. You are advised to review this policy periodically for any changes.',
    },
    {
        title: '8. Governing Law',
        content:
          'This policy shall be governed by and construed in accordance with the laws of India. Any disputes arising from this policy or our services will be subject to the exclusive jurisdiction of the courts located in India.',
    },
    {
        title: '9. Contact Us',
        content:
          'If you have any questions or concerns regarding this privacy policy, please contact us at Contact Us. We are here to assist you and ensure that your privacy is protected.',
    },
];


const PrivacyPolicy = ({ isDarkMode }) => {
  // All conditional styling classes remain the same as before
  const containerBg = isDarkMode ? 'bg-gradient-to-b from-[#2a303a] to-[#1a1d21]' : 'bg-[#F0EBE3]';
  const cardBg = isDarkMode ? 'bg-[#2a303a]/60 backdrop-blur-sm border border-gray-700/50' : '';
  const mainHeadingText = isDarkMode ? 'text-white' : 'text-zinc-800';
  const subHeadingText = isDarkMode ? 'text-gray-200' : 'text-zinc-600';
  const sectionTitleText = isDarkMode ? 'text-gray-100' : 'text-zinc-700';
  const bodyText = isDarkMode ? 'text-gray-300' : 'text-zinc-600';
  const lineClass = isDarkMode ? 'bg-white' : 'bg-black';
  const circleClass = isDarkMode ? 'bg-[#2a303a] border-2 border-white' : 'bg-white border-2 border-black';

  return (
    <div className={`${containerBg} min-h-screen font-jost transition-colors duration-300`}>
      <div className="relative container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        
        {/* Vertical decorative line and circles */}
        <div className="absolute left-8 md:left-12 lg:left-16 top-5 h-full hidden md:block">
          <div className={`absolute top-24 bottom-24 left-1/2 -translate-x-1/2 w-px ${lineClass}`}></div>
          <div className={`absolute top-16 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full z-10 ${circleClass}`}></div>
          <div className={`absolute bottom-16 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full z-10 ${circleClass}`}></div>
        </div>

        {/* Main Content Card */}
        <div className={`max-w-7xl mt-6 mx-auto ${cardBg} overflow-hidden`}>
          <div className="p-8 sm:p-12">
            <header className="text-center mb-12">
              {/* UPDATED HEADER TEXT */}
              <h1 className={`text-4xl md:text-5xl font-bold uppercase tracking-tight ${mainHeadingText}`}>
                Privacy Policy
              </h1>
              <p className={`mt-4 text-lg ${subHeadingText}`}>
                Welcome to Global Vision Solutions!
              </p>
            </header>

            {/* UPDATED CONTENT MAPPING */}
            <div className="space-y-8">
              {privacyPolicyData.map((policy, index) => (
                <section key={index}>
                  <h2 className={`text-2xl font-semibold mb-3 ${sectionTitleText}`}>
                    {policy.title}
                  </h2>
                  <p className={`text-base leading-relaxed ${bodyText}`}>
                    {policy.content}
                  </p>
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// You can export it as default, so you can import it with any name you like.
export default PrivacyPolicy;
// src/components/TermsAndConditions.jsx

import React from 'react';

// Data for the terms remains the same
const termsData = [
    {
        title: '1. Acceptance of Terms',
        content:
          'By accessing and using our services, you accept and agree to be bound by the terms outlined herein. If you do not agree to these terms, please refrain from using our services. We reserve the right to amend these terms at any time, and it is your responsibility to review them periodically.',
    },
    {
        title: '2. Service Overview',
        content:
          'Global Vision Solutions offers a variety of digital solutions, including but not limited to website development, eCommerce solutions, social media marketing, and graphic design services. Specific service offerings and pricing can be found on our website.',
    },
    {
        title: '3. Payment Terms',
        content:
          'All payments for services are due upon completion of the project or as otherwise agreed upon in writing. Payment methods accepted include bank transfer, credit/debit card, and other payment processors as indicated on our site. Any applicable taxes will be added to the total cost.',
    },
    {
        title: '4. Domain and Hosting',
        content:
          'For our website development services, we offer one year of free hosting and a domain name worth up to ₹500. Clients will be responsible for any costs exceeding this amount. After the first year, ongoing hosting fees will apply and will be communicated to the client in advance.',
    },
    {
        title: '5. Refund Policy',
        content:
          'Refunds may be issued according to our refund policy, which is designed to ensure fairness for both parties. Please refer to the Refund Policy for specific conditions and procedures related to refund requests.',
    },
    {
        title: '6. Revisions',
        content:
          'Each service includes a specified number of revisions, as outlined in the service agreement. For example, website design services may include one complimentary revision. Any additional revisions will incur extra charges, which will be communicated before any additional work is undertaken.',
    },
    {
        title: '7. Intellectual Property Rights',
        content:
          'Upon full payment, clients will have ownership of the final products delivered by Global Vision Solutions. However, we reserve the right to use project elements in our portfolio and for promotional purposes unless otherwise agreed upon in writing.',
    },
    {
        title: '8. Limitation of Liability',
        content:
          'Global Vision Solutions shall not be liable for any indirect, incidental, or consequential damages arising out of the use of our services. Our total liability to you for any claim arising from these terms or your use of our services shall not exceed the amount paid by you for the specific service that is the subject of the claim.',
    },
    {
        title: '9. Changes to Terms',
        content:
          'We reserve the right to modify these terms at any time. Any changes will be effective immediately upon posting on our website. It is your responsibility to review the terms periodically to ensure you are aware of any updates.',
    },
    {
        title: '10. Governing Law',
        content:
          'These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms or our services will be subject to the exclusive jurisdiction of the courts located in India.',
    },
    {
        title: '11. Termination',
        content:
          'We reserve the right to terminate any service or account if you violate these terms or engage in unlawful or inappropriate behavior. Upon termination, you will be notified, and you may lose access to any data or content associated with your account.',
    },
    {
        title: '12. Contact Us',
        content:
          'If you have any questions or concerns regarding these terms, please contact us at Contact Us. We are here to assist you and ensure you have a positive experience with our services.',
    },
];


const TermsAndConditions = ({ isDarkMode }) => {
  // Conditional classes for dark/light mode
  // --- UPDATES ARE HERE ---
  
  // CHANGED: Added a gradient for the dark mode background
  const containerBg = isDarkMode ? 'bg-gradient-to-b from-[#2a303a] to-[#1a1d21]' : 'bg-[#F0EBE3]';
  
  const cardBg = isDarkMode ? 'bg-[#2a303a]/60 backdrop-blur-sm border border-gray-700/50' : '';
  
  // CHANGED: Made dark mode text colors brighter (whiter)
  const mainHeadingText = isDarkMode ? 'text-white' : 'text-zinc-800';
  const subHeadingText = isDarkMode ? 'text-gray-200' : 'text-zinc-600';
  const sectionTitleText = isDarkMode ? 'text-gray-100' : 'text-zinc-700';
  const bodyText = isDarkMode ? 'text-gray-300' : 'text-zinc-600'; // Using gray-300 for readability on long paragraphs

  const lineClass = isDarkMode ? 'bg-white' : 'bg-black';
  const circleClass = isDarkMode ? 'bg-[#2a303a] border-2 border-white' : 'bg-white border-2 border-black';

  return (
    <div className={`${containerBg} min-h-screen  font-jost transition-colors duration-300`}>
      <div className="relative container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        
        {/* Vertical decorative line and circles */}
        <div className="absolute left-8 md:left-12 lg:left-16 top-5 h-full hidden md:block">
          <div className={`absolute top-24 bottom-24 left-1/2 -translate-x-1/2 w-px ${lineClass}`}></div>
          <div className={`absolute top-16 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full z-10 ${circleClass}`}></div>
          <div className={`absolute bottom-16 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full z-10 ${circleClass}`}></div>
        </div>

        {/* Main Content Card */}
        <div className={`max-w-7xl mt-6 mx-auto ${cardBg}  overflow-hidden`}>
          <div className="p-8 sm:p-12">
            <header className="text-center mb-12">
              <h1 className={`text-4xl md:text-5xl font-bold uppercase tracking-tight ${mainHeadingText}`}>
                Terms and Conditions
              </h1>
              <p className={`mt-4 text-lg ${subHeadingText}`}>
                Welcome to Global Vision Solutions
              </p>
            </header>

            <div className="space-y-8">
              {termsData.map((term, index) => (
                <section key={index}>
                  <h2 className={`text-2xl font-semibold mb-3 ${sectionTitleText}`}>
                    {term.title}
                  </h2>
                  <p className={`text-base leading-relaxed ${bodyText}`}>
                    {term.content}
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

export default TermsAndConditions;
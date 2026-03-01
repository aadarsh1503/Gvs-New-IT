import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePickerStyles.css';

const StaffDetails = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({
    // Staff Basic Info
    staffId: '',
    position: '',
    company: '',
    crNumber: '',
    staffName: '',
    staffCpr: '',
    cprIssuedDate: null,
    cprExpDate: null,
    
    // Passport Info
    passportNumber: '',
    passportIssuedDate: null,
    passportExpDate: null,
    
    // Visa Info
    visaState: '',
    visaType: '',
    transferVisaDate: null,
    lastJoiningDate: null,
    
    // Driving License
    drivingLicense: '',
    drivingLicenseIssued: null,
    drivingLicenseExpiry: null,
    
    // Personal Info
    birthday: null,
    age: '',
    nationality: '',
    religion: '',
    
    // Contact Info
    personalContactWhatsapp: '',
    personalContactEmail: '',
    officeContactNumber: '',
    officeContactEmail: '',
    
    // Emergency Contact
    emergencyContactNumber: '',
    emergencyContactName: '',
    emergencyContactRelationship: '',
    
    // Payment Info
    paymentWay: '',
    bankName: '',
    ibanNumber: '',
    benefitNumber: '',
    dateOfJoining: null
  });

  const companies = [
    'GLOBAL VISION SOLUTIONS',
    'SHAHEEN EXPRESS',
    'AQUA CARE SERVICES',
    'ARABI ASEEL KITCHEN',
    'ALSHEEN MANPOWER'
  ];

  const crNumbers = [
    '5369901-GVS',
    '5369902-SHAHEEN EXPRESS',
    '5369903-ARABI ASEEL',
    '5369903-ALSHEEN MANPOWER'
  ];

  const visaTypes = [
    'visit visa',
    'employment visa',
    'dependent visa',
    'investor visa',
    'other'
  ];

  const paymentWays = [
    'Benefit',
    'Bank Account',
    'Cash'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (name, date) => {
    setFormData(prev => ({
      ...prev,
      [name]: date
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation - check if key fields are filled
    if (!formData.staffId || !formData.staffName || !formData.position || 
        !formData.company || !formData.crNumber || !formData.staffCpr) {
      toast.error('Please fill all required fields marked with *');
      return;
    }

    // Check if dates are filled
    if (!formData.cprIssuedDate || !formData.cprExpDate || !formData.passportIssuedDate || 
        !formData.passportExpDate || !formData.birthday || !formData.dateOfJoining) {
      toast.error('Please fill all required date fields');
      return;
    }

    // Check other required fields
    if (!formData.visaState || !formData.visaType || !formData.drivingLicense || 
        !formData.age || !formData.nationality || !formData.religion) {
      toast.error('Please complete all personal information fields');
      return;
    }

    // Check contact fields
    if (!formData.personalContactWhatsapp || !formData.personalContactEmail || 
        !formData.officeContactNumber || !formData.officeContactEmail) {
      toast.error('Please fill all contact information fields');
      return;
    }

    // Check emergency contact
    if (!formData.emergencyContactNumber || !formData.emergencyContactName || 
        !formData.emergencyContactRelationship) {
      toast.error('Please fill all emergency contact fields');
      return;
    }

    // Check payment info
    if (!formData.paymentWay || !formData.bankName || !formData.ibanNumber || 
        !formData.benefitNumber) {
      toast.error('Please fill all payment information fields');
      return;
    }

    // Check driving license dates if license is yes
    if (formData.drivingLicense === 'yes') {
      if (!formData.drivingLicenseIssued || !formData.drivingLicenseExpiry) {
        toast.error('Please fill driving license dates');
        return;
      }
    }

    try {
      const response = await fetch('/api/staff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('✅ Staff details submitted successfully!');
        // Reset form after short delay
        setTimeout(() => {
          setFormData({
            staffId: '', position: '', company: '', crNumber: '', staffName: '',
            staffCpr: '', cprIssuedDate: null, cprExpDate: null, passportNumber: '',
            passportIssuedDate: null, passportExpDate: null, visaState: '', visaType: '',
            transferVisaDate: null, lastJoiningDate: null, drivingLicense: '',
            drivingLicenseIssued: null, drivingLicenseExpiry: null, birthday: null,
            age: '', nationality: '', religion: '', personalContactWhatsapp: '',
            personalContactEmail: '', officeContactNumber: '', officeContactEmail: '',
            emergencyContactNumber: '', emergencyContactName: '', emergencyContactRelationship: '',
            paymentWay: '', bankName: '', ibanNumber: '', benefitNumber: '', dateOfJoining: null
          });
        }, 1500);
      } else {
        const data = await response.json();
        toast.error(data.message || '❌ Failed to submit staff details');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('❌ Network error. Please check your connection');
    }
  };

  const inputClass = `w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2 ${
    isDarkMode
      ? 'bg-[#2C3138] border-gray-700 text-white placeholder-gray-400 focus:border-brand-pink focus:ring-brand-pink'
      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-brand-teal focus:ring-brand-teal'
  }`;

  const labelClass = `block text-sm font-semibold mb-2 ${
    isDarkMode ? 'text-gray-200' : 'text-gray-700'
  }`;

  const sectionClass = `p-6 rounded-xl mb-6 ${
    isDarkMode ? 'bg-[#282E35]' : 'bg-white shadow-lg'
  }`;

  return (
    <div className={isDarkMode ? 'dark-mode' : ''}>
      <div className={`min-h-screen py-20 px-4 sm:px-6 lg:px-8 ${
        isDarkMode ? 'bg-gradient-to-b from-[#222831] to-[#2C3138]' : 'bg-[#F2EEE7]'
      }`}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Staff Details Form
          </h1>
          <p className={`text-lg ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Complete the form below with accurate information
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className={sectionClass}>
            <h2 className={`text-2xl font-bold mb-6 ${
              isDarkMode ? 'text-brand-pink' : 'text-brand-pink'
            }`}>
              Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Staff ID <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="staffId"
                  value={formData.staffId}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="Enter staff ID"
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Position <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="Enter position"
                  required
                />
              </div>
            </div>

            {/* Company Radio Buttons */}
            <div className="mt-6">
              <label className={labelClass}>Company <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {companies.map((company) => (
                  <label
                    key={company}
                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${
                      isDarkMode
                        ? 'hover:bg-[#2C3138] border border-gray-700'
                        : 'hover:bg-gray-50 border border-gray-200'
                    } ${
                      formData.company === company
                        ? isDarkMode
                          ? 'bg-[#2C3138] border-brand-pink'
                          : 'bg-blue-50 border-brand-pink'
                        : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="company"
                      value={company}
                      checked={formData.company === company}
                      onChange={handleInputChange}
                      className={`w-5 h-5 focus:ring-brand-pink ${
                        isDarkMode ? 'text-brand-pink' : 'text-brand-teal'
                      }`}
                      required
                    />
                    <span className={`ml-3 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      {company}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* CR Number Radio Buttons */}
            <div className="mt-6">
              <label className={labelClass}>CR Number <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {crNumbers.map((cr) => (
                  <label
                    key={cr}
                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${
                      isDarkMode
                        ? 'hover:bg-[#2C3138] border border-gray-700'
                        : 'hover:bg-gray-50 border border-gray-200'
                    } ${
                      formData.crNumber === cr
                        ? isDarkMode
                          ? 'bg-[#2C3138] border-brand-pink'
                          : 'bg-blue-50 border-brand-pink'
                        : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="crNumber"
                      value={cr}
                      checked={formData.crNumber === cr}
                      onChange={handleInputChange}
                      className={`w-5 h-5 focus:ring-brand-pink ${
                        isDarkMode ? 'text-brand-pink' : 'text-brand-teal'
                      }`}
                      required
                    />
                    <span className={`ml-3 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      {cr}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className={labelClass}>Staff Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="staffName"
                  value={formData.staffName}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Staff CPR <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="staffCpr"
                  value={formData.staffCpr}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="Enter CPR number"
                  required
                />
              </div>

              <div>
                <label className={labelClass}>CPR Issued Date <span className="text-red-500">*</span></label>
                <DatePicker
                  selected={formData.cprIssuedDate}
                  onChange={(date) => handleDateChange('cprIssuedDate', date)}
                  dateFormat="dd/MM/yyyy"
                  className={inputClass}
                  placeholderText="Select date"
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                  required
                />
              </div>

              <div>
                <label className={labelClass}>CPR Expiry Date <span className="text-red-500">*</span></label>
                <DatePicker
                  selected={formData.cprExpDate}
                  onChange={(date) => handleDateChange('cprExpDate', date)}
                  dateFormat="dd/MM/yyyy"
                  className={inputClass}
                  placeholderText="Select date"
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                  minDate={formData.cprIssuedDate}
                  required
                />
              </div>
            </div>
          </div>

          {/* Passport Information */}
          <div className={sectionClass}>
            <h2 className={`text-2xl font-bold mb-6 ${
              isDarkMode ? 'text-brand-pink' : 'text-brand-pink'
            }`}>
              Passport Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className={labelClass}>Passport Number <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="passportNumber"
                  value={formData.passportNumber}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="Enter passport number"
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Passport Issued Date <span className="text-red-500">*</span></label>
                <DatePicker
                  selected={formData.passportIssuedDate}
                  onChange={(date) => handleDateChange('passportIssuedDate', date)}
                  dateFormat="dd/MM/yyyy"
                  className={inputClass}
                  placeholderText="Select date"
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Passport Expiry Date <span className="text-red-500">*</span></label>
                <DatePicker
                  selected={formData.passportExpDate}
                  onChange={(date) => handleDateChange('passportExpDate', date)}
                  dateFormat="dd/MM/yyyy"
                  className={inputClass}
                  placeholderText="Select date"
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                  minDate={formData.passportIssuedDate}
                  required
                />
              </div>
            </div>
          </div>

          {/* Visa Information */}
          <div className={sectionClass}>
            <h2 className={`text-2xl font-bold mb-6 ${
              isDarkMode ? 'text-brand-pink' : 'text-brand-pink'
            }`}>
              Visa Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Visa State <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="visaState"
                  value={formData.visaState}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="Enter visa state"
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Visa Type <span className="text-red-500">*</span></label>
                <select
                  name="visaType"
                  value={formData.visaType}
                  onChange={handleInputChange}
                  className={inputClass}
                  required
                >
                  <option value="" disabled={formData.visaType !== ''}>Select visa type</option>
                  {visaTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Transfer Visa Date <span className="text-red-500">*</span></label>
                <DatePicker
                  selected={formData.transferVisaDate}
                  onChange={(date) => handleDateChange('transferVisaDate', date)}
                  dateFormat="dd/MM/yyyy"
                  className={inputClass}
                  placeholderText="Select date"
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Last Joining Date <span className="text-red-500">*</span></label>
                <DatePicker
                  selected={formData.lastJoiningDate}
                  onChange={(date) => handleDateChange('lastJoiningDate', date)}
                  dateFormat="dd/MM/yyyy"
                  className={inputClass}
                  placeholderText="Select date"
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                  required
                />
              </div>
            </div>
          </div>

          {/* Driving License */}
          <div className={sectionClass}>
            <h2 className={`text-2xl font-bold mb-6 ${
              isDarkMode ? 'text-brand-pink' : 'text-brand-pink'
            }`}>
              Driving License
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className={labelClass}>Driving License <span className="text-red-500">*</span></label>
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="drivingLicense"
                      value="yes"
                      checked={formData.drivingLicense === 'yes'}
                      onChange={handleInputChange}
                      className={`w-5 h-5 focus:ring-brand-pink ${
                        isDarkMode ? 'text-brand-pink' : 'text-brand-teal'
                      }`}
                      required
                    />
                    <span className={`ml-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      Yes
                    </span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="drivingLicense"
                      value="no"
                      checked={formData.drivingLicense === 'no'}
                      onChange={handleInputChange}
                      className={`w-5 h-5 focus:ring-brand-pink ${
                        isDarkMode ? 'text-brand-pink' : 'text-brand-teal'
                      }`}
                      required
                    />
                    <span className={`ml-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      No
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className={labelClass}>License Issued Date {formData.drivingLicense === 'yes' && <span className="text-red-500">*</span>}</label>
                <DatePicker
                  selected={formData.drivingLicenseIssued}
                  onChange={(date) => handleDateChange('drivingLicenseIssued', date)}
                  dateFormat="dd/MM/yyyy"
                  className={inputClass}
                  placeholderText="Select date"
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                  disabled={formData.drivingLicense !== 'yes'}
                  required={formData.drivingLicense === 'yes'}
                />
              </div>

              <div>
                <label className={labelClass}>License Expiry Date {formData.drivingLicense === 'yes' && <span className="text-red-500">*</span>}</label>
                <DatePicker
                  selected={formData.drivingLicenseExpiry}
                  onChange={(date) => handleDateChange('drivingLicenseExpiry', date)}
                  dateFormat="dd/MM/yyyy"
                  className={inputClass}
                  placeholderText="Select date"
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                  disabled={formData.drivingLicense !== 'yes'}
                  minDate={formData.drivingLicenseIssued}
                  required={formData.drivingLicense === 'yes'}
                />
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className={sectionClass}>
            <h2 className={`text-2xl font-bold mb-6 ${
              isDarkMode ? 'text-brand-pink' : 'text-brand-pink'
            }`}>
              Personal Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Birthday <span className="text-red-500">*</span></label>
                <DatePicker
                  selected={formData.birthday}
                  onChange={(date) => handleDateChange('birthday', date)}
                  dateFormat="dd/MM/yyyy"
                  className={inputClass}
                  placeholderText="Select date"
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                  maxDate={new Date()}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Age <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="Enter age"
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Nationality <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="Enter nationality"
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Religion <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="religion"
                  value={formData.religion}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="Enter religion"
                  required
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className={sectionClass}>
            <h2 className={`text-2xl font-bold mb-6 ${
              isDarkMode ? 'text-brand-pink' : 'text-brand-pink'
            }`}>
              Contact Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Personal Contact (WhatsApp) <span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  name="personalContactWhatsapp"
                  value={formData.personalContactWhatsapp}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="+973 XXXX XXXX"
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Personal Contact (Email) <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  name="personalContactEmail"
                  value={formData.personalContactEmail}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="personal@example.com"
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Office Contact (Number) <span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  name="officeContactNumber"
                  value={formData.officeContactNumber}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="+973 XXXX XXXX"
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Office Contact (Email) <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  name="officeContactEmail"
                  value={formData.officeContactEmail}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="office@example.com"
                  required
                />
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className={sectionClass}>
            <h2 className={`text-2xl font-bold mb-6 ${
              isDarkMode ? 'text-brand-pink' : 'text-brand-pink'
            }`}>
              Emergency Contact
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className={labelClass}>Emergency Contact Number <span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  name="emergencyContactNumber"
                  value={formData.emergencyContactNumber}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="+973 XXXX XXXX"
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Emergency Contact Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="emergencyContactName"
                  value={formData.emergencyContactName}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="Enter name"
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Relationship <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="emergencyContactRelationship"
                  value={formData.emergencyContactRelationship}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="e.g., Spouse, Parent"
                  required
                />
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className={sectionClass}>
            <h2 className={`text-2xl font-bold mb-6 ${
              isDarkMode ? 'text-brand-pink' : 'text-brand-pink'
            }`}>
              Payment Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Payment Way <span className="text-red-500">*</span></label>
                <select
                  name="paymentWay"
                  value={formData.paymentWay}
                  onChange={handleInputChange}
                  className={inputClass}
                  required
                >
                  <option value="" disabled={formData.paymentWay !== ''}>Select payment method</option>
                  {paymentWays.map((method) => (
                    <option key={method} value={method}>
                      {method}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Bank Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="Enter bank name"
                  required
                />
              </div>

              <div>
                <label className={labelClass}>IBAN Number <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="ibanNumber"
                  value={formData.ibanNumber}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="BH00 XXXX XXXX XXXX XXXX XX"
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Benefit Number <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="benefitNumber"
                  value={formData.benefitNumber}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="Enter benefit number"
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Date of Joining <span className="text-red-500">*</span></label>
                <DatePicker
                  selected={formData.dateOfJoining}
                  onChange={(date) => handleDateChange('dateOfJoining', date)}
                  dateFormat="dd/MM/yyyy"
                  className={inputClass}
                  placeholderText="Select date"
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                  required
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <button
              type="submit"
              className={`px-12 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                isDarkMode
                  ? 'text-white bg-[#0270a8] cursor-pointer shadow-lg shadow-brand-pink/50'
                  : 'text-white bg-[#0270a8] cursor-pointer shadow-lg shadow-brand-pink/50'
              }`}
            >
              Submit Staff Details
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default StaffDetails;

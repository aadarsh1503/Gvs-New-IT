import { FiX } from 'react-icons/fi';

const ViewStaffModal = ({ staff, isDarkMode, onClose }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  const sectionClass = `mb-6 p-4 rounded-lg ${
    isDarkMode ? 'bg-[#2C3138]' : 'bg-gray-50'
  }`;

  const labelClass = `text-sm font-semibold ${
    isDarkMode ? 'text-gray-400' : 'text-gray-600'
  }`;

  const valueClass = `text-base ${
    isDarkMode ? 'text-white' : 'text-gray-900'
  }`;

  const InfoRow = ({ label, value }) => (
    <div className="mb-3">
      <div className={labelClass}>{label}</div>
      <div className={valueClass}>{value || 'N/A'}</div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-5xl max-h-[90vh] rounded-xl ${
        isDarkMode ? 'bg-[#282E35]' : 'bg-white'
      }`}>
        <div className={`flex justify-between items-center p-6 border-b ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <h2 className={`text-2xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Staff Details - {staff.staff_name}
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-all ${
              isDarkMode ? 'hover:bg-[#2C3138]' : 'hover:bg-gray-100'
            }`}
          >
            <FiX className={isDarkMode ? 'text-white' : 'text-gray-900'} size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 180px)' }}>
          {/* Basic Information */}
          <div className={sectionClass}>
            <h3 className={`text-xl font-bold mb-4 ${
              isDarkMode ? 'text-brand-pink' : 'text-brand-teal'
            }`}>
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InfoRow label="Staff ID" value={staff.staff_id} />
              <InfoRow label="Staff Name" value={staff.staff_name} />
              <InfoRow label="Position" value={staff.position} />
              <InfoRow label="Company" value={staff.company} />
              <InfoRow label="CR Number" value={staff.cr_number} />
            </div>
          </div>

          {/* CPR Information */}
          <div className={sectionClass}>
            <h3 className={`text-xl font-bold mb-4 ${
              isDarkMode ? 'text-brand-pink' : 'text-brand-teal'
            }`}>
              CPR Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InfoRow label="Staff CPR" value={staff.staff_cpr} />
              <InfoRow label="CPR Issued Date" value={formatDate(staff.cpr_issued_date)} />
              <InfoRow label="CPR Expiry Date" value={formatDate(staff.cpr_exp_date)} />
            </div>
          </div>

          {/* Passport Information */}
          <div className={sectionClass}>
            <h3 className={`text-xl font-bold mb-4 ${
              isDarkMode ? 'text-brand-pink' : 'text-brand-teal'
            }`}>
              Passport Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InfoRow label="Passport Number" value={staff.passport_number} />
              <InfoRow label="Passport Issued Date" value={formatDate(staff.passport_issued_date)} />
              <InfoRow label="Passport Expiry Date" value={formatDate(staff.passport_exp_date)} />
            </div>
          </div>

          {/* Visa Information */}
          <div className={sectionClass}>
            <h3 className={`text-xl font-bold mb-4 ${
              isDarkMode ? 'text-brand-pink' : 'text-brand-teal'
            }`}>
              Visa Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoRow label="Visa State" value={staff.visa_state} />
              <InfoRow label="Visa Type" value={staff.visa_type} />
              <InfoRow label="Transfer Visa Date" value={formatDate(staff.transfer_visa_date)} />
              <InfoRow label="Last Joining Date" value={formatDate(staff.last_joining_date)} />
            </div>
          </div>

          {/* Driving License */}
          <div className={sectionClass}>
            <h3 className={`text-xl font-bold mb-4 ${
              isDarkMode ? 'text-brand-pink' : 'text-brand-teal'
            }`}>
              Driving License
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InfoRow label="Has Driving License" value={staff.driving_license === 'yes' ? 'Yes' : 'No'} />
              <InfoRow label="License Issued Date" value={formatDate(staff.driving_license_issued)} />
              <InfoRow label="License Expiry Date" value={formatDate(staff.driving_license_expiry)} />
            </div>
          </div>

          {/* Personal Information */}
          <div className={sectionClass}>
            <h3 className={`text-xl font-bold mb-4 ${
              isDarkMode ? 'text-brand-pink' : 'text-brand-teal'
            }`}>
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoRow label="Birthday" value={formatDate(staff.birthday)} />
              <InfoRow label="Age" value={staff.age} />
              <InfoRow label="Nationality" value={staff.nationality} />
              <InfoRow label="Religion" value={staff.religion} />
            </div>
          </div>

          {/* Contact Information */}
          <div className={sectionClass}>
            <h3 className={`text-xl font-bold mb-4 ${
              isDarkMode ? 'text-brand-pink' : 'text-brand-teal'
            }`}>
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoRow label="Personal Contact (WhatsApp)" value={staff.personal_contact_whatsapp} />
              <InfoRow label="Personal Contact (Email)" value={staff.personal_contact_email} />
              <InfoRow label="Office Contact (Number)" value={staff.office_contact_number} />
              <InfoRow label="Office Contact (Email)" value={staff.office_contact_email} />
            </div>
          </div>

          {/* Emergency Contact */}
          <div className={sectionClass}>
            <h3 className={`text-xl font-bold mb-4 ${
              isDarkMode ? 'text-brand-pink' : 'text-brand-teal'
            }`}>
              Emergency Contact
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InfoRow label="Emergency Contact Number" value={staff.emergency_contact_number} />
              <InfoRow label="Emergency Contact Name" value={staff.emergency_contact_name} />
              <InfoRow label="Emergency Contact Relationship" value={staff.emergency_contact_relationship} />
            </div>
          </div>

          {/* Payment Information */}
          <div className={sectionClass}>
            <h3 className={`text-xl font-bold mb-4 ${
              isDarkMode ? 'text-brand-pink' : 'text-brand-teal'
            }`}>
              Payment Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoRow label="Payment Way" value={staff.payment_way} />
              <InfoRow label="Bank Name" value={staff.bank_name} />
              <InfoRow label="IBAN Number" value={staff.iban_number} />
              <InfoRow label="Benefit Number" value={staff.benefit_number} />
              <InfoRow label="Date of Joining" value={formatDate(staff.date_of_joining)} />
            </div>
          </div>

          {/* Submission Information */}
          <div className={sectionClass}>
            <h3 className={`text-xl font-bold mb-4 ${
              isDarkMode ? 'text-brand-pink' : 'text-brand-teal'
            }`}>
              Submission Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoRow label="Submitted On" value={formatDate(staff.created_at)} />
              <InfoRow label="Last Updated" value={formatDate(staff.updated_at)} />
            </div>
          </div>
        </div>

        <div className={`flex justify-end p-6 border-t ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <button
            onClick={onClose}
            className={`px-6 py-2 rounded-lg font-semibold transition-all hover:scale-105 ${
              isDarkMode ? 'bg-brand-pink text-white' : 'bg-brand-teal text-white'
            }`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewStaffModal;

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiEdit2 } from 'react-icons/fi';

const ViewStaffPage = ({ isDarkMode }) => {
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchStaff();
  }, [id]);

  const fetchStaff = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/staff/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setStaff(data);
      } else if (response.status === 401) {
        navigate('/admin/login');
      }
    } catch (error) {
      console.error('Error fetching staff:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  const sectionClass = `mb-6 p-6 rounded-lg ${
    isDarkMode ? 'bg-[#282E35]' : 'bg-white shadow-lg'
  }`;

  const labelClass = `text-sm font-semibold ${
    isDarkMode ? 'text-gray-400' : 'text-gray-600'
  }`;

  const valueClass = `text-base mt-1 ${
    isDarkMode ? 'text-white' : 'text-gray-900'
  }`;

  const InfoRow = ({ label, value }) => (
    <div className="mb-4">
      <div className={labelClass}>{label}</div>
      <div className={valueClass}>{value || 'N/A'}</div>
    </div>
  );

  if (loading) {
    return (
      <div className={`min-h-screen py-8 px-4 ${
        isDarkMode ? 'bg-gradient-to-b from-[#222831] to-[#2C3138]' : 'bg-[#F2EEE7]'
      }`}>
        <div className="max-w-6xl mx-auto text-center py-20">
          <div className={`text-xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Loading...
          </div>
        </div>
      </div>
    );
  }

  if (!staff) {
    return (
      <div className={`min-h-screen py-8 px-4 ${
        isDarkMode ? 'bg-gradient-to-b from-[#222831] to-[#2C3138]' : 'bg-[#F2EEE7]'
      }`}>
        <div className="max-w-6xl mx-auto text-center py-20">
          <div className={`text-xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Staff not found
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-8 px-4 ${
      isDarkMode ? 'bg-gradient-to-b from-[#222831] to-[#2C3138]' : 'bg-[#F2EEE7]'
    }`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`rounded-xl p-6 mb-6 ${
          isDarkMode ? 'bg-[#282E35]' : 'bg-white shadow-lg'
        }`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/admin/dashboard')}
                className={`p-2 rounded-lg transition-all hover:scale-110 ${
                  isDarkMode ? 'bg-[#2C3138] text-white' : 'bg-gray-200 text-gray-900'
                }`}
              >
                <FiArrowLeft size={20} />
              </button>
              <div>
                <h1 className={`text-3xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {staff.staff_name}
                </h1>
                <p className={`mt-1 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {staff.position} - {staff.company}
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate(`/admin/staff/edit/${id}`)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white transition-all hover:scale-105 ${
                isDarkMode ? 'bg-[#0270A8]' : 'bg-[#0270A8]'
              }`}
            >
              <FiEdit2 /> Edit
            </button>
          </div>
        </div>

        {/* Basic Information */}
        <div className={sectionClass}>
          <h3 className={`text-xl font-bold mb-4 ${
            isDarkMode ? 'text-brand-pink' : 'text-brand-teal'
          }`}>
            Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoRow label="Submitted On" value={formatDate(staff.created_at)} />
            <InfoRow label="Last Updated" value={formatDate(staff.updated_at)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewStaffPage;

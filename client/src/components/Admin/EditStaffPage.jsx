import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiSave } from 'react-icons/fi';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ConfirmationModal from './ConfirmationModal';

const EditStaffPage = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
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
        const staff = await response.json();
        setFormData({
          staffId: staff.staff_id || '',
          position: staff.position || '',
          company: staff.company || '',
          crNumber: staff.cr_number || '',
          staffName: staff.staff_name || '',
          staffCpr: staff.staff_cpr || '',
          cprIssuedDate: staff.cpr_issued_date ? new Date(staff.cpr_issued_date) : null,
          cprExpDate: staff.cpr_exp_date ? new Date(staff.cpr_exp_date) : null,
          passportNumber: staff.passport_number || '',
          passportIssuedDate: staff.passport_issued_date ? new Date(staff.passport_issued_date) : null,
          passportExpDate: staff.passport_exp_date ? new Date(staff.passport_exp_date) : null,
          visaState: staff.visa_state || '',
          visaType: staff.visa_type || '',
          transferVisaDate: staff.transfer_visa_date ? new Date(staff.transfer_visa_date) : null,
          lastJoiningDate: staff.last_joining_date ? new Date(staff.last_joining_date) : null,
          drivingLicense: staff.driving_license || '',
          drivingLicenseIssued: staff.driving_license_issued ? new Date(staff.driving_license_issued) : null,
          drivingLicenseExpiry: staff.driving_license_expiry ? new Date(staff.driving_license_expiry) : null,
          birthday: staff.birthday ? new Date(staff.birthday) : null,
          age: staff.age || '',
          nationality: staff.nationality || '',
          religion: staff.religion || '',
          personalContactWhatsapp: staff.personal_contact_whatsapp || '',
          personalContactEmail: staff.personal_contact_email || '',
          officeContactNumber: staff.office_contact_number || '',
          officeContactEmail: staff.office_contact_email || '',
          emergencyContactNumber: staff.emergency_contact_number || '',
          emergencyContactName: staff.emergency_contact_name || '',
          emergencyContactRelationship: staff.emergency_contact_relationship || '',
          paymentWay: staff.payment_way || '',
          bankName: staff.bank_name || '',
          ibanNumber: staff.iban_number || '',
          benefitNumber: staff.benefit_number || '',
          dateOfJoining: staff.date_of_joining ? new Date(staff.date_of_joining) : null
        });
      } else if (response.status === 401) {
        navigate('/admin/login');
      }
    } catch (error) {
      console.error('Error fetching staff:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = [
      { field: 'staffId', label: 'Staff ID' },
      { field: 'position', label: 'Position' },
      { field: 'company', label: 'Company' },
      { field: 'crNumber', label: 'CR Number' },
      { field: 'staffName', label: 'Staff Name' },
      { field: 'staffCpr', label: 'Staff CPR' }
    ];

    // Check for empty required fields
    const emptyFields = requiredFields.filter(({ field }) => !formData[field]);
    
    if (emptyFields.length > 0) {
      toast.error(`Please fill all required fields: ${emptyFields.map(f => f.label).join(', ')}`);
      return;
    }

    setShowConfirmation(true);
  };

  const handleConfirmSave = async () => {
    setSaving(true);

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/staff/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success('Staff updated successfully!');
        setTimeout(() => {
          navigate(`/admin/staff/view/${id}`);
        }, 1000);
      } else {
        const data = await response.json();
        toast.error(data.message || 'Failed to update staff');
      }
    } catch (error) {
      console.error('Error updating staff:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const inputClass = `w-full px-4 py-3 rounded-lg border-2 transition-all ${
    isDarkMode
      ? 'bg-[#2C3138] border-gray-700 text-white'
      : 'bg-white border-gray-300 text-gray-900'
  }`;

  const labelClass = `block text-sm font-semibold mb-2 ${
    isDarkMode ? 'text-gray-200' : 'text-gray-700'
  }`;

  const sectionClass = `mb-8 p-6 rounded-lg ${
    isDarkMode ? 'bg-[#282E35]' : 'bg-white shadow-lg'
  }`;

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
              <h1 className={`text-3xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Edit Staff Details
              </h1>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Basic Information */}
          <div className={sectionClass}>
            <h3 className={`text-xl font-bold mb-4 ${
              isDarkMode ? 'text-brand-pink' : 'text-brand-teal'
            }`}>
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Staff ID</label>
                <input
                  type="text"
                  value={formData.staffId}
                  onChange={(e) => setFormData({ ...formData, staffId: e.target.value })}
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Staff Name</label>
                <input
                  type="text"
                  value={formData.staffName}
                  onChange={(e) => setFormData({ ...formData, staffName: e.target.value })}
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Position</label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>CR Number</label>
                <input
                  type="text"
                  value={formData.crNumber}
                  onChange={(e) => setFormData({ ...formData, crNumber: e.target.value })}
                  className={inputClass}
                  required
                />
              </div>
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
              <div>
                <label className={labelClass}>CPR Number</label>
                <input
                  type="text"
                  value={formData.staffCpr}
                  onChange={(e) => setFormData({ ...formData, staffCpr: e.target.value })}
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>CPR Issued Date</label>
                <DatePicker
                  selected={formData.cprIssuedDate}
                  onChange={(date) => setFormData({ ...formData, cprIssuedDate: date })}
                  dateFormat="dd/MM/yyyy"
                  className={inputClass}
                  placeholderText="Select date"
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                />
              </div>

              <div>
                <label className={labelClass}>CPR Expiry Date</label>
                <DatePicker
                  selected={formData.cprExpDate}
                  onChange={(date) => setFormData({ ...formData, cprExpDate: date })}
                  dateFormat="dd/MM/yyyy"
                  className={inputClass}
                  placeholderText="Select date"
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                />
              </div>
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
              <div>
                <label className={labelClass}>Passport Number</label>
                <input
                  type="text"
                  value={formData.passportNumber}
                  onChange={(e) => setFormData({ ...formData, passportNumber: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Passport Issued Date</label>
                <DatePicker
                  selected={formData.passportIssuedDate}
                  onChange={(date) => setFormData({ ...formData, passportIssuedDate: date })}
                  dateFormat="dd/MM/yyyy"
                  className={inputClass}
                  placeholderText="Select date"
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                />
              </div>

              <div>
                <label className={labelClass}>Passport Expiry Date</label>
                <DatePicker
                  selected={formData.passportExpDate}
                  onChange={(date) => setFormData({ ...formData, passportExpDate: date })}
                  dateFormat="dd/MM/yyyy"
                  className={inputClass}
                  placeholderText="Select date"
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                />
              </div>
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
              <div>
                <label className={labelClass}>Visa State</label>
                <input
                  type="text"
                  value={formData.visaState}
                  onChange={(e) => setFormData({ ...formData, visaState: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Visa Type</label>
                <select
                  value={formData.visaType}
                  onChange={(e) => setFormData({ ...formData, visaType: e.target.value })}
                  className={inputClass}
                >
                  <option value="">Select visa type</option>
                  <option value="visit visa">Visit Visa</option>
                  <option value="employment visa">Employment Visa</option>
                  <option value="dependent visa">Dependent Visa</option>
                  <option value="investor visa">Investor Visa</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Transfer Visa Date</label>
                <DatePicker
                  selected={formData.transferVisaDate}
                  onChange={(date) => setFormData({ ...formData, transferVisaDate: date })}
                  dateFormat="dd/MM/yyyy"
                  className={inputClass}
                  placeholderText="Select date"
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                />
              </div>

              <div>
                <label className={labelClass}>Last Joining Date</label>
                <DatePicker
                  selected={formData.lastJoiningDate}
                  onChange={(date) => setFormData({ ...formData, lastJoiningDate: date })}
                  dateFormat="dd/MM/yyyy"
                  className={inputClass}
                  placeholderText="Select date"
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                />
              </div>
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
              <div>
                <label className={labelClass}>Has Driving License</label>
                <select
                  value={formData.drivingLicense}
                  onChange={(e) => setFormData({ ...formData, drivingLicense: e.target.value })}
                  className={inputClass}
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>License Issued Date</label>
                <DatePicker
                  selected={formData.drivingLicenseIssued}
                  onChange={(date) => setFormData({ ...formData, drivingLicenseIssued: date })}
                  dateFormat="dd/MM/yyyy"
                  className={inputClass}
                  placeholderText="Select date"
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                  disabled={formData.drivingLicense !== 'yes'}
                />
              </div>

              <div>
                <label className={labelClass}>License Expiry Date</label>
                <DatePicker
                  selected={formData.drivingLicenseExpiry}
                  onChange={(date) => setFormData({ ...formData, drivingLicenseExpiry: date })}
                  dateFormat="dd/MM/yyyy"
                  className={inputClass}
                  placeholderText="Select date"
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                  disabled={formData.drivingLicense !== 'yes'}
                />
              </div>
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
              <div>
                <label className={labelClass}>Birthday</label>
                <DatePicker
                  selected={formData.birthday}
                  onChange={(date) => setFormData({ ...formData, birthday: date })}
                  dateFormat="dd/MM/yyyy"
                  className={inputClass}
                  placeholderText="Select date"
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                  maxDate={new Date()}
                />
              </div>

              <div>
                <label className={labelClass}>Age</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Nationality</label>
                <input
                  type="text"
                  value={formData.nationality}
                  onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Religion</label>
                <input
                  type="text"
                  value={formData.religion}
                  onChange={(e) => setFormData({ ...formData, religion: e.target.value })}
                  className={inputClass}
                />
              </div>
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
              <div>
                <label className={labelClass}>Personal Contact (WhatsApp)</label>
                <input
                  type="tel"
                  value={formData.personalContactWhatsapp}
                  onChange={(e) => setFormData({ ...formData, personalContactWhatsapp: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Personal Contact (Email)</label>
                <input
                  type="email"
                  value={formData.personalContactEmail}
                  onChange={(e) => setFormData({ ...formData, personalContactEmail: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Office Contact (Number)</label>
                <input
                  type="tel"
                  value={formData.officeContactNumber}
                  onChange={(e) => setFormData({ ...formData, officeContactNumber: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Office Contact (Email)</label>
                <input
                  type="email"
                  value={formData.officeContactEmail}
                  onChange={(e) => setFormData({ ...formData, officeContactEmail: e.target.value })}
                  className={inputClass}
                />
              </div>
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
              <div>
                <label className={labelClass}>Emergency Contact Number</label>
                <input
                  type="tel"
                  value={formData.emergencyContactNumber}
                  onChange={(e) => setFormData({ ...formData, emergencyContactNumber: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Emergency Contact Name</label>
                <input
                  type="text"
                  value={formData.emergencyContactName}
                  onChange={(e) => setFormData({ ...formData, emergencyContactName: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Emergency Contact Relationship</label>
                <input
                  type="text"
                  value={formData.emergencyContactRelationship}
                  onChange={(e) => setFormData({ ...formData, emergencyContactRelationship: e.target.value })}
                  className={inputClass}
                />
              </div>
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
              <div>
                <label className={labelClass}>Payment Way</label>
                <select
                  value={formData.paymentWay}
                  onChange={(e) => setFormData({ ...formData, paymentWay: e.target.value })}
                  className={inputClass}
                >
                  <option value="">Select payment method</option>
                  <option value="Benefit">Benefit</option>
                  <option value="Bank Account">Bank Account</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Bank Name</label>
                <input
                  type="text"
                  value={formData.bankName}
                  onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>IBAN Number</label>
                <input
                  type="text"
                  value={formData.ibanNumber}
                  onChange={(e) => setFormData({ ...formData, ibanNumber: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Benefit Number</label>
                <input
                  type="text"
                  value={formData.benefitNumber}
                  onChange={(e) => setFormData({ ...formData, benefitNumber: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Date of Joining</label>
                <DatePicker
                  selected={formData.dateOfJoining}
                  onChange={(date) => setFormData({ ...formData, dateOfJoining: date })}
                  dateFormat="dd/MM/yyyy"
                  className={inputClass}
                  placeholderText="Select date"
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={`rounded-xl p-6 flex justify-end gap-4 ${
            isDarkMode ? 'bg-[#282E35]' : 'bg-white shadow-lg'
          }`}>
            <button
              type="button"
              onClick={() => navigate('/admin/dashboard')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                isDarkMode
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all ${
                saving ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
              }`}
              style={{ backgroundColor: '#0270A8' }}
            >
              <FiSave /> {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>

        {/* Confirmation Modal */}
        <ConfirmationModal
          isOpen={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          onConfirm={handleConfirmSave}
          title="Confirm Changes"
          message="Are you sure you want to save these changes to the staff record?"
          confirmText="Save Changes"
          cancelText="Cancel"
          isDarkMode={isDarkMode}
          type="warning"
        />
      </div>
    </div>
  );
};

export default EditStaffPage;

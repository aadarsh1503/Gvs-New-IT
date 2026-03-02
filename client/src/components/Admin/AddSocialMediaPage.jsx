import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FiArrowLeft, FiSave, FiEye, FiEyeOff } from 'react-icons/fi';
import { toast } from 'react-toastify';
import AdminSidebar from './AdminSidebar';

const AddSocialMediaPage = ({ isDarkMode }) => {
  const [searchParams] = useSearchParams();
  const companyFromUrl = searchParams.get('company');
  
  const [formData, setFormData] = useState({
    platform: '',
    account_name: companyFromUrl || '',
    username: '',
    password: '',
    email: '',
    phone: '',
    recovery_email: '',
    profile_url: '',
    status: 'active'
  });
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.platform || !formData.account_name || !formData.username || !formData.password) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSaving(true);

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/social-media', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success('Social media account added successfully!');
        navigate('/admin/social-media');
      } else {
        toast.error('Failed to add account');
      }
    } catch (error) {
      console.error('Error adding account:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    navigate('/admin/login');
  };

  const inputClass = `w-full px-4 py-3 rounded-lg border-2 transition-all ${
    isDarkMode
      ? 'bg-[#2C3138] border-gray-700 text-white'
      : 'bg-white border-gray-300 text-gray-900'
  }`;

  const labelClass = `block text-sm font-semibold mb-2 ${
    isDarkMode ? 'text-gray-200' : 'text-gray-700'
  }`;

  return (
    <div className="flex">
      <AdminSidebar isDarkMode={isDarkMode} onLogout={handleLogout} />
      
      <div className={`flex-1 ml-64 min-h-screen ${
        isDarkMode ? 'bg-gradient-to-b from-[#222831] to-[#2C3138]' : 'bg-[#F2EEE7]'
      }`}>
        <div className="p-8">
          <div className={`rounded-xl p-6 mb-6 ${
            isDarkMode ? 'bg-[#282E35]' : 'bg-white shadow-lg'
          }`}>
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => navigate('/admin/social-media')}
                className={`p-2 rounded-lg transition-all hover:scale-110 ${
                  isDarkMode ? 'bg-[#2C3138] text-white' : 'bg-gray-200 text-gray-900'
                }`}
              >
                <FiArrowLeft size={20} />
              </button>
              <h1 className={`text-3xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Add Social Media Account
                {companyFromUrl && (
                  <span className={`block text-lg font-normal mt-2 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    for {companyFromUrl}
                  </span>
                )}
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Platform *</label>
                  <select
                    required
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                    className={inputClass}
                  >
                    <option value="">Select Platform</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Instagram">Instagram</option>
                    <option value="X">X (Twitter)</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="YouTube">YouTube</option>
                    <option value="TikTok">TikTok</option>
                    <option value="Google">Google</option>
                    <option value="Pinterest">Pinterest</option>
                    <option value="Snapchat">Snapchat</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Account Name (Company) *</label>
                  <input
                    type="text"
                    required
                    value={formData.account_name}
                    onChange={(e) => setFormData({ ...formData, account_name: e.target.value })}
                    className={inputClass}
                    placeholder="e.g., GVS IT"
                    readOnly={!!companyFromUrl}
                  />
                  {companyFromUrl && (
                    <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Adding to existing company
                    </p>
                  )}
                </div>

                <div>
                  <label className={labelClass}>Username *</label>
                  <input
                    type="text"
                    required
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className={inputClass}
                    placeholder="@username"
                  />
                </div>

                <div>
                  <label className={labelClass}>Password *</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className={inputClass}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={inputClass}
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label className={labelClass}>Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={inputClass}
                    placeholder="+1234567890"
                  />
                </div>

                <div>
                  <label className={labelClass}>Recovery Email</label>
                  <input
                    type="email"
                    value={formData.recovery_email}
                    onChange={(e) => setFormData({ ...formData, recovery_email: e.target.value })}
                    className={inputClass}
                    placeholder="recovery@example.com"
                  />
                </div>

                <div>
                  <label className={labelClass}>Profile URL</label>
                  <input
                    type="url"
                    value={formData.profile_url}
                    onChange={(e) => setFormData({ ...formData, profile_url: e.target.value })}
                    className={inputClass}
                    placeholder="https://instagram.com/username"
                  />
                </div>

                <div>
                  <label className={labelClass}>Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className={inputClass}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => navigate('/admin/social-media')}
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
                  <FiSave /> {saving ? 'Saving...' : 'Save Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSocialMediaPage;

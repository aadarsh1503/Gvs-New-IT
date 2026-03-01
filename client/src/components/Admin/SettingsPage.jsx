import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiSave, FiEye, FiEyeOff } from 'react-icons/fi';
import { toast } from 'react-toastify';

const SettingsPage = ({ isDarkMode }) => {
  const [settings, setSettings] = useState({
    AWS_ACCESS_KEY_ID: '',
    AWS_SECRET_ACCESS_KEY: '',
    AWS_REGION: '',
    AWS_SES_FROM_EMAIL: '',
    AWS_SES_FROM_NAME: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSecrets, setShowSecrets] = useState({
    AWS_ACCESS_KEY_ID: false,
    AWS_SECRET_ACCESS_KEY: false
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/settings', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setSettings({
          AWS_ACCESS_KEY_ID: data.AWS_ACCESS_KEY_ID?.value || '',
          AWS_SECRET_ACCESS_KEY: data.AWS_SECRET_ACCESS_KEY?.value || '',
          AWS_REGION: data.AWS_REGION?.value || '',
          AWS_SES_FROM_EMAIL: data.AWS_SES_FROM_EMAIL?.value || '',
          AWS_SES_FROM_NAME: data.AWS_SES_FROM_NAME?.value || ''
        });
      } else if (response.status === 401) {
        navigate('/admin/login');
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email
    if (settings.AWS_SES_FROM_EMAIL && !settings.AWS_SES_FROM_EMAIL.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setSaving(true);

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(settings)
      });

      if (response.ok) {
        toast.success('✅ Settings updated successfully!');
      } else {
        const data = await response.json();
        toast.error(data.message || 'Failed to update settings');
      }
    } catch (error) {
      console.error('Error updating settings:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const toggleShowSecret = (key) => {
    setShowSecrets(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
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
        <div className="max-w-4xl mx-auto text-center py-20">
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
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className={`rounded-xl p-6 mb-6 ${
          isDarkMode ? 'bg-[#282E35]' : 'bg-white shadow-lg'
        }`}>
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
                Settings
              </h1>
              <p className={`mt-1 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Manage AWS SES Email Configuration
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* AWS SES Configuration */}
          <div className={sectionClass}>
            <h3 className={`text-xl font-bold mb-4 ${
              isDarkMode ? 'text-brand-pink' : 'text-brand-teal'
            }`}>
              AWS SES Configuration
            </h3>
            
            <div className="space-y-4">
              {/* AWS Access Key ID */}
              <div>
                <label className={labelClass}>AWS Access Key ID</label>
                <div className="relative">
                  <input
                    type={showSecrets.AWS_ACCESS_KEY_ID ? 'text' : 'password'}
                    value={settings.AWS_ACCESS_KEY_ID}
                    onChange={(e) => setSettings({ ...settings, AWS_ACCESS_KEY_ID: e.target.value })}
                    className={inputClass}
                    placeholder="Enter AWS Access Key ID"
                  />
                  <button
                    type="button"
                    onClick={() => toggleShowSecret('AWS_ACCESS_KEY_ID')}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    {showSecrets.AWS_ACCESS_KEY_ID ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </button>
                </div>
              </div>

              {/* AWS Secret Access Key */}
              <div>
                <label className={labelClass}>AWS Secret Access Key</label>
                <div className="relative">
                  <input
                    type={showSecrets.AWS_SECRET_ACCESS_KEY ? 'text' : 'password'}
                    value={settings.AWS_SECRET_ACCESS_KEY}
                    onChange={(e) => setSettings({ ...settings, AWS_SECRET_ACCESS_KEY: e.target.value })}
                    className={inputClass}
                    placeholder="Enter AWS Secret Access Key"
                  />
                  <button
                    type="button"
                    onClick={() => toggleShowSecret('AWS_SECRET_ACCESS_KEY')}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    {showSecrets.AWS_SECRET_ACCESS_KEY ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </button>
                </div>
              </div>

              {/* AWS Region */}
              <div>
                <label className={labelClass}>AWS Region</label>
                <input
                  type="text"
                  value={settings.AWS_REGION}
                  onChange={(e) => setSettings({ ...settings, AWS_REGION: e.target.value })}
                  className={inputClass}
                  placeholder="e.g., eu-north-1"
                />
              </div>

              {/* From Email */}
              <div>
                <label className={labelClass}>From Email Address</label>
                <input
                  type="email"
                  value={settings.AWS_SES_FROM_EMAIL}
                  onChange={(e) => setSettings({ ...settings, AWS_SES_FROM_EMAIL: e.target.value })}
                  className={inputClass}
                  placeholder="e.g., info@gvs-bh.com"
                />
              </div>

              {/* From Name */}
              <div>
                <label className={labelClass}>From Name</label>
                <input
                  type="text"
                  value={settings.AWS_SES_FROM_NAME}
                  onChange={(e) => setSettings({ ...settings, AWS_SES_FROM_NAME: e.target.value })}
                  className={inputClass}
                  placeholder="e.g., GVS IT"
                />
              </div>
            </div>

            {/* Info Box */}
            <div className={`mt-6 p-4 rounded-lg ${
              isDarkMode ? 'bg-[#2C3138]' : 'bg-blue-50'
            }`}>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <strong>Note:</strong> These settings are used for sending password reset emails. Make sure your AWS SES email is verified and out of sandbox mode for production use.
              </p>
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
              <FiSave /> {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;

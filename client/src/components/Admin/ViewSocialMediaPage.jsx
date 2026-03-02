import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiEdit2, FiEye, FiEyeOff, FiExternalLink } from 'react-icons/fi';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaTiktok, FaPinterest, FaSnapchat } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import AdminSidebar from './AdminSidebar';

const ViewSocialMediaPage = ({ isDarkMode }) => {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAccount();
  }, [id]);

  const fetchAccount = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/social-media/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setAccount(data);
      } else if (response.status === 401) {
        navigate('/admin/login');
      }
    } catch (error) {
      console.error('Error fetching account:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    navigate('/admin/login');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  const getPlatformIcon = (platform) => {
    const icons = {
      'Facebook': <FaFacebook size={32} className="text-blue-500" />,
      'Instagram': <FaInstagram size={32} className="text-pink-500" />,
      'X': <FaXTwitter size={32} className="text-black dark:text-white" />,
      'LinkedIn': <FaLinkedin size={32} className="text-blue-700" />,
      'YouTube': <FaYoutube size={32} className="text-red-600" />,
      'TikTok': <FaTiktok size={32} className="text-black dark:text-white" />,
      'Pinterest': <FaPinterest size={32} className="text-red-500" />,
      'Snapchat': <FaSnapchat size={32} className="text-yellow-400" />
    };
    return icons[platform] || null;
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

  if (loading) {
    return (
      <div className="flex">
        <AdminSidebar isDarkMode={isDarkMode} onLogout={handleLogout} />
        <div className={`flex-1 ml-64 min-h-screen flex items-center justify-center ${
          isDarkMode ? 'bg-gradient-to-b from-[#222831] to-[#2C3138]' : 'bg-[#F2EEE7]'
        }`}>
          <div className={`text-xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Loading...
          </div>
        </div>
      </div>
    );
  }

  if (!account) {
    return (
      <div className="flex">
        <AdminSidebar isDarkMode={isDarkMode} onLogout={handleLogout} />
        <div className={`flex-1 ml-64 min-h-screen flex items-center justify-center ${
          isDarkMode ? 'bg-gradient-to-b from-[#222831] to-[#2C3138]' : 'bg-[#F2EEE7]'
        }`}>
          <div className={`text-xl ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
            Account not found
          </div>
        </div>
      </div>
    );
  }

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
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
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
                  {account.account_name}
                </h1>
              </div>
              <button
                onClick={() => navigate(`/admin/social-media/edit/${id}`)}
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all hover:scale-105"
                style={{ backgroundColor: '#0270A8' }}
              >
                <FiEdit2 /> Edit
              </button>
            </div>
          </div>

          <div className={sectionClass}>
            <h2 className={`text-xl font-bold mb-4 ${
              isDarkMode ? 'text-brand-pink' : 'text-brand-teal'
            }`}>
              Account Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className={labelClass}>Platform</p>
                <div className="flex items-center gap-3 mt-1">
                  {getPlatformIcon(account.platform)}
                  <p className={valueClass}>{account.platform}</p>
                </div>
              </div>
              <div>
                <p className={labelClass}>Account Name</p>
                <p className={valueClass}>{account.account_name}</p>
              </div>
              <div>
                <p className={labelClass}>Username</p>
                <p className={valueClass}>{account.username}</p>
              </div>
              <div>
                <p className={labelClass}>Password</p>
                <div className="flex items-center gap-2">
                  <p className={valueClass}>
                    {showPassword ? account.password : '••••••••'}
                  </p>
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </button>
                </div>
              </div>
              <div>
                <p className={labelClass}>Status</p>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                  account.status === 'active' ? 'bg-green-100 text-green-800' :
                  account.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {account.status}
                </span>
              </div>
            </div>
          </div>

          <div className={sectionClass}>
            <h2 className={`text-xl font-bold mb-4 ${
              isDarkMode ? 'text-brand-pink' : 'text-brand-teal'
            }`}>
              Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className={labelClass}>Email</p>
                <p className={valueClass}>{account.email || 'N/A'}</p>
              </div>
              <div>
                <p className={labelClass}>Phone</p>
                <p className={valueClass}>{account.phone || 'N/A'}</p>
              </div>
              <div>
                <p className={labelClass}>Recovery Email</p>
                <p className={valueClass}>{account.recovery_email || 'N/A'}</p>
              </div>
              <div>
                <p className={labelClass}>Profile URL</p>
                {account.profile_url ? (
                  <a
                    href={account.profile_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors"
                  >
                    {account.profile_url} <FiExternalLink size={16} />
                  </a>
                ) : (
                  <p className={valueClass}>N/A</p>
                )}
              </div>
            </div>
          </div>

          <div className={sectionClass}>
            <h2 className={`text-xl font-bold mb-4 ${
              isDarkMode ? 'text-brand-pink' : 'text-brand-teal'
            }`}>
              System Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className={labelClass}>Created At</p>
                <p className={valueClass}>{formatDate(account.created_at)}</p>
              </div>
              <div>
                <p className={labelClass}>Last Updated</p>
                <p className={valueClass}>{formatDate(account.updated_at)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSocialMediaPage;

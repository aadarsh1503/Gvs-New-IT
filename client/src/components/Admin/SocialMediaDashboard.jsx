import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiEyeOff, FiSearch, FiSun, FiMoon } from 'react-icons/fi';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaTiktok, FaPinterest, FaSnapchat } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import AdminSidebar from './AdminSidebar';
import ConfirmationModal from './ConfirmationModal';

const SocialMediaDashboard = ({ isDarkMode, toggleTheme }) => {
  const [accounts, setAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showPasswords, setShowPasswords] = useState({});
  const [deleteConfirmation, setDeleteConfirmation] = useState({ show: false, id: null, name: '' });
  const [logoutConfirmation, setLogoutConfirmation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAccounts();
  }, []);

  useEffect(() => {
    const filtered = accounts.filter(acc =>
      acc.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acc.account_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acc.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAccounts(filtered);
  }, [searchTerm, accounts]);

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/social-media', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setAccounts(data);
        setFilteredAccounts(data);
      } else if (response.status === 401) {
        navigate('/admin/login');
      }
    } catch (error) {
      console.error('Error fetching accounts:', error);
      toast.error('Failed to load social media accounts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id, name) => {
    setDeleteConfirmation({ show: true, id, name });
  };

  const handleConfirmDelete = async () => {
    const { id } = deleteConfirmation;
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/social-media/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        setAccounts(accounts.filter(acc => acc.id !== id));
        toast.success('Account deleted successfully');
      } else {
        toast.error('Failed to delete account');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      toast.error('Network error. Please try again.');
    }
    setDeleteConfirmation({ show: false, id: null, name: '' });
  };

  const handleLogout = () => {
    setLogoutConfirmation(true);
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    navigate('/admin/login');
  };

  const togglePasswordVisibility = (id) => {
    setShowPasswords(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getPlatformColor = (platform) => {
    const colors = {
      'Facebook': 'bg-blue-500',
      'Instagram': 'bg-pink-500',
      'X': 'bg-black',
      'LinkedIn': 'bg-blue-700',
      'YouTube': 'bg-red-600',
      'TikTok': 'bg-black',
      'Pinterest': 'bg-red-500',
      'Snapchat': 'bg-yellow-400'
    };
    return colors[platform] || 'bg-gray-500';
  };

  const getPlatformIcon = (platform) => {
    const icons = {
      'Facebook': <FaFacebook size={24} />,
      'Instagram': <FaInstagram size={24} />,
      'X': <FaXTwitter size={24} />,
      'LinkedIn': <FaLinkedin size={24} />,
      'YouTube': <FaYoutube size={24} />,
      'TikTok': <FaTiktok size={24} />,
      'Pinterest': <FaPinterest size={24} />,
      'Snapchat': <FaSnapchat size={24} />
    };
    return icons[platform] || <FiSearch size={24} />;
  };

  const getStatusColor = (status) => {
    const colors = {
      'active': 'bg-green-100 text-green-800',
      'inactive': 'bg-gray-100 text-gray-800',
      'suspended': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="flex">
      <AdminSidebar isDarkMode={isDarkMode} onLogout={handleLogout} />
      
      <div className={`flex-1 ml-64 min-h-screen ${
        isDarkMode ? 'bg-gradient-to-b from-[#222831] to-[#2C3138]' : 'bg-[#F2EEE7]'
      }`}>
        <div className="p-8">
          {/* Header */}
          <div className={`rounded-xl p-6 mb-6 ${
            isDarkMode ? 'bg-[#282E35]' : 'bg-white shadow-lg'
          }`}>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className={`text-3xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Social Media Accounts
                </h1>
                <p className={`mt-1 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Total Accounts: {accounts.length}
                </p>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={toggleTheme}
                  className={`p-3 rounded-lg transition-all ${
                    isDarkMode
                      ? 'bg-[#2C3138] text-white hover:bg-[#363D45]'
                      : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                  }`}
                >
                  {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
                </button>
                
                <button
                  onClick={() => navigate('/admin/social-media/add')}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all hover:scale-105"
                  style={{ backgroundColor: '#0270A8' }}
                >
                  <FiPlus /> Add Account
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <FiSearch className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="text"
                placeholder="Search by platform, account name, or username..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 transition-all ${
                  isDarkMode
                    ? 'bg-[#2C3138] border-gray-700 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>
          </div>

          {/* Accounts Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className={`text-xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Loading...
              </div>
            </div>
          ) : filteredAccounts.length === 0 ? (
            <div className={`rounded-xl p-12 text-center ${
              isDarkMode ? 'bg-[#282E35]' : 'bg-white shadow-lg'
            }`}>
              <p className={`text-xl ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                No social media accounts found
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAccounts.map((account) => (
                <div
                  key={account.id}
                  className={`rounded-xl p-6 transition-all hover:scale-105 ${
                    isDarkMode ? 'bg-[#282E35]' : 'bg-white shadow-lg'
                  }`}
                >
                  {/* Platform Badge */}
                  <div className="flex justify-between items-start mb-4">
                    <div className={`${getPlatformColor(account.platform)} text-white px-4 py-2 rounded-lg flex items-center gap-2 font-semibold`}>
                      {getPlatformIcon(account.platform)}
                      <span>{account.platform}</span>
                    </div>
                    <span className={`${getStatusColor(account.status)} px-3 py-1 rounded-full text-xs font-semibold`}>
                      {account.status}
                    </span>
                  </div>

                  {/* Account Info */}
                  <h3 className={`text-xl font-bold mb-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {account.account_name}
                  </h3>
                  
                  <div className={`space-y-2 mb-4 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <p className="text-sm">
                      <span className="font-semibold">Username:</span> {account.username}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">Password:</span>
                      <span className="text-sm">
                        {showPasswords[account.id] ? account.password : '••••••••'}
                      </span>
                      <button
                        onClick={() => togglePasswordVisibility(account.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        {showPasswords[account.id] ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                      </button>
                    </div>
                    {account.email && (
                      <p className="text-sm">
                        <span className="font-semibold">Email:</span> {account.email}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/admin/social-media/view/${account.id}`)}
                      className="flex-1 p-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-all"
                    >
                      <FiEye className="mx-auto" />
                    </button>
                    <button
                      onClick={() => navigate(`/admin/social-media/edit/${account.id}`)}
                      className="flex-1 p-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-all"
                    >
                      <FiEdit2 className="mx-auto" />
                    </button>
                    <button
                      onClick={() => handleDelete(account.id, account.account_name)}
                      className="flex-1 p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-all"
                    >
                      <FiTrash2 className="mx-auto" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteConfirmation.show}
        onClose={() => setDeleteConfirmation({ show: false, id: null, name: '' })}
        onConfirm={handleConfirmDelete}
        title="Delete Account"
        message={`Are you sure you want to delete ${deleteConfirmation.name}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        isDarkMode={isDarkMode}
        type="danger"
      />

      {/* Logout Confirmation Modal */}
      <ConfirmationModal
        isOpen={logoutConfirmation}
        onClose={() => setLogoutConfirmation(false)}
        onConfirm={handleConfirmLogout}
        title="Logout"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        cancelText="Cancel"
        isDarkMode={isDarkMode}
        type="warning"
      />
    </div>
  );
};

export default SocialMediaDashboard;

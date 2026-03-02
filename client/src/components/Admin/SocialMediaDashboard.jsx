import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiEyeOff, FiSearch, FiSun, FiMoon } from 'react-icons/fi';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaTiktok, FaPinterest, FaSnapchat, FaGoogle } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import AdminSidebar from './AdminSidebar';
import ConfirmationModal from './ConfirmationModal';

const SocialMediaDashboard = ({ isDarkMode, toggleTheme }) => {
  const [accounts, setAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showPasswords, setShowPasswords] = useState({});
  const [deleteConfirmation, setDeleteConfirmation] = useState({ show: false, id: null, name: '', accounts: null });
  const [logoutConfirmation, setLogoutConfirmation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAccounts();
  }, []);

  useEffect(() => {
    let filtered = accounts.filter(acc =>
      acc.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acc.account_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acc.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Apply company filter
    if (selectedCompany !== 'all') {
      filtered = filtered.filter(acc => acc.account_name === selectedCompany);
    }

    setFilteredAccounts(filtered);
  }, [searchTerm, selectedCompany, accounts]);

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
    const { id, accounts: accountsToDelete } = deleteConfirmation;

    // If deleting entire company
    if (id === 'company' && accountsToDelete) {
      try {
        const token = localStorage.getItem('adminToken');
        
        // Delete all accounts for this company
        for (const account of accountsToDelete) {
          await fetch(`/api/social-media/${account.id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
          });
        }

        // Remove all accounts from state
        setAccounts(prevAccounts => 
          prevAccounts.filter(acc => !accountsToDelete.find(a => a.id === acc.id))
        );
        toast.success(`All accounts for ${deleteConfirmation.name} deleted successfully`);
      } catch (error) {
        console.error('Error deleting company accounts:', error);
        toast.error('Failed to delete some accounts. Please try again.');
      }
    } else {
      // Delete single account
      try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`/api/social-media/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          setAccounts(prevAccounts => prevAccounts.filter(acc => acc.id !== id));
          toast.success('Account deleted successfully');
        } else {
          toast.error('Failed to delete account');
        }
      } catch (error) {
        console.error('Error deleting account:', error);
        toast.error('Network error. Please try again.');
      }
    }
    
    setDeleteConfirmation({ show: false, id: null, name: '', accounts: null });
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
      'Snapchat': 'bg-yellow-400',
      'Google': 'bg-blue-600'
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
      'Snapchat': <FaSnapchat size={24} />,
      'Google': <FaGoogle size={24} />
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

            {/* Search and Filter */}
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <FiSearch className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  type="text"
                  placeholder="Search by platform, company, or username..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 transition-all ${
                    isDarkMode
                      ? 'bg-[#2C3138] border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
              
              <select
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className={`px-6 py-3 rounded-lg border-2 transition-all font-semibold ${
                  isDarkMode
                    ? 'bg-[#2C3138] border-gray-700 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="all">All Companies</option>
                {Array.from(new Set(accounts.map(acc => acc.account_name))).sort().map((company) => (
                  <option key={company} value={company}>{company}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Accounts Table */}
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
              <button
                onClick={() => navigate('/admin/social-media/add')}
                className="mt-6 flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-white transition-all hover:scale-105 mx-auto"
                style={{ backgroundColor: '#0270A8' }}
              >
                <FiPlus size={24} /> ADD MORE
              </button>
            </div>
          ) : (
            <>
              <div className={`rounded-xl overflow-hidden mb-6 ${
                isDarkMode ? 'bg-[#282E35]' : 'bg-white shadow-lg'
              }`}>
                {/* Group accounts by company/account name */}
                {Array.from(new Set(filteredAccounts.map(acc => acc.account_name))).map((companyName) => {
                  const companyAccounts = filteredAccounts.filter(acc => acc.account_name === companyName);
                  
                  return (
                    <div
                      key={companyName}
                      className={`p-4 border-b ${
                        isDarkMode ? 'border-gray-700' : 'border-gray-200'
                      } last:border-b-0`}
                    >
                      <div className="flex items-center justify-between">
                        {/* Company Name */}
                        <h3 className={`text-xl font-bold ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {companyName}
                        </h3>

                        {/* Social Media Icons Row */}
                        <div className="flex items-center gap-3">
                          {companyAccounts.map((account) => (
                            <div key={account.id} className="relative group">
                              <button
                                onClick={() => navigate(`/admin/social-media/view/${account.id}`)}
                                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 ${
                                  getPlatformColor(account.platform)
                                } text-white shadow-lg`}
                              >
                                <div className="scale-75">
                                  {getPlatformIcon(account.platform)}
                                </div>
                              </button>
                              
                              {/* Delete button on hover */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelete(account.id, `${account.platform} - ${account.account_name}`);
                                }}
                                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                              >
                                <FiTrash2 size={10} />
                              </button>
                              
                              {/* Tooltip on hover */}
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                                {account.platform}
                              </div>
                            </div>
                          ))}
                          
                          {/* Add More Icon for this company */}
                          <button
                            onClick={() => navigate(`/admin/social-media/add?company=${encodeURIComponent(companyName)}`)}
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 ${
                              isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                            } shadow-lg`}
                          >
                            <FiPlus size={20} className={isDarkMode ? 'text-white' : 'text-gray-700'} />
                          </button>

                          {/* Delete entire company row */}
                          <button
                            onClick={() => {
                              setDeleteConfirmation({ 
                                show: true, 
                                id: 'company', 
                                name: companyName,
                                accounts: companyAccounts 
                              });
                            }}
                            className="ml-2 p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-all hover:scale-105 shadow-lg"
                            title="Delete entire company"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Add More Button */}
              <div className="flex justify-center">
                <button
                  onClick={() => navigate('/admin/social-media/add')}
                  className="flex items-center gap-3 px-12 py-4 rounded-lg font-bold text-white text-xl transition-all hover:scale-105 shadow-lg"
                  style={{ backgroundColor: '#0270A8' }}
                >
                  <FiPlus size={28} /> ADD MORE
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteConfirmation.show}
        onClose={() => setDeleteConfirmation({ show: false, id: null, name: '', accounts: null })}
        onConfirm={handleConfirmDelete}
        title={deleteConfirmation.id === 'company' ? 'Delete Entire Company' : 'Delete Account'}
        message={
          deleteConfirmation.id === 'company' 
            ? `Are you sure you want to delete all social media accounts for ${deleteConfirmation.name}? This will delete ${deleteConfirmation.accounts?.length || 0} account(s). This action cannot be undone.`
            : `Are you sure you want to delete ${deleteConfirmation.name}? This action cannot be undone.`
        }
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

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEdit2, FiTrash2, FiSearch, FiEye, FiSun, FiMoon } from 'react-icons/fi';
import { toast } from 'react-toastify';
import AdminSidebar from './AdminSidebar';
import ConfirmationModal from './ConfirmationModal';

const AdminDashboard = ({ isDarkMode, toggleTheme }) => {
  const [staff, setStaff] = useState([]);
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState({ show: false, id: null, name: '' });
  const [logoutConfirmation, setLogoutConfirmation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStaff();
  }, []);

  useEffect(() => {
    const filtered = staff.filter(s =>
      s.staff_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.staff_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.company.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStaff(filtered);
  }, [searchTerm, staff]);

  const fetchStaff = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/staff', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setStaff(data);
        setFilteredStaff(data);
      } else if (response.status === 401) {
        navigate('/admin/login');
      } else if (response.status === 503) {
        setError('Database connection lost. Please try again.');
      } else {
        setError('Failed to load staff data.');
      }
    } catch (error) {
      console.error('Error fetching staff:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    setDeleteConfirmation({ show: true, id, name });
  };

  const handleConfirmDelete = async () => {
    const { id } = deleteConfirmation;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/staff/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        setStaff(staff.filter(s => s.id !== id));
        toast.success('Staff deleted successfully');
      } else {
        toast.error('Failed to delete staff');
      }
    } catch (error) {
      console.error('Error deleting staff:', error);
      toast.error('Network error. Please try again.');
    }
  };

  const handleLogout = () => {
    setLogoutConfirmation(true);
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    navigate('/admin/login');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-GB');
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
                  Staff Management Dashboard
                </h1>
                <p className={`mt-1 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Total Staff: {staff.length}
                </p>
              </div>
              
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
            </div>
            <div className="relative">
              <FiSearch className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="text"
                placeholder="Search by name, ID, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 transition-all ${
                  isDarkMode
                    ? 'bg-[#2C3138] border-gray-700 text-white focus:border-brand-pink'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-brand-teal'
                }`}
              />
            </div>
          </div>

          {/* Staff Table */}
          {loading ? (
            <div className="text-center py-12">
              <div className={`text-xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Loading...
              </div>
            </div>
          ) : error ? (
          <div className={`rounded-xl p-12 text-center ${
            isDarkMode ? 'bg-[#282E35]' : 'bg-white shadow-lg'
          }`}>
            <p className={`text-xl mb-4 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
              {error}
            </p>
            <button
              onClick={fetchStaff}
              className={`px-6 py-3 rounded-lg font-semibold text-white transition-all hover:scale-105 ${
                isDarkMode ? 'bg-brand-pink' : 'bg-brand-teal'
              }`}
            >
              Retry
            </button>
          </div>
        ) : filteredStaff.length === 0 ? (
          <div className={`rounded-xl p-12 text-center ${
            isDarkMode ? 'bg-[#282E35]' : 'bg-white shadow-lg'
          }`}>
            <p className={`text-xl ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              No staff members found
            </p>
          </div>
        ) : (
          <div className={`rounded-xl overflow-hidden ${
            isDarkMode ? 'bg-[#282E35]' : 'bg-white shadow-lg'
          }`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={isDarkMode ? 'bg-[#2C3138]' : 'bg-gray-50'}>
                  <tr>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>Staff ID</th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>Name</th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>Position</th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>Company</th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>Nationality</th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>Contact</th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>Email</th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>Joined</th>
                    <th className={`px-6 py-4 text-center text-sm font-semibold ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredStaff.map((member) => (
                    <tr key={member.id} className={`transition-colors ${
                      isDarkMode ? 'hover:bg-[#2C3138]' : 'hover:bg-gray-50'
                    }`}>
                      <td className={`px-6 py-4 text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-900'
                      }`}>{member.staff_id}</td>
                      <td className={`px-6 py-4 text-sm font-medium ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>{member.staff_name}</td>
                      <td className={`px-6 py-4 text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>{member.position}</td>
                      <td className={`px-6 py-4 text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>{member.company}</td>
                      <td className={`px-6 py-4 text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>{member.nationality}</td>
                      <td className={`px-6 py-4 text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>{member.personal_contact_whatsapp}</td>
                      <td className={`px-6 py-4 text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>{member.personal_contact_email}</td>
                      <td className={`px-6 py-4 text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>{formatDate(member.date_of_joining)}</td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => navigate(`/admin/staff/view/${member.id}`)}
                            className={`p-2 rounded-lg transition-all hover:scale-110 ${
                              isDarkMode
                                ? 'bg-green-600 hover:bg-green-700 text-white'
                                : 'bg-green-500 hover:bg-green-600 text-white'
                            }`}
                            title="View Details"
                          >
                            <FiEye />
                          </button>
                          <button
                            onClick={() => navigate(`/admin/staff/edit/${member.id}`)}
                            className={`p-2 rounded-lg transition-all hover:scale-110 ${
                              isDarkMode
                                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                : 'bg-blue-500 hover:bg-blue-600 text-white'
                            }`}
                            title="Edit"
                          >
                            <FiEdit2 />
                          </button>
                          <button
                            onClick={() => handleDelete(member.id, member.staff_name)}
                            className={`p-2 rounded-lg transition-all hover:scale-110 ${
                              isDarkMode
                                ? 'bg-red-600 hover:bg-red-700 text-white'
                                : 'bg-red-500 hover:bg-red-600 text-white'
                            }`}
                            title="Delete"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteConfirmation.show}
        onClose={() => setDeleteConfirmation({ show: false, id: null, name: '' })}
        onConfirm={handleConfirmDelete}
        title="Delete Staff Member"
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

export default AdminDashboard;

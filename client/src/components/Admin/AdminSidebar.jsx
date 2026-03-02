import { FiUsers, FiShare2, FiSettings, FiLogOut } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminSidebar = ({ isDarkMode, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: FiUsers, label: 'Staff Details', path: '/admin/dashboard' },
    { icon: FiShare2, label: 'Social Media', path: '/admin/social-media' },
    { icon: FiSettings, label: 'Settings', path: '/admin/settings' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`w-64 min-h-screen fixed left-0 top-0 ${
      isDarkMode ? 'bg-[#1a1f26]' : 'bg-white'
    } border-r ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} transition-all duration-300`}>
      {/* Logo */}
      <div className={`p-6 border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="flex items-center gap-3">
          <img 
            src="https://res.cloudinary.com/ds1dt3qub/image/upload/v1771333289/gvs-Il-kmUlQ-removebg-preview_p33n0j.png" 
            alt="GVS Logo" 
            className="h-12 w-auto"
          />
          <div>
            <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              GVS Admin
            </h2>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Management Portal
            </p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                active
                  ? isDarkMode
                    ? 'bg-[#0270A8] text-white shadow-lg'
                    : 'bg-[#0270A8] text-white shadow-lg'
                  : isDarkMode
                  ? 'text-gray-400 hover:bg-[#282E35] hover:text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className={`absolute bottom-0 left-0 right-0 p-4 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <button
          onClick={onLogout}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
            isDarkMode
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-red-500 hover:bg-red-600 text-white'
          }`}
        >
          <FiLogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;

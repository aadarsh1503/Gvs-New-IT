import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminSignup = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminData', JSON.stringify(data.admin));
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${
      isDarkMode ? 'bg-gradient-to-b from-[#222831] to-[#2C3138]' : 'bg-[#F2EEE7]'
    }`}>
      <div className={`max-w-md w-full space-y-8 p-8 rounded-xl ${
        isDarkMode ? 'bg-[#282E35]' : 'bg-white shadow-2xl'
      }`}>
        <div>
          <div className="flex justify-center">
            <img 
              src="https://res.cloudinary.com/ds1dt3qub/image/upload/v1771333289/gvs-Il-kmUlQ-removebg-preview_p33n0j.png" 
              alt="GVS Logo" 
              className="h-32 w-auto"
            />
          </div>
          <h2 className={`text-center text-3xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Create Admin Account
          </h2>
          <p className={`mt-2 text-center text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Register a new administrator
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-all ${
                  isDarkMode
                    ? 'bg-[#2C3138] border-gray-700 text-white focus:border-brand-pink'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-brand-teal'
                }`}
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-all ${
                  isDarkMode
                    ? 'bg-[#2C3138] border-gray-700 text-white focus:border-brand-pink'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-brand-teal'
                }`}
                placeholder="admin@example.com"
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Password
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-all ${
                  isDarkMode
                    ? 'bg-[#2C3138] border-gray-700 text-white focus:border-brand-pink'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-brand-teal'
                }`}
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Confirm Password
              </label>
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-all ${
                  isDarkMode
                    ? 'bg-[#2C3138] border-gray-700 text-white focus:border-brand-pink'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-brand-teal'
                }`}
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
            }`}
            style={{ backgroundColor: '#0270A8' }}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminSignup;

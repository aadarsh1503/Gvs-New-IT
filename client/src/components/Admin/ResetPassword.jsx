import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
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
      const response = await fetch(`/api/auth/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: formData.password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Password reset successfully! You can now login.');
        navigate('/admin/login');
      } else {
        setError(data.message || 'Failed to reset password');
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
            Reset Password
          </h2>
          <p className={`mt-2 text-center text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Enter your new password
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
                New Password
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
                Confirm New Password
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
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

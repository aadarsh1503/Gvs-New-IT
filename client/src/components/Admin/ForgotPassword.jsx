import { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = ({ isDarkMode }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Password reset email sent! Please check your inbox.');
        setEmail('');
      } else {
        setError(data.message || 'Failed to send reset email');
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
            Forgot Password
          </h2>
          <p className={`mt-2 text-center text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Enter your email to receive a password reset link
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          {message && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              {message}
            </div>
          )}
          
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all ${
                isDarkMode
                  ? 'bg-[#2C3138] border-gray-700 text-white focus:border-brand-pink'
                  : 'bg-white border-gray-300 text-gray-900 focus:border-brand-teal'
              }`}
              placeholder="admin@example.com"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:opacity-90'
            }`}
            style={{ backgroundColor: '#0270A8' }}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>

          <div className="text-center">
            <Link
              to="/admin/login"
              className={`text-sm ${
                isDarkMode ? 'text-brand-pink hover:text-brand-teal' : 'text-brand-teal hover:text-brand-pink'
              }`}
            >
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

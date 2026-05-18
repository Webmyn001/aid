import React, { useState } from 'react';
import { Oval } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { FiMail, FiLock } from 'react-icons/fi';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Email: '',
    Password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    console.log(formData);

    try {
      const res = await axios.post(
        "https://aid-server.vercel.app/api/admin/login",
        formData,
        { validateStatus: (status) => status < 500 }
      );
      console.log(res);
      if (res.status === 200) {
        localStorage.setItem('Token', res.data.token);
        localStorage.setItem('userData', JSON.stringify(res.data.user));
        navigate("/dashboard");
      } else {
        setError(res.data.msg || 'Authentication failed');
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form className="w-full max-w-sm space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-4">
        {/* Email Input */}
        <div className="relative">
          <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            name="Email"
            placeholder="Email Address"
            value={formData.Email}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#d2ab66] focus:ring-2 focus:ring-[#d2ab66]/50 transition-all"
            required
          />
        </div>

        {/* Password Input */}
        <div className="relative">
          <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="password"
            name="Password"
            placeholder="Password"
            value={formData.Password}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#d2ab66] focus:ring-2 focus:ring-[#d2ab66]/50 transition-all"
            required
            minLength="6"
          />
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-600 text-sm text-center mt-2">{error}</p>
        )}

        {/* Submit Button */}
        <div className='flex items-center justify-center'>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#d2ab66] text-white py-3 px-6 rounded-lg font-medium font-Outfit hover:bg-white hover:border-2 hover:border-[#d2ab66] hover:text-[#d2ab66] disabled:opacity-70 transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <Oval height={24} width={24} color="#fff" />
            ) : (
              'Login'
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

export default Login;
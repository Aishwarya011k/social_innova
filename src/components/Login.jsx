import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadSpinner from './LoadSpinner';
import { FaGoogle, FaFacebook } from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      setLoading(true);
      await login({
        email: formData.email,
        password: formData.password,
      });
      // Check if there's a redirect location stored
      const from = location.state?.from || '/dashboard';
      navigate(from);
    } catch (err) {
      setError(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="card p-8 bg-[#03045E] rounded-lg shadow-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#CAF0F8]">Welcome Back</h2>
            <p className="mt-2 text-[#90E0EF]">Sign in to continue to your account</p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-[#03045E]/50 border border-[#00B4D8] rounded-lg">
              <p className="text-[#00B4D8] text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#CAF0F8] mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="input-field w-full bg-[#03045E] border border-[#00B4D8] rounded-lg text-[#F7E6D5] focus:outline-none focus:ring-2 focus:ring-[#90E0EF] focus:border-[#90E0EF] transition-colors"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#CAF0F8] mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="input-field w-full bg-[#03045E] border border-[#00B4D8] rounded-lg text-[#F7E6D5] focus:outline-none focus:ring-2 focus:ring-[#90E0EF] focus:border-[#90E0EF] transition-colors"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 border-[#00B4D8] rounded bg-[#03045E] text-[#00B4D8] focus:ring-[#48CAE4]"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-[#90E0EF]">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="/forgot-password" className="link text-[#90E0EF] hover:text-[#00B4D8]">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center bg-[#00B4D8] text-[#03045E] rounded-lg hover:bg-[#CAF0F8] transition-colors disabled:opacity-50"
              >
                {loading ? <LoadSpinner /> : 'Sign In'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#00B4D8]/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#03045E] text-[#90E0EF]">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="btn-outlined flex items-center justify-center border border-[#00B4D8] text-[#00B4D8] rounded-lg py-2 px-4 hover:bg-[#00B4D8] hover:text-[#03045E] transition-colors"
              >
                <FaGoogle className="w-5 h-5 mr-2" />
                Google
              </button>
              <button
                type="button"
                className="btn-outlined flex items-center justify-center border border-[#00B4D8] text-[#00B4D8] rounded-lg py-2 px-4 hover:bg-[#00B4D8] hover:text-[#03045E] transition-colors"
              >
                <FaFacebook className="w-5 h-5 mr-2" />
                Facebook
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-[#90E0EF]">
            Don't have an account?{' '}
            <Link to="/signup" className="link font-medium text-[#00B4D8] hover:text-[#CAF0F8]">
              Sign up now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

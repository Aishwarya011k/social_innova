import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadSpinner from './LoadSpinner';

const SignUp = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'donor',
    location: '',
    donationPreferences: ['clothing', 'books'],
    pickupTime: 'weekends',
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

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      const newUser = await signup(formData);
      // If donor/funder, redirect to verify email
      if ((newUser.userType === 'donor' || newUser.userType === 'funder') && !newUser.isVerified) {
        navigate('/verify-email');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Failed to create account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#00296B] text-[#E2E8F0] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto space-y-8 bg-gradient-to-b from-[#003F88] to-[#00509D] p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-bold">Create an Account</h2>
          <p className="mt-2 text-center text-[#A9CFF4]">
            Join our community and start making a difference
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {error && (
            <div className="bg-[#4299E1]/10 border border-[#4299E1] text-[#4299E1] px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="text-sm font-medium">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 bg-[#00296B] border border-[#A9CFF4] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00CFFF]"
              />
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 bg-[#00296B] border border-[#A9CFF4] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00CFFF]"
              />
            </div>

            <div>
              <label htmlFor="userType" className="text-sm font-medium">I want to join as a</label>
              <select
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 bg-[#00296B] border border-[#A9CFF4] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00CFFF]"
              >
                <option value="donor">Donor</option>
                <option value="funder">Funder</option>
                <option value="recipient">Recipient</option>
              </select>
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 bg-[#00296B] border border-[#A9CFF4] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00CFFF]"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 bg-[#00296B] border border-[#A9CFF4] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00CFFF]"
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="flex-1 py-2 px-4 bg-transparent border border-[#00CFFF] text-[#00CFFF] rounded-md font-semibold hover:bg-[#00CFFF] hover:text-[#00296B] transition duration-300"
            >
              Have an account?
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2 px-4 bg-[#00CFFF] text-[#00296B] rounded-md font-semibold hover:bg-[#00b8e6] transition duration-300 flex justify-center items-center"
            >
              {loading ? <LoadSpinner /> : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

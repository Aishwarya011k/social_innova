import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUser } from 'react-icons/fa';

const EditProfile = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    location: user?.location || '',
    donationPreferences: user?.donationPreferences || [],
    pickupTime: user?.pickupTime || 'weekends'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePreferenceChange = (preference) => {
    setFormData(prev => ({
      ...prev,
      donationPreferences: prev.donationPreferences.includes(preference)
        ? prev.donationPreferences.filter(p => p !== preference)
        : [...prev.donationPreferences, preference]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    navigate('/dashboard');
  };

  const donationOptions = ['Clothing', 'Books', 'Toys', 'Electronics', 'Furniture'];
  const pickupOptions = ['Weekdays', 'Weekends', 'Mornings', 'Evenings'];

  return (
    <div className="min-h-screen w-full py-8 px-4 bg-gradient-to-br from-[#03045E] via-[#0077B6] to-[#00B4D8]">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="card p-8">
          {/* Profile Header */}
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-20 h-20 rounded-full bg-[#00B4D8]/20 flex items-center justify-center border-2 border-[#00B4D8]">
              <span className="text-3xl text-[#CAF0F8]">{user?.name?.charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#CAF0F8]">Edit Profile</h1>
              <p className="text-[#90E0EF]">{user?.email}</p>
            </div>
          </div>

          {/* Edit Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#CAF0F8] mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-field w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#CAF0F8] mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, Country"
                className="input-field w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#CAF0F8] mb-2">Pickup Time Preference</label>
              <select
                name="pickupTime"
                value={formData.pickupTime}
                onChange={handleChange}
                className="select-field w-full"
              >
                {pickupOptions.map(option => (
                  <option key={option.toLowerCase()} value={option.toLowerCase()}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#CAF0F8] mb-3">Donation Preferences</label>
              <div className="grid grid-cols-2 gap-4">
                {donationOptions.map(option => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handlePreferenceChange(option.toLowerCase())}
                    className={`p-3 rounded-lg border ${
                      formData.donationPreferences.includes(option.toLowerCase())
                        ? 'bg-[#00B4D8] border-[#00B4D8] text-[#CAF0F8]'
                        : 'border-[#00B4D8] text-[#90E0EF] hover:bg-[#00B4D8]/10'
                    } transition-all`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary flex-1"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

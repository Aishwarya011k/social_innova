import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const EditProfileForm = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    location: user?.location || '',
    preferences: user?.preferences || []
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
      preferences: prev.preferences.includes(preference)
        ? prev.preferences.filter(p => p !== preference)
        : [...prev.preferences, preference]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-[#03045E] rounded-xl border border-[#00B4D8] p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-[#CAF0F8] mb-6">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#CAF0F8] mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-field w-full"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#CAF0F8] mb-2">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="input-field w-full h-32 resize-none"
              placeholder="Tell us about yourself..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#CAF0F8] mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="input-field w-full"
              placeholder="City, Country"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#CAF0F8] mb-2">
              Preferences
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {['Clothing', 'Electronics', 'Books', 'Furniture', 'Food', 'Other'].map((pref) => (
                <button
                  key={pref}
                  type="button"
                  onClick={() => {
                    const newPrefs = formData.preferences.includes(pref)
                      ? formData.preferences.filter(p => p !== pref)
                      : [...formData.preferences, pref];
                    setFormData({ ...formData, preferences: newPrefs });
                  }}
                  className={`p-2 rounded-lg text-sm ${
                    formData.preferences.includes(pref)
                      ? 'bg-[#00B4D8] text-[#CAF0F8]'
                      : 'bg-[#03045E]/40 text-[#90E0EF] hover:bg-[#00B4D8]/10'
                  } transition-colors`}
                >
                  {pref}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
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
  );
};

export default EditProfileForm;

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  FaUser, 
  FaBox, 
  FaHistory, 
  FaHeart, 
  FaDollarSign, 
  FaBoxOpen,
  FaHandHoldingHeart,
  FaFireAlt,
  FaAward
} from 'react-icons/fa';

const DashboardCard = ({ icon: Icon, title, value, color }) => (
  <div className="card hover:scale-105 transition-transform">
    <div className="flex items-center space-x-4">
      <div className={`p-3 rounded-lg ${color || 'bg-[#00B4D8]/20'}`}>
        <Icon className="w-6 h-6 text-[#CAF0F8]" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-[#90E0EF]">{title}</h3>
        <p className="text-2xl font-bold text-[#CAF0F8]">{value}</p>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Fetch donation and funding data from localStorage
  const donations = JSON.parse(localStorage.getItem(`donations_${user?.id}`) || '[]');
  const fundings = JSON.parse(localStorage.getItem(`fundings_${user?.id}`) || '[]');

  // Combine and sort by date (most recent first)
  const activities = [
    ...donations.map(d => ({ ...d, type: 'donation' })),
    ...fundings.map(f => ({ ...f, type: 'funding' }))
  ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Calculate total donations and streak
  const totalDonations = donations.length;

  // Calculate donation streak (consecutive days with donations)
  let streak = 0;
  if (donations.length > 0) {
    // Sort by date ascending
    const sorted = [...donations].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    let lastDate = new Date(sorted[sorted.length - 1].createdAt);
    streak = 1;
    for (let i = sorted.length - 2; i >= 0; i--) {
      const thisDate = new Date(sorted[i].createdAt);
      const diff = (lastDate - thisDate) / (1000 * 60 * 60 * 24);
      if (diff <= 1.5 && diff >= 0.5) {
        streak++;
        lastDate = thisDate;
      } else {
        break;
      }
    }
  }

  return (
    <div className="min-h-screen w-full py-8 px-4 bg-gradient-to-br from-[#03045E] via-[#0077B6] to-[#00B4D8]">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Welcome Section */}
        <div className="card p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#CAF0F8] mb-2">Welcome back, {user?.name}!</h1>
              <p className="text-[#90E0EF]">Here's your donation activity overview</p>
            </div>
            <button
              onClick={() => navigate('/edit-profile')}
              className="btn-outlined"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DashboardCard
            icon={FaHandHoldingHeart}
            title="Total Donations"
            value={totalDonations}
            color="bg-[#00B4D8]/20"
          />
          <DashboardCard
            icon={FaFireAlt}
            title="Donation Streak"
            value={`${streak} days`}
            color="bg-[#0077B6]/20"
          />
          <DashboardCard
            icon={FaAward}
            title="Member Since"
            value={user?.memberSince ? new Date(user.memberSince).toLocaleDateString() : ''}
            color="bg-[#03045E]/20"
          />
        </div>

        {/* Recent Activity */}
        <div className="card p-8">
          <h2 className="text-xl font-semibold text-[#CAF0F8] mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {activities.length === 0 && (
              <div className="text-[#90E0EF]">No recent activity yet.</div>
            )}
            {activities.map((activity, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-[#03045E]/20">
                <div className="flex items-center space-x-4">
                  <div className="p-2 rounded-full bg-[#00B4D8]/20">
                    {activity.type === 'donation' ? (
                      <FaHandHoldingHeart className="w-5 h-5 text-[#00B4D8]" />
                    ) : (
                      <FaDollarSign className="w-5 h-5 text-[#00B4D8]" />
                    )}
                  </div>
                  <div>
                    {activity.type === 'donation' ? (
                      <>
                        <p className="text-[#CAF0F8] font-semibold">Donated: {activity.itemName} ({activity.category})</p>
                        <p className="text-sm text-[#90E0EF]">Qty: {activity.quantity} | {activity.description}</p>
                      </>
                    ) : (
                      <>
                        <p className="text-[#CAF0F8] font-semibold">Funded: {activity.projectName} (${activity.fundingAmount})</p>
                        <p className="text-sm text-[#90E0EF]">{activity.projectCategory} | {activity.description}</p>
                      </>
                    )}
                    <p className="text-xs text-[#90E0EF]/70 mt-1">{new Date(activity.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                {/* Optionally add a details button */}
              </div>
            ))}
          </div>
        </div>
        
        {/* Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button 
            onClick={() => navigate('/donate')}
            className="btn-primary py-4 flex items-center justify-center gap-3"
          >
            <FaHandHoldingHeart className="w-5 h-5" />
            <span>Start New Donation</span>
          </button>
          <button 
            onClick={() => navigate('/profile/history')}
            className="btn-secondary py-4 flex items-center justify-center gap-3"
          >
            <FaHistory className="w-5 h-5" />
            <span>View Donation History</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { FaClipboardList, FaHistory, FaHandHoldingHeart } from 'react-icons/fa';

const RecipientDashboard = () => {
  const { user } = useAuth();

  // Example stats, replace with real data as needed
  const stats = [
    { icon: FaHandHoldingHeart, label: 'Requests Made', value: 3 },
    { icon: FaClipboardList, label: 'Items Received', value: 5 },
    { icon: FaHistory, label: 'Last Request', value: '2025-07-01' },
  ];

  return (
    <div className="min-h-screen w-full py-8 px-4 bg-gradient-to-br from-[#03045E] via-[#0077B6] to-[#00B4D8]">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="card p-8 mb-8">
          <h1 className="text-3xl font-bold text-[#CAF0F8] mb-2">Welcome, {user?.name}!</h1>
          <p className="text-[#90E0EF]">Here is your recipient dashboard overview.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="card flex items-center space-x-4 p-6 bg-[#021B3A]/60 rounded-xl border border-[#00B4D8]/30">
              <div className="p-3 rounded-lg bg-[#00B4D8]/20">
                <stat.icon className="w-6 h-6 text-[#CAF0F8]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#90E0EF]">{stat.label}</h3>
                <p className="text-2xl font-bold text-[#CAF0F8]">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Add more recipient-specific dashboard content here */}
      </div>
    </div>
  );
};

export default RecipientDashboard;

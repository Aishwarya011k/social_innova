import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FaHandHoldingHeart,
  FaSeedling,
  FaHandsHelping,
  FaTimes,
  FaTruck,
  FaChartLine,
  FaRegHandshake
} from 'react-icons/fa';

const TypeConfirmModal = ({ onConfirm, onCancel, userType }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="absolute inset-0 bg-[#03045E]/80 backdrop-blur-sm" />
    <div className="relative bg-[#03045E] p-8 rounded-xl border border-[#00B4D8]/20 max-w-md w-full mx-4 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-[#CAF0F8]">Change Role</h3>
        <button
          onClick={onCancel}
          className="text-[#90E0EF] hover:text-[#00B4D8] transition-colors"
        >
          <FaTimes className="w-6 h-6" />
        </button>
      </div>
      <p className="text-[#90E0EF] mb-8">
        Would you like to switch your role to {userType}? This will give you access to {userType}-specific features.
      </p>
      <div className="flex space-x-4">
        <button
          onClick={onConfirm}
          className="flex-1 bg-[#00B4D8] hover:bg-[#0077B6] text-white font-medium py-3 px-6 rounded-lg transition-colors"
        >
          Confirm
        </button>
        <button
          onClick={onCancel}
          className="flex-1 border border-[#00B4D8] text-[#00B4D8] hover:bg-[#00B4D8]/10 font-medium py-3 px-6 rounded-lg transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
);

const ServiceCard = ({ icon: Icon, title, description, features, link, requiresAuth, userType, user }) => {
  const navigate = useNavigate();
  const { updateUserType } = useAuth();
  const [showTypeConfirm, setShowTypeConfirm] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    // Recipients cannot switch to donor/funder, donors/funders cannot switch to recipient
    if (user && user.userType === 'recipient' && userType !== 'recipient') {
      // Show error or do nothing
      return;
    }
    if (user && (user.userType === 'donor' || user.userType === 'funder') && userType === 'recipient') {
      // Show error or do nothing
      return;
    }
    if (!requiresAuth || (user && user.userType === userType)) {
      navigate(link);
    } else if (user) {
      setShowTypeConfirm(true);
    } else {
      navigate('/login', { state: { from: link } });
    }
  };

  return (
    <div
      className="group relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative bg-[#03045E]/30 backdrop-blur-sm p-8 rounded-xl border border-[#00B4D8]/30 transition-all duration-300 hover:border-[#00B4D8] h-full">
        {/* Background Gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#03045E]/0 via-[#0077B6]/5 to-[#00B4D8]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />

        {/* Content */}
        <div className="relative z-10">
          <div className="w-16 h-16 rounded-full bg-[#00B4D8]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-8 h-8 text-[#00B4D8]" />
          </div>

          <h3 className="text-2xl font-bold text-[#CAF0F8] mb-4">{title}</h3>
          <p className="text-[#90E0EF] mb-6">{description}</p>

          {/* Features List */}
          <ul className="space-y-3 mb-8">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center text-[#90E0EF]">
                <feature.icon className="w-5 h-5 mr-3 text-[#00B4D8]" />
                <span>{feature.text}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={handleClick}
            className="w-full bg-[#00B4D8] hover:bg-[#0077B6] text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2 group"
          >
            <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>
              {user
                ? user.userType === userType
                  ? 'Get Started'
                  : 'Switch Role'
                : 'Sign In to Start'}
            </span>
          </button>
        </div>
      </div>

      {showTypeConfirm && (
        <TypeConfirmModal
          userType={userType}
          onConfirm={() => {
            // Only allow valid switches
            if (user.userType === 'recipient' && userType !== 'recipient') return;
            if ((user.userType === 'donor' || user.userType === 'funder') && userType === 'recipient') return;
            updateUserType(userType);
            setShowTypeConfirm(false);
            navigate(link);
          }}
          onCancel={() => setShowTypeConfirm(false)}
        />
      )}
    </div>
  );
};

const Services = () => {
  const { user } = useAuth();

  const serviceCards = [
    {
      icon: FaHandHoldingHeart,
      title: "Donate Items",
      description: "Give your gently used items a new purpose. Make a meaningful impact in your community through thoughtful donations.",
      features: [
        { icon: FaTruck, text: "Free pickup service" },
        { icon: FaChartLine, text: "Track your donations" },
        { icon: FaRegHandshake, text: "Direct donor-recipient matching" }
      ],
      link: "/donate",
      requiresAuth: true,
      userType: "donor"
    },
    {
      icon: FaSeedling,
      title: "Fund Projects",
      description: "Support initiatives and help scale our impact. Your funding keeps the cycle of giving moving forward.",
      features: [
        { icon: FaChartLine, text: "Monitor project progress" },
        { icon: FaHandHoldingHeart, text: "Choose your cause" },
        { icon: FaRegHandshake, text: "Connect with projects" }
      ],
      link: "/fund",
      requiresAuth: true,
      userType: "funder"
    },
    {
      icon: FaHandsHelping,
      title: "Receive Support",
      description: "Connect with donors and receive the items you need. We're here to help you thrive.",
      features: [
        { icon: FaRegHandshake, text: "Easy request process" },
        { icon: FaTruck, text: "Convenient delivery" },
        { icon: FaChartLine, text: "Track your requests" }
      ],
      link: "/receive",
      requiresAuth: true,
      userType: "recipient"
    }
  ];

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-[#03045E] via-[#0077B6] to-[#00B4D8]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-[#CAF0F8] mb-6">Our Services</h1>
          <p className="text-xl text-[#90E0EF] max-w-2xl mx-auto">
            Choose your role in making a difference. Whether you're donating,
            funding, or receiving, every part of our community is valuable.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {serviceCards.map((card, index) => (
            <ServiceCard
              key={index}
              {...card}
              user={user}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
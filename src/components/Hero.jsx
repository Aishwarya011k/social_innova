import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHandHoldingHeart, FaRoute, FaUsers, FaInfoCircle } from 'react-icons/fa';
import { heroImg } from '../assets';

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <div className="relative min-h-screen flex items-center">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#03045E] via-[#0077B6]/90 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl font-bold text-[#CAF0F8] leading-tight">
              Make a Difference <br />
              <span className="text-[#48CAE4]">One Donation</span> at a Time
            </h1>
            
            <p className="text-xl text-[#90E0EF] max-w-lg">
              Join our community of givers and receivers. Together, we can create 
              meaningful impact through thoughtful donations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/donate')}
                className="btn-primary flex items-center justify-center gap-2"
              >
                <FaHandHoldingHeart className="w-5 h-5" />
                Start Donating
              </button>
              <button
                onClick={() => navigate('/about')}
                className="btn-outlined flex items-center justify-center gap-2"
              >
                <FaInfoCircle className="w-5 h-5" />
                Learn More
              </button>
            </div>
          </div>

          {/* Stats Card */}
          <div className="card p-8 backdrop-blur-md">
            <h2 className="text-2xl font-bold text-[#CAF0F8] mb-6">Our Impact</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-3xl font-bold text-[#00B4D8] mb-2">1000+</div>
                <p className="text-[#90E0EF]">Active Donors</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#00B4D8] mb-2">5000+</div>
                <p className="text-[#90E0EF]">Items Donated</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#00B4D8] mb-2">500+</div>
                <p className="text-[#90E0EF]">Recipients Helped</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#00B4D8] mb-2">50+</div>
                <p className="text-[#90E0EF]">Active Communities</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24 grid md:grid-cols-3 gap-8">
          <div className="card p-6 hover:scale-105 transition-transform">
            <div className="w-12 h-12 rounded-full bg-[#00B4D8]/20 flex items-center justify-center mb-4">
              <FaHandHoldingHeart className="w-6 h-6 text-[#00B4D8]" />
            </div>
            <h3 className="text-xl font-semibold text-[#CAF0F8] mb-2">Easy Donations</h3>
            <p className="text-[#90E0EF]">
              Simple and streamlined process to make your donations count.
            </p>
          </div>

          <div className="card p-6 hover:scale-105 transition-transform">
            <div className="w-12 h-12 rounded-full bg-[#00B4D8]/20 flex items-center justify-center mb-4">
              <FaRoute className="w-6 h-6 text-[#00B4D8]" />
            </div>
            <h3 className="text-xl font-semibold text-[#CAF0F8] mb-2">Track Impact</h3>
            <p className="text-[#90E0EF]">
              Follow your donation's journey from start to finish.
            </p>
          </div>

          <div className="card p-6 hover:scale-105 transition-transform">
            <div className="w-12 h-12 rounded-full bg-[#00B4D8]/20 flex items-center justify-center mb-4">
              <FaUsers className="w-6 h-6 text-[#00B4D8]" />
            </div>
            <h3 className="text-xl font-semibold text-[#CAF0F8] mb-2">Community First</h3>
            <p className="text-[#90E0EF]">
              Connect with others who share your vision for change.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;


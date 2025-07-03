import React from 'react';
import { FaBrain, FaUserMd, FaChartLine } from 'react-icons/fa';
import { Typewriter } from 'react-simple-typewriter';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-16 px-4">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto">
        <div className="card p-8 md:p-12 mb-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold text-[#CAF0F8] mb-6">
                About Heart2Hand
              </h1>
              <p className="text-[#90E0EF] mb-8">
                We believe in creating a world where giving is seamless and impactful. 
                Our platform connects generous donors with those in need, making every 
                contribution count.
              </p>
              <button 
                onClick={() => navigate('/services')}
                className="btn-primary"
              >
                Explore Our Services
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00B4D8]/20 to-transparent rounded-lg"></div>
              <img 
                src="/path-to-about-image.jpg" 
                alt="About Us" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-[#CAF0F8] mb-4">Our Mission</h2>
            <p className="text-[#90E0EF]">
              To create a sustainable and efficient platform that connects donors 
              with recipients, making the process of giving and receiving seamless 
              and transparent.
            </p>
          </div>
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-[#CAF0F8] mb-4">Our Vision</h2>
            <p className="text-[#90E0EF]">
              A world where resources are shared efficiently and every donation makes 
              a meaningful impact in someone's life.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="card p-8 mb-12">
          <h2 className="text-2xl font-bold text-[#CAF0F8] mb-8 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#00B4D8]/20 flex items-center justify-center">
                <FaBrain className="w-8 h-8 text-[#00B4D8]" />
              </div>
              <h3 className="text-xl font-semibold text-[#CAF0F8] mb-2">Transparency</h3>
              <p className="text-[#90E0EF]">
                We believe in complete transparency in the donation process.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#00B4D8]/20 flex items-center justify-center">
                <FaUserMd className="w-8 h-8 text-[#00B4D8]" />
              </div>
              <h3 className="text-xl font-semibold text-[#CAF0F8] mb-2">Sustainability</h3>
              <p className="text-[#90E0EF]">
                Creating lasting impact through sustainable giving practices.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#00B4D8]/20 flex items-center justify-center">
                <FaChartLine className="w-8 h-8 text-[#00B4D8]" />
              </div>
              <h3 className="text-xl font-semibold text-[#CAF0F8] mb-2">Community</h3>
              <p className="text-[#90E0EF]">
                Building strong connections within our giving community.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="card p-8 text-center">
          <h2 className="text-2xl font-bold text-[#CAF0F8] mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-[#90E0EF] mb-8 max-w-2xl mx-auto">
            Join our community of donors and recipients today. Every donation makes a 
            difference, no matter how small.
          </p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => navigate('/signup')}
              className="btn-primary"
            >
              Get Started
            </button>
            <button 
              onClick={() => navigate('/contact')}
              className="btn-secondary"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
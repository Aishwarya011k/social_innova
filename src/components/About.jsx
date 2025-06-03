import React from 'react';
import { FaBrain, FaUserMd, FaChartLine } from 'react-icons/fa';
import { Typewriter } from 'react-simple-typewriter';

const About = () => {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-[#E7C7BC]">
            <Typewriter 
              words={["About Heart2Hand"]} 
              loop 
              cursor 
              cursorStyle="|" 
            />
          </h1>
          <p className="text-xl text-[#F7E6D5] max-w-3xl mx-auto">
           Empowering communities by making it easy to donate clothes, toys, utensils, and furniture to those who need them most.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#4A1D18]/40 backdrop-blur-sm p-8 rounded-xl border border-[#A64B39]">
            <h2 className="text-2xl font-bold text-[#E7C7BC] mb-4">Our Mission</h2>
            <p className="text-[#F7E6D5] leading-relaxed">
            Heart2Hand aims to create a seamless platform for donating clothes, toys, utensils, furniture, and more to those in need. We’re committed to fostering a community of generosity, reducing waste, and making it easy for everyone to give and receive with kindness and respect.
            </p>
          </div>

          <div className="bg-[#4A1D18]/40 backdrop-blur-sm p-8 rounded-xl border border-[#A64B39]">
            <h2 className="text-2xl font-bold text-[#E7C7BC] mb-4">Why Choose Us</h2>
            <ul className="space-y-4 text-[#F7E6D5]">
              <li className="flex items-start gap-3">
                <FaBrain className="w-6 h-6 text-[#D66D55] mt-1" />
                <span>Trusted platform connecting donors with those in need</span>
              </li>
              <li className="flex items-start gap-3">
                <FaUserMd className="w-6 h-6 text-[#D66D55] mt-1" />
                <span>Easy and secure way to donate clothes, toys, utensils, furniture, and more</span>
              </li>
              <li className="flex items-start gap-3">
                <FaChartLine className="w-6 h-6 text-[#D66D55] mt-1" />
                <span>Community-driven approach to make giving simple and impactful</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-6 bg-[#4A1D18]/40 backdrop-blur-sm p-8 rounded-xl border border-[#A64B39]">
          <h2 className="text-2xl font-bold text-[#E7C7BC]">Start Donating Today</h2>
          <p className="text-[#F7E6D5]">
           Join our community of compassionate donors and volunteers making a real difference by sharing 
          </p>
          <div className="space-y-4">
            <button 
              onClick={() => window.location.href = '/signup'}
              className="px-8 py-3 bg-[#D66D55] text-white rounded-lg hover:bg-[#A64B39] transition font-semibold"
            >
              Create Donar Account
            </button>
            <div className="text-[#F7E6D5]">
              Already have an account?{' '}
              <a 
                href="/login" 
                className="text-[#E7C7BC] hover:text-[#D66D55] transition"
              >
                Log in here
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
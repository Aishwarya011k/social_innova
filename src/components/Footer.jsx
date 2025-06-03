import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaHeart } from 'react-icons/fa';
import { logo } from '../assets';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#4A1D18]/60 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <img src={logo} alt="Heart2Hand Logo" className="h-8 w-auto" />
              <span className="text-xl font-bold text-[#E7C7BC]">Heart2Hand</span>
            </Link>
            <p className="text-[#F7E6D5] text-sm">
              Connecting hearts and hands to make a difference in our community through thoughtful donations.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-[#E7C7BC] font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-[#F7E6D5] hover:text-[#D66D55] text-sm">About Us</Link></li>
              <li><Link to="/features" className="text-[#F7E6D5] hover:text-[#D66D55] text-sm">Features</Link></li>
              <li><Link to="/donate" className="text-[#F7E6D5] hover:text-[#D66D55] text-sm">Donate Items</Link></li>
              <li><Link to="/volunteer" className="text-[#F7E6D5] hover:text-[#D66D55] text-sm">Volunteer</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-[#E7C7BC] font-semibold">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-[#F7E6D5] hover:text-[#D66D55] text-sm">Contact Us</Link></li>
              <li><Link to="/faq" className="text-[#F7E6D5] hover:text-[#D66D55] text-sm">FAQ</Link></li>
              <li><Link to="/privacy" className="text-[#F7E6D5] hover:text-[#D66D55] text-sm">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-[#F7E6D5] hover:text-[#D66D55] text-sm">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="text-[#E7C7BC] font-semibold">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#F7E6D5] hover:text-[#D66D55]">
                <FaFacebook className="w-6 h-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#F7E6D5] hover:text-[#D66D55]">
                <FaTwitter className="w-6 h-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#F7E6D5] hover:text-[#D66D55]">
                <FaInstagram className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[#F7E6D5] hover:text-[#D66D55]">
                <FaLinkedin className="w-6 h-6" />
              </a>
            </div>
            <div className="pt-4">
              <h4 className="text-[#E7C7BC] font-semibold mb-2">Subscribe to Newsletter</h4>
              <form className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-[#4A1D18]/40 border border-[#A64B39] rounded px-3 py-2 text-[#F7E6D5] placeholder-[#F7E6D5]/60 flex-grow"
                />
                <button className="bg-[#D66D55] text-white px-4 py-2 rounded hover:bg-[#A64B39] transition">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-[#A64B39] text-center">
          <p className="text-[#F7E6D5] text-sm">
            © {currentYear} Heart2Hand. Made with <FaHeart className="inline-block text-[#D66D55] mx-1" /> for the community
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

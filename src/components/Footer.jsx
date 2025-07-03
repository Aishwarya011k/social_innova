import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaHeart } from 'react-icons/fa';
import { logo } from '../assets';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#03045E]/80 backdrop-blur-sm border-t border-[#00B4D8]/20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <img src={logo} alt="Heart2Hand Logo" className="h-8 w-auto" />
              <span className="text-xl font-bold text-[#CAF0F8]">Heart2Hand</span>
            </Link>
            <p className="text-[#90E0EF] text-sm">
              Connecting hearts and hands to make a difference in our community through thoughtful donations.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-[#CAF0F8] font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="link text-sm">About Us</Link></li>
              <li><Link to="/services" className="link text-sm">Services</Link></li>
              <li><Link to="/donate" className="link text-sm">Donate Items</Link></li>
              <li><Link to="/volunteer" className="link text-sm">Volunteer</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-[#CAF0F8] font-semibold">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="link text-sm">Contact Us</Link></li>
              <li><Link to="/faq" className="link text-sm">FAQ</Link></li>
              <li><Link to="/privacy" className="link text-sm">Privacy Policy</Link></li>
              <li><Link to="/terms" className="link text-sm">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-[#CAF0F8] font-semibold">Stay Connected</h3>
            <p className="text-[#90E0EF] text-sm">Subscribe to our newsletter for updates.</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="input-field flex-1 text-sm"
              />
              <button className="btn-primary">
                Subscribe
              </button>
            </form>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-[#00B4D8] hover:text-[#48CAE4] transition">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-[#00B4D8] hover:text-[#48CAE4] transition">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-[#00B4D8] hover:text-[#48CAE4] transition">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-[#00B4D8] hover:text-[#48CAE4] transition">
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-[#00B4D8]/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#90E0EF] text-sm">
              © {currentYear} Heart2Hand. All rights reserved.
            </p>
            <div className="flex items-center mt-4 md:mt-0">
              <span className="text-[#90E0EF] text-sm flex items-center">
                Made with <FaHeart className="mx-1 text-[#00B4D8]" /> by Heart2Hand Team
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

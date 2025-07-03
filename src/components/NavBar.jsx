import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logo } from "../assets";
import { FaUser, FaChevronDown } from "react-icons/fa";
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout, updateUserType } = useAuth();

  const getUserTypeDisplay = (type) => {
    switch (type) {
      case 'donor':
        return 'Donor';
      case 'funder':
        return 'Funder';
      case 'recipient':
        return 'Recipient';
      default:
        return 'User';
    }
  };

  return (
    <nav className="bg-[#03045E]/80 backdrop-blur-sm fixed w-full z-50 border-b border-[#00B4D8]/20">
      <div className="max-w-full mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <img 
              src={logo} 
              alt="Heart2Hand Logo" 
              className="h-20 w-auto hover:scale-110 transition-all duration-300 drop-shadow-[0_0_25px_rgba(0,180,216,0.6)] hover:drop-shadow-[0_0_35px_rgba(0,180,216,0.8)] hover:brightness-110" 
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex gap-8">
            <Link to="/" className="link">Home</Link>
            <Link to="/about" className="link">About</Link>
            <Link to="/services" className="link">Services</Link>
            {user && (
              <Link to="/dashboard" className="link">Dashboard</Link>
            )}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex gap-3 items-center">
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="btn-primary flex items-center gap-2"
                >
                  <FaUser />
                  <span>{getUserTypeDisplay(user.userType)}</span>
                  <FaChevronDown className={`transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* User Menu Dropdown */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[#03045E] ring-1 ring-[#00B4D8]/20">
                    <div className="py-1">
                      {/* Menu items */}
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-[#CAF0F8] hover:bg-[#0077B6]"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/edit-profile"
                        className="block px-4 py-2 text-sm text-[#CAF0F8] hover:bg-[#0077B6]"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Edit Profile
                      </Link>
                      <hr className="border-[#00B4D8]/20 my-1" />
                      <button
                        onClick={() => {
                          updateUserType('donor');
                          setUserMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-[#CAF0F8] hover:bg-[#0077B6]"
                      >
                        Switch to Donor
                      </button>
                      <button
                        onClick={() => {
                          updateUserType('funder');
                          setUserMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-[#CAF0F8] hover:bg-[#0077B6]"
                      >
                        Switch to Funder
                      </button>
                      <button
                        onClick={() => {
                          updateUserType('recipient');
                          setUserMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-[#CAF0F8] hover:bg-[#0077B6]"
                      >
                        Switch to Recipient
                      </button>
                      <hr className="border-[#00B4D8]/20 my-1" />
                      <button
                        onClick={() => {
                          logout();
                          setUserMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-[#00B4D8] hover:bg-[#0077B6]"
                      >
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login">
                  <button className="btn-outlined">
                    Log In
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="btn-primary">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="btn-icon"
            >
              <svg
                className={`h-6 w-6 ${menuOpen ? "hidden" : "block"}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`h-6 w-6 ${menuOpen ? "block" : "hidden"}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${menuOpen ? "block" : "hidden"} md:hidden bg-[#03045E]/95 backdrop-blur-sm`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className="block px-3 py-2 text-[#CAF0F8] hover:bg-[#0077B6] rounded-md"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block px-3 py-2 text-[#CAF0F8] hover:bg-[#0077B6] rounded-md"
          >
            About
          </Link>
          <Link
            to="/services"
            className="block px-3 py-2 text-[#CAF0F8] hover:bg-[#0077B6] rounded-md"
          >
            Services
          </Link>
          {user && (
            <Link
              to="/dashboard"
              className="block px-3 py-2 text-[#CAF0F8] hover:bg-[#0077B6] rounded-md"
            >
              Dashboard
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
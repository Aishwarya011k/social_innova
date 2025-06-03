import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logo } from "../assets";

// TEMPORARY MOCK HOOK (Replace this with real auth logic when ready)
function useAuth() {
  const user = { name: "Demo User" }; // Set to null to simulate unauthenticated
  const logout = () => {
    console.log("Logged out");
  };
  return { user, logout };
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth(); // no need for extra state here

  return (
    <nav className="bg-[#4A1D18]/60 backdrop-blur-sm fixed w-full z-50">
      <div className="max-w-full mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <img src={logo} alt="Heart2Hand Logo" className="h-8 w-auto" />
            <span className="text-xl font-bold text-[#F7E6D5]">heart2hand</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex gap-8">
            <Link to="/" className="text-[#F7E6D5] hover:text-[#E7C7BC] font-medium transition">Home</Link>
            <Link to="/about" className="text-[#F7E6D5] hover:text-[#E7C7BC] font-medium transition">About</Link>
            <Link to="/features" className="text-[#F7E6D5] hover:text-[#E7C7BC] font-medium transition">Features</Link>
            {user && (
              <Link to="/dashboard" className="text-[#F7E6D5] hover:text-[#E7C7BC] font-medium transition">Dashboard</Link>
            )}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex gap-3">
            {user ? (
              <>
                <Link to="/profile">
                  <button className="px-4 py-2 rounded border border-[#E7C7BC] text-[#F7E6D5] hover:bg-[#D66D55]/10 hover:text-[#F7E6D5] transition font-semibold">
                    Profile
                  </button>
                </Link>
                <button 
                  onClick={logout}
                  className="px-4 py-2 rounded bg-[#A64B39] text-white hover:bg-[#4A1D18] transition font-semibold"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="px-4 py-2 rounded border border-[#E7C7BC] text-[#F7E6D5] hover:bg-[#D66D55]/10 hover:text-[#F7E6D5] transition font-semibold">
                    Log In
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="px-4 py-2 rounded bg-[#D66D55] text-white hover:bg-[#A64B39] transition font-semibold">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-[#F7E6D5]"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden px-4 pb-4 space-y-2">
            <Link to="/" onClick={() => setMenuOpen(false)} className="block text-[#F7E6D5] hover:text-[#E7C7BC]">Home</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)} className="block text-[#F7E6D5] hover:text-[#E7C7BC]">About</Link>
            <Link to="/features" onClick={() => setMenuOpen(false)} className="block text-[#F7E6D5] hover:text-[#E7C7BC]">Features</Link>
            {user && <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="block text-[#F7E6D5] hover:text-[#E7C7BC]">Dashboard</Link>}

            <div className="pt-2 border-t border-[#D66D55]">
              {user ? (
                <>
                  <Link to="/profile" onClick={() => setMenuOpen(false)} className="block text-[#F7E6D5] hover:text-[#E7C7BC]">Profile</Link>
                  <button onClick={() => { logout(); setMenuOpen(false); }} className="block w-full text-left text-[#A64B39] hover:text-[#4A1D18] mt-2">Log Out</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMenuOpen(false)} className="block text-[#F7E6D5] hover:text-[#E7C7BC]">Log In</Link>
                  <Link to="/signup" onClick={() => setMenuOpen(false)} className="block text-[#F7E6D5] hover:text-[#E7C7BC]">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

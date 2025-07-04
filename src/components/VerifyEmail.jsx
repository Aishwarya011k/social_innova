import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import emailjs from 'emailjs-com';

const EMAILJS_SERVICE_ID = 'service_wtrosdm'; // Replace with your EmailJS service ID
const EMAILJS_TEMPLATE_ID = 'template_k0yo6uc'; // Replace with your EmailJS template ID
const EMAILJS_USER_ID = 'zSMQbdDSAnIxY3lWn'; // Replace with your EmailJS public key

const VerifyEmail = () => {
  const { user } = useAuth();
  const [resent, setResent] = useState(false);
  const [verified, setVerified] = useState(user?.isVerified);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleVerify = () => {
    // Simulate verification
    const updatedUser = { ...user, isVerified: true };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setVerified(true);
    setTimeout(() => navigate('/dashboard'), 1000);
  };

  const handleResend = async () => {
    setSending(true);
    setError('');
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_email: user.email,
          to_name: user.name || user.email,
        },
        EMAILJS_USER_ID
      );
      setResent(true);
      setTimeout(() => setResent(false), 2000);
    } catch (err) {
      setError('Failed to send verification email.');
    } finally {
      setSending(false);
    }
  };

  if (verified) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card p-8 bg-[#03045E] rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-[#CAF0F8] mb-4">Email Verified!</h2>
          <p className="text-[#90E0EF] mb-4">Redirecting to your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card p-8 bg-[#03045E] rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold text-[#CAF0F8] mb-4">Verify Your Email</h2>
        <p className="text-[#90E0EF] mb-6">A verification email has been sent to <span className="font-semibold">{user?.email}</span>.<br/>Please verify your email to continue.</p>
        {error && <div className="text-red-400 mb-2">{error}</div>}
        <button
          onClick={handleVerify}
          className="w-full bg-[#00B4D8] hover:bg-[#0077B6] text-white font-semibold py-3 px-6 rounded-lg mb-4"
        >
          I've Verified My Email
        </button>
        <button
          onClick={handleResend}
          disabled={sending}
          className="w-full border border-[#00B4D8] text-[#00B4D8] hover:bg-[#00B4D8]/10 font-semibold py-3 px-6 rounded-lg"
        >
          {sending ? 'Sending...' : resent ? 'Verification Email Sent!' : 'Resend Verification Email'}
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;

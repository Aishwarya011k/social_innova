import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  FaCreditCard, 
  FaHandHoldingUsd, 
  FaChartLine, 
  FaUserShield, 
  FaCheckCircle, 
  FaProjectDiagram,
  FaStar,
  FaRegCreditCard
} from 'react-icons/fa';

const FundingCard = ({ icon: Icon, title, description }) => (
  <div className="bg-[#03045E]/30 backdrop-blur-sm p-6 rounded-xl border border-[#00B4D8]/30 hover:border-[#00B4D8] transition-all">
    <div className="flex items-start space-x-4">
      <div className="p-3 bg-[#00B4D8]/10 rounded-lg">
        <Icon className="w-6 h-6 text-[#00B4D8]" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-[#CAF0F8] mb-2">{title}</h3>
        <p className="text-[#90E0EF]/80">{description}</p>
      </div>
    </div>
  </div>
);

const FundingForm = () => {
  const [formData, setFormData] = useState({
    projectName: '',
    fundingAmount: '',
    projectCategory: '',
    description: '',
    timeline: '',
    paymentMethod: '',
    recurringDonation: 'no'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({
        projectName: '',
        fundingAmount: '',
        projectCategory: '',
        description: '',
        timeline: '',
        paymentMethod: '',
        recurringDonation: 'no'
      });
    }, 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (showSuccess) {
    return (
      <div className="bg-[#03045E]/30 backdrop-blur-md p-8 rounded-xl border border-[#00B4D8]/30">
        <div className="text-center">
          <FaCheckCircle className="w-16 h-16 text-[#00B4D8] mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-[#CAF0F8] mb-2">Funding Submitted!</h3>
          <p className="text-[#90E0EF]">Thank you for your support. Your contribution will help make a difference.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[#CAF0F8] text-sm font-medium mb-2" htmlFor="projectName">
            Project Name
          </label>
          <input
            type="text"
            id="projectName"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            required
            className="w-full bg-[#03045E]/30 border border-[#00B4D8]/30 rounded-lg px-4 py-2 text-[#CAF0F8] placeholder-[#90E0EF]/50 focus:outline-none focus:border-[#00B4D8]"
            placeholder="Enter project name"
          />
        </div>

        <div>
          <label className="block text-[#CAF0F8] text-sm font-medium mb-2" htmlFor="fundingAmount">
            Funding Amount ($)
          </label>
          <input
            type="number"
            id="fundingAmount"
            name="fundingAmount"
            value={formData.fundingAmount}
            onChange={handleChange}
            required
            min="1"
            step="0.01"
            className="w-full bg-[#03045E]/30 border border-[#00B4D8]/30 rounded-lg px-4 py-2 text-[#CAF0F8] placeholder-[#90E0EF]/50 focus:outline-none focus:border-[#00B4D8]"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-[#CAF0F8] text-sm font-medium mb-2" htmlFor="projectCategory">
            Project Category
          </label>
          <select
            id="projectCategory"
            name="projectCategory"
            value={formData.projectCategory}
            onChange={handleChange}
            required
            className="w-full bg-[#03045E]/30 border border-[#00B4D8]/30 rounded-lg px-4 py-2 text-[#CAF0F8] placeholder-[#90E0EF]/50 focus:outline-none focus:border-[#00B4D8]"
          >
            <option value="">Select a category</option>
            <option value="education">Education</option>
            <option value="healthcare">Healthcare</option>
            <option value="environment">Environment</option>
            <option value="technology">Technology</option>
            <option value="community">Community</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-[#CAF0F8] text-sm font-medium mb-2" htmlFor="timeline">
            Project Timeline
          </label>
          <select
            id="timeline"
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            required
            className="w-full bg-[#03045E]/30 border border-[#00B4D8]/30 rounded-lg px-4 py-2 text-[#CAF0F8] placeholder-[#90E0EF]/50 focus:outline-none focus:border-[#00B4D8]"
          >
            <option value="">Select timeline</option>
            <option value="1-3months">1-3 months</option>
            <option value="3-6months">3-6 months</option>
            <option value="6-12months">6-12 months</option>
            <option value="1year+">More than 1 year</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-[#CAF0F8] text-sm font-medium mb-2" htmlFor="description">
            Project Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full bg-[#03045E]/30 border border-[#00B4D8]/30 rounded-lg px-4 py-2 text-[#CAF0F8] placeholder-[#90E0EF]/50 focus:outline-none focus:border-[#00B4D8]"
            placeholder="Describe the project and its impact"
          />
        </div>

        <div>
          <label className="block text-[#CAF0F8] text-sm font-medium mb-2" htmlFor="paymentMethod">
            Payment Method
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            required
            className="w-full bg-[#03045E]/30 border border-[#00B4D8]/30 rounded-lg px-4 py-2 text-[#CAF0F8] placeholder-[#90E0EF]/50 focus:outline-none focus:border-[#00B4D8]"
          >
            <option value="">Select payment method</option>
            <option value="creditCard">Credit Card</option>
            <option value="debitCard">Debit Card</option>
            <option value="bankTransfer">Bank Transfer</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>

        <div>
          <label className="block text-[#CAF0F8] text-sm font-medium mb-2" htmlFor="recurringDonation">
            Recurring Donation
          </label>
          <select
            id="recurringDonation"
            name="recurringDonation"
            value={formData.recurringDonation}
            onChange={handleChange}
            required
            className="w-full bg-[#03045E]/30 border border-[#00B4D8]/30 rounded-lg px-4 py-2 text-[#CAF0F8] placeholder-[#90E0EF]/50 focus:outline-none focus:border-[#00B4D8]"
          >
            <option value="no">One-time donation</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary px-8 py-3 flex items-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <FaHandHoldingUsd className="w-5 h-5" />
              <span>Submit Funding</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

const FundingPage = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#CAF0F8] mb-4">Fund Projects</h1>
          <p className="text-[#90E0EF] text-lg max-w-2xl mx-auto">
            Support meaningful initiatives and help create lasting impact in communities.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <FundingCard
            icon={FaProjectDiagram}
            title="Impactful Projects"
            description="Support initiatives that create meaningful change"
          />
          <FundingCard
            icon={FaUserShield}
            title="Secure Funding"
            description="Your transactions are protected and encrypted"
          />
          <FundingCard
            icon={FaChartLine}
            title="Track Impact"
            description="Monitor the progress and impact of funded projects"
          />
        </div>

        <div className="bg-[#03045E]/30 backdrop-blur-md p-8 rounded-xl border border-[#00B4D8]/30">
          <FundingForm />
        </div>
      </div>
    </div>
  );
};

export default FundingPage;

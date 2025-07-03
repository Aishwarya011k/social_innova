import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  FaClipboardList, 
  FaHandHoldingHeart, 
  FaUserCheck, 
  FaHistory, 
  FaTruck, 
  FaMapMarkerAlt, 
  FaCheckCircle, 
  FaClock, 
  FaInfoCircle, 
  FaTimes,
  FaRegHandshake,
  FaShieldAlt,
  FaNetworkWired
} from 'react-icons/fa';

const RecipientCard = ({ icon: Icon, title, description }) => (
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

const DonationTracker = ({ donation, onStatusUpdate }) => {
  const steps = [
    { 
      icon: FaHandHoldingHeart, 
      label: 'Donation Matched', 
      status: 'MATCHED',
      description: 'Your donation has been matched with a donor'
    },
    { 
      icon: FaCheckCircle, 
      label: 'Verified', 
      status: 'VERIFIED',
      description: 'Donation details have been verified by both parties'
    },
    { 
      icon: FaTruck, 
      label: 'In Transit', 
      status: 'IN_TRANSIT',
      description: 'The donation is on its way to you'
    },
    { 
      icon: FaMapMarkerAlt, 
      label: 'Out for Delivery', 
      status: 'OUT_FOR_DELIVERY',
      description: 'The donation will be delivered today'
    },
    { 
      icon: FaHandHoldingHeart, 
      label: 'Received', 
      status: 'RECEIVED',
      description: 'You have received the donation'
    }
  ];

  const currentStepIndex = steps.findIndex(step => step.status === donation.status) || 0;
  const lastUpdated = donation?.statusHistory?.[donation.status]?.timestamp || donation?.createdAt;

  return (
    <div className="py-6">
      <div className="relative">
        {/* Progress Bar */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-[#4A1D18] -translate-y-1/2">
          <div 
            className="h-full bg-[#D66D55] transition-all duration-500"
            style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = index <= currentStepIndex;
            const isCurrent = index === currentStepIndex;

            return (
              <div key={step.label} className="flex flex-col items-center group">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10 
                    ${isCompleted ? 'bg-[#D66D55]' : 'bg-[#4A1D18]'}
                    ${isCurrent ? 'ring-4 ring-[#D66D55]/30' : ''}`}
                >
                  <Icon className={`w-5 h-5 ${isCompleted ? 'text-white' : 'text-[#A64B39]'}`} />
                </div>
                <div className="mt-2 text-center">
                  <p className={`text-sm font-medium ${isCompleted ? 'text-[#E7C7BC]' : 'text-[#A64B39]'}`}>
                    {step.label}
                  </p>
                  {isCompleted && lastUpdated && (
                    <p className="text-xs text-[#F7E6D5]/60 mt-1">
                      {new Date(lastUpdated).toLocaleDateString()}
                    </p>
                  )}
                </div>
                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 hidden group-hover:block">
                  <div className="bg-[#4A1D18] text-[#F7E6D5] text-xs rounded-lg p-2 shadow-lg">
                    {step.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const RecipientForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    organization: '',
    itemsNeeded: '',
    category: '',
    quantity: '',
    urgencyLevel: '',
    deliveryAddress: '',
    preferredDeliveryTime: '',
    purpose: ''
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
        fullName: '',
        organization: '',
        itemsNeeded: '',
        category: '',
        quantity: '',
        urgencyLevel: '',
        deliveryAddress: '',
        preferredDeliveryTime: '',
        purpose: ''
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
          <h3 className="text-2xl font-semibold text-[#CAF0F8] mb-2">Request Submitted!</h3>
          <p className="text-[#90E0EF]">We've received your request and will connect you with donors soon.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[#CAF0F8] text-sm font-medium mb-2" htmlFor="fullName">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full bg-[#03045E]/30 border border-[#00B4D8]/30 rounded-lg px-4 py-2 text-[#CAF0F8] placeholder-[#90E0EF]/50 focus:outline-none focus:border-[#00B4D8]"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-[#CAF0F8] text-sm font-medium mb-2" htmlFor="organization">
            Organization (if applicable)
          </label>
          <input
            type="text"
            id="organization"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            className="w-full bg-[#03045E]/30 border border-[#00B4D8]/30 rounded-lg px-4 py-2 text-[#CAF0F8] placeholder-[#90E0EF]/50 focus:outline-none focus:border-[#00B4D8]"
            placeholder="Enter organization name"
          />
        </div>

        <div>
          <label className="block text-[#CAF0F8] text-sm font-medium mb-2" htmlFor="itemsNeeded">
            Items Needed
          </label>
          <input
            type="text"
            id="itemsNeeded"
            name="itemsNeeded"
            value={formData.itemsNeeded}
            onChange={handleChange}
            required
            className="w-full bg-[#03045E]/30 border border-[#00B4D8]/30 rounded-lg px-4 py-2 text-[#CAF0F8] placeholder-[#90E0EF]/50 focus:outline-none focus:border-[#00B4D8]"
            placeholder="Enter items needed"
          />
        </div>

        <div>
          <label className="block text-[#CAF0F8] text-sm font-medium mb-2" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full bg-[#03045E]/30 border border-[#00B4D8]/30 rounded-lg px-4 py-2 text-[#CAF0F8] placeholder-[#90E0EF]/50 focus:outline-none focus:border-[#00B4D8]"
          >
            <option value="">Select a category</option>
            <option value="clothing">Clothing</option>
            <option value="furniture">Furniture</option>
            <option value="electronics">Electronics</option>
            <option value="books">Books</option>
            <option value="toys">Toys</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-[#CAF0F8] text-sm font-medium mb-2" htmlFor="quantity">
            Quantity Needed
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            min="1"
            className="w-full bg-[#03045E]/30 border border-[#00B4D8]/30 rounded-lg px-4 py-2 text-[#CAF0F8] placeholder-[#90E0EF]/50 focus:outline-none focus:border-[#00B4D8]"
            placeholder="Enter quantity"
          />
        </div>

        <div>
          <label className="block text-[#CAF0F8] text-sm font-medium mb-2" htmlFor="urgencyLevel">
            Urgency Level
          </label>
          <select
            id="urgencyLevel"
            name="urgencyLevel"
            value={formData.urgencyLevel}
            onChange={handleChange}
            required
            className="w-full bg-[#03045E]/30 border border-[#00B4D8]/30 rounded-lg px-4 py-2 text-[#CAF0F8] placeholder-[#90E0EF]/50 focus:outline-none focus:border-[#00B4D8]"
          >
            <option value="">Select urgency level</option>
            <option value="low">Low - Within next 30 days</option>
            <option value="medium">Medium - Within next 14 days</option>
            <option value="high">High - Within next 7 days</option>
            <option value="urgent">Urgent - As soon as possible</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-[#CAF0F8] text-sm font-medium mb-2" htmlFor="deliveryAddress">
            Delivery Address
          </label>
          <textarea
            id="deliveryAddress"
            name="deliveryAddress"
            value={formData.deliveryAddress}
            onChange={handleChange}
            required
            rows="2"
            className="w-full bg-[#03045E]/30 border border-[#00B4D8]/30 rounded-lg px-4 py-2 text-[#CAF0F8] placeholder-[#90E0EF]/50 focus:outline-none focus:border-[#00B4D8]"
            placeholder="Enter delivery address"
          />
        </div>

        <div>
          <label className="block text-[#CAF0F8] text-sm font-medium mb-2" htmlFor="preferredDeliveryTime">
            Preferred Delivery Time
          </label>
          <select
            id="preferredDeliveryTime"
            name="preferredDeliveryTime"
            value={formData.preferredDeliveryTime}
            onChange={handleChange}
            required
            className="w-full bg-[#03045E]/30 border border-[#00B4D8]/30 rounded-lg px-4 py-2 text-[#CAF0F8] placeholder-[#90E0EF]/50 focus:outline-none focus:border-[#00B4D8]"
          >
            <option value="">Select preferred time</option>
            <option value="morning">Morning (9AM - 12PM)</option>
            <option value="afternoon">Afternoon (12PM - 5PM)</option>
            <option value="evening">Evening (5PM - 8PM)</option>
            <option value="weekend">Weekends Only</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-[#CAF0F8] text-sm font-medium mb-2" htmlFor="purpose">
            Purpose/Use of Items
          </label>
          <textarea
            id="purpose"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            required
            rows="4"
            className="w-full bg-[#03045E]/30 border border-[#00B4D8]/30 rounded-lg px-4 py-2 text-[#CAF0F8] placeholder-[#90E0EF]/50 focus:outline-none focus:border-[#00B4D8]"
            placeholder="Explain how these items will be used and who will benefit"
          />
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
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <FaHandHoldingHeart className="w-5 h-5" />
              <span>Submit Request</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

const RecipientPage = () => {
  const { user } = useAuth();
  const [requestForm, setRequestForm] = useState({
    needType: '',
    description: '',
    urgencyLevel: 'normal',
    preferredLocation: '',
    contactMethod: 'email',
    specialRequirements: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeDonations, setActiveDonations] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [activeTab, setActiveTab] = useState('available');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    loadDonations();
  }, [user]);

  const loadDonations = () => {
    const allDonations = JSON.parse(localStorage.getItem('donations') || '[]');
    const matched = allDonations.filter(d => d.recipientId === user?.id);
    setActiveDonations(matched);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequestForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    const submitBtn = e.target.querySelector('button[type="submit"]');
    
    try {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<div class="w-6 h-6 border-2 border-t-transparent border-white rounded-full animate-spin mx-auto"></div>';

      await new Promise(resolve => setTimeout(resolve, 1500));

      const timestamp = new Date().toISOString();
      const newRequest = {
        ...requestForm,
        id: Date.now(),
        userId: user.id,
        status: 'PENDING',
        createdAt: timestamp,
        statusHistory: {
          PENDING: { timestamp, note: 'Assistance request submitted' }
        }
      };

      localStorage.setItem('assistance_requests', JSON.stringify([
        ...(JSON.parse(localStorage.getItem('assistance_requests') || '[]')),
        newRequest
      ]));

      setShowSuccess(true);
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Failed to submit request. Please try again.');
    } finally {
      setIsProcessing(false);
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Submit Request';
    }
  };

  const updateDonationStatus = (donationId) => {
    const statuses = ['MATCHED', 'VERIFIED', 'IN_TRANSIT', 'OUT_FOR_DELIVERY', 'RECEIVED'];
    const donations = [...activeDonations];
    const donationIndex = donations.findIndex(d => d.id === donationId);
    
    if (donationIndex !== -1) {
      const currentStatus = donations[donationIndex].status;
      const currentIndex = statuses.indexOf(currentStatus);
      const timestamp = new Date().toISOString();
      
      if (currentIndex < statuses.length - 1) {
        const newStatus = statuses[currentIndex + 1];
        donations[donationIndex] = {
          ...donations[donationIndex],
          status: newStatus,
          statusHistory: {
            ...donations[donationIndex].statusHistory || {},
            [newStatus]: { timestamp, note: `Status updated to ${newStatus}` }
          }
        };
        setActiveDonations(donations);
        setSelectedDonation(donations[donationIndex]);
        localStorage.setItem('donations', JSON.stringify(donations));
      }
    }
  };

  // Success view component
  const SuccessView = () => (
    <div className="text-center space-y-6 p-8 bg-[#4A1D18]/40 backdrop-blur-sm rounded-xl border border-[#A64B39]">
      <div className="w-20 h-20 mx-auto bg-[#D66D55]/10 rounded-full flex items-center justify-center">
        <FaHandHoldingHeart className="w-10 h-10 text-[#D66D55]" />
      </div>
      <h3 className="text-2xl font-bold text-[#E7C7BC]">Request Submitted!</h3>
      <p className="text-[#F7E6D5]">
        Your assistance request has been submitted successfully. We'll start matching you with potential donors right away.
      </p>
      <div className="pt-4">
        <button
          onClick={() => {
            setShowSuccess(false);
            setRequestForm({
              needType: '',
              description: '',
              urgencyLevel: 'normal',
              preferredLocation: '',
              contactMethod: 'email',
              specialRequirements: ''
            });
          }}
          className="px-6 py-3 bg-[#D66D55] text-white rounded-lg hover:bg-[#A64B39] transition-colors"
        >
          Submit Another Request
        </button>
      </div>
    </div>
  );

  const recipientSteps = [
    {
      icon: FaClipboardList,
      title: "1. Submit Request",
      description: "Tell us about your needs and how we can best support you."
    },
    {
      icon: FaHandHoldingHeart,
      title: "2. Get Matched",
      description: "We'll connect you with donors who can fulfill your requirements."
    },
    {
      icon: FaUserCheck,
      title: "3. Verify & Receive",
      description: "Complete a simple verification process to receive assistance."
    },
    {
      icon: FaHistory,
      title: "4. Track Status",
      description: "Stay updated on your request status and upcoming assistance."
    }
  ];

  const availableItems = [
    {
      id: 1,
      category: "Clothing",
      description: "Winter jackets and sweaters",
      condition: "Like New",
      donor: "John D.",
      location: "Downtown",
    },
    // ... more items
  ];

  return (
    <div className="min-h-screen py-16 px-4 bg-gradient-to-br from-[#03045E] via-[#0077B6] to-[#00B4D8]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-[#CAF0F8] mb-4">Available Donations</h1>
          <p className="text-[#90E0EF] max-w-2xl mx-auto">
            Browse through available items and request what you need. We'll connect you 
            with donors in your area.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="card p-1 inline-flex">
            <button
              onClick={() => setActiveTab('available')}
              className={`px-6 py-2 rounded-lg ${
                activeTab === 'available'
                  ? 'bg-[#00B4D8] text-[#CAF0F8]'
                  : 'text-[#90E0EF] hover:bg-[#00B4D8]/10'
              }`}
            >
              Available Items
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className={`px-6 py-2 rounded-lg ${
                activeTab === 'requests'
                  ? 'bg-[#00B4D8] text-[#CAF0F8]'
                  : 'text-[#90E0EF] hover:bg-[#00B4D8]/10'
              }`}
            >
              My Requests
            </button>
          </div>
        </div>

        {/* Items Grid */}
        {activeTab === 'available' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableItems.map((item) => (
              <div key={item.id} className="card p-6 hover:scale-105 transition-transform">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full text-sm bg-[#00B4D8]/20 text-[#CAF0F8] mb-2">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-semibold text-[#CAF0F8]">
                      {item.description}
                    </h3>
                  </div>
                  <button 
                    onClick={() => setSelectedItem(item)}
                    className="btn-icon"
                  >
                    <FaInfoCircle />
                  </button>
                </div>
                
                <div className="space-y-2 text-[#90E0EF] text-sm mb-4">
                  <p>Condition: {item.condition}</p>
                  <p>Location: {item.location}</p>
                  <p>Donor: {item.donor}</p>
                </div>

                <button
                  onClick={() => setSelectedItem(item)}
                  className="btn-primary w-full"
                >
                  Request Item
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="space-y-6">
            {[1, 2, 3].map((request) => (
              <div key={request} className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-[#CAF0F8] mb-1">
                      Request #{request}
                    </h3>
                    <p className="text-[#90E0EF]">Submitted on June 10, 2025</p>
                  </div>
                  <span className="px-4 py-1 rounded-full text-sm bg-[#00B4D8]/20 text-[#CAF0F8]">
                    Pending
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center text-[#90E0EF]">
                    <FaBox className="w-5 h-5 mr-2" />
                    <span>Winter Clothing Set</span>
                  </div>
                  <div className="flex items-center text-[#90E0EF]">
                    <FaMapMarkerAlt className="w-5 h-5 mr-2" />
                    <span>Downtown Area</span>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button className="btn-secondary">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Item Detail Modal */}
        {selectedItem && (
          <div className="fixed inset-0 bg-[#03045E]/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="card max-w-lg w-full mx-4 p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-[#CAF0F8] mb-2">
                    {selectedItem.description}
                  </h3>
                  <span className="inline-block px-3 py-1 rounded-full text-sm bg-[#00B4D8]/20 text-[#CAF0F8]">
                    {selectedItem.category}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="btn-icon"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="card bg-[#03045E]/40 p-4">
                  <h4 className="text-[#CAF0F8] font-medium mb-2">Item Details</h4>
                  <p className="text-[#90E0EF]">Condition: {selectedItem.condition}</p>
                  <p className="text-[#90E0EF]">Location: {selectedItem.location}</p>
                </div>
                <div className="card bg-[#03045E]/40 p-4">
                  <h4 className="text-[#CAF0F8] font-medium mb-2">Donor Information</h4>
                  <p className="text-[#90E0EF]">Name: {selectedItem.donor}</p>
                  <p className="text-[#90E0EF]">Member since: June 2025</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button className="btn-primary flex-1">
                  Confirm Request
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Request Form or Success View */}
        {selectedDonation ? (
          <div className="bg-[#4A1D18]/40 backdrop-blur-sm p-8 rounded-xl border border-[#A64B39]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-[#E7C7BC]">Track Your Donation</h2>
              <button
                onClick={() => setSelectedDonation(null)}
                className="text-[#D66D55] hover:text-[#A64B39] transition-colors"
              >
                Back to Requests
              </button>
            </div>

            <DonationTracker donation={selectedDonation} onStatusUpdate={updateDonationStatus} />

            {/* Donation Details */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#4A1D18]/60 rounded-lg">
                <div className="flex items-center gap-3">
                  <FaClock className="text-[#D66D55]" />
                  <div>
                    <p className="text-[#E7C7BC]">Last Updated</p>
                    <p className="text-[#F7E6D5]/60 text-sm">
                      {new Date(selectedDonation.statusHistory[selectedDonation.status]?.timestamp || selectedDonation.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                {selectedDonation.status !== 'RECEIVED' && (
                  <button
                    onClick={() => updateDonationStatus(selectedDonation.id)}
                    className="px-4 py-2 bg-[#D66D55] text-white rounded-lg hover:bg-[#A64B39] transition-colors"
                  >
                    Update Status
                  </button>
                )}
              </div>

              <div className="p-4 bg-[#4A1D18]/60 rounded-lg">
                <h3 className="text-[#E7C7BC] font-medium mb-2">Donation Information</h3>
                <div className="space-y-2 text-[#F7E6D5]/80 text-sm">
                  <p>Items: {selectedDonation.itemType}</p>
                  <p>Quantity: {selectedDonation.quantity} items</p>
                  <p>Delivery Address: {selectedDonation.deliveryAddress}</p>
                  {selectedDonation.specialInstructions && (
                    <p>Special Instructions: {selectedDonation.specialInstructions}</p>
                  )}
                </div>
              </div>

              <div className="p-4 bg-[#4A1D18]/60 rounded-lg">
                <h3 className="text-[#E7C7BC] font-medium mb-2">Status History</h3>
                <div className="space-y-2">
                  {Object.entries(selectedDonation.statusHistory || {}).reverse().map(([status, data]) => (
                    <div key={status} className="flex items-start gap-2 text-sm">
                      <div className="w-2 h-2 mt-1.5 rounded-full bg-[#D66D55]" />
                      <div>
                        <p className="text-[#E7C7BC]">{status.replace(/_/g, ' ').toLowerCase()}</p>
                        <p className="text-[#F7E6D5]/60">
                          {new Date(data.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : showSuccess ? (
          <SuccessView setShowTracking={() => setSelectedDonation(activeDonations[0])} />
        ) : (
          <div className="bg-[#4A1D18]/40 backdrop-blur-sm p-8 rounded-xl border border-[#A64B39]">
            <h2 className="text-2xl font-semibold text-[#E7C7BC] mb-6">Request Details</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#E7C7BC] mb-2">
                    Type of Need
                  </label>
                  <select
                    name="needType"
                    value={requestForm.needType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-[#4A1D18]/60 border border-[#A64B39] rounded-lg text-[#F7E6D5] focus:outline-none focus:ring-2 focus:ring-[#D66D55] focus:border-[#D66D55]"
                    required
                  >
                    <option value="">Select type of assistance</option>
                    <option value="food">Food Assistance</option>
                    <option value="clothing">Clothing</option>
                    <option value="education">Educational Support</option>
                    <option value="medical">Medical Supplies</option>
                    <option value="housing">Housing Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#E7C7BC] mb-2">
                    Urgency Level
                  </label>
                  <select
                    name="urgencyLevel"
                    value={requestForm.urgencyLevel}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-[#4A1D18]/60 border border-[#A64B39] rounded-lg text-[#F7E6D5] focus:outline-none focus:ring-2 focus:ring-[#D66D55] focus:border-[#D66D55]"
                    required
                  >
                    <option value="normal">Normal</option>
                    <option value="urgent">Urgent</option>
                    <option value="emergency">Emergency</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#E7C7BC] mb-2">
                    Description of Need
                  </label>
                  <textarea
                    name="description"
                    value={requestForm.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-2 bg-[#4A1D18]/60 border border-[#A64B39] rounded-lg text-[#F7E6D5] focus:outline-none focus:ring-2 focus:ring-[#D66D55] focus:border-[#D66D55]"
                    placeholder="Please describe your needs in detail..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#E7C7BC] mb-2">
                    Preferred Location
                  </label>
                  <input
                    type="text"
                    name="preferredLocation"
                    value={requestForm.preferredLocation}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-[#4A1D18]/60 border border-[#A64B39] rounded-lg text-[#F7E6D5] focus:outline-none focus:ring-2 focus:ring-[#D66D55] focus:border-[#D66D55]"
                    placeholder="Enter your preferred pickup/delivery location"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#E7C7BC] mb-2">
                    Preferred Contact Method
                  </label>
                  <select
                    name="contactMethod"
                    value={requestForm.contactMethod}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-[#4A1D18]/60 border border-[#A64B39] rounded-lg text-[#F7E6D5] focus:outline-none focus:ring-2 focus:ring-[#D66D55] focus:border-[#D66D55]"
                    required
                  >
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="app">In-App Message</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#E7C7BC] mb-2">
                    Special Requirements (Optional)
                  </label>
                  <textarea
                    name="specialRequirements"
                    value={requestForm.specialRequirements}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-2 bg-[#4A1D18]/60 border border-[#A64B39] rounded-lg text-[#F7E6D5] focus:outline-none focus:ring-2 focus:ring-[#D66D55] focus:border-[#D66D55]"
                    placeholder="Any special requirements or considerations we should know about..."
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full md:w-auto px-8 py-3 bg-[#D66D55] text-white rounded-lg hover:bg-[#A64B39] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <div className="w-6 h-6 border-2 border-t-transparent border-white rounded-full animate-spin mx-auto"></div>
                ) : (
                  'Submit Request'
                )}
              </button>
            </form>
          </div>
        )}

        {/* Active Donations Section */}
        {activeDonations.length > 0 && !selectedDonation && !showSuccess && (
          <div className="bg-[#4A1D18]/40 backdrop-blur-sm p-8 rounded-xl border border-[#A64B39]">
            <h2 className="text-2xl font-semibold text-[#E7C7BC] mb-6">Active Donations</h2>
            <div className="space-y-4">
              {activeDonations.map(donation => (
                <div key={donation.id} 
                  className="p-4 bg-[#4A1D18]/60 rounded-lg border border-[#A64B39] hover:border-[#D66D55] transition-colors cursor-pointer"
                  onClick={() => setSelectedDonation(donation)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-[#E7C7BC] font-medium">{donation.itemType}</h3>
                      <p className="text-[#F7E6D5]/60 text-sm">Status: {donation.status.replace(/_/g, ' ').toLowerCase()}</p>
                      <p className="text-[#F7E6D5]/60 text-sm">Last updated: {new Date(donation.statusHistory[donation.status]?.timestamp || donation.createdAt).toLocaleDateString()}</p>
                    </div>
                    <FaTruck className="text-[#D66D55]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipientPage;

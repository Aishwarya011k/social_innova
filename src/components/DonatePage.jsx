import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaBox, FaCalendarAlt, FaMapMarkerAlt, FaTruck, FaHandHoldingHeart, FaCheckCircle, FaClock, FaMapMarked, FaCamera, FaTag } from 'react-icons/fa';
import emailjs from 'emailjs-com';

const DonationCard = ({ icon: Icon, title, description }) => (
  <div className="bg-[#4A1D18]/40 backdrop-blur-sm p-6 rounded-xl border border-[#A64B39] hover:border-[#D66D55] transition-all">
    <div className="flex items-start space-x-4">
      <div className="p-3 bg-[#D66D55]/10 rounded-lg">
        <Icon className="w-6 h-6 text-[#D66D55]" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-[#E7C7BC] mb-2">{title}</h3>
        <p className="text-[#F7E6D5]/80">{description}</p>
      </div>
    </div>
  </div>
);

const TrackingTimeline = ({ donation, onStatusUpdate }) => {
  const steps = [
    { 
      icon: FaBox, 
      label: 'Donation Registered', 
      status: 'REGISTERED', 
      description: 'Your donation has been successfully registered in our system'
    },
    { 
      icon: FaCheckCircle, 
      label: 'Verified & Approved', 
      status: 'APPROVED',
      description: 'Donation details have been verified and approved' 
    },
    { 
      icon: FaTruck, 
      label: 'Pickup Scheduled', 
      status: 'PICKUP_SCHEDULED',
      description: 'A pickup has been scheduled for your items' 
    },
    { 
      icon: FaMapMarked, 
      label: 'In Transit', 
      status: 'IN_TRANSIT',
      description: 'Your donation is on its way to the recipient' 
    },
    { 
      icon: FaHandHoldingHeart, 
      label: 'Delivered', 
      status: 'DELIVERED',
      description: 'Your donation has been successfully delivered' 
    }
  ];

  const currentStepIndex = steps.findIndex(step => step.status === donation?.status) || 0;
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

const DonationForm = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    itemName: '',
    category: '',
    description: '',
    condition: '',
    quantity: '',
    pickupAddress: '',
    preferredPickupDate: '',
    images: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields (optional, for robustness)
    if (!formData.itemName || !formData.category || !formData.description || !formData.condition || !formData.quantity || !formData.pickupAddress || !formData.preferredPickupDate || !user?.email) {
      setIsSubmitting(false);
      alert('Please fill in all required fields, including your email.');
      return;
    }

    // Save donation data to localStorage
    const donation = {
      ...formData,
      userId: user?.id,
      userEmail: user?.email,
      createdAt: new Date().toISOString(),
    };
    const key = `donations_${user?.id}`;
    const prev = JSON.parse(localStorage.getItem(key) || '[]');
    localStorage.setItem(key, JSON.stringify([donation, ...prev]));

    // Send confirmation email via EmailJS
    try {
      await emailjs.send(
        'service_wtrosdm',
        'template_k0yo6uc',
        {
          name: user?.name || user?.email,
          email: user?.email,
        },
        'zSMQbdDSAnIxY3lWn'
      );
    } catch (err) {
      // Optionally handle email error
    }

    setIsSubmitting(false);
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      setFormData({
        itemName: '',
        category: '',
        description: '',
        condition: '',
        quantity: '',
        pickupAddress: '',
        preferredPickupDate: '',
        images: []
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

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  if (showSuccess) {
    return (
      <div className="bg-[#03045E]/30 backdrop-blur-md p-8 rounded-xl border border-[#00B4D8]/30">
        <div className="text-center">
          <FaCheckCircle className="w-16 h-16 text-[#00B4D8] mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-[#CAF0F8] mb-2">Donation Submitted!</h3>
          <p className="text-[#90E0EF]">Thank you for your generosity. We'll be in touch soon to arrange pickup.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[#CAF0F8] text-sm font-medium mb-2" htmlFor="itemName">
            Item Name
          </label>
          <input
            type="text"
            id="itemName"
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
            required
            className="w-full bg-[#03045E]/30 border border-[#00B4D8]/30 rounded-lg px-4 py-2 text-[#CAF0F8] placeholder-[#90E0EF]/50 focus:outline-none focus:border-[#00B4D8]"
            placeholder="Enter item name"
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

        <div className="md:col-span-2">
          <label className="block text-[#CAF0F8] text-sm font-medium mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full bg-[#03045E]/30 border border-[#00B4D8]/30 rounded-lg px-4 py-2 text-[#CAF0F8] placeholder-[#90E0EF]/50 focus:outline-none focus:border-[#00B4D8]"
            placeholder="Describe your item(s)"
          />
        </div>

        <div>
          <label className="block text-[#CAF0F8] text-sm font-medium mb-2" htmlFor="condition">
            Condition
          </label>
          <select
            id="condition"
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            required
            className="w-full bg-[#03045E]/30 border border-[#00B4D8]/30 rounded-lg px-4 py-2 text-[#CAF0F8] placeholder-[#90E0EF]/50 focus:outline-none focus:border-[#00B4D8]"
          >
            <option value="">Select condition</option>
            <option value="new">New</option>
            <option value="likeNew">Like New</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
          </select>
        </div>

        <div>
          <label className="block text-[#CAF0F8] text-sm font-medium mb-2" htmlFor="quantity">
            Quantity
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

        <div className="md:col-span-2">
          <label className="block text-[#CAF0F8] text-sm font-medium mb-2" htmlFor="pickupAddress">
            Pickup Address
          </label>
          <textarea
            id="pickupAddress"
            name="pickupAddress"
            value={formData.pickupAddress}
            onChange={handleChange}
            required
            rows="2"
            className="w-full bg-[#03045E]/30 border border-[#00B4D8]/30 rounded-lg px-4 py-2 text-[#CAF0F8] placeholder-[#90E0EF]/50 focus:outline-none focus:border-[#00B4D8]"
            placeholder="Enter pickup address"
          />
        </div>

        <div>
          <label className="block text-[#CAF0F8] text-sm font-medium mb-2" htmlFor="preferredPickupDate">
            Preferred Pickup Date
          </label>
          <input
            type="date"
            id="preferredPickupDate"
            name="preferredPickupDate"
            value={formData.preferredPickupDate}
            onChange={handleChange}
            required
            className="w-full bg-[#03045E]/30 border border-[#00B4D8]/30 rounded-lg px-4 py-2 text-[#CAF0F8] placeholder-[#90E0EF]/50 focus:outline-none focus:border-[#00B4D8]"
          />
        </div>

        <div>
          <label className="block text-[#CAF0F8] text-sm font-medium mb-2" htmlFor="images">
            Upload Images
          </label>
          <div className="flex items-center space-x-2">
            <label className="flex-1 cursor-pointer bg-[#03045E]/30 border border-[#00B4D8]/30 rounded-lg px-4 py-2 hover:bg-[#0077B6]/20">
              <input
                type="file"
                id="images"
                name="images"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <div className="flex items-center justify-center text-[#90E0EF]">
                <FaCamera className="mr-2" />
                <span>Add Photos</span>
              </div>
            </label>
            <span className="text-[#90E0EF] text-sm">
              {formData.images.length} files selected
            </span>
          </div>
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
              <span>Submit Donation</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

const DonatePage = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#CAF0F8] mb-4">Donate Items</h1>
          <p className="text-[#90E0EF] text-lg max-w-2xl mx-auto">
            Your generosity makes a difference. Fill out the form below to start your donation process.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <DonationCard
            icon={FaBox}
            title="Easy Process"
            description="Simple form submission and convenient pickup scheduling"
          />
          <DonationCard
            icon={FaTruck}
            title="Free Pickup"
            description="We'll collect donations from your location at no cost"
          />
          <DonationCard
            icon={FaTag}
            title="Tax Deductible"
            description="Get tax benefits for your charitable contributions"
          />
        </div>

        <div className="bg-[#03045E]/30 backdrop-blur-md p-8 rounded-xl border border-[#00B4D8]/30">
          <DonationForm />
        </div>
      </div>
    </div>
  );
};

export default DonatePage;

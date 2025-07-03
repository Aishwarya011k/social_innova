import React, { useState } from 'react';
import { FaCreditCard, FaLock, FaCheck, FaMobile } from 'react-icons/fa';
import { SiGooglepay, SiPhonepe } from 'react-icons/si';

// Test Credit Cards (for testing only):
// Visa: 4111 1111 1111 1111 or 4242 4242 4242 4242
// MasterCard: 5555 5555 5555 4444 or 5105 1051 0510 5100
// American Express: 3714 496353 98431 or 3782 822463 10005
// Note: These are test numbers and won't charge real cards

const PaymentForm = ({ amount, onPaymentComplete, onCancel }) => {
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolderName: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card', 'gpay', or 'phonepe'
  const [mobileNumber, setMobileNumber] = useState('');
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    }
    // Format expiry date
    if (name === 'expiryDate') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d{0,2})/, '$1/$2')
        .substring(0, 5);
    }
    // Limit CVV to 3-4 digits
    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substring(0, 4);
    }

    setPaymentDetails(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  // Luhn algorithm for card validation
  const validateCardNumber = (number) => {
    const strippedNumber = number.replace(/\s/g, '');
    
    // Check if it's a valid length
    if (!/^\d{15,16}$/.test(strippedNumber)) {
      return false;
    }

    let sum = 0;
    let isEven = false;
    
    // Loop from right to left
    for (let i = strippedNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(strippedNumber[i], 10);

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  };

  const validateExpiryDate = (expiry) => {
    const [month, year] = expiry.split('/').map(Number);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    return (
      month >= 1 && 
      month <= 12 && 
      year >= currentYear && 
      (year > currentYear || month >= currentMonth)
    );
  };

  const validateForm = () => {
    const newErrors = {};
    const cardNumber = paymentDetails.cardNumber.replace(/\s/g, '');
    const cardType = getCardType(cardNumber);

    // Validate card number length based on type
    const isValidLength = cardType === 'American Express' ? 
      cardNumber.length === 15 : 
      cardNumber.length === 16;

    if (!isValidLength) {
      newErrors.cardNumber = `Please enter a valid ${cardType === 'American Express' ? '15' : '16'}-digit card number`;
    } else if (!validateCardNumber(cardNumber)) {
      newErrors.cardNumber = 'Invalid card number, please check and try again';
    }

    if (!paymentDetails.expiryDate.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
      newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
    } else if (!validateExpiryDate(paymentDetails.expiryDate)) {
      newErrors.expiryDate = 'Card has expired';
    }

    if (!paymentDetails.cvv.match(/^\d{3,4}$/)) {
      newErrors.cvv = 'Please enter a valid CVV';
    }

    if (!paymentDetails.cardHolderName.trim()) {
      newErrors.cardHolderName = 'Please enter the cardholder name';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (paymentMethod === 'card' && !validateForm()) {
      return;
    }
    if ((paymentMethod === 'gpay' || paymentMethod === 'phonepe') && !validateMobileNumber()) {
      return;
    }

    setIsProcessing(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSuccess(true);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Show success animation
      onPaymentComplete({
        method: paymentMethod,
        ...(paymentMethod === 'card' ? {
          last4: paymentDetails.cardNumber.slice(-4),
          cardType: getCardType(paymentDetails.cardNumber)
        } : {
          mobileNumber: mobileNumber.slice(-4)
        })
      });
    } catch (error) {
      setErrors({ submit: 'Payment failed. Please try again.' });
    } finally {
      setIsProcessing(false);
    }
  };

  const validateMobileNumber = () => {
    if (!/^\d{10}$/.test(mobileNumber)) {
      setErrors({ mobileNumber: 'Please enter a valid 10-digit mobile number' });
      return false;
    }
    setErrors({});
    return true;
  };

  const getCardType = (number) => {
    const firstTwo = number.replace(/\s/g, '').slice(0, 2);
    
    // More accurate card type detection
    if (number.startsWith('4')) {
      return 'Visa';
    } else if (/^5[1-5]/.test(firstTwo)) {
      return 'MasterCard';
    } else if (/^3[47]/.test(firstTwo)) {
      return 'American Express';
    }
    return 'Credit Card';
  };

  return (
    <div className="p-6 bg-[#1B2B3F] rounded-lg border border-[#4299E1]/20 shadow-lg max-w-md w-full mx-auto">
      {isSuccess ? (
        <div className="text-center py-8">
          <div className="mx-auto w-16 h-16 bg-[#4299E1]/20 rounded-full flex items-center justify-center mb-4">
            <FaCheck className="text-[#4299E1] text-3xl" />
          </div>
          <h3 className="text-[#E2E8F0] text-xl font-semibold mb-2">Payment Successful!</h3>
          <p className="text-[#A0AEC0] mb-6">Thank you for your contribution.</p>
          <button
            onClick={onPaymentComplete}
            className="btn-primary w-full"
          >
            Continue
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold text-[#E2E8F0] mb-6">Payment Details</h2>
          
          {/* Payment Method Selection */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <button
              type="button"
              onClick={() => setPaymentMethod('card')}
              className={`btn-outlined flex flex-col items-center justify-center p-4 ${
                paymentMethod === 'card' ? 'active-glow border-[#4299E1]' : ''
              }`}
            >
              <FaCreditCard className="text-2xl mb-2" />
              <span className="text-sm">Card</span>
            </button>
            
            <button
              type="button"
              onClick={() => setPaymentMethod('gpay')}
              className={`btn-outlined flex flex-col items-center justify-center p-4 ${
                paymentMethod === 'gpay' ? 'active-glow border-[#4299E1]' : ''
              }`}
            >
              <SiGooglepay className="text-2xl mb-2" />
              <span className="text-sm">GPay</span>
            </button>
            
            <button
              type="button"
              onClick={() => setPaymentMethod('phonepe')}
              className={`btn-outlined flex flex-col items-center justify-center p-4 ${
                paymentMethod === 'phonepe' ? 'active-glow border-[#4299E1]' : ''
              }`}
            >
              <SiPhonepe className="text-2xl mb-2" />
              <span className="text-sm">PhonePe</span>
            </button>
          </div>

          {/* Card Payment Fields */}
          {paymentMethod === 'card' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#E2E8F0] mb-1">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={paymentDetails.cardNumber}
                  onChange={handleChange}
                  placeholder="1234 5678 9012 3456"
                  className="input-field w-full"
                  maxLength="19"
                />
                {errors.cardNumber && (
                  <p className="text-[#4299E1] text-sm mt-1">{errors.cardNumber}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#E2E8F0] mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={paymentDetails.expiryDate}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    className="input-field w-full"
                    maxLength="5"
                  />
                  {errors.expiryDate && (
                    <p className="text-[#4299E1] text-sm mt-1">{errors.expiryDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#E2E8F0] mb-1">
                    CVV
                  </label>
                  <input
                    type="password"
                    name="cvv"
                    value={paymentDetails.cvv}
                    onChange={handleChange}
                    placeholder="123"
                    className="input-field w-full"
                    maxLength="4"
                  />
                  {errors.cvv && (
                    <p className="text-[#4299E1] text-sm mt-1">{errors.cvv}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#E2E8F0] mb-1">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  name="cardHolderName"
                  value={paymentDetails.cardHolderName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="input-field w-full"
                />
                {errors.cardHolderName && (
                  <p className="text-[#4299E1] text-sm mt-1">{errors.cardHolderName}</p>
                )}
              </div>
            </div>
          )}

          {/* Mobile Payment Fields */}
          {(paymentMethod === 'gpay' || paymentMethod === 'phonepe') && (
            <div>
              <label className="block text-sm font-medium text-[#E2E8F0] mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="Enter your mobile number"
                className="input-field w-full"
                maxLength="10"
              />
              {errors.mobileNumber && (
                <p className="text-[#4299E1] text-sm mt-1">{errors.mobileNumber}</p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 flex gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary flex-1"
              disabled={isProcessing}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary flex-1 flex items-center justify-center gap-2"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <FaLock className="text-sm" />
                  <span>Pay {amount}</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PaymentForm;














import React, { useState, useRef } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

const OTPVerification = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const [verificationStatus, setVerificationStatus] = useState('');
  const inputRefs = useRef([]);

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    // Simulate sending OTP to the phone number
    // In a real application, you would make an API call here
    if (phoneNumber.length >= 10) {
      setShowOTPInput(true);
      setVerificationStatus('OTP sent successfully!');
    }
  };

  const handleOTPChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOTPValues = [...otpValues];
      newOTPValues[index] = value;
      setOtpValues(newOTPValues);

      // Auto-focus next input
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerifyOTP = () => {
    const enteredOTP = otpValues.join('');
    // In a real application, you would verify this OTP with your backend
    if (enteredOTP.length === 6) {
      // Simulate OTP verification
      setVerificationStatus('Verified successfully!');
    } else {
      setVerificationStatus('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-6">
      {!showOTPInput ? (
        <form onSubmit={handlePhoneSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Send OTP
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Enter OTP</h2>
            <p className="text-sm text-gray-600">
              We've sent a code to {phoneNumber}
            </p>
          </div>
          <div className="flex justify-center gap-2">
            {otpValues.map((value, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                className="w-12 h-12 text-center border rounded-lg text-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={value}
                onChange={(e) => handleOTPChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
              />
            ))}
          </div>
          <button
            onClick={handleVerifyOTP}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Verify OTP
          </button>
          {verificationStatus && (
            <div className={`flex items-center gap-2 justify-center ${
              verificationStatus.includes('successfully') ? 'text-green-600' : 'text-red-600'
            }`}>
              {verificationStatus.includes('successfully') ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              <span>{verificationStatus}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OTPVerification;
import { useState } from 'react';

const OTPVerification = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSendOTP = async () => {
    try {
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone_number: phoneNumber })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStep('otp');
        setMessage('OTP sent successfully!');
        setError('');
      } else {
        setError(data.error || 'Failed to send OTP');
      }
    } catch (err) {
      setError('Failed to connect to server');
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone_number: phoneNumber, otp })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage('Phone number verified successfully!');
        setError('');
      } else {
        setError(data.error || 'Invalid OTP');
      }
    } catch (err) {
      setError('Failed to connect to server');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Phone Verification</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {message && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {message}
        </div>
      )}

      {step === 'phone' ? (
        <div className="space-y-4">
          <input
            type="tel"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            onClick={handleSendOTP} 
            disabled={!phoneNumber}
            className="w-full bg-blue-500 text-white p-2 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600"
          >
            Send OTP
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            onClick={handleVerifyOTP}
            disabled={!otp}
            className="w-full bg-blue-500 text-white p-2 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600"
          >
            Verify OTP
          </button>
        </div>
      )}
    </div>
  );
};

export default OTPVerification;
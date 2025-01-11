"use client";

import React, { useEffect, useRef } from 'react';

const QRCodeGenerator = () => {
  const qrContainerRef = useRef(null);
  const qrInstanceRef = useRef(null);
  
  useEffect(() => {
    // Load QRCode.js script
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
    script.async = true;
    
    script.onload = () => {
      // Initialize QR code after script loads
      if (qrContainerRef.current && window.QRCode) {
        qrInstanceRef.current = new window.QRCode(qrContainerRef.current, {
          text: ' ',
          width: 200,
          height: 200,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: window.QRCode.CorrectLevel.H
        });
      }
    };
    
    document.body.appendChild(script);
    
    // Cleanup
    return () => {
      document.body.removeChild(script);
      if (qrInstanceRef.current) {
        qrContainerRef.current.innerHTML = '';
        qrInstanceRef.current = null;
      }
    };
  }, []);
  
  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value && qrInstanceRef.current) {
      qrInstanceRef.current.clear();
      qrInstanceRef.current.makeCode(value);
    }
  };
  
  return (
    <div className="text-center p-5">
      <h1 className="text-2xl font-bold mb-4">QR Code Generator</h1>
      <input
        type="text"
        placeholder="Enter public address"
        onChange={handleInputChange}
        className="px-4 py-2 w-72 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5"
      />
      <div 
        ref={qrContainerRef}
        className="flex justify-center"
      />
    </div>
  );
};

export default QRCodeGenerator;
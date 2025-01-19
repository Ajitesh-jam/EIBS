'use client';

import { checkTicketOwnership } from "@/components/utils/web3Final.js";
import Navbar from "@/components/Navbar/Navbar";
import React, { useState, useEffect } from "react";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <QRScanner />
    </div>
  );
};

const QRScanner = () => {
  const [scannedText, setScannedText] = useState('');
  const [isScanning, setIsScanning] = useState(true);
  const [eventId, setEventId] = useState(1);
  const [ownershipStatus, setOwnershipStatus] = useState(null);
  const [error, setError] = useState(null);

  // Validate Ethereum address
  const isValidEthereumAddress = (address) => /^0x[a-fA-F0-9]{40}$/.test(address);

  useEffect(() => {
    const checkOwner = async () => {
      setError(null);
      
      if (!isValidEthereumAddress(scannedText)) {
        setError("Invalid Ethereum address scanned.");
        setOwnershipStatus(null);
        return;
      }

      try {
        const hasTicket = await checkTicketOwnership(eventId, scannedText);
        
        if (hasTicket === 2) {
          setOwnershipStatus("Tickets not yet distributed");
        } else {
          setOwnershipStatus(hasTicket === 1 ? "You own this ticket!" : "You do not own this ticket!");
        }
      } catch (error) {
        setError(`Error checking ticket ownership: ${error.message}`);
        setOwnershipStatus(null);
      }
    };

    if (scannedText) {
      checkOwner();
    }
  }, [scannedText, eventId]);

  useEffect(() => {
    let html5QrCode;

    const initializeScanner = async () => {
      try {
        const script = document.createElement('script');
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/html5-qrcode/2.3.4/html5-qrcode.min.js";
        script.async = true;

        script.onload = () => {
          html5QrCode = new Html5Qrcode("qr-reader");
          startScanning(html5QrCode);
        };

        document.body.appendChild(script);
      } catch (err) {
        setError(`Error loading QR scanner: ${err.message}`);
      }
    };

    const startScanning = async (scanner) => {
      try {
        await scanner.start(
          { facingMode: "environment" },
          { 
            fps: 10, 
            qrbox: { width: 250, height: 250 } 
          },
          (decodedText) => {
            setScannedText(decodedText);
            setIsScanning(false);
            scanner.stop();
          },
          (error) => {
            console.warn("QR Scanning error:", error);
          }
        );
      } catch (err) {
        setError(`Error starting scanner: ${err.message}`);
      }
    };

    initializeScanner();

    return () => {
      if (html5QrCode) {
        html5QrCode.stop().catch(console.error);
      }
    };
  }, []);

  const handleEventIdChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setEventId(value);
  };

  return (
    <div className="flex flex-col items-center p-4 max-w-xl mx-auto">
      <div className="w-full mb-6">
        <label htmlFor="eventId" className="block text-sm font-medium text-gray-700 mb-2">
          Event ID
        </label>
        <input
          id="eventId"
          type="number"
          value={eventId}
          onChange={handleEventIdChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          min="1"
        />
      </div>

      <h1 className="text-2xl font-bold mb-6">QR Code Scanner</h1>
      <p className="text-gray-600 mb-4">Scan a QR code to check ticket ownership</p>
      
      <div id="qr-reader" className="w-full max-w-sm mb-4" />

      {error && (
        <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {scannedText && (
        <div className="w-full">
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <h2 className="text-lg font-semibold mb-2">Scanned Address:</h2>
            <p className="break-words font-mono">{scannedText}</p>
            {ownershipStatus && (
              <p className={`mt-2 font-semibold ${
                ownershipStatus.includes("own") ? "text-green-500" : "text-red-500"
              }`}>
                {ownershipStatus}
              </p>
            )}
          </div>
        </div>
      )}

      {isScanning && (
        <p className="text-gray-600 mt-4">Position a QR code in front of your camera</p>
      )}
    </div>
  );
};

export default Home;
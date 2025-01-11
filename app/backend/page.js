
'use client'
//import web3 from components/utils/web3.js
import { getAccounts,createEvent, buyTicket, sellTicket, getTicketPrice, getSellingTicketPrice, checkTicketOwnership, events } from "@/components/utils/web3.js";
import { Card } from "@/components/utils/card/card";

import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";

const Home = () => {
    return(
        <>
        <Navbar/>
        <QRScanner/>
        </>
    );
  }
  
  export default Home;


import React, { useState, useEffect } from 'react';

const QRScanner = () => {
    const [scannedText, setScannedText] = useState('');
    const [isScanning, setIsScanning] = useState(true);
  
    useEffect(() => {
      // Load the HTML5-QRCode library
      const script = document.createElement('script');
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/html5-qrcode/2.3.4/html5-qrcode.min.js";
      script.async = true;
  
      script.onload = () => {
        const html5QrCode = new Html5Qrcode("qr-reader");
        
        const startScanning = async () => {
          try {
            await html5QrCode.start(
              { facingMode: "environment" }, // Use back camera
              {
                fps: 10,
                qrbox: { width: 250, height: 250 },
              },
              (decodedText) => {
                // QR Code scanned successfully
                setScannedText(decodedText);
                setIsScanning(false);
                html5QrCode.stop();
              },
              (error) => {
                // Ignore errors during scanning
                console.log(error);
              }
            );
          } catch (err) {
            console.error("Error starting scanner:", err);
          }
        };
  
        startScanning();
      };
  
      document.body.appendChild(script);
  
      return () => {
        document.body.removeChild(script);
      };
    }, []);
  
    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(scannedText);
        alert('Text copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy text:', err);
      }
    };
  
    return (
      <div className="flex flex-col items-center p-4">
        <h1 className="text-2xl font-bold mb-6">QR Code Scanner</h1>
        
        <div 
          id="qr-reader" 
          className="w-full max-w-sm mb-4"
        />
        
        {scannedText && (
          <div className="w-full max-w-sm">
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <h2 className="text-lg font-semibold mb-2">Scanned Text:</h2>
              <p className="break-words">{scannedText}</p>
            </div>
            
            <button
              onClick={handleCopy}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Copy Text
            </button>
          </div>
        )}
        
        {isScanning && (
          <p className="text-gray-600 mt-4">
            Position a QR code in front of your camera
          </p>
        )}
      </div>
    );
  };
'use client'
import React, { useEffect, useState, useRef } from 'react';
import './Homepage.css';
import Navbar from '@/components/Navbar/Navbar';
import { getAccounts } from '@/components/utils/web3';


const Homepage = () => {
    const[account,setConnected]= useState("");

    // Fetch events (replace `events` with your API function or mock it)
    useEffect(()=>{
        async function fetch(){
        const acc=await getAccounts();
        console.log("connceted acc: ",acc);
        setConnected(acc);
    }
    fetch();
    },[])

    return (
        <div className="Homepage-container">
            <Navbar />
           <QRCodeGenerator account={account}/>
        </div>
    );
};

export default Homepage;

const QRCodeGenerator = ({ account }) => {
    const qrContainerRef = useRef(null);
    const qrInstanceRef = useRef(null);
  
    useEffect(() => {
      // Load QRCode.js script
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
      script.async = true;
  
      script.onload = () => {
        // Initialize QR code instance
        if (qrContainerRef.current && window.QRCode) {
          qrInstanceRef.current = new window.QRCode(qrContainerRef.current, {
            text: account || ' ',
            width: 200,
            height: 200,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: window.QRCode.CorrectLevel.H,
          });
        }
      };
  
      document.body.appendChild(script);
  
      // Cleanup
      return () => {
        document.body.removeChild(script);
        if (qrInstanceRef.current) {
          qrContainerRef.current.innerHTML = '';
        }
        qrInstanceRef.current = null;
      };
    }, []);
  
    useEffect(() => {
      // Update QR code when account changes
      if (qrInstanceRef.current && account) {
        qrInstanceRef.current.clear();
        qrInstanceRef.current.makeCode(String(account));
      }
    }, [account]);
  
    return (
      <div className="text-center p-5">
        <h1 className="text-2xl font-bold mb-4">QR Code Generator</h1>
        <p className="mb-5">Public Address: {account}</p>
        <div 
          ref={qrContainerRef}
          className="flex justify-center"
        />
      </div>
    );
  };
  
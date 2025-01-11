
// 'use client'
// //import web3 from components/utils/web3.js
// import { checkTicketOwnership } from "@/components/utils/web3.js";
// import { Card } from "@/components/utils/card/card";

// import Link from "next/link";
// import Navbar from "@/components/Navbar/Navbar";



// const Home = () => {
//     return(
//         <>
//         <Navbar/>
//         <QRScanner/>
//         </>
//     );
//   }
  
//   export default Home;


// import React, { useState, useEffect } from 'react';

// const QRScanner = () => {
//     const [scannedText, setScannedText] = useState('');
//     const [isScanning, setIsScanning] = useState(true);
//     const [eventId,setEventID] = useState(0);

//     useEffect(() => {
//       async function checkOwner(){
//         const hasTicket =await  checkTicketOwnership(eventId,scannedText);
//         if(hasTicket){
//           console.log("You own this ticket!");
//           } else {
//             console.log("You do not own this ticket!");
//           }
        
//       }
//       checkOwner();
//     },[scannedText, setScannedText]);


  
//     useEffect(() => {
//       // Load the HTML5-QRCode library
//       const script = document.createElement('script');
//       script.src = "https://cdnjs.cloudflare.com/ajax/libs/html5-qrcode/2.3.4/html5-qrcode.min.js";
//       script.async = true;
  
//       script.onload = () => {
//         const html5QrCode = new Html5Qrcode("qr-reader");
        
//         const startScanning = async () => {
//           try {
//             await html5QrCode.start(
//               { facingMode: "environment" }, // Use back camera
//               {
//                 fps: 10,
//                 qrbox: { width: 250, height: 250 },
//               },
//               (decodedText) => {
//                 // QR Code scanned successfully
//                 setScannedText(decodedText);
//                 setIsScanning(false);
//                 html5QrCode.stop();
//               },
//               (error) => {
//                 // Ignore errors during scanning
//                 console.log(error);
//               }
//             );
//           } catch (err) {
//             console.error("Error starting scanner:", err);
//           }
//         };
  
//         startScanning();
//       };
  
//       document.body.appendChild(script);
  
//       return () => {
//         document.body.removeChild(script);
//       };
//     }, []);
  
//     const handleCopy = async () => {
//       try {
//         await navigator.clipboard.writeText(scannedText);
//         alert('Text copied to clipboard!');
//       } catch (err) {
//         console.error('Failed to copy text:', err);
//       }
//     };
  
//     return (
//       <div className="flex flex-col items-center p-4">
//         <h1 className="text-2xl font-bold mb-6">QR Code Scanner</h1>
        
//         <div 
//           id="qr-reader" 
//           className="w-full max-w-sm mb-4"
//         />
        
//         {scannedText && (
//           <div className="w-full max-w-sm">
//             <div className="bg-gray-100 p-4 rounded-lg mb-4">
//               <h2 className="text-lg font-semibold mb-2">Scanned Text:</h2>
//               <p className="break-words">{scannedText}</p>
//             </div>
            
//             <button
//               onClick={handleCopy}
//               className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
//             >
//               Copy Text
//             </button>
//           </div>
//         )}
        
//         {isScanning && (
//           <p className="text-gray-600 mt-4">
//             Position a QR code in front of your camera
//           </p>
//         )}




//       </div>
//     );
//   };

'use client';

import { checkTicketOwnership } from "@/components/utils/web3.js";
import Navbar from "@/components/Navbar/Navbar";
import React, { useState, useEffect } from "react";

const Home = () => {
  return (
    <>
      <Navbar />
      <QRScanner />
    </>
  );
};

const QRScanner = () => {
  const [scannedText, setScannedText] = useState('');
  const [isScanning, setIsScanning] = useState(true);
  const [eventId, setEventId] = useState(0);
  const [ownershipStatus, setOwnershipStatus] = useState(null);

  // Validate Ethereum address
  const isValidEthereumAddress = (address) => /^0x[a-fA-F0-9]{40}$/.test(address);

  useEffect(() => {
    const checkOwner = async () => {
      if (!isValidEthereumAddress(scannedText)) {
        console.error("Invalid Ethereum address scanned.");
        setOwnershipStatus(null);
        return;
      }

      try {
        const hasTicket = await checkTicketOwnership(eventId, scannedText);
        setOwnershipStatus(hasTicket ? "You own this ticket!" : "You do not own this ticket!");
      } catch (error) {
        console.error("Error checking ticket ownership:", error);
      }
    };

    if (scannedText) {
      checkOwner();
    }
  }, [scannedText, eventId]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/html5-qrcode/2.3.4/html5-qrcode.min.js";
    script.async = true;

    script.onload = () => {
      const html5QrCode = new Html5Qrcode("qr-reader");

      const startScanning = async () => {
        try {
          await html5QrCode.start(
            { facingMode: "environment" }, // Use back camera
            { fps: 10, qrbox: { width: 250, height: 250 } },
            (decodedText) => {
              setScannedText(decodedText);
              setIsScanning(false);
              html5QrCode.stop();
            },
            (error) => {
              console.log("Scanning error:", error);
            }
          );
        } catch (err) {
          console.error("Error starting scanner:", err);
        }
      };

      startScanning();
    };

    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-6">QR Code Scanner</h1>
      <div id="qr-reader" className="w-full max-w-sm mb-4" />
      {scannedText && (
        <div className="w-full max-w-sm">
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <h2 className="text-lg font-semibold mb-2">Scanned Address:</h2>
            <p className="break-words">{scannedText}</p>
            {ownershipStatus && <p className="text-green-500 mt-2">{ownershipStatus}</p>}
          </div>
        </div>
      )}
      {isScanning && <p className="text-gray-600 mt-4">Position a QR code in front of your camera</p>}
    </div>
  );
};

export default Home;
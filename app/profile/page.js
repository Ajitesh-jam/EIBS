'use client'
import React, { useEffect, useState, useRef } from 'react';
import './Homepage.css';
import Navbar from '@/components/Navbar/Navbar';
import { getAccounts } from '@/components/utils/web3';
import RotatingText from '@/components/RotatingText/RotatingText';
import ClipBoard from '@/components/CopyClipboard/CopyClipboard';
import { triggerConfetti } from '@/components/CanvasConfetti/CanvasConfetti';
import confetti from 'canvas-confetti';
import Preloader from '@/components/Preloader/Preloader';
import OTPVerification from '@/components/OTP_SYSTEM/OTPSystem';
import CountdownTimer from '@/components/Time_Left_Card/CountdownTimer';
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
           <RotatingText/>
           <ClipBoard/>
           <ButtonWithConfetti/>
           <Preloader/>
           <CountdownTimer/>
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
  
  const ButtonWithConfetti = () => {
    const handleButtonClick = () => {
      triggerConfetti(); // Call the confetti function on button click
    };
  
    return (
      <button className="confetti-button" onClick={handleButtonClick}>
        Celebrate 🎉
      </button>
    );
  };






const BouncingNoteLoader = () => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const [currentNote, setCurrentNote] = useState('♪');

  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Toggle between different musical notes
  useEffect(() => {
    const notes = ['♪', '♫'];
    const noteInterval = setInterval(() => {
      setCurrentNote(prev => (prev === notes[0] ? notes[1] : notes[0]));
    }, 800); // Change note every bounce cycle

    return () => clearInterval(noteInterval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="w-64 space-y-4">
        {/* Container for note and splash */}
        <div className="relative h-32 flex justify-center">
          {/* Bouncing note */}
          <div
            className="text-3xl text-purple-500 font-bold absolute"
            style={{
              animation: 'bounce-note 0.8s ease-in-out infinite',
              animationDirection: 'alternate',
            }}
            onAnimationIteration={() => {
              setShowSplash(true);
              setTimeout(() => setShowSplash(false), 300);
            }}
          >
            {currentNote}
          </div>

          {/* Splash effect */}
          {showSplash && (
            <div className="absolute bottom-8 flex justify-center">
              <svg width="40" height="10" viewBox="0 0 40 10">
                {/* Left splash */}
                <path
                  d="M20 0 L10 0 Q15 5 20 0"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="2"
                  className="animate-splash-left"
                />
                {/* Right splash */}
                <path
                  d="M20 0 L30 0 Q25 5 20 0"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="2"
                  className="animate-splash-right"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Progress bar container */}
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Loading percentage */}
        <div className="text-center text-purple-300 font-semibold">
          {progress}%
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-note {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-48px) rotate(10deg);
          }
          100% {
            transform: translateY(0) rotate(0deg);
          }
        }

        @keyframes splash-left {
          0% {
            transform: scaleX(0) translateX(0);
            opacity: 1;
          }
          100% {
            transform: scaleX(1) translateX(-10px);
            opacity: 0;
          }
        }

        @keyframes splash-right {
          0% {
            transform: scaleX(0) translateX(0);
            opacity: 1;
          }
          100% {
            transform: scaleX(1) translateX(10px);
            opacity: 0;
          }
        }

        .animate-splash-left {
          animation: splash-left 0.3s ease-out forwards;
        }

        .animate-splash-right {
          animation: splash-right 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

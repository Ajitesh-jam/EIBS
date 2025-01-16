import React, { useState, useEffect } from 'react';
import "./CountdownTimer.css"
const CountdownTimer = ({ targetDate = "2025-01-31" }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [updating, setUpdating] = useState({
    days: false,
    hours: false,
    minutes: false,
    seconds: false
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate) - new Date();
      
      if (difference > 0) {
        const newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        };

        // Check which values changed to trigger animations
        Object.entries(newTimeLeft).forEach(([key, value]) => {
          if (timeLeft[key] !== value) {
            setUpdating(prev => ({ ...prev, [key]: true }));
            setTimeout(() => {
              setUpdating(prev => ({ ...prev, [key]: false }));
            }, 300);
          }
        });

        setTimeLeft(newTimeLeft);
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft(); // Initial calculation

    return () => clearInterval(timer);
  }, [targetDate]); // Removed timeLeft from dependencies

  const TimeUnit = ({ value, label, isUpdating }) => (
    <div className="time-unit">
      <div className={`time-value ${isUpdating ? 'updating' : ''}`}>
        {String(value).padStart(2, '0')}
      </div>
      <div className="time-label">{label}</div>
    </div>
  );

  return (
    <div className="countdown-container">
      <h2 className="countdown-title">Time Remaining Until {targetDate}</h2>
      <div className="countdown-units">
        <TimeUnit value={timeLeft.days} label="Days" isUpdating={updating.days} />
        <TimeUnit value={timeLeft.hours} label="Hours" isUpdating={updating.hours} />
        <TimeUnit value={timeLeft.minutes} label="Minutes" isUpdating={updating.minutes} />
        <TimeUnit value={timeLeft.seconds} label="Seconds" isUpdating={updating.seconds} />
      </div>
    </div>
  );
};

export default CountdownTimer;
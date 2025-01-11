import React from 'react';
import './RotatingText.css';

const RotatingText = () => {
  const text = "BLOCKCHAIN TECHNOLOGY SECURE FUTURE ";
  const letters = text.split('');
  
  return (
    <div className="circular-container">
      <div className="rotating-image-wrapper">
      <img src="/Images/RotatingText.png" alt="Background Shape" className="circle-background" />
      </div>
      <div className="rotating-wrapper">
        {letters.map((letter, i) => (
          <span
            key={i}
            style={{
              transform: `rotate(${i * (360 / letters.length)}deg) translateY(-100px)`
            }}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RotatingText;
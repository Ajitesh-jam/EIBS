import React from 'react';
import './RotatingText.css';

const RotatingText = () => {
  const text = "BLOCKCHAIN TECHNOLOGY SECURE FUTURE ";
  const letters = text.split('');
  
  return (
    <div className="circular-container">
      <img src="/Images/image.png" alt="Background Shape" className="circle-background" />
      <div className="circle-text">
        {letters.map((letter, i) => (
          <span
            key={i}
            style={{
              transform: `rotate(${i * (360 / letters.length)}deg)`
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
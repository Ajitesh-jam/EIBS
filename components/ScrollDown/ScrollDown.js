import React from 'react';
import './ScrollDown.css';

const ScrollDown = () => {
  const text = "Scroll.Scroll.";
  const letters = text.split('');
  const radius = 50; // Change this value to adjust the radius of the text circle
  
  return (
    <div className="circular-container">
      <div className="rotating-image-wrapper">
        <img src="./Images/shape.svg" alt="Background Shape" className="circle-background" />
      </div>
      <div className='ArrowImg'><img src="./Images/ArrowDown.svg"></img></div>
      <div className="rotating-wrapper">
        {letters.map((letter, i) => (
          <span
            key={i}
            style={{
              transform: `rotate(${i * (360 / letters.length)}deg) translateY(-${radius}px)`
            }}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ScrollDown;

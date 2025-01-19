'use client'
import React, { useState } from 'react'
import './test.css'
import Button from '@/components/Button/Button'
import ConfirmBooking from '@/components/ConfirmBooking/ConfirmBooking'
import CanvasConfetti from '@/components/CanvasConfetti/CanvasConfetti'

const Page = () => {
  const [showBooking, setShowBooking] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleButtonClick = () => {
    setShowBooking(true);
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
  };
 
  const handleCloseBooking = () => {
    setShowBooking(false); // Fixed: Changed to false to close the popup
  };

  return (
    <div className='Test'>
      <Button btnText="Press me" onClick={handleButtonClick} />
      
      {showBooking && (
        <div className="popup-overlay">
          <div className="popup-content">
            <ConfirmBooking onClose={handleCloseBooking} />
          </div>
        </div>
      )}

      {showConfetti && <CanvasConfetti />}
    </div>
  )
}

export default Page;
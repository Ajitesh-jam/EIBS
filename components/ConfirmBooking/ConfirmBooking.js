'use client'
import React from 'react'
import './ConfirmBooking.css'
import Button from '../Button/Button'
const ConfirmBooking = () => {
    const handleDistributeNow=()=>{
        console.log("Distribute Now");
    }
    return (
    <div className ='BookingContainer'>

        
        <div className='FanscoreDetailContainer'>
            <div className='AddedToQueue'>
                <p> YOU HAVE BEEN ADDED TO QUEUE!</p>
            </div>
            <div className='Fanscore'>
                <div className='Content'>
                    <p>YOUR FANSCORE :</p>
                    <p>89</p>
                </div>
                <div className='statement'>
                    <p>*You have been placed in the queue, based on this fanscore</p>
                </div>
            </div>
            
        </div>
        
            <div className='OK'>
                <Button btnText="OK" onClickFunction={handleDistributeNow}></Button> 
            </div>
            
        
    </div>
    )
}

export default ConfirmBooking
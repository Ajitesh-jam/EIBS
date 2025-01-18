'use client'
import React from 'react'
import './DistributeTicket.css'
import Button from '../Button/Button'
const DistributeTicket = () => {
    const handleDistributeNow=()=>{
        console.log("Distribute Now");
    }
    return (
    <div className ='MegaContainer'>

        
        <div className='DistributeTicketContainer'>
            <div className='DistributeTicketImgContainer'>
                <img src="" alt="Eventimg" className='EventImgInTicket'></img>
            </div>
            <div className='DistributeTicketDetails'>
                <div className='TicketEventname'>
                    <p>ColdPlay : Music of the Spheres 
                    World Tour</p>
                </div>
                <div className='OtherDetails'>
                    <p>No. of Tickets : </p>
                    <p>Booking Initiated at : </p>
                    <p>Application count : </p>
                </div>
            </div>
            
        </div>
        <div className='buttons' >
            <div className='MakeLiveNow'>
                <Button btnText="Make Tickets Live" onClickFunction={handleDistributeNow}></Button> 
            </div>
            <div className='Distribute'> 
            
            <Button btnText="Distribute Now" onClickFunction={handleDistributeNow}></Button>
            </div>
        </div>
    </div>
    )
}

export default DistributeTicket
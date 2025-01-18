import React from 'react'
import './TicketsComp.css'

const TicketComp = () => {
    return (
        <div className='TicketCompContainer'>
            <div className='TicketImgContainer'>
                <img src="" alt="Eventimg" className='EventImgInTicket'></img>
            </div>
            <div className='TicketDetails'>
                <div className='TicketEventname'>
                    <p>Event Name</p>
                </div>
                <div className='OtherDetails'>
                    <p>No. of Tickets : </p>
                    <p>Booking Initiated at : </p>
                    <p className='TicketStatus'>Status : </p>
                </div>
            </div>
        </div>
    )
}

export default TicketComp
import React from 'react'
import './myTickets.css'
import TicketsComp from '@/components/TicketsComp/TicketsComp'

const page = () => {
  return (
    <div className='myTicketsContainer'>
        <h1>My Tickets</h1>
        <div className='TicketWrapper'>
            <TicketsComp/>
        </div>
    </div>
  )
}

export default page
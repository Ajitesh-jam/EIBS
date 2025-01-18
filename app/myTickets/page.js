import React from 'react'
import './myTickets.css'
import TicketComp from '@/components/TicketComp/TicketComp'

const page = () => {
  return (
    <div className='myTicketsContainer'>
        <h1>My Tickets</h1>
        <div className='TicketWrapper'>
            <TicketComp/>
        </div>
    </div>
  )
}

export default page
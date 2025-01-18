import React from 'react'
import './myEvents.css'
import DistributeTicket from '@/components/DistributeTicket/DistributeTicket'

const page = () => {
  return (
    <div className='myEventsContainer'>
        <h1>My Events</h1>
        <div className='myEventsWrapper'>
            <DistributeTicket/>
        </div>
    </div>
  )
}

export default page
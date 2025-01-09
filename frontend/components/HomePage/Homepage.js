import React from 'react'
import './Homepage.css'
import Navbar from '../Navbar/Navbar'
import NoMoreScalping from '../nomorescalping/NoMoreScalping'
import NoRandomQueueing from '../NoMoreRandomQueueing/NoRandomQueueing'


const Homepage = () => {  
  return (
    <div className='Homepage-container'>
        <Navbar/>
        <div className='Hero-container'>
            <div className='Hero-left'></div>
            <div className='Hero-right'>
                <div className='Heading'>
                    <p>Tickets Tailored to Real Fans.</p>
                </div>
                <div className='Sub-Heading'>
                    <p>Powered by Avalanche</p>
                </div>
                <NoMoreScalping/>
                <NoRandomQueueing/>
                
            </div>
        </div>
    </div>
  )
}

export default Homepage
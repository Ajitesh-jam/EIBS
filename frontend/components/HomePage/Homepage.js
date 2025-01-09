import React from 'react'
import './Homepage.css'
import Navbar from '../Navbar/Navbar'


const Homepage = () => {
  return (
    <div className='Homepage-container'>
        <Navbar/>
        <div className='Hero-container'>
            <div className='Hero-left'></div>
            <div className='Hero-right'>
                <h1>Tickets tailored to Real Fans</h1>
            </div>
        </div>
    </div>
  )
}

export default Homepage
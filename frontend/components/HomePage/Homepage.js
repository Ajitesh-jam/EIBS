import React from 'react'
import './Homepage.css'
import Navbar from '../Navbar/Navbar'
<<<<<<< Updated upstream
import NoMoreScalping from '../nomorescalping/NoMoreScalping'
import NoRandomQueueing from '../NoMoreRandomQueueing/NoRandomQueueing'
=======
import Card from '../Card/Card'
import Button from '../Button/Button'
import NoMoreScalping from '../NoMoreScalping/NoMoreScalping'
import NoRandomQueueing from '../NoRandomQueueing/NoRandomQueueing'
import Footer from '../Footer/Footer'
>>>>>>> Stashed changes


<<<<<<< Updated upstream
const Homepage = () => {  
  return (
    <div className='Homepage-container'>
        <Navbar/>
        <div className='Hero-container'>
            <div className='Hero-left'></div>
            <div className='Hero-right'>
                <div className='Heading'>
                    <p>Tickets Tailored to Real Fans.</p>
=======
    return (
        <div className='Homepage-container'>
            <Navbar />
            <div className='Hero-container'>
                <div className='Hero-left'></div>
                <div className='Hero-right'>
                    <div className='Heading'>
                        <p>Tickets Tailored <br/>to Real Fans.</p>
                    </div>
                    <div className='Sub-Heading'>
                        <p>Powered by Avalanche</p>
                    </div>
                    <NoMoreScalping/>
                    <NoRandomQueueing/>
>>>>>>> Stashed changes
                </div>
                <div className='Sub-Heading'>
                    <p>Powered by Avalanche</p>
                </div>
                <NoMoreScalping/>
                <NoRandomQueueing/>
                
            </div>
<<<<<<< Updated upstream
=======
            <div className='Events-container'>
                <div className='Event-Heading'>
                    <p>Upcoming Events</p>
                </div>
                <div className='Card-container'>
                    
                </div>
            </div>
            <div className='RegisterConcert-container'>
                <div className='RegisterConcert-Heading'>
                    <p>Got your own concert?</p>
                </div>
                <div className='RegisterConcertSection'>
                    <div className='left'>
                        <p>Register your concert and start selling tickets in few easy steps!</p>
                    </div>
                    <div className='right'>
                    <Button
                    btnText='Register Concert'
                    onClickFunction={handleRegisterConcertBtnClick}/>
                    </div>
                </div>
            </div>
            <Footer/>
>>>>>>> Stashed changes
        </div>
    </div>
  )
}

export default Homepage
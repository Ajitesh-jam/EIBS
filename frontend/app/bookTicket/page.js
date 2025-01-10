'use client'
import React from 'react'
import './bookTicket.css'
import Navbar from '@/components/Navbar/Navbar'
import Card from '@/components/Card/Card'
import Button from '@/components/Button/Button'
import { useLogin } from '@/contexts/loginContext'
import useEvents from '@/components/hooks/event.zustand'
import { useEffect } from 'react'
const Homepage = () => {
    const handleRegisterConcertBtnClick = () =>{
        console.log('Register Concert Button Clicked')
    }
    const currEvent = useEvents((state)=>state.selectedEvent);
    useEffect(()=>{
        console.log("Event in bookTicket page:",currEvent);
    },[]);

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
                </div>
            </div>
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
        </div>
    )
}

export default Homepage;
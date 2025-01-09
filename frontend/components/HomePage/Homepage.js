import React from 'react'
import './Homepage.css'
import Navbar from '../Navbar/Navbar'
import Card from '../Card/Card'


const Homepage = () => {
    return (
        <div className='Homepage-container'>
            <Navbar />
            <div className='Hero-container'>
                <div className='Hero-left'></div>
                <div className='Hero-right'>
                    <div className='Heading'>
                        <p>Tickets Tailored to Real Fans.</p>
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
                    <Card
                        dateText="Sat, 25 jan onwards"
                        priceText="$100 onwards"
                        imageSrc="" />
                    <Card
                        dateText="Sat, 25 jan onwards"
                        priceText="$100 onwards"
                        imageSrc="" />
                </div>

            </div>
        </div>
    )
}

export default Homepage
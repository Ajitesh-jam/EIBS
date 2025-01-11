'use client'
import React from 'react'
import { useEffect, useState } from 'react';
import './Homepage.css'
import Navbar from '../Navbar/Navbar'
import Card from '../Card/Card'
import Button from '../Button/Button'
import GetStarted from '../GetStarted/GetStarted';
import { getAccounts, checkMetaMaskLogin } from '../utils/web3';
import { useLogin } from '@/contexts/loginContext'



const Homepage = () => {
    const {setIsLoggedIn, setPublicAddress, publicAddress} = useLogin();
    const [showModal,setShowModal] = useState(false);
    const handleRegisterConcertBtnClick = () => {
        console.log('Register Concert Button Clicked')
    }

    useEffect(() => {
        const checkLogin = async () => {
          const loggedIn = await checkMetaMaskLogin();
          setIsLoggedIn(loggedIn);
          if(loggedIn) setPublicAddress(await getAccounts);
        };
    
        checkLogin();
      }, []);


    useEffect(()=>{
        console.log("Public Address is : ", publicAddress);
    },[publicAddress]);

    const handleLogin = async ()=>{
        const publicAddress = await getAccounts();
        setPublicAddress(publicAddress);
        setIsLoggedIn(true);
        setShowModal(!showModal);
    }



    // Function to toggle modal visibility
    const toggleGetStartedModal = () => {
        setShowModal(!showModal);
    };

    const [allevents, setAllEvents] = useState(
        [

            {
                name: "harsh Events",
                image: "https://t3.ftcdn.net/jpg/06/04/20/28/360_F_604202821_K8R8KThj0ZfuQR3tCN0xwKiAwEzrBc4S.jpg",
                artist: "harsh ",
                location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29526.789503745054!2d87.3037824!3d22.3215616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1d447486474c37%3A0xe555d6d0f6a223a7!2sBombay%20Cineplex!5e0!3m2!1sen!2sin!4v1736593573156!5m2!1sen!2sin",
                date: "Default Date",
                ticketPrice: "Default Ticket Price",
                ticketsLeft: "Default Tickets Left",
            },
            {
                name: "Default Event",
                image: "https://t3.ftcdn.net/jpg/06/04/20/28/360_F_604202821_K8R8KThj0ZfuQR3tCN0xwKiAwEzrBc4S.jpg",
                artist: "Default Artist",
                location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29526.789503745054!2d87.3037824!3d22.3215616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1d447486474c37%3A0xe555d6d0f6a223a7!2sBombay%20Cineplex!5e0!3m2!1sen!2sin!4v1736593573156!5m2!1sen!2sin",
                date: "Default Date",
                ticketPrice: "Default Ticket Price",
                ticketsLeft: "Default Tickets Left",
            },
            {
                name: "Default Event",
                image: "https://t3.ftcdn.net/jpg/06/04/20/28/360_F_604202821_K8R8KThj0ZfuQR3tCN0xwKiAwEzrBc4S.jpg",
                artist: "Default Artist",
                location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29526.789503745054!2d87.3037824!3d22.3215616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1d447486474c37%3A0xe555d6d0f6a223a7!2sBombay%20Cineplex!5e0!3m2!1sen!2sin!4v1736593573156!5m2!1sen!2sin",
                date: "Default Date",
                ticketPrice: "Default Ticket Price",
                ticketsLeft: "Default Tickets Left",
            },

            {
                name: "Default Event",
                image: "https://t3.ftcdn.net/jpg/06/04/20/28/360_F_604202821_K8R8KThj0ZfuQR3tCN0xwKiAwEzrBc4S.jpg",
                artist: "Default Artist",
                location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29526.789503745054!2d87.3037824!3d22.3215616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1d447486474c37%3A0xe555d6d0f6a223a7!2sBombay%20Cineplex!5e0!3m2!1sen!2sin!4v1736593573156!5m2!1sen!2sin",
                date: "Default Date",
                ticketPrice: "Default Ticket Price",
                ticketsLeft: "Default Tickets Left",
            },
        ]

    );

    const openProfile = ()=>{
        console.log("opening Profile");
    }

    return (
        <div className='Homepage-container'>
            <Navbar toggleGetStartedModal={toggleGetStartedModal} openProfile={openProfile} />
            {/* Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <GetStarted 
                        handleLogin={handleLogin} />
                        <button className="close-button" onClick={toggleGetStartedModal}>
                            X
                        </button>
                    </div>
                </div>
            )}
            <div className='Hero-container'>
                <div className='Hero-left'></div>
                <div className='Hero-right'>
                    <div className='Heading'>
                        <p>Tickets Tailored <br />to Real Fans.</p>
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
                    {allevents.map((event, index) => (
                        <Card key={index} event={event} />
                    ))}
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
                            onClickFunction={handleRegisterConcertBtnClick} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage
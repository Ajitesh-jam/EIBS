'use client'
import React, { useEffect, useRef, useState } from 'react';
import './Homepage.css';
import Navbar from '../Navbar/Navbar';
import Card from '../Card/Card';
import Button from '../Button/Button';
import GetStarted from '../GetStarted/GetStarted';
import { getAccounts, checkMetaMaskLogin } from '../utils/web3';
import { useLogin } from '@/contexts/loginContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Homepage = () => {
    const { setIsLoggedIn, setPublicAddress, publicAddress } = useLogin();
    const [showModal, setShowModal] = useState(false);
    const headingRef = useRef(null); // Ref for the heading
    const subHeadingRef = useRef(null); // Ref for the sub-heading

    const handleRegisterConcertBtnClick = () => {
        console.log('Register Concert Button Clicked');
    };

    useEffect(() => {
        const checkLogin = async () => {
            const loggedIn = await checkMetaMaskLogin();
            setIsLoggedIn(loggedIn);
            if (loggedIn) setPublicAddress(await getAccounts);
        };

        checkLogin();
    }, []);

    useEffect(() => {
        console.log('Public Address is : ', publicAddress);
    }, [publicAddress]);

    const handleLogin = async () => {
        const publicAddress = await getAccounts();
        setPublicAddress(publicAddress);
        setIsLoggedIn(true);
        setShowModal(!showModal);
    };

    // GSAP Animation for Heading
    useEffect(() => {
        gsap.fromTo(
            headingRef.current,
            { opacity: 0, x: 300 }, // Start off-screen to the right
            {
                opacity: 1,
                x: 0, // Slide to the original position
                duration: 1,
                ease: 'power4.out',
                delay: 0.5,
            }
        );
    }, []);
    
    useEffect(() => {
        gsap.fromTo(
            subHeadingRef.current,
            { opacity: 0, x: 300 }, // Start off-screen to the right
            {
                opacity: 1,
                x: 0, // Slide to the original position
                duration: 1,
                ease: 'power4.out',
                delay: 1,
            }
        );
    }, []);

    useEffect(() => {
        // Animate event cards
        gsap.fromTo(
            '.Card-container > div', // Target each card inside the Card-container
            { opacity: 0, y: 100 }, // Start with opacity 0 and slightly below the viewport
            {
                opacity: 1,
                y: 0, // Move to its original position
                duration: 1, // Duration for each animation
                ease: 'power4.out',
                stagger: 0.2, // Add a delay between each card's animation
                scrollTrigger: {
                    trigger: '.Events-container', // Start animation when this container enters the viewport
                    start: 'top 80%', // Trigger when the top of the container is 80% down the viewport
                    end: 'bottom 50%', // End when the bottom of the container is 50% down the viewport
                    toggleActions: 'play none none none', // Play animation on scroll
                },
            }
        );
    }, []);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
    
        gsap.fromTo(
            '.Card-container > div',
            { autoAlpha: 0, y: 0 }, // Start with hidden cards
            {
                autoAlpha: 1, // Make visible and fade in
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
                stagger: 0.15,
                scrollTrigger: {
                    trigger: '.Events-container',
                    start: 'top 80%',
                    end: 'bottom 50%',
                    toggleActions: 'play none none none',
                },
            }
        );
    }, []);
    
    

    // Function to toggle modal visibility
    const toggleGetStartedModal = () => {
        setShowModal(!showModal);
    };

    const [allevents, setAllEvents] = useState([
        {
            name: 'harsh Events',
            image: 'https://t3.ftcdn.net/jpg/06/04/20/28/360_F_604202821_K8R8KThj0ZfuQR3tCN0xwKiAwEzrBc4S.jpg',
            artist: 'harsh ',
            location: 'Default Location',
            date: 'Default Date',
            ticketPrice: 'Default Ticket Price',
            ticketsLeft: 'Default Tickets Left',
        },
        {
            name: 'Default Event',
            image: 'https://t3.ftcdn.net/jpg/06/04/20/28/360_F_604202821_K8R8KThj0ZfuQR3tCN0xwKiAwEzrBc4S.jpg',
            artist: 'Default Artist',
            location: 'Default Location',
            date: 'Default Date',
            ticketPrice: 'Default Ticket Price',
            ticketsLeft: 'Default Tickets Left',
        },
        {
            name: 'Default Event',
            image: 'https://t3.ftcdn.net/jpg/06/04/20/28/360_F_604202821_K8R8KThj0ZfuQR3tCN0xwKiAwEzrBc4S.jpg',
            artist: 'Default Artist',
            location: 'Default Location',
            date: 'Default Date',
            ticketPrice: 'Default Ticket Price',
            ticketsLeft: 'Default Tickets Left',
        },
        {
            name: 'Default Event',
            image: 'https://t3.ftcdn.net/jpg/06/04/20/28/360_F_604202821_K8R8KThj0ZfuQR3tCN0xwKiAwEzrBc4S.jpg',
            artist: 'Default Artist',
            location: 'Default Location',
            date: 'Default Date',
            ticketPrice: 'Default Ticket Price',
            ticketsLeft: 'Default Tickets Left',
        },
    ]);

    const openProfile = () => {
        console.log('opening Profile');
    };

    return (
        <div className='Homepage-container'>
            <Navbar toggleGetStartedModal={toggleGetStartedModal} openProfile={openProfile} />
            {/* Modal */}
            {showModal && (
                <div className='modal-overlay'>
                    <div className='modal-content'>
                        <GetStarted handleLogin={handleLogin} />
                        <button className='close-button' onClick={toggleGetStartedModal}>
                            X
                        </button>
                    </div>
                </div>
            )}
            <div className='Hero-container'>
                <div className='Hero-left'></div>
                <div className='Hero-right'>
                    <div className='Heading' ref={headingRef}>
                        <p>Tickets Tailored <br />to Real Fans.</p>
                    </div>
                    <div className='Sub-Heading' ref={subHeadingRef}>
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
                            onClickFunction={handleRegisterConcertBtnClick}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;

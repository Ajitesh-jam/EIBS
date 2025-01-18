'use client'
import React, { useEffect, useRef, useState } from 'react';
import JSONbig from 'json-bigint';
import './Homepage.css';
import Card from '../Card/Card';
import Button from '../Button/Button';
import GetStarted from '../GetStarted/GetStarted';
import { getAccounts, checkMetaMaskLogin, events } from '../utils/web3';
import { useLogin } from '@/contexts/loginContext'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollDown from '../ScrollDown/ScrollDown';
import ShiningIcon from '../ShiningIcon/ShiningIcon';
import HandRight from '../HandRight/HandRight';
import HandLeft from '../HandLeft/HandLeft';
import Fanticket from '../FanPassTicket/ticket';
import { useRouter } from 'next/navigation';

import axios from 'axios';

const Homepage = () => {
    const { isLoggedIn, publicAddress, role, isSpotifyAuthenticated, dispatch } = useLogin();
    const headingRef = useRef(null); // Ref for the heading
    const subHeadingRef = useRef(null); // Ref for the sub-heading
    const subHeadingRef2 = useRef(null); // Ref for the sub-heading
    const subHeadingRef3 = useRef(null); // Ref for the sub-heading
    const cardsContainerRef = useRef(null);
    const animationInitializedRef = useRef(false);
    const [loading, setLoading] = useState(true);
    const [currentEvents, setCurrentEvents] = useState([]);
    const router = useRouter();
    


    const handleRegisterConcertBtnClick = () => {
        console.log('Register Concert Button Clicked');
        router.push('/registerConcert');
    };


    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch("http://localhost:8000/getAllEvents");
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                console.log(data);
                setCurrentEvents(data); // Assuming the API response is JSON
            } catch (err) {
                console.error("Failed to fetch events:", err);
            }
        };

        fetchEvents();
    }, []);

    useEffect(() => {
        const data = {
            "LoginStatus": isLoggedIn,
            "Public Address": publicAddress,
            "UserRole": role,
            "isSpotifyAuthenticated": isSpotifyAuthenticated,
        };

        console.log(data);
    }, [isLoggedIn, publicAddress, role, isSpotifyAuthenticated]);

    // Fixed card animations
    useEffect(() => {
        if (!cardsContainerRef.current || animationInitializedRef.current) return;

        const initializeAnimations = () => {
            const cards = cardsContainerRef.current.children;
            if (!cards.length) return;

            // Set initial state for all cards
            gsap.set(cards, { opacity: 0, y: 30 });

            // Create animation with ScrollTrigger
            gsap.to(cards, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
                stagger: {
                    amount: 0.4,
                    ease: 'power1.in'
                },
                scrollTrigger: {
                    trigger: cardsContainerRef.current,
                    start: 'top bottom-=100',
                    toggleActions: 'play reverse play reverse',
                }
            });

            animationInitializedRef.current = true;
        };

        // Wait for content to be loaded
        if (!loading && (currentEvents.length > 0)) {
            // Small delay to ensure DOM is ready
            setTimeout(initializeAnimations, 100);
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            animationInitializedRef.current = false;
        };
    }, [loading, currentEvents]);





    return (
        <div className='Homepage-container'>

            <div className='Hero-container'>
                <div className='Hero-left'></div>
                <div className='Hero-right'>
                    <div className='Heading' ref={headingRef}>
                        <p>Tickets Tailored <br />to Real Fans.</p>
                    </div>
                    <div className='Sub-Heading' ref={subHeadingRef}>
                        <p>Powered by Avalanche</p>
                    </div>

                    <div className='NoScalping' ref={subHeadingRef2}>No More Scalping
                    </div>
                    <div className='Crypto' ref={subHeadingRef3}>Buy Tickets with crypto</div>
                    <div className='ShiningIconComp'>
                        <ShiningIcon />
                    </div>

                    <div className='ScrollDownComp'>
                        <ScrollDown />
                    </div>
                </div>
            </div>
            <div className='About-container'>
                <HandRight />
                <HandLeft />
                <Fanticket />
                <div className='DB1'>
                    <img src="/Images/DB1.svg" />
                </div>
                <div className='DB2'>
                    <img src="/Images/DB2.svg" />
                </div>
                <div className='DB3'>
                    <img src="/Images/DB3.svg" />
                </div>
            </div>
            <div className='Events-container'>
                <div className='Event-Heading'>
                    <p>Upcoming Events</p>
                </div>
                <div className='Card-container' ref={cardsContainerRef}>
                    {loading && (
                        <>
                            {currentEvents.map((event, index) => (
                                <Card key={index} event={event} />
                            ))}
                        </>
                    )}
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

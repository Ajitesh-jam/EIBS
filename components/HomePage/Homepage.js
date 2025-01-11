'use client'
import React, { useEffect, useRef, useState } from 'react';
import './Homepage.css';
import Navbar from '../Navbar/Navbar';
import Card from '../Card/Card';
import Button from '../Button/Button';
import GetStarted from '../GetStarted/GetStarted';
import { getAccounts, checkMetaMaskLogin, events } from '../utils/web3';
import { useLogin } from '@/contexts/loginContext'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRouter } from 'next/navigation';


const Homepage = () => {
    const { setIsLoggedIn, setPublicAddress, publicAddress } = useLogin();
    const [showModal, setShowModal] = useState(false);
    const headingRef = useRef(null); // Ref for the heading
    const subHeadingRef = useRef(null); // Ref for the sub-heading
    const router = useRouter();
    const handleRegisterConcertBtnClick = () => {
        console.log('Register Concert Button Clicked');
        router.push('/registerConcert');

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
        console.log("Public Address is : ", publicAddress);
    }, [publicAddress]);

    const handleLogin = async () => {
        const publicAddress = await getAccounts();
        setPublicAddress(publicAddress);
        setIsLoggedIn(true);
        setShowModal(!showModal);
    }
    // Function to toggle modal visibility
    const toggleGetStartedModal = () => {
        setShowModal(!showModal);
    };

    // GSAP Animations
    useEffect(() => {
        gsap.fromTo(
            headingRef.current,
            { opacity: 0, x: 200 }, // Start off-screen to the right
            {
                opacity: 1,
                x: 0, // Slide to the original position
                duration: 1.5,
                ease: 'power4.out',
                delay: 0.5,
            }
        );
    }, []);

    useEffect(() => {
        gsap.fromTo(
            subHeadingRef.current,
            { opacity: 0, x: 200 }, // Start off-screen to the right
            {
                opacity: 1,
                x: 0, // Slide to the original position
                duration: 1.5,
                ease: 'power4.out',
                delay: 0.8,
            }
        );
    }, []);

    const openProfile = () => {
        console.log("opening Profile");
    }

    const [eventData, setEventData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [allevents, setAllEvents] = useState(
        [

            // {
            //     name: "harsh Events",
            //     img: "https://t3.ftcdn.net/jpg/06/04/20/28/360_F_604202821_K8R8KThj0ZfuQR3tCN0xwKiAwEzrBc4S.jpg",
            //     artist: "harsh ",
            //     location: "Default Location",
            //     date: "Default Date",
            //     ticketPrice: "Default Ticket Price",
            //     ticketsLeft: "Default Tickets Left",
            // },
            // {
            //     name: "Default Event",
            //     img: "https://t3.ftcdn.net/jpg/06/04/20/28/360_F_604202821_K8R8KThj0ZfuQR3tCN0xwKiAwEzrBc4S.jpg",
            //     artist: "Default Artist",
            //     location: "Default Location",
            //     date: "Default Date",
            //     ticketPrice: "Default Ticket Price",
            //     ticketsLeft: "Default Tickets Left",
            // },
            // {
            //     name: "Default Event",
            //     img: "https://www.thestatesman.com/wp-content/uploads/2023/11/Taylor-Swift-The-Eras-Tour.jpg",
            //     artist: "Default Artist",
            //     location: "Default Location",
            //     date: "Default Date",
            //     ticketPrice: "Default Ticket Price",
            //     ticketsLeft: "Default Tickets Left",
            // },

            // {
            //     name: "Default Event",
            //     img: "https://t3.ftcdn.net/jpg/06/04/20/28/360_F_604202821_K8R8KThj0ZfuQR3tCN0xwKiAwEzrBc4S.jpg",
            //     artist: "Default Artist",
            //     location: "Default Location",
            //     date: "Default Date",
            //     ticketPrice: "Default Ticket Price",
            //     ticketsLeft: "Default Tickets Left",
            // },
            // {
            //     name: "Default Event",
            //     img: "https://t3.ftcdn.net/jpg/06/04/20/28/360_F_604202821_K8R8KThj0ZfuQR3tCN0xwKiAwEzrBc4S.jpg",
            //     artist: "Default Artist",
            //     location: "Default Location",
            //     date: "Default Date",
            //     ticketPrice: "Default Ticket Price",
            //     ticketsLeft: "Default Tickets Left",
            // },
            // {
            //     name: "Default Event",
            //     img: "https://t3.ftcdn.net/jpg/06/04/20/28/360_F_604202821_K8R8KThj0ZfuQR3tCN0xwKiAwEzrBc4S.jpg",
            //     artist: "Default Artist",
            //     location: "Default Location",
            //     date: "Default Date",
            //     ticketPrice: "Default Ticket Price",
            //     ticketsLeft: "Default Tickets Left",
            // },
        ]

    );
    const [currentEvents, setCurrentEvents] = useState([]);

    // Fetch events (replace `events` with your API function or mock it)
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                //run a loop 3 times to to fetch 3 events
                for (let i = 0; i < 4; i++) {
                    const fetchedEvent = await events(i);
                    console.log('Fetched event:', fetchedEvent);
                    //add index to fetchedEvents
                    fetchedEvent.index = i;
                    setCurrentEvents((prevEvents) => [...prevEvents, fetchedEvent]);
                }
                setAllEvents(currentEvents);
                setLoading(false);

            } catch (error) {
                console.error('Error fetching events:', error);
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

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
                    {loading ? (
                        <>
                            {allevents.map((event, index) => (
                                <Card key={index} event={event} />
                            ))}
                        </>
                    ) : (
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

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
import ScrollDown from '../ScrollDown/ScrollDown';
import ShiningIcon from '../ShiningIcon/ShiningIcon';



const Homepage = () => {
    const { setIsLoggedIn, setPublicAddress, publicAddress } = useLogin();
    const [showModal, setShowModal] = useState(false);
    const headingRef = useRef(null); // Ref for the heading
    const subHeadingRef = useRef(null); // Ref for the sub-heading
    const subHeadingRef2 = useRef(null); // Ref for the sub-heading
    const subHeadingRef3 = useRef(null); // Ref for the sub-heading
    const cardsContainerRef = useRef(null);
    const animationInitializedRef = useRef(false);
    const [loading, setLoading] = useState(true);
    const [currentEvents, setCurrentEvents] = useState([]);


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
            { opacity: 0, x: 300 }, // Start off-screen to the right
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
            subHeadingRef2.current,
            { opacity: 0, x: 350 }, // Start off-screen to the right
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
            subHeadingRef3.current,
            { opacity: 0, x: 400 }, // Start off-screen to the right
            {
                opacity: 1,
                x: 0, // Slide to the original position
                duration: 1.5,
                ease: 'power4.out',
                delay: 0.5,
            }
        );
    }, []);

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
    if (!loading && (currentEvents.length > 0 || allevents.length > 0)) {
        // Small delay to ensure DOM is ready
        setTimeout(initializeAnimations, 100);
    }

    return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        animationInitializedRef.current = false;
    };
}, [loading, currentEvents, allevents]);


    const openProfile = () => {
        console.log("opening Profile");
    }



    const [eventData, setEventData] = useState([]);





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


               // console.error('Error fetching events:', error);
                
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0 });

    const handleMouseEnter = (e) => {
      setTooltip({ visible: true, x: e.clientX, y: e.clientY });
    };
  
    const handleMouseMove = (e) => {
      setTooltip((prev) => ({ ...prev, x: e.clientX, y: e.clientY }));
    };
  
    const handleMouseLeave = () => {
      setTooltip({ visible: false, x: 0, y: 0 });
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
                    
                    <div className='NoScalping' ref={subHeadingRef2}>No More Scalping
                    </div>
                    <div className='Crypto' ref={subHeadingRef3}>Buy Tickets with crypto</div>
                    <div className='ShiningIconComp'>
                    <ShiningIcon/>
                    </div>
                    
                    <div className='ScrollDownComp'>
                    <ScrollDown/>
                    </div>
                </div>
            </div>
            <div className='Events-container'>
                <div className='Event-Heading'>
                    <p>Upcoming Events</p>
                </div>
                <div className='Card-container' ref={cardsContainerRef}>
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

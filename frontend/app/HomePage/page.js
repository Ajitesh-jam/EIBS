'use client'
import React, { useEffect, useState } from 'react';
import './Homepage.css';
import Navbar from '@/components/Navbar/Navbar';
import Card from '@/components/Card/Card';

const Homepage = () => {
    const [eventData, setEventData] = useState([]);
    //const [loading, setLoading] = useState(true);

    // const defaultEvent = {
    //     name: "Default Event",
    //     image: "https://t3.ftcdn.net/jpg/06/04/20/28/360_F_604202821_K8R8KThj0ZfuQR3tCN0xwKiAwEzrBc4S.jpg",
    //     artist: "Default Artist",
    //     location: "Default Location",
    //     date: "Default Date",
    //     ticketPrice: "Default Ticket Price",
    //     ticketsLeft: "Default Tickets Left",
    // };

    const [allevents, setAllEvents] = useState(
        [

        {
            name: "harsh Events",
            image: "https://t3.ftcdn.net/jpg/06/04/20/28/360_F_604202821_K8R8KThj0ZfuQR3tCN0xwKiAwEzrBc4S.jpg",
            artist: "harsh ",
            location: "Default Location",
            date: "Default Date",
            ticketPrice: "Default Ticket Price",
            ticketsLeft: "Default Tickets Left",
        },
        {
            name: "Default Event",
            image: "https://t3.ftcdn.net/jpg/06/04/20/28/360_F_604202821_K8R8KThj0ZfuQR3tCN0xwKiAwEzrBc4S.jpg",
            artist: "Default Artist",
            location: "Default Location",
            date: "Default Date",
            ticketPrice: "Default Ticket Price",
            ticketsLeft: "Default Tickets Left",
        },
        {
            name: "Default Event",
            image: "https://t3.ftcdn.net/jpg/06/04/20/28/360_F_604202821_K8R8KThj0ZfuQR3tCN0xwKiAwEzrBc4S.jpg",
            artist: "Default Artist",
            location: "Default Location",
            date: "Default Date",
            ticketPrice: "Default Ticket Price",
            ticketsLeft: "Default Tickets Left",
        },

        {
            name: "Default Event",
            image: "https://t3.ftcdn.net/jpg/06/04/20/28/360_F_604202821_K8R8KThj0ZfuQR3tCN0xwKiAwEzrBc4S.jpg",
            artist: "Default Artist",
            location: "Default Location",
            date: "Default Date",
            ticketPrice: "Default Ticket Price",
            ticketsLeft: "Default Tickets Left",
        },
        {
            name: "Default Event",
            image: "https://t3.ftcdn.net/jpg/06/04/20/28/360_F_604202821_K8R8KThj0ZfuQR3tCN0xwKiAwEzrBc4S.jpg",
            artist: "Default Artist",
            location: "Default Location",
            date: "Default Date",
            ticketPrice: "Default Ticket Price",
            ticketsLeft: "Default Tickets Left",
        },
        {
            name: "Default Event",
            image: "https://t3.ftcdn.net/jpg/06/04/20/28/360_F_604202821_K8R8KThj0ZfuQR3tCN0xwKiAwEzrBc4S.jpg",
            artist: "Default Artist",
            location: "Default Location",
            date: "Default Date",
            ticketPrice: "Default Ticket Price",
            ticketsLeft: "Default Tickets Left",
        },
    ]
        
    );

    // Fetch events (replace `events` with your API function or mock it)
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                // Replace `events` with your actual API call or mock it
                //const fetchedEvents = await events(0); // Example: events should be an API function
                //setEventData(fetchedEvents);
                //setLoading(false);
            } catch (error) {
                console.error('Error fetching events:', error);
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    return (
        <div className="Homepage-container">
            <Navbar />
            <div className="Hero-container">
                <div className="Hero-left"></div>
                <div className="Hero-right">
                    <div className="Heading">
                        <p>Tickets Tailored to Real Fans.</p>
                    </div>
                    <div className="Sub-Heading">
                        <p>Powered by Avalanche</p>
                    </div>
                </div>
            </div>
            <div className="Events-container">
                <div className="Event-Heading">
                    <p>Upcoming Events</p>
                </div>
                <div className="Card-container">
                   
                        {allevents.map((event, index) => (
                            <Card key={index} event={event} />
                        ))}
                   
                </div>
            </div>
        </div>
    );
};

export default Homepage;

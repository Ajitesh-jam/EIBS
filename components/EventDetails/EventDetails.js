
'use client';
import React from 'react';
import './EventDetails.css';
import Button from '../Button/Button';
import { useRouter } from 'next/navigation';
import { useLogin } from '@/contexts/loginContext'

const EventDetails = ({ event, onClose }) => {
    if (!event) return null;
    const router = useRouter();
    const { isLoggedIn, publicAddress, role, isSpotifyAuthenticated, dispatch } = useLogin();

    const handleBookTickets = () => {
        // Check all requirements
        const missingRequirements = [];
        
        if (!publicAddress) missingRequirements.push('Wallet connection');
        if (!role) missingRequirements.push('User role');
        if (!isSpotifyAuthenticated) missingRequirements.push('Spotify authentication');
        
        // If any requirements are missing, show alert and return
        if (missingRequirements.length > 0) {
            alert(`Please complete the following requirements before booking tickets:\n\n${missingRequirements.join('\n')}`);
            return;
        }
        
        // If all requirements are met, proceed with booking
        console.log("Booking tickets");
        const safeEvent = JSON.stringify(event, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        );
        router.push(`/bookTicket?event=${encodeURIComponent(safeEvent)}`);
    };

    return (
        <div className="event-details-overlay" onClick={onClose}>
            <div className="event-details-modal" onClick={(e) => e.stopPropagation()}>
                <div className="event-image">
                    {event.image ? (
                        <img
                            src={event.image}
                            alt="Event"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    ) : (
                        "Image Placeholder"
                    )}
                </div>

                {/* Event Details */}
                <div className="event-info">
                    <h1 className="event-title">{event.name}</h1>
                    <div className="event-sections">
                        <div className="event-description">
                            <h3>About</h3>
                            {event.description? 
                                <p>{event.description}</p>
                            :
                            <p>Immerse yourself in an unforgettable evening as they take the stage to deliver soul-stirring melodies and captivating performances. Get ready for a musical journey like no other!</p>
                            }                     
                        </div>

                        <div className="event-meta">
                            <div className="meta-item">
                                <h4>Date:</h4>
                                <p> {event.date || 'TBA'}</p>
                                <div className="TicketsLeft">Ticket Price</div>
                                <span>{event.ticketPrice} </span>
                            </div>
                            <div className="meta-item">
                                <h4>Venue:</h4>
                                <a href={event.location}>Location</a>
                            </div>
                        </div>
                    </div>
                    <div className="bookTickets">
                        <Button btnText="Book Tickets" onClickFunction={handleBookTickets} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;



'use client';
import React from 'react';
import './EventDetails.css';
import Button from '../Button/Button';
import { useRouter } from 'next/navigation';

const EventDetails = ({ event, onClose }) => {
    if (!event) return null;

    const router = useRouter();    
    const handleBookTickets = ()=>{
        console.log("Booking tickets");
        router.push('./bookTicket');
    }

    return (
        <div className="event-details-overlay" onClick={onClose}>
            <div className="event-details-modal" onClick={(e) => e.stopPropagation()}>
                <div className="event-image">
                    {event.img ? (
                        <img
                            src={event.img}
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
                    <div className='event-sections'>
                        <div className="event-description">
                            <h3>About</h3>
                            <p>{event.description || 'No description available.'}</p>
                        </div>

                        <div className="event-meta">
                            <div className="meta-item">
                                <h4>Date:</h4>
                                <p>{event.date || 'TBA'}</p>
                            </div>
                            <div className="meta-item">
                                <h4>Venue:</h4>
                                <p>{event.venue || 'TBA'}</p>
                            </div>
                        </div>

                    </div>
                    <div className='bookTickets'>
                    <Button btnText="Book Tickets" onClickFunction={handleBookTickets}/>
                    </div>
                    
                    
                </div>
            </div>
        </div>
    );
};

export default EventDetails;

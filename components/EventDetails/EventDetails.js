
'use client';
import React from 'react';
import './EventDetails.css';
import Button from '../Button/Button';
import { useRouter } from 'next/navigation';
import { useLogin } from '@/contexts/loginContext'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';


const EventDetails = ({ event, onClose }) => {
    if (!event) return null;
    const router = useRouter();
    const { isLoggedIn, publicAddress, role, isSpotifyAuthenticated, dispatch } = useLogin();
    const [user] = useAuthState(auth);

    const handleBookTickets = () => {
        // Check all requirements
        const missingRequirements = [];
        
        if (!user) missingRequirements.push('Google Login');
        if (!publicAddress) missingRequirements.push('Wallet connection');
        if (!role) missingRequirements.push('User role');
        if (!isSpotifyAuthenticated) missingRequirements.push('Spotify authentication');
        
        // If any requirements are missing, show alert and return
        if (missingRequirements.length > 0) {
            alert(`Please complete the following requirements before booking tickets:\n\n${missingRequirements.join('\n')}`);
            return;
        }

        //console.log("Event :", event);
        
        // If all requirements are met, proceed with booking
        console.log("Booking tickets");
        const safeEvent = JSON.stringify(event, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        );
        router.push(`/bookTicket?event=${encodeURIComponent(safeEvent)}`);
    };
    function formatDate(inputDate) {
        // Ensure the input is in the expected format
        if (!/^\d{8}$/.test(inputDate)) {
            throw new Error("Invalid date format. Expected DDMMYYYY.");
        }
    
        // Extract day, month, and year
        const day = parseInt(inputDate.substring(0, 2), 10);
        const month = parseInt(inputDate.substring(2, 4), 10) - 1; // Months are 0-indexed
        const year = parseInt(inputDate.substring(4, 8), 10);
    
        // Array of month names
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
    
        // Get the day suffix (st, nd, rd, th)
        const daySuffix = (day) => {
            if (day % 10 === 1 && day !== 11) return "st";
            if (day % 10 === 2 && day !== 12) return "nd";
            if (day % 10 === 3 && day !== 13) return "rd";
            return "th";
        };
    
        // Format the date
        const formattedDate = `${day}${daySuffix(day)} ${monthNames[month]} ${year}`;
    
        return formattedDate;
    }
    
  
    

    
    
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
                                <p> {formatDate("19052025") || 'TBA'}</p>
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



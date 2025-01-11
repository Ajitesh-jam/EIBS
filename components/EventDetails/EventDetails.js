
'use client';
import React from 'react';
import './EventDetails.css';
import Button from '../Button/Button';
import { useRouter } from 'next/navigation';

const EventDetails = ({ event, onClose }) => {
    const router = useRouter();

    if (!event) return null;

    const handleBookTickets = () => {
        console.log("Booking tickets");

        // Serialize the event object safely, handling BigInt
        const safeEvent = JSON.stringify(event, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        );

        router.push(`/bookTicket?event=${encodeURIComponent(safeEvent)}`);
    };

    function formatDate(dateInt) {
        // Convert the integer to a string for easier manipulation
        const dateStr = dateInt.toString();
        
        // Extract day, month, and year
        const day = parseInt(dateStr.slice(0, -6), 10); // First 1-2 digits
        const month = parseInt(dateStr.slice(-6, -4), 10); // Next 2 digits
        const year = parseInt(dateStr.slice(-4), 10); // Last 4 digits
      
        // Convert month number to month name
        const monthNames = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
      
        return `${day} st ${monthNames[month - 1]} ' ${year}`;
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
                    <div className="event-sections">
                        <div className="event-description">

                           <br></br>
                            <h3>About</h3>
                            <p><i>Witness  the  unstoppable  force  that  is  <b>{event.name}  </b>live  on  stage!  This  critically-acclaimed  artist <br></br> is known  for  delivering  heart-stopping,  awe-inspiring  performances  that  will  leave  you  screaming <br></br> for  more.  With  their  captivating  stage  presence,  mesmerizing  visuals,  and  unforgettable  music, <br></br> {event.name}  will  give  you  an  unforgettable  night  to  remember.  Get  your  tickets  now  and  be  a <br></br> part  of  the  magic!</i></p><br></br><br></br>
                            <span>Tickets Left : {event.ticketsLeft} </span>

                        </div>

                        <div className="event-meta">
                            <div className="meta-item">
                                <h4>Date:</h4>
                                <p> {formatDate(event.date) || 'TBA'}</p>
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


// Here are a few options:

// # Option 1: Highlighting the Artist's Unique Sound
// "Get ready to experience the electrifying sound of [Artist Name], the visionary musician who's redefining the boundaries of [genre]! With their signature blend of [influences] and infectious energy, [Artist Name] will take you on a sonic journey that will leave you breathless. Don't miss your chance to witness greatness – secure your tickets now!"

// # Option 2: Emphasizing the Artist's Live Performance
// " Witness the unstoppable force that is [Artist Name] live on stage! This critically-acclaimed artist is known for delivering heart-stopping, awe-inspiring performances that will leave you screaming for more. With their captivating stage presence, mesmerizing visuals, and unforgettable music, [Artist Name] will give you an unforgettable night to remember. Get your tickets now and be a part of the magic!"

// # Option 3: Showcasing the Artist's Musical Journey
// "Join [Artist Name] on their musical journey, as they bring their latest album [album name] to life on stage! With a career spanning [number] years, [Artist Name] has established themselves as one of the most innovative and beloved artists in [genre]. From their early days as a rising star to their current status as a global phenomenon, [Artist Name] has consistently pushed the boundaries of music and art. Don't miss this opportunity to experience their latest evolution – get your tickets now!"

// Feel free to customize these descriptions to fit your artist's unique style and sound!
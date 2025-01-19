'use client';
import React, { useState } from "react";
import "./Card.css";
import EventDetails from "../EventDetails/EventDetails";

const Card = ({ event }) => {
  const [showModal1, setShowModal1] = useState(false);

  const handleCardClick = () => {
    if(event.isEventLive)  setShowModal1(true);
    else setShowModal1(false);
   
  };

  const handleCloseModal = () => {
    setShowModal1(false);
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    
    if (timestamp.seconds) {
      return new Date(timestamp.seconds * 1000).toLocaleDateString();
    }
    
    return new Date(timestamp).toLocaleDateString();
  };

  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return `$${price.toFixed(2)}`;
    }
    return price;
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
    <>
      <div
        className="card-container"
        onClick={handleCardClick}
        style={{ cursor: "pointer" }}
      >
        <div className="card-image" style={{ position: 'relative' }}>
          {event.image ? (
            <>
              <img
                src={event.image}
                alt="Event"
                style={{ 
                  width: "100%", 
                  height: "100%", 
                  objectFit: "cover",
                  filter: !event.isEventLive ? 'grayscale(100%)' : 'none'
                }}
              />
              {!event.isEventLive && (
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                    textAlign: 'center',
                    zIndex: 1
                  }}
                >
                  Coming Soon
                </div>
              )}
            </>
          ) : (
            "Image Placeholder"
          )}
        </div>
        <div className="card-content">
          <p className="card-date">{event.artistName || 'Artist Name Not Available'}</p>
          {event.isEventLive ? (
            <p className="card-price">
              Tickets Price: {formatPrice(event.ticketPrice)}
            </p>
          ) : (
            <p className="card-price">
              Tickets live on : {formatDate("10102025")}
            </p>
          )}
        </div>
      </div>

      {showModal1 && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <EventDetails
            event={{
              ...event,
              ...(event.date && { date: formatTimestamp(event.date) }),
              ...(event.createdAt && { createdAt: formatTimestamp(event.createdAt) }),
              ...(event.updatedAt && { updatedAt: formatTimestamp(event.updatedAt) })
            }}
            onClose={() => {
              setShowModal1(false)
              console.log("triggring close")
            }}
          />
        </div>
      )}
    </>
  );
};

export default Card;
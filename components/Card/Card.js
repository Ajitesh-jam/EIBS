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
              Tickets live on : {formatTimestamp(event.date)}
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
'use client';
import React, { useState } from "react";
import "./Card.css";
import EventDetails from "../EventDetails/EventDetails";
import useEvents from "../hooks/event.zustand.js";

const Card = ({ event }) => {
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const setEvent = useEvents((state) => state.setNewEvent);

  const handleCardClick = () => {
    setEvent(event); // Set the event in Zustand store (if needed) ****check***
    setShowModal(true); // Show the modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Hide the modal
  };

  

  return (
    <>
      {/* Card Component */}
      <div
        className="card-container"
        onClick={handleCardClick}
        style={{ cursor: "pointer" }}
      >
        <div className="card-image">
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

        <div className="card-content">
          <p className="card-date">{event.name}</p>
          <p className="card-price">Tickets Left:   {event.ticketsLeft} </p>
        </div>
      </div>

      {/* Modal Component */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
            <EventDetails event={event} onClose={()=>setShowModal(false)}/>
        </div>
      )}
    </>
  );
};

export default Card;

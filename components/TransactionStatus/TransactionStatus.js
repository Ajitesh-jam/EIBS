// TransactionStatus.jsx
import React, { useEffect } from 'react';
import './TransactionStatus.css';
import ConfirmBooking from '../ConfirmBooking/ConfirmBooking';

const TransactionStatus = ({ isOpen, status, onClose, artist ,buyers,eventId}) => {
  if (!isOpen) return null;

  const getAlertContent = () => {
    switch (status) {
      case 'pending':
        return {
          title: "Transaction Pending",
          description: "Please complete the transaction in MetaMask.",
          className: "alert-pending"
        };
      case 'success':
        return null; // No alert content, because we'll render ConfirmBooking
      case 'refused':
        return {
          title: "Transaction Refused",
          description: "The transaction was cancelled or failed.",
          className: "alert-refused"
        };
      case 'AlreadyOwnsTicket':
        return {
          title: "Transaction Refused",
          description: "One of the buyers already has a ticket for the event.",
          className: "alert-refused"
        };
      case 'Tickets Not Distributed yet':
        return {
          title: "You are eligible to buy ",
          description: "You  are eligible to buy.",
          className: "alert-pending"
        };
      default:
        return null;
    }
  };

  const alertContent = getAlertContent();

  if (status === 'success') {
    return (
      <div className="alert-overlay">
        <ConfirmBooking onClose={onClose} artist={artist} buyers={buyers} eventId={eventId} />
      </div>
    );
  }

  if (!alertContent) return null;

  return (
    <div className="alert-overlay">
      <div className={`alert-modal ${alertContent.className}`}>
        <button className="close-button" onClick={onClose}>×</button>
        <h4 className="alert-title">{alertContent.title}</h4>
        <p className="alert-description">{alertContent.description}</p>
      </div>
    </div>
  );
};

export default TransactionStatus;

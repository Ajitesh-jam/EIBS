// TransactionStatus.jsx
import React, { useEffect } from 'react';
import './TransactionStatus.css';

const TransactionStatus = ({ isOpen, status, onClose }) => {

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
        return {
          title: "Transaction Successful",
          description: "Your tickets have been booked successfully!",
          className: "alert-success"
        };
      case 'refused':
        return {
          title: "Transaction Refused",
          description: "The transaction was cancelled or failed.",
          className: "alert-refused"
        };
        case 'AlreadyOwnsTicket':
            return {
                title: "Transaction Refused",
                description: "One of the buyers already has a ticket for the event",
                className: "alert-refused"
            };
      default:
        return null;
    }
  };

  const alertContent = getAlertContent();
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
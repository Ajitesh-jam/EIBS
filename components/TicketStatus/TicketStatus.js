// TicketStatus.js
import React from 'react';
import './TicketStatus.css';
import { Clock } from 'lucide-react';

const TicketStatus = ({ 
  eventName = '', 
  ticketCount = 0, 
  bookingTime = '', 
  status = '' 
}) => {
  // Safe status class name generation
  const getStatusClassName = (status) => {
    if (!status) return '';
    return `status-badge ${status.toLowerCase().replace(/\s+/g, '-')}`;
  };

  return (
    <div className="ticket-container">
      <div className="ticket-header">
        <div className="event-image">
          <img 
            src="/api/placeholder/400/320" 
            alt="Event Banner" 
            className="banner-image"
          />
        </div>
        <div className="event-details">
          <h1 className="event-title">{eventName}</h1>
          
          <div className="booking-info">
            <div className="info-item">
              <span className="label">No. of tickets:</span>
              <span className="value">{ticketCount}</span>
            </div>
            
            <div className="info-item">
              <span className="label">Booking Initiated at:</span>
              <div className="time-container">
                <Clock size={16} />
                <span className="value">{bookingTime}</span>
              </div>
            </div>
            
            <div className="info-item">
              <span className="label">Status:</span>
              <span className={getStatusClassName(status)}>
                {status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketStatus;
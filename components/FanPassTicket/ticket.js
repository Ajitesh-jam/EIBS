import React, { useEffect, useRef } from 'react';
import './ticket.css';
import { gsap } from 'gsap';

const Fanticket = () => {
  const ticketRef = useRef(null);

  useEffect(() => {
    const ticket = ticketRef.current;

    // Floating animation (soft wavering effect)
    gsap.to(ticket, {
      y: '+=12', // Move slightly up and down
      duration: 2,
      repeat: -1,
      yoyo: true, // Reverses the animation
      ease: 'power1.out',
    });

    // Hover animation
    const hoverAnimation = gsap.to(ticket, {
      scale: 1.1,
      rotate: 2,
      duration: 0.3,
      paused: true,
      ease: 'power1.inOut',
    });

    // Add hover event listeners
    const handleMouseEnter = () => hoverAnimation.play();
    const handleMouseLeave = () => hoverAnimation.reverse();

    ticket.addEventListener('mouseenter', handleMouseEnter);
    ticket.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup
    return () => {
      ticket.removeEventListener('mouseenter', handleMouseEnter);
      ticket.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className='ticketContainer' ref={ticketRef}>
        <img src='/Images/fanPassTicket.png' className='ticketImg' alt='Ticket' />
    </div>
  );
};

export default Fanticket;

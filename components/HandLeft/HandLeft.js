import React from 'react';
import './HandLeft.css';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const HandLeft = () => {
    const handRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Initial setup
        gsap.set(handRef.current, {
            x: '38vh',
            y: '70  Vh', // Adjusted y-position for consistency
            rotate: 0, // Diagonal position
            transformOrigin: 'center left', // Ensures smooth rotation around the edge
        });

        // Entrance animation
        const entranceAnimation = gsap.to(handRef.current, {
            opacity: 1,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: handRef.current,
                start: 'top center',
                end: 'bottom center',
                toggleActions: 'play none none reverse',
                pin: true,
                pinSpacing: false,
            },
        });

        // Wavering effect
        const waveringAnimation = gsap.to(handRef.current, {
            rotate: -3, // Slight diagonal rotation
            yoyo: true, // Reverse direction
            repeat: -1, // Infinite loop
            duration: 1.5, // Duration of each wave
            ease: 'sine.inOut',
        });

        // Cleanup
        return () => {
            entranceAnimation.kill();
            waveringAnimation.kill();
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <div ref={handRef} className="handLeftContainer">
            <img src="/Images/handLeft.svg" className="handLeftImg" alt="Hand" />
        </div>
    );
};

export default HandLeft;

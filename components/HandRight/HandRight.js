import React from 'react';
import './HandRight.css';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const HandRight = () => {
    const handRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Initial setup
        gsap.set(handRef.current, {
            x: '100vw',
            y: '70Vh', // Adjusted y-position for consistency
            rotate: 0, // Diagonal position
            transformOrigin: 'center right', // Ensures smooth rotation around the edge
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
            rotate: -2, // Slight diagonal rotation
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
        <div ref={handRef} className="handRightContainer">
            <img src="/Images/handRight.png" className="handRightImg" alt="Hand" />
        </div>
    );
};

export default HandRight;

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import './Preloader.css'; // Link to the CSS file

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [percentage, setPercentage] = useState(0); // New state for percentage

  useEffect(() => {
    // Step 1: Animate progress bar width using GSAP
    gsap.to("#progress", {
      width: "100%",
      duration: 4,
      ease: "power1.out",
      onUpdate: () => {
        // Step 2: Update the percentage as the progress bar animates
        setPercentage(Math.round((document.getElementById("progress").offsetWidth / document.getElementById("progress-bar").offsetWidth) * 100));
      }
    });

    // Step 3: Animate text zoom in and fade effect
    gsap.fromTo(
      "#percentage-text", 
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0, delay: 3 }
    );

    // Step 4: Animate background color change
    gsap.to("body", {
      backgroundColor: "#000000", 
      duration: 4, 
      ease: "power2.inOut"
    });

    // Step 5: Hide the preloader after 4 seconds
    const timer = setTimeout(() => {
      setLoading(false); // Hide the preloader after 4 seconds
    }, 4000);

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  if (loading) {
    return (
      <div id="preloader">
        {/* Progress bar */}
        <div id="progress-bar">
          <div id="progress"></div>
        </div>

        {/* Percentage text */}
        <span id="percentage-text">{percentage}%</span>

        {/* Crazy animation effect: Spinning circles */}
        <div className="circle-animation">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
      </div>
    );
  }

  return null; // When loading is complete, nothing is rendered
};

export default Preloader;

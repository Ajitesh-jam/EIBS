import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import "./Preloader.css";

const Preloader = () => {
   const [progress, setProgress] = useState(0);
   const [isLoaded, setIsLoaded] = useState(false);
   
   useEffect(() => {
       // Disable scrolling while preloading
       document.body.style.overflow = 'hidden';

       const interval = setInterval(() => {
           setProgress((prev) => {
               if (prev < 100) {
                   return prev + 1;
               } else {
                   clearInterval(interval);
                   // GSAP animation to slide out the preloader
                   gsap.to(".preloader", {
                       yPercent: -100,
                       duration: 0.8,
                       ease: "power2.inOut",
                       onComplete: () => {
                           setIsLoaded(true);
                           // Enable scrolling after preloader is removed
                           document.body.style.overflow = 'auto';
                       }
                   });
                   return prev;
               }
           });
       }, 15);

       return () => clearInterval(interval);
   }, []);

   return (
       // Only render preloader if it's not loaded
       !isLoaded && (
           <div className="preloader">
               <div className="preloader-content">
                   <div className="message">Hold on</div>
                   <div className="progress">{progress}</div>
               </div>
           </div>
       )
   );
};

export default Preloader;

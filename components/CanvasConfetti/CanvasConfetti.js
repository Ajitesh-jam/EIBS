// confetti.js
// @ts-ignore
// import confetti from "canvas-confetti";
import "./CanvasConfetti.css";


// export const triggerConfetti = () => {
//   const duration = 1 * 1000; // 5 seconds
//   const end = Date.now() + duration;

//   (function frame() {
//     confetti({
//       particleCount: 3,
//       angle: 60,
//       spread: 55,
//       origin: { x: 0 },
//     });
//     confetti({
//       particleCount: 3,
//       angle: 120,
//       spread: 55,
//       origin: { x: 1 },
//     });

//     if (Date.now() < end) {
//       requestAnimationFrame(frame);
//     }
//   })();
// };

// // @ts-ignore
import confetti from "canvas-confetti";

export const triggerConfetti = () => {
    const resizeCanvas = () => {
        const canvas = confetti.create(undefined, {
            resize: true,
            useWorker: true,
        });
        return canvas;
    };

    const confettiCanvas = resizeCanvas();
    const duration = 5 * 1000; // 5 seconds
    const end = Date.now() + duration;

    // Colors for the confetti
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

    // Function to create confetti from different positions
    const fireConfetti = () => {
        // Left side
        confetti({
            particleCount: 20,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.5 },
            colors: colors,
            startVelocity: 45,
            gravity: 1,
        });

        // Right side
        confetti({
            particleCount: 20,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.5 },
            colors: colors,
            startVelocity: 45,
            gravity: 1,
        });

        // Top
        confetti({
            particleCount: 20,
            angle: 90,
            spread: 100,
            origin: { x: 0.4, y: 0 },
            colors: colors,
            startVelocity: 45,
            gravity: 1,
        });

        confetti({
            particleCount: 20,
            angle: 90,
            spread: 100,
            origin: { x: 0.6, y: 0 },
            colors: colors,
            startVelocity: 45,
            gravity: 1,
        });

        // Center burst
        
    };

    (function frame() {
        fireConfetti();

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
};
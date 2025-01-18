'use client'
import React, { useEffect, useState } from 'react'
import './ConfirmBooking.css'
import Button from '../Button/Button'
import { triggerConfetti } from '../utils/CanvasConfetti'
import { calculateFanScore } from '../utils/fanScore'
const ConfirmBooking = ({ onClose, artist }) => {
    const handleClose = () => {
        onClose();
    }
    const [fanScore, setFanScore] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const calculateFinalScore = (score) => {
        const currentTime = Date.now(); // Current timestamp in milliseconds
        const lastDayOfYear = new Date(new Date().getFullYear(), 11, 31, 23, 59, 59, 999).getTime(); // Last day of the year
        const timeDifference = lastDayOfYear - currentTime; // Time remaining until the last day of the year
        const timeWeight = timeDifference / (1000 * 60 * 100); // Adjust the scale to your needs
        return score + timeWeight; // Add the time weight to the score
    }
    

    const checkFanScore = async (artistName) => {
        try {
            setLoading(true);
            const score = await calculateFanScore(artistName);
            setFanScore(score);
        } catch (error) {
            setError('Failed to calculate fan score');
            console.error(error);
        } finally {
            setLoading(false);
            triggerConfetti();
        }
    };



    useEffect(() => {
        checkFanScore(artist);
    }, [])
    return (
        <div className='Container'>
            <div className='BookingContainer'>
                {loading && <p>Calculating score...</p>}
                {error && <p>Error: {error}</p>}
                {fanScore && (


                    <>
                        <div className='FanscoreDetailContainer'>
                            <div className='AddedToQueue'>
                                <p> YOU HAVE BEEN ADDED TO QUEUE!</p>
                            </div>
                            <div className='Fanscore'>
                                <div className='Content'>
                                    <p>YOUR FANSCORE :</p>
                                    <p>{calculateFinalScore(fanScore.totalScore)}</p>
                                </div>
                                <div className='statement'>
                                    <p>Your Fan Level : </p>
                                    <p>{fanScore.fanLevel}</p>
                                </div>
                            </div>
                        </div>

                        <div className='OK'>
                            <Button btnText="OK" onClickFunction={handleClose}></Button>
                        </div>
                    </>


                )}
            </div>

        </div>
    )
}

export default ConfirmBooking
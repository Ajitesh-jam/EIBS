'use client'
import React, { useEffect, useState } from 'react'
import './ConfirmBooking.css'
import Button from '../Button/Button'
import { triggerConfetti } from '../utils/CanvasConfetti'
import { calculateFanScore } from '../utils/fanScore'
import { addBuyersToQueue } from '../utils/web3Final'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/app/firebase/config'
const ConfirmBooking = ({ onClose, artist, buyers, eventId, totalBill }) => {
    const [fanScore, setFanScore] = useState(null);
    const [finalScore, setFinalScore] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user] = useAuthState(auth);
    console.log("user in confirm booking", user);
        
        const addTicketToWeb2 = async () => {
            try {
                const response = await fetch(`/api/fans/ticket/add/${user.email}`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            ticketID: eventId
                        }),
                    }
                );
                console.log('response', response);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
            } catch (err) {
                console.error("Failed to fetch events:", err);
            }
        };
    
        async function addBuyers() {
            const response = await addBuyersToQueue(eventId, parseInt(finalScore), buyers, totalBill);
            console.log("TicketBuyed:", response);
        }
    
        const handleClose = async () => {
            await addTicketToWeb2();
            await addBuyers();
    
            console.log("buyers in confirm booking", buyers);
            console.log("event id in confirm booking", eventId);
            console.log("total bill in confirm booking", totalBill);
            //final score
            console.log("final score in confirm booking", finalScore);
    
            onClose();
        }
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
            setFinalScore(calculateFinalScore(score.totalScore));
        } catch (error) {
            setError('Failed to calculate fan score');
            console.error(error);
        } finally {
            setLoading(false);
            if(!error) triggerConfetti();
        }
    };



    useEffect(() => {
        checkFanScore(artist);
    }, [])

    return (
        <div className='Container'>
            <div className='BookingContainer'>
                {loading && <p style={{ fontFamily: 'CD-Regular' }}>Calculating score...</p>}
                {error && <p>Error: {error}</p>}
                {fanScore && (


                    <>
                        <div className='FanscoreDetailContainer'>
                            <div className='AddedToQueue'>
                                <p> Proceed with the payment, to add yourself to the QUEUE!</p>
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
                            <Button btnText="Pay Now" onClickFunction={handleClose}></Button>
                        </div>
                    </>


                )}
            </div>

        </div>
    )
}

export default ConfirmBooking
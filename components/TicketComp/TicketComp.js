import React, { useEffect, useState } from 'react'
import './TicketComp.css'
import Button from '../Button/Button'
import { sellTicket } from '../utils/web3Final'

import { checkTicketOwnership, getAccounts } from '../utils/web3Final'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/app/firebase/config'
const TicketComp = ({ ticketID }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [status, setStatus] = useState('Pending')
    const [user] = useAuthState(auth);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await fetch(`/api/events/get/${ticketID}`)
                const data = await res.json();
                console.log('data:', data)
                if (res.ok) {
                    setData(data);
                }
                else {
                    console.log('error in fetching tickets')
                    alert('Error in fetching tickets: ' + data.error)
                }


                //check ticket Status
                const publicAddress = await getAccounts();
                const ownershipStatus = await checkTicketOwnership(ticketID, publicAddress[0]);
                console.log('ownership status: ' + ownershipStatus);
                if (ownershipStatus == 1) {
                    setStatus('Accepted');
                }
                else if (ownershipStatus == 0) {
                    setStatus('Rejected');
                }
                else if (ownershipStatus == 2) {
                    setStatus('Pending');
                }


            }
            catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }

        }
        fetchData()

    }, []);

    const handleReturnTicket = async () => {


        try {
            //call api/fans/ticket/delete/:email and pass data.ticketID in request
            const response = await fetch(`/api/fans/ticket/delete/${user.email}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ticketID: ticketID
                }),
            });
            console.log('response', response);
            const data1 = await response.json();
            console.log('data:', data1)
            if(response.ok){
                alert('Ticket Returned Successfully')
            }
            else{
                alert('Error in returning ticket: ' + data.error)
            }


        }
        catch (err) {
            console.log(err)
        }
    }


    return (
        <div className='TicketCompContainer'>
            {!loading &&
                <>
                    <div className='TicketImgContainer'>
                        <img src={data.image} alt="Eventimg" className='EventImgInTicket'></img>
                    </div>
                    <div className='TicketDetails'>
                        <div className='TicketEventname'>
                            <p>Artist Name :    {data.artistName}</p>
                        </div>
                        <div className='OtherDetails'>
                            <p>Booking Initiated at timestamp :            {(data.date)} </p>
                            <p className='TicketStatus'>Status : {status} </p>
                        </div>
                        {status === 'Accepted' && (
                            <div className='ReturnTicketBtn'>
                                <Button btnText="Return Ticket" onClickFunction={handleReturnTicket} />
                            </div>

                        )}
                    </div>
                </>
            }
            {loading && <h2 style={{ textAlign: 'center' }}>Loading...</h2>}
        </div>
    )
}

export default TicketComp
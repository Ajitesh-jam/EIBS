import React, { useEffect, useState } from 'react'
import './TicketComp.css'

import { checkTicketOwnership,getAccounts } from '../utils/web3Final'
const TicketComp = ({ticketID}) => {
    const [ data , setData ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ status, setStatus ] = useState('Pending')
    useEffect(() =>{
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

            }
            catch (err) {
                console.log(err)
            }finally {
                setLoading(false)
            }
            
        }
        fetchData()

    }, []);
    return (
        <div className='TicketCompContainer'>
           {!loading && 
           <>
            <div className='TicketImgContainer'>
                <img src={data.image} alt="Eventimg" className='EventImgInTicket'></img>
            </div>
            <div className='TicketDetails'>
                <div className='TicketEventname'>
                    <p>Event Name </p>
                </div>
                <div className='OtherDetails'>
                    <p>Artist Name :           {data.artistName}</p>
                    <p>Booking Initiated at :            {data.date} </p>
                    <p className='TicketStatus'>Status : </p>
                </div>
            </div>
           </>
            }
            {loading && <h2 style={{textAlign: 'center'}}>Loading...</h2>}
        </div>
    )
}

export default TicketComp
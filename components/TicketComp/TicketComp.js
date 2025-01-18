import React, { useEffect, useState } from 'react'
import './TicketComp.css'

const TicketComp = ({ticketID}) => {
    const [ data , setData ] = useState([])
    useEffect(() =>{
        const fetchData = async () => {
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
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchData()

    }, []);
    return (
        <div className='TicketCompContainer'>
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
        </div>
    )
}

export default TicketComp
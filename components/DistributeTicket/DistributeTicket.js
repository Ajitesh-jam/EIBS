'use client'
import React, { useEffect, useState } from 'react'
import './DistributeTicket.css'
import Button from '../Button/Button'
import { distributeTickets, withdrawArtistBalance } from '../utils/web3Final'

const DistributeTicket = ({ eventId }) => {
    console.log('eventId', eventId)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await fetch(`/api/events/get/${eventId}`)
                const da = await res.json()
                console.log('data:', da)
                if (res.ok) {
                    setData(da)
                } else {
                    console.log('error in fetching events data:', res)
                    alert('Error in fetching events: ' + da.error)
                }
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [eventId])

    const handleDistributeNow = async () => {
        console.log("Distribute Now")
        const res = await distributeTickets(eventId)
        console.log("res", res)
    }

    const handleRetrieveMoney = async () => {
        console.log("Retrieve Money")
        const res = await withdrawArtistBalance(eventId)
        console.log("res", res)
    }

    return (
        <div className='MegaContainer'>
            <div className='DistributeTicketContainer'>
                <div className='DistributeTicketImgContainer'>
                    <img src={data.image} alt="Eventimg" className='EventImgInTicket'></img>
                </div>
                <div className='DistributeTicketDetails'>
                    <div className='TicketEventname'>
                        <p>{data.artistName}</p>
                    </div>
                    <div className='OtherDetails'>
                        <p>No. of Tickets :  {data.numberOfTickets}</p>
                        <p>Ticket Price : {data.ticketPrice} WEI</p>
                    </div>
                </div>
            </div>
            <div className='Distribute'>
                <Button btnText="Distribute Now" onClickFunction={handleDistributeNow}></Button>
                <Button btnText="Retrieve Money" onClickFunction={handleRetrieveMoney}></Button>
            </div>
        </div>
    )
}

export default DistributeTicket
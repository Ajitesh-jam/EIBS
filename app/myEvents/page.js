"use client";
import './myEvents.css'
import DistributeTicket from '@/components/DistributeTicket/DistributeTicket'
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";

const Page = () => {
  const [user] = useAuthState(auth);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.email) {
        setLoading(true);
        try {
          const res = await fetch(`/api/artist/events/get/${user.email}`);
          const data = await res.json();
          console.log('data response of get events: ', data);
          if (res.ok) {
            setEvents(data.events);
            console.log('events:', data.events);
          } else {
            console.log('error in fetching events');
            alert('Error in fetching events: ' + data.error);
          }
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className='myEventsContainer'>
      <h1>My Events</h1>
      <div className='myEventsWrapper'>
        {
          events.map((event, index) => (
            <DistributeTicket key={index} eventId={event} />
          ))
        }
      </div>
    </div>
  )
}

export default Page
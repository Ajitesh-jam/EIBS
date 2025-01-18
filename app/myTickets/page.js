"use client";

import React, { useEffect, useState } from "react";
import "./myTickets.css";
import TicketComp from "@/components/TicketComp/TicketComp";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";

const Page = () => {
  const [user] = useAuthState(auth);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("user in my tickets:", user);

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.email) {
        setLoading(true);
        try {
          const res = await fetch(`/api/fans/ticket/get/${user.email}`);
          const data = await res.json();
          console.log('data response of get tickets: ', data);
          if (res.ok) {
            setTickets(data.tickets);
          } else {
            console.log('error in fetching tickets');
            alert('Error in fetching tickets: ' + data.error);
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
    <div className="myTicketsContainer">
      <h1>My Tickets</h1>
      {loading && <h2>Loading...</h2>}
      {!loading && tickets.length > 0 &&
        tickets.map((ticket) => {
          return <TicketComp key={ticket} ticketID={ticket} />;
        })}
      {!loading && tickets.length === 0 && <h2>No tickets found</h2>}
    </div>
  );
};

export default Page;
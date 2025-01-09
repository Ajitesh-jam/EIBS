
'use client'
//import web3 from components/utils/web3.js
import { getAccounts,createEvent, buyTicket, sellTicket, getTicketPrice, getSellingTicketPrice, checkTicketOwnership, events } from "@/components/utils/web3.js";
import  {useState}  from "react";
import { Card } from "@/components/utils/card/card";

import Link from "next/link";

const Home = () => {
    const [accounts, setAccounts] = useState([]);
    const [eventId, setEventId] = useState(1);
    const [Event, setEvent] = useState([]);

    async function getAccount(){
       const accs= await getAccounts();
       console.log(accs);
       setAccounts(accs);
       console.log("getAccounts", accounts);
    }

    async function getTicketPriceForEvent(){
        const price = await getTicketPrice(eventId);
        console.log(price);
    }

    async function getevents(){
        const event = await events(eventId);

        console.log(event);
        setEvent(event);
    }

    const [allevents, setAllevents] = useState([
        {
            name: "Black Marvin",
            aadhar: "Medical Assistant",
            image: "https://t3.ftcdn.net/jpg/02/21/36/48/360_F_221364834_GsaULQoVVobdJBHCrGHq3SFeO4FMzO66.jpg",
        },
        {
            name: "Eleanor Pena",
            aadhar: "Doctor",
            image: "https://t3.ftcdn.net/jpg/02/21/36/48/360_F_221364834_GsaULQoVVobdJBHCrGHq3SFeO4FMzO66.jpg",
        },
        {
            name: "Harsh",
            aadhar: "Doctor",
            image: "https://t3.ftcdn.net/jpg/02/21/36/48/360_F_221364834_GsaULQoVVobdJBHCrGHq3SFeO4FMzO66.jpg",
        },

    ]);

    const [event, setevent] = useState();



    return (
        <>
            <div className="bg-primary-yellow font-custom ">
            <p className="font-regular">Regular</p>
            <p className="font-medium">Medium</p>
            <p className="font-semibold">SemiBold</p>
            <p className="font-bold">Bold</p>
            </div>

            <h1>Accounts : {accounts} </h1> 

            <button onClick={getAccount}>Get Accounts</button>
            <input type="text" value={eventId} onChange={(e) => setEventId(e.target.value)} />
            <button onClick={getTicketPriceForEvent}>Get Ticket Price</button>

            <button onClick={getevents}>Get Events</button>




            <section className="team-section sec-pad-2 centred">
                        <div className="auto-container">
                            <div className="row clearfix">
                                {allevents.map((concert, index) => (
                                    <div
                                        key={index}
                                        className="col-lg-3 col-md-6 col-sm-12 team-block"
                                    >
                                        <div
                                            className="team-block-one wow fadeInUp animated"
                                            data-wow-delay={`${index * 200}ms`}
                                            data-wow-duration="1500ms"
                                        >
                                            <div className="inner-box">
                                                <div className="image-box">
                                                    <figure className="image">
                                                        <img
                                                            style={{
                                                                width: "287px",
                                                                height: "220px",
                                                                overflow: "hidden", // Ensures no content spills outside
                                                            }} 
                                                            src={concert.image}
                                                            alt={concert.name}
                                                        />
                                                    </figure>
                                                   
                                                </div>
                                                <div className="lower-content">
                                                    <h3>
                                                        <Link href="event-data" onClick={()=>{
                                                            setevent(concert);
                                                            console.log("event", event);
                                                        }}>
                                                            {concert.name}
                                                        </Link>
                                                    </h3>
                                                    
                                                    <span className="designation">
                                                        Details: bfjebnf
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
            </section>


            <Card image="https://img.etimg.com/thumb/msid-114611224,width-300,height-225,imgsize-13010,resizemode-75/diljit-dosanjh-shares-stunning-pictures-from-first-concert-in-paris-makes-promise-to-punjabi-music-lovers.jpg" name="ChainSmoker" index="1" />
            <Card image="https://img.etimg.com/thumb/msid-114611224,width-300,height-225,imgsize-13010,resizemode-75/diljit-dosanjh-shares-stunning-pictures-from-first-concert-in-paris-makes-promise-to-punjabi-music-lovers.jpg" name="ChainSmoker" index="1" />






      </>
    )
  }
  
  export default Home;

'use client'
//import web3 from components/utils/web3.js
import { getAccounts,createEvent, buyTicket, sellTicket, getTicketPrice, getSellingTicketPrice, checkTicketOwnership } from "@/components/utils/web3.js";
import  {useState}  from "react";

const Home = () => {
    const [accounts, setAccounts] = useState([]);
    const [eventId, setEventId] = useState(0);

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


      </>
    )
  }
  
  export default Home;
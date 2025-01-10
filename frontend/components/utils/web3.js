import Web3 from "web3";
import eventManagerABI from "./abis/event.json"; // Replace with the actual ABI file of your contract

const contractAddress = "0xA0691524fE2AF6a978d74Bd9B17F6700019f791F"; // Replace with your deployed contract address

// Initialize Web3 and contract
export function getWeb3() {
  if (window.ethereum) {
    return new Web3(window.ethereum);
  } else {
    throw new Error("MetaMask is not installed. Please install MetaMask and try again.");
  }
}

// Initialize the contract instance
export const eventManagerContract = () => {
  const web3 = getWeb3();
  return new web3.eth.Contract(eventManagerABI, contractAddress);
};

// Get connected accounts
export const getAccounts = async () => {

    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            console.log("Connected accounts:", accounts);
            return accounts;
        } catch (error) {
            throw new Error(`Error fetching accounts: ${error.message}`);
        }
    } else {
        throw new Error("MetaMask is not installed.");
    }
};

//check login status
export const checkMetaMaskLogin = async () => {
  if (typeof window.ethereum !== "undefined") {
    try {
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      if (accounts.length > 0) {
        console.log("User is logged in with MetaMask:", accounts[0]); // First account
        return true;
      } else {
        console.log("MetaMask is installed, but no account is connected.");
        return false;
      }
    } catch (error) {
      console.error("Error fetching MetaMask accounts:", error);
      return false;
    }
  } else {
    console.log("MetaMask is not installed!");
    return false;
  }
};


// Create an event
export const createEvent = async (name, location, date, ticketPrice, ticketsLeft) => {
  const contract = eventManagerContract();
  const accounts = await getAccounts();

  try {
    const response = await contract.methods
      .createEvent(location, name, date, ticketPrice, ticketsLeft)
      .send({ from: accounts[0] });
    console.log("Event created successfully:", response);
    return response;
  } catch (error) {
    throw new Error(`Error creating event: ${error.message}`);
  }
};

// Buy a ticket for an event
export const buyTicket = async (eventId, ticketPrice) => {
  const contract = eventManagerContract();
  const accounts = await getAccounts();

  try {
    const response = await contract.methods
      .buyTicket(eventId)
      .send({ from: accounts[0], value: ticketPrice });
    console.log("Ticket bought successfully:", response);
    return response;
  } catch (error) {
    throw new Error(`Error buying ticket: ${error.message}`);
  }
};

// Sell a ticket for an event
export const sellTicket = async (eventId, resalePrice) => {
  const contract = eventManagerContract();
  const accounts = await getAccounts();

  try {
    const response = await contract.methods
      .sellTicket(eventId)
      .send({ from: accounts[0], value: resalePrice });
    console.log("Ticket sold successfully:", response);
    return response;
  } catch (error) {
    throw new Error(`Error selling ticket: ${error.message}`);
  }
};

// Get ticket price for an event
export const getTicketPrice = async (eventId) => {
  const contract = eventManagerContract();

  try {
    const price = await contract.methods.getTicketPrice(eventId).call();
    console.log("Ticket price retrieved:", price);
    return price;
  } catch (error) {
    throw new Error(`Error retrieving ticket price: ${error.message}`);
  }
};

// Get selling ticket price for an event
export const getSellingTicketPrice = async (eventId) => {
    const contract = eventManagerContract();
  
    try {
      const price = await contract.methods.getSellingTicketPrice(eventId).call();
      console.log("Ticket price retrieved:", price);
      return price;
    } catch (error) {
      throw new Error(`Error retrieving ticket price: ${error.message}`);
    }
  };

// Check ticket ownership
export const checkTicketOwnership = async (eventId, userAddress) => {
  const contract = eventManagerContract();

  try {
    const hasTicket = await contract.methods.checkTicketOwnership(eventId, userAddress).call();
    console.log(`User ${userAddress} ownership status:`, hasTicket);
    return hasTicket;
  } catch (error) {
    throw new Error(`Error checking ticket ownership: ${error.message}`);
  }
};


// Check ticket ownership
export const events = async(eventId) => {
    const contract = eventManagerContract();
  
    try {
      const events = await contract.methods.events(eventId).call();

      return events;
    } catch (error) {
      throw new Error(`Error checking ticket ownership: ${error.message}`);
    }
  };





// 'use client'

// import React from 'react'
// import './Homepage.css'
// import Navbar from '../Navbar/Navbar'
// import Card from '../Card/Card'

// import { events } from '../utils/web3'
// import { useEffect } from 'react'

// const Homepage = () => {
//     const [eventData, setEventData] = React.useState([])
//     const [loading, setLoading] = React.useState(true)

//     useEffect(() => {
//         const fetchEvents = async () => {
//             try {
//                 const eventsData = await events(0);
//                 setEventData(eventsData);
//                 setLoading(false);
//                 console.log(eventsData);
//             } catch (error) {
//                 console.error('Error fetching events:', error);
//                 setLoading(false);
//             }
//         }
//         fetchEvents()
//     }, [])

//     const price = () => {
//         if (eventData.length >= 6) {
//             return eventData[4] / eventData[5];
//         }
//         return 'N/A';
//     }

//     if (loading) {
//         return <div className='Homepage-container'>Loading...</div>
//     }

//     return (
//         <div className='Homepage-container'>
//             <Navbar />
//             <div className='Hero-container'>
//                 <div className='Hero-left'></div>
//                 <div className='Hero-right'>
//                     <div className='Heading'>
//                         <p>Tickets Tailored to Real Fans.</p>
//                     </div>
//                     <div className='Sub-Heading'>
//                         <p>Powered by Avalanche</p>
//                     </div>
//                 </div>
//             </div>
//             <div className='Events-container'>
//                 <div className='Event-Heading'>
//                     <p>Upcoming Events</p>
//                 </div>
//                 <div className='Card-container'>
//                     <Card
//                         dateText={eventData[3] || 'Date not available'}
//                         priceText={`${price()} wei`}
//                         location={eventData[2] || 'Location not available'}
//                         imageSrc="" />
                        
//                     <Card
//                         dateText="Sat, 25 Jan onwards"
//                         priceText="$100 onwards"
//                         imageSrc="" />
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Homepage

import Web3 from "web3";
import eventManagerABI from "./abis/eventFinal.json"; // Replace with your ABI file path

const contractAddress = "0x12A53C4f009676ad33881d6c7292A1A73eDF4F9A"; // Replace with your deployed contract address

// Initialize Web3 and Contract
export function getWeb3() {
  if (window.ethereum) {
    return new Web3(window.ethereum);
  } else {
    throw new Error("MetaMask is not installed. Please install MetaMask and try again.");
  }
}

export const eventManagerContract = () => {
  const web3 = getWeb3();
  return new web3.eth.Contract(eventManagerABI, contractAddress);
};

// Get User Accounts
export const getAccounts = async () => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      return accounts;
    } catch (error) {
      throw new Error(`Error fetching accounts: ${error.message}`);
    }
  } else {
    throw new Error("MetaMask is not installed.");
  }
};

// Create Event
export const createEvent = async (artist, name, ticketPrice, ticketsLeft) => {
  const contract = eventManagerContract();
  const accounts = await getAccounts();
  try {
    const response = await contract.methods
      .createEvent(artist, name, ticketPrice, ticketsLeft)
      .send({ from: accounts[0] });
    return response;
  } catch (error) {
    throw new Error(`Error creating event: ${error.message}`);
  }
};

// Add Buyers to Queue
export const addBuyersToQueue = async (eventId, fanScore, buyers, totalCost) => {
  const contract = eventManagerContract();
  const accounts = await getAccounts();
  try {
    const response = await contract.methods
      .addBuyersToQueue(eventId, fanScore, buyers)
      .send({ from: accounts[0], value: totalCost });
    return response;
  } catch (error) {
    throw new Error(`Error adding buyers to queue: ${error.message}`);
  }
};

// Distribute Tickets
export const distributeTickets = async (eventId) => {
  const contract = eventManagerContract();
  const accounts = await getAccounts();
  try {
    const response = await contract.methods
      .distributeTickets(eventId)
      .send({ from: accounts[0] });
    return response;
  } catch (error) {
    throw new Error(`Error distributing tickets: ${error.message}`);
  }
};

// Buy Ticket
export const buyTicket = async (eventId, ticketPrice) => {
  const contract = eventManagerContract();
  const accounts = await getAccounts();
  try {
    const response = await contract.methods
      .buyTicket(eventId)
      .send({ from: accounts[0], value: ticketPrice });
    return response;
  } catch (error) {
    throw new Error(`Error buying ticket: ${error.message}`);
  }
};

// Sell Ticket
export const sellTicket = async (eventId) => {
  const contract = eventManagerContract();
  const accounts = await getAccounts();
  try {
    const response = await contract.methods
      .sellTicket(eventId)
      .send({ from: accounts[0] });
    return response;
  } catch (error) {
    throw new Error(`Error selling ticket: ${error.message}`);
  }
};

// Withdraw Artist Balance
export const withdrawArtistBalance = async (eventId) => {
  const contract = eventManagerContract();
  const accounts = await getAccounts();
  try {
    const response = await contract.methods
      .withdrawArtistBalance(eventId)
      .send({ from: accounts[0] });
    return response;
  } catch (error) {
    throw new Error(`Error withdrawing artist balance: ${error.message}`);
  }
};

// Retrieve Event Details
export const events = async (eventId) => {
  const contract = eventManagerContract();
  try {
    const eventDetails = await contract.methods.events(eventId).call();
    return eventDetails;
  } catch (error) {
    throw new Error(`Error retrieving event details: ${error.message}`);
  }
};


// Get the ticket price for an event
export const getTicketPrice = async (eventId) => {
  const contract = eventManagerContract();

  try {
    const price = await contract.methods.getTickePrice(eventId).call();
    console.log(`Ticket price for event ${eventId}:`, price);
    return price;
  } catch (error) {
    throw new Error(`Error fetching ticket price: ${error.message}`);
  }
};



// Get the total number of events
export const totalEvents = async (eventId) => {
  const contract = eventManagerContract();

  try {
    const num = await contract.methods.totalEvents().call();
    
    return num;
  } catch (error) {
    throw new Error(`Error fetching ticket price: ${error.message}`);
  }
};


// Get the selling ticket price for an event
export const getSellingTicketPrice = async (eventId) => {
  const contract = eventManagerContract();

  try {
    const sellingPrice = await contract.methods.getSellingTicketPrice(eventId).call();
    console.log(`Selling ticket price for event ${eventId}:`, sellingPrice);
    return sellingPrice;
  } catch (error) {
    throw new Error(`Error fetching selling ticket price: ${error.message}`);
  }
};

// Check if tickets are left for an event
export const checkIfTicketsLeft = async (eventId) => {
  const contract = eventManagerContract();

  try {
    const ticketsLeft = await contract.methods.checkIfTicketLeft(eventId).call();
    console.log(`Tickets left for event ${eventId}:`, ticketsLeft);
    return ticketsLeft;
  } catch (error) {
    throw new Error(`Error checking tickets left: ${error.message}`);
  }
};

// Check ticket ownership for a user
export const checkTicketOwnership = async (eventId, userAddress) => {
  const contract = eventManagerContract();

  try {
    const ownershipStatus = await contract.methods.checkTicketOwnership(eventId, userAddress).call();
    // Ownership statuses:
    // 0 - No ticket owned
    // 1 - Ticket owned
    // 2 - Tickets not yet distributed
    console.log(`Ownership status for event ${eventId}, user ${userAddress}:`, ownershipStatus);
    return ownershipStatus;
  } catch (error) {
    throw new Error(`Error checking ticket ownership: ${error.message}`);
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





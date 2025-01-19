import Web3 from "web3";
import eventManagerABI from "./abis/event.json"; // Replace with the actual ABI file of your contract

const contractAddress = "0xbF43C988e4F14B57F3208D31778Fb58e271e8FCB"; // Replace with your deployed contract address

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

// Create an event
export const createEvent = async (name, location, date, ticketPrice, ticketsLeft,imgUrl) => {
  const contract = eventManagerContract();
  const accounts = await getAccounts();

  try {
    const response = await contract.methods
      .createEvent(location, name, date, ticketPrice, ticketsLeft,imgUrl)
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
      console.log(`Event ${eventId} ownership status:`, events);

      return events;
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

// Buy multiple tickets for an event
export const buyMultipleTickets = async (buyers, eventId, totalCost) => {
  const contract = eventManagerContract(); // Initialize your EventManager contract
  const accounts = await getAccounts(); // Get user accounts (from Web3 provider)

  try {
    const response = await contract.methods
      .buyMultipleTickets(buyers, eventId)
      .send({ from: accounts[0], value: totalCost }); // Send transaction
    console.log("Tickets bought successfully:", response);
    return response;
  } catch (error) {
    console.error("Error buying tickets:", error);
    throw new Error(`Error buying tickets: ${error.message}`);
  }
};











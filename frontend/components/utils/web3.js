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

import Web3 from "web3";
import eventManagerABI from "./abis/eventFinal.json";

const contractAddress = "0x12A53C4f009676ad33881d6c7292A1A73eDF4F9A";

// Initialize Web3
export function getWeb3() {
  if (typeof window !== "undefined" && window.ethereum) {
    // Client-side
    return new Web3(window.ethereum);
  } else {
    // Server-side
    const provider = new Web3.providers.HttpProvider("https://avalanche-fuji.infura.io/v3/74570594449d46a9a9b546ca93a736af"); // Replace with your Infura/Alchemy endpoint
    return new Web3(provider);
  }
}

// Get the contract instance
export const eventManagerContract = () => {
  const web3 = getWeb3();
  return new web3.eth.Contract(eventManagerABI, contractAddress);
};

// Check ticket ownership for a user
export const checkTicketOwnership = async (eventId, userAddress) => {
  const contract = eventManagerContract();

  try {
    const ownershipStatus = await contract.methods.checkTicketOwnership(eventId, userAddress).call();
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





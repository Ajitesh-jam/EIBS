// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract EventManager {
    struct Event {
        address artist;
        string name;
        uint256 ticketPrice;
        uint32 ticketsLeft;
        address ticketToken;
        bool ticketsDistributed;
        uint256 artistBalance;
    }

    struct BuyerQueue {
        uint32 fanScore;
        address[] buyers;
    }

    Event[] public events;
    mapping(uint256 => BuyerQueue[]) public buyerQueues; // Mapping of Event ID to BuyerQueue
    uint32 public totalEvents;

    modifier onlyArtist(uint256 eventId) {
        require(events[eventId].artist == msg.sender, "Not the event artist");
        _;
    }

    function createEvent(
        address artist,
        string memory name,
        uint256 ticketPrice,
        uint32 ticketsLeft
    ) external {
        require(ticketsLeft > 0, "Tickets must be greater than 0");

        // Deploy a new ERC20 ticket token for the event
        TicketToken ticket = new TicketToken(name, "TT");

        events.push(
            Event({
                artist: artist,
                name: name,
                ticketPrice: ticketPrice,
                ticketsLeft: ticketsLeft,
                ticketToken: address(ticket),
                ticketsDistributed: false,
                artistBalance: 0
            })
        );
        totalEvents++;

    }

    function editEvent(
        uint256 eventId,
        string memory name,
        uint256 ticketPrice,
        uint32 ticketsLeft
    ) external onlyArtist(eventId) {
        Event storage e = events[eventId];
        require(!e.ticketsDistributed, "Cannot edit after ticket distribution");
        
        e.name = name;
        e.ticketPrice = ticketPrice;
        e.ticketsLeft = ticketsLeft;
    }

    function addBuyersToQueue(
        uint256 eventId,
        uint32 fanScore,
        address[] memory buyers
    ) external payable {
        Event storage e = events[eventId];
        uint256 totalCost = e.ticketPrice * buyers.length;

        require(msg.value >= totalCost, "Incorrect payment amount");
        require(e.ticketsLeft >= buyers.length, "Not enough tickets available");

        buyerQueues[eventId].push(BuyerQueue({fanScore: fanScore, buyers: buyers}));
    }

    

    function distributeTickets(uint32 eventId) external {
        Event storage e = events[eventId];
        BuyerQueue[] storage buyerQueue = buyerQueues[eventId];

        require(e.ticketsDistributed == false, "Tickets already distributed");
        require(buyerQueue.length > 0, "No buyers in queue");
        require(e.ticketsLeft > 0, "No tickets available");

        // Sort the buyer queue by fanScore in descending order
        for (uint256 i = 0; i < buyerQueue.length - 1; i++) {
            for (uint256 j = i + 1; j < buyerQueue.length; j++) {
                if (buyerQueue[i].fanScore < buyerQueue[j].fanScore) {
                    BuyerQueue memory temp = buyerQueue[i];
                    buyerQueue[i] = buyerQueue[j];
                    buyerQueue[j] = temp;
                }
            }
        }

        // Distribute tickets based on sorted fanScore
        for (uint256 i = 0; i < buyerQueue.length; i++) {
            for(uint j=0;j < buyerQueue[i].buyers.length ;j++ )
            if (e.ticketsLeft == 0) {
                // Refund remaining buyers if tickets are sold out
                payable(buyerQueue[i].buyers[j]).transfer(e.ticketPrice);
            } else {
                // Mint a ticket for the buyer
                if (TicketToken(events[eventId].ticketToken).balanceOf(buyerQueue[i].buyers[j]) ==0){
                    TicketToken(e.ticketToken).mint(buyerQueue[i].buyers[j], 1);
                    e.ticketsLeft--;
                    //payable(e.artist).transfer(e.ticketPrice);
                    e.artistBalance+=e.ticketPrice;
                }
                else payable(buyerQueue[i].buyers[j]).transfer(e.ticketPrice);
            }
        }
        e.ticketsDistributed = true;
    }


    function buyTicket(uint256 eventId) external payable {
        Event storage e = events[eventId];
        require(e.ticketsDistributed, "Tickets not distributed yet");
        require(e.ticketsLeft > 0, "No tickets left");
        require(msg.value >= e.ticketPrice, "Incorrect ticket price");
        require(TicketToken(events[eventId].ticketToken).balanceOf(msg.sender) ==0,"You already have ticket");
        TicketToken(e.ticketToken).mint(msg.sender, 1);
        e.ticketsLeft--;
        e.artistBalance += msg.value;

    }

    function sellTicket(uint256 eventId) external {
        Event storage e = events[eventId];
        require(TicketToken(e.ticketToken).balanceOf(msg.sender) > 0, "No ticket to sell");
        require(address(this).balance >= e.ticketPrice, "Insufficient contract balance");

        uint256 resalePrice = e.ticketPrice / 10; // Artist gets 10% of the ticket price

        TicketToken(e.ticketToken).burn(msg.sender, 1);
        e.ticketsLeft++;
        e.artistBalance -= e.ticketPrice;

        payable(e.artist).transfer(resalePrice);
        payable(msg.sender).transfer(e.ticketPrice - resalePrice);

    }

    function withdrawArtistBalance(uint256 eventId) external {
        Event storage e = events[eventId];
        uint256 balance = e.artistBalance;
        require(balance > 0, "No balance to withdraw");
        payable(e.artist).transfer(balance);
        e.artistBalance = 0;
    }

    
    function getSellingTicketPrice(uint256 eventId) public view returns (uint256) {
        return events[eventId].ticketPrice - events[eventId].ticketPrice / 10;
    }
    function getTickePrice(uint256 eventId) public view returns (uint256){
        return events[eventId].ticketPrice;
    }

    function checkIfTicketLeft(uint eventId) public view returns (uint){
        return events[eventId].ticketsLeft ;
    }

    function checkTicketOwnership(uint256 eventId, address addr) public view returns (uint8) {
         Event storage e = events[eventId];

        if(e.ticketsDistributed == false){
            return 2;
        }
        else{ 
            if (TicketToken(events[eventId].ticketToken).balanceOf(addr) > 0){
            return 1;
            }
            else{
                return 0;
            }
        }
    }
}

contract TicketToken is ERC20 {
    //address public owner;

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        //owner = msg.sender;
    }

    // modifier onlyOwner() {
    //     require(msg.sender == owner, "Not the contract owner");
    //     _;
    // }

    function mint(address to, uint256 amount) external  {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external  {
        _burn(from, amount);
    }
}


//contract Address : 0x12A53C4f009676ad33881d6c7292A1A73eDF4F9A

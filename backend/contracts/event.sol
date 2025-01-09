// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract EventManager  {
    struct Event {
        address artist; // Artist's public address
        string name;
        string location; // Google Maps link
        uint32 date; // Timestamp of the event
        uint256 ticketPrice; // Total ticket price in wei
        uint32 ticketsLeft; // Number of tickets left
        address ticketToken; // ERC20 ticket contract address
    }

    Event[] public events;

    modifier onlyArtist(uint256 eventId) {
        require(events[eventId].artist == msg.sender, "Not the event artist");
        _;
    }

    function createEvent(
        string memory location,
        string memory name,
        uint32 date,
        uint256 startingTicketPrice,
        uint32 ticketsLeft
    ) external {
        require(ticketsLeft > 0, "Tickets left must be greater than 0");


        // Deploy a new ticket token for the event
        TicketToken ticket = new TicketToken(name, "TT");

        events.push(Event({
            artist: msg.sender,
            name: name,
            location: location,
            date: date,
            ticketPrice: startingTicketPrice * ticketsLeft,
            ticketsLeft: ticketsLeft,
            ticketToken: address(ticket)
        }));
    }

    function editEvent(
        uint256 eventId,
        string memory location,
        uint32 date,
        uint256 startingTicketPrice,
        uint32 ticketsLeft
    ) external onlyArtist(eventId) {
        require(ticketsLeft > 0, "Tickets left must be greater than 0");
        

        Event storage e = events[eventId];
        e.location = location;
        e.date = date;
        e.ticketPrice = startingTicketPrice * ticketsLeft;
        e.ticketsLeft = ticketsLeft;
    }

    function deleteEvent(uint256 eventId) external onlyArtist(eventId) {
        delete events[eventId];
    }

    function checkTicketOwnership(uint256 eventId, address addr) public view returns (bool) {
        return TicketToken(events[eventId].ticketToken).balanceOf(addr) > 0;
    }

    function buyTicket(uint256 eventId) external payable {
        Event storage e = events[eventId];
        require(e.ticketsLeft > 0, "No tickets left");
        uint256 pricePerTicket = e.ticketPrice / e.ticketsLeft;
        require(msg.value == pricePerTicket, "Incorrect ticket price");
        require(!checkTicketOwnership(eventId, msg.sender), "Ticket already owned");

        e.ticketsLeft -= 1;
        payable(e.artist).transfer(msg.value);
        TicketToken(e.ticketToken).mint(msg.sender, 1);
    }

    function getTicketPrice(uint256 eventId) public view returns (uint256) {
        Event storage e = events[eventId];
        require(e.ticketsLeft > 0, "No tickets available");
        return e.ticketPrice / e.ticketsLeft;
    }

    function getSellingTicketPrice(uint256 eventId) public view returns (uint256) {
        return getTicketPrice(eventId)- getTicketPrice(eventId) / 10;
    }

    function sellTicket(uint256 eventId) public payable {
        require(checkTicketOwnership(eventId, msg.sender), "No ticket ownership");
        uint256 resalePrice = getTicketPrice(eventId)/10;
        require(msg.value >= resalePrice, "Incorrect resale compensation");

        Event storage e = events[eventId];
        TicketToken ticketToken = TicketToken(e.ticketToken);
        require(ticketToken.balanceOf(msg.sender) > 0, "No token to burn");

        ticketToken.burn(msg.sender, 1); // Burn one ticket token
        payable(msg.sender).transfer(resalePrice);
    }
}

contract TicketToken is ERC20 {


    constructor(string memory name, string memory symbol) ERC20(name, symbol) {

    }

    function mint(address to, uint256 amount) external {

        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external {

        _burn(from, amount);
    }
}

//contarct adddress : 0xA0691524fE2AF6a978d74Bd9B17F6700019f791F
import { create } from 'zustand';

// Define the initial Event data structure
const initialState = {
    selectedEvent: 
    {
        name: "Default Event",
        image: "https://t3.ftcdn.net/jpg/06/04/20/28/360_F_604202821_K8R8KThj0ZfuQR3tCN0xwKiAwEzrBc4S.jpg",
        artist: "Default Artist",
        location: "Default Location",
        date: "Default Date",
        ticketPrice: "Default Ticket Price",
        ticketsLeft: "Default Tickets Left",
    }

};


// Create the Zustand store for Event management
const useEvents = create((set) => ({
    ...initialState,
    
    // Add a new Event
    addEvent: (Event) =>
        set((state) => ({ selectedEvent:  Event })),

    // Remove a Event by their publicAddress
    removeEvent: () =>
        set((state) => ({
            selectedEvent: 
                {
                    name: "Default Event",
                    image: "https://t3.ftcdn.net/jpg/06/04/20/28/360_F_604202821_K8R8KThj0ZfuQR3tCN0xwKiAwEzrBc4S.jpg",
                    artist: "Default Artist",
                    location: "Default Location",
                    date: "Default Date",
                    ticketPrice: "Default Ticket Price",
                    ticketsLeft: "Default Tickets Left",
            
                }
        })
    ),

    // Set a new Event in the state (can be used for temporary storage)
    setNewEvent: (Event) => set(() => ({ selectedEvent: Event })),

   
}));

export default useEvents;

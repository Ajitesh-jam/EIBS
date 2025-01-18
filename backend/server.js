const express = require('express');
const cors = require('cors'); // Import CORS package
const { initializeApp } = require("firebase/app");
const { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  query, 
  where, 
  getDocs, 
  updateDoc, 
  deleteDoc 
} = require("firebase/firestore");

const app = express();
const port = 8000;

app.use(cors()); // Enable CORS
app.use(express.json()); // Handle JSON requests

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpOT2KxA0FqWUnZnNZeILITRXXeBIeipE",
  authDomain: "medblock-9305e.firebaseapp.com",
  projectId: "medblock-9305e",
  storageBucket: "medblock-9305e.appspot.com",
  messagingSenderId: "266663758075",
  appId: "1:266663758075:web:184fb1b14f56e7eb76085e",
  measurementId: "G-VKM81ZZVQ4"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);

// Create Event
app.post('/createEvent', async (req, res) => {
  const eventData = req.body;
  try {
    const eventsRef = collection(firestore, "events");
    await setDoc(doc(eventsRef, `${eventData.EventID}`), eventData);
    res.status(200).send({ message: "Event created successfully", data: eventData });
  } catch (error) {
    res.status(500).send({ error: "Error creating event: " + error });
  }
});

// Get Event by ID
app.get('/getEvent/:EventID', async (req, res) => {
  const { EventID } = req.params;
  try {
    const docRef = doc(firestore, "events", EventID);
    const eventSnap = await getDoc(docRef);
    if (eventSnap.exists()) {
      res.status(200).send(eventSnap.data());
    } else {
      res.status(404).send({ error: "Event not found" });
    }
  } catch (error) {
    res.status(500).send({ error: "Error fetching event: " + error });
  }
});

// Update Event
app.put('/updateEvent/:EventID', async (req, res) => {
  const { EventID } = req.params;
  const updates = req.body;
  try {
    const docRef = doc(firestore, "events", EventID);
    await updateDoc(docRef, updates);
    res.status(200).send({ message: "Event updated successfully" });
  } catch (error) {
    res.status(500).send({ error: "Error updating event: " + error });
  }
});

// Delete Event
app.delete('/deleteEvent/:EventID', async (req, res) => {
  const { EventID } = req.params;
  try {
    const docRef = doc(firestore, "events", EventID);
    await deleteDoc(docRef);
    res.status(200).send({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: "Error deleting event: " + error });
  }
});

// Get All Events
app.get('/getAllEvents', async (req, res) => {
  try {
    const eventsRef = collection(firestore, "events");
    const querySnapshot = await getDocs(eventsRef);
    const events = [];
    querySnapshot.forEach((doc) => {
      events.push(doc.data());
    });
    res.status(200).send(events);
  } catch (error) {
    res.status(500).send({ error: "Error fetching all events: " + error });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

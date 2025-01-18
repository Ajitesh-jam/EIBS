import { NextResponse } from 'next/server';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import {app} from '@/app/firebase/config'

const firestore = getFirestore(app);

export async function POST(req) {
  const eventData = await req.json();
  // eventId is a unique identifier for the event
  const eventId = eventData.id;

  try {
    const eventsRef = collection(firestore, "events");
    await setDoc(doc(eventsRef, `${eventId}`), eventData);
    return NextResponse.json({ message: "Event created successfully", data: eventData });
  } catch (error) {
    return NextResponse.json({ error: "Error creating event: " + error }, { status: 500 });
  }
}
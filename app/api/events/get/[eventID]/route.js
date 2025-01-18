import { NextResponse } from 'next/server';
import { getFirestore, collection, doc, setDoc, getDoc } from 'firebase/firestore';
import {app} from '@/app/firebase/config'

const firestore = getFirestore(app);

export async function GET(req, { params }) {
    const { eventId } = params;
  
    try {
      const docRef = doc(firestore, "events", eventId);
      const eventSnap = await getDoc(docRef);
      if (eventSnap.exists()) {
        return NextResponse.json(eventSnap.data());
      } else {
        return NextResponse.json({ error: "Event not found" }, { status: 404 });
      }
    } catch (error) {
      return NextResponse.json({ error: "Error fetching event: " + error }, { status: 500 });
    }
}
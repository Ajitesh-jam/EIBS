import { NextResponse } from 'next/server';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import {app} from '@/app/firebase/config'

const firestore = getFirestore(app);

export async function GET(req) {

  
    try {
        const eventsRef = collection(firestore, "events");
        const querySnapshot = await getDocs(eventsRef);
        const events = [];
        querySnapshot.forEach((doc) => {
          events.push(doc.data());
        });
        return NextResponse.json(events);
       
    } catch (error) {
      return NextResponse.json({ error: "Error fetching event: " + error }, { status: 500 });
    }
}
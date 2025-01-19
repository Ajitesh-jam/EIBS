import { NextResponse } from 'next/server';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { app } from '@/app/firebase/config';

const firestore = getFirestore(app);

export async function POST(req, { params }) {
  const { email } = await params; // `email` as `fanID`
  const { eventID } = await req.json();

  try {
    const docRef = doc(firestore, 'artist', email);
    const fanSnap = await getDoc(docRef);

    if (fanSnap.exists()) {
      const fanData = fanSnap.data();
      const updatedevents = fanData.events ? [...fanData.events, eventID] : [eventID];

      await updateDoc(docRef, { events: updatedevents });
      return NextResponse.json({ message: 'event added successfully' });
    } else {
      return NextResponse.json({ error: 'Fan not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: `Error adding event: ${error.message}` }, { status: 500 });
  }
}

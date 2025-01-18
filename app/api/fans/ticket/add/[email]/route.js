import { NextResponse } from 'next/server';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { app } from '@/app/firebase/config';

const firestore = getFirestore(app);

export async function POST(req, { params }) {
  const { email } = await params; // `email` as `fanID`
  const { ticketID } = await req.json();

  try {
    const docRef = doc(firestore, 'fans', email);
    const fanSnap = await getDoc(docRef);

    if (fanSnap.exists()) {
      const fanData = fanSnap.data();
      const updatedTickets = fanData.tickets ? [...fanData.tickets, ticketID] : [ticketID];

      await updateDoc(docRef, { tickets: updatedTickets });
      return NextResponse.json({ message: 'Ticket added successfully' });
    } else {
      return NextResponse.json({ error: 'Fan not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: `Error adding ticket: ${error.message}` }, { status: 500 });
  }
}

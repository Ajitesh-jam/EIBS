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
      const currentTickets = fanData.tickets || [];

      // Check if the ticketID exists
      if (!currentTickets.includes(ticketID)) {
        return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
      }

      // Remove the ticketID
      const updatedTickets = currentTickets.filter(ticket => ticket !== ticketID);

      await updateDoc(docRef, { tickets: updatedTickets });
      return NextResponse.json({ message: 'Ticket deleted successfully' });
    } else {
      return NextResponse.json({ error: 'Fan not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: `Error deleting ticket: ${error.message}` }, { status: 500 });
  }
}

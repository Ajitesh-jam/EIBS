import { NextResponse } from 'next/server';
import { getFirestore, collection, doc, setDoc, getDoc } from 'firebase/firestore';
import {app} from '@/app/firebase/config'

const firestore = getFirestore(app);

export async function DELETE(req, { params }) {
    const { eventId } = params;
  
    try {
      const docRef = doc(firestore, "events", eventId);
      await deleteDoc(docRef);
      return NextResponse.json({ message: "Event deleted successfully" });
    } catch (error) {
      return NextResponse.json({ error: "Error deleting event: " + error }, { status: 500 });
    }
  }
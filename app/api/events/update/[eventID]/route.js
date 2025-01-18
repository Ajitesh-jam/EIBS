import { NextResponse } from 'next/server';
import { getFirestore, collection, doc, setDoc, getDoc } from 'firebase/firestore';
import {app} from '@/app/firebase/config'

const firestore = getFirestore(app);

export async function PUT(req, { params }) {
    const updates = await req.json();
    const { eventId } = params;
  
    try {
      const docRef = doc(firestore, "events", eventId);
      await updateDoc(docRef, updates);
      return NextResponse.json({ message: "Event updated successfully" });
    } catch (error) {
      return NextResponse.json({ error: "Error updating event: " + error }, { status: 500 });
    }
  }
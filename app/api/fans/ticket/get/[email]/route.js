import { NextResponse } from 'next/server';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { app } from '@/app/firebase/config';

const firestore = getFirestore(app);

export async function GET(req,  {params} ) {
  const { email } = await params; // `email` as `fanID`


  try {
    const docRef = doc(firestore, 'fans', email);
    const fanSnap = await getDoc(docRef);

    if (fanSnap.exists()) {
        const fanData = fanSnap.data();
        const tickets = fanData.tickets || [];
        return NextResponse.json({ tickets });
    } else {
      return NextResponse.json({ error: 'Fan not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: `Error adding ticket: ${error.message}` }, { status: 500 });
  }
}

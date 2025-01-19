import { NextResponse } from 'next/server';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '@/app/firebase/config';

const firestore = getFirestore(app);

export async function GET(req, { params }) {
  const { email } = await params;  

  try {
    const docRef = doc(firestore, 'artist', email);
    const fanSnap = await getDoc(docRef);

    if (fanSnap.exists()) {
      return NextResponse.json(fanSnap.data());
    } else {
      return NextResponse.json({ error: 'Fan not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: `Error fetching fan: ${error.message}` }, { status: 500 });
  }
}

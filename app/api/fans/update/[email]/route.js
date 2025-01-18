import { NextResponse } from 'next/server';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { app } from '@/app/firebase/config';

const firestore = getFirestore(app);

export async function PUT(req, { params }) {
  const { email } = params; // `email` as `fanID`
  const updates = await req.json(); // Expecting an object of updates

  try {
    const docRef = doc(firestore, 'fans', email);
    await updateDoc(docRef, updates);
    return NextResponse.json({ message: 'Fan updated successfully', updates });
  } catch (error) {
    return NextResponse.json({ error: `Error updating fan: ${error.message}` }, { status: 500 });
  }
}

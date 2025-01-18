import { NextResponse } from 'next/server';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { app } from '@/app/firebase/config';

const firestore = getFirestore(app);

export async function POST(req) {
  const fanData = await req.json();
  const { fanId } = fanData; // Expecting `fanId` in the payload

  try {
    const fansRef = collection(firestore, 'fans');
    await setDoc(doc(fansRef, `${fanId}`), fanData);
    return NextResponse.json({ message: 'Fan created successfully', data: fanData });
  } catch (error) {
    return NextResponse.json({ error: `Error creating fan: ${error.message}` }, { status: 500 });
  }
}

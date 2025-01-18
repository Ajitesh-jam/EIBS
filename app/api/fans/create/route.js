import { NextResponse } from 'next/server';
import { getFirestore, collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { app } from '@/app/firebase/config';

const firestore = getFirestore(app);

export async function POST(req) {
  const fanData = await req.json();
  const { email } = fanData; // Expecting `fanId` in the payload

  try {
    const fansRef = collection(firestore, 'fans');
    const fanDoc = doc(fansRef, `${email}`);
    const fanSnapshot = await getDoc(fanDoc);

    if (fanSnapshot.exists()) {
      return NextResponse.json({ message: 'Fan already exists', data: fanData }, { status: 400 });
    }

    await setDoc(fanDoc, fanData);
    return NextResponse.json({ message: 'Fan created successfully', data: fanData });
  } catch (error) {
    return NextResponse.json({ error: `Error creating fan: ${error.message}` }, { status: 500 });
  }
}

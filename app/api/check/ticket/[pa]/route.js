import { checkTicketOwnership } from '@/components/utils/web3final';
import { NextResponse } from 'next/server';

export async function POST(req, { params }) {
  const { pa } = await params; // `email` is used as `fanID`
  const { eventID } = await req.json();
  console.log("eventID", eventID);
  try {
    const check = await checkTicketOwnership( eventID,pa);
    console.log("check", check);
    if (check == 1) {
      return NextResponse.json({ message: 'Ticket owned' });
    } else {
      return NextResponse.json({ message: 'Ticket not owned' });
    }
  } catch (error) {
    return NextResponse.json({ error: `Error fetching fan: ${error.message}` }, { status: 500 });
  }
}
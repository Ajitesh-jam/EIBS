import { NextResponse } from 'next/server';

export async function GET(req) {
  const cookies = req.cookies;

  // Set all cookies to expire in the past to delete them
  const response = NextResponse.json({ message: 'Cookies deleted. Logged out' });

  // Loop through each cookie and expire it
  for (let [name] of cookies) {
    response.cookies.set(name, '', {
      path: '/',
      expires: new Date(0), // Set the expiration to the past
    });
  }

  return response;
}

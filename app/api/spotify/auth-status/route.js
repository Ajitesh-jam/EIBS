import { NextResponse } from 'next/server';

export async function GET(req) {
  const access_token = req.cookies.get('spotify_access_token');

  if (access_token) {
    const spotifyStats = req.cookies.get('spotify_stats');
    return NextResponse.json({
      isSpotyAuthenticated: true,
    });
  } else {
    return NextResponse.json({
      isSpotyAuthenticated: false,
    });
  }
}

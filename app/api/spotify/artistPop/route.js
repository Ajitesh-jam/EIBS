import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import SpotifyWebApi from 'spotify-web-api-node';

export async function GET(req) {
  // Access cookies using the `cookies()` API
  const cookieStore = cookies();
  const access_token = cookieStore.get('spotify_access_token')?.value;
  
  if (!access_token) {
    return NextResponse.json({ error: 'Access token is missing from cookies' }, { status: 400 });
  }

  const spotifyapi = new SpotifyWebApi();
  spotifyapi.setAccessToken(access_token);
  
  const url = new URL(req.url);
  const artistName = url.searchParams.get('artist');
  
  if (!artistName) {
    return NextResponse.json({ error: 'Artist name is required' }, { status: 400 });
  }

  try {
    // First, search for the artist to get their ID
    const searchResults = await spotifyapi.searchArtists(artistName, { limit: 1 });
    
    if (!searchResults.body.artists?.items.length) {
      return NextResponse.json({ error: 'Artist not found' }, { status: 404 });
    }

    // Get the first artist's ID from search results
    const artistId = searchResults.body.artists.items[0].id;
    
    // Now fetch the artist details using the ID
    const artistData = await spotifyapi.getArtist(artistId);
    
    return NextResponse.json({
      artistName: artistData.body.name,
      artistPopularity: artistData.body.popularity,
      artistId: artistData.body.id
    });
  } catch (error) {
    console.error('Error fetching Spotify data:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch data from Spotify API', 
        details: error.message 
      }, 
      { status: 500 }
    );
  }
}
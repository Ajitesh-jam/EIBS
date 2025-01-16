import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'; // Use next/headers to access cookies
import SpotifyWebApi from 'spotify-web-api-node';

export async function GET(req) {
  // Access cookies using the `cookies()` API
  const cookieStore = cookies();
  const access_token = cookieStore.get('spotify_access_token')?.value;

  if (!access_token) {
    return NextResponse.json({ error: 'Access token is missing from cookies' }, { status: 400 });
  }

  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(access_token);

  try {
    // Fetch top artists, recently played tracks, and saved tracks
    const [topArtists, savedTracks] = await Promise.all([
      spotifyApi.getMyTopArtists({ limit: 20 }),
      spotifyApi.getMySavedTracks({ limit: 20 })
    ]);

    const topArtistNames = topArtists.body.items.map(artist => artist.name);
    const savedTrackArtists = savedTracks.body.items.map(item =>
      item.track.artists.map(artist => artist.name)
    ).flat();

    // Return JSON response with the requested data
    return NextResponse.json({
      topArtists: topArtistNames,
      savedTrackArtists: savedTrackArtists
    });
  } catch (error) {
    console.error('Error fetching Spotify data:', error);
    return NextResponse.json({ error: 'Failed to fetch data from Spotify API', details: error.message }, { status: 500 });
  }
}

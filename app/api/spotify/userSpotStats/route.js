import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import SpotifyWebApi from 'spotify-web-api-node';

export async function GET(req) {
  const cookieStore = cookies();
  const access_token = cookieStore.get('spotify_access_token')?.value;
  
  if (!access_token) {
    return NextResponse.json(
      { error: 'Access token is missing from cookies' }, 
      { status: 400 }
    );
  }

  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(access_token);

  try {
    // Fetch all required data in parallel
    const [
      topArtistsLongTerm,
      topArtistsMediumTerm,
      topArtistsShortTerm,
      savedTracks,
      followedArtists,
      userPlaylists,
      topTracks
    ] = await Promise.all([
      spotifyApi.getMyTopArtists({ limit: 50, time_range: 'long_term' }),
      spotifyApi.getMyTopArtists({ limit: 50, time_range: 'medium_term' }),
      spotifyApi.getMyTopArtists({ limit: 50, time_range: 'short_term' }),
      spotifyApi.getMySavedTracks({ limit: 50 }),
      spotifyApi.getFollowedArtists({ limit: 50 }),
      spotifyApi.getUserPlaylists({ limit: 50 }),
      spotifyApi.getMyTopTracks({ limit: 50 })
    ]);

    // Process artists data across different time ranges
    const artistData = {
      longTerm: topArtistsLongTerm.body.items.map(artist => ({
        name: artist.name,
        id: artist.id,
        popularity: artist.popularity,
        genres: artist.genres
      })),
      mediumTerm: topArtistsMediumTerm.body.items.map(artist => ({
        name: artist.name,
        id: artist.id,
        popularity: artist.popularity,
        genres: artist.genres
      })),
      shortTerm: topArtistsShortTerm.body.items.map(artist => ({
        name: artist.name,
        id: artist.id,
        popularity: artist.popularity,
        genres: artist.genres
      }))
    };

    // Process saved tracks and their artists
    const savedTracksData = savedTracks.body.items.map(item => ({
      trackName: item.track.name,
      artists: item.track.artists.map(artist => ({
        name: artist.name,
        id: artist.id
      })),
      addedAt: item.added_at
    }));

    // Process followed artists
    const followedArtistsData = followedArtists.body.artists.items.map(artist => ({
      name: artist.name,
      id: artist.id,
      popularity: artist.popularity,
      genres: artist.genres
    }));

    // Process user's playlists
    const playlistsData = userPlaylists.body.items.map(playlist => ({
      name: playlist.name,
      id: playlist.id,
      trackCount: playlist.tracks.total,
      public: playlist.public
    }));

    // Extract genres from all sources
    const allGenres = new Set([
      ...artistData.longTerm.flatMap(artist => artist.genres),
      ...artistData.mediumTerm.flatMap(artist => artist.genres),
      ...artistData.shortTerm.flatMap(artist => artist.genres),
      ...followedArtistsData.flatMap(artist => artist.genres)
    ]);

    // Process top tracks
    const topTracksData = topTracks.body.items.map(track => ({
      name: track.name,
      id: track.id,
      artists: track.artists.map(artist => ({
        name: artist.name,
        id: artist.id
      })),
      popularity: track.popularity
    }));

    // Calculate genre preferences
    const genreFrequency = Array.from(allGenres).reduce((acc, genre) => {
      acc[genre] = {
        longTerm: artistData.longTerm.filter(artist => 
          artist.genres.includes(genre)).length,
        mediumTerm: artistData.mediumTerm.filter(artist => 
          artist.genres.includes(genre)).length,
        shortTerm: artistData.shortTerm.filter(artist => 
          artist.genres.includes(genre)).length
      };
      return acc;
    }, {});

    return NextResponse.json({
      topArtists: artistData,
      savedTracks: savedTracksData,
      followedArtists: followedArtistsData,
      playlists: playlistsData,
      topTracks: topTracksData,
      genrePreferences: genreFrequency,
      metadata: {
        totalSavedTracks: savedTracks.body.total,
        totalPlaylists: userPlaylists.body.total,
        totalFollowedArtists: followedArtists.body.artists.total
      }
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
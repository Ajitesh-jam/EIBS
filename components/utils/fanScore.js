/**
 * Calculate a comprehensive fan score for a specific artist based on extensive listening data
 * @param {string} artistName - Name of the artist to calculate score for
 * @returns {Promise<Object>} Detailed fan score analysis
 */
export async function calculateFanScore(artistName) {
  try {
    const [statsResponse, popularityResponse] = await Promise.all([
      fetch('/api/spotify/userSpotStats'),
      fetch(`/api/spotify/artistPop?artist=${encodeURIComponent(artistName)}`)
    ]);

    const userStats = await statsResponse.json();
    const artistPopData = await popularityResponse.json();

    let score = 0;
    const scoreFactors = [];
    
    // Weights now total to 1000 points
    const weights = {
      longTermArtist: 250,    // Long-term listening (25%)
      mediumTermArtist: 150,  // Medium-term (15%)
      shortTermArtist: 100,   // Short-term (10%)
      savedTracks: 150,       // Saved tracks (15%)
      playlists: 100,         // Playlists (10%)
      followedArtist: 100,    // Following status (10%)
      genreAffinity: 100,     // Genre match (10%)
      popularity: 50          // Inverse popularity (5%)
    };

    // 1. Time-range artist rankings
    ['longTerm', 'mediumTerm', 'shortTerm'].forEach(timeRange => {
      const artists = userStats.topArtists[timeRange];
      const artistIndex = artists.findIndex(
        artist => artist.name.toLowerCase() === artistName.toLowerCase()
      );

      if (artistIndex !== -1) {
        const weight = weights[`${timeRange}Artist`];
        const timeRangeScore = Math.round(((artists.length - artistIndex) / artists.length) * weight);
        score += timeRangeScore;
        scoreFactors.push({
          factor: `${timeRange} Artist Ranking`,
          contribution: timeRangeScore,
          details: `Ranked #${artistIndex + 1} in ${timeRange} listening history`,
          maxPossible: weight
        });
      }
    });

    // 2. Saved tracks analysis
    const savedTracksData = userStats.savedTracks;
    const artistSavedTracks = savedTracksData.filter(track => 
      track.artists.some(artist => artist.name.toLowerCase() === artistName.toLowerCase())
    );

    if (artistSavedTracks.length > 0) {
      const savedTracksScore = Math.round((artistSavedTracks.length / savedTracksData.length) * weights.savedTracks);
      score += savedTracksScore;
      scoreFactors.push({
        factor: 'Saved Tracks',
        contribution: savedTracksScore,
        details: `Found in ${artistSavedTracks.length} saved tracks`,
        maxPossible: weights.savedTracks
      });
    }

    // 3. Playlist analysis
    const playlistsWithArtist = userStats.playlists.filter(playlist =>
      playlist.name.toLowerCase().includes(artistName.toLowerCase())
    );

    if (playlistsWithArtist.length > 0) {
      const playlistScore = Math.round((playlistsWithArtist.length / userStats.playlists.length) * weights.playlists);
      score += playlistScore;
      scoreFactors.push({
        factor: 'Playlist Presence',
        contribution: playlistScore,
        details: `Featured in ${playlistsWithArtist.length} playlists`,
        maxPossible: weights.playlists
      });
    }

    // 4. Following status
    const isFollowed = userStats.followedArtists.some(
      artist => artist.name.toLowerCase() === artistName.toLowerCase()
    );

    if (isFollowed) {
      score += weights.followedArtist;
      scoreFactors.push({
        factor: 'Artist Following',
        contribution: weights.followedArtist,
        details: 'Actively following this artist',
        maxPossible: weights.followedArtist
      });
    }

    // 5. Genre affinity calculation
    const artistGenres = artistPopData.genres || [];
    const userTopGenres = userStats.genrePreferences;
    let genreScore = 0;

    artistGenres.forEach(genre => {
      if (userTopGenres[genre]) {
        const genreWeight = (userTopGenres[genre].longTerm * 3 + 
                           userTopGenres[genre].mediumTerm * 2 + 
                           userTopGenres[genre].shortTerm) / 6;
        genreScore += genreWeight;
      }
    });

    if (genreScore > 0) {
      const normalizedGenreScore = Math.round((genreScore / artistGenres.length) * weights.genreAffinity);
      score += normalizedGenreScore;
      scoreFactors.push({
        factor: 'Genre Affinity',
        contribution: normalizedGenreScore,
        details: `Strong affinity with artist's genres`,
        maxPossible: weights.genreAffinity
      });
    }

    // 6. Popularity inverse score
    const popularityScore = Math.round((100 - artistPopData.artistPopularity) * (weights.popularity / 100));
    score += popularityScore;
    scoreFactors.push({
      factor: 'Artist Popularity',
      contribution: popularityScore,
      details: `Artist popularity: ${artistPopData.artistPopularity}/100`,
      maxPossible: weights.popularity
    });

    return {
      artistName,
      totalScore: score,
      maxPossibleScore: 1000,
      fanLevel: getFanLevel(score),
      scoreFactors,
      weights,
      timestamp: new Date().toISOString(),
      metadata: {
        totalTracksAnalyzed: savedTracksData.length,
        totalPlaylistsAnalyzed: userStats.playlists.length,
        timeRangesAnalyzed: ['Long Term', 'Medium Term', 'Short Term']
      }
    };
  } catch (error) {
    console.error('Error calculating fan score:', error);
    throw new Error('Failed to calculate fan score');
  }
}

/**
 * Determine fan level based on 1000-point scale
 * @param {number} score - The calculated fan score (0-1000)
 * @returns {string} Fan level description
 */
function getFanLevel(score) {
  if (score >= 850) return 'Super Fan';
  if (score >= 700) return 'Dedicated Fan';
  if (score >= 500) return 'Regular Fan';
  if (score >= 300) return 'Casual Listener';
  return 'New Listener';
}
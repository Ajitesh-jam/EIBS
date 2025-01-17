/**
 * Calculate a fan score for a specific artist based on user's listening data
 * @param {string} artistName - Name of the artist to calculate score for
 * @returns {Promise<Object>} Fan score details
 */
export async function calculateFanScore(artistName) {
    try {
      // Fetch user stats and artist popularity in parallel
      const [statsResponse, popularityResponse] = await Promise.all([
        fetch('/api/spotify/userSpotStats'),
        fetch(`/api/spotify/artistPop?artist=${encodeURIComponent(artistName)}`)
      ]);
  
      const userStats = await statsResponse.json();
      const artistPopData = await popularityResponse.json();
  
      // Initialize score components
      let score = 0;
      const scoreFactors = [];
  
      // Find artist position in top artists (if present)
      const topArtistIndex = userStats.topArtists.findIndex(
        name => name.toLowerCase() === artistName.toLowerCase()
      );
      
      if (topArtistIndex !== -1) {
        // Score based on position in top artists (higher score for higher position)
        const topArtistScore = Math.round(((25 - topArtistIndex) / 25) * 50);
        score += topArtistScore;
        scoreFactors.push({
          factor: 'Top Artist Ranking',
          contribution: topArtistScore,
          details: `Ranked #${topArtistIndex + 1} in your top artists`
        });
      }
  
      // Check presence in saved tracks artists
      const savedTracksCount = userStats.savedTrackArtists.filter(
        name => name.toLowerCase() === artistName.toLowerCase()
      ).length;
  
      if (savedTracksCount > 0) {
        const savedTracksScore = Math.round((savedTracksCount / userStats.savedTrackArtists.length) * 30);
        score += savedTracksScore;
        scoreFactors.push({
          factor: 'Saved Tracks',
          contribution: savedTracksScore,
          details: `Found in ${savedTracksCount} of your saved tracks`
        });
      }
  
      // Factor in artist popularity (inverse relationship - being a fan of less popular artists scores higher)
      const popularityScore = Math.round((100 - artistPopData.artistPopularity) / 5);
      score += popularityScore;
      scoreFactors.push({
        factor: 'Artist Popularity',
        contribution: popularityScore,
        details: `Artist popularity: ${artistPopData.artistPopularity}/100`
      });
  
      // Calculate fan level based on total score
      const fanLevel = getFanLevel(score);
  
      return {
        artistName,
        totalScore: score,
        maxPossibleScore: 100,
        fanLevel,
        scoreFactors,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error calculating fan score:', error);
      throw new Error('Failed to calculate fan score');
    }
  }
  
  /**
   * Determine fan level based on score
   * @param {number} score - The calculated fan score
   * @returns {string} Fan level description
   */
  function getFanLevel(score) {
    if (score >= 80) return 'Super Fan';
    if (score >= 60) return 'Dedicated Fan';
    if (score >= 40) return 'Regular Fan';
    if (score >= 20) return 'Casual Listener';
    return 'New Listener';
  }
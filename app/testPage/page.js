'use client'
import React,{useState} from 'react'
import ConnectSpotify from '@/components/ConnectSpotify/ConnectSpotify'
import './testPage.css'
import Preloader from '@/components/Preloader/Preloader'
import { calculateFanScore } from '@/components/utils/fanScore'

const page = () => {
  const [fanScore, setFanScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkFanScore = async (artistName) => {
    try {
      setLoading(true);
      const score = await calculateFanScore(artistName);
      setFanScore(score);
    } catch (error) {
      setError('Failed to calculate fan score');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={() => checkFanScore('The Tamaashbeens')}>
        Check Fan Score
      </button>

      {loading && <p>Calculating score...</p>}
      {error && <p>Error: {error}</p>}
      {fanScore && (
        <div>
          <h2>Your fan score for {fanScore.artistName}</h2>
          <p>Score: {fanScore.totalScore}/100</p>
          <p>Fan Level: {fanScore.fanLevel}</p>

          <h3>Score Breakdown:</h3>
          {fanScore.scoreFactors.map((factor, index) => (
            <div key={index}>
              <p>{factor.factor}: {factor.contribution} points</p>
              <p>{factor.details}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default page
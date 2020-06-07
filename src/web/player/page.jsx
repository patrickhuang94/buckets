import React, { useState, useEffect } from 'react'
import normalizeAxios from '../services/normalizeAxios'

const PlayerPage = () => {
  const [player, setPlayer] = useState(null)

  useEffect(() => {
    const playerId = window.location.pathname.split('/').pop()

    async function fetchPlayerProfile() {
      const playerProfile = await normalizeAxios({
        method: 'GET',
        url: `/player/${playerId}`,
      })
      setPlayer(playerProfile)
    }

    fetchPlayerProfile()
  }, [])

  if (!player) return <div>Loading...</div>
  return (
    <div>
      <h3>{player.name}</h3>
      <img src={player.image} width="120" height="150" />
      <h3>{player.team}</h3>
    </div>
  )
}

export default PlayerPage

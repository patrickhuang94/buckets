const axios = require('axios')
const Player = require('../models/player')

async function getPlayerByName({ name }) {
  const player = await axios({
    method: 'GET',
    url: `https://www.balldontlie.io/api/v1/players?search=${name}`
  })

  const normalizedPlayer = player.data.data
  if (!normalizedPlayer) {
    throw new Error(`Player name not found: ${name}`)
  }

  return normalizedPlayer[0]
}

async function getStats({ player, season = 2019 }) {
  if (!player) {
    throw new Error('Input a player name!')
  }

  const foundPlayer = await getPlayerByName({ name: player })
  const playerId = foundPlayer.id
  const playerStats = await axios({
    method: 'GET',
    url: `https://www.balldontlie.io/api/v1/stats?player_ids[]=${playerId}&seasons[]=${season}`
  })

  const normalizedPlayerStats = playerStats.data.data.sort((a, b) => {
    const firstGameDate = a.game.date
    const secondGameDate = b.game.date
    return new Date(secondGameDate) - new Date(firstGameDate)
  })

  return {
    playerStats: normalizedPlayerStats,
    player: foundPlayer
  }
}

async function getProfile({ first_name, last_name }) {
  if (!first_name) {
    throw new Error('No name provided.')
  }

  const playerProfile = await Player.getProfile({ first_name })
  return playerProfile
}

module.exports = {
  getStats,
  getProfile
}

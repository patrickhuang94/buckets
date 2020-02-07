const axios = require('axios')
const nba = require('nba')

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

async function getProfile({ player }) {
  const player = nba.findPlayer(player)
  return player
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

async function getAverage({ player, season = 2019 }) {
  if (!player) {
    throw new Error('Input a player name!')
  }

  const playerAverages = await axios({
    method: 'GET',
    url: `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${playerId}&seasons[]=${season}`
  })
}

module.exports = {
  getStats,
  getAverage,
  getProfile
}

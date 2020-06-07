const axios = require('axios')
const Player = require('../models/player')
const Team = require('../models/team')

async function getPlayerByName({ name }) {
  const player = await axios({
    method: 'GET',
    url: `https://www.balldontlie.io/api/v1/players?search=${name}`,
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
    url: `https://www.balldontlie.io/api/v1/stats?player_ids[]=${playerId}&seasons[]=${season}`,
  })

  const normalizedPlayerStats = playerStats.data.data.sort((a, b) => {
    const firstGameDate = a.game.date
    const secondGameDate = b.game.date
    return new Date(secondGameDate) - new Date(firstGameDate)
  })

  return {
    playerStats: normalizedPlayerStats,
    player: foundPlayer,
  }
}

async function getProfile({ first_name, last_name }) {
  if (!first_name) {
    throw new Error('No name provided.')
  }

  const playerProfile = await Player.getProfile({ first_name })
  return playerProfile
}

async function createPlayer({ name, image, team_id }) {
  if (!name || !image || !team_id) {
    throw new Error('Missing player name, image, or team.')
  }

  Player.create({
    name,
    image,
    team_id,
  })
}

async function updatePlayer({ name, image }) {
  if (!name) {
    throw new Error('Missing player name.')
  }

  Player.update({ name, image })
}

async function findPlayer({ name, id }) {
  if (!name && !id) throw new Error('Missing player name or ID.')
  if (name) return Player.find({ name })

  return Player.find({ id })
}

async function findAllPlayers() {
  return Player.findAll()
}

module.exports = {
  getStats,
  getProfile,
  createPlayer,
  updatePlayer,
  findPlayer,
  findAllPlayers,
}

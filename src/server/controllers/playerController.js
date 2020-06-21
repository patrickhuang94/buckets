const PlayerModel = require('../models/playerModel')
const StatsPerSeasonModel = require('../models/statsPerSeasonModel')
const TeamModel = require('../models/teamModel')

async function create({ name, image, weight, height, team_id, position }) {
  if (!name || !image || !team_id) {
    throw new Error('Missing player name, image, or team.')
  }

  PlayerModel.create({
    name,
    image,
    weight,
    height,
    team_id,
    position,
  })
}

async function update({ name, image, weight, height, position }) {
  if (!name) {
    throw new Error('Missing player name.')
  }

  PlayerModel.update({ name, image, weight, height, position })
}

async function find({ name, id }) {
  if (!name && !id) throw new Error('Missing player name or ID.')
  if (name) return PlayerModel.find({ name })

  const player = await PlayerModel.find({ id })
  const stats = await StatsPerSeasonModel.findAll({ id })
  const team = await TeamModel.findById({ id: player.team_id })
  return { ...player, stats, team: team.name }
}

async function findAll() {
  return PlayerModel.findAll()
}

module.exports = {
  create,
  update,
  find,
  findAll,
}

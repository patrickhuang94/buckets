const Player = require('../models/playerModel')

async function create({ name, image, team_id }) {
  if (!name || !image || !team_id) {
    throw new Error('Missing player name, image, or team.')
  }

  Player.create({
    name,
    image,
    team_id,
  })
}

async function update({ name, image }) {
  if (!name) {
    throw new Error('Missing player name.')
  }

  Player.update({ name, image })
}

async function find({ name, id }) {
  if (!name && !id) throw new Error('Missing player name or ID.')
  if (name) return Player.find({ name })

  return Player.find({ id })
}

async function findAll() {
  return Player.findAll()
}

module.exports = {
  create,
  update,
  find,
  findAll,
}

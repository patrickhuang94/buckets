const query = require('../db')
const Team = require('./teamModel')

// TODO: Not used
async function getProfile({ first_name, last_name }) {
  const player = await query('SELECT * FROM "player" WHERE first_name = $1', [first_name])

  if (!player) {
    throw new Error('No player found with that name.')
  }

  const foundPlayer = player[0]
  const team = await query('SELECT * FROM "team" WHERE id = $1', [foundPlayer.team_id])
  const foundTeam = team[0]

  const playerProfile = {
    name: `${foundPlayer.first_name} ${foundPlayer.last_name}`,
    country: foundPlayer.country,
    weight: foundPlayer.weight,
    height: foundPlayer.height,
    position: foundPlayer.position,
    team: foundTeam.name,
  }

  return playerProfile
}

async function create({ name, image, weight, height, team_id, position }) {
  await query('INSERT INTO "player" (name, image, weight, height, team_id, position) VALUES ($1, $2, $3, $4, $5, $6)', [
    name,
    image,
    weight,
    height,
    team_id,
    position,
  ])
}

async function update({ name, image, weight, height, position }) {
  await query('UPDATE "player" SET image = $1, weight = $2, height = $3, position = $4 WHERE name = $5', [
    image,
    weight,
    height,
    position,
    name,
  ])
}

async function find({ name, id }) {
  let player
  if (name) {
    player = await query('SELECT * FROM "player" WHERE name = $1', [name])
    return player[0]
  } else if (id) {
    player = await query('SELECT * FROM "player" WHERE id = $1', [id])
    return player[0]
  }
}

async function findAll() {
  const allPlayers = await query(
    `
      SELECT p.id, p.name as name, p.image, p.position, t.name as team_name
      FROM player p
      JOIN team t
      ON p.team_id = t.id
    `,
  )

  return allPlayers
}

module.exports = {
  getProfile,
  create,
  update,
  find,
  findAll,
}

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

async function create({ name, image, team_id }) {
  await query('INSERT INTO "player" (name, image, team_id) VALUES ($1, $2, $3)', [name, image, team_id])
}

async function update({ name, image }) {
  await query('UPDATE "player" SET image = $1 WHERE name = $2', [image, name])
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
  const allPlayers = await query('SELECT id, name, image, team_id FROM "player"')
  const formattedPlayers = await Promise.all(
    allPlayers.map(async (player) => ({
      id: player.id,
      name: player.name,
      team: await Team.findById({ id: player.team_id }),
    })),
  )

  return formattedPlayers
}

module.exports = {
  getProfile,
  create,
  update,
  find,
  findAll,
}

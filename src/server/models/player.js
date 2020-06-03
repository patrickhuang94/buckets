const query = require('../db')
const Team = require('../models/team')

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

async function update({ name, team_id }) {
  await query('UPDATE "player" SET team_id = $1 WHERE name = $2', [team_id, name])
}

async function find({ name }) {
  return query('SELECT * FROM "player" WHERE name = $1', [name])
}

async function findAll() {
  const allPlayers = await query('SELECT id, name, image, team_id FROM "player"')
  const formattedPlayers = await Promise.all(
    allPlayers.map(async (player) => ({
      id: player.id,
      name: player.name,
      image: player.image,
      team: await Team.getTeamById({ id: player.team_id }),
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

const db = require('../db')

async function getProfile({ first_name, last_name }) {
  const player = await db.query(
    'SELECT * FROM "player" WHERE first_name = $1',
    [first_name]
  )

  if (!player) {
    throw new Error('No player found with that name.')
  }

  const foundPlayer = player[0]
  const team = await db.query('SELECT * FROM "team" WHERE id = $1', [
    foundPlayer.team_id
  ])
  const foundTeam = team[0]

  const playerProfile = {
    name: `${foundPlayer.first_name} ${foundPlayer.last_name}`,
    country: foundPlayer.country,
    weight: foundPlayer.weight,
    height: foundPlayer.height,
    position: foundPlayer.position,
    team: foundTeam.name
  }

  return playerProfile
}

module.exports = {
  getProfile
}

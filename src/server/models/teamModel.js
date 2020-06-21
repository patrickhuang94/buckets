const query = require('../db')

async function findByName({ name }) {
  const primaryTeam = await query('SELECT id FROM "team" WHERE name = $1', [name])
  const secondaryTeam = await query('SELECT id FROM "team" WHERE alternate_name = $1', [name])
  if (!primaryTeam || !secondaryTeam) throw new Error(`Cannot find team for ${name}`)
  return primaryTeam[0] || secondaryTeam[0]
}

async function findByAbbreviation({ abbreviation }) {
  const team = await query('SELECT id, name FROM "team" WHERE abbreviation = $1 OR alternate_abbreviation = $1', [
    abbreviation,
  ])
  if (!team) throw new Error(`Cannot find team for ${abbreviation}`)
  return team[0]
}

async function findById({ id }) {
  const team = await query('SELECT abbreviation, name FROM "team" WHERE id = $1', [id])
  if (!team) throw new Error(`Cannot find team for ${id}`)
  return team[0]
}

module.exports = {
  findByName,
  findByAbbreviation,
  findById,
}

const query = require('../db')
const Team = require('./teamModel')

async function create({ division, team_id, win, loss, seed, win_loss_percentage, games_back }) {
  await query(
    'INSERT INTO "conference_standing" (division, team_id, win, loss, seed, win_loss_percentage, games_back) VALUES ($1, $2, $3, $4, $5, $6, $7)',
    [division, team_id, win, loss, seed, win_loss_percentage, games_back],
  )
}

async function findAll() {
  const allStandings = await query(
    `SELECT cs.division, cs.win, cs.loss, cs.seed, cs.win_loss_percentage, cs.games_back, t.name
      FROM "conference_standing" AS cs
      JOIN "team" AS t
      ON cs.team_id = t.id
      ORDER BY division DESC, cs.seed
    `,
  )

  return allStandings
}

module.exports = {
  create,
  findAll,
}

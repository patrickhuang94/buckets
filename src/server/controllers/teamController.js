const Team = require('../models/teamModel')

async function findByName({ name }) {
  return Team.getTeamByName({ name })
}

async function findByAbbreviation({ abbreviation }) {
  return Team.findByAbbreviation({ abbreviation })
}

module.exports = {
  findByName,
  findByAbbreviation,
}

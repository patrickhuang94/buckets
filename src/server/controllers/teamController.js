const Team = require('../models/team')

async function getTeamByName({ name }) {
  return Team.getTeamByName({ name })
}

async function getTeamByAbbreviation({ abbreviation }) {
  return Team.getTeamByAbbreviation({ abbreviation })
}

module.exports = {
  getTeamByName,
  getTeamByAbbreviation,
}

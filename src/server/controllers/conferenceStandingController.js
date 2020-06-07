const ConferenceStanding = require('../models/conferenceStandingModel')
const Team = require('../models/teamModel')

async function create({ division, data }) {
  const team = await Team.getTeamByName({ name: data.teamName })
  ConferenceStanding.create({
    division,
    team_id: team.id,
    win: data.win,
    loss: data.loss,
    seed: data.seed,
    win_loss_percentage: data.winLossPercentage,
    games_back: data.gamesBack,
  })
}

async function findAll() {
  return ConferenceStanding.findAll()
}

module.exports = {
  create,
  findAll,
}

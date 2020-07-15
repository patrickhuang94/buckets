const ScheduleModel = require('../models/scheduleModel')
const TeamModel = require('../models/teamModel')

async function create({ date, start_time, visitor, home }) {
  const visitorTeam = await TeamModel.findByName({ name: visitor })
  const homeTeam = await TeamModel.findByName({ name: home })

  await ScheduleModel.create({
    date,
    start_time,
    visitor_team_id: visitorTeam.id,
    home_team_id: homeTeam.id,
  })
}

async function findAll({ month }) {
  return ScheduleModel.findAll({ month })
}

module.exports = {
  create,
  findAll,
}

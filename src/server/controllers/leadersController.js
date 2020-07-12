const StatsPerSeasonModel = require('../models/statsPerSeasonModel')

async function findLeaders() {
  const leaders = await StatsPerSeasonModel.findAllLeaders()
  return leaders
}

module.exports = {
  findLeaders,
}

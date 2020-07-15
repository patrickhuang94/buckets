const query = require('../db')

async function create({ date, start_time, visitor_team_id, home_team_id }) {
  await query(
    `INSERT INTO "schedule" (date, start_time, visitor_team_id, home_team_id) 
     VALUES ($1, $2, $3, $4)`,
    [date, start_time, visitor_team_id, home_team_id],
  )
}

async function findAll({ month }) {
  let numberMonth = null
  switch (month) {
    case 'january':
      numberMonth = '01'
      break
    case 'february':
      numberMonth = '02'
      break
    case 'march':
      numberMonth = '03'
      break
    case 'april':
      numberMonth = '04'
      break
    case 'may':
      numberMonth = '05'
      break
    case 'june':
      numberMonth = '06'
      break
    case 'july':
      numberMonth = '07'
      break
    case 'august':
      numberMonth = '08'
      break
    case 'september':
      numberMonth = '09'
      break
    case 'october':
      numberMonth = '10'
      break
    case 'november':
      numberMonth = '11'
      break
    case 'december':
      numberMonth = '12'
      break
    default:
      numberMonth = ''
  }

  const schedule = await query(
    `
      SELECT s.date, s.start_time, t1.name as home_team_name, t2.name as visitor_team_name, 
        t1.logo as home_team_logo, t2.logo as visitor_team_logo, cs1.win as home_team_wins, 
        cs1.loss as home_team_losses, cs2.win as visitor_team_wins, cs2.loss as visitor_team_losses
      FROM schedule s
      JOIN team t1
      ON s.home_team_id = t1.id
      JOIN team t2
      ON s.visitor_team_id = t2.id
      JOIN conference_standing cs1
      ON cs1.team_id = t1.id 
      JOIN conference_standing cs2
      ON cs2.team_id = t2.id
      WHERE EXTRACT(month FROM s.date) = $1
      ORDER BY s.date, s.start_time
    `,
    [numberMonth],
  )

  return schedule
}

module.exports = {
  create,
  findAll,
}

const query = require('../db')

async function create({
  player_id,
  season,
  team_id,
  games_played,
  games_started,
  minutes_played,
  field_goals,
  field_goal_attempts,
  field_goal_percentage,
  three_point_field_goals,
  three_point_field_goal_attempts,
  three_point_field_goal_percentage,
  two_point_field_goals,
  two_point_field_goal_attempts,
  two_point_field_goal_percentage,
  effective_field_goal_percentage,
  free_throws,
  free_throw_attempts,
  free_throw_percentage,
  offensive_rebounds,
  defensive_rebounds,
  total_rebounds,
  assists,
  steals,
  blocks,
  turnovers,
  personal_fouls,
  points,
}) {
  await query(
    `INSERT INTO "stats_per_season" 
      (
        player_id, season, team_id, games_played, games_started, minutes_played, field_goals, 
        field_goal_attempts, field_goal_percentage, three_point_field_goals, three_point_field_goal_attempts, 
        three_point_field_goal_percentage, two_point_field_goals, two_point_field_goal_attempts, 
        two_point_field_goal_percentage, effective_field_goal_percentage, free_throws, 
        free_throw_attempts, free_throw_percentage, offensive_rebounds, defensive_rebounds, 
        total_rebounds, assists, steals, blocks, turnovers, personal_fouls, points
      )
     VALUES 
      (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
        $21, $22, $23, $24, $25, $26, $27, $28
      )
    `,
    [
      player_id,
      season,
      team_id,
      games_played,
      games_started,
      minutes_played,
      field_goals,
      field_goal_attempts,
      field_goal_percentage,
      three_point_field_goals,
      three_point_field_goal_attempts,
      three_point_field_goal_percentage,
      two_point_field_goals,
      two_point_field_goal_attempts,
      two_point_field_goal_percentage,
      effective_field_goal_percentage,
      free_throws,
      free_throw_attempts,
      free_throw_percentage,
      offensive_rebounds,
      defensive_rebounds,
      total_rebounds,
      assists,
      steals,
      blocks,
      turnovers,
      personal_fouls,
      points,
    ],
  )
}

async function findAll({ id }) {
  const stats = await query(
    `
      SELECT s.*, t.name as team_name, t.abbreviation as team_abbreviation
      FROM stats_per_season s 
      JOIN player p
      ON s.player_id = p.id
      FULL OUTER JOIN team t
      ON p.team_id = t.id
      WHERE s.player_id = $1
    `,
    [id],
  )
  return stats
}

async function findAllLeaders() {
  const pointsLeaders = await query(
    `
      SELECT p.id, p.name, p.image, s.points, s.season
      FROM stats_per_season s
      JOIN player p
      ON p.id = s.player_id
      WHERE s.season = '2019-20'
      ORDER BY s.points DESC
      LIMIT 5
    `,
  )

  const reboundsLeaders = await query(
    `
      SELECT p.id, p.name, p.image, s.total_rebounds, s.season
      FROM stats_per_season s
      JOIN player p
      ON p.id = s.player_id
      WHERE s.season = '2019-20'
      ORDER BY s.total_rebounds DESC
      LIMIT 5
    `,
  )

  const assistsLeaders = await query(
    `
      SELECT p.id, p.name, p.image, s.assists, s.season
      FROM stats_per_season s
      JOIN player p
      ON p.id = s.player_id
      WHERE s.season = '2019-20'
      ORDER BY s.assists DESC
      LIMIT 5
    `,
  )

  const blocksLeaders = await query(
    `
      SELECT p.id, p.name, p.image, s.blocks, s.season
      FROM stats_per_season s
      JOIN player p
      ON p.id = s.player_id
      WHERE s.season = '2019-20'
      ORDER BY s.blocks DESC
      LIMIT 5
    `,
  )

  const stealsLeaders = await query(
    `
      SELECT p.id, p.name, p.image, s.steals, s.season
      FROM stats_per_season s
      JOIN player p
      ON p.id = s.player_id
      WHERE s.season = '2019-20'
      ORDER BY s.steals DESC
      LIMIT 5
    `,
  )

  return {
    pointsLeaders,
    reboundsLeaders,
    assistsLeaders,
    blocksLeaders,
    stealsLeaders,
  }
}

module.exports = {
  create,
  findAll,
  findAllLeaders,
}

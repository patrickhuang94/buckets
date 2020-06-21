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
  // const stats = await query('SELECT * FROM "stats_per_season" WHERE player_id = $1', [id])
  const stats = await query(
    `
      SELECT s.*, t.name as team_name
      FROM stats_per_season s 
      FULL OUTER JOIN team t
      ON s.team_id = t.id
      WHERE s.player_id = $1
    `,
    [id],
  )
  return stats
}

module.exports = {
  create,
  findAll,
}

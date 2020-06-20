const query = require('../db')

async function create({
  player_id,
  season,
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
        player_id, season, games_played, games_started, minutes_played, field_goals, field_goal_attempts, 
        field_goal_percentage, three_point_field_goals, three_point_field_goal_attempts, 
        three_point_field_goal_percentage, two_point_field_goals, two_point_field_goal_attempts, 
        two_point_field_goal_percentage, effective_field_goal_percentage, free_throws, 
        free_throw_attempts, free_throw_percentage, offensive_rebounds, defensive_rebounds, 
        total_rebounds, assists, steals, blocks, turnovers, personal_fouls, points
      )
     VALUES 
      (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
        $21, $22, $23, $24, $25, $26, $27
      )
    `,
    [
      player_id,
      season,
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

async function find({ id }) {
  const stats = await query('SELECT * FROM "stats_per_season" WHERE player_id = $1', [id])
  return stats[0]
}

module.exports = {
  create,
  find,
}

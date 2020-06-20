const StatsPerSeasonModel = require('../models/statsPerSeasonModel')
const PlayerModel = require('../models/playerModel')

async function create({
  player_name,
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
  const player = await PlayerModel.find({ name: player_name })
  await StatsPerSeasonModel.create({
    player_id: player.id,
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
  })
}

async function findByPlayerId({ id }) {
  return StatsPerSeasonModel.find({ id })
}

module.exports = {
  create,
  findByPlayerId,
}

exports.up = function (db) {
  return db.createTable('stats_per_game', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    season: { type: 'string', notNull: true },
    games_played: { type: 'int', notNull: true },
    games_started: { type: 'int', notNull: true },
    minutes_played: { type: 'decimal', notNull: true },
    field_goals: { type: 'decimal', notNull: true },
    field_goal_attempts: { type: 'decimal', notNull: true },
    field_goal_percentage: { type: 'decimal', notNull: true },
    three_point_field_goals: { type: 'decimal', notNull: true },
    three_point_field_goal_attempts: { type: 'decimal', notNull: true },
    three_point_field_goal_percentage: { type: 'decimal', notNull: true },
    two_point_field_goals: { type: 'decimal', notNull: true },
    two_point_field_goal_attempts: { type: 'decimal', notNull: true },
    two_point_field_goal_percentage: { type: 'decimal', notNull: true },
    effective_field_goal_percentage: { type: 'decimal', notNull: true },
    free_throws: { type: 'decimal', notNull: true },
    free_throw_attempts: { type: 'decimal', notNull: true },
    free_throw_percentage: { type: 'decimal', notNull: true },
    offensive_rebounds: { type: 'decimal', notNull: true },
    defensive_rebounds: { type: 'decimal', notNull: true },
    total_rebounds: { type: 'decimal', notNull: true },
    assists: { type: 'decimal', notNull: true },
    steals: { type: 'decimal', notNull: true },
    blocks: { type: 'decimal', notNull: true },
    turnovers: { type: 'decimal', notNull: true },
    personal_fouls: { type: 'decimal', notNull: true },
    points: { type: 'decimal', notNull: true },
    player_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'stats_per_game_player_id_fk',
        table: 'player',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT',
        },
        mapping: 'id',
      },
    },
  })
}

exports.down = function (db) {
  return db.dropTable('stats_per_game')
}

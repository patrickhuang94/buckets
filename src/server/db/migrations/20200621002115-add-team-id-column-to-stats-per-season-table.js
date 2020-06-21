exports.up = function (db) {
  return db.addColumn('stats_per_season', 'team_id', {
    type: 'int',
    foreignKey: {
      name: 'stats_per_game_team_id_fk',
      table: 'team',
      rules: {
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT',
      },
      mapping: 'id',
    },
  })
}

exports.down = function (db) {
  return db.removeColumn('stats_per_season', 'team_id')
}

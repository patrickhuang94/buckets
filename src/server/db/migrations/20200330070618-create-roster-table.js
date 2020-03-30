exports.up = function(db) {
  return db.createTable('roster', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    team_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'roster_team_id',
        table: 'team',
        rules: { onDelete: 'RESTRICT ' },
        mapping: 'id',
      },
    },
    player_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'roster_player_id',
        table: 'player',
        rules: { onDelete: 'RESTRICT ' },
        mapping: 'id',
      },
    },
    season: { type: 'int', notNull: true },
  })
}

exports.down = function(db) {
  return db.dropTable('roster')
}

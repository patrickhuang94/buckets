exports.up = function(db) {
  return db.createTable('player', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    team_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'player_team_id',
        table: 'team',
        rules: { onDelete: 'RESTRICT ' },
        mapping: 'id'
      }
    },
    first_name: { type: 'string', notNull: true },
    last_name: { type: 'string', notNull: true },
    country: { type: 'string', notNull: true },
    weight: { type: 'int', notNull: true },
    height: { type: 'int', notNull: true },
    position: { type: 'string', notNull: true }
  })
}

exports.down = function(db) {
  return db.dropTable('player')
}

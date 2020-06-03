exports.up = function (db) {
  return db.createTable('player', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    name: { type: 'string', notNull: true },
    weight: { type: 'int' },
    height: { type: 'int' },
    image: { type: 'string', notNull: true },
    team_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'player_team_id_fk',
        table: 'team',
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
  return db.dropTable('player')
}

exports.up = function (db) {
  return db.createTable('conference_standing', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    division: { type: 'string', notNull: true },
    win: { type: 'int', notNull: true },
    loss: { type: 'int', notNull: true },
    seed: { type: 'int', notNull: true },
    win_loss_percentage: { type: 'decimal', notNull: true },
    games_back: { type: 'string' },
    team_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'conference_standing_team_id_fk',
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
  return db.dropTable('conference_standing')
}

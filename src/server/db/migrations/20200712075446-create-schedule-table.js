exports.up = function (db) {
  return db.createTable('schedule', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    date: { type: 'date', notNull: true },
    start_time: { type: 'string', notNull: true },
    visitor_team_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'schedule_visitor_team_id_fk',
        table: 'team',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT',
        },
        mapping: 'id',
      },
    },
    home_team_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'schedule_home_team_id_fk',
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
  return db.dropTable('schedule')
}

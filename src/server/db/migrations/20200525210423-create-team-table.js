exports.up = function (db) {
  return db.createTable('team', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    name: { type: 'string', notNull: true },
    abbreviation: { type: 'string', notNull: true },
  })
}

exports.down = function (db) {
  return db.dropTable('team')
}

exports.up = function(db) {
  return db.createTable('player', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    first_name: { type: 'string', notNull: true },
    last_name: { type: 'string', notNull: true },
    weight: { type: 'int' },
    height: { type: 'int' },
    portrait: { type: 'string', notNull: true },
  })
}

exports.down = function(db) {
  return db.dropTable('player')
}

exports.up = function(db) {
  return db.createTable('player', {
    id: { type: 'int', primaryKey: 'true' },
    first_name: { type: 'string', notNull: true },
    last_name: { type: 'string', notNull: true },
    country: { type: 'string', notNull: true },
    weight: { type: 'int', notNull: true },
    height: { type: 'int', notNull: true },
    position: { type: 'string', notNull: true },
    created_at: { type: 'string', notNull: true },
    updated_at: { type: 'string', notNull: true }
  })
}

exports.down = function(db) {
  return db.dropTable('player')
}

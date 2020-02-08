exports.up = function(db) {
  return db.createTable('user', {
    id: { type: 'int', primaryKey: true },
    email: { type: 'string', notNull: true },
    password: { type: 'string', notNull: true },
    first_name: { type: 'string', notNull: true },
    last_name: { type: 'string', notNull: true },
    created_at: { type: 'timestamp', notNull: true },
    updated_at: { type: 'timestamp', notNull: true }
  })
}

exports.down = function(db) {
  return db.dropTable('user')
}

exports.up = function (db) {
  return db.createTable('user', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    email: { type: 'string', notNull: true },
    password: { type: 'string', notNull: true },
    first_name: { type: 'string', notNull: true },
    last_name: { type: 'string', notNull: true },
  })
}

exports.down = function (db) {
  return db.dropTable('user')
}

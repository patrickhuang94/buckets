exports.up = function (db) {
  db.changeColumn('player', 'weight', { type: 'string' })
  return db.changeColumn('player', 'height', { type: 'string' })
}

exports.down = function (db) {
  db.changeColumn('player', 'weight', { type: 'int' })
  return db.changeColumn('player', 'height', { type: 'int' })
}

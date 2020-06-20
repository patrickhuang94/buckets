exports.up = function (db) {
  return db.addColumn('player', 'position', { type: 'string' })
}

exports.down = function (db) {
  return db.removeColumn('player', 'position')
}

exports.up = function (db) {
  return db.addColumn('team', 'logo', { type: 'string' })
}

exports.down = function (db) {
  return db.removeColumn('team', 'logo')
}

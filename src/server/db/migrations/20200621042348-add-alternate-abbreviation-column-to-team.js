exports.up = function (db) {
  return db.addColumn('team', 'alternate_abbreviation', { type: 'string' })
}

exports.down = function (db) {
  return db.removeColumn('team', 'alternate_abbreviation')
}

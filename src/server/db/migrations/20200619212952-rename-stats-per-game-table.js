exports.up = function (db) {
  return db.renameTable('stats_per_game', 'stats_per_season')
}

exports.down = function (db) {
  return db.renameTable('stats_per_season', 'stats_per_game')
}

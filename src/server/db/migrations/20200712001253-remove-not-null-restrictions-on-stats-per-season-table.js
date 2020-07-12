exports.up = function (db) {
  db.changeColumn('stats_per_season', 'field_goal_percentage', {
    notNull: false,
  })
  db.changeColumn('stats_per_season', 'two_point_field_goal_percentage', {
    notNull: false,
  })
  db.changeColumn('stats_per_season', 'three_point_field_goal_percentage', {
    notNull: false,
  })
  db.changeColumn('stats_per_season', 'effective_field_goal_percentage', {
    notNull: false,
  })
  return db.changeColumn('stats_per_season', 'free_throw_percentage', {
    notNull: false,
  })
}

exports.down = function (db) {
  db.changeColumn('stats_per_season', 'field_goal_percentage', {
    notNull: true,
  })
  db.changeColumn('stats_per_season', 'two_point_field_goal_percentage', {
    notNull: true,
  })
  db.changeColumn('stats_per_season', 'three_point_field_goal_percentage', {
    notNull: true,
  })
  db.changeColumn('stats_per_season', 'effective_field_goal_percentage', {
    notNull: true,
  })
  return db.changeColumn('stats_per_season', 'free_throw_percentage', {
    notNull: true,
  })
}

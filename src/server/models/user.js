const db = require('../db')

async function getUserByEmail(email) {
  const user = await db.query('SELECT * FROM "user" WHERE email = $1', [email])
  return user[0]
}

async function create({ email, password, first_name, last_name }) {
  await db.query(
    'INSERT INTO "user" (email, password, first_name, last_name) VALUES ($1, $2, $3, $4)',
    [email, password, first_name, last_name]
  )
}

module.exports = {
  getUserByEmail,
  create
}

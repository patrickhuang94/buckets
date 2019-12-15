const db = require('../../db')
const schema = `CREATE TABLE "user"(
  user_id SERIAL PRIMARY KEY, 
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(40) NOT NULL, 
  last_name VARCHAR(40) NOT NULL, 
  created_at TIMESTAMP NOT NULL DEFAULT NOW(), 
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
)`

db.createTable(schema)

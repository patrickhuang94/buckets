const { Pool } = require('pg')

const pool = new Pool({
  host: 'localhost',
  port: '5432',
  database: 'db_development',
  user: 'patrick',
})

pool.on('error', (err) => {
  console.error('Unexpected error on idle client: ', err)
  process.exit(-1)
})

const query = async (qs, params) => {
  const client = await pool.connect()
  try {
    const result = await client.query(qs, params)
    console.log('Executed query: ', { query: JSON.stringify(qs), rows: result.rows })
    return result.rows
  } catch (err) {
    console.log('Error occurred while querying: ', err.stack)
  } finally {
    client.release()
  }
}

module.exports = query

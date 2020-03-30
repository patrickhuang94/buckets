const { Client } = require('pg')

const config = {
  host: 'localhost',
  port: '5432',
  database: 'db_development',
  user: 'patrick',
}

const connect = async () => {
  const client = await new Client(config)
  client.connect(err => {
    if (err) {
      console.error(`connection error: ${err.stack}`)
    } else {
      console.log(`connected to database ${config.database} on ${config.host}:${config.port} with user ${config.user}`)
    }
  })
  return client
}

module.exports = {
  query: async (query, params) => {
    const client = await connect()
    const result = await client.query(query, params)
    console.log(`query rows: ${JSON.stringify(result.rows)}`)
    return result.rows
  },
}

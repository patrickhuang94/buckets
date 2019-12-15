const jwt = require('jsonwebtoken')

const JWT_SECRET_KEY = process.env.SECRET_KEY
const JWT_EXPIRATION = 30000

function generateToken(email) {
  const token = jwt.sign({ email }, JWT_SECRET_KEY, {
    algorithm: 'HS256',
    expiresIn: JWT_EXPIRATION
  })

  return token
}

module.exports = {
  generateToken,
  JWT_EXPIRATION
}

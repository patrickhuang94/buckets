require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()
const port = 3001

const auth = require('./routes/auth')
const player = require('./routes/player')
const user = require('./routes/user')

// const jwt = require('jsonwebtoken')
// const JWT_SECRET_KEY = process.env.SECRET_KEY

// const verifyToken = (req, res) => {
//   const token = req.cookies.token
//   if (!token) {
//     return res.status(401).send('Token expired')
//   }

//   jwt.verify(token, JWT_SECRET_KEY, (err, data) => {
//     if (err) {
//       res.status(400).send(err)
//     }
//     return res.status(200).send(data)
//   })
// }

app.listen(port, () => console.log(`Listening on port ${port}`))

app.use(bodyParser.json())
app.use(cookieParser())

app.use('/auth', auth)

app.use('/player', player)
app.use('/user', user)

module.exports = app

require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()
const port = 3001

const auth = require('./routes/auth')
const player = require('./routes/player')
const user = require('./routes/user')

app.listen(port, () => console.log(`Listening on port ${port}`))

app.use(bodyParser.json())
app.use(cookieParser())

app.use('/auth', auth)
app.use('/player', player)
app.use('/user', user)

module.exports = app

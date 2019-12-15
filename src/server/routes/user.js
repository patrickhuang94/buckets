const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const JWT_SECRET_KEY = process.env.SECRET_KEY

const User = require('../models/user')

router.get('/', function(req, res) {
  const token = req.cookies.token
  if (!token) return
  jwt.verify(token, JWT_SECRET_KEY, async (err, data) => {
    if (err) {
      res.status(400).send(err)
    }
    const user = await User.getUserByEmail(data.email)
    return res.status(200).send({ name: user.first_name, email: user.email })
  })
})

module.exports = router

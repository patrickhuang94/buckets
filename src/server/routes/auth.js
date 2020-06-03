const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/authController')
const { JWT_EXPIRATION } = require('../jwt')

router.post('/sign_up', async function (req, res) {
  const params = {
    email: req.body.email,
    password: req.body.password,
    first_name: req.body.firstName,
    last_name: req.body.lastName,
  }

  try {
    await AuthController.signUp(params)
    res.sendStatus(200)
  } catch (err) {
    res.status(500).send({
      message: err.message,
    })
  }
})

router.post('/login', async function (req, res) {
  const params = {
    email: req.body.email,
    password: req.body.password,
  }

  try {
    const { user, token } = await AuthController.login(params)
    res.cookie('token', token, { maxAge: JWT_EXPIRATION * 1000 })
    res.status(200).send({
      email: user.email,
      name: user.first_name,
    })
  } catch (err) {
    res.sendStatus(500)
  }
})

module.exports = router

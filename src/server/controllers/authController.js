const User = require('../models/userModel')
const { isEmpty } = require('lodash')
const bcrypt = require('bcrypt')
const { generateToken } = require('../jwt')

function isUserValid(email, password) {
  const validEmail = email.includes('@')
  const validPassword = password.length && password.length > 8
  return validEmail && validPassword
}

async function signUp({ email, password, first_name, last_name }) {
  if (!isEmpty(User.getUserByEmail(email))) {
    throw new Error('User is already registered')
  }

  if (!isUserValid(email, password)) {
    throw new Error('Email or password do not satisfy requirements')
  }

  const saltRounds = 10
  const hash = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) reject(err)
      resolve(hash)
    })
  })

  User.create({
    first_name,
    last_name,
    email,
    password: hash,
  })
}

async function login({ email, password }) {
  const user = await User.getUserByEmail(email)
  if (!user) {
    throw new Error('User does not exist.')
  }

  const hash = user.password
  const matchPassword = await bcrypt.compare(password, hash)
  if (!matchPassword) {
    throw new Error('Email or password does not match.')
  }

  const token = generateToken(email)
  return {
    token,
    user,
  }
}

module.exports = {
  signUp,
  login,
}

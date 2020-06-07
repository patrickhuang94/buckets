const express = require('express')
const router = express.Router()
const PlayerController = require('../controllers/playerController')

router.get('/', async function (req, res) {
  try {
    const players = await PlayerController.findAll()
    res.status(200).send(players)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.get('/:id', async function (req, res) {
  try {
    const player = await PlayerController.find({ id: req.params.id })
    res.status(200).send(player)
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router

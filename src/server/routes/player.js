const express = require('express')
const router = express.Router()
const PlayerController = require('../controllers/playerController')

router.get('/stats', async function(req, res) {
  const player = req.query.name
  const season = req.query.season || 2019
  try {
    const playerStats = await PlayerController.getStats({ player, season })
    res.status(200).send(playerStats)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.get('/average', async function(req, res) {
  const player = req.query.name
  const season = req.query.season
  try {
    const playerStats = await PlayerController.getAverage({ player, season })
    res.status(200).send(playerStats)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.get('/profile', async function(req, res) {
  const player = req.query.name
  console.log('player: ', player)
  try {
    const playerProfile = await PlayerController.getProfile({ player })
    res.status(200).send(playerProfile)
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router

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

router.get('/profile', async function(req, res) {
  const first_name = req.query.first_name

  // TODO: add look up by last_name

  try {
    const playerProfile = await PlayerController.getProfile({ first_name })
    res.status(200).send(playerProfile)
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router

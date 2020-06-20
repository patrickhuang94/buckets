const express = require('express')
const router = express.Router()
const StatsPerSeason = require('../controllers/statsPerSeason')

router.get('/:id', async function (req, res) {
  try {
    const stats = await StatsPerSeason.find({ id: req.params.id })
    res.status(200).send(stats)
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router

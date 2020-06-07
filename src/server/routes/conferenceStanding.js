const express = require('express')
const router = express.Router()

const ConferenceStandingController = require('../controllers/conferenceStandingController')

router.get('/', async function (req, res) {
  try {
    const standings = await ConferenceStandingController.findAll()
    res.status(200).send(standings)
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router

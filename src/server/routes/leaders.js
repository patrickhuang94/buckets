const express = require('express')
const router = express.Router()

const LeadersController = require('../controllers/leadersController')

router.get('/', async function (req, res) {
  try {
    const leaders = await LeadersController.findLeaders()
    res.status(200).send(leaders)
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router

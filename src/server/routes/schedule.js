const express = require('express')
const router = express.Router()

const ScheduleController = require('../controllers/scheduleController')

router.get('/', async function (req, res) {
  try {
    const schedule = await ScheduleController.findAll({
      month: req.query.month,
    })
    res.status(200).send(schedule)
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router

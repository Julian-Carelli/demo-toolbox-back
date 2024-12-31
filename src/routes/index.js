const express = require('express')
const fileRouter = require('./fileRoutes')

const router = express.Router()

router.get('/status', (req, res) => {
  res.json({ message: 'Service is up and running!' })
})

router.use('/files', fileRouter)

module.exports = router

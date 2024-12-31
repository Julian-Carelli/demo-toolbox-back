const express = require('express')
const { listFormattedFilesController, listUnformattedFilesController } = require('../controllers/fileControllers')

const fileRouter = express.Router()

fileRouter.get('/data', listFormattedFilesController)
fileRouter.get('/list', listUnformattedFilesController)

module.exports = fileRouter

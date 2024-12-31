const fileServices = require('../services/fileServices')

const listFormattedFilesController = async (req, res) => {
  try {
    const fileName = req.query.fileName?.toLowerCase()
    const data = await fileServices.listFormattedFiles(fileName)
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const listUnformattedFilesController = async (req, res) => {
    try {
      const fileName = req.query.fileName?.toLowerCase()
      const data = await fileServices.listUnformattedFiles(fileName)
      res.status(200).json(data)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

module.exports = {
    listFormattedFilesController,
    listUnformattedFilesController
}

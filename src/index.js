const express = require('express')
const app = express()
const routes = require('./routes')

app.use(express.json())
app.use('/api', routes)

const PORT = 3005

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

module.exports = app

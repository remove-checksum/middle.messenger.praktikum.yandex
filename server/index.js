/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express')
const path = require('path')

const PORT = 3000;

const app = express()

app.use(express.static('./dist'))


const spaPath = path.resolve(__dirname, '../dist/index.html')

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})

app.get('/*', (req, res) => {
  res.sendFile(spaPath)
})

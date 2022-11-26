/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express')

const PORT = 3000;

const app = express()

app.use(express.static('./dist'))

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})

app.get('*', (req, res) => {
  res.sendFile('dist/index.html', { root: __dirname })
})

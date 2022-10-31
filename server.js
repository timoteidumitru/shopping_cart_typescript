const express = require('express')
const cors = require('cors')
const path = require('path')

const { data, categories } = require('./data.js')
const PORT = process.env.PORT || 3001
const app = express()

// middlewhere
app.use(express.static(path.resolve(__dirname, './build')))
app.use(cors())

// routes
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'))
}

app.get('/api/products/', function (req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.send(data)
})

app.get('/api/product/categories/', function (req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.send(categories)
})

app.listen(PORT, () =>
  console.log(`Server successfully started on port ${PORT}!`)
)

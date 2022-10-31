// Accessing the path module
const express = require('express')
const path = require('path')
const cors = require('cors')

const { data, categories } = require('./data.js')
const PORT = process.env.PORT || 3001
const app = express()

// middlewhere
app.use(express.static(path.resolve(__dirname, './build')))
app.use(cors())

// routes

app.get('/api/products/', function (req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.send(data)
})

app.get('/api/product/categories/', function (req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.send(categories)
})

// app.get('*', function (request, response) {
//   response.sendFile(path.resolve(__dirname, './build', 'index.html'))
// })

app.listen(PORT, () =>
  console.log(`Server successfully started on port ${PORT}!`)
)

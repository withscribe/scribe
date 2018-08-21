const path = require('path')
const express = require('express')
const expressStaticGzip = require('express-static-gzip')
const morgan = require('morgan')

const app = express()

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'))

// app.get('*.js', (req, res, next) => {
//   req.url = req.url + '.gz'
//   res.set('Content-Encoding', 'gzip')
//   res.set('Content-Type', 'text/javascript')
//   next()
// })

app.use(express.static(path.resolve(__dirname, '..', 'dist')))

// app.use('/', expressStaticGzip(path.join(__dirname, '..', 'dist')))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'))
})

module.exports = app

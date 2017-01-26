var express = require('express')
var app = express()

var port = process.env.PORT || 8080

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/public/app.html`)
})

app.listen(port)
console.log('App Started on port:', port)

module.exports = app

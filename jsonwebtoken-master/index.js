const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const user = require('./routes/user.route')
const mongoose = require('mongoose')
mongoose
  .connect('mongodb://localhost/jwtauth', { useNewUrlParser: true })
  .catch(err => console.log(err))
const PORT = 3000

// write body parser middleware to app
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/checking', function(req, res) {
  res.json({
    Tutorial: 'Welcome!!!',
  })
})

app.use('/user', user)

app.listen(PORT, function() {
  console.log('server running on port ' + PORT)
})

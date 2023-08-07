const express = require('express')
const mongoose = require('mongoose')
const pageRoute = require('./routes/pageRoute')
const courseRoute = require('./routes/courseRoute')

const app = express()

//Connect DB
mongoose
  .connect('mongodb://127.0.0.1:27017/smartedu-db')
  .then(() => console.log('DB Connected Successfuly'))

//Template Engine
app.set('view engine', 'ejs')

//Middlewares
app.use(express.static('public'))

//ROUTES
app.use('/', pageRoute)
app.use('/course', courseRoute)

const port = 3000

app.listen(port, () => {
  console.log(`Sunucu port ${port} de başlatildi`)
})

const express = require('express')
const pageRoute = require('./routes/pageRoute')


const app = express()

//Template Engine
app.set('view engine', 'ejs')

//Middlewares
app.use(express.static('public'))

//ROUTES
app.use('/', pageRoute)


const port = 3000

app.listen(port, () => {
  console.log(`Sunucu port ${port} de başlatildi`)
})

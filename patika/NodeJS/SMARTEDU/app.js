const express = require('express')

const app = express()

//Template Engine
app.set('view engine', 'ejs')

//Middlewares
app.use(express.static('public'))

//ROUTES
app.get('/', (req, res) => {
  res.status(200).render('index', {
    page_name: 'index', //page_name adinda bir degisken olusturduk ve bunu index.ejs dosyasinda kullanacagiz
  })
})

app.get('/about', (req, res) => {
  res.status(200).render('about', {
    page_name: 'about',  //page_name adinda bir degisken olusturduk ve bunu about.ejs dosyasinda kullanacagiz
  })
})

const port = 3000

app.listen(port, () => {
  console.log(`Sunucu port ${port} de başlatildi`)
})

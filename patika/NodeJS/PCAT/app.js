const express = require('express')
const ejs = require('ejs')
const path = require('path')

const app = express()

//TEMPLATE ENGINE
app.set('view engine', 'ejs')

//MIDDLEWARES
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true })) //formdan gelen bilgileri okumak icin
app.use(express.json()) //json formatinda gelen bilgileri okumak icin

//ROUTES
app.get('/', (req, res) => {
    res.render('index')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/add', (req, res) => {
    res.render('add')
})

app.post('/photos', (req, res) => {
    console.log(req.body) //kullanicinin girdigi bilgileri gorebilmek icin
    res.redirect('/') //formdan gelen bilgileri alip index sayfasina yonlendiriyoruz
})

const port = 3000

app.listen(port, () => {
    console.log(`Sunucu port ${port} de başlatildi`)
})

//add.ejs formu method="POST" action="/photos" yaptik ve burada yonlendirmede de app.post('/photos') yaptik
//post islemi yani form gibi yerlerde kullanici girdigi bilgileri sunucuya gonderir
//console.log(req.body) ile gonderilen bilgileri gorebiliriz fakat bunun icinde exporess icerisinde bulunan middleware'leri kullanmamiz gerekiyor

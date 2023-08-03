const express = require('express')
const ejs = require('ejs')
const path = require('path')

const app = express()

//TEMPLATE ENGINE
app.set('view engine', 'ejs') //view engine olarak ejs kullanacagimizi belirtiyoruz

//MIDDLEWARES
app.use(express.static('public')) //statik dosyalarimizi public klasoru altinda tutuyoruz diye belirtiyoruz

//ROUTES
app.get('/', (req, res) => {
    res.render('index') //static dosyalarimizi dinamik hale getirmek icin render kullaniriz index.ejs dosyamizi render ediyoruz
})

app.get('/about', (req, res) => {
    res.render('about') 
})

app.get('/add', (req, res) => {
    res.render('add') 
})

const port = 3000

app.listen(port, () => {
    console.log(`Sunucu port ${port} de başlatildi`)
})

//Template Engine => Statik dosyalarimizi dinamik hale getirmek icin kullanilir
//npm i ejs diye bir paket yukluyoruz
//ejs => view klasorunun icerisine bakar
//views klasoru icerisindeki html dosyalarini dinamik hale getirmek icin ejs kullanacagiz bu yuzden uzantilarini html.ejs olarak degistiriyoruz


//partials => html dosyalarimizda tekrar eden kodlari partials klasoru altinda toplayip daha sonra kullanabiliriz
//html dosyalarimiz icerisindeki header kisimlari ayni oldugu icin onu partials klasoru altinda topladik ve ozel bir taimla include yaptik  `<%- include('partials/_header') -%>`
//partials dosyalarinin baslinda _ isareti olmasi onun partials oldugunu belirtir

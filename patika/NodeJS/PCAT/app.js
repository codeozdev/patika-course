const express = require('express')
const mongoose = require('mongoose')
const ejs = require('ejs')
const path = require('path')
const Photo = require('./models/Photo')

const app = express()

//connect DB
mongoose.connect('mongodb://127.0.0.1:27017/pcat-test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

//TEMPLATE ENGINE
app.set('view engine', 'ejs')

//MIDDLEWARES
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true })) //formdan gelen bilgileri okumak icin
app.use(express.json()) //json formatinda gelen bilgileri okumak icin

//ROUTES
app.get('/', async (req, res) => {
    const photos = await Photo.find({}) //veritabanindaki tum verileri aliyoruz
    res.render('index', {
        photos, //index.ejs dosyasina gonderiyoruz
    })
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/add', (req, res) => {
    res.render('add')
})

//async await yapmamizin sebebi bu islemin bitmesini istememiz
app.post('/photos', async (req, res) => {
    await Photo.create(req.body) //formdan gelen bilgileri veritabanina yazdirma islemi
    res.redirect('/') //formdan gelen bilgileri alip index sayfasina yonlendiriyoruz
})

const port = 3000

app.listen(port, () => {
    console.log(`Sunucu port ${port} de başlatildi`)
})

//basarili sekilde mongodb de verilerimiz olusturuldu

//ejs icerisinde js yazacaksak <% %> arasina yaziyoruz ve orada veritabanindan gelen verilere gore islem yapacagimiz icin for dongusune aldik

//  <%= photos[i].title %>  bunlar nereden geliyor dersek models/Photo.js dosyasindan geliyor
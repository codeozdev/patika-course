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

//Her bir fotografa ozel tekil sayfalar olustrma
//photo.ejs yonlendirmesini yakalama
//index sayfasinda a hrefi ile gondermis oldugumuz id'yi yakalamak icin :id kullaniyoruz (id kelimesinin onemi yok)
app.get('/photos/:id', async (req, res) => {
    // console.log(req.params.id); //params ile id'yi yakaliyoruz
    const photoId = await Photo.findById(req.params.id) //id'ye gore tekil veriyi aliyoruz
    res.render('photo', {
        photoId, //photo.ejs dosyasina gonderiyoruz <%= photoId.title %> boyle yazmaya degiskenle yazdirma deniliyor
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

//her resmin icerisinde kendisine ait bilgiler olan bir html dosyamiz var bu yonlendirmeyi a tagi ile yapiyoruz ve hrefine /photos/${photo._id} yazdik bu unique id mongodb tarafindan otomatik olarak olusturuluyor

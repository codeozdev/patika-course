const express = require('express')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const methodOverride = require('method-override')
const ejs = require('ejs')
const path = require('path')
const Photo = require('./models/Photo')
const fs = require('fs')

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
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(fileUpload())
app.use(methodOverride('_method')) //put requesti post requeste ceviriyor

//ROUTES
app.get('/', async (req, res) => {
    const photos = await Photo.find({}).sort('-dataCreated') //tarihe gore siralama
    res.render('index', {
        photos,
    })
})

//Resimlerin detay sayfasi
app.get('/photos/:id', async (req, res) => {
    // console.log(req.params.id); //params ile id'yi yakaliyoruz
    const photoId = await Photo.findById(req.params.id)
    res.render('photo', {
        photoId,
    })
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/add', (req, res) => {
    res.render('add')
})

//Resmin yuklenmesi
app.post('/photos', async (req, res) => {
    //console.log(req.files.image)  //yuklenen resimlerin bilgilerini konsola yazdiriyoruz

    const uploadDir = 'public/uploads'

    //Gorsellerin yuklenecegi klasorun olup olmadigini kontrol ediyoruz yoksa olusturuyoruz
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir)
    }

    let uploadeImage = req.files.image //gorsel bilgisini degiskene attik
    let uploadPath = __dirname + '/public/uploads/' + uploadeImage.name //gorselin kaydedilecegi yeri belirledik. dosya olusturulmasi gerektigi icin core modul olan fs kullanacagiz

    //Veritabanina kaydetme islemini yapiyoruz
    uploadeImage.mv(uploadPath, async () => {
        await Photo.create({
            ...req.body,
            image: '/uploads/' + uploadeImage.name,
        })
        res.redirect('/')
    })
})

//Guncelleme sayfasinda verileri gosterme
app.get('/photos/edit/:id', async (req, res) => {
    const photo = await Photo.findById(req.params.id)
    res.render('edit', {
        photo,
    })
})

//Guncelleme sayfasindaki verileri guncelleme
app.put('/photos/:id', async (req, res) => {
    const photo = await Photo.findById(req.params.id)
    photo.title = req.body.title //verilerin guncellenmesi
    photo.description = req.body.description //verilerin guncellenmesi
    photo.save() //veritabanina kaydetme islemi

    res.redirect(`/photos/${req.params.id}`) //guncelleme isleminden sonra detay sayfasina yonlendirme
})

const port = 3000

app.listen(port, () => {
    console.log(`Sunucu port ${port} de başlatildi`)
})

//edit.ejs dosyasinda degiskenler olusturduk ve form action kisminda put islemini override yaptik
//Guncelleme sayfasinda title ve descriptionlarin input icerisinde yazili olmasi icin edit.ejs dosyasinda value ozelliginine degiskenleri atadik

//tarayicilar get ve post requestlerini destekler. get ile sayfalar arasi gecis yapilirken post ile veritabanina veri eklenir
//put requesti tarayici desteklemedigi icin npm i method-override paketini yukledik. put requesti post requeste ceviriyor

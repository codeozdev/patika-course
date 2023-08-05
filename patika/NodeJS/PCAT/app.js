const express = require('express')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
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
app.use(fileUpload()) //file upload icin middleware (resimleri yuklemek icin)

//ROUTES
app.get('/', async (req, res) => {
    const photos = await Photo.find({}).sort('-dataCreated') //tarihe gore siralama
    res.render('index', {
        photos,
    })
})

//RESIMIN DETAY SAYFASI
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

//RESIMIN YUKLEMESI
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

const port = 3000

app.listen(port, () => {
    console.log(`Sunucu port ${port} de başlatildi`)
})

//Veri tabanlarinda gorselleri saklayamiyoruz sadece pathini koyabiliriz
//encType="multipart/form-data"> bunu formumuza ekliyoruz

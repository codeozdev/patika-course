const express = require('express')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const methodOverride = require('method-override')
const ejs = require('ejs')

//contorollers
const photoControllers = require('./controllers/photoControllers')
const pageController = require('./controllers/pageController')

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
app.use(
    methodOverride('_method', {
        methods: ['POST', 'GET'],
    }),
)

//ROUTES
//index.ejs dosyasindaki tum resimleri gosterme
app.get('/', photoControllers.getAllPhotos) //tum resimlerin listelendigi sayfa
//photo.ejs dosyasindaki tek bir resmi gosterme
app.get('/photos/:id', photoControllers.getPhoto)
//Resim olusturma
app.post('/photos', photoControllers.createPhoto)
//edit.ejs dosyasindaki verileri guncelleme
app.put('/photos/:id', photoControllers.updatePhoto)
//edit.ejs dosyasindaki verileri silme
app.delete('/photos/:id', photoControllers.deletePhoto)

//Page
app.get('/about', pageController.getAboutPage)
app.get('/add', pageController.getAddPage)
//Update Details button sayfasi
app.get('/photos/edit/:id', pageController.getEditPage)

const port = 3000

app.listen(port, () => {
    console.log(`Sunucu port ${port} de başlatildi`)
})

//MVC
//vivews klasorunun icerisi sunum katmanidir. burada html kodlari yazilir
//models klasoru veritabani katmanidir. burada veritabani islemleri yapilir
//controllers klasoru ise views ve models klasoru arasindaki iliskiyi saglar. burada veritabanindan verileri ceker ve views'e gonderir. bu klasorde gelen isteklere karsi yonlendirmeleri yapacagiz

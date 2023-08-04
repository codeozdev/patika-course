const express = require('express')
const mongoose = require('mongoose')
const ejs = require('ejs')
const Sdata = require('./models/Sdata')

const app = express()

//CONNECT DB
mongoose.connect('mongodb://127.0.0.1:27017/cleanblog-test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

//TEMPLATE ENGINE
app.set('view engine', 'ejs')

//MIDDLEWARES
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', async (req, res) => {
    const sdatas = await Sdata.find({})
    console.log(sdatas);
    res.render('index', {
        sdatas
    })
})

app.get('/about', (req, res) => {
    res.render('about')
})
app.get('/add_post', (req, res) => {
    res.render('add_post')
})

app.post('/sdatas', async (req, res) => {
    await Sdata.create(req.body)
    res.redirect('/')
})

const port = 3000

app.listen(port, () => {
    console.log(`Sunucu port ${port} de başlatildi.`)
})


//models/Sdata.js dosyasindan gelen verilerle formdaki input name bilgileri ayni olmali
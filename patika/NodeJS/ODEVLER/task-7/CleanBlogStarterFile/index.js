const express = require('express')
const mongoose = require('mongoose')
const ejs = require('ejs')
const methodOverride = require('method-override')
const Sdata = require('./models/Sdata')

const app = express()

//contorollers
const postController = require('./controllers/postController')

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
app.use(
    methodOverride('_method', {
        methods: ['POST', 'GET'],
    }),
)

//ROUTES
app.get('/', postController.getAllPosts)
app.get('/posts/:id', postController.getPost)
app.post('/sdatas', postController.createPost)
app.put('/posts/:id', postController.updatePost )
app.delete('/posts/:id',postController.deletePost)

app.get('/about', (req, res) => {
    res.render('about')
})
app.get('/add_post', (req, res) => {
    res.render('add_post')
})


//update edit sayfasina yonlendirme
app.get('/posts/:id', (req, res) => {
    const post = Sdata.findById(req.params.id)
    res.render('post', {
        post,
    })
})

//edit sayfasi
app.get('/posts/edit/:id', async (req, res) => {
    const post = await Sdata.findById(req.params.id)
    res.render('edit', {
        post,
    })
})



const port = 3000

app.listen(port, () => {
    console.log(`Sunucu port ${port} de başlatildi.`)
})

//models/Sdata.js dosyasindan gelen verilerle formdaki input name bilgileri ayni olmali

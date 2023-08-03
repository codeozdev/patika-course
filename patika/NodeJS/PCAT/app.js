const express = require('express')
const path = require('path')

const app = express()


//MIDDLEWARES
app.use(express.static('public')) //statik dosyalarimizi public klasoru altinda tutuyoruz diye belirtiyoruz


app.get('/', (req, res) => {
    //path.resolve() fonksiyonu ile dosya yolunu belirtiyoruz
     res.sendFile(path.resolve(__dirname, 'temp/index.html'))
})

console.log(__dirname);

const port = 3000

app.listen(port, () => {
    console.log(`Sunucu port ${port} de başlatildi`)
})


const express = require('express')

const app = express()

app.use(express.static('public'))

const myLogger = (req, res, next) => {
    console.log('Middleware Log 1')
}

app.get('/', (req, res) => {
    app.use(myLogger)

    const photo = {
        id: 1,
        name: 'Photo Name',
        description: 'Photo description',
    }

    res.send(photo)
})

const port = 3000

app.listen(port, () => {
    console.log(`Sunucu port ${port} de başlatildi`)
})

//static dosyalarimizi public klasoru altinda tutuyoruz
//static: statik dosyanin icerisinde html, css, js, img dosyalari olabilir
//middleware: uygulama ile sunucu arasinda bir nevi arac gorevi gorur. req-res dongusu icersindeki her seye middleware denir. req-res ile alakali herseyi middleware kullanarak yapabiliriz
//middleware fonksiyonlari uc parametre alir: req, res, next
//next: middleware fonksiyonunun bittigini belirtir. next() yazilmazsa middleware fonksiyonu sonsuza kadar calisir
//middleware fonksiyonlari calistirmak icin app.use() fonksiyonu kullanilir
//logger => kaydedici

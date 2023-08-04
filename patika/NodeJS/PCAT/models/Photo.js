const mongoose = require('mongoose')
const Schema = mongoose.Schema

//create Schema
const PhotoSchema = new Schema({
    title: String,
    description: String,
    image: String,
    dataCreated: {
        type: Date,
        default: Date.now,
    },
})


//create model
const Photo = mongoose.model('Photo', PhotoSchema)

module.exports = Photo

//dataCreated ile yuklenen resimlerin tarihlerini de kaydedebiliriz
//veritabanina baglanma isini burada yapmiyoruz cunku app.js dosyasinda yapacagiz
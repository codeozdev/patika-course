const mongoose = require('mongoose')
const Schema = mongoose.Schema

//connect DB
mongoose.connect('mongodb://127.0.0.1:27017/pcat-test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

//create Schema
const PhotoSchema = new Schema({
    title: String,
    description: String,
})

//create model
const Photo = mongoose.model('Photo', PhotoSchema) //collection

//create data
//ilk fotografi olusturmus olduk. typescript gibi Schema'ya uygun olmayan bir data girmeye calisirsak hata aliriz
//collection icindeki verileri olusturmak icin create methodunu kullaniyoruz

Photo.create({
    title: 'Photo Title 2',
    description: 'Photo Description 2',
})



//read data
//callback fonksiyonu sanirim kalkmis
Photo.find({}).then((data) => {
    console.log(data)
})

//update data
const id = '64cd0e6d8faba8bf381cedb1' //mongodb'de degisiklik yapmak istedigimiz verinin id'si

Photo.findByIdAndUpdate(id, {
    title: 'Photo Title 1 Updated',
    description: 'Photo Description 1 Updated',
}).then((data) => {
    console.log(data)
})

//delete data
const id2 = '64cd126cf970de84d9cbdb63'

Photo.findByIdAndDelete(id2).then((data) => {
    console.log('Photo is removed')
})

//Mongoose CRUD İşlemleri
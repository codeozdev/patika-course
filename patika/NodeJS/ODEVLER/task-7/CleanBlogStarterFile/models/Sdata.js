const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SdataSchema = new Schema({
    title: String,
    details: String,
    dateCreated: {
        type: Date,
        default: Date.now,
    },
})

//create model
const Sdata = mongoose.model('Sdata', SdataSchema)

module.exports = Sdata

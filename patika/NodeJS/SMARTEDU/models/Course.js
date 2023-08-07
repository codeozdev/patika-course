const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CourseSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('Course', CourseSchema)

module.exports = Course
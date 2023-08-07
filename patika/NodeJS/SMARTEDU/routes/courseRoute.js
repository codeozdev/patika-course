const express = require('express')

const courseController = require('../controllers/courseController')


const router = express.Router()

router.route('/').post(courseController.createCourse) //http://localhost:3000/course bu adrese yapilacak her istek createCourse fonksiyonunu calistirir

module.exports = router
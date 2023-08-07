const Course = require('../models/Course')

exports.createCourse = async (req, res) => {
    const course = await Course.create(req.body)

    try {
        res.status(201).json({
            status: 'fail',
            course,
        })
    } catch {
        res.status(400).json({
            status: 'success',
            error,
        })
    }
}

//html sayfalari kullanmadan backend tarafinda test islemleri
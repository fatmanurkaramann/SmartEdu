const Course = require('../models/Course')

exports.createCourse = async (req, res) => {

    try {
        const course = await Course.create(req.body)

        res.status('201').json({
            status: 'success',
            course
        })
    } catch (error) {
        res.status('400').json({
            status: 'fail',
            error
        })
    }

}
exports.getAllCourses = async (req, res) => {

    try {
        const courses = await Course.find()

        res.status('200').render('course-grid-2',{
            courses,
            page_name:'course-grid-2'
        })
    } catch (error) {
        res.status('400').json({
            status: 'fail',
            error
        })
    }

}
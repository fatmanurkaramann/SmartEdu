const Course = require('../models/Course')
const Category = require('../models/Category')
const User = require('../models/User')


exports.createCourse = async (req, res) => {

    try {
        await Course.create({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            user: req.session.userId
        })
        res.status('201').redirect('/courses')
    } catch (error) {
        res.status('400').json({
            status: 'fail',
            error
        })
    }

}
exports.getAllCourses = async (req, res) => {

    try {
        const searchQuery = req.query.search
        const categorySlug = req.query.categories
        const category = await Category.findOne({ slug: categorySlug })

        let filter = {}
        if (categorySlug) {
            filter = { category: category._id }
        }
        if (searchQuery) {
            filter = { name: searchQuery }
        }
        if(!categorySlug && !searchQuery){
            filter.name=''
            filter.category=null
        }
        const courses = await Course.find({
            $or:[
                {name:{$regex: '.*'+ filter.name+'.*',$options:'i'}},
                {category:filter.category}
            ]
        }).sort('-createdDate').populate('user')
        const categories = await Category.find()


        res.status('200').render('course-grid-2', {
            courses,
            categories,
            searchQuery,
            page_name: 'course-grid-2'
        })
    } catch (error) {
        res.status('400').json({
            status: 'fail',
            error
        })
    }

}
exports.getCourse = async (req, res) => {

    try {
        const user = await User.findById(req.session.userId)
        const course = await Course.findOne({ slug: req.params.slug }).populate('user')
        res.status('200').render('course-detail', {
            course,
            user,
            page_name: 'course-detail'
        })
    } catch (error) {
        res.status('400').json({
            status: 'fail',
            error
        })
    }

}
exports.enrollCourse = async (req, res) => {
    try {
        const user = await User.findById(req.session.userId);
        await user.courses.addToSet({ _id: req.body.course_id });
        await user.save()

        res.status('200').redirect('/user/dashboard')

    } catch (error) {
        res.status('400').json({
            status: 'fail',
            error
        })
    }
}

exports.releaseCourse = async (req, res) => {
    try {
        const user = await User.findById(req.session.userId);
        await user.courses.pull({ _id: req.body.course_id });
        await user.save()

        res.status('200').redirect('/user/dashboard')

    } catch (error) {
        res.status('400').json({
            status: 'fail',
            error
        })
    }
}
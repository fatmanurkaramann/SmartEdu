const Course = require('../models/Course')
const Category = require('../models/Category')
const User = require('../models/User')
const fs = require('fs')
const Swal = require('sweetalert2');
exports.createCourse = async (req, res) => {

    try {
        const uploadDir = 'public/uploads'
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir)
        }
        let uploadedImage = req.files.image
        let uploadPath = __dirname + '/../public/uploads/' + uploadedImage.name

        uploadedImage.mv(uploadPath,
            async ()=>{
                await Course.create({
                    name: req.body.name,
                    description: req.body.description,
                    category: req.body.category,
                    user: req.session.userId,
                    image: '/uploads/' + uploadedImage.name
                })
        })
        req.flash('success', 'Course added succesfully')
        res.status('201').redirect('/courses')
    } catch (error) {
        console.log(error)
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
        if (!categorySlug && !searchQuery) {
            filter.name = ''
            filter.category = null
        }
        const courses = await Course.find({
            $or: [
                { name: { $regex: '.*' + filter.name + '.*', $options: 'i' } },
                { category: filter.category }
            ]
        }).sort('-createdDate').populate('user')
        const categories = await Category.find()


        res.status('200').render('courses', {
            courses,
            categories,
            searchQuery,
            page_name: 'courses'
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

exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findOneAndRemove({ slug: req.params.slug })
        req.flash("error", `${course.name} has been removed succesfully`);
        res.status('200').redirect('/user/dashboard')

    } catch (error) {
        res.status('400').json({
            status: 'fail',
            error
        })
    }
}
exports.updateCourse = async (req, res) => {
    try {
        // const course = await Course.findOne({ slug: req.params.slug });
        // course.name = req.body.name;
        // course.description = req.body.description;
        // course.category = req.body.category;

        // course.save();

        const course = await Course.findOne({ slug: req.params.slug })
        await Course.findByIdAndUpdate(course, {
            name :req.body.name,
            description :req.body.description,
            category : req.body.category
        })
        course.save()

        res.status(200).redirect('/user/dashboard');

    } catch (error) {
        res.status('400').json({
            status: 'fail',
            error
        })
    }
}
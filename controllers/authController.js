const User = require('../models/User')
const Category = require('../models/Category')
const Course = require('../models/Course')


const bcrypt = require('bcrypt')

exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        req.session.userId = user._id
        res.redirect('/')


    } catch (error) {
        res.status('400').json({
            status: 'fail',
            error
        })
    }
}
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email })
        if (user) {
            bcrypt.compare(password, user.password, (err, same) => {
                if (same) {
                    // USER SESSION
                    req.session.userId = user._id
                    res.status(200).redirect('/user/dashboard');
                }
            });
        }

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};
exports.logoutUser = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    })
}


exports.getDashboardPage = async (req, res) => {
    const user = await User.findOne({ _id: req.session.userId })
    const categories = await Category.find()
    const courses=await Course.find({user:req.session.userId})
    res.status(200).render('dashboard', {
        page_name: 'dashboard',
        user,
        categories,
        courses
    })
}
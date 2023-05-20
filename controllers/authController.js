const User = require('../models/User')
const Category = require('../models/Category')
const Course = require('../models/Course')
const { validationResult } = require('express-validator');

const bcrypt = require('bcrypt')

exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        req.session.userId = user._id
        res.redirect('/')


    } catch (error) {
        const errors = validationResult(req)
        console.log(errors.array().map(e => e.msg))

        for (let i = 0; i < errors.array().length; i++) {
            req.flash("error", `${errors.array()[i].msg}`);
        }
        res.redirect('/')

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
                } else {
                    req.flash("error", 'Your password is not correct!');
                    res.redirect('/')
                }
            });
        } else {
            req.flash("error", 'User is not exist!');
            res.redirect('/')
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
    const user = await User.findOne({ _id: req.session.userId }).populate('courses')
    const categories = await Category.find()
    const courses = await Course.find({ user: req.session.userId })
    res.status(200).render('dashboard', {
        page_name: 'dashboard',
        user,
        categories,
        courses
    })
}
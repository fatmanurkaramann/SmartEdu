const express = require('express')
const pageController = require('../controllers/pageController')
const authController = require('../controllers/authController')
const redirectMiddleware = require('../middlewares/redirectMiddleware')
const User = require('../models/User')
const { check } = require('express-validator');

const router = express.Router()

router.route('/').get(pageController.getHomePage)
router.route('/about').get(pageController.getAboutPage)
router.route('/contact').get(pageController.getContactPage)
router.route('/contact').post(pageController.sendEmail)
router.route('/pricing').get(pageController.getPricingPage)
router.route('/category').get(pageController.getCategoryPage)
router.route('/users').get(pageController.getUserPage)
router.route('/register').post([
    check('name').notEmpty().withMessage('Please Enter Your Name'),
    check('email').isEmail().withMessage('Please Enter a Valid Email')
    .custom((userEmail)=>{
        return User.findOne({email:userEmail}).then(user=>{
            if(user) return Promise.reject('Email is already exists!')
        })
    })
    ,
    check('password').notEmpty().withMessage('Please Enter Your Password')

],redirectMiddleware, authController.createUser)
router.route('/login').post(redirectMiddleware, authController.loginUser)

module.exports = router
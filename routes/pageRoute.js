const express = require('express')
const pageController = require('../controllers/pageController')
const authController = require('../controllers/authController')
const redirectMiddleware = require('../middlewares/redirectMiddleware')
const { check } = require('express-validator');

const router = express.Router()

router.route('/').get(pageController.getHomePage)
router.route('/about').get(pageController.getAboutPage)
router.route('/contact').get(pageController.getContactPage)
router.route('/contact').post(pageController.sendEmail)
router.route('/register').post([
    check('name').notEmpty().withMessage('Please Enter Your Name'),
    check('email').isEmail().withMessage('Please Enter a Valid Email'),
    check('password').notEmpty().withMessage('Please Enter Your Password')

],redirectMiddleware, authController.createUser)
router.route('/login').post(redirectMiddleware, authController.loginUser)

module.exports = router
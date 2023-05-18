const express = require('express')
const pageController = require('../controllers/pageController')
const authController = require('../controllers/authController')
const redirectMiddleware = require('../middlewares/redirectMiddleware')


const router = express.Router()

router.route('/').get(pageController.getHomePage)
router.route('/about').get(pageController.getAboutPage)
router.route('/contact').get(pageController.getContactPage)
router.route('/register').post(redirectMiddleware, authController.createUser)
router.route('/login').post(redirectMiddleware, authController.loginUser)

module.exports = router
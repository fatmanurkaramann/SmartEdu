const express=require('express')
const pageController=require('../controllers/pageController')
const authController=require('../controllers/authController')


const router=express.Router()

router.route('/').get(pageController.getHomePage)
router.route('/about').get(pageController.getAboutPage)
router.route('/register').get(pageController.getRegisterPage)
router.route('/login').get(pageController.getLoginPage)


//router.route('/').post(authController.createUser)
router.route('/').post(authController.loginUser)



module.exports=router
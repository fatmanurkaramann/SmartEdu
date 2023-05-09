const express=require('express')
const pageController=require('../controllers/pageController')
const authController=require('../controllers/authController')


const router=express.Router()

router.route('/').get(pageController.getHomePage)
router.route('/about').get(pageController.getAboutPage)
router.route('/').post(authController.createUser)


module.exports=router
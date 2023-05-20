const express = require('express')
const authController = require('../controllers/authController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.route('/logout').get(authController.logoutUser)
router.route('/dashboard').get(authMiddleware, authController.getDashboardPage)
router.route('/:id').delete(authController.deleteUser)



module.exports = router
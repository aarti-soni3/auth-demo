const express = require('express')
const router = express.Router();
const authController = require('../controller/authController');

router.route('/register').post(authController.createUser)

router.route('/login').post(authController.loginUser)

router.route('/logout').post(authController.logoutUser);

module.exports = router
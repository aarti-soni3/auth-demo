const express = require('express')
const router = express.Router();
const middlewareFunction = require('../utils/middlewareFunctions');
const userController = require('../controller/userController');


router.route('/user')
    .get(middlewareFunction.isAuthenticate, middlewareFunction.isRoleAllowed('admin', 'manager', 'user'), userController.getUser)

router.route('/manager')
    .get(middlewareFunction.isAuthenticate, middlewareFunction.isRoleAllowed('admin', 'manager'), userController.getManager)

router.route('/admin')
    .get(middlewareFunction.isAuthenticate, middlewareFunction.isRoleAllowed('admin'), userController.getAdmin)

module.exports = router
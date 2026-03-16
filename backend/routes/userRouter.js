const express = require('express')
const router = express.Router();
const UserSchema = require('../models/userSchema');

router.route('/').get((req, res) => {
    res.send('');
})

router.route('/register').post((req, res) => {

    const user = new UserSchema(req.body);
    console.log(user)

    res.send('registered')
})

router.route('/login').post((req, res) => {
    console.log(req.body);

    res.send('login successfully')
})

module.exports = router
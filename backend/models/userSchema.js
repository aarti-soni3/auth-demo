const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: {
        type: String,
        required: [true, 'first name is required']
    },
    lastname: {
        type: String,
        required: [true, 'last name is required']
    },
    email: {
        type: String,
        required: [true, 'email is required']
    },
    username: {
        type: String,
        required: [true, 'username is required']
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },

})

module.exports = mongoose.model('User', UserSchema)
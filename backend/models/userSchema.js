const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: {
        type: String,
        required: [true, 'First name is required']
    },
    lastname: {
        type: String,
        required: [true, 'Last name is required']
    },
    email: {
        type: String,
        unique: [true, 'Email must be unique'],
        required: [true, 'Email is required']
    },
    role: {
        type: String,
        enum: ['admin', 'manager', 'user'],
        required: [true, 'Role is required']
    },
    username: {
        type: String,
        unique: [true, 'Username must be unique'],
        required: [true, 'Username is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
}, { timestamps: true })

module.exports = mongoose.model('User', UserSchema)